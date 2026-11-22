"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual } from "@/components/store/ProductVisual";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart-math";

export function CartView() {
  const { items, count, subtotal, hydrated, updateQuantity, removeItem } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <section className="bg-ink pb-20 pt-32 md:pt-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Your selection</p>
            <h1 className="display mt-3 text-[clamp(2.8rem,6vw,5rem)] text-cream">Your cart</h1>
            <p className="mt-3 font-condensed text-[0.66rem] uppercase tracking-[0.2em] text-cream-3">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <Link href="/store" className="link-arrow">
            Continue shopping
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>

        {!hydrated ? (
          <p className="mt-16 border border-line px-6 py-16 text-center text-cream-2">
            Loading your cart…
          </p>
        ) : items.length === 0 ? (
          <div className="mt-12 border border-line px-6 py-20 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line text-cream-3">
              <Icon name="cart" size={26} />
            </span>
            <h2 className="mt-5 font-display text-3xl text-cream">Your cart is empty</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-cream-2">
              Limited vinyl, tour tees and hand-pulled prints are waiting in the store.
            </p>
            <Link href="/store" className="btn btn-gold mt-7">
              Shop the store
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.55fr_0.85fr] lg:gap-16">
            <div>
              <div className="hidden border-b border-line pb-3 sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-6">
                <span className="font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream-3">
                  Product
                </span>
                <span className="font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream-3">
                  Quantity
                </span>
                <span className="w-20 text-right font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream-3">
                  Total
                </span>
              </div>

              <ul className="divide-y divide-line">
                {items.map((line) => (
                  <li
                    key={`${line.slug}-${line.variant ?? "default"}`}
                    className="grid gap-4 py-6 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/store/${line.slug}`}
                        className="w-24 shrink-0 overflow-hidden border border-line"
                      >
                        <ProductVisual
                          visual={line.visual}
                          name={line.name}
                          uid={`cart-page-${line.slug}-${line.variant ?? "default"}`}
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          href={`/store/${line.slug}`}
                          className="font-display text-lg leading-snug text-cream transition-colors hover:text-gold"
                        >
                          {line.name}
                        </Link>
                        {line.variant && (
                          <p className="mt-1 font-condensed text-[0.6rem] uppercase tracking-[0.18em] text-cream-3">
                            {line.variant}
                          </p>
                        )}
                        <p className="mt-1.5 text-[0.8rem] text-cream-3">
                          {formatPrice(line.price)} each
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(line.slug, line.variant)}
                          className="mt-2 inline-flex items-center gap-1.5 font-condensed text-[0.6rem] uppercase tracking-[0.16em] text-cream-3 transition-colors hover:text-rust"
                        >
                          <Icon name="trash" size={12} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="inline-flex h-10 w-fit items-center border border-line">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.slug, line.variant, line.quantity - 1)}
                        aria-label={`Decrease quantity of ${line.name}`}
                        className="flex h-9 w-9 items-center justify-center text-cream-2 transition-colors hover:text-gold"
                      >
                        <Icon name="minus" size={13} />
                      </button>
                      <span className="w-8 text-center text-[0.82rem] tabular-nums text-cream">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.slug, line.variant, line.quantity + 1)}
                        aria-label={`Increase quantity of ${line.name}`}
                        className="flex h-9 w-9 items-center justify-center text-cream-2 transition-colors hover:text-gold"
                      >
                        <Icon name="plus" size={13} />
                      </button>
                    </div>

                    <p className="text-[0.9rem] tabular-nums text-cream sm:w-20 sm:text-right">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="border border-line bg-ink-2 p-6">
                <h2 className="font-display text-2xl text-cream">Order summary</h2>

                <div className="mt-5 space-y-3 text-[0.88rem]">
                  <div className="flex items-center justify-between">
                    <span className="text-cream-2">Subtotal</span>
                    <span className="tabular-nums text-cream">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cream-2">Shipping</span>
                    <span className="text-cream-3">Calculated at checkout</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cream-2">Tax</span>
                    <span className="text-cream-3">Calculated at checkout</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-line pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-cream-2">
                      Estimated total
                    </span>
                    <span className="font-display text-2xl text-cream">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[0.76rem] text-cream-2">
                    {remaining > 0 ? (
                      <>
                        Add <span className="text-gold">{formatPrice(remaining)}</span> for free
                        standard shipping.
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-gold">
                        <Icon name="check" size={13} /> Free standard shipping unlocked.
                      </span>
                    )}
                  </p>
                  <div className="mt-2 h-[3px] w-full bg-line">
                    <div
                      className="h-full bg-gold transition-[width] duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <Link href="/checkout" className="btn btn-gold mt-6 w-full">
                  Proceed to checkout
                  <Icon name="lock" size={14} />
                </Link>

                <p className="mt-4 flex items-center justify-center gap-2 text-[0.68rem] text-cream-3">
                  <Icon name="lock" size={12} />
                  Secure checkout · Demo storefront
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
