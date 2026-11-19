# Feature: planet-3d

Branch: `feat/planet-3d` (stacked on `feat/planet-backdrop`). Site in `site/` (Astro).

## Objective
Replace the faux-3D SVG ridgeline backdrop with a real Three.js 3D mountain terrain lit by a blue dwarf, keeping the dim-planet mood, theme adaptation (dark/light) and subtlety. The SVG backdrop stays as the fallback.

## Decisions
- Library: `three` (user-approved dependency). Lazy-loaded after first paint so LCP/TBT are unaffected.
- Fallback to the existing SVG `Backdrop.astro` when WebGL is unavailable, on init error, or (static frame) with prefers-reduced-motion.

## Constraints
- Fixed layer z-index 0 behind sections/Character; pointer-events none; aria-hidden.
- Canvas at the existing `--bd-opacity` weight; text contrast stays AA in both themes.
- Perf: DPR capped, ~30fps cap, pause when tab hidden / layer not visible, reduced geometry on mobile, dispose on teardown.
- Code/comments/commits in English; Conventional Commits; no AI attribution.

## Tasks
- [x] T1 Add `three`, create lazy-loaded Backdrop3D (procedural terrain, blue dwarf light, fog, slow camera drift + subtle scroll parallax, theme uniforms), wire fallback (route: delegated writer)

## Acceptance
- Real perspective terrain visible in dark and light, quiet, no seams; blue dwarf lights slopes; theme toggle updates colors live.
- Fallback works (simulate no WebGL); reduced-motion = single static frame; `pnpm build` passes; bundle impact reported; verified at 1440x900 dark/light and 375x812.

## Progress / evidence
T1 done (delegated writer). `three@0.186.1` added; `Backdrop3D.astro` (canvas + idle loader, `?no3d` escape hatch) + `scripts/backdrop3d.ts` (seeded ridged-noise terrain, ShaderMaterial with faceted/smooth normals, sun-lit slopes + rim, distance/valley fog, blue-dwarf sprites, sin drift + damped scroll parallax, ~30fps cap, theme uniforms via `--bd3-*` tokens + MutationObserver, context-loss/pagehide/error fallback to SVG). Tokens `--bd3-*` added for both themes.
- Bundle: lazy chunk `backdrop3d.*.js` 527 KB raw / 131.7 KB gzip; initial JS adds only a ~1 KB gzip loader.
- Checks (preview build on :4322; dev server on :4321 needed a restart after the new dep: Vite 504 Outdated Optimize Dep): `pnpm build` passes; 1440x900 dark+light and 375x812 viewed; live theme switch OK; camera drift measured (position changed over 3s); ~30 fps measured; `?no3d` and WebGL context loss both restore the SVG fallback; min text contrast over canvas: dark 4.66 (worst case over the sun disc, p1 10.6), light 14.4. Reduced-motion static path: code-reviewed only (unverified in browser). No test runner exists in the repo (exception).

## Next step
Review/tune with the user; push/PR are the user's call.
