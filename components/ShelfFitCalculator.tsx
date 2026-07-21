"use client";

import { useState } from "react";
import { InfoTip } from "@/components/InfoTip";
import { saveMeasurementPreferences, useMeasurementPreferences } from "@/components/measurement-preferences";
import { localeSettings, siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { dimensionInfoText } from "@/data/set-presentation";
import type { CorrectionConfidence, CorrectionMethod } from "@/data/sets";

export type CalculatorSet = {
  set_id: string;
  set_number: string;
  name: string;
  heightCm: number;
  widthCm: number;
  depthCm: number;
  correction_method: CorrectionMethod;
  correction_confidence: CorrectionConfidence;
};
function fromCm(value: number, unit: "cm" | "in") { return unit === "cm" ? value : value / 2.54; }
function toCm(value: number, unit: "cm" | "in") { return unit === "cm" ? value : value * 2.54; }
function shown(value: number) { return Number.isInteger(value) ? String(value) : value.toFixed(1); }

export function ShelfFitCalculator({ sets, locale, initialSetNumber = "10294" }: { sets: CalculatorSet[]; locale: Locale; initialSetNumber?: string }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.calculator;
  const localeConfig = localeSettings[locale];
  const safeInitialNumber = sets.some((set) => set.set_number === initialSetNumber) ? initialSetNumber : sets[0].set_number;
  const [setNumber, setSetNumber] = useState(safeInitialNumber);
  const shelfPreferences = useMeasurementPreferences(localeConfig.defaultUnit);
  const { unit, ...shelf } = shelfPreferences;
  const selected = sets.find((set) => set.set_number === setNumber) ?? sets[0];
  const { widthCm, depthCm, heightCm } = selected;

  const normal = shelf.widthCm >= widthCm && shelf.depthCm >= depthCm && shelf.heightCm >= heightCm;
  const rotated = shelf.widthCm >= depthCm && shelf.depthCm >= widthCm && shelf.heightCm >= heightCm;
  const roomyNormal = shelf.widthCm >= widthCm + siteConfig.displayClearanceCm && shelf.depthCm >= depthCm + siteConfig.displayClearanceCm && shelf.heightCm >= heightCm + siteConfig.displayClearanceCm;
  const roomyRotated = shelf.widthCm >= depthCm + siteConfig.displayClearanceCm && shelf.depthCm >= widthCm + siteConfig.displayClearanceCm && shelf.heightCm >= heightCm + siteConfig.displayClearanceCm;
  const result = normal
    ? { status: "fits", icon: "✓", title: roomyNormal ? t.fitsRoomy : t.fitsTight, message: roomyNormal ? t.fitsRoomyMessage : t.fitsTightMessage, orientation: t.standard }
    : rotated
      ? { status: "rotate", icon: "↻", title: roomyRotated ? t.rotateRoomy : t.rotateTight, message: t.rotateMessage, orientation: t.rotated }
      : { status: "no", icon: "×", title: t.noFit, message: t.noFitMessage, orientation: t.noStrict };

  const updateShelf = (key: keyof typeof shelf, rawValue: string) => {
    const parsed = Number.parseFloat(rawValue);
    saveMeasurementPreferences({ ...shelf, [key]: Number.isFinite(parsed) ? toCm(parsed, unit) : 0, unit });
  };

  return (
    <div className="fit-card">
      <div className="fit-card-header"><div><h2>{t.title}</h2><p>{t.intro}</p></div></div>
      <div className="fit-form">
        <div className="field"><label htmlFor={`set-${safeInitialNumber}`}>{t.choose}</label><select id={`set-${safeInitialNumber}`} value={setNumber} onChange={(event) => setSetNumber(event.target.value)}>{sets.map((set) => <option key={set.set_number} value={set.set_number}>#{set.set_number} · {set.name}</option>)}</select></div>
        <div className="dimension-inputs">{(["widthCm", "depthCm", "heightCm"] as const).map((key) => { const label = key === "widthCm" ? t.internalWidth : key === "depthCm" ? t.internalDepth : t.internalHeight; return <div className="field" key={key}><label htmlFor={`${key}-${safeInitialNumber}`}>{label}</label><div className="input-wrap"><input id={`${key}-${safeInitialNumber}`} min="0" step="0.1" inputMode="decimal" type="number" value={shown(fromCm(shelf[key], unit))} onChange={(event) => updateShelf(key, event.target.value)} /><span className="input-unit">{unit}</span></div></div>; })}</div>
        <div className="selected-set-line"><div><span>{selected.name} · {t.selectedSize}</span><InfoTip id={`calculator-size-${selected.set_id}`} text={dimensionInfoText(selected, locale)} label={`${t.info} ${selected.name}`} /></div><strong>{shown(fromCm(heightCm, unit))} × {shown(fromCm(widthCm, unit))} × {shown(fromCm(depthCm, unit))} {unit}</strong></div>
        <div className="fit-result" data-status={result.status} role="status" aria-live="polite"><div className="result-top"><span className="result-icon" aria-hidden="true">{result.icon}</span><div><h3>{result.title}</h3><p>{result.message}</p></div></div><div className="fit-deltas"><span>{result.orientation}</span><span>{t.strict}</span><span>{t.model}{dictionary.common.labelSeparator}{localeConfig.axes.height} {shown(fromCm(heightCm, unit))} · {localeConfig.axes.width} {shown(fromCm(widthCm, unit))} · {localeConfig.axes.depth} {shown(fromCm(depthCm, unit))} {unit}</span></div></div>
      </div>
    </div>
  );
}
