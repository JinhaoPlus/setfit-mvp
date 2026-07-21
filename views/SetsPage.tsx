import { SetLibrary } from "@/components/SetLibrary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localeSettings, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { getLocalizedSetCatalog, libraryStats } from "@/data/sets";

export function SetsPageContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const localeConfig = localeSettings[locale];
  const librarySets = getLocalizedSetCatalog(locale).displaySets.map((set) => ({
    set_id: set.set_id,
    set_number: set.set_number,
    name: set.name,
    theme: set.theme,
    pieces: set.pieces,
    rank_by_pieces: set.rank_by_pieces,
    owned: set.owned,
    slug: set.slug,
    image_available: set.image_available,
    corrected_height_cm: set.corrected_height_cm,
    corrected_width_cm: set.corrected_width_cm,
    corrected_depth_cm: set.corrected_depth_cm,
    correction_method: set.correction_method,
    correction_confidence: set.correction_confidence,
  }));
  return (
    <><SiteHeader locale={locale} /><main className="inner-main">
      <section className="page-hero shell"><p className="eyebrow">{t.setsPage.eyebrow}</p><h1 className="page-title">{t.setsPage.title}</h1><p className="page-intro">{t.setsPage.covers} {libraryStats.largestPieceCount.toLocaleString(localeConfig.numberLocale)} {t.setsPage.downTo} {libraryStats.smallestPieceCount.toLocaleString(localeConfig.numberLocale)} {t.setsPage.pieceSuffix}{t.setsPage.dimensionsAvailable} {libraryStats.planningDimensions}{t.common.recordSeparator}{libraryStats.noFixedSize} {t.setsPage.noFixed}</p></section>
      <section className="all-sets-section shell"><div className="filters-note"><span>{t.setsPage.currentLibrary}</span><span>{libraryStats.planningDimensions} {t.setsPage.built}</span><span>{libraryStats.packageDimensions} {t.setsPage.packages}</span><span>{libraryStats.packageWeight} {t.setsPage.weights}</span></div><SetLibrary sets={librarySets} locale={locale} /></section>
    </main><SiteFooter locale={locale} /></>
  );
}
