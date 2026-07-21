import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildSetMetadata, SetDetailPageContent } from "@/views/SetDetailPage";
import { isLocale, siteConfig } from "@/config/site";
import { displaySets } from "@/data/sets";

export function generateStaticParams() {
  return siteConfig.locales.flatMap(({ code }) => displaySets.map((set) => ({ locale: code, slug: set.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  return isLocale(locale) ? buildSetMetadata(slug, locale) : {};
}

export default async function LocalizedSetDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  return <SetDetailPageContent slug={slug} locale={locale} />;
}
