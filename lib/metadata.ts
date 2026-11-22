import type { Metadata } from "next";
import { site } from "./site";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

/**
 * Builds consistent per-page metadata. The root layout provides defaults, but
 * Open Graph and Twitter fields must be repeated per page because Next merges
 * those objects shallowly.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const socialTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: socialTitle,
      description,
      url: path,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
