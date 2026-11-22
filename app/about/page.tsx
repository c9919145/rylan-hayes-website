import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "About",
  description:
    "The story of country artist Rylan Hayes — from a farm outside Dalton, Georgia to sold-out theaters and the new album Neon Porch Lights.",
  path: "/about",
});

const timeline = [
  {
    year: "1992",
    title: "Dalton, Georgia",
    body: "Born on the same fifteen acres his grandfather farmed. Learned three chords on a guitar with three strings.",
  },
  {
    year: "2014",
    title: "First honky-tonk residency",
    body: "Moved to Nashville with a duffel bag and a demo. Played four sets a night, five nights a week, for two years.",
  },
  {
    year: "2020",
    title: "Backroad Gospel",
    body: "Recorded in a converted garage outside Dalton. Ten songs, one microphone and a loan from his uncle.",
  },
  {
    year: "2022",
    title: "Long Way Home",
    body: "The sophomore record took him from clubs to theaters and earned his first Country Music Award.",
  },
  {
    year: "2024",
    title: "Dust & Diamonds",
    body: "\"Whiskey Weather\" spent three weeks at No. 1 and turned a barroom song into a stadium singalong.",
  },
  {
    year: "2026",
    title: "Neon Porch Lights",
    body: "Twelve songs recorded live to tape in East Nashville — the most personal record of his career.",
  },
  {
    year: "2027",
    title: "The Neon Porch Lights Tour",
    body: "Twenty-one nights across the U.S., from the Ryman Auditorium to a finale at Bridgestone Arena.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The story"
        title="The long way home"
        description="A farm kid from north Georgia, a decade of honky-tonks, and a guitar that never left his side."
        image="/images/portrait-hat.webp"
        imageAlt="Rylan Hayes in a wide-brimmed hat against an open sky"
        imagePosition="center 30%"
      />

      <section className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <Reveal>
              <div className="image-frame relative aspect-[4/5] border border-line">
                <Image
                  src="/images/portrait-bw.webp"
                  alt="Black and white portrait of Rylan Hayes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center grayscale"
                />
              </div>
              <p className="mt-3 font-condensed text-[0.58rem] uppercase tracking-[0.24em] text-cream-3">
                Nashville, Tennessee · 2026
              </p>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow">Where it started</p>
                <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4rem)] text-cream">
                  Raised on hard work and good songs.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="prose-editorial mt-6 max-w-xl">
                  <p className="drop-cap">
                    Rylan Hayes was born in Dalton, Georgia, a town known for carpet mills and
                    high school football. His grandfather kept cattle on the back fifteen and
                    played Merle Haggard on a cassette deck in the barn. By twelve, Rylan was
                    sitting in on weekend jam sessions at the VFW hall, learning to keep time
                    before he learned to lead.
                  </p>
                  <p>
                    He moved to Nashville at twenty-two with a duffel bag, a demo and no plan B.
                    For two years he played four sets a night on Broadway, sleeping in a van
                    behind the bar and writing on napkins between shifts. Those years taught him
                    how to hold a room — and how to write a chorus that people would sing back
                    before they knew the words.
                  </p>
                  <p>
                    The debut album, <strong>Backroad Gospel</strong>, was recorded in a converted
                    garage outside Dalton with borrowed gear and a lot of friends. It did what no
                    one expected: it traveled. Four years later,{" "}
                    <strong>Dust &amp; Diamonds</strong> put a No. 1 on the board and a red-eye
                    schedule on the calendar.
                  </p>
                  <p>
                    <strong>Neon Porch Lights</strong> is a homecoming record. Recorded live to
                    tape in East Nashville with the band that has played every one of those
                    honky-tonk nights, it sounds like the porch light left on for someone you
                    love.
                  </p>
                </div>
                <p className="mt-6 font-display text-2xl italic text-cream/70">— Rylan</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-line grain">
        <Image
          src="/images/singer-guitar.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="container-x relative z-10 py-20 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Icon name="quote" size={30} className="mx-auto text-gold" />
            <blockquote className="display mt-6 text-[clamp(1.9rem,4vw,3.4rem)] text-cream">
              “I&apos;ve never written a song about somewhere I haven&apos;t been. The porch, the
              truck, the dog, the girl — it&apos;s all real.”
            </blockquote>
            <p className="mt-6 font-condensed text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-cream-3">
              Rylan Hayes · Neon Porch Lights
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Milestones</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] text-cream">
                A few stops along the way
              </h2>
              <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-cream-2">
                No overnight success — just a long, steady climb and a lot of miles on the
                odometer.
              </p>
            </Reveal>

            <ol className="border-l border-line">
              {timeline.map((item, index) => (
                <Reveal key={item.year} as="li" delay={index * 60} className="relative pl-7 pb-8 last:pb-0">
                  <span className="absolute -left-[4.5px] top-2 h-2 w-2 rounded-full bg-gold" />
                  <p className="font-condensed text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold">
                    {item.year}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl text-cream">{item.title}</h3>
                  <p className="mt-1.5 max-w-lg text-[0.88rem] leading-relaxed text-cream-2">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-20 md:py-28">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="grid grid-cols-2 gap-4">
              <div className="image-frame relative aspect-[3/4] border border-line">
                <Image
                  src="/images/cowboy-sunset.webp"
                  alt="A cowboy silhouetted against a sunset on the open range"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="image-frame relative mt-10 aspect-[3/4] border border-line">
                <Image
                  src="/images/venue.webp"
                  alt="The empty floor of a historic theater before doors open"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow">Off stage</p>
                <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] text-cream">
                  Same guy, smaller rooms.
                </h2>
                <div className="prose-editorial mt-5 max-w-xl">
                  <p>
                    When he isn&apos;t touring, Rylan is usually home in Nashville with his dog,
                    Waylon, a truck that refuses to die and a notebook full of half-finished
                    songs. He still writes every morning, still plays the same guitar he bought
                    at a pawn shop in 2011, and still calls his grandmother every Sunday.
                  </p>
                  <p>
                    He co-writes with the same handful of friends he met on Broadway, mentors
                    young artists through the Nashville Songwriters Association, and spends at
                    least one week every fall back in Dalton, sitting on the porch where it all
                    began.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={120} className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/tour" variant="gold" icon="ticket">
                  See the tour
                </ButtonLink>
                <ButtonLink href="/sign-up" variant="outline" icon="mail">
                  Join the list
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
