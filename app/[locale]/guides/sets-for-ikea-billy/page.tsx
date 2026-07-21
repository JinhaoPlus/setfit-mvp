import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BillyGuideContent } from "@/views/BillyGuidePage";
import { isLocale, localizedAlternates } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).billyGuide;
  return { title: t.metaTitle, description: t.metaDescription, alternates: localizedAlternates(locale, "/guides/sets-for-ikea-billy") };
}

export default async function LocalizedBillyGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <BillyGuideContent locale={locale} />;
}
