import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localizedAlternates, siteConfig } from "@/config/site";
import { getInformationPage, informationPageNames, isInformationPage } from "@/data/information-pages";
import { InformationPageContent } from "@/views/InformationPage";

export function generateStaticParams() {
  return siteConfig.locales.flatMap(({ code }) => informationPageNames.map((infoPage) => ({ locale: code, infoPage })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; infoPage: string }> }): Promise<Metadata> {
  const { locale, infoPage } = await params;
  if (!isLocale(locale) || !isInformationPage(infoPage)) return {};
  const content = getInformationPage(locale, infoPage);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: localizedAlternates(locale, `/${infoPage}`),
  };
}

export default async function LocalizedInformationPage({ params }: { params: Promise<{ locale: string; infoPage: string }> }) {
  const { locale, infoPage } = await params;
  if (!isLocale(locale) || !isInformationPage(infoPage)) notFound();
  return <InformationPageContent locale={locale} page={infoPage} />;
}
