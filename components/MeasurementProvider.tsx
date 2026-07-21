"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { saveMeasurementPreferences, useMeasurementPreferences, type MeasurementPreferences, type MeasurementUnit } from "@/components/measurement-preferences";
import { localeSettings, type Locale } from "@/config/site";

type MeasurementContextValue = MeasurementPreferences & {
  locale: Locale;
  numberLocale: string;
  setUnit: (unit: MeasurementUnit) => void;
};

const MeasurementContext = createContext<MeasurementContextValue | null>(null);

export function MeasurementProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const localeConfig = localeSettings[locale];
  const preferences = useMeasurementPreferences(localeConfig.defaultUnit);
  const setUnit = useCallback((unit: MeasurementUnit) => saveMeasurementPreferences({ ...preferences, unit }), [preferences]);
  const value = useMemo(() => ({ ...preferences, locale, numberLocale: localeConfig.numberLocale, setUnit }), [locale, localeConfig.numberLocale, preferences, setUnit]);
  return <MeasurementContext.Provider value={value}>{children}</MeasurementContext.Provider>;
}

export function useMeasurementContext() {
  const context = useContext(MeasurementContext);
  if (!context) throw new Error("Measurement controls must be rendered inside MeasurementProvider.");
  return context;
}
