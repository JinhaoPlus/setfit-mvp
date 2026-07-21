"use client";

import { useState } from "react";
import { GuideSetIdentity, type GuideSetIdentityData } from "@/components/GuideSetIdentity";
import { LocalizedDimensions } from "@/components/LocalizedMeasurement";
import { useMeasurementContext } from "@/components/MeasurementProvider";
import { localeSettings, siteConfig, type Locale } from "@/config/site";
import { furniturePresets } from "@/data/furniture-presets";
import { getDictionary } from "@/data/i18n";
import { formatMeasurement, fromCm, toCm } from "@/data/measurements";

type CabinetDimensions = {
  widthCm: number;
  depthCm: number;
  heightCm: number;
};

export type CabinetGuideSet = GuideSetIdentityData & {
  widthCm: number;
  depthCm: number;
  heightCm: number;
};

const customCabinetId = "custom";

function shown(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function CabinetFitGuide({ locale, sets }: { locale: Locale; sets: CabinetGuideSet[] }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.billyGuide;
  const calculator = dictionary.calculator;
  const localeConfig = localeSettings[locale];
  const { unit, numberLocale } = useMeasurementContext();
  const initialPreset = furniturePresets.find((preset) => preset.id === "ikea-billy-80") ?? furniturePresets[0];
  const [cabinetId, setCabinetId] = useState(initialPreset?.id ?? customCabinetId);
  const [customDimensions, setCustomDimensions] = useState<CabinetDimensions>({ ...siteConfig.billyExampleCm });
  const selectedPreset = furniturePresets.find((preset) => preset.id === cabinetId);
  const cabinet = selectedPreset?.planningClearCm ?? customDimensions;

  const updateCustomDimension = (axis: keyof CabinetDimensions, rawValue: string) => {
    const parsed = Number.parseFloat(rawValue);
    setCustomDimensions((current) => ({
      ...current,
      [axis]: Number.isFinite(parsed) ? toCm(parsed, unit) : 0,
    }));
  };

  const cabinetDimensions = `${localeConfig.axes.width} ${formatMeasurement(cabinet.widthCm, unit, numberLocale)} × ${localeConfig.axes.depth} ${formatMeasurement(cabinet.depthCm, unit, numberLocale)} × ${localeConfig.axes.height} ${formatMeasurement(cabinet.heightCm, unit, numberLocale)} ${unit}`;

  return (
    <section className="guide-body shell cabinet-fit-guide">
      <aside className="guide-aside cabinet-guide-controls">
        <strong>{t.testSpace}</strong>
        <div className="field guide-cabinet-select">
          <label htmlFor={`guide-cabinet-${locale}`}>{t.chooseCabinet}</label>
          <select id={`guide-cabinet-${locale}`} value={cabinetId} onChange={(event) => setCabinetId(event.target.value)}>
            <option value={customCabinetId}>{t.customOption}</option>
            {furniturePresets.map((preset) => <option key={preset.id} value={preset.id}>{preset.brand} · {preset.name}</option>)}
          </select>
        </div>
        {cabinetId === customCabinetId ? (
          <div className="guide-custom-dimensions">
            {(["widthCm", "depthCm", "heightCm"] as const).map((axis) => {
              const label = axis === "widthCm" ? calculator.internalWidth : axis === "depthCm" ? calculator.internalDepth : calculator.internalHeight;
              return (
                <div className="field" key={axis}>
                  <label htmlFor={`guide-${axis}-${locale}`}>{label}</label>
                  <div className="input-wrap">
                    <input id={`guide-${axis}-${locale}`} min="0" step="0.1" inputMode="decimal" type="number" value={shown(fromCm(customDimensions[axis], unit))} onChange={(event) => updateCustomDimension(axis, event.target.value)} />
                    <span className="input-unit">{unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        <p className="guide-selected-space"><strong>{selectedPreset ? `${selectedPreset.brand} · ${selectedPreset.name}` : t.customOption}</strong>{cabinetDimensions}</p>
        <p>{t.testCopy}</p>
      </aside>
      <article className="guide-copy">
        <h2>{t.tableTitle}</h2>
        <p>{t.tableCopy}</p>
        <table className="guide-table guide-fit-table">
          <thead><tr><th>{dictionary.common.set}</th><th>{t.built}</th><th>{t.strict}</th></tr></thead>
          <tbody>
            {sets.map((set) => {
              const standard = set.widthCm <= cabinet.widthCm && set.depthCm <= cabinet.depthCm && set.heightCm <= cabinet.heightCm;
              const rotated = set.depthCm <= cabinet.widthCm && set.widthCm <= cabinet.depthCm && set.heightCm <= cabinet.heightCm;
              const status = standard ? "standard" : rotated ? "rotated" : "no";
              return (
                <tr key={set.set_id}>
                  <td><GuideSetIdentity set={set} locale={locale} /></td>
                  <td><LocalizedDimensions dimensions={[{ valueCm: set.widthCm }, { valueCm: set.depthCm }, { valueCm: set.heightCm }]} /></td>
                  <td className={status === "standard" ? "status-yes" : status === "rotated" ? "status-rotate" : "status-no"}>{status === "standard" ? t.fitStandard : status === "rotated" ? t.fitRotated : t.doesNotFit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2>{t.measureTitle}</h2>
        <p>{t.measureCopy}</p>
      </article>
    </section>
  );
}
