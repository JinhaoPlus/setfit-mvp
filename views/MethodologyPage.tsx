import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localeSettings, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { libraryStats } from "@/data/sets";

export function MethodologyPageContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).methodology;
  const localeConfig = localeSettings[locale];
  const planned = libraryStats.inferred + libraryStats.estimated;
  return <><SiteHeader locale={locale} /><main className="inner-main"><section className="page-hero shell"><p className="eyebrow">{t.snapshot}</p><h1 className="page-title">{t.title}</h1><p className="page-intro">{t.intro}</p></section><section className="section shell"><div className="method-grid"><article className="method-card"><span className="method-grade">01</span><h3>{t.officialTitle}</h3><p>{libraryStats.official} {t.officialCopy}</p></article><article className="method-card"><span className="method-grade">02</span><h3>{t.directTitle}</h3><p>{libraryStats.direct} {t.directCopy}</p></article><article className="method-card"><span className="method-grade">03</span><h3>{t.planningTitle}</h3><p>{planned} {t.planningCopy}</p></article><article className="method-card"><span className="method-grade">04</span><h3>{t.noFixedTitle}</h3><p>{libraryStats.noFixedSize} {t.noFixedCopy}</p></article></div><article className="content-block methodology-copy"><h2>{t.scopeTitle}</h2><p>{t.scopeBefore} {libraryStats.smallestPieceCount.toLocaleString(localeConfig.numberLocale)}{t.scopeAfter}</p><h2>{t.quietTitle}</h2><p>{t.quietCopy}</p><h2>{t.allowanceTitle}</h2><p>{t.allowanceCopy}</p><h2>{t.calculatorTitle}</h2><p>{t.calculatorBefore} {libraryStats.planningDimensions} {t.calculatorAfter}</p></article></section></main><SiteFooter locale={locale} /></>;
}
