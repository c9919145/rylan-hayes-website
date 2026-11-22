import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <Reveal className="max-w-2xl">
        {eyebrow && (
          <p className={cn("eyebrow mb-4", light && "eyebrow-ink")}>{eyebrow}</p>
        )}
        <h2
          className={cn(
            "display text-[clamp(2.4rem,5vw,4.6rem)]",
            light ? "text-ink" : "text-cream",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-5 max-w-xl text-[0.98rem] leading-relaxed",
              light ? "text-ink/70" : "text-cream-2",
            )}
          >
            {description}
          </p>
        )}
      </Reveal>
      {action && (
        <Reveal delay={100} className="shrink-0">
          <Link
            href={action.href}
            className={cn("link-arrow group", light && "link-arrow-ink")}
          >
            {action.label}
            <Icon name="arrow-right" size={16} />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
