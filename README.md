# Martinez Logistics LLC

Luxury chauffeur website with 18 prerendered routes, all nine supplied service rates, a category showroom and live Acuity reservations.

## Run and deploy

Node.js 20+: `npm run build`, `node verify.mjs`, then `npm run dev`. Open http://127.0.0.1:4173. No dependency installation is needed. Vercel uses the committed `vercel.json` to build with `npm run build` and serve `dist/`. Set `SITE_URL` to your final domain if different from the production Vercel hostname. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is automatically used when supplied by its build environment.

## Structure

- `template.html`: shared accessible navigation, footer, SEO and page shell.
- `dist/content.js`: shared prerendered page content, service descriptions and metadata.
- `dist/business.js`: business facts, rates, actual Acuity identifiers and optional cinematic asset configuration.
- `dist/app.js`: category browsing, touch controls, live service selection, contact email composition.
- `dist/motion.js`: skippable entrance, optional video, section reveals, scroll progress and header behavior.
- `build.mjs`: prerenders content, canonical metadata, sitemap and robots; verifies all referenced internal paths.

## Booking integration

The official source is https://www.martinezlogisticsllc.com/appointments. Its existing scheduler is Acuity owner 40025547, schedule 81fbe8dc, calendar 14399125. All nine appointment IDs were read from real service selections in the visible scheduler on October 21, 2026. They are not invented IDs. The iframe embeds that live provider and preserves service selection with `?option=0` through `?option=8`. Direct provider links remain available if embedding is blocked. The selected appointment's calendar, timezone, data collection, validation, terms, payments and confirmation stay in Acuity. No private APIs or raw payment handling are used. No real reservation or payment was submitted during testing.

## Verified business content

The original site's About page states the company began in 2016 with a 26-foot box truck and expanded into luxury black car and limousine service in 2025. Corporate, executive, airport and special-event services are described there. The contact/footer heading displays MARTINEZLOGISTICSLLC@GMAIL.COM; a footer mail link has a conflicting typo, so the visible business email heading is used. Source pages: `/`, `/about`, `/contact`, `/appointments` on the official domain. No unrelated carrier-directory records were used.

## Visuals and remaining asset requirements

The transparent PNG is an imagegen derivative of the supplied logo; it has minor differences and should receive brand review. The hero SUV image is AI-generated illustrative editorial imagery, identified on the site. It is not presented as an actual fleet photograph. Cursor and pointer SVGs are native assets. Thin gold/charcoal scrollbar styling preserves native wheel and touch scrolling; browser chrome and hardware cannot be restyled by a website.

The entrance uses a 4.8-second still-image lighting/text reveal with skip, session replay suppression and reduced-motion support. This is not a moving vehicle arrival film. Set `business.cinematicVideo` only after obtaining licensed, verified fleet footage; optional video playback already supports muted inline playback, poster, error fallback and skipping. Accurate make/model/year, photos and licensed 3D models remain required for true vehicle rotation and inspection. Sedan and Sprinter use honest category typography until those assets exist. No fake generic 3D car is substituted.

## Contact and privacy

The contact form opens an email draft in the visitor's email app. It never falsely reports a sent message. Passenger details are entered directly in Acuity. The site itself stores only an entrance-seen flag in session storage. No personal data is placed in query strings. Privacy and booking information describe implemented behavior; business-specific policies remain managed by the booking provider/company.

## Validation

`npm run build` verifies 412 internal asset/link references. `node verify.mjs` checks one H1 per route, resolved templates, all supplied prices, nine unique provider mappings, navigation arrow removal and Vercel's `dist` output. Node syntax checks pass. Browser QA verified all nine real iframe appointment selections, mobile menu, mobile category controls and selection preservation, desktop/mobile overflow, gold cursor and scrollbar. Live calendars load in the embedded theme. No booking or payment was completed. Reduced-motion behavior is implemented in CSS and JS; no heavy WebGL or synthetic wheel interception is used.
