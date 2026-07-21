import type { MetadataRoute } from "next";
import { localePath, siteConfig } from "@/config/site";
import { displaySets } from "@/data/sets";

export default function sitemap(): MetadataRoute.Sitemap {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")).replace(/\/$/, "");
  const staticPages = ["", "/sets", "/methodology", "/privacy", "/guides/sets-for-ikea-billy", "/guides/large-brick-sets-under-30cm-deep"];
  const paths = [...staticPages, ...displaySets.map((set) => `/sets/${set.slug}`)];
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(siteConfig.locales.map(({ code }) => [code, `${base}${localePath(code, path)}`]));
    return siteConfig.locales.map(({ code }) => ({
      url: `${base}${localePath(code, path)}`,
      alternates: { languages },
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/sets/") ? .8 : .7,
    }));
  });
}
