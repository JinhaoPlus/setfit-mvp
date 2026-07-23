"use client";

import { useMeasurementContext } from "@/components/MeasurementProvider";

type UnitLabel = { full: string; compact: string };

export function MeasurementUnitSwitcher({ label, unitLabels }: { label: string; unitLabels: { cm: UnitLabel; in: UnitLabel } }) {
  const { unit, setUnit } = useMeasurementContext();

  return (
    <div className="header-unit-toggle" role="group" aria-label={label}>
      <button type="button" aria-label={unitLabels.cm.full} aria-pressed={unit === "cm"} data-compact-label={unitLabels.cm.compact} onClick={() => setUnit("cm")}><span>{unitLabels.cm.full}</span></button>
      <button type="button" aria-label={unitLabels.in.full} aria-pressed={unit === "in"} data-compact-label={unitLabels.in.compact} onClick={() => setUnit("in")}><span>{unitLabels.in.full}</span></button>
    </div>
  );
}
