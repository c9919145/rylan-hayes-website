import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden grain">
      <Image
        src="/images/hero-stage.webp"
        alt="A guitarist silhouetted against warm stage lights"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center hero-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35" />
      <div className="absolute inset-0 vignette" />

      <div className="container-x relative z-10 pb-12 pt-36 md:pb-16">
        <div className="max-w-5xl">
          <p className="eyebrow hero-rise">New album · Out now</p>
          <h1 className="display mt-4 text-[clamp(3.6rem,11vw,9rem)] text-cream hero-rise [--rise-delay:120ms]">
            Neon <span className="display-italic text-gold">Porch</span> Lights
          </h1>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-cream-2 hero-rise [--rise-delay:240ms] sm:text-[1.08rem]">
            Twelve songs about the people, the places and the late-night conversations that make
            a life. Recorded live to tape in East Nashville.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 hero-rise [--rise-delay:360ms]">
            <ButtonLink href="/music" variant="gold" icon="arrow-right">
              Listen now
            </ButtonLink>
            <ButtonLink href="/tour" variant="outline" icon="ticket">
              2027 tour
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 hero-rise [--rise-delay:480ms] md:grid-cols-3">
          <div>
            <p className="font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-cream-3">
              The record
            </p>
            <p className="mt-1 text-sm text-cream">Neon Porch Lights · 2026</p>
          </div>
          <div>
            <p className="font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-cream-3">
              On the road
            </p>
            <p className="mt-1 text-sm text-cream">2027 tour · On sale now</p>
          </div>
          <div className="hidden md:block">
            <p className="font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-cream-3">
              Hometown
            </p>
            <p className="mt-1 text-sm text-cream">Nashville, Tennessee</p>
          </div>
        </div>
      </div>

      <a
        href="#new-album"
        className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-2 text-cream-3 transition-colors hover:text-gold md:flex"
        aria-label="Scroll to the new album"
      >
        <span className="font-condensed text-[0.55rem] uppercase tracking-[0.28em]">Scroll</span>
        <span className="scroll-cue">
          <Icon name="chevron-down" size={16} />
        </span>
      </a>
    </section>
  );
}
