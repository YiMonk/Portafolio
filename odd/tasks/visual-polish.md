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
- [ ] T3 Scroll-reveal system: motion tokens (easing/duration/distance), one IntersectionObserver in global script, `data-reveal` on section content and images (clip-path + scale), reduced-motion safe (route: delegated writer, multi-file)

## Acceptance
- T1: card title/tags readable in both themes.
- T2: character assets total well under ~3 MB; site renders identically; no 404s.
- T3: reveals trigger once on enter, no layout shift, disabled under reduced motion; `pnpm build` passes.

## Progress / evidence
- T1 done, commit bdf29d0: Proyectos overlay title/tags use hardcoded light colors so dark mode stays readable. Route: inline (1 file). No runnable test; structural check only. Visual check in browser pending.
- T2 done: character assets 21.4 MB PNG -> 370 KB WebP desktop / 116 KB mobile; <picture> + width/height wired in Character/Hero/Stack/Servicios/Contacto/Mermis; Mermis duplicate dir removed (mermis.json repointed). Route: delegated writer + parent finish. Checks: pnpm optimize:images ok, pnpm build ok, path existence ok (only pre-existing hidden 02-bifurcacion.png missing). No test runner -> structural exception. Also added Grafana/Zabbix to stack.json (user request).

## Next step
T2.
