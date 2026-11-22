"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/lib/videos";
import { Icon } from "@/components/ui/Icon";
import { VideoModal } from "./VideoModal";
import { cn } from "@/lib/format";

interface PlayButtonProps {
  video: Video;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function VideoThumbnailButton({
  video,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: PlayButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("group relative block w-full overflow-hidden bg-ink-3 text-left", className)}
        aria-label={`Play ${video.title} (${video.category})`}
      >
        <span className="relative block aspect-video w-full">
          <Image
            src={video.thumbnail}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-soft)] group-hover:scale-[1.04]"
          />
        </span>
        <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-ink/35 text-cream backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink sm:h-20 sm:w-20">
          <Icon name="play" size={24} className="ml-0.5" />
        </span>
        <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 sm:p-5">
          <span>
            <span className="block font-condensed text-[0.6rem] uppercase tracking-[0.24em] text-gold">
              {video.category} · {video.year}
            </span>
            <span className="mt-1 block font-display text-xl text-cream sm:text-2xl">
              {video.title}
            </span>
          </span>
          <span className="font-condensed text-[0.65rem] uppercase tracking-[0.16em] text-cream-2">
            {video.duration}
          </span>
        </span>
      </button>
      <VideoModal video={open ? video : null} onClose={() => setOpen(false)} />
    </>
  );
}
