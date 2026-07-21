import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SetsPageContent } from "@/views/SetsPage";
import { isLocale, localizedAlternates } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).setsPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: localizedAlternates(locale, "/sets") };
}

export default async function LocalizedSetsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SetsPageContent locale={locale} />;
}
