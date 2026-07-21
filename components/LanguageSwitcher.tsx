"use client";

import type { ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig, type Locale } from "@/config/site";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const segments = pathname.split("/");
    const hasLocalePrefix = siteConfig.locales.some(({ code }) => code === segments[1]);
    if (hasLocalePrefix) segments[1] = nextLocale;
    const nextPath = hasLocalePrefix ? segments.join("/") : `/${nextLocale}${pathname === "/" ? "" : pathname}`;
    document.cookie = `${siteConfig.localeCookie}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.push(nextPath);
  };

  return (
    <label className="language-switcher">
      <span className="sr-only">{label}</span>
      <select value={locale} onChange={changeLanguage} aria-label={label}>
        {siteConfig.locales.map((option) => <option key={option.code} value={option.code}>{option.flag} {option.label}</option>)}
      </select>
    </label>
  );
}
