import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site, socials } from "@/lib/site";

const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

const barlow = localFont({
  src: [
    { path: "./fonts/barlow-condensed-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-condensed-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-condensed-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Rylan Hayes — Country Music",
    template: "%s | Rylan Hayes",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Rylan Hayes",
    "country music",
    "Neon Porch Lights",
    "country artist",
    "Nashville",
    "country tour",
    "new country album",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Rylan Hayes — Country Music",
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rylan Hayes — Country Music",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0e0f",
  colorScheme: "dark",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  genre: ["Country", "Americana"],
  foundingLocation: {
    "@type": "Place",
    name: "Nashville, Tennessee",
  },
  sameAs: socials.map((social) => social.href),
  album: {
    "@type": "MusicAlbum",
    name: "Neon Porch Lights",
    byArtist: { "@type": "MusicGroup", name: site.name },
    datePublished: "2026-10-16",
    numTracks: 12,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${barlow.variable} ${inter.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
