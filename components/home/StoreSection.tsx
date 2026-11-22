import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/store/ProductCard";
import { productBySlug } from "@/lib/products";

const picks = ["neon-porch-lights-vinyl", "neon-porch-lights-tee", "porch-light-poster"]
  .map((slug) => productBySlug(slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export function StoreSection() {
  return (
    <section className="border-t border-line bg-ink-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="The store"
          title="Take a little home"
          description="Limited vinyl, tour tees and hand-pulled prints — made in small batches and shipped from Nashville."
          action={{ label: "Shop all", href: "/store" }}
        />

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((product, index) => (
            <Reveal key={product.slug} delay={index * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="font-condensed text-[0.65rem] uppercase tracking-[0.2em] text-cream-3">
            Free standard shipping on orders over $75
          </p>
          <Link href="/store" className="link-arrow">
            Browse the full store
            <Icon name="arrow-right" size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
