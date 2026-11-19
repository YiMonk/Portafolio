# Portafolio Jesús Calles — Estado del Proyecto

> Documento de seguimiento para Obsidian. Se actualiza al completar cada fase.
> Última actualización: 2026-05-23

---

## Metadatos

| Campo | Valor |
|-------|-------|
| Proyecto | Portafolio personal + hub comercial |
| Stack | Astro · JSON · CSS custom properties · Vanilla JS |
| Hosting objetivo | Vercel / Netlify |
| Documento maestro | `CLAUDE.md` en la raíz del repo |
| Flujo de trabajo | planner → aprobación → executor → qa → aprobación final |

---

## Estado general

```
Fase 0 · Arranque        ✅ Completa
Fase 1 · Estructura Base ⏳ Pendiente aprobación del plan
Fase 2 · Sistemas transversales (nav + personaje)
Fase 3 · §00 Hero
Fase 4 · §01 Mermis
Fase 5 · §02 Bifurcación
Fase 6 · §03 Sobre mí
Fase 7 · §04 Proyectos
Fase 8 · §05 Stack
Fase 9 · §06 Servicios
Fase 10 · §07 Tienda
Fase 11 · §08 Educación
Fase 12 · §09 Ahora
Fase 13 · §10 Contacto
Fase 14 · Pulido final + deploy
```

---

## Fase 0 — Arranque ✅

**Estado:** Completa  
**Fecha:** 2026-05-23

### Qué se hizo
- Documento maestro `CLAUDE.md` finalizado con arquitectura completa de las 11 secciones.
- Skill de diseño UX/UI configurado en `.claude/skills/SKILL.md`.
- Agentes configurados en `.claude/agents/`: `planner.md`, `executor.md`, `qa.md`.
- Referencias visuales recopiladas en `/referencias/` (capturas del tema Monolith y Acid).
- Flujo de trabajo definido: planner → aprobación → executor → qa → aprobación final.

### Artefactos
- `/CLAUDE.md` — documento maestro
- `/PROMPT-INICIAL.md` — contexto inicial del proyecto
- `/.claude/agents/planner.md`
- `/.claude/agents/executor.md`
- `/.claude/agents/qa.md`
- `/.claude/skills/SKILL.md`
- `/referencias/` — capturas visuales de referencia (16 imágenes)

---

## Fase 1 — Estructura Base ⏳

**Estado:** Plan propuesto — pendiente aprobación  
**Fecha objetivo:** 2026-05-23

### Plan propuesto por planner

**Objetivo:** Establecer la base completa del proyecto: Astro inicializado, carpeta `/content` con todos los JSON reales, sistema de tokens de diseño, `BaseLayout.astro` con fuentes y tokens, y `index.astro` de scaffold.

#### Bloque A — Inicialización Astro
- [ ] Crear proyecto Astro en `site/` (plantilla minimal, TypeScript strict)
- [ ] Verificar `astro.config.mjs` con `output: "static"` + config de imagen

#### Bloque B — Estructura de carpetas
- [ ] Crear `src/layouts/`, `src/components/`, `src/styles/`, `src/lib/`
- [ ] Crear `public/assets/` con jerarquía completa + `.gitkeep` en carpetas vacías

#### Bloque C — Carpeta `/content` con JSON
- [ ] `content/global/site.json` — metadatos, nav, canales de contacto
- [ ] `content/global/seo.json` — título, descripción, og_image
- [ ] `content/global/character.json` — mapa de 11 poses (assets en null)
- [ ] `content/sections/00-hero.json`
- [ ] `content/sections/01-mermis.json`
- [ ] `content/sections/02-bifurcacion.json`
- [ ] `content/sections/03-sobre-mi.json`
- [ ] `content/sections/04-proyectos.json`
- [ ] `content/sections/05-stack.json`
- [ ] `content/sections/06-servicios.json`
- [ ] `content/sections/07-tienda.json`
- [ ] `content/sections/08-educacion.json`
- [ ] `content/sections/09-ahora.json`
- [ ] `content/sections/10-contacto.json`
- [ ] `content/collections/proyectos.json`
- [ ] `content/collections/servicios.json`
- [ ] `content/collections/productos.json`
- [ ] `content/collections/stack.json`
- [ ] `content/collections/educacion.json`
- [ ] `content/case-studies/mermis.json`

#### Bloque D — Tokens CSS
- [ ] `src/styles/tokens.css` — paleta, tipografía, espaciado, transiciones, breakpoints
- [ ] `src/styles/reset.css` — reset mínimo moderno
- [ ] `src/styles/global.css` — imports + estilos base del body

#### Bloque E — Layouts y páginas
- [ ] `src/layouts/BaseLayout.astro` — head, fuentes Google Fonts, slot
- [ ] `src/pages/index.astro` — scaffold con comentarios por sección
- [ ] `src/pages/proyectos/[slug].astro` — stub para la ruta dinámica

