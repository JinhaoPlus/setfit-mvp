"use client";

import { ANALYTICS_SETTINGS_EVENT } from "@/analytics/events";

export function AnalyticsSettingsButton({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return null;

  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))}>
      {children}
    </button>
  );
}
