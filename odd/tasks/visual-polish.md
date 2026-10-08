# Feature: visual-polish

Branch: `feat/visual-polish` (from `Dev`). Site lives in `site/` (Astro).

## Objective
Improve perceived visual quality and performance of the portfolio: lighter images, fix the dark-mode card bug, add fluid scroll-reveal animations.

## Problem (audit evidence)
- 9 character PNGs ~22 MB total, no WebP/AVIF (`site/public/assets/character/*.png`, `character.json` has null `src_webp`/`src_mobile_*`).
- Dark mode: Proyectos overlay text uses `--color-cream` / `--color-cream-75`, which resolve to near-black on a hardcoded dark overlay (`Proyectos.astro:218,237`, `tokens.css:52,61`).
- No scroll-reveal animations on any section; motion timings hardcoded and fragmented.

## Scope (authorized)
Only T1-T3 below. Everything else from the audit (modal, Tienda hover, theme transition, a11y) is out of scope until the user asks.

## Constraints
- Animate only `transform`/`opacity`/`clip-path`. Respect `prefers-reduced-motion`.
- Follow `.claude/skills/design-ui/SKILL.md` (outer/inner transform separation, overlays hardcoded dark).
- Artifacts (code, comments, commits) in English. Conventional Commits, no AI attribution.
- Advisory ~400 authored changed lines per task; not a hard cap.

## Delivery strategy
`ask-on-risk`. Push/PR/merge are the user's decisions.

## Tasks
- [x] T1 Fix dark-mode overlay text contrast in Proyectos (route: inline, 1 file)
- [x] T2 Optimize character/project images: generate AVIF/WebP + mobile variants with sharp script, wire `character.json` + `Character.astro` `<picture>`, add width/height, remove duplicate Mermis assets (route: delegated writer, multi-file)
- [x] T3 Scroll-reveal system: motion tokens (easing/duration/distance), one IntersectionObserver in global script, `data-reveal` on section content and images (clip-path + scale), reduced-motion safe (route: delegated writer, multi-file)
- [ ] T4 Unify portrait treatment: consistent frame (border, radius, shadow, tint) for the rectangular character photos across Hero/SobreMi/Stack/Servicios/Educacion/Ahora/Contacto/Mermis (route: delegated writer)
- [ ] T5 Proyectos layout: full-width featured card, uncropped image (aspect-ratio), no empty 2/3 when few projects (route: delegated writer)
- [x] T6 Reveal polish: remove data-reveal from Hero h1 (LCP), earlier trigger (rootMargin), shorter title duration (route: delegated writer)

## Acceptance
- T1: card title/tags readable in both themes.
- T2: character assets total well under ~3 MB; site renders identically; no 404s.
- T3: reveals trigger once on enter, no layout shift, disabled under reduced motion; `pnpm build` passes.

## Progress / evidence
- T1 done, commit bdf29d0: Proyectos overlay title/tags use hardcoded light colors so dark mode stays readable. Route: inline (1 file). No runnable test; structural check only. Visual check in browser pending.
- T2 done: character assets 21.4 MB PNG -> 370 KB WebP desktop / 116 KB mobile; <picture> + width/height wired in Character/Hero/Stack/Servicios/Contacto/Mermis; Mermis duplicate dir removed (mermis.json repointed). Route: delegated writer + parent finish. Checks: pnpm optimize:images ok, pnpm build ok, path existence ok (only pre-existing hidden 02-bifurcacion.png missing). No test runner -> structural exception. Also added Grafana/Zabbix to stack.json (user request).
- T3 done: motion tokens, reveal.css, reveal.ts (single IntersectionObserver, html.js-reveal set by inline head script, data-reveal removed after transition), 74 data-reveal tags across 12 components. Route: delegated writer. Checks: pnpm build ok (parent re-ran), structural dist check ok. Not verified visually in a browser.
- T6 done: Hero has no data-reveal (h1 visible on load), observer rootMargin -4% + 10% ratio, elements already in the initial viewport reveal immediately, --reveal-duration-title 500ms for h1-h3. Route: delegated writer. Checks: pnpm build ok; visual check at 1440x900: hero h1 visible immediately. No test runner -> structural exception.

## Next step
Visual check in browser, then native review decision (assessment was unassessable due to untracked root files, treated as high risk).
