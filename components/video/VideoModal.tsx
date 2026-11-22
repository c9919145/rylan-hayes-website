"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Video } from "@/lib/videos";
import { Icon } from "@/components/ui/Icon";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useLockBodyScroll(Boolean(video));
  useEscape(Boolean(video), onClose);
  useFocusTrap(Boolean(video), dialogRef, closeRef);

  useEffect(() => {
    if (video) {
      const timer = window.setTimeout(() => closeRef.current?.focus(), 50);
      return () => window.clearTimeout(timer);
    }
  }, [video]);

  if (!mounted || !video) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} video player`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="font-condensed text-[0.62rem] uppercase tracking-[0.24em] text-gold">
              {video.category} · {video.year}
            </p>
            <h2 className="mt-1 font-display text-2xl text-cream sm:text-3xl">{video.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line-strong text-cream transition-colors hover:border-cream hover:text-gold"
            aria-label="Close video"
          >
            <Icon name="close" size={19} />
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden border border-line bg-black shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${video.title} — ${video.category}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream-2">{video.description}</p>
      </div>
    </div>,
    document.body,
  );
}
