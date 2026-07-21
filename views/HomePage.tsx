import Link from "next/link";
import { ShelfFitCalculator } from "@/components/ShelfFitCalculator";
import { SetCard } from "@/components/SetCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localePath, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { calculatorSetOptions, displaySets, libraryStats } from "@/data/sets";

export function HomePageContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const featured = displaySets.slice(0, 6);

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h1>{t.home.title}</h1>
            <p className="hero-lede">
              {t.home.intro}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#fit-checker">
                {t.home.checkShelf}
              </a>
              <Link className="text-link" href={localePath(locale, "/sets")}>
                {t.home.browse} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <dl className="trust-row">
              <div>
                <dt>H/W/D</dt>
                <dd>{t.home.plainDimensions}</dd>
              </div>
              <div>
                <dt>{libraryStats.planningDimensions}</dt>
                <dd>{t.home.dimensionRecords}</dd>
              </div>
              <div>
                <dt>{libraryStats.packageDimensions}</dt>
                <dd>{t.home.packageRecords}</dd>
              </div>
            </dl>
          </div>

          <div id="fit-checker" className="hero-tool">
            <ShelfFitCalculator sets={calculatorSetOptions} locale={locale} />
          </div>
        </section>

        <section className="how-strip">
          <div className="shell how-grid">
            <p className="eyebrow">{t.home.oneAnswer}</p>
            <ol>
              <li><span>01</span> {t.home.step1}</li>
              <li><span>02</span> {t.home.step2}</li>
              <li><span>03</span> {t.home.step3}</li>
            </ol>
          </div>
        </section>

        <section className="section shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">{t.home.libraryEyebrow}</p>
              <h2>{t.home.libraryTitle}</h2>
            </div>
            <p>
              {t.home.libraryCopy}
            </p>
          </div>
          <div className="set-grid">
            {featured.map((set) => <SetCard key={set.set_id} set={set} locale={locale} />)}
          </div>
          <div className="section-cta">
            <Link className="button button-secondary" href={localePath(locale, "/sets")}>
              {t.home.explore}
            </Link>
          </div>
        </section>

        <section className="section shell evidence-section">
          <div>
            <p className="eyebrow">{t.home.why}</p>
            <h2>{t.home.boxTitle}</h2>
            <p>{t.home.boxCopy}</p>
          </div>
          <div className="comparison-card" aria-label={t.home.comparisonAria}>
            <div className="comparison-row muted-row">
              <span>{t.home.retailPackage}</span><strong>47.5 × 58.5 × 38.5 cm</strong>
              <small>{t.home.packageHwd}</small>
            </div>
            <div className="comparison-row active-row">
              <span>{t.home.builtModel}</span><strong>44 × 16 × 135 cm</strong>
              <small>{t.home.officialHwd}</small>
            </div>
            <p className="fine-print">{t.common.set} 10294{t.common.sentenceEnd}</p>
          </div>
        </section>

        <section className="section shell guide-teasers">
          <article className="guide-teaser guide-green">
            <p className="eyebrow">{t.home.shelfGuide}</p>
            <h3>{t.home.billyTitle}</h3>
            <p>{t.home.billyCopy}</p>
            <Link href={localePath(locale, "/guides/sets-for-ikea-billy")}>{t.home.readGuide} →</Link>
          </article>
          <article className="guide-teaser guide-yellow">
            <p className="eyebrow">{t.home.shortlist}</p>
            <h3>{t.home.shallowTitle}</h3>
            <p>{t.home.shallowCopy}</p>
            <Link href={localePath(locale, "/guides/large-brick-sets-under-30cm-deep")}>{t.home.seeShortlist} →</Link>
          </article>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
