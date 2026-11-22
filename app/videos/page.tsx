import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { VideoGrid } from "@/components/video/VideoGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { youtubeSearchUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Videos",
  description:
    "Watch Rylan Hayes music videos, visualizers and live porch sessions from the Neon Porch Lights era.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Watch"
        title="Videos"
        description="Music videos, visualizers and one-take live sessions — filmed from the high country to the Gulf Coast."
        image="/images/lights.webp"
        imageAlt="Hanging bulbs glowing above a nighttime outdoor stage"
        imagePosition="center 45%"
      >
        <a
          href={youtubeSearchUrl("Rylan Hayes country")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold"
        >
          Subscribe on YouTube
          <Icon name="youtube" size={16} />
        </a>
      </PageHero>

      <section className="bg-ink py-20 md:py-24">
        <div className="container-x">
          <Reveal>
            <VideoGrid />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-14">
        <div className="container-x flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-md text-[0.9rem] leading-relaxed text-cream-2">
            Want the songs without the screen? Every track is streaming everywhere you listen.
          </p>
          <Link href="/music" className="btn btn-outline">
            Listen to the music
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
