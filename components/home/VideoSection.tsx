import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { VideoThumbnailButton } from "@/components/video/VideoThumbnailButton";
import { featuredVideo } from "@/lib/videos";

export function VideoSection() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Videos"
          title="Shot on the road"
          description="Visualizers, live porch sessions and the stories behind the songs — filmed everywhere from the high country to the Gulf Coast."
          action={{ label: "All videos", href: "/videos" }}
        />

        <Reveal className="mt-12">
          <VideoThumbnailButton
            video={featuredVideo}
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </Reveal>
      </div>
    </section>
  );
}
