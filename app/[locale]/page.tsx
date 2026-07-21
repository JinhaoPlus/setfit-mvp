import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePageContent } from "@/views/HomePage";
import { isLocale, localizedAlternates, siteConfig } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export function generateStaticParams() {
  return siteConfig.locales.map(({ code }) => ({ locale: code }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).home;
  return { title: t.metaTitle, description: t.metaDescription, alternates: localizedAlternates(locale) };
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePageContent locale={locale} />;
}
