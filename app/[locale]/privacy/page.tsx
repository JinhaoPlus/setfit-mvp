import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPageContent } from "@/views/PrivacyPage";
import { isLocale, localizedAlternates } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).privacy;
  return { title: t.metaTitle, description: t.metaDescription, alternates: localizedAlternates(locale, "/privacy") };
}

export default async function LocalizedPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PrivacyPageContent locale={locale} />;
}
