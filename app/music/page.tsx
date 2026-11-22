import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { AlbumArt } from "@/components/art/AlbumArt";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { featuredAlbum, releases } from "@/lib/music";
import { streaming, streamingLinksFor } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Music",
  description:
    "Listen to Neon Porch Lights and the full Rylan Hayes discography — albums, singles and live sessions.",
  path: "/music",
});

const platformIcons = ["spotify", "apple", "amazon", "youtube"] as const;

export default function MusicPage() {
  return (
    <>
      <PageHero
        eyebrow="Discography"
        title="Music"
        description="Four albums, a handful of singles and a lot of miles in between. Start with the new record, then work your way back."
        image="/images/stage-warm.webp"
        imageAlt="Warm amber stage lights over an empty concert stage"
        imagePosition="center 55%"
      />

      <section className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <div className="mx-auto max-w-[440px] border border-line-strong shadow-[0_40px_100px_rgba(0,0,0,0.45)] lg:mx-0">
                <AlbumArt art="neon" uid="featured" />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">The new album</p>
                  <p className="mt-2 font-condensed text-[0.66rem] uppercase tracking-[0.2em] text-cream-3">
                    {featuredAlbum.releaseDate} · 12 tracks
                  </p>
                </div>
                <span className="bg-gold px-2.5 py-1 font-condensed text-[0.58rem] font-bold uppercase tracking-[0.18em] text-ink">
                  Out now
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {streaming.map((platform) => (
                  <a
                    key={platform.label}
                    href={featuredAlbum.links[platform.icon]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 border border-line px-3.5 font-condensed text-[0.66rem] uppercase tracking-[0.14em] text-cream-2 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon name={platform.icon} size={15} />
                    {platform.label}
                  </a>
                ))}
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow">Neon Porch Lights</p>
                <h2 className="display mt-4 text-[clamp(2.8rem,5.4vw,4.8rem)] text-cream">
                  The new record
                </h2>
                <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-cream-2">
                  {featuredAlbum.description}
                </p>
              </Reveal>

              <Reveal delay={100} className="mt-9">
                <div className="flex items-center justify-between border-b border-line-strong pb-3">
                  <span className="font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-cream-3">
                    Track
                  </span>
                  <span className="font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-cream-3">
                    Length
                  </span>
                </div>
                <ol>
                  {featuredAlbum.tracks.map((track) => (
                    <li key={track.number}>
                      <a
                        href={streamingLinksFor(track.title).spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 border-b border-line py-3"
                        aria-label={`Listen to ${track.title} on Spotify`}
                      >
                        <span className="w-6 font-condensed text-[0.66rem] tabular-nums text-cream-3 transition-colors group-hover:text-gold">
                          {String(track.number).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-[0.95rem] text-cream transition-colors group-hover:text-gold">
                          {track.title}
                        </span>
                        <Icon
                          name="play"
                          size={13}
                          className="text-cream-3 opacity-0 transition-opacity group-hover:opacity-100"
                        />
                        <span className="w-9 text-right text-[0.75rem] tabular-nums text-cream-3">
                          {track.duration}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={180} className="mt-7 flex flex-wrap gap-3">
                <a
                  href={featuredAlbum.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  Play on Spotify
                  <Icon name="spotify" size={15} />
                </a>
                <a
                  href={featuredAlbum.links.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Apple Music
                  <Icon name="apple" size={15} />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">The catalog</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4rem)] text-cream">
              Albums &amp; singles
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {releases
              .filter((release) => !release.featured)
              .map((release, index) => (
                <Reveal key={release.slug} delay={index * 80} as="article">
                  <div className="border border-line">
                    <AlbumArt art={release.art} uid={release.slug} />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-gold">
                        {release.type} · {release.year}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl leading-tight text-cream">
                        {release.title}
                      </h3>
                    </div>
                    {release.duration && (
                      <span className="shrink-0 pt-5 font-condensed text-[0.62rem] uppercase tracking-[0.14em] text-cream-3">
                        {release.duration}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-cream-2">
                    {release.description}
                  </p>
                  <div className="mt-4 flex gap-1.5">
                    {platformIcons.map((icon) => (
                      <a
                        key={icon}
                        href={release.links[icon]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Listen to ${release.title} on ${icon}`}
                        className="inline-flex h-9 w-9 items-center justify-center border border-line text-cream-3 transition-colors hover:border-gold hover:text-gold"
                      >
                        <Icon name={icon} size={14} />
                      </a>
                    ))}
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink py-14">
        <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-md text-[0.9rem] leading-relaxed text-cream-2">
            Prefer your music on wax? Every album is available on limited colored vinyl in the
            store.
          </p>
          <Link href="/store" className="btn btn-outline">
            Shop vinyl
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
