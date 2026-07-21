import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShallowSetsGuideContent } from "@/views/ShallowSetsGuidePage";
import { isLocale, localizedAlternates } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).shallowGuide;
  return { title: t.metaTitle, description: t.metaDescription, alternates: localizedAlternates(locale, "/guides/large-brick-sets-under-30cm-deep") };
}

export default async function LocalizedShallowGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ShallowSetsGuideContent locale={locale} />;
}
