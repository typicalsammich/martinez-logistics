# Martinez Logistics LLC

Luxury chauffeur website with a dedicated rotating 3D showroom, a 4.8-second real-time arrival scene and live Acuity reservations.

Run Node 20+: npm run build, npm test, npm run dev. Vercel uses vercel.json and serves dist. No dependency installation is required; Three.js, GLTFLoader, Draco and HDR assets are local.

## Experiences

/fleet/ and /reserve/ show one downloaded vehicle model on a shared rotating platform, 60 seconds per revolution. Drag or arrow keys inspect, scroll zooms, and pause/reset controls are accessible. Selecting a vehicle decelerates rotation and opens the actual Acuity calendar beside the vehicle. All nine supplied listings and rates remain mapped to their existing appointment IDs. Returning to the collection preserves the loaded calendar until the service changes.

The homepage renders a separate 4.8-second arrival: darkness, headlights, approach, deceleration, stop and title reveal at a dark architectural entrance. It stops on the final hero composition. Skip and replay controls, reduced-motion and same-session return behavior are supported. A photographic fallback stays available if WebGL or model loading fails. The scene is a real-time rendering, not actual filmed company footage.

Representative models: Mercedes-Benz S-Class, Cadillac Escalade and Mercedes-Benz Sprinter. Actual fleet models and capacities need business confirmation. No invented capacity or exact-model promise is displayed. See MEDIA-LICENSES.md and /credits/.

## Source

- dist/automotive.js: shared PBR renderer, model loading, normalization and materials.
- dist/vehicle-stage.js: rotating platform, inspection and booking camera.
- dist/arrival-scene.js: separate architectural arrival sequence.
- dist/showroom.js: service selection, history and Acuity integration.
- dist/showroom-ui.js: minimal showroom and reservation markup.
- dist/business.js: nine verified appointment mappings.
- dist/content.js and template.html: prerendered pages and shared layout.
- build.mjs and verify.mjs: route, asset, rate and integration validation.

GPU performance varies by device. Pixel ratio is capped; no animation is rendered in the hidden showroom tab, and the homepage stops rendering after the intro finishes.
