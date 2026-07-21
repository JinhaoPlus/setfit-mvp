import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoTip } from "@/components/InfoTip";
import { LocalizedDimensions, LocalizedMeasurement, LocalizedUnit } from "@/components/LocalizedMeasurement";
import { ShelfFitCalculator } from "@/components/ShelfFitCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { localePath, localizedAlternates, localeSettings, type Locale } from "@/config/site";
import { detailGuidance } from "@/data/detail-guidance";
import { getDictionary } from "@/data/i18n";
import { formatMeasurement } from "@/data/measurements";
import { dimensionInfoText, setImagePath } from "@/data/set-presentation";
import { calculatorSetOptions, getSetBySlug, hasPlanningDimensions, planningEnvelopeVolume, recommendedAxisSpace, type DisplaySet } from "@/data/sets";

function dimensionDescription(set: DisplaySet, locale: Locale) {
  const t = getDictionary(locale);
  if (!hasPlanningDimensions(set)) return t.detail.metaNoFixed;
  const localeConfig = localeSettings[locale];
  const unit = localeConfig.defaultUnit;
  return `${t.common.height}${t.common.labelSeparator}${formatMeasurement(set.corrected_height_cm, unit, localeConfig.numberLocale)} ${unit}${t.common.listSeparator}${t.common.width}${t.common.labelSeparator}${formatMeasurement(set.corrected_width_cm, unit, localeConfig.numberLocale)} ${unit}${t.common.listSeparator}${t.common.depth}${t.common.labelSeparator}${formatMeasurement(set.corrected_depth_cm, unit, localeConfig.numberLocale)} ${unit}`;
}

