import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { getInformationPage, type InformationPageName } from "@/data/information-pages";

export function InformationPageContent({ locale, page }: { locale: Locale; page: InformationPageName }) {
  const t = getDictionary(locale);
  const content = getInformationPage(locale, page);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="inner-main">
        <section className="page-hero shell">
          <nav className="breadcrumb" aria-label={t.common.breadcrumb}>
            <Link href={localePath(locale)}>{t.common.home}</Link>
            <span>/</span>
            <span>{content.shortTitle}</span>
          </nav>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="page-title">{content.title}</h1>
          <p className="page-intro">{content.intro}</p>
        </section>
        <section className="information-sections shell">
          {content.sections.map((section) => (
            <article className="information-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.links.length > 0 ? (
                <ul className="information-links">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("mailto:")
                        ? <a href={link.href}>{link.label} →</a>
                        : link.external
                        ? <a href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
                        : <Link href={localePath(locale, link.href)}>{link.label} →</Link>}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
