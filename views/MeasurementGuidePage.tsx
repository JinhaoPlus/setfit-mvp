import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { getMeasurementGuide } from "@/data/measurement-guide";

export function MeasurementGuideContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const content = getMeasurementGuide(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="inner-main">
        <section className="page-hero shell">
          <nav className="breadcrumb" aria-label={t.common.breadcrumb}>
            <Link href={localePath(locale)}>{t.common.home}</Link>
            <span>/</span>
            <span>{t.common.guides}</span>
          </nav>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="page-title">{content.title}</h1>
          <p className="page-intro">{content.intro}</p>
        </section>
        <section className="guide-body shell">
          <aside className="guide-aside">
            <strong>{content.asideTitle}</strong>
            <p>{content.asideCopy}</p>
          </aside>
          <article className="guide-copy measurement-guide-copy">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
            <section className="guide-next-step">
              <h2>{content.calculatorTitle}</h2>
              <p>{content.calculatorCopy}</p>
              <Link className="button button-secondary" href={`${localePath(locale)}#fit-checker`}>{content.calculatorLink}</Link>
            </section>
          </article>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
