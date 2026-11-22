import type { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}

export function LegalLayout({ title, updated, intro, children }: LegalLayoutProps) {
  return (
    <section className="bg-ink pb-20 pt-36 md:pt-40">
      <div className="container-narrow">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] text-cream">{title}</h1>
        <p className="mt-3 font-condensed text-[0.62rem] uppercase tracking-[0.22em] text-cream-3">
          Last updated {updated}
        </p>
        {intro && (
          <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-cream-2">{intro}</p>
        )}
        <div className="prose-editorial mt-10 border-t border-line pt-8">{children}</div>
      </div>
    </section>
  );
}
