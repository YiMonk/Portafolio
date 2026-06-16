---
name: ux-ui-design
description: Reglas de diseño UX/UI para el portafolio de Jesús Calles. Úsala SIEMPRE que se cree o modifique cualquier interfaz, componente, sección, layout, estilo o interacción del sitio — aunque no se mencione "diseño" explícitamente. Define la paleta, tipografía, espaciado, jerarquía, accesibilidad, comportamiento responsive y los patrones de interacción (carrusel, masonry, filtros, modal de contacto, personaje 3D) que deben respetarse en todo el proyecto.
---

# Skill de diseño UX/UI — Portafolio Jesús Calles

Esta skill encapsula las reglas de diseño del proyecto. Aplícala en toda creación o modificación de UI. La fuente de verdad sobre arquitectura y contenido es el `CLAUDE.md`; esta skill se enfoca en el **cómo se ve y se siente**.

## 1. Identidad visual

Una sola identidad: **Monolith**. Sobrio, editorial, tipográfico, con fuerte jerarquía. Fondo claro, mucho aire, acentos puntuales en azul.

**Del tema "Acid" solo se toma el TRATAMIENTO visual del contacto (§10) — palabras gigantes en outline girando + botón pill flotante — pero ejecutado con la paleta Monolith. Nunca sus colores (lima, azul oscuro).**

## 2. Paleta (tokens — única para todo el sitio)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-cream` | `#EDEAE3` | Fondo principal de todas las secciones |
| `--color-black` | `#0A0A0A` | Texto principal, titulares, outlines |
| `--color-blue` | `#2C5FF6` | Palabras destacadas en titulares, CTAs, enlaces, acentos |
| grises de apoyo | derivados de `#0A0A0A` con opacidad | Texto secundario, bordes, metadatos |

Reglas:
- Nunca introducir colores fuera de esta paleta sin aprobación.
- El azul se usa con moderación: para destacar palabras clave de titulares (como "en continuo", "capa visible") y para CTAs/enlaces. No saturar.
- Definir los tokens como CSS custom properties en un único archivo global y consumirlos desde todos lados. Nunca hardcodear hex en componentes.

## 3. Tipografía (2 fuentes, Google Fonts)

- **Orbitron** → display/titulares. Geométrica, tecnológica. Solo para los textos grandes de cada sección y números destacados. Nunca para párrafos largos.
- **Space Mono** → todo lo demás: etiquetas (`§ 04 · EDUCACIÓN`), metadatos, números, CTAs, descripciones y párrafos. Es el punto medio máquina de escribir / consola.

Reglas:
- Mantener los párrafos **cortos** (Space Mono cansa en bloques largos).
- Jerarquía por tamaño y peso, no por introducir más fuentes.
- Etiquetas de sección y metadatos: Space Mono, tamaño pequeño, con tracking (letter-spacing) amplio y en mayúsculas, al estilo de las capturas Monolith.

## 4. Espaciado y layout

- **Mucho aire.** El espacio en blanco es parte de la estética; no llenar.
- Sistema de espaciado consistente (escala basada en rem: 0.5, 1, 1.5, 2, 3, 4...).
- Titulares grandes con buen interlineado; las secciones respiran entre sí con padding vertical generoso.
- Anchos de lectura controlados: los párrafos no deben cruzar todo el ancho de pantalla en desktop.
- Grid base coherente; alinear elementos a una rejilla común.

## 5. Jerarquía y escaneabilidad

El sitio sirve a un visitante que escanea (reclutador/cliente apurado). Por eso:
- Cada sección comunica su idea principal en los primeros 5 segundos.
- Titular grande → subtítulo/contexto → detalle. En ese orden de peso visual.
- Un CTA primario claro por sección como máximo; los secundarios, más discretos.
- Las etiquetas `§ NN · NOMBRE` orientan al visitante sobre dónde está.

## 6. Patrones de interacción del proyecto

Respeta estos comportamientos definidos en el `CLAUDE.md`:

- **§02 Bifurcación:** 3 tarjetas (Servicios grande, Trabajo/Tienda medianas). Carrusel de imágenes de fondo en crossfade (~5s), overlay para legibilidad, texto fijo. Hover: pausa + zoom sutil. Mobile: imagen estática.
- **§04 Proyectos / §07 Tienda:** grid masonry (Pinterest), tarjetas de altura irregular, `featured` a doble columna. Barra de filtros con reorganización animada (fade + recomposición). Hover con overlay de info.
- **Modal de contacto (§10):** un solo formulario, el usuario elige canal (Correo/WhatsApp/Telegram) y se abre la app con el mensaje precargado. GitHub es enlace directo. Sin backend.
- **§10 Contacto:** palabras gigantes en outline negro en marquee horizontal (loop), palabra central rellena en azul royal, botón pill flotante azul royal con texto crema.
- **Personaje 3D:** acompaña el scroll con 3 modos (`full`, `partial`, `peek`). Crossfade entre poses. Visible en mobile (versión adaptada). Carga lazy + prefetch.

## 7. Microinteracciones

- Transiciones suaves y discretas (no rebotes exagerados). Duraciones cortas (150–400ms) para hover/estado; más largas y suaves para scroll-driven.
- Estados claros para todo elemento interactivo: hover, focus, active, disabled.
- Feedback inmediato en clics de CTA (cambio visual al instante).
- Respetar `prefers-reduced-motion`: desactivar/atenuar animaciones (carrusel, marquee, personaje) para quien lo pida.

## 8. Accesibilidad (no negociable)

- Contraste suficiente: texto sobre crema debe ser legible (negro sí; azul sobre crema verificar AA para texto pequeño).
- Navegación por teclado completa: foco visible, orden lógico, modal atrapando y devolviendo el foco (focus trap + retorno).
- `alt` descriptivo en imágenes; el personaje decorativo va con `alt=""` o `aria-hidden`.
- Jerarquía semántica de headings correcta (un h1 por página, luego h2/h3).
- Targets táctiles de al menos 44×44px en mobile.
- Texto en marquee/outline debe tener alternativa accesible (el botón y el email son los elementos funcionales, no el texto decorativo).

## 9. Responsive

- Mobile-first en la lógica; verificar siempre en pantallas chicas.
- Masonry: 3 col desktop → 2 tablet → 1 mobile.
- Personaje: versión más centrada/pequeña en mobile; no debe tapar contenido.
- Titulares gigantes: escalar con `clamp()` para que no rompan en mobile.
- Carrusel de bifurcación: estático en mobile (rendimiento y batería).

## 10. Rendimiento como parte de la UX

- Imágenes en WebP con fallback, dimensionadas y lazy-loaded (crítico por el personaje y los grids).
- No bloquear el render con assets pesados; el hero debe pintar rápido.
- El sitio debe sentirse ligero y fluido también en 4G y equipos modestos (parte del público de Mermis son dueños de restaurantes en móvil).

## Checklist antes de dar por terminada una UI

- [ ] Usa solo tokens de la paleta Monolith.
- [ ] Orbitron solo en titulares; Space Mono en el resto; párrafos cortos.
- [ ] Espaciado consistente y con aire.
- [ ] Jerarquía clara; un CTA primario por sección.
- [ ] Estados hover/focus/active definidos.
- [ ] Accesible: contraste, teclado, foco, alt, headings.
- [ ] Responsive verificado (desktop/tablet/mobile).
- [ ] `prefers-reduced-motion` respetado.
- [ ] Imágenes optimizadas y lazy.
- [ ] Contenido viene de JSON, no hardcodeado.
