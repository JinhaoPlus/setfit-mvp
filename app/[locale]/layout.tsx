import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { MeasurementProvider } from "@/components/MeasurementProvider";
import { isLocale, localeSettings, siteConfig, siteOrigin } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import "../globals.css";

export function generateStaticParams() {
  return siteConfig.locales.map(({ code }) => ({ locale: code }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const origin = siteOrigin();
  return {
    metadataBase: new URL(origin),
    title: { default: t.meta.defaultTitle, template: "%s | bricksfit" },
    description: t.meta.defaultDescription,
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: t.meta.socialTitle,
      description: t.meta.socialDescription,
      type: "website",
      locale: localeSettings[locale].openGraphLocale,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: t.meta.socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.socialTitle,
      description: t.meta.socialDescription,
      images: [`${origin}/og.png`],
    },
  };
}

export default async function LocaleRootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <html lang={locale}>
      <body>
        <MeasurementProvider locale={locale}>{children}</MeasurementProvider>
        <AnalyticsConsent copy={t.analyticsConsent} privacyHref={`/${locale}/privacy`} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
