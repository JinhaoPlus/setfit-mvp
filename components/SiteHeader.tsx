import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MeasurementUnitSwitcher } from "@/components/MeasurementUnitSwitcher";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href={localePath(locale)} aria-label={t.nav.home}>
          <span className="brand-mark" aria-hidden="true" />
          <span>bricksfit</span>
        </Link>
        <nav className="main-nav" aria-label={t.nav.mainLabel}>
          <Link href={localePath(locale, "/sets")}>{t.nav.sets}</Link>
          <Link href={localePath(locale, "/methodology")}>{t.nav.methodology}</Link>
          <Link className="nav-cta" href={`${localePath(locale)}#fit-checker`}>{t.nav.calculator}</Link>
          <MeasurementUnitSwitcher label={t.calculator.unit} />
          <LanguageSwitcher locale={locale} label={t.nav.language} />
        </nav>
      </div>
    </header>
  );
}
