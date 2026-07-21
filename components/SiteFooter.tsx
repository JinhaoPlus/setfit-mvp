import Link from "next/link";
import { AnalyticsSettingsButton } from "@/components/AnalyticsSettingsButton";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="site-footer">
      <div className="shell footer-shell">
        <div className="footer-top">
          <div>
            <Link className="brand" href={localePath(locale)}>
              <span className="brand-mark" aria-hidden="true" /> bricksfit
            </Link>
            <p className="footer-copy">{t.footer.copy}</p>
          </div>
          <nav className="footer-nav" aria-label={t.footer.navigation}>
            <Link href={localePath(locale, "/sets")}>{t.nav.sets}</Link>
            <Link href={localePath(locale, "/methodology")}>{t.nav.methodology}</Link>
            <Link href={localePath(locale, "/privacy")}>{t.footer.privacy}</Link>
            <AnalyticsSettingsButton>{t.footer.analyticsSettings}</AnalyticsSettingsButton>
          </nav>
        </div>
        <p className="footer-legal">
          {t.footer.legal} <a href="https://brickset.com/article/52659/about-brickset" target="_blank" rel="noreferrer">{t.footer.images}</a>
        </p>
      </div>
    </footer>
  );
}
