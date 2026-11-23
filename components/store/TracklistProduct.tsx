"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual, type ProductVisualView } from "@/components/store/ProductVisual";
import { Icon } from "@/components/ui/Icon";
import { cn, formatPrice } from "@/lib/format";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";

const gallery: Array<{ view: ProductVisualView; label: string }> = [
  { view: "front", label: "Front" },
  { view: "back", label: "Back" },
  { view: "detail", label: "Print detail" },
];

export function TracklistProduct({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [selected, setSelected] = useState(0);
  const [size, setSize] = useState(product.variant?.defaultValue ?? "");
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const closeZoom = useCallback(() => setZoomOpen(false), []);
  useLockBodyScroll(zoomOpen);
  useEscape(zoomOpen, closeZoom);
  useFocusTrap(zoomOpen, dialogRef, closeRef);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setSelected((index) => (index + 1) % gallery.length);
      if (event.key === "ArrowLeft") setSelected((index) => (index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomOpen]);

  const inCart = items
    .filter((line) => line.slug === product.slug)
    .reduce((total, line) => total + line.quantity, 0);
  const active = gallery[selected];
  const pageUrl = `${site.url}/store/${product.slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = pageUrl;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      try {
        document.execCommand("copy");
      } finally {
        fallback.remove();
      }
      setCopied(true);
    }
  };

  const stepImage = (direction: number) =>
    setSelected((index) => (index + direction + gallery.length) % gallery.length);

  return (
    <>
      <div className="border-y border-line-strong bg-ink-4 py-2.5 text-center">
        <p className="font-condensed text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
          Limited run — the tracklist tee is here while it lasts
        </p>
      </div>

      <section className="bg-ink pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            {/* Gallery */}
            <div className="min-w-0">
              <div className="relative border border-line bg-ink-3 p-3 md:p-5">
                {product.badge && (
                  <span className="absolute left-6 top-6 z-10 bg-gold px-3 py-1 font-condensed text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ink md:left-9 md:top-9">
                    {product.badge}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  aria-label={`Open ${active.label} image in modal`}
                  className="group relative block w-full cursor-zoom-in"
                >
                  <ProductVisual
                    visual={product.visual}
                    name={product.name}
                    view={active.view}
                    uid={`tracklist-main-${product.slug}-${active.view}`}
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-ink/85 px-3 py-2 font-condensed text-[0.6rem] uppercase tracking-[0.16em] text-cream transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon name="search" size={13} />
                    Zoom
                  </span>
                </button>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => stepImage(-1)}
                    aria-label="Previous image"
                    className="inline-flex h-9 w-9 items-center justify-center border border-line text-cream-2 transition-colors hover:border-cream hover:text-cream"
                  >
                    <Icon name="chevron-left" size={16} />
                  </button>
                  <span className="font-condensed text-[0.65rem] uppercase tracking-[0.2em] text-cream-3" aria-live="polite">
                    {selected + 1} of {gallery.length} · {active.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => stepImage(1)}
                    aria-label="Next image"
                    className="inline-flex h-9 w-9 items-center justify-center border border-line text-cream-2 transition-colors hover:border-cream hover:text-cream"
                  >
                    <Icon name="chevron-right" size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                {gallery.map((image, index) => (
                  <button
                    key={image.view}
                    type="button"
                    onClick={() => setSelected(index)}
                    aria-label={`View ${image.label}`}
                    aria-pressed={selected === index}
                    className={cn(
                      "border p-1.5 transition-colors",
                      selected === index
                        ? "border-gold"
                        : "border-line hover:border-cream-2",
                    )}
                  >
                    <ProductVisual
                      visual={product.visual}
                      name={`${product.name} — ${image.label}`}
                      view={image.view}
                      uid={`tracklist-thumb-${product.slug}-${image.view}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product information */}
            <div className="min-w-0">
              <p className="eyebrow">Apparel · Limited edition</p>
              <h1 className="display mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] text-cream">
                {product.name}
              </h1>
              <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-6">
                <span className="font-display text-3xl text-cream">{formatPrice(product.price)}</span>
                <span className="font-condensed text-[0.65rem] uppercase tracking-[0.18em] text-cream-3">
                  USD · {product.badge ?? "In stock"}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="field-label">Size</span>
                  <span className="text-[0.75rem] text-cream-3">{size}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variant?.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSize(option)}
                      aria-pressed={size === option}
                      className={cn(
                        "min-h-11 border px-4 font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.13em] transition-colors",
                        size === option
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-line text-cream-2 hover:border-cream hover:text-cream",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <details className="group mt-3">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 font-condensed text-[0.65rem] uppercase tracking-[0.16em] text-cream-3 transition-colors hover:text-gold">
                    Size guide
                    <Icon name="chevron-down" size={13} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-md text-[0.8rem] leading-relaxed text-cream-3">
                    Relaxed unisex fit. SMALL 34–36 in · MEDIUM 38–40 in · LARGE 42–44 in ·
                    X-LARGE 46–48 in · 2X-LARGE 50–52 in · 3X-LARGE 54–56 in (chest, measured flat).
                  </p>
                </details>
              </div>

              <div className="mt-7">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="field-label">Quantity</span>
                  <span className="text-[0.75rem] text-cream-3">{inCart} in cart</span>
                </div>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div className="inline-flex h-12 items-center justify-between border border-line px-1 sm:w-32">
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
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
                      onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                      aria-label="Increase quantity"
                      className="flex h-10 w-10 items-center justify-center text-cream-2 transition-colors hover:text-gold"
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(product, quantity, product.variant ? size : undefined)}
                    className="btn btn-gold flex-1"
                  >
                    Add to cart — {formatPrice(product.price * quantity)}
                    <Icon name="cart" size={15} />
                  </button>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[0.76rem] text-cream-3">
                  <Icon name="truck" size={14} className="text-gold" />
                  Shipping calculated at checkout. Free standard shipping over $75.
                </p>
              </div>

              <div className="mt-8 border-t border-line">
                <details className="group border-b border-line py-5" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
                    Description
                    <Icon name="chevron-down" size={15} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-[0.88rem] leading-relaxed text-cream-2">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-[0.84rem] text-cream-3">
                        <Icon name="check" size={13} className="mt-1 shrink-0 text-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </details>
                <details className="group border-b border-line py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
                    Shipping &amp; returns
                    <Icon name="chevron-down" size={15} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-[0.84rem] leading-relaxed text-cream-3">
                    Orders ship from Nashville within two business days. Standard delivery takes 4–7
                    business days and is free on U.S. orders over $75. Unworn apparel can be returned
                    within 30 days; limited-run items are final sale.
                  </p>
                </details>
                <details className="group border-b border-line py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
                    Need help?
                    <Icon name="chevron-down" size={15} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-[0.84rem] leading-relaxed text-cream-3">
                    Email{" "}
                    <a href={`mailto:${site.email}`} className="text-cream underline underline-offset-2 hover:text-gold">
                      {site.email}
                    </a>{" "}
                    and a real person will reply within two business days.
                  </p>
                </details>
              </div>

              <div className="mt-8">
                <p className="field-label">Share</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex min-h-10 items-center gap-2 border border-line px-4 font-condensed text-[0.65rem] uppercase tracking-[0.15em] text-cream-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon name={copied ? "check" : "arrow-up-right"} size={14} />
                    {copied ? "Copied" : "Copy link"}
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 border border-line px-4 font-condensed text-[0.65rem] uppercase tracking-[0.15em] text-cream-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon name="x" size={13} />
                    X
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 border border-line px-4 font-condensed text-[0.65rem] uppercase tracking-[0.15em] text-cream-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon name="facebook" size={13} />
                    Facebook
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(pageUrl)}`}
                    className="inline-flex min-h-10 items-center gap-2 border border-line px-4 font-condensed text-[0.65rem] uppercase tracking-[0.15em] text-cream-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon name="mail" size={14} />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mounted && zoomOpen &&
        createPortal(
          <div
            ref={dialogRef}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} image ${selected + 1} of ${gallery.length}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeZoom();
            }}
          >
            <div className="w-full max-w-3xl">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="font-condensed text-[0.65rem] uppercase tracking-[0.2em] text-cream-3">
                  {active.label} · {selected + 1} of {gallery.length}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeZoom}
                  aria-label="Close image"
                  className="inline-flex h-10 w-10 items-center justify-center border border-line-strong text-cream transition-colors hover:border-cream hover:text-gold"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
              <div className="relative border border-line bg-ink-3 p-3">
                <ProductVisual
                  visual={product.visual}
                  name={product.name}
                  view={active.view}
                  uid={`tracklist-zoom-${product.slug}-${active.view}`}
                />
                <button
                  type="button"
                  onClick={() => stepImage(-1)}
                  aria-label="Previous image"
                  className="absolute left-5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-line bg-ink/85 text-cream transition-colors hover:border-gold"
                >
                  <Icon name="chevron-left" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => stepImage(1)}
                  aria-label="Next image"
                  className="absolute right-5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-line bg-ink/85 text-cream transition-colors hover:border-gold"
                >
                  <Icon name="chevron-right" size={18} />
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
