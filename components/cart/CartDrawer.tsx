"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { ProductVisual } from "@/components/store/ProductVisual";
import { Icon } from "@/components/ui/Icon";
import { cn, formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart-math";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  useLockBodyScroll(isOpen);
  useEscape(isOpen, closeCart);
  useFocusTrap(isOpen, drawerRef, closeButtonRef);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      className={cn("fixed inset-0 z-[70]", !isOpen && "pointer-events-none")}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
        aria-label="Close cart"
        className={cn(
          "absolute inset-0 bg-ink/75 backdrop-blur-[3px] transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-line bg-ink-2 shadow-[-30px_0_80px_rgba(0,0,0,0.45)] transition-transform duration-500 [transition-timing-function:var(--ease-out-soft)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-6">
          <div className="flex items-baseline gap-2.5">
            <h2 className="font-display text-2xl text-cream">Your cart</h2>
            <span className="font-condensed text-[0.68rem] uppercase tracking-[0.2em] text-cream-3">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            onClick={closeCart}
            tabIndex={isOpen ? 0 : -1}
            className="inline-flex h-10 w-10 items-center justify-center text-cream-2 transition-colors hover:text-gold"
            aria-label="Close cart"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {items.length > 0 && (
          <div className="border-b border-line px-5 py-4 sm:px-6">
            <p className="text-[0.78rem] text-cream-2">
              {remaining > 0 ? (
                <>
                  You&apos;re{" "}
                  <span className="text-gold">{formatPrice(remaining)}</span> away from free
                  standard shipping.
                </>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-gold">
                  <Icon name="check" size={14} /> Free standard shipping unlocked.
                </span>
              )}
            </p>
            <div className="mt-2.5 h-[3px] w-full bg-line">
              <div
                className="h-full bg-gold transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line text-cream-3">
                <Icon name="cart" size={26} />
              </span>
              <p className="mt-5 font-display text-2xl text-cream">Your cart is empty</p>
              <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-cream-2">
                Records, tees and tour goods are waiting in the store.
              </p>
              <Link
                href="/store"
                onClick={closeCart}
                tabIndex={isOpen ? 0 : -1}
                className="btn btn-primary mt-7"
              >
                Shop the store
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((line) => (
                <li key={`${line.slug}-${line.variant ?? "default"}`} className="flex gap-4 py-5">
                  <Link
                    href={`/store/${line.slug}`}
                    onClick={closeCart}
                    tabIndex={isOpen ? 0 : -1}
                    className="w-20 shrink-0 overflow-hidden border border-line"
                  >
                    <ProductVisual
                      visual={line.visual}
                      name={line.name}
                      uid={`cart-drawer-${line.slug}-${line.variant ?? "default"}`}
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/store/${line.slug}`}
                        onClick={closeCart}
                        tabIndex={isOpen ? 0 : -1}
                        className="text-[0.86rem] leading-snug text-cream transition-colors hover:text-gold"
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(line.slug, line.variant)}
                        tabIndex={isOpen ? 0 : -1}
                        aria-label={`Remove ${line.name} from cart`}
                        className="shrink-0 text-cream-3 transition-colors hover:text-rust"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                    {line.variant && (
                      <p className="mt-1 font-condensed text-[0.62rem] uppercase tracking-[0.18em] text-cream-3">
                        {line.variant}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-line">
                        <button
                          type="button"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() =>
                            updateQuantity(line.slug, line.variant, line.quantity - 1)
                          }
                          aria-label={`Decrease quantity of ${line.name}`}
                          className="flex h-8 w-8 items-center justify-center text-cream-2 transition-colors hover:text-gold"
                        >
                          <Icon name="minus" size={13} />
                        </button>
                        <span className="w-7 text-center text-[0.8rem] tabular-nums text-cream">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() =>
                            updateQuantity(line.slug, line.variant, line.quantity + 1)
                          }
                          aria-label={`Increase quantity of ${line.name}`}
                          className="flex h-8 w-8 items-center justify-center text-cream-2 transition-colors hover:text-gold"
                        >
                          <Icon name="plus" size={13} />
                        </button>
                      </div>
                      <span className="text-[0.86rem] text-cream">
                        {formatPrice(line.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="font-condensed text-[0.72rem] uppercase tracking-[0.2em] text-cream-2">
                Subtotal
              </span>
              <span className="font-display text-2xl text-cream">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1.5 text-[0.72rem] text-cream-3">
              Shipping and tax calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              tabIndex={isOpen ? 0 : -1}
              className="btn btn-primary mt-4 w-full"
            >
              Checkout
              <Icon name="lock" size={14} />
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              tabIndex={isOpen ? 0 : -1}
              className="mt-3 block text-center font-condensed text-[0.68rem] uppercase tracking-[0.2em] text-cream-2 transition-colors hover:text-gold"
            >
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
