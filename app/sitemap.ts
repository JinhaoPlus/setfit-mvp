import type { MetadataRoute } from "next";
import { localePath, siteConfig, siteOrigin } from "@/config/site";
import { displaySets } from "@/data/sets";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteOrigin();
  const staticPages = [
    "",
    "/sets",
    "/methodology",
    "/about",
    "/contact",
    "/sources",
    "/terms",
    "/privacy",
    "/guides/how-to-measure-a-display-cabinet",
    "/guides/sets-for-ikea-billy",
    "/guides/large-brick-sets-under-30cm-deep",
  ];
  const paths = [...staticPages, ...displaySets.map((set) => `/sets/${set.slug}`)];
  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(siteConfig.locales.map(({ code }) => [code, `${base}${localePath(code, path)}`])),
      "x-default": `${base}${localePath(siteConfig.defaultLocale, path)}`,
    };
    return siteConfig.locales.map(({ code }) => ({
      url: `${base}${localePath(code, path)}`,
      alternates: { languages },
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/sets/") ? .8 : .7,
    }));
  });
}