#### Bloque F — Verificación
- [ ] `astro dev` sin errores en localhost:4321
- [ ] `astro build` limpio, genera `dist/index.html`
- [ ] JSON válidos parseables
- [ ] Fuente Space Mono visible sobre fondo crema

### Decisiones pendientes (antes de ejecutar)
1. **Plataformas de cursos en educacion.json** — Bacula, JS Moderno ES6+, Diseño UX/UI con Figma: ¿poner null o el nombre de plataforma real?
2. **Precios de servicios** — `amount` en null para Desarrollo Frontend y Diseño UX/UI (confirmado: quedan en null hasta decidir).
3. **Ubicación de `/content`** — Plan recomienda `site/content/` (fuera de `src/`) para separar datos de código y facilitar futura migración a Decap CMS. ¿Confirmado?

### Criterio de hecho
- `astro dev` levanta sin errores
- Página de índice muestra texto con Space Mono sobre fondo crema (#EDEAE3)
- `astro build` sin errores, genera `dist/index.html`
- Todos los JSON son válidos
- Tokens CSS definidos y consumibles
- Jerarquía de assets creada

---

## Fases futuras (pendientes de planificar)

### Fase 2 — Sistemas transversales
- Barra de navegación (izquierda: nombre/hora · centro: indicador dinámico · derecha: nav narrativo)
- Sistema del personaje 3D Nivel 1 (renders estáticos + crossfade por scroll vía IntersectionObserver)
- Estrategia de carga: lazy + prefetch del personaje

### Fases 3–13 — Secciones (una por fase)
Cada fase cubre una sección completa: componente Astro + isla interactiva si aplica + integración con su JSON + personaje + QA.

| Fase | Sección | Interactividad |
|------|---------|----------------|
| 3 | §00 Hero | Ninguna |
| 4 | §01 Mermis | Formulario lista de espera |
| 5 | §02 Bifurcación | Carrusel crossfade (isla JS) |
| 6 | §03 Sobre mí | Ninguna |
| 7 | §04 Proyectos | Filtros + masonry (isla JS) |
| 8 | §05 Stack | Ninguna |
| 9 | §06 Servicios | CTAs prellenados → modal |
| 10 | §07 Tienda | Filtros + CTAs prellenados → modal |
| 11 | §08 Educación | Ninguna |
| 12 | §09 Ahora | Ninguna |
| 13 | §10 Contacto | Modal adaptativo + marquee |

### Fase 14 — Pulido y deploy
- Auditoría de performance (Lighthouse)
- Responsive final en todos los breakpoints
- Accesibilidad (contraste, teclado, foco)
- `prefers-reduced-motion` verificado
- Deploy en Vercel/Netlify

---

## Arquitectura de referencia rápida

### Paleta Monolith
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-cream` | `#EDEAE3` | Fondo principal |
| `--color-black` | `#0A0A0A` | Texto principal |
| `--color-blue` | `#2C5FF6` | Acentos, CTAs |

### Tipografía
- **Orbitron** → titulares / display
- **Space Mono** → todo lo demás (etiquetas, párrafos, CTAs)

### Personaje 3D (9 renders únicos)
| Sección | Pose | Modo |
|---------|------|------|
| §00 Hero | Saludo | `full` |
| §01 Mermis | Tipeando | `partial` |
| §02 Bifurcación | — | `hidden` |
| §03 Sobre mí | Pensativo | `partial` |
| §04 Proyectos | Asomado | `peek` |
| §05 Stack | Rodeado de herramientas | `partial` |
| §06 Servicios | Handshake | `partial` |
| §07 Tienda | Asomado | `peek` |
| §08 Educación | Leyendo | `partial` |
| §09 Ahora | Pose actual | `partial` |
| §10 Contacto | Despedida | `full` |

---

## Decisiones abiertas (tracking)

| # | Decisión | Estado |
|---|----------|--------|
| 1 | Plataformas de cursos (Bacula, JS ES6+, Figma UX/UI) | ⏳ Pendiente |
| 2 | Precios de Desarrollo Frontend y Diseño UX/UI | ⏳ Pendiente (null por ahora) |
| 3 | Número de WhatsApp y usuario de Telegram | ⏳ Pendiente |
| 4 | Nav narrativo vs comercial | ⏳ Reevaluar tras montar |
| 5 | Servicio de captura de emails (Mermis waitlist) | ⏳ Pendiente |
| 6 | Telegram: texto precargado vs enlace directo + clipboard | ⏳ Pendiente (resolver en Fase 13) |
| 7 | Dominio / URL final | ⏳ Pendiente |
| 8 | Hex exactos del Monolith (afinar contra original si es necesario) | ⏳ Pendiente |

---

## Datos de contacto conocidos

| Canal | Valor |
|-------|-------|
| Email | jactcalles@gmail.com |
| GitHub | github.com/YiMonk |
| WhatsApp | *(pendiente)* |
| Telegram | *(pendiente)* |
