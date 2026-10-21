# Martinez Logistics LLC

Luxury chauffeur website with 15 static routes, category selector, all nine supplied rate listings, and a four-step reservation draft planner.

## Run

Node.js 20+: `npm run build`, then `npm run dev`. Open http://127.0.0.1:4173. No installation or dependencies required. Deploy `dist/` with directory index support.

## Business configuration

`dist/business.js` centralizes service listings and integration fields. IDs are local UI identifiers, not provider booking IDs. Supplied spelling is normalized for display. Every supplied listing is shown with its one-hour duration; no transfer or extended-time formula is inferred.

## Required before operational launch

- Verified booking-provider URL/API, real service IDs, availability and pricing rules. The current flow downloads a draft and does not transmit or confirm reservations.
- Verified phone, email, operating hours, lead time, service boundaries, passenger/luggage capacities and amenities.
- Business-approved privacy, cancellation and service terms, taxes and fees.
- Actual fleet photographs, verified make/model/year, licensed accurate 3D models and licensed arrival footage. Current hero is AI-generated illustrative SUV imagery, labeled on the site. Category browsing works without WebGL. True 3D rotation and cinematic vehicle arrival are pending accurate assets; no simulated 3D claims are made.
- If live requests are enabled: server validation, secure records, idempotency, rate limiting, notification delivery and real end-to-end submission testing. Do not put credentials in frontend configuration.

The original website and Facebook page could not be accessed through research tools. No contact information, reviews, credentials, capacities or history were invented. Contact page identifies the missing integration and routes to the draft planner.

## Assets

Logo background removal used the built-in imagegen tool, with this prompt: remove only the black background to genuine transparency; preserve the gold M, SUV illustration, gold lines and exact MARTINEZ / LOGISTICS LLC / CHAUFFEUR SERVICE text and proportions. The generated derivative has small visual differences from the source and should receive brand review.

Hero used built-in imagegen: photorealistic unbranded black luxury SUV at a refined dark stone hotel at night, warm amber lights, low three-quarter view, restrained reflections, negative space on the left, no text or logos. Illustrative category imagery, not an actual company fleet photograph.

Google Fonts is an optional external enhancement; system serif and sans-serif fallbacks are included. Reduced motion is respected. No personal details persist in browser storage or URL parameters.

## Validation

Build script creates route HTML, sitemap and robots; verifies shared local links. JavaScript syntax checked with Node. Browser QA and integration limitations are reported separately. No live booking or payment submission was performed.
