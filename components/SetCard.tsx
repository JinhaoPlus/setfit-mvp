import Image from "next/image";
import Link from "next/link";
import { InfoTip } from "@/components/InfoTip";
import { localePath, localeSettings, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { dimensionInfoText, formatCm, hasDimensionValues, setImagePath } from "@/data/set-presentation";
import type { DisplaySet } from "@/data/sets";

export type SetCardSet = Pick<DisplaySet,
  "set_id" | "set_number" | "name" | "theme" | "pieces" | "rank_by_pieces" | "slug" |
  "image_available" | "corrected_height_cm" | "corrected_width_cm" | "corrected_depth_cm" |
  "correction_method" | "correction_confidence"
>;

export function SetCard({ set, locale }: { set: SetCardSet; locale: Locale }) {
  const t = getDictionary(locale);
  const localeConfig = localeSettings[locale];
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
          <div className="set-card-bottom" aria-label={hasDimensions ? `${t.card.builtAria}${t.common.labelSeparator}${set.corrected_height_cm} × ${set.corrected_width_cm} × ${set.corrected_depth_cm} cm` : t.card.noFixed}>
            {hasDimensions ? <><span>{localeConfig.axes.height} {formatCm(set.corrected_height_cm)} cm</span><span>{localeConfig.axes.width} {formatCm(set.corrected_width_cm)} cm</span><span>{localeConfig.axes.depth} {formatCm(set.corrected_depth_cm)} cm</span></> : <span>{t.card.noFixed}</span>}
          </div>
        </div>
      </Link>
      <div className="card-info"><InfoTip id={`card-size-${set.set_id}`} text={dimensionInfoText(set, locale)} label={`${t.card.info} ${set.name}`} /></div>
    </article>
  );
}
