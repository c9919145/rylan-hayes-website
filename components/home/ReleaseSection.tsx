import Link from "next/link";
import { AlbumArt } from "@/components/art/AlbumArt";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { featuredAlbum } from "@/lib/music";
import { streaming, streamingLinksFor } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { productBySlug } from "@/lib/products";

const vinyl = productBySlug("neon-porch-lights-vinyl");

export function ReleaseSection() {
  return (
    <section id="new-album" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-10 hidden select-none font-display text-[16rem] leading-none text-stroke opacity-20 xl:block"
      >
        2026
      </span>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[520px]">
            <div
              aria-hidden="true"
              className="absolute -right-8 top-[12%] aspect-square w-[78%] rounded-full bg-[conic-gradient(from_20deg,#0c0f10,#2a3030,#0b0e0e,#252b2b,#0b0e0e)] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <div className="absolute inset-[8%] rounded-full border border-white/[0.06]" />
              <div className="absolute inset-[18%] rounded-full border border-white/[0.05]" />
              <div className="absolute inset-[30%] rounded-full bg-gold-2">
                <div className="absolute inset-[32%] rounded-full bg-ink" />
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
              </div>
            </div>
            <div className="relative border border-line-strong shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <AlbumArt art="neon" uid="home-release" />
            </div>
            <div className="absolute -left-4 -top-4 flex h-20 w-20 rotate-[-8deg] flex-col items-center justify-center bg-gold text-ink">
              <span className="font-condensed text-[0.52rem] font-bold uppercase tracking-[0.2em]">
                New
              </span>
              <span className="font-display text-lg leading-none">Album</span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow">The new album</p>
              <h2 className="display mt-4 text-[clamp(2.8rem,5.4vw,4.8rem)] text-cream">
                Neon Porch Lights
              </h2>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-cream-2">
                {featuredAlbum.description}
              </p>
              <p className="mt-4 font-condensed text-[0.66rem] uppercase tracking-[0.22em] text-cream-3">
                {featuredAlbum.releaseDate} · 12 tracks · {featuredAlbum.duration}
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <div className="border-t border-line">
                {featuredAlbum.tracks.slice(0, 5).map((track) => (
                  <a
                    key={track.number}
                    href={streamingLinksFor(track.title).spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 border-b border-line py-2.5"
                  >
                    <span className="w-5 font-condensed text-[0.65rem] tabular-nums text-cream-3">
                      {String(track.number).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[0.92rem] text-cream transition-colors group-hover:text-gold">
                      {track.title}
                    </span>
                    <span className="text-[0.75rem] tabular-nums text-cream-3">
                      {track.duration}
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={13}
                      className="text-cream-3 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
              <Link href="/music" className="link-arrow mt-5">
                Full track list
                <Icon name="arrow-right" size={15} />
              </Link>
            </Reveal>

            <Reveal delay={200} className="mt-8">
              <div className="flex flex-wrap items-center gap-2">
                {streaming.map((platform) => (
                  <a
                    key={platform.label}
                    href={featuredAlbum.links[platform.icon as keyof typeof featuredAlbum.links]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-line px-3.5 py-2.5 font-condensed text-[0.65rem] uppercase tracking-[0.14em] text-cream-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon name={platform.icon} size={14} />
                    {platform.label}
                  </a>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/music" variant="primary" icon="arrow-right">
                  Listen now
                </ButtonLink>
                {vinyl && (
                  <ButtonLink href={`/store/${vinyl.slug}`} variant="outline" icon="cart">
                    Vinyl — {formatPrice(vinyl.price)}
                  </ButtonLink>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
