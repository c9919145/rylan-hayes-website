"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product, ProductVisual } from "@/lib/products";

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  visual: ProductVisual;
}

interface CartContextValue {
  items: CartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  updateQuantity: (slug: string, variant: string | undefined, quantity: number) => void;
  removeItem: (slug: string, variant: string | undefined) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "rylan-hayes-cart-v1";
const MAX_QUANTITY = 10;

const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (slug: string, variant?: string) => `${slug}::${variant ?? ""}`;

function sanitizeLine(value: unknown): CartLine | null {
  if (!value || typeof value !== "object") return null;
  const line = value as Partial<CartLine>;
  if (
    typeof line.slug !== "string" ||
    typeof line.name !== "string" ||
    typeof line.price !== "number" ||
    typeof line.quantity !== "number" ||
    typeof line.visual !== "string"
  ) {
    return null;
  }
  return {
    slug: line.slug,
    name: line.name,
    price: Math.max(0, Math.round(line.price)),
    quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.round(line.quantity))),
    variant: typeof line.variant === "string" ? line.variant : undefined,
    visual: line.visual as ProductVisual,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed.map(sanitizeLine).filter((line): line is CartLine => line !== null));
        }
      }
    } catch {
      // Ignore corrupt or unavailable storage and start with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable in private browsing; the cart still works in memory.
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (product: Product, quantity = 1, variant?: string) => {
      const chosenVariant = variant ?? product.variant?.defaultValue;
      const safeQuantity = Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));
      setItems((current) => {
        const key = lineKey(product.slug, chosenVariant);
        const existing = current.find((line) => lineKey(line.slug, line.variant) === key);
        if (existing) {
          return current.map((line) =>
            lineKey(line.slug, line.variant) === key
              ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + safeQuantity) }
              : line,
          );
        }
        return [
          ...current,
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            quantity: safeQuantity,
            variant: chosenVariant,
            visual: product.visual,
          },
        ];
      });
      setIsOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback(
    (slug: string, variant: string | undefined, quantity: number) => {
      setItems((current) =>
        current
          .map((line) =>
            line.slug === slug && line.variant === variant
              ? { ...line, quantity: Math.min(MAX_QUANTITY, Math.max(0, Math.round(quantity))) }
              : line,
          )
          .filter((line) => line.quantity > 0),
      );
    },
    [],
  );

  const removeItem = useCallback((slug: string, variant: string | undefined) => {
    setItems((current) =>
      current.filter((line) => !(line.slug === slug && line.variant === variant)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0);
    return {
      items,
      count,
      subtotal,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [
    items,
    hydrated,
    isOpen,
    openCart,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
