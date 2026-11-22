"use client";

import { useState } from "react";
import { videos, videoCategories, type VideoCategory } from "@/lib/videos";
import { VideoThumbnailButton } from "./VideoThumbnailButton";
import { cn } from "@/lib/format";

export function VideoGrid() {
  const [category, setCategory] = useState<"All" | VideoCategory>("All");
  const filtered =
    category === "All" ? videos : videos.filter((video) => video.category === category);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter videos by category"
      >
        {videoCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={cn(
              "min-h-10 border px-4 font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors",
              category === item
                ? "border-gold bg-gold text-ink"
                : "border-line text-cream-2 hover:border-cream hover:text-cream",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {filtered.map((video) => (
          <article key={video.slug}>
            <VideoThumbnailButton video={video} />
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream-2">
              {video.description}
            </p>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 border border-line px-6 py-12 text-center text-cream-2">
          No videos in this category yet. Check back soon.
        </p>
      )}
    </div>
  );
}
