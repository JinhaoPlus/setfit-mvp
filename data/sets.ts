import rawData from "./large-top500.json";

export type ModelEvidence = "A" | "B" | "A-partial" | "A-multi" | "missing";
export type CorrectionMethod = "official" | "direct" | "inferred" | "estimated" | "not_applicable";
export type CorrectionConfidence = "official" | "high" | "medium" | "low" | null;

export type DisplaySet = {
  rank_by_pieces: number;
  set_id: string;
  brickset_set_id: number;
  set_number: string;
  name: string;
  theme: string;
  subtheme: string | null;
  year: number;
  pieces: number;
  released: boolean;
  launch_date: string | null;
  owned: number;
  wanted: number;
  model_size_raw: string | null;
  model_dim_a_cm: number | null;
  model_dim_b_cm: number | null;
  model_dim_c_cm: number | null;
  model_small_cm: number | null;
  model_medium_cm: number | null;
  model_large_cm: number | null;
  model_envelope_volume_l: number | null;
  display_case_small_cm: number | null;
  display_case_medium_cm: number | null;
  display_case_large_cm: number | null;
  model_evidence: ModelEvidence;
  model_note: string;
  brickset_url: string;
  ranking_page_url: string;
  retrieved_at: string;
  brickset_last_updated: string | null;
  package_height_cm: number | null;
  package_width_cm: number | null;
  package_depth_cm: number | null;
  package_weight_kg: number | null;
  package_volume_l: number | null;
  package_evidence: string;
  package_source_url: string;
  verified_height_cm: number | null;
  verified_width_cm: number | null;
  verified_depth_cm: number | null;
  model_source_url: string;
  verified_configuration: string | null;
  corrected_height_cm: number | null;
  corrected_width_cm: number | null;
  corrected_depth_cm: number | null;
  correction_method: CorrectionMethod;
  correction_confidence: CorrectionConfidence;
  correction_note: string;
  slug: string;
  image_available: boolean;
};

type SourceRecord = Omit<DisplaySet, "slug" | "image_available">;
type PlanningSet = DisplaySet & {
  corrected_height_cm: number;
  corrected_width_cm: number;
  corrected_depth_cm: number;
};

const unavailableImageIds = new Set([
  "45801-1", "45806-1", "45813-1", "45823-1", "45829-1", "9280-1", "9657-1",
  "9696-1", "9761-1", "9762-1", "9763-1", "9764-1", "9780-1", "9784-1",
]);

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const displaySets: DisplaySet[] = (rawData as SourceRecord[]).map((set) => ({
  ...set,
  model_note: "",
  verified_configuration: null,
  correction_note: "",
  slug: `${set.set_number}-${slugify(set.name)}-dimensions`,
  image_available: !unavailableImageIds.has(set.set_id),
}));

export function hasPlanningDimensions(set: DisplaySet): set is PlanningSet {
  return set.corrected_height_cm !== null && set.corrected_height_cm > 0
    && set.corrected_width_cm !== null && set.corrected_width_cm > 0
    && set.corrected_depth_cm !== null && set.corrected_depth_cm > 0;
}

export const planningSets = displaySets.filter(hasPlanningDimensions);

export const calculatorSetOptions = planningSets.map((set) => ({
  set_id: set.set_id,
  set_number: set.set_number,
  name: set.name,
  heightCm: set.corrected_height_cm,
  widthCm: set.corrected_width_cm,
  depthCm: set.corrected_depth_cm,
  imageAvailable: set.image_available,
  correction_method: set.correction_method,
  correction_confidence: set.correction_confidence,
}));

export const libraryStats = {
  total: displaySets.length,
  planningDimensions: planningSets.length,
  official: displaySets.filter((set) => set.correction_method === "official").length,
  direct: displaySets.filter((set) => set.correction_method === "direct").length,
  inferred: displaySets.filter((set) => set.correction_method === "inferred").length,
  estimated: displaySets.filter((set) => set.correction_method === "estimated").length,
  noFixedSize: displaySets.filter((set) => set.correction_method === "not_applicable").length,
  packageDimensions: displaySets.filter((set) => set.package_height_cm !== null && set.package_width_cm !== null && set.package_depth_cm !== null).length,
  packageWeight: displaySets.filter((set) => set.package_weight_kg !== null).length,
  largestPieceCount: Math.max(...displaySets.map((set) => set.pieces)),
  smallestPieceCount: Math.min(...displaySets.map((set) => set.pieces)),
};

export const dataSnapshotDate = displaySets[0]?.retrieved_at.split("T")[0] ?? "";

export function getSetBySlug(slug: string) {
  return displaySets.find((set) => set.slug === slug);
}

export function getSetByNumber(setNumber: string) {
  return displaySets.find((set) => set.set_number === setNumber);
}

export function planningLongestSide(set: DisplaySet) {
  if (!hasPlanningDimensions(set)) return null;
  return Math.max(set.corrected_height_cm, set.corrected_width_cm, set.corrected_depth_cm);
}

export function planningEnvelopeVolume(set: DisplaySet) {
  if (!hasPlanningDimensions(set)) return null;
  return Number(((set.corrected_height_cm * set.corrected_width_cm * set.corrected_depth_cm) / 1000).toFixed(2));
}

export function recommendedAxisSpace(set: DisplaySet) {
  if (!hasPlanningDimensions(set)) return null;
  return {
    heightCm: set.corrected_height_cm + 5,
    widthCm: set.corrected_width_cm + 5,
    depthCm: set.corrected_depth_cm + 5,
  };
}
