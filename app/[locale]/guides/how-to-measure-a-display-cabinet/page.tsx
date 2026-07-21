import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedAlternates } from "@/config/site";
import { getMeasurementGuide } from "@/data/measurement-guide";
import { MeasurementGuideContent } from "@/views/MeasurementGuidePage";

const guidePath = "/guides/how-to-measure-a-display-cabinet";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getMeasurementGuide(locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: localizedAlternates(locale, guidePath),
  };
}

export default async function LocalizedMeasurementGuide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MeasurementGuideContent locale={locale} />;
}
