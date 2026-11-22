import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { StoreGrid } from "@/components/store/StoreGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Store",
  description:
    "Shop official Rylan Hayes music and merchandise — limited vinyl, tour tees, hats, prints and more.",
  path: "/store",
});

const assurances = [
  {
    icon: "truck" as const,
    title: "Free shipping over $75",
    body: "Standard shipping is on us for U.S. orders over $75. Everything ships from Nashville within two business days.",
  },
  {
    icon: "star" as const,
    title: "Small-batch goods",
    body: "Limited pressings and hand-pulled prints. When they're gone, they're gone — we don't do endless restocks.",
  },
  {
    icon: "mail" as const,
    title: "Real human support",
    body: "Questions about an order? Email us and a person on the team will get back to you within two business days.",
  },
];

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Official store"
        title="The Store"
        description="Limited vinyl, tour tees, hand-pulled prints and the small things that make a record feel like yours."
        image="/images/venue.webp"
        imageAlt="The empty floor and stage of a historic theater before doors open"
        imagePosition="center 55%"
        compact
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-condensed text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream-2">
          <span className="inline-flex items-center gap-2">
            <Icon name="truck" size={14} className="text-gold" /> Free shipping over $75
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="lock" size={14} className="text-gold" /> Secure checkout
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="star" size={14} className="text-gold" /> Official merchandise
          </span>
        </div>
      </PageHero>

      <section className="bg-ink py-16 md:py-24">
        <div className="container-x">
          <StoreGrid />
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-16">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-3">
            {assurances.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <span className="flex h-11 w-11 items-center justify-center border border-line text-gold">
                  <Icon name={item.icon} size={18} />
                </span>
                <h2 className="mt-4 font-display text-xl text-cream">{item.title}</h2>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-cream-2">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 border-t border-line pt-6 text-[0.78rem] leading-relaxed text-cream-3">
            Need help with an order? Visit the{" "}
            <Link href="/contact" className="text-cream underline underline-offset-2 hover:text-gold">
              contact page
            </Link>{" "}
            or email{" "}
            <a href="mailto:hello@rylanhayes.com" className="text-cream hover:text-gold">
              hello@rylanhayes.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
