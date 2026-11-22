import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "4", label: "Studio albums" },
  { value: "200+", label: "Shows played" },
  { value: "2", label: "Country Music Awards" },
];

export function AboutSection() {
  return (
    <section className="bg-cream py-20 text-ink md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="image-frame relative aspect-[4/5] border border-ink/10">
              <Image
                src="/images/portrait-rugged.webp"
                alt="Rylan Hayes in a wide-brim hat, looking out across the Tennessee hills"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 hidden bg-ink px-5 py-4 text-cream sm:block">
              <p className="font-condensed text-[0.55rem] uppercase tracking-[0.24em] text-gold">
                Est. 1992
              </p>
              <p className="mt-1 font-display text-lg">Dalton, Georgia</p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow eyebrow-rust">About Rylan</p>
              <h2 className="display mt-4 max-w-xl text-[clamp(2.6rem,5vw,4.4rem)] text-ink">
                A guitar, a porch, and a long way home.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="prose-editorial mt-6 max-w-xl">
                <p>
                  Rylan Hayes grew up on the same fifteen acres his grandfather farmed, learning
                  to play on a battered acoustic guitar with three strings and a story to tell.
                  He spent a decade playing honky-tonks across the South before{" "}
                  <strong>Backroad Gospel</strong> turned those late nights into a debut record.
                </p>
                <p>
                  Four albums later, he still writes about the same things — home, hard work,
                  heartbreak and the people who hold you together.{" "}
                  <strong>Neon Porch Lights</strong> is the sound of coming back to where it all
                  started.
                </p>
              </div>
              <p className="mt-6 font-display text-2xl italic text-ink/70">— Rylan</p>
            </Reveal>

            <Reveal delay={180} className="mt-9 grid grid-cols-3 gap-4 border-t border-ink/15 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[2rem] leading-none text-ink">{stat.value}</p>
                  <p className="mt-1.5 font-condensed text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={240} className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="dark" icon="arrow-right">
                Read the story
              </ButtonLink>
              <ButtonLink
                href="/sign-up"
                variant="outline-ink"
                icon="mail"
              >
                Join the list
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
