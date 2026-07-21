import Link from "next/link";
import { GuideSetIdentity } from "@/components/GuideSetIdentity";
import { LocalizedMeasurement } from "@/components/LocalizedMeasurement";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { planningSets } from "@/data/sets";

export function ShallowSetsGuideContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const shallow = planningSets.filter((set) => set.corrected_depth_cm <= 30).sort((a, b) => a.corrected_depth_cm - b.corrected_depth_cm);
  return <><SiteHeader locale={locale} /><main className="inner-main"><section className="page-hero shell"><nav className="breadcrumb" aria-label={t.common.breadcrumb}><Link href={localePath(locale)}>{t.common.home}</Link><span>/</span><span>{t.common.guides}</span></nav><p className="eyebrow">{t.shallowGuide.eyebrow}</p><h1 className="page-title">{t.shallowGuide.title}</h1><p className="page-intro">{t.shallowGuide.intro}</p></section><section className="guide-body shell"><aside className="guide-aside"><strong>{shallow.length} {t.shallowGuide.qualify}</strong><p>{t.shallowGuide.aside}</p></aside><article className="guide-copy"><h2>{t.shallowGuide.listTitle}</h2><p>{t.shallowGuide.listCopy}</p><table className="guide-table"><thead><tr><th>{t.common.set}</th><th>{t.common.depth}</th><th>{t.common.width}</th><th>{t.common.height}</th></tr></thead><tbody>{shallow.map((set) => <tr key={set.set_id}><td><GuideSetIdentity set={set} locale={locale} /></td><td><strong><LocalizedMeasurement valueCm={set.corrected_depth_cm} /></strong></td><td><LocalizedMeasurement valueCm={set.corrected_width_cm} /></td><td><LocalizedMeasurement valueCm={set.corrected_height_cm} /></td></tr>)}</tbody></table><h2>{t.shallowGuide.beforeTitle}</h2><p>{t.shallowGuide.beforeCopy}</p></article></section></main><SiteFooter locale={locale} /></>;
}
