"use client";

import Image from "next/image";
import Link from "next/link";
import { InfoTip } from "@/components/InfoTip";
import { useMeasurementContext } from "@/components/MeasurementProvider";
import { localePath, localeSettings, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { formatMeasurement } from "@/data/measurements";
import { dimensionInfoText, hasDimensionValues, setImagePath } from "@/data/set-presentation";
import type { DisplaySet } from "@/data/sets";

export type SetCardSet = Pick<DisplaySet,
  "set_id" | "set_number" | "name" | "theme" | "pieces" | "rank_by_pieces" | "slug" |
  "image_available" | "corrected_height_cm" | "corrected_width_cm" | "corrected_depth_cm" |
  "correction_method" | "correction_confidence"
>;

export function SetCard({ set, locale }: { set: SetCardSet; locale: Locale }) {
  const t = getDictionary(locale);
  const localeConfig = localeSettings[locale];
  const { unit, numberLocale } = useMeasurementContext();
  const image = setImagePath(set);
  const hasDimensions = hasDimensionValues(set);
  return (
    <article className="set-card">
      <Link className="set-card-link" href={localePath(locale, `/sets/${set.slug}`)}>
        <div className="set-card-image">
          {image ? <Image src={image} alt={`${set.name} LEGO ${t.common.set} ${set.set_number}`} fill unoptimized sizes="(max-width: 680px) calc(100vw - 28px), (max-width: 900px) 50vw, 380px" /> : <div className="image-placeholder"><span>{t.card.imageUnavailable}</span><strong>#{set.set_number}</strong></div>}
        </div>
        <div className="set-card-body">
          <div className="set-card-top"><span>#{set.set_number} · {set.theme}</span><span>{set.pieces.toLocaleString(localeConfig.numberLocale)} {t.common.pieces}</span></div>
          <span className="card-rank">{t.card.rank} #{set.rank_by_pieces}</span>
          <h3>{set.name}</h3>
          <div className="set-card-bottom" aria-label={hasDimensions ? `${t.card.builtAria}${t.common.labelSeparator}${formatMeasurement(set.corrected_height_cm, unit, numberLocale)} × ${formatMeasurement(set.corrected_width_cm, unit, numberLocale)} × ${formatMeasurement(set.corrected_depth_cm, unit, numberLocale)} ${unit}` : t.card.noFixed}>
            {hasDimensions ? <><span>{localeConfig.axes.height} {formatMeasurement(set.corrected_height_cm, unit, numberLocale)} {unit}</span><span>{localeConfig.axes.width} {formatMeasurement(set.corrected_width_cm, unit, numberLocale)} {unit}</span><span>{localeConfig.axes.depth} {formatMeasurement(set.corrected_depth_cm, unit, numberLocale)} {unit}</span></> : <span>{t.card.noFixed}</span>}
          </div>
        </div>
      </Link>
      <div className="card-info"><InfoTip id={`card-size-${set.set_id}`} text={dimensionInfoText(set, locale)} label={`${t.card.info} ${set.name}`} /></div>
    </article>
  );
}
