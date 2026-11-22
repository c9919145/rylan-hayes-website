import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ink pb-20 pt-32">
      <div className="container-x text-center">
        <p className="eyebrow">Lost on the backroad</p>
        <p className="display mt-2 text-[clamp(6rem,20vw,14rem)] leading-none text-gold">404</p>
        <h1 className="display mt-2 text-[clamp(2.2rem,5vw,3.6rem)] text-cream">
          This page took a wrong turn
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-cream-2">
          The page you&apos;re looking for doesn&apos;t exist, moved, or sold out. Let&apos;s get you
          back to the music.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-gold">
            Back home
            <Icon name="arrow-right" size={15} />
          </Link>
          <Link href="/tour" className="btn btn-outline">
            Tour dates
            <Icon name="ticket" size={15} />
          </Link>
          <Link href="/store" className="btn btn-outline">
            The store
            <Icon name="cart" size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
