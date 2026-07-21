import type { Locale } from "@/config/site";
import localizedNameData from "./set-localized-names.json";

type NamedSet = {
  set_id: string;
  name: string;
};

type LocalizedNameConfig = {
  locales: Partial<Record<Locale, Record<string, string>>>;
};

const localizedNames = (localizedNameData as LocalizedNameConfig).locales;

export function getLocalizedSetName(set: NamedSet, locale: Locale) {
  return localizedNames[locale]?.[set.set_id] || set.name;
}

export function withLocalizedSetName<T extends NamedSet>(set: T, locale: Locale): T {
  const name = getLocalizedSetName(set, locale);
  return name === set.name ? set : { ...set, name };
}
