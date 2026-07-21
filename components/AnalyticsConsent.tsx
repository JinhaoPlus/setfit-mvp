"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ANALYTICS_SETTINGS_EVENT } from "@/analytics/events";
import { initializePostHog, isPostHogConfigured, posthog } from "@/analytics/posthog";

type AnalyticsConsentCopy = {
  title: string;
  description: string;
  accept: string;
  reject: string;
  privacyLink: string;
  label: string;
};

export function AnalyticsConsent({ copy, privacyHref }: { copy: AnalyticsConsentCopy; privacyHref: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!initializePostHog()) return;

    let active = true;
    queueMicrotask(() => {
      if (active) setIsOpen(posthog.get_explicit_consent_status() === "pending");
    });

    const openSettings = () => setIsOpen(true);
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
    return () => {
      active = false;
      window.removeEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
    };
  }, []);

  if (!isPostHogConfigured() || !isOpen) return null;

  const acceptAnalytics = () => {
    const wasGranted = posthog.get_explicit_consent_status() === "granted";
    posthog.opt_in_capturing({ captureEventName: "analytics_consent_granted" });
    if (!wasGranted) {
      posthog.capture("$pageview", { $current_url: window.location.href });
    }
    setIsOpen(false);
  };

  const rejectAnalytics = () => {
    posthog.opt_out_capturing();
    setIsOpen(false);
  };

  return (
    <section className="analytics-consent" aria-label={copy.label} aria-live="polite">
      <div className="analytics-consent-copy">
        <h2>{copy.title}</h2>
        <p>{copy.description} <Link href={privacyHref}>{copy.privacyLink}</Link></p>
      </div>
      <div className="analytics-consent-actions">
        <button className="button button-secondary" type="button" onClick={rejectAnalytics}>{copy.reject}</button>
        <button className="button button-primary" type="button" onClick={acceptAnalytics}>{copy.accept}</button>
      </div>
    </section>
  );
}
