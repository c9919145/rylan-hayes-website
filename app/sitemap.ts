import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tour`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/music`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/videos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/sign-up`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/store`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/store/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...routes, ...productRoutes];
}
