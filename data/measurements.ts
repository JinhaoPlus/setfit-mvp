export type MeasurementUnit = "cm" | "in";

export function fromCm(valueCm: number, unit: MeasurementUnit) {
  return unit === "cm" ? valueCm : valueCm / 2.54;
}

export function toCm(value: number, unit: MeasurementUnit) {
  return unit === "cm" ? value : value * 2.54;
}

export function formatMeasurement(valueCm: number, unit: MeasurementUnit, numberLocale: string) {
  return new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 1 }).format(fromCm(valueCm, unit));
}
