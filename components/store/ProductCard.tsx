import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/store/${product.slug}`} className="block">
        <div className="relative overflow-hidden border border-line bg-ink-3">
          <ProductVisual
            visual={product.visual}
            name={product.name}
            uid={`card-${product.slug}`}
            className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] group-hover:scale-[1.025]"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 z-10 bg-gold px-2.5 py-1 font-condensed text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ink">
              {product.badge}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cream-3">
              {product.category}
            </p>
            <h3 className="mt-1.5 font-display text-xl leading-snug text-cream transition-colors group-hover:text-gold">
              {product.name}
            </h3>
          </div>
          <span className="shrink-0 pt-4 text-[0.88rem] tabular-nums text-cream-2">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-1.5 text-[0.84rem] leading-relaxed text-cream-3">
          {product.shortDescription}
        </p>
      </Link>
    </article>
  );
}
