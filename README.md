# Martinez Logistics LLC

Premium photographic chauffeur website with 18 prerendered routes, real automotive film, three photographic vehicle categories and live Acuity reservations.

## Run and deploy

Node.js 20+: `npm run build`, `npm test`, `npm run dev`. Open http://127.0.0.1:4173. No dependencies or installation are required. Vercel uses the committed `vercel.json` to build with `npm run build` and serve `dist/`. `SITE_URL` overrides the final domain; `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when present.

## Design and media

The previous procedural 3D approach has been replaced completely. The hero is actual filmed automotive footage with muted inline playback, a matching poster, replay/pause controls, reduced-motion behavior, data-saver fallback and muted autoplay on eligible visits. The film is not a synthetic vehicle approach or photo zoom. The collection uses actual vehicle photographs with subtle crossfades and a transition into reservations that keeps the selected category photograph visible. Mobile has a compact photo presentation above the booking panel. No WebGL, rotating platform or model-inspection controls are loaded.

Media is stored locally, rather than depending on stock-provider embeds or a runtime CDN. See `MEDIA-LICENSES.md` for source pages, creators and license details. Photographs and footage are representative; they do not assert actual fleet ownership or specific model availability. Homepage category cards and the arrival editorial section use the same real photographic art direction. The transparent logo remains the existing derivative of the supplied logo.

## Source structure

- `template.html`: shared navigation, footer, metadata and shell.
- `dist/content.js`: page content and route metadata.
- `dist/photography.js`: centralized category images, crops, credits and film paths.
- `dist/business.js`: verified company facts, service listings and Acuity identifiers.
- `dist/showroom-ui.js`: photographic collection and reservation markup.
- `dist/showroom.js`: category/service selection, crossfades, history and booking transition.
- `dist/arrival.js`: real-film hero playback and graceful fallbacks.
- `dist/motion.js`: section reveals, header and native-scroll progress.
- `build.mjs`: prerendering, sitemap, canonical metadata and internal link checks.

## Live booking

Source: https://www.martinezlogisticsllc.com/appointments. The existing scheduler is Acuity owner 40025547, schedule 81fbe8dc, calendar 14399125. All nine appointment IDs were read from real selections in the visible scheduler on October 21, 2026. `?option=0` through `?option=8` preserve the service; `&booking=1` opens the reservation panel. Acuity handles live availability, journey/passenger details, payment requirements, validation, terms and actual confirmation. Direct provider links remain available if embedding fails. No private APIs or raw payment handling are used. No real reservation or payment was submitted during QA.

## Verified company information

The official About page states the business started in 2016 with a 26-foot box truck and expanded into luxury black car and limousine service in 2025. Corporate, executive, airport and special-event services are described there. The site's visible contact heading displays MARTINEZLOGISTICSLLC@GMAIL.COM; its conflicting misspelled mail link was not used. No unrelated carrier-directory records were used. Capacities, exact vehicle models and service policies require company confirmation.

The contact form prepares an email in the visitor's own email app, clearly labeled before use. It does not falsely report a sent inquiry. This website itself does not store passenger or payment details. Personal reservation data is entered directly into Acuity and is never placed in page URLs.

## Validation

`npm run build` prerenders all 18 pages and verifies internal asset/link references. `npm test` checks one H1 per route, resolved placeholders, arrow-free navigation, all nine supplied prices and provider mappings, Vercel's output directory, and the photographic/film assets. Browser QA checks real video playback, matching category photographs, service preservation, live calendar loads, back navigation, desktop/mobile overflow, and console errors. Native wheel/touch scrolling, reduced-motion handling and the gold cursor/scrollbar remain supported.
