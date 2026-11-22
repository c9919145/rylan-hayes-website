import Link from "next/link";
import { legalLinks, navigation, site, socials, streaming } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex flex-col leading-none" aria-label={`${site.name} home`}>
              <span className="font-display text-[1.9rem] text-cream">Rylan Hayes</span>
              <span className="mt-2 font-condensed text-[0.5rem] font-semibold uppercase tracking-[0.46em] text-cream-3">
                Nashville · Tennessee
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream-2">
              Country music, straight from the heart. New album{" "}
              <span className="text-cream">Neon Porch Lights</span> out now.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
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
          </div>

          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-2 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Listen</p>
            <ul className="space-y-3">
              {streaming.map((platform) => (
                <li key={platform.label}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-cream-2 transition-colors hover:text-gold"
                  >
                    <Icon name={platform.icon} size={15} />
                    {platform.label}
                    <Icon
                      name="arrow-up-right"
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-cream-2">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.bookingEmail}`}
                  className="transition-colors hover:text-gold"
                >
                  Booking
                </a>
              </li>
              <li>
                <a href={`mailto:${site.pressEmail}`} className="transition-colors hover:text-gold">
                  Press
                </a>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-gold">
                  Contact form
                </Link>
              </li>
            </ul>
            <p className="mt-6 font-condensed text-[0.62rem] uppercase tracking-[0.22em] text-cream-3">
              {site.location}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-condensed text-[0.62rem] uppercase tracking-[0.2em] text-cream-3">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-condensed text-[0.62rem] uppercase tracking-[0.2em] text-cream-3 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
