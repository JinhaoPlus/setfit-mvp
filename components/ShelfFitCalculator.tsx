"use client";

import Image from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import { InfoTip } from "@/components/InfoTip";
import { useMeasurementContext } from "@/components/MeasurementProvider";
import { saveMeasurementPreferences } from "@/components/measurement-preferences";
import { SearchableSetSelect } from "@/components/SearchableSetSelect";
import { localeSettings, siteConfig, type Locale } from "@/config/site";
import { furniturePresets, type FurniturePreset } from "@/data/furniture-presets";
import { getDictionary } from "@/data/i18n";
import { formatMeasurement, fromCm, toCm } from "@/data/measurements";
import { dimensionInfoText } from "@/data/set-presentation";
import type { CorrectionConfidence, CorrectionMethod } from "@/data/sets";

export type CalculatorSet = {
  set_id: string;
  set_number: string;
  name: string;
  heightCm: number;
  widthCm: number;
  depthCm: number;
  imageAvailable: boolean;
  correction_method: CorrectionMethod;
  correction_confidence: CorrectionConfidence;
};
function shown(value: number) { return Number.isInteger(value) ? String(value) : value.toFixed(1); }

const visualZoomMin = 0.8;
const visualZoomMax = 1.8;
const visualZoomStep = 0.2;
const defaultVisualZoom = 1.2;

type OrientedDimensions = {
  widthCm: number;
  depthCm: number;
  heightCm: number;
};

type PlacementOrientation = "standard" | "rotated";

function sameDimensions(first: OrientedDimensions, second: OrientedDimensions) {
  return (["widthCm", "depthCm", "heightCm"] as const).every((axis) => Math.abs(first[axis] - second[axis]) < 0.001);
}

