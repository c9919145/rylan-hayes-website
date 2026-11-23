import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { ProductVisual } from "@/components/store/ProductVisual";
import { AddToCart } from "@/components/store/AddToCart";
import { ProductCard } from "@/components/store/ProductCard";
import { TracklistProduct } from "@/components/store/TracklistProduct";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import { socials } from "@/lib/site";
import {
  productBySlug,
  products,
  relatedProducts,
  type Product,
} from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product not found" };
  return pageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/store/${product.slug}`,
  });
}

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-condensed text-[0.62rem] uppercase tracking-[0.2em] text-cream-3">
        <li>
          <Link href="/" className="transition-colors hover:text-cream">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/store" className="transition-colors hover:text-cream">
            Store
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-cream-2">{product.name}</li>
      </ol>
    </nav>
  );
}

function RelatedProducts({ related }: { related: Product[] }) {
  if (related.length === 0) return null;
  return (
    <div className="border-t border-line pt-14">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl text-cream">You might also like</h2>
        <Link href="/store" className="link-arrow">
          Shop all
          <Icon name="arrow-right" size={15} />
        </Link>
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <ProductCard key={item.slug} product={item} />
        ))}
      </div>
    </div>
  );
}

function FollowAlong() {
  return (
    <section className="border-t border-line bg-ink-2 py-14">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <p className="eyebrow">Follow along</p>
        <p className="font-display text-2xl text-cream sm:text-3xl">
          New music, first listen.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Rylan Hayes on ${social.label}`}
              className="inline-flex h-10 w-10 items-center justify-center border border-line text-cream-2 transition-colors hover:border-gold hover:text-gold"
            >
              <Icon name={social.icon} size={16} />
            </a>
          ))}
        </div>
        <p className="font-condensed text-[0.6rem] uppercase tracking-[0.22em] text-cream-3">
          Rylan Hayes · Nashville, Tennessee
        </p>
      </div>
    </section>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = relatedProducts(product);

  // The tracklist tee uses a dedicated product-detail template with a
  // multi-angle gallery, image zoom and Shopify-style information column.
  if (product.slug === "tracklist-tee") {
    return (
      <>
        <div className="bg-ink pb-2 pt-32 md:pt-36">
          <div className="container-x">
            <Breadcrumb product={product} />
          </div>
        </div>
        <TracklistProduct product={product} />
        <FollowAlong />
        <section className="bg-ink pb-20 pt-14 md:pb-24">
          <div className="container-x">
            <RelatedProducts related={related} />
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="bg-ink pb-20 pt-32 md:pt-36">
      <div className="container-x">
        <Breadcrumb product={product} />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative overflow-hidden border border-line bg-ink-3">
              <ProductVisual
                visual={product.visual}
                name={product.name}
                uid={`detail-${product.slug}`}
              />
              {product.badge && (
                <span className="absolute left-4 top-4 z-10 bg-gold px-3 py-1 font-condensed text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ink">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: "truck" as const, label: "Ships from Nashville" },
                { icon: "star" as const, label: "Official merch" },
                { icon: "lock" as const, label: "Secure checkout" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 border border-line px-2 py-4 text-center"
                >
                  <Icon name={item.icon} size={16} className="text-gold" />
                  <span className="font-condensed text-[0.55rem] uppercase leading-tight tracking-[0.14em] text-cream-3">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">{product.category}</p>
            <h1 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)] text-cream">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-2xl text-gold">{formatPrice(product.price)}</p>
            <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-cream-2">
              {product.description}
            </p>

            <AddToCart product={product} />

            <div className="mt-8 border-t border-line pt-6">
              <h2 className="font-condensed text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
                Details
              </h2>
              <ul className="mt-4 space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5 text-[0.86rem] text-cream-2">
                    <Icon name="check" size={14} className="mt-1 shrink-0 text-gold" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-line">
              <details className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-condensed text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
                  Shipping &amp; returns
                  <Icon
                    name="chevron-down"
                    size={15}
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-[0.84rem] leading-relaxed text-cream-3">
                  Orders ship from Nashville within two business days. Standard shipping takes
                  4–7 business days and is free on U.S. orders over $75. Unworn apparel and
                  unopened music items can be returned within 30 days. Limited and signed items
                  are final sale.
                </p>
              </details>
              <details className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-condensed text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
                  Need help?
                  <Icon
                    name="chevron-down"
                    size={15}
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-[0.84rem] leading-relaxed text-cream-3">
                  Email{" "}
                  <a
                    href="mailto:hello@rylanhayes.com"
                    className="text-cream underline underline-offset-2 hover:text-gold"
                  >
                    hello@rylanhayes.com
                  </a>{" "}
                  and a real person will reply within two business days.
                </p>
              </details>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <RelatedProducts related={related} />
        </div>
      </div>
    </section>
  );
}
