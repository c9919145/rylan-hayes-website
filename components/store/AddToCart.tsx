"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { cn, formatPrice } from "@/lib/format";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState(product.variant?.defaultValue ?? "");
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = (next: number) => {
    setQuantity(Math.min(10, Math.max(1, next)));
  };

  return (
    <div className="mt-8 border-t border-line pt-7">
      {product.variant && (
        <div className="mb-6">
          <div className="flex items-baseline justify-between">
            <span className="field-label">{product.variant.label}</span>
            <span className="text-[0.72rem] text-cream-3">{variant}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.variant.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setVariant(option)}
                aria-pressed={variant === option}
                className={cn(
                  "min-h-11 border px-4 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                  variant === option
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line text-cream-2 hover:border-cream hover:text-cream",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="inline-flex h-12 items-center justify-between border border-line px-1 sm:w-32">
          <button
            type="button"
            onClick={() => changeQuantity(quantity - 1)}
            aria-label="Decrease quantity"
            className="flex h-10 w-10 items-center justify-center text-cream-2 transition-colors hover:text-gold"
          >
            <Icon name="minus" size={14} />
          </button>
          <span className="w-8 text-center text-sm tabular-nums text-cream" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => changeQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="flex h-10 w-10 items-center justify-center text-cream-2 transition-colors hover:text-gold"
          >
            <Icon name="plus" size={14} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => addItem(product, quantity, product.variant ? variant : undefined)}
          className="btn btn-gold flex-1"
        >
          Add to cart — {formatPrice(product.price * quantity)}
          <Icon name="cart" size={15} />
        </button>
      </div>

      <p className="mt-4 flex items-center gap-2 text-[0.75rem] text-cream-3">
        <Icon name="truck" size={14} />
        Free standard shipping on orders over $75
      </p>
    </div>
  );
}
