# Martinez Logistics LLC

Luxury chauffeur website with a dedicated rotating 3D showroom, a lightweight logo-led homepage and live Acuity reservations.

Run Node 20+: npm run build, npm test, npm run dev. Vercel uses vercel.json and serves dist. No dependency installation is required; Three.js, GLTFLoader, Draco and HDR assets are local.

## Experiences

/fleet/ and /reserve/ show one downloaded vehicle model on a shared rotating platform, 60 seconds per revolution. Drag or arrow keys inspect, scroll zooms, and pause/reset controls are accessible. Selecting a vehicle decelerates rotation and opens the actual Acuity calendar beside the vehicle. All nine supplied listings and rates remain mapped to their existing appointment IDs. Returning to the collection preserves the loaded calendar until the service changes.

The homepage uses a transparent brand mark, a restrained light sweep and CSS opacity/transform animation. It has no WebGL, vehicle model, video, blocking intro or photo-to-animation transition. Reduced-motion settings show the final composition immediately.

The showroom first paints a dark branded loading state; it never loads a vehicle photograph. The first mesh and HDR environment load in parallel, and shaders compile before the scene is revealed. Rendering is capped at 30 fps, device pixel ratio is limited, and one shadow-casting key light replaces three shadow passes. Models remain compressed and are cached by the browser.

The site has 31 prerendered routes. Five service pages include planning guidance, service-specific FAQs and booking details. Twelve city pages cover Atlanta, Alpharetta, Roswell, Sandy Springs, Dunwoody, Brookhaven, Decatur, Marietta, Smyrna, Johns Creek, Duluth and Lawrenceville. Each has distinct local context, itinerary examples and a local question, with official municipal or tourism references. The story is adapted from the company’s original About page, checked October 21, 2026.

Representative models: Mercedes-Benz S-Class, Cadillac Escalade and Mercedes-Benz Sprinter. Actual fleet models and capacities need business confirmation. No invented capacity or exact-model promise is displayed. See MEDIA-LICENSES.md and /credits/.

## Source

- dist/automotive.js: shared PBR renderer, model loading, normalization and materials.
- dist/vehicle-stage.js: rotating platform, inspection and booking camera.
- dist/editorial.js and cities.js: logo hero, story, expanded services and distinct city pages.
- dist/fonts/: local WOFF2 font subsets and SIL Open Font License notices.
- dist/showroom.js: service selection, history and Acuity integration.
- dist/showroom-ui.js: minimal showroom and reservation markup.
- dist/business.js: nine verified appointment mappings.
- dist/content.js and template.html: prerendered pages and shared layout.
- build.mjs and verify.mjs: route, asset, rate and integration validation.

GPU performance varies by device. Pixel ratio is capped; no animation is rendered in the hidden showroom tab, and the homepage animation runs once in CSS and loads no 3D renderer.

The homepage entrance is a lightweight SVG/CSS composition of the original transparent logo. The SUV reverses into its original position before revealing the licensed chauffeur pickup photograph. It plays once per browser using localStorage, supports skip/replay and respects reduced motion. A six-second failsafe prevents the entrance from blocking the page.