export function ShelfFitCalculator({ sets, locale, initialSetNumber = "10294" }: { sets: CalculatorSet[]; locale: Locale; initialSetNumber?: string }) {
  const dictionary = getDictionary(locale);
  const t = dictionary.calculator;
  const localeConfig = localeSettings[locale];
  const safeInitialNumber = sets.some((set) => set.set_number === initialSetNumber) ? initialSetNumber : sets[0].set_number;
  const [setNumber, setSetNumber] = useState(safeInitialNumber);
  const [visualZoom, setVisualZoom] = useState(defaultVisualZoom);
  const [orientation, setOrientation] = useState<PlacementOrientation>("standard");
  const [customSelected, setCustomSelected] = useState(false);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const { unit, widthCm: shelfWidthCm, depthCm: shelfDepthCm, heightCm: shelfHeightCm, numberLocale } = useMeasurementContext();
  const shelf = { widthCm: shelfWidthCm, depthCm: shelfDepthCm, heightCm: shelfHeightCm };
  const activeFurniturePreset = furniturePresets.find((preset) => sameDimensions(preset.planningClearCm, shelf));
  const isCustomActive = customSelected || !activeFurniturePreset;
  const selected = sets.find((set) => set.set_number === setNumber) ?? sets[0];
  const { widthCm, depthCm, heightCm } = selected;

  const normal = shelf.widthCm >= widthCm && shelf.depthCm >= depthCm && shelf.heightCm >= heightCm;
  const rotated = shelf.widthCm >= depthCm && shelf.depthCm >= widthCm && shelf.heightCm >= heightCm;
  const roomyNormal = shelf.widthCm >= widthCm + siteConfig.displayClearanceCm && shelf.depthCm >= depthCm + siteConfig.displayClearanceCm && shelf.heightCm >= heightCm + siteConfig.displayClearanceCm;
  const roomyRotated = shelf.widthCm >= depthCm + siteConfig.displayClearanceCm && shelf.depthCm >= widthCm + siteConfig.displayClearanceCm && shelf.heightCm >= heightCm + siteConfig.displayClearanceCm;
  const normalDimensions = { widthCm, depthCm, heightCm };
  const rotatedDimensions = { widthCm: depthCm, depthCm: widthCm, heightCm };
  const visualSet = orientation === "standard" ? normalDimensions : rotatedDimensions;
  const selectedFits = orientation === "standard" ? normal : rotated;
  const selectedRoomy = orientation === "standard" ? roomyNormal : roomyRotated;
  const alternativeFits = orientation === "standard" ? rotated : normal;
  const comparisons = (["widthCm", "depthCm", "heightCm"] as const).map((axis) => ({
    axis,
    cabinetCm: shelf[axis],
    setCm: visualSet[axis],
    fits: shelf[axis] >= visualSet[axis],
  }));
  const maxVisualDimension = Math.max(
    shelf.widthCm,
    shelf.depthCm,
    shelf.heightCm,
    visualSet.widthCm,
    visualSet.depthCm,
    visualSet.heightCm,
    1,
  );
  const visualEdge = (value: number) => `${Math.max(0.8, (Math.max(0, value) / maxVisualDimension) * 42)}cqw`;
  const visualStyle = {
    "--cabinet-width": visualEdge(shelf.widthCm),
    "--cabinet-depth": visualEdge(shelf.depthCm),
    "--cabinet-height": visualEdge(shelf.heightCm),
    "--set-width": visualEdge(visualSet.widthCm),
    "--set-depth": visualEdge(visualSet.depthCm),
    "--set-height": visualEdge(visualSet.heightCm),
    "--visual-zoom": visualZoom,
  } as CSSProperties;
  const visualStatus = selectedFits ? "fits" : "no";
  const selectedImage = selected.imageAvailable ? `/set-images/${selected.set_id}.jpg` : null;
  const visualSetMedia = selectedImage
    ? <Image src={selectedImage} alt="" fill unoptimized sizes="240px" />
    : <strong className="fit-image-placeholder">#{selected.set_number}<small>{t.imageUnavailable}</small></strong>;
  const result = selectedFits
    ? orientation === "standard"
      ? { status: "fits", icon: "✓", title: selectedRoomy ? t.fitsRoomy : t.fitsTight, message: selectedRoomy ? t.fitsRoomyMessage : t.fitsTightMessage, orientation: t.standard }
      : { status: "rotate", icon: "↻", title: selectedRoomy ? t.rotateRoomy : t.rotateTight, message: t.rotateMessage, orientation: t.rotated }
    : alternativeFits
      ? { status: "no", icon: "×", title: t.selectedOrientationNoFit, message: orientation === "standard" ? t.tryRotated : t.tryStandard, orientation: orientation === "standard" ? t.standard : t.rotated }
      : { status: "no", icon: "×", title: t.noFit, message: t.noFitMessage, orientation: t.noStrict };

  const updateShelf = (key: keyof typeof shelf, rawValue: string) => {
    const parsed = Number.parseFloat(rawValue);
    setCustomSelected(true);
    saveMeasurementPreferences({ ...shelf, [key]: Number.isFinite(parsed) ? toCm(parsed, unit) : 0, unit });
  };

  const applyFurniturePreset = (preset: FurniturePreset) => {
    setCustomSelected(false);
    saveMeasurementPreferences({ ...preset.planningClearCm, unit });
  };

  const selectCustomDimensions = () => {
    setCustomSelected(true);
    window.requestAnimationFrame(() => {
      widthInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      widthInputRef.current?.focus();
    });
  };

  const changeVisualZoom = (change: number) => {
    setVisualZoom((current) => Math.min(visualZoomMax, Math.max(visualZoomMin, Number((current + change).toFixed(1)))));
  };

  const furnitureDimensions = (dimensions: OrientedDimensions) => `${localeConfig.axes.width} ${formatMeasurement(dimensions.widthCm, unit, numberLocale)} × ${localeConfig.axes.depth} ${formatMeasurement(dimensions.depthCm, unit, numberLocale)} × ${localeConfig.axes.height} ${formatMeasurement(dimensions.heightCm, unit, numberLocale)} ${unit}`;

  return (
    <div className="fit-card">
      <div className="fit-card-header"><div><h2>{t.title}</h2><p>{t.intro}</p></div></div>
      <div className="fit-form">
        <details className="fit-secondary-panel fit-preset-panel">
          <summary><span>{t.presetTitle}</span><small>{furniturePresets.length + 1} {t.presetCount}</small></summary>
          <section className="furniture-presets" aria-labelledby={`furniture-presets-title-${safeInitialNumber}`}>
            <div className="furniture-presets-heading">
              <div>
                <span className="fit-visual-kicker">{t.presetKicker}</span>
                <h3 id={`furniture-presets-title-${safeInitialNumber}`}>{t.presetTitle}</h3>
              </div>
            </div>
            <p className="furniture-presets-intro">{t.presetIntro}</p>
            <div className="furniture-preset-list">
              <article className="furniture-preset furniture-preset-custom" data-active={isCustomActive}>
                <button type="button" className="furniture-preset-button" aria-label={t.customPresetName} aria-pressed={isCustomActive} onClick={selectCustomDimensions}>
                  <span className="furniture-preset-image furniture-preset-custom-visual" aria-hidden="true"><span>{localeConfig.axes.width} × {localeConfig.axes.depth} × {localeConfig.axes.height}</span></span>
                  <span className="furniture-preset-copy"><span className="furniture-preset-brand">{t.customPresetBrand}</span><strong>{t.customPresetName}</strong><span className="furniture-preset-clear-label">{t.customPresetCopy}</span><span className="furniture-preset-action">{isCustomActive ? t.customPresetActive : t.customPresetApply}</span></span>
                </button>
              </article>
              {furniturePresets.map((preset) => {
                const isActive = !customSelected && activeFurniturePreset?.id === preset.id;
                return (
                  <article className="furniture-preset" data-active={isActive} key={preset.id}>
                    <button type="button" className="furniture-preset-button" aria-label={`${t.presetApply}${dictionary.common.labelSeparator}${preset.brand} ${preset.name}`} aria-pressed={isActive} onClick={() => applyFurniturePreset(preset)}>
                      <span className="furniture-preset-image"><Image src={preset.imagePath} alt={`${preset.brand} ${preset.name} ${t.presetImage}`} fill unoptimized sizes="150px" /></span>
                      <span className="furniture-preset-copy"><span className="furniture-preset-brand">{preset.brand} · {preset.kind === "largeDisplayCase" ? t.presetLargeDisplayCase : preset.kind === "singleCube" ? t.presetSingleCube : t.presetSingleShelf}</span><strong>{preset.name}</strong><span className="furniture-preset-clear-label">{preset.publishedClearSpace ? t.presetClearPublished : t.presetClear}</span><span className="furniture-preset-dimensions">{furnitureDimensions(preset.planningClearCm)}</span><span className="furniture-preset-action">{isActive ? t.presetApplied : t.presetApply}</span></span>
                    </button>
                    <div className="furniture-preset-source"><span>{t.presetOuter}{dictionary.common.labelSeparator}{furnitureDimensions(preset.publishedOuterCm)}</span></div>
                  </article>
                );
              })}
            </div>
            <p className="furniture-presets-note">{t.presetNote}</p>
          </section>
        </details>
        {isCustomActive ? <p className="custom-dimensions-hint" id={`custom-dimensions-hint-${safeInitialNumber}`}>{t.customDimensionsHint}</p> : null}
        <div className="fit-core-grid">
          <SearchableSetSelect
            id={`set-${safeInitialNumber}`}
            label={t.choose}
            sets={sets}
            value={setNumber}
            locale={locale}
            placeholder={t.setSearchPlaceholder}
            noResults={t.noSetResults}
            openLabel={t.openSetList}
            closeLabel={t.closeSetList}
            onChange={setSetNumber}
          />
          <div className="dimension-inputs">{(["widthCm", "depthCm", "heightCm"] as const).map((key) => { const label = key === "widthCm" ? t.internalWidth : key === "depthCm" ? t.internalDepth : t.internalHeight; return <div className="field" key={key}><label htmlFor={`${key}-${safeInitialNumber}`}>{label}</label><div className="input-wrap"><input ref={key === "widthCm" ? widthInputRef : undefined} id={`${key}-${safeInitialNumber}`} min="0" step="0.1" inputMode="decimal" type="number" value={shown(fromCm(shelf[key], unit))} aria-describedby={isCustomActive ? `custom-dimensions-hint-${safeInitialNumber}` : undefined} onChange={(event) => updateShelf(key, event.target.value)} /><span className="input-unit">{unit}</span></div></div>; })}</div>
        </div>
        <section className="orientation-picker" aria-labelledby={`orientation-title-${safeInitialNumber}`}>
          <div>
            <span className="fit-visual-kicker">{t.orientationKicker}</span>
            <h3 id={`orientation-title-${safeInitialNumber}`}>{t.orientationTitle}</h3>
            <p>{t.orientationHint}</p>
          </div>
          <div className="orientation-toggle" role="group" aria-label={t.orientationControls}>
            <button type="button" aria-pressed={orientation === "standard"} onClick={() => setOrientation("standard")}>{t.standard}</button>
            <button type="button" aria-pressed={orientation === "rotated"} onClick={() => setOrientation("rotated")}>{t.rotated}</button>
          </div>
        </section>
        <div className="fit-result" data-status={result.status} role="status" aria-live="polite">
          <div className="result-top"><span className="result-icon" aria-hidden="true">{result.icon}</span><div><h3>{result.title}</h3><p>{result.message}</p></div></div>
          <div className="fit-axis-summary" aria-label={t.dimensionCheck}>
            {comparisons.map((comparison) => {
              const axisLabel = comparison.axis === "widthCm" ? localeConfig.axes.width : comparison.axis === "depthCm" ? localeConfig.axes.depth : localeConfig.axes.height;
              return (
                <div className="fit-axis-compact" data-fit={comparison.fits} key={comparison.axis} role="group" aria-label={`${axisLabel}${dictionary.common.labelSeparator}${t.setLabel} ${formatMeasurement(comparison.setCm, unit, numberLocale)} ${unit}${dictionary.common.recordSeparator}${t.cabinetLabel} ${formatMeasurement(comparison.cabinetCm, unit, numberLocale)} ${unit}${dictionary.common.recordSeparator}${comparison.fits ? t.axisFits : t.axisTooSmall}`}>
                  <strong>{axisLabel}</strong>
                  <span><small>{t.setLabel}</small> {formatMeasurement(comparison.setCm, unit, numberLocale)}</span>
                  <i aria-hidden="true">→</i>
                  <span><small>{t.cabinetLabel}</small> {formatMeasurement(comparison.cabinetCm, unit, numberLocale)}</span>
                  <em aria-hidden="true">{comparison.fits ? "✓" : "×"}</em>
                </div>
              );
            })}
          </div>
          <div className="fit-result-meta"><span>{result.orientation}</span><span>{t.strict}</span></div>
        </div>

        <div className="fit-secondary-tools">
          <details className="fit-secondary-panel">
            <summary><span>{t.previewTitle}</span><small>{selected.name}</small></summary>
            <section className="fit-visual" aria-labelledby={`fit-visual-title-${safeInitialNumber}`}>
              <div className="fit-visual-heading"><div><span className="fit-visual-kicker">{t.previewTitle}</span><h3 id={`fit-visual-title-${safeInitialNumber}`}>{selected.name}</h3></div><InfoTip id={`calculator-size-${selected.set_id}`} text={dimensionInfoText(selected, locale)} label={`${t.info} ${selected.name}`} /></div>
              <p className="fit-visual-hint">{t.previewHint}</p>
              <div className="fit-visual-stage" style={visualStyle}>
                <div className="fit-zoom-controls" role="group" aria-label={t.zoomControls}>
                  <button type="button" aria-label={t.zoomOut} title={t.zoomOut} disabled={visualZoom <= visualZoomMin} onClick={() => changeVisualZoom(-visualZoomStep)}>−</button>
                  <button type="button" className="fit-zoom-reset" aria-label={t.resetZoom} title={t.resetZoom} onClick={() => setVisualZoom(defaultVisualZoom)}>{Math.round(visualZoom * 100)}%</button>
                  <button type="button" aria-label={t.zoomIn} title={t.zoomIn} disabled={visualZoom >= visualZoomMax} onClick={() => changeVisualZoom(visualZoomStep)}>+</button>
                </div>
                <div className="fit-visual-canvas" role="img" aria-label={`${t.previewAria}${dictionary.common.labelSeparator}${selected.name}`}>
                  <div className="fit-cuboid fit-cuboid-cabinet" aria-hidden="true"><span className="cuboid-face cuboid-face-front" /><span className="cuboid-face cuboid-face-back" /><span className="cuboid-face cuboid-face-left" /><span className="cuboid-face cuboid-face-right" /><span className="cuboid-face cuboid-face-top" /><span className="cuboid-face cuboid-face-bottom" /></div>
                  <div className="fit-cuboid fit-cuboid-set" data-status={visualStatus} data-orientation={orientation} aria-hidden="true"><span className="cuboid-face cuboid-face-front" data-media={orientation === "standard"}>{orientation === "standard" ? visualSetMedia : null}</span><span className="cuboid-face cuboid-face-back" /><span className="cuboid-face cuboid-face-left" /><span className="cuboid-face cuboid-face-right" data-media={orientation === "rotated"}>{orientation === "rotated" ? visualSetMedia : null}</span><span className="cuboid-face cuboid-face-top" /><span className="cuboid-face cuboid-face-bottom" /></div>
                </div>
              </div>
              <div className="fit-visual-legend" aria-hidden="true"><span><i className="cabinet-swatch" />{t.cabinetLabel}</span><span><i className="set-swatch" />{t.setLabel}</span></div>
            </section>
          </details>
        </div>
      </div>
    </div>
  );
}
