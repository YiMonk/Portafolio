# Feature: planet-backdrop

Branch: `feat/planet-backdrop` (stacked on `feat/visual-polish`). Site in `site/` (Astro).

## Objective
Add depth to the page background: a hazy, mountainous "dim planet" landscape in blues and near-black greys, with very slow motion, that adapts to both dark and light themes.

## Constraints
- Motion only via transform/opacity, CSS-only, disabled under prefers-reduced-motion.
- Text contrast must stay AA over the backdrop in both themes (low-contrast ridges, anchored to the lower part of the viewport).
- Fixed layer behind sections and the fixed Character layer (see design-ui z-index table); no pointer events.
- Code/comments/commits in English; Conventional Commits; no AI attribution.

## Tasks
- [x] T1 Backdrop component: procedural (seeded, build-time) layered SVG ridgelines + horizon glow + haze, theme tokens for dark/light, slow parallax drift (route: delegated writer)
- [x] T2 Let the backdrop show through: make full-page section backgrounds transparent (keep cards/nav/modals solid), verify contrast and reveal/portrait systems unaffected (route: delegated writer, same pass)

## Acceptance
- Visible depth in dark and light; no section has a flat opaque cream/black wall hiding it.
- AA contrast for body text and labels; no scroll jank; reduced-motion = static.
- `pnpm build` passes; verified at 1440x900 dark/light and 375x812.

## Progress / evidence
- T1/T2 done (delegated writer). Backdrop.astro: 4 seeded midpoint-displacement ridge layers, tileable, drift 120-240s, glow breathing 14s; tokens --bd-* in both themes; 11 section roots set to transparent (Hero had no opaque bg; Nav, modal, case-study page untouched).
- Contrast (60% gray label text on ridge, worst layer): light 4.50:1, dark 5.98:1; full-strength text >= 12.6:1 light, >= 12.6:1 dark. No test runner exists (visual + build checks only).
- Verified: pnpm build passes; dark/light at 1440 (s00,03,05,10) and 375x812 (s00,s09); drift proven via changing computed transform. Fixed svg max-width cap from reset.css (max-width: none).
- Known gap: /proyectos/[slug] case-study page keeps its opaque cream bg (backdrop hidden there; out of this task's surface).

## Next step
Review by the parent; optional: case-study page transparency.
