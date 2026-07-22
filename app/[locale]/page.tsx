import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePageContent } from "@/views/HomePage";
import { isLocale, localizedAlternates, localeSettings, siteConfig, siteOrigin } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export function generateStaticParams() {
  return siteConfig.locales.map(({ code }) => ({ locale: code }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).home;
  const image = `${siteOrigin()}/og.png`;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localizedAlternates(locale),
    openGraph: { title: t.metaTitle, description: t.metaDescription, locale: localeSettings[locale].openGraphLocale, images: [{ url: image, width: 1200, height: 630, alt: t.metaTitle }] },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription, images: [image] },
  };
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePageContent locale={locale} />;
}
