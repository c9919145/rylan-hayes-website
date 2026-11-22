import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { TourSchedule } from "@/components/tour/TourSchedule";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Tour",
  description:
    "Rylan Hayes 2027 Neon Porch Lights Tour dates. Find a show near you and get tickets.",
  path: "/tour",
});

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="2027 tour"
        title="See you out there"
        description="The Neon Porch Lights Tour is coming to a city near you. Every ticket is a chance to sing these songs back with us."
        image="/images/crowd.webp"
        imageAlt="A packed crowd with hands raised under concert lights"
        imagePosition="center 40%"
      >
        <a href="#dates" className="btn btn-gold">
          Find your city
          <Icon name="chevron-down" size={15} />
        </a>
      </PageHero>

      <section id="dates" className="bg-ink py-20 md:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.6fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow">All dates</p>
                <h2 className="display mt-4 text-[clamp(2.4rem,4.4vw,3.8rem)] text-cream">
                  The Neon Porch Lights Tour
                </h2>
                <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream-2">
                  Twenty-one nights across the U.S., from the Ryman to Red Rocks and a finale at
                  Bridgestone Arena. Doors open one hour before showtime.
                </p>
                <div className="mt-7 space-y-3 border-t border-line pt-6">
                  <p className="flex items-start gap-3 text-[0.84rem] text-cream-2">
                    <Icon name="ticket" size={16} className="mt-0.5 shrink-0 text-gold" />
                    Tickets available through Ticketmaster.
                  </p>
                  <p className="flex items-start gap-3 text-[0.84rem] text-cream-2">
                    <Icon name="star" size={16} className="mt-0.5 shrink-0 text-gold" />
                    VIP packages include early entry and a signed poster.
                  </p>
                  <p className="flex items-start gap-3 text-[0.84rem] text-cream-2">
                    <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-gold" />
                    Mailing list members get presale codes first.
                  </p>
                </div>
              </Reveal>
            </div>

            <div>
              <TourSchedule />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-16 md:py-20">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Presale access</p>
              <h2 className="display mt-4 max-w-md text-[clamp(2.2rem,4vw,3.4rem)] text-cream">
                Get the code before the box office opens.
              </h2>
              <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-cream-2">
                Join the mailing list for presale codes, venue upgrades and the occasional
                behind-the-scenes note from the road.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <NewsletterForm source="tour-page" buttonLabel="Get presale access" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
