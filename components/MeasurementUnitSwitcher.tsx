"use client";

import { localeSettings, type Locale } from "@/config/site";
import { saveMeasurementPreferences, useMeasurementPreferences, type MeasurementUnit } from "@/components/measurement-preferences";

export function MeasurementUnitSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const preferences = useMeasurementPreferences(localeSettings[locale].defaultUnit);
  const setUnit = (unit: MeasurementUnit) => saveMeasurementPreferences({ ...preferences, unit });

  return (
    <div className="header-unit-toggle" role="group" aria-label={label}>
      <button type="button" aria-pressed={preferences.unit === "cm"} onClick={() => setUnit("cm")}>CM</button>
      <button type="button" aria-pressed={preferences.unit === "in"} onClick={() => setUnit("in")}>IN</button>
    </div>
  );
}

