"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig, type Locale } from "@/config/site";

function rememberLocale(nextLocale: Locale) {
  document.cookie = `${siteConfig.localeCookie}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const selectedIndex = siteConfig.locales.findIndex((option) => option.code === locale);
  const selectedLocale = siteConfig.locales[selectedIndex] ?? siteConfig.locales[0];

  useEffect(() => {
    if (!open) return;
    const animationFrame = requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnFocusOutside = (event: FocusEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("focusin", closeOnFocusOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("focusin", closeOnFocusOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, selectedIndex]);

  const changeLanguage = (nextLocale: Locale) => {
    setOpen(false);
    if (nextLocale === locale) {
      triggerRef.current?.focus();
      return;
    }
    const segments = pathname.split("/");
    const hasLocalePrefix = siteConfig.locales.some(({ code }) => code === segments[1]);
    if (hasLocalePrefix) segments[1] = nextLocale;
    const nextPath = hasLocalePrefix ? segments.join("/") : `/${nextLocale}${pathname === "/" ? "" : pathname}`;
    rememberLocale(nextLocale);
    router.push(nextPath);
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const activeIndex = optionRefs.current.findIndex((option) => option === document.activeElement);
    let nextIndex = activeIndex;
    if (event.key === "ArrowDown") nextIndex = (activeIndex + 1 + siteConfig.locales.length) % siteConfig.locales.length;
    else if (event.key === "ArrowUp") nextIndex = (activeIndex - 1 + siteConfig.locales.length) % siteConfig.locales.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = siteConfig.locales.length - 1;
    else return;
    event.preventDefault();
    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="language-switcher" ref={rootRef}>
      <button
        className="language-switcher-trigger"
        type="button"
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        <span className="sr-only">{label}</span>
        <span className="language-switcher-flag" aria-hidden="true">{selectedLocale.flag}</span>
        <span className="language-switcher-label" lang={selectedLocale.code}>{selectedLocale.label}</span>
        <span className="language-switcher-chevron" aria-hidden="true">⌄</span>
      </button>
      <div
        className="language-switcher-menu"
        id={menuId}
        role="listbox"
        aria-label={label}
        hidden={!open}
        onKeyDown={handleMenuKeyDown}
      >
        {siteConfig.locales.map((option, index) => (
          <button
            className="language-switcher-option"
            type="button"
            role="option"
            aria-selected={option.code === locale}
            key={option.code}
            ref={(element) => { optionRefs.current[index] = element; }}
            onClick={() => changeLanguage(option.code)}
          >
            <span aria-hidden="true">{option.flag}</span>
            <span lang={option.code}>{option.label}</span>
            <span className="language-switcher-check" aria-hidden="true">{option.code === locale ? "✓" : ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
