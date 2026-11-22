import Image from "next/image";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";

export function SignupBand() {
  return (
    <section className="relative overflow-hidden border-y border-line grain">
      <Image
        src="/images/lights.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />

      <div className="container-x relative z-10 py-20 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <p className="eyebrow">The mailing list</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-cream">
              Be the first to know
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-relaxed text-cream-2">
              Presale codes, new music, tour announcements and the occasional note from the road.
              No noise — just the good stuff.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-8 text-left">
            <NewsletterForm source="homepage" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
