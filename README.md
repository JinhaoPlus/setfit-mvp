# bricksfit MVP

bricksfit is an independent display-planning site based on a Brickset API snapshot
of large released Normal-category sets ranked by piece count.

Source files:

- `data/large-top500.json`: 500 normalized set records;
- `data/sources/LEGO_大型套装Top500_尺寸与收纳报告.md`: human-readable report;
- `data/sources/LEGO_大型套装尺寸与收纳数据规范.md`: field, correction and calculation rules.

The UI presents built H/W/D plainly. A small information control contains the
preparation method and reliability guidance. Package dimensions remain
separate from built dimensions.

The local product thumbnails in `public/sets/` come from Brickset and are
displayed with attribution. When Brickset has no catalog image, the site shows
an explicit image-unavailable placeholder.

## Localization

Published language versions use indexable URL prefixes such as `/en` and `/de`.
The header switcher keeps the current page while changing the prefix. Each
locale owns a complete content block in `data/i18n.ts` and a locale-specific
format configuration in `config/site.ts`.

The language switcher, route parameters, canonical/`hreflang` metadata and
sitemap all read the locale registry. Adding Japanese or Chinese therefore
requires registering the locale and adding its content/configuration; route and
component logic does not need language-specific branches.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## Optional PostHog analytics

Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to enable
the consent-gated PostHog integration. Without a project token, no analytics UI
or SDK activity is enabled. Visitors must explicitly opt in before events or
PostHog persistence are enabled, and they can change that choice from the
footer. The default configuration captures page views and basic masked
interactions; session replay, surveys, exception capture, heatmaps, performance
capture, and feature flags are disabled.

For EU traffic, use the EU ingestion host and disable IP capture in the PostHog
project settings if required by your privacy policy.

## Vercel Web Analytics

The app includes `@vercel/analytics` in the locale root layout, so page views
and client-side route changes are tracked after deployment. Enable Web Analytics
for the project in the Vercel dashboard and redeploy before expecting data. No
environment variable is required.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the production build
- `npm test`: build and verify representative dimension-source cases
