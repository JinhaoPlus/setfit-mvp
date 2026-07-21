import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export function PrivacyPageContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).privacy;
  return <><SiteHeader locale={locale} /><main className="inner-main"><section className="page-hero shell"><p className="eyebrow">{t.eyebrow}</p><h1 className="page-title">{t.title}</h1><p className="page-intro">{t.copy}</p></section><section className="privacy-details shell"><h2>{t.analyticsTitle}</h2><p>{t.analyticsCopy}</p></section></main><SiteFooter locale={locale} /></>;
}
