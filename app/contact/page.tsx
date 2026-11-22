import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { site, socials } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Rylan Hayes — general questions, booking, press inquiries and store support.",
  path: "/contact",
});

const contacts = [
  {
    label: "General",
    email: site.email,
    detail: "Questions, fan mail and everything else.",
  },
  {
    label: "Booking",
    email: site.bookingEmail,
    detail: "Live shows, festivals and private events.",
  },
  {
    label: "Press",
    email: site.pressEmail,
    detail: "Interviews, features and media requests.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Say hello"
        description="Whether it's a question about an order, a booking inquiry or a note about a song — we read everything and reply as soon as we can."
        image="/images/cowboy-sunset.webp"
        imageAlt="A cowboy silhouetted against a wide sunset on the open range"
        imagePosition="center 55%"
        compact
      />

      <section className="bg-ink py-20 md:py-24">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">Contact</p>
                <h2 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.6rem)] text-cream">
                  The right inbox, right away.
                </h2>
                <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-cream-2">
                  Use the form for the fastest response, or reach the appropriate team directly.
                  We aim to reply within two business days.
                </p>
              </Reveal>

              <div className="mt-9 space-y-5">
                {contacts.map((contact, index) => (
                  <Reveal key={contact.label} delay={index * 70}>
                    <div className="border border-line p-5">
                      <p className="font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">
                        {contact.label}
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-2 block font-display text-xl text-cream transition-colors hover:text-gold"
                      >
                        {contact.email}
                      </a>
                      <p className="mt-1 text-[0.82rem] text-cream-3">{contact.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={220} className="mt-8">
                <p className="font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream-3">
                  Based in
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-[0.9rem] text-cream-2">
                  <Icon name="pin" size={15} className="text-gold" />
                  {site.location}
                </p>
                <div className="mt-5 flex gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${social.label}`}
                      className="inline-flex h-10 w-10 items-center justify-center border border-line text-cream-2 transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon name={social.icon} size={16} />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="border border-line bg-ink-2 p-6 sm:p-8">
                <p className="eyebrow">Send a message</p>
                <h2 className="mt-3 font-display text-3xl text-cream">What&apos;s on your mind?</h2>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
