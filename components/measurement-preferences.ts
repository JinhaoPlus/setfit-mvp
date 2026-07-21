"use client";

import { useCallback, useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";

export type MeasurementUnit = "cm" | "in";
export type ShelfDimensions = { widthCm: number; depthCm: number; heightCm: number };
export type MeasurementPreferences = ShelfDimensions & { unit: MeasurementUnit };

let memorySnapshot: string | null = null;
const listeners = new Set<() => void>();

function defaultPreferences(unit: MeasurementUnit): MeasurementPreferences {
  return { ...siteConfig.defaultShelfCm, unit };
}

function isMeasurementPreferences(value: unknown): value is MeasurementPreferences {
  if (!value || typeof value !== "object") return false;
  const stored = value as Partial<MeasurementPreferences>;
  return (stored.unit === "cm" || stored.unit === "in")
    && [stored.widthCm, stored.depthCm, stored.heightCm].every((dimension) => typeof dimension === "number" && Number.isFinite(dimension) && dimension >= 0);
}

function normalizeSnapshot(rawValue: string | null) {
  if (!rawValue) return null;
  try {
    const preferences: unknown = JSON.parse(rawValue);
    return isMeasurementPreferences(preferences) ? JSON.stringify(preferences) : null;
  } catch {
    return null;
  }
}

function getSnapshot(defaultUnit: MeasurementUnit) {
  try {
    const storedSnapshot = normalizeSnapshot(window.localStorage.getItem(siteConfig.shelfStorageKey));
    if (storedSnapshot) memorySnapshot = storedSnapshot;
    else if (!memorySnapshot) return JSON.stringify(defaultPreferences(defaultUnit));
  } catch {
    // Keep the in-memory value when browser storage is blocked.
  }
  return memorySnapshot ?? JSON.stringify(defaultPreferences(defaultUnit));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== siteConfig.shelfStorageKey) return;
    memorySnapshot = normalizeSnapshot(event.newValue);
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveMeasurementPreferences(preferences: MeasurementPreferences) {
  memorySnapshot = JSON.stringify(preferences);
  try {
    window.localStorage.setItem(siteConfig.shelfStorageKey, memorySnapshot);
  } catch {
    // In-memory preferences keep the controls usable when storage is blocked or full.
  }
  listeners.forEach((listener) => listener());
}

export function useMeasurementPreferences(defaultUnit: MeasurementUnit) {
  const readClientSnapshot = useCallback(() => getSnapshot(defaultUnit), [defaultUnit]);
  const readServerSnapshot = useCallback(() => JSON.stringify(defaultPreferences(defaultUnit)), [defaultUnit]);
  const snapshot = useSyncExternalStore(subscribe, readClientSnapshot, readServerSnapshot);
  return JSON.parse(snapshot) as MeasurementPreferences;
}

