"use client";

import { useMeasurementContext } from "@/components/MeasurementProvider";

export function MeasurementUnitSwitcher({ label }: { label: string }) {
  const { unit, setUnit } = useMeasurementContext();

  return (
    <div className="header-unit-toggle" role="group" aria-label={label}>
      <button type="button" aria-pressed={unit === "cm"} onClick={() => setUnit("cm")}>CM</button>
      <button type="button" aria-pressed={unit === "in"} onClick={() => setUnit("in")}>IN</button>
    </div>
  );
}
