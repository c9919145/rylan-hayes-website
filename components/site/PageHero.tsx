import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  children?: ReactNode;
  align?: "left" | "center";
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "center",
  children,
  align = "left",
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden border-b border-line grain",
        compact ? "min-h-[52vh]" : "min-h-[64vh]",
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/45" />
      <div className="absolute inset-0 vignette" />
      <div className="container-x relative z-10 pb-14 pt-40 md:pb-20 md:pt-48">
        <div
          className={cn(
            "max-w-4xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          <p className="eyebrow hero-rise">{eyebrow}</p>
          <h1 className="display mt-5 text-[clamp(3rem,8vw,6.5rem)] text-cream hero-rise [--rise-delay:100ms]">
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-6 max-w-2xl text-[1rem] leading-relaxed text-cream-2 hero-rise [--rise-delay:200ms]",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          )}
          {children && <div className="mt-8 hero-rise [--rise-delay:300ms]">{children}</div>}
        </div>
      </div>
    </section>
  );
}
