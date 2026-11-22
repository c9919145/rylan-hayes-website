import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ticketUrlFor, tourDates } from "@/lib/tour";
import { dayOfMonth, monthAbbreviation } from "@/lib/format";

export function TourPreview() {
  const shows = tourDates.slice(0, 4);

  return (
    <section className="border-y border-line bg-ink-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="On the road"
          title="2027 tour dates"
          description="The Neon Porch Lights Tour hits theaters, amphitheaters and arenas across the country. Grab your tickets before they're gone."
          action={{ label: "All tour dates", href: "/tour" }}
        />

        <div className="mt-12">
          {shows.map((show, index) => (
            <Reveal key={show.id} delay={index * 70}>
              <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 border-b border-line py-5 sm:grid-cols-[auto_1.5fr_1fr_auto] sm:gap-x-8">
                <div className="w-14 shrink-0 text-center">
                  <p className="font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-gold">
                    {monthAbbreviation(show.date)}
                  </p>
                  <p className="font-display text-[2.1rem] leading-none text-cream">
                    {dayOfMonth(show.date)}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl leading-tight text-cream">
                    {show.city}, {show.region}
                  </p>
                  <p className="mt-0.5 text-[0.84rem] text-cream-2">{show.venue}</p>
                </div>
                <div className="col-span-2 flex flex-wrap items-center gap-x-4 gap-y-1 sm:col-span-1">
                  <span className="font-condensed text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream-3">
                    {show.status === "low" ? "Low tickets" : "On sale"}
                  </span>
                  {show.note && (
                    <span className="text-[0.76rem] text-cream-3">{show.note}</span>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1 sm:justify-self-end">
                  <a
                    href={ticketUrlFor(show)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm w-full sm:w-auto"
                  >
                    Tickets
                    <Icon name="arrow-up-right" size={13} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-4">
          <p className="text-[0.8rem] text-cream-3">
            Can&apos;t make a show? Join the mailing list for presale codes and new dates.
          </p>
          <Link href="/sign-up" className="link-arrow">
            Sign up
            <Icon name="arrow-right" size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
