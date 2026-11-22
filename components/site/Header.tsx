"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site, socials, streaming } from "@/lib/site";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { useEscape, useFocusTrap, useLockBodyScroll } from "@/lib/hooks";

export function Header() {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useLockBodyScroll(menuOpen);
  useEscape(menuOpen, () => setMenuOpen(false));
  useFocusTrap(menuOpen, menuRef);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "overflow-hidden bg-gold text-ink transition-[max-height,opacity] duration-500",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <Link
          href={site.announcement.href}
          className="group flex min-h-9 items-center justify-center gap-2.5 px-4 py-2 text-center font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
        >
          <span className="opacity-70">{site.announcement.label}</span>
          <span aria-hidden="true" className="h-3 w-px bg-ink/30" />
          <span>{site.announcement.text}</span>
          <Icon
            name="arrow-right"
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div
        className={cn(
          "transition-colors duration-500",
          scrolled
            ? "border-b border-line bg-ink/92 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent",
        )}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="group flex flex-col leading-none" aria-label={`${site.name} home`}>
            <span className="font-display text-[1.45rem] tracking-[0.01em] text-cream transition-colors group-hover:text-gold">
              Rylan Hayes
            </span>
            <span className="mt-1 font-condensed text-[0.48rem] font-semibold uppercase tracking-[0.46em] text-cream-3">
              Nashville · Tennessee
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navigation
              .filter((item) => item.href !== "/store" && item.href !== "/sign-up")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors",
                    isActive(item.href) ? "text-gold" : "text-cream/75 hover:text-cream",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                      isActive(item.href) ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/sign-up"
              className="hidden font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream/75 transition-colors hover:text-gold xl:block"
            >
              Sign Up
            </Link>
            <Link
              href="/store"
              className="hidden min-h-10 items-center gap-2 border border-line-strong px-4 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink sm:inline-flex"
            >
              Store
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center text-cream transition-colors hover:text-gold"
              aria-label={hydrated ? `Open cart, ${count} items` : "Open cart"}
            >
              <Icon name="cart" size={21} />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-condensed text-[0.62rem] font-bold leading-none text-ink">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center text-cream transition-colors hover:text-gold lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={23} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ink transition-[opacity,visibility] duration-300 lg:hidden",
          scrolled ? "top-[76px]" : "top-[112px]",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="container-x flex min-h-full flex-col pb-10 pt-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "group flex items-baseline justify-between border-b border-line py-4",
                  isActive(item.href) ? "text-gold" : "text-cream",
                )}
              >
                <span className="display text-[2rem] transition-transform duration-300 group-hover:translate-x-1">
                  {item.label}
                </span>
                <span className="font-condensed text-[0.62rem] tracking-[0.3em] text-cream-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/store"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className="btn btn-primary w-full"
            >
              Shop the store
              <Icon name="arrow-right" size={15} />
            </Link>
            <Link
              href="/tour"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className="btn btn-outline w-full"
            >
              Tour dates
              <Icon name="ticket" size={15} />
            </Link>
          </div>

          <div className="mt-auto pt-10">
            <p className="eyebrow mb-4">Listen</p>
            <div className="flex flex-wrap gap-2">
              {streaming.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                  className="inline-flex items-center gap-2 border border-line px-3 py-2 font-condensed text-[0.66rem] uppercase tracking-[0.16em] text-cream-2 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon name={platform.icon} size={14} />
                  {platform.label}
                </a>
              ))}
            </div>
            <p className="eyebrow mb-4 mt-7">Follow</p>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                  aria-label={`${site.name} on ${social.label}`}
                  className="inline-flex h-10 w-10 items-center justify-center border border-line text-cream-2 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
