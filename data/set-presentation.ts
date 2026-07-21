import type { CorrectionConfidence, CorrectionMethod } from "@/data/sets";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";

export type DimensionFields = {
  corrected_height_cm: number | null;
  corrected_width_cm: number | null;
  corrected_depth_cm: number | null;
};

export type DimensionInfoFields = {
  correction_method: CorrectionMethod;
  correction_confidence: CorrectionConfidence;
};

export function hasDimensionValues<T extends DimensionFields>(set: T): set is T & {
  corrected_height_cm: number;
  corrected_width_cm: number;
  corrected_depth_cm: number;
} {
  return set.corrected_height_cm !== null && set.corrected_height_cm > 0
    && set.corrected_width_cm !== null && set.corrected_width_cm > 0
    && set.corrected_depth_cm !== null && set.corrected_depth_cm > 0;
}

export function longestDimension(set: DimensionFields) {
  if (!hasDimensionValues(set)) return null;
  return Math.max(set.corrected_height_cm, set.corrected_width_cm, set.corrected_depth_cm);
}

export function setImagePath(set: { set_id: string; image_available: boolean }) {
  return set.image_available ? `/sets/${set.set_id}.jpg` : null;
}

export function formatCm(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function dimensionInfoText(set: DimensionInfoFields, locale: Locale) {
  const t = getDictionary(locale).dimensionInfo;
  const method = {
    official: t.official,
    direct: t.direct,
    inferred: t.inferred,
    estimated: t.estimated,
    not_applicable: t.notApplicable,
  }[set.correction_method];
  const confidence = set.correction_confidence ? {
    official: t.sourceOfficial,
    high: t.high,
    medium: t.medium,
    low: t.low,
  }[set.correction_confidence] : "";
  return [method, confidence].filter(Boolean).join(" ");
}
