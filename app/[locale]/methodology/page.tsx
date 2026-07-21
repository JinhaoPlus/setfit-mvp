import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MethodologyPageContent } from "@/views/MethodologyPage";
import { isLocale, localizedAlternates } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).methodology;
  return { title: t.metaTitle, description: t.metaDescription, alternates: localizedAlternates(locale, "/methodology") };
}

export default async function LocalizedMethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MethodologyPageContent locale={locale} />;
}