export function buildSetMetadata(slug: string, locale: Locale): Metadata {
  const t = getDictionary(locale);
  const localeConfig = localeSettings[locale];
  const set = getSetBySlug(slug);
  if (!set) return {};
  const description = `${set.name} ${set.set_number}${t.common.labelSeparator}${dimensionDescription(set, locale)}${t.common.sentenceSeparator}${t.detail.metaCopy}`;
  const image = setImagePath(set);
  const title = `${set.name} ${set.set_number}`;
  const path = `/sets/${set.slug}`;
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: { title, description, locale: localeConfig.openGraphLocale, ...(image ? { images: [{ url: image, alt: `${set.name} LEGO ${t.common.set} ${set.set_number}` }] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

function DimensionBoard({ set, locale }: { set: DisplaySet; locale: Locale }) {
  const t = getDictionary(locale);
  if (hasPlanningDimensions(set)) {
    return (
      <div className="dimension-board">
        <div className="dimension-board-heading"><p>{t.detail.builtLabel} · <LocalizedUnit /></p><InfoTip id={`detail-size-${set.set_id}`} text={dimensionInfoText(set, locale)} label={`${t.detail.info} ${set.name}`} /></div>
        <div className="big-dimensions"><div><strong><LocalizedMeasurement valueCm={set.corrected_height_cm} withUnit={false} /></strong><span>{t.common.height}</span></div><div><strong><LocalizedMeasurement valueCm={set.corrected_width_cm} withUnit={false} /></strong><span>{t.common.width}</span></div><div><strong><LocalizedMeasurement valueCm={set.corrected_depth_cm} withUnit={false} /></strong><span>{t.common.depth}</span></div></div>
      </div>
    );
  }
  return <div className="dimension-board dimension-board-empty"><div className="dimension-board-heading"><p>{t.detail.builtDimensions}</p><InfoTip id={`detail-size-${set.set_id}`} text={dimensionInfoText(set, locale)} label={`${t.detail.info} ${set.name}`} /></div><strong className="empty-dimension-title">{t.detail.noFixed}</strong><span>{t.detail.noFixedDescription}</span></div>;
}

export function SetDetailPageContent({ slug, locale }: { slug: string; locale: Locale }) {
  const t = getDictionary(locale);
  const guidance = detailGuidance[locale];
  const localeConfig = localeSettings[locale];
  const set = getSetBySlug(slug);
  if (!set) notFound();
  const hasDimensions = hasPlanningDimensions(set);
  const recommended = recommendedAxisSpace(set);
  const envelopeVolume = planningEnvelopeVolume(set);
  const packageDimensions = set.package_height_cm !== null && set.package_width_cm !== null && set.package_depth_cm !== null
    ? { heightCm: set.package_height_cm, widthCm: set.package_width_cm, depthCm: set.package_depth_cm }
    : null;
  const image = setImagePath(set);

  return (
    <><SiteHeader locale={locale} /><main className="inner-main">
      <section className="detail-hero shell">
        <nav className="breadcrumb" aria-label={t.common.breadcrumb}><Link href={localePath(locale)}>{t.common.home}</Link><span>/</span><Link href={localePath(locale, "/sets")}>{t.nav.sets}</Link><span>/</span><span>{set.set_number}</span></nav>
        <div className="detail-grid">
          <div><p className="eyebrow">{t.card.rank} #{set.rank_by_pieces} · {set.theme} · {set.year}</p><h1 className="detail-title">{set.name}</h1><div className="detail-meta"><span>#{set.set_number}</span><span>{set.pieces.toLocaleString(localeConfig.numberLocale)} {t.common.pieces}</span></div></div>
          <div className="detail-side">
            <figure className="detail-product-figure"><div className="detail-product-image">{image ? <Image src={image} alt={`${set.name} LEGO ${t.common.set} ${set.set_number}`} fill priority unoptimized sizes="(max-width: 900px) calc(100vw - 40px), 520px" /> : <div className="image-placeholder image-placeholder-large"><span>{t.detail.imageUnavailable}</span><strong>#{set.set_number}</strong></div>}</div><figcaption>{image ? <>{t.detail.imageCourtesy}<a href={set.brickset_url} target="_blank" rel="noreferrer">Brickset.com</a>{t.common.sentenceEnd}</> : <>{t.detail.noImage}</>}</figcaption></figure>
            <DimensionBoard set={set} locale={locale} />
          </div>
        </div>
      </section>

      <section className="detail-content shell">
        <article className="content-block"><h2>{t.detail.planningTitle}</h2>{hasDimensions && recommended ? <><p>{t.detail.modelListed} <strong><LocalizedDimensions dimensions={[{ valueCm: set.corrected_height_cm, axis: localeConfig.axes.height }, { valueCm: set.corrected_width_cm, axis: localeConfig.axes.width }, { valueCm: set.corrected_depth_cm, axis: localeConfig.axes.depth }]} /></strong>{t.common.sentenceEnd}</p><ul><li>{t.detail.startingSpace}{t.common.labelSeparator}<LocalizedDimensions dimensions={[{ valueCm: recommended.heightCm, axis: localeConfig.axes.height }, { valueCm: recommended.widthCm, axis: localeConfig.axes.width }, { valueCm: recommended.depthCm, axis: localeConfig.axes.depth }]} /></li><li>{t.detail.volume}{t.common.labelSeparator}{envelopeVolume} L</li><li>{t.detail.movable}</li></ul></> : <><p>{t.detail.noFixedBody}</p><h3>{guidance.multiModelTitle}</h3><ol className="planning-checklist">{guidance.multiModelItems.map((item) => <li key={item}>{item}</li>)}</ol></>}<a className="source-link" href={set.model_source_url} target="_blank" rel="noreferrer">{t.detail.sizeSource} ↗</a></article>
        <article className="content-block"><h2>{t.detail.packageTitle}</h2>{packageDimensions ? <><p>{t.detail.packageMeasures} <strong><LocalizedDimensions dimensions={[{ valueCm: packageDimensions.heightCm, axis: localeConfig.axes.height }, { valueCm: packageDimensions.widthCm, axis: localeConfig.axes.width }, { valueCm: packageDimensions.depthCm, axis: localeConfig.axes.depth }]} /></strong>{t.common.sentenceEnd}</p>{set.package_volume_l !== null ? <p>{t.detail.packageVolume}{t.common.labelSeparator}{set.package_volume_l} L{t.common.sentenceEnd}</p> : null}{set.package_weight_kg !== null ? <p>{t.detail.packageWeight}{t.common.labelSeparator}{set.package_weight_kg} kg{t.common.sentenceEnd}</p> : null}</> : <p>{t.detail.noPackage}</p>}<a className="source-link" href={set.brickset_url} target="_blank" rel="noreferrer">{t.detail.bricksetRecord} ↗</a><p className="data-date">{t.detail.packageSeparate}</p></article>
        <article className="content-block detail-planning-note"><h2>{guidance.limitsTitle}</h2><p>{guidance.limitsCopy}</p><Link className="source-link" href={localePath(locale, "/guides/how-to-measure-a-display-cabinet")}>{guidance.measureLink} →</Link></article>
        {hasDimensions ? <div className="detail-calculator"><ShelfFitCalculator sets={calculatorSetOptions} locale={locale} initialSetNumber={set.set_number} /></div> : <div className="detail-calculator unavailable-calculator"><p className="eyebrow">{t.detail.calculatorUnavailable}</p><h2>{t.detail.noCalculator}</h2><p>{t.detail.noCalculatorCopy}</p></div>}
      </section>
    </main><SiteFooter locale={locale} /></>
  );
}
