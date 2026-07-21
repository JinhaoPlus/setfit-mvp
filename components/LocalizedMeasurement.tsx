"use client";

import { useMeasurementContext } from "@/components/MeasurementProvider";
import { formatMeasurement } from "@/data/measurements";

type Dimension = { valueCm: number; axis?: string };

export function LocalizedMeasurement({ valueCm, withUnit = true }: { valueCm: number; withUnit?: boolean }) {
  const { unit, numberLocale } = useMeasurementContext();
  return <>{formatMeasurement(valueCm, unit, numberLocale)}{withUnit ? ` ${unit}` : ""}</>;
}

export function LocalizedDimensions({ dimensions }: { dimensions: Dimension[] }) {
  const { unit, numberLocale } = useMeasurementContext();
  const value = dimensions
    .map(({ valueCm, axis }) => `${formatMeasurement(valueCm, unit, numberLocale)}${axis ? ` ${axis}` : ""}`)
    .join(" × ");
  return <>{value} {unit}</>;
}

export function LocalizedUnit() {
  const { unit } = useMeasurementContext();
  return <>{unit.toUpperCase()}</>;
}
