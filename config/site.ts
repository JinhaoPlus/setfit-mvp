export const siteConfig = {
  defaultLocale: "en",
  locales: [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ],
  localeCookie: "setfit_locale",
  shelfStorageKey: "setfit:shelf-preferences:v1",
  libraryPageSize: 24,
  displayClearanceCm: 5,
  defaultShelfCm: { widthCm: 140, depthCm: 50, heightCm: 60 },
  billyExampleCm: { widthCm: 76, depthCm: 28, heightCm: 100 },
} as const;

export function siteOrigin() {
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL
    ?? (vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000");

  return new URL(configuredUrl).origin;
}

export type Locale = (typeof siteConfig.locales)[number]["code"];

export const localeSettings = {
  en: { numberLocale: "en-US", openGraphLocale: "en_US", axes: { height: "H", width: "W", depth: "D" }, defaultUnit: "in" },
  de: { numberLocale: "de-DE", openGraphLocale: "de_DE", axes: { height: "H", width: "B", depth: "T" }, defaultUnit: "cm" },
  zh: { numberLocale: "zh-CN", openGraphLocale: "zh_CN", axes: { height: "高", width: "宽", depth: "深" }, defaultUnit: "cm" },
} as const satisfies Record<Locale, {
  numberLocale: string;
  openGraphLocale: string;
  axes: { height: string; width: string; depth: string };
  defaultUnit: "cm" | "in";
}>;

export function normalizeLocale(value: string | undefined): Locale {
  return siteConfig.locales.some((locale) => locale.code === value)
    ? value as Locale
    : siteConfig.defaultLocale;
}

export function isLocale(value: string): value is Locale {
  return siteConfig.locales.some((locale) => locale.code === value);
}

export function localePath(locale: Locale, path = "") {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function localizedAlternates(locale: Locale, path = "") {
  const languages = Object.fromEntries(siteConfig.locales.map(({ code }) => [code, localePath(code, path)]));
  return {
    canonical: localePath(locale, path),
    languages: {
      ...languages,
      "x-default": localePath(siteConfig.defaultLocale, path),
    },
  };
}
