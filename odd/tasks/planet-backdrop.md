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
- [ ] T1 Backdrop component: procedural (seeded, build-time) layered SVG ridgelines + horizon glow + haze, theme tokens for dark/light, slow parallax drift (route: delegated writer)
- [ ] T2 Let the backdrop show through: make full-page section backgrounds transparent (keep cards/nav/modals solid), verify contrast and reveal/portrait systems unaffected (route: delegated writer, same pass)

## Acceptance
- Visible depth in dark and light; no section has a flat opaque cream/black wall hiding it.
- AA contrast for body text and labels; no scroll jank; reduced-motion = static.
- `pnpm build` passes; verified at 1440x900 dark/light and 375x812.

## Progress / evidence
(none yet)

## Next step
T1+T2.
