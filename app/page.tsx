import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { ReleaseSection } from "@/components/home/ReleaseSection";
import { TourPreview } from "@/components/home/TourPreview";
import { VideoSection } from "@/components/home/VideoSection";
import { AboutSection } from "@/components/home/AboutSection";
import { StoreSection } from "@/components/home/StoreSection";
import { SignupBand } from "@/components/home/SignupBand";
import { Marquee } from "@/components/ui/Marquee";

export const metadata = pageMetadata({
  title: "Rylan Hayes — Country Music",
  description:
    "The official home of country artist Rylan Hayes. New album Neon Porch Lights out now, 2027 tour dates, music, videos and merchandise.",
  path: "/",
});

const marqueeItems = [
  "Neon Porch Lights — out now",
  "2027 tour on sale",
  "New vinyl & merch",
  "Nashville, Tennessee",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />
      <ReleaseSection />
      <TourPreview />
      <VideoSection />
      <AboutSection />
      <StoreSection />
      <SignupBand />
    </>
  );
}
