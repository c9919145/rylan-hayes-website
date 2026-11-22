import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Sign Up",
  description:
    "Join the Rylan Hayes mailing list for presale codes, new music, tour announcements and exclusive offers.",
  path: "/sign-up",
});

const perks = [
  {
    icon: "ticket" as const,
    title: "Presale codes first",
    body: "Get early access to tickets before the public on-sale — including the 2027 tour.",
  },
  {
    icon: "music" as const,
    title: "New music first",
    body: "Hear new songs, demos and announcements before they go anywhere else.",
  },
  {
    icon: "star" as const,
    title: "Behind the scenes",
    body: "Notes from the road, studio photos and the occasional voice memo.",
  },
  {
    icon: "cart" as const,
    title: "Store drops",
    body: "First look at limited vinyl, tour merch and signed items before they sell out.",
  },
];

export default function SignUpPage() {
  return (
    <>
      <PageHero
        eyebrow="The mailing list"
        title="Join the list"
        description="A note or two a month from Rylan — new music, tour news, presale codes and stories from the road. No noise, ever."
        image="/images/cowboy-portrait.webp"
        imageAlt="Rylan Hayes in a cowboy hat against a warm evening sky"
        imagePosition="center 25%"
        compact
      />

      <section className="bg-ink py-20 md:py-24">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">What you&apos;ll get</p>
                <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4rem)] text-cream">
                  First in line, every time.
                </h2>
                <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-cream-2">
                  The mailing list is the only place Rylan shares presale codes, early listens and
                  the stories behind the songs. It&apos;s free, it&apos;s occasional, and you can
                  leave whenever you like.
                </p>
              </Reveal>

              <div className="mt-10 space-y-7">
                {perks.map((perk, index) => (
                  <Reveal key={perk.title} delay={index * 70} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-gold">
                      <Icon name={perk.icon} size={18} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-cream">{perk.title}</h3>
                      <p className="mt-1 max-w-md text-[0.86rem] leading-relaxed text-cream-2">
                        {perk.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={120}>
              <div className="border border-line bg-ink-2 p-6 sm:p-8 lg:sticky lg:top-32">
                <p className="eyebrow">Sign up</p>
                <h2 className="mt-3 font-display text-3xl text-cream">Hear it here first.</h2>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-cream-2">
                  Enter your details below and we&apos;ll keep you in the loop.
                </p>
                <div className="mt-7">
                  <NewsletterForm source="sign-up-page" buttonLabel="Join the mailing list" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
