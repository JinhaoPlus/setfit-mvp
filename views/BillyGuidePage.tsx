import Link from "next/link";
import { CabinetFitGuide, type CabinetGuideSet } from "@/components/CabinetFitGuide";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { getLocalizedSetCatalog } from "@/data/sets";

export function BillyGuideContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const planningSets = getLocalizedSetCatalog(locale).planningSets;
  const guideSets: CabinetGuideSet[] = planningSets.map((set) => ({
    set_id: set.set_id,
    set_number: set.set_number,
    name: set.name,
    slug: set.slug,
    image_available: set.image_available,
    widthCm: set.corrected_width_cm,
    depthCm: set.corrected_depth_cm,
    heightCm: set.corrected_height_cm,
  }));
  return <><SiteHeader locale={locale} /><main className="inner-main"><section className="page-hero shell"><nav className="breadcrumb" aria-label={t.common.breadcrumb}><Link href={localePath(locale)}>{t.common.home}</Link><span>/</span><span>{t.common.guides}</span></nav><p className="eyebrow">{t.billyGuide.eyebrow}</p><h1 className="page-title">{t.billyGuide.title}</h1><p className="page-intro">{t.billyGuide.intro} {planningSets.length} {t.billyGuide.records}</p></section><CabinetFitGuide locale={locale} sets={guideSets} /></main><SiteFooter locale={locale} /></>;
}
