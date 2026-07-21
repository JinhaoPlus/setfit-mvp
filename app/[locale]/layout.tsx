import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { isLocale, localeSettings, siteConfig } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import "../globals.css";

export function generateStaticParams() {
  return siteConfig.locales.map(({ code }) => ({ locale: code }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: { default: t.meta.defaultTitle, template: "%s | SetFit" },
    description: t.meta.defaultDescription,
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
        {children}
        <AnalyticsConsent copy={t.analyticsConsent} privacyHref={`/${locale}/privacy`} />
      </body>
    </html>
  );
}
