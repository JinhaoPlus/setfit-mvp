import Link from "next/link";
import { LocalizedDimensions } from "@/components/LocalizedMeasurement";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localePath, localeSettings, siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { planningSets } from "@/data/sets";

export function BillyGuideContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const localeConfig = localeSettings[locale];
  const { widthCm, depthCm, heightCm } = siteConfig.billyExampleCm;
  const rows = planningSets.map((set) => ({ set, strict: set.corrected_width_cm <= widthCm && set.corrected_depth_cm <= depthCm && set.corrected_height_cm <= heightCm }));
  return <><SiteHeader locale={locale} /><main className="inner-main"><section className="page-hero shell"><nav className="breadcrumb" aria-label={t.common.breadcrumb}><Link href={localePath(locale)}>{t.common.home}</Link><span>/</span><span>{t.common.guides}</span></nav><p className="eyebrow">{t.billyGuide.eyebrow}</p><h1 className="page-title">{t.billyGuide.title}</h1><p className="page-intro">{t.billyGuide.introBefore} <LocalizedDimensions dimensions={[{ valueCm: widthCm }, { valueCm: depthCm }, { valueCm: heightCm }]} /> {t.billyGuide.introAfter} {planningSets.length} {t.billyGuide.records}</p></section><section className="guide-body shell"><aside className="guide-aside"><strong>{t.billyGuide.testSpace}</strong><p><LocalizedDimensions dimensions={[{ valueCm: widthCm, axis: localeConfig.axes.width }, { valueCm: depthCm, axis: localeConfig.axes.depth }, { valueCm: heightCm, axis: localeConfig.axes.height }]} />{t.common.sentenceSeparator}{t.billyGuide.testCopy}</p></aside><article className="guide-copy"><h2>{t.billyGuide.tableTitle}</h2><p>{t.billyGuide.tableCopy}</p><table className="guide-table"><thead><tr><th>{t.common.set}</th><th>{t.billyGuide.built}</th><th>{t.billyGuide.strict}</th></tr></thead><tbody>{rows.map(({ set, strict }) => <tr key={set.set_id}><td><Link href={localePath(locale, `/sets/${set.slug}`)}>{set.name} #{set.set_number}</Link></td><td><LocalizedDimensions dimensions={[{ valueCm: set.corrected_width_cm }, { valueCm: set.corrected_depth_cm }, { valueCm: set.corrected_height_cm }]} /></td><td className={strict ? "status-yes" : "status-no"}>{strict ? t.common.yes : t.common.no}</td></tr>)}</tbody></table><h2>{t.billyGuide.measureTitle}</h2><p>{t.billyGuide.measureCopy}</p></article></section></main><SiteFooter locale={locale} /></>;
}
