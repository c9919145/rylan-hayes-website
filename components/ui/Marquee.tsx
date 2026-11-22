import { cn } from "@/lib/format";

interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
}

export function Marquee({ items, className, separator = "✦" }: MarqueeProps) {
  const content = [...items, ...items];
  return (
    <div className={cn("overflow-hidden border-y border-line bg-ink-2 py-4", className)}>
      <div className="marquee items-center" aria-hidden="true">
        {content.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-8 px-8 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cream-2"
          >
            {item}
            <span className="text-gold">{separator}</span>
          </span>
        ))}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
