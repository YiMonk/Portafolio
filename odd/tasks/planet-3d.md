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
- [ ] T1 Add `three`, create lazy-loaded Backdrop3D (procedural terrain, blue dwarf light, fog, slow camera drift + subtle scroll parallax, theme uniforms), wire fallback (route: delegated writer)

## Acceptance
- Real perspective terrain visible in dark and light, quiet, no seams; blue dwarf lights slopes; theme toggle updates colors live.
- Fallback works (simulate no WebGL); reduced-motion = single static frame; `pnpm build` passes; bundle impact reported; verified at 1440x900 dark/light and 375x812.

## Progress / evidence
(none yet)

## Next step
T1.
