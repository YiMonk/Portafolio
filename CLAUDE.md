# Portafolio Jesús Calles — Documento Maestro de Arquitectura

> Documento de referencia único para el desarrollo del portafolio personal de Jesús Calles (Frontend Developer + Diseñador UX/UI). Contiene la arquitectura de contenido completa, los sistemas transversales y la estructura técnica acordada. Pensado para usarse como contexto en Claude Code.

---

## 0. Resumen del proyecto

**Quién:** Jesús Calles — Frontend Developer + Diseñador UX/UI. Venezuela, trabajo remoto.

**Qué es el sitio:** No es un portafolio tradicional, sino un **hub con rutas**: una mini-tienda de servicios + productos digitales, con el trabajo como evidencia. Sirve a un visitante heterogéneo (reclutador, cliente freelance, comprador casual).

**Objetivo principal:** Que el visitante, sin importar por qué entró, descubra que hay múltiples caminos disponibles (contratar servicios, comprar/encargar recursos, ver trabajo) y no pierda el interés.

**Tagline:** *"Piensas el qué. Resuelvo el cómo."* — bajada: *"Frontend, UX/UI y diseño visual."*

**Tono visual de referencia:** estilo "Monolith" — sobrio, tipográfico, fondo crema, acentos en azul y negro. Inspiración: portafolios editoriales tipo Awwwards con fuerte jerarquía tipográfica.

---

## 1. Principios de arquitectura

El orden de secciones sigue la **curva de atención**: 100% ve el hero, ~70% baja una vez, ~40% al tercer scroll, <20% al final. Por eso:

- **Primeros segundos:** identidad + qué hace + si vale la pena seguir.
- **Primer scroll:** evidencia/promesa concreta (proyecto estrella).
- **Segundo scroll:** bifurcación — el visitante se autoclasifica y elige ruta.
- **Medio:** profundidad (sobre mí, proyectos, stack).
- **Comercial:** servicios y tienda.
- **Cierre:** educación, estado actual, contacto.

**Puntos de salida sembrados:** en cada sección hay un micro-CTA hacia las rutas comerciales, de modo que *donde sea que el visitante se canse, tenga una salida hacia conversión*, no hacia cerrar la pestaña.

---

## 2. Mapa de las 11 secciones

| # | Sección | Tipo | Función |
|---|---------|------|---------|
| §00 | Hero | Identidad | Plantar bandera: nombre + tagline |
| §01 | Mermis (teaser) | Bifurcación/Promesa | Teaser del proyecto estrella + lista de espera |
| §02 | Bifurcación | Bifurcación | 3 rutas: Servicios / Trabajo / Tienda |
| §03 | Sobre mí | Identidad | Bio filosófica + 3 columnas |
| §04 | Proyectos | Prueba | Masonry + filtros + casos de estudio |
| §05 | Stack | Prueba | Herramientas agrupadas por disciplina |
| §06 | Servicios | Monetización | 3 servicios con precios condicionales |
| §07 | Tienda | Monetización | Catálogo de productos digitales |
| §08 | Educación | Confianza | Lista de cursos con certificados |
| §09 | Ahora | Confianza | Estado actual (5 estados) |
| §10 | Contacto | Acción | Modal adaptativo por canal |

---

## 3. Sistemas transversales

### 3.1 Barra superior (nav)

- **Izquierda:** `JESÚS CALLES — FRONTEND` / `17:54 · GMT-4 · VENEZUELA`
- **Centro:** indicador de sección dinámico que cambia con el scroll → `§ 00 · INICIO`, `§ 01 · PRÓXIMAMENTE`, etc.
- **Derecha:** nav narrativo → `PROYECTOS · ACERCA` · `EDUCACIÓN · AHORA` · `CONTRATAR ↗`
- Se eliminó el indicador "SONIDO: OFF" del Monolith original.

> Nota: el nav quedó narrativo. Pendiente reevaluar si conviene un nav comercial (Trabajo · Servicios · Tienda · Sobre mí · Contacto) en fase de diseño.

### 3.2 Sistema de personaje 3D (Nivel 1)

Personaje 3D modelado por Jesús en Blender, que **acompaña el scroll** cambiando de pose/posición según la sección. Implementación Nivel 1: renders estáticos (PNG/WebP) con crossfade por scroll vía IntersectionObserver. **Visible también en mobile.**

**Tres modos de aparición:**
- `full` — personaje completo, protagonista (hero, contacto).
- `partial` — medio cuerpo, acompañante (sobre mí, servicios, etc.).
- `peek` — solo asoma la mitad superior de la cara por el borde inferior; se queda fijo asomado mientras se navega la sección y retoma el flujo al salir (secciones cargadas de imágenes).

**Mapa de poses:**

| Sección | Pose | Modo | Posición |
|---------|------|------|----------|
| §00 Hero | Saludo | `full` | Centro derecha, grande |
| §01 Mermis | Tipeando | `partial` | Inferior izquierda |
| §02 Bifurcación | — | oculto | (tarjetas ocupan todo) |
| §03 Sobre mí | Pensativo | `partial` | Derecha |
| §04 Proyectos | Asomado | `peek` | Borde inferior |
| §05 Stack | Rodeado de herramientas | `partial` | Centro |
| §06 Servicios | Handshake | `partial` | Izquierda |
| §07 Tienda | Asomado | `peek` | Borde inferior |
| §08 Educación | Leyendo | `partial` | Esquina |
| §09 Ahora | Pose actual | `partial` | Derecha |
| §10 Contacto | Despedida | `full` | Centro, grande |

**Total de renders únicos:** 9 (§02 sin personaje; §04 y §07 comparten la pose `peek`).

**Especificaciones de render:**
- PNG con transparencia + versión WebP (~30% más liviana).
- Resolución 2x el tamaño de display (retina).
- **Misma cámara, distancia focal e iluminación** en las 11 poses (si no, el crossfade salta).
- **Mismo punto de anclaje** (anclar por centro del torso).
- Peso objetivo: <150–200KB por PNG optimizado; ~80–120KB por WebP. Total ~2.2MB.
- Optimizar con TinyPNG/Squoosh.
- Considerar versión mobile más centrada (las poses muy horizontales se ven mal en vertical).

**Estrategia de carga:** lazy + prefetch. Cargar pose del hero de inmediato; precargar la siguiente mientras se lee la actual; poses lejanas solo al acercarse.

### 3.3 Sistema de CTAs prellenados

Los botones de §01 (lista de espera), §06 (cotizar servicio) y §07 (comprar/solicitar producto) **prellenan el asunto** del modal de contacto. Así el primer contacto ya indica qué necesita el visitante.

### 3.4 Plantilla de caso de estudio

Página individual reutilizable (ruta tipo `/proyectos/{slug}`) con estructura de **bloques modulares**: cada caso arma su contenido como un array de bloques (`section`, `image`, `gallery`) que se renderizan en orden. Permite que cada caso tenga la longitud/estructura que necesite sin tocar código.

---

## 4. Sistema de contenido (carpeta `/content`)

Todo el contenido vive en archivos JSON, separados por tipo. Esto permite agregar/quitar contenido sin tocar el código de los componentes. Preparado para migrar a un CMS headless (Decap/Sanity) en el futuro sin reestructurar.

```
/content
  /global
    site.json              # metadatos, navegación, footer, canales de contacto
    seo.json               # títulos meta, descripciones, OG images
    character.json         # sistema de personaje 3D (poses, modos, posiciones)
  /sections
    00-hero.json
    01-mermis.json
    02-bifurcacion.json
    03-sobre-mi.json
    04-proyectos.json      # config de la sección (filtros, layout)
    05-stack.json
    06-servicios.json      # config de la sección
    07-tienda.json         # config de la sección
    08-educacion.json      # config de la sección
    09-ahora.json
    10-contacto.json
  /collections
    proyectos.json         # array de proyectos (repetible)
    servicios.json         # array de servicios
    productos.json         # array de productos digitales
    stack.json             # array de herramientas agrupadas
    educacion.json         # array de cursos
  /case-studies
    mermis.json
    {slug}.json
  /assets
    /images
    /icons
    /character             # las 9 poses (PNG + WebP, desktop + mobile)
    /projects/{slug}/      # portadas y galerías de casos de estudio
    /products/{id}/        # previews y galerías de productos
```

**Convenciones clave en los JSON:**
- `order` → controla orden de aparición sin reordenar el array.
- `visible` → oculta sin borrar (útil para WIPs).
- `featured` → destaca (grid masonry: columna doble).
- `enabled` → activa/desactiva bloques completos (ej. lista de espera de Mermis).
- Campos `null` → el elemento condicional no se renderiza (ej. `links.live: null` oculta el botón).

---

## 5. Detalle por sección

### §00 · HERO

- Etiqueta: `§ 00 · INICIO`
- Tagline (centro):
  - **"Piensas el qué."**
  - **"Resuelvo el cómo."** *(en azul)*
- Bajada: `Frontend, UX/UI y diseño visual.`
- ID inferior izquierda: `¡HOLA! ME LLAMO JESÚS` / `DEVELOPER FRONTEND` / `VENEZUELA · TRABAJO REMOTO` / `DISPONIBLE PARA PROYECTOS · 2026`
- Indicador inferior derecha: `SIGUE BAJANDO ↓`
- Personaje: `full`, saludo, centro derecha.

### §01 · MERMIS (teaser)

- Etiqueta: `§ 01 · PRÓXIMAMENTE`
- Micro-label: `PROYECTO EN DESARROLLO · 2026`
- Título: **"Mermis."** / **"Llega este año."** *(en azul)*
- Pitch: *"Tu pasión por la cocina es grande. ¿Y las mermas? Ese enemigo silencioso que drena la rentabilidad de tu negocio."*
- Ficha técnica: TIPO (SaaS web para gastronomía) · ROL (Co-fundador · Frontend & UX/UI) · ESTADO (En desarrollo · Lanza 2026).
- Lista de espera: campo email + botón "AVÍSAME ↗" + microcopy "Sin spam. Solo el día del lanzamiento." (`waitlist.enabled` controla si aparece).
- Media: placeholder hasta tener mockups reales.
- Personaje: `partial`, tipeando, inferior izquierda.

```json
{
  "id": "mermis",
  "section_number": "01",
  "section_label": "PRÓXIMAMENTE",
  "status_label": "PROYECTO EN DESARROLLO · 2026",
  "title": { "line_1": "Mermis.", "line_2": "Llega este año.", "highlight": "line_2" },
  "pitch": "Tu pasión por la cocina es grande. ¿Y las mermas? Ese enemigo silencioso que drena la rentabilidad de tu negocio.",
  "spec_sheet": [
    { "label": "TIPO", "value": "SaaS web para gastronomía" },
    { "label": "ROL", "value": "Co-fundador · Frontend & UX/UI" },
    { "label": "ESTADO", "value": "En desarrollo · Lanza 2026" }
  ],
  "waitlist": {
    "enabled": true,
    "title": "Sé el primero en saber cuándo lanzamos.",
    "placeholder": "tu@email.com",
    "button": "AVÍSAME",
    "disclaimer": "Sin spam. Solo el día del lanzamiento."
  },
  "media": { "type": "placeholder", "src": null, "alt": "Mockup de Mermis (próximamente)" }
}
```

### §02 · BIFURCACIÓN

- **Sin encabezado.** Arranca directo con 3 tarjetas.
- Jerarquía (Escenario A — foco freelance/empleo): **Servicios grande** (~60% ancho), **Trabajo** y **Tienda** medianas apiladas (~40%).
- Cada tarjeta: carrusel de imágenes de fondo en crossfade (5s), overlay para legibilidad, texto fijo, pausa+zoom sutil en hover. En mobile: imagen estática única.
- Copy:
  - **Servicios:** "¿Tienes una idea? Hablemos." / "Frontend, UX/UI y diseño visual por encargo. Para equipos y founders." / `EXPLORAR SERVICIOS ↗`
  - **Trabajo:** "Mira lo que he hecho." / "Proyectos, casos de diseño e identidad visual." / `VER PROYECTOS ↗`
  - **Tienda:** "Recursos listos para usar." / "Iconos, logos y plantillas. Descarga o personaliza." / `VER RECURSOS ↗`
- Personaje: oculto.

### §03 · SOBRE MÍ

- Etiqueta: `§ 03 · BIO`
- Título: **"Construyo la capa visible"** / **"del software."** *("capa visible" en azul)*
- Tipo: filosófico. Tres columnas (mantener del Monolith):
  - **CÓDIGO:** "Limpio, legible, comentado cuando hace falta. Sin atajos que duelan después."
  - **DISEÑO:** "El front-end no es solo HTML — es la primera capa de UX. Diseño y código viven juntos."
  - **DETALLE:** "Micro-interacciones, spacing, contraste. Ahí vive la diferencia entre algo que funciona y algo bueno."
- Personaje: `partial`, pensativo, derecha.

### §04 · PROYECTOS

- **Sin título** (etiqueta discreta `§ 04`).
- Barra de filtros: `TODOS · DEV · UX/UI · BRANDING · ICONOS`. Filtrado en JS leyendo `categories`/`tags`; reorganización animada del masonry.
- **Grid masonry (Pinterest):** tarjetas de altura irregular según `aspect_ratio` de la portada; 3 col desktop / 2 tablet / 1 mobile; `featured` ocupa columna doble.
- Tarjeta: portada + overlay en hover (título, categoría, tags) + badge de estado (`EN DESARROLLO`). Click → caso de estudio.
- **Mermis:** tarjeta featured con badge "EN DESARROLLO"; caso de estudio con imágenes/avances; enlaza con teaser §01.
- Enlaces condicionales: `links.live` y `links.github` solo aparecen si no son `null`.
- Personaje: `peek`, asomado por borde inferior.

```json
// collections/proyectos.json — patrón de un item
{
  "id": "mermis",
  "order": 1,
  "title": "Mermis",
  "subtitle": "SaaS de gestión de mermas para gastronomía",
  "categories": ["DEV", "UX/UI"],
  "tags": ["React", "SaaS", "Diseño de producto"],
  "year": 2026,
  "status": "in_progress",
  "featured": true,
  "cover": { "image": "/assets/projects/mermis/cover.webp", "aspect_ratio": "4:5" },
  "case_study": { "enabled": true, "slug": "mermis" },
  "links": { "live": null, "github": null },
  "visible": true
}
```

**Caso de estudio** (`case-studies/{slug}.json`): bloques modulares.

```json
{
  "slug": "mermis",
  "title": "Mermis",
  "subtitle": "SaaS de gestión de mermas para negocios gastronómicos",
  "badges": ["DEV", "UX/UI", "En desarrollo"],
  "links": { "live": null, "github": null },
  "meta": {
    "rol": "Co-fundador · Frontend & UX/UI",
    "año": "2026",
    "stack": "React, ...",
    "estado": "En desarrollo",
    "cliente": "Proyecto propio"
  },
  "hero_image": "/assets/projects/mermis/hero.webp",
  "blocks": [
    { "type": "section", "heading": "El reto", "text": "..." },
    { "type": "gallery", "images": ["/assets/projects/mermis/01.webp", "/assets/projects/mermis/02.webp"] },
    { "type": "section", "heading": "El proceso", "text": "..." },
    { "type": "image", "src": "/assets/projects/mermis/dashboard.webp", "caption": "Dashboard principal" },
    { "type": "section", "heading": "El resultado", "text": "..." }
  ],
  "next_project": "proyecto-dev-2"
}
```

### §05 · STACK

- Etiqueta: `§ 05 · STACK`
- Título: **"Las herramientas"** / **"que uso."** *("que uso" en azul)*
- **Agrupado por disciplina, sin niveles de dominio.**
  - DESARROLLO: HTML · CSS · JavaScript · React
  - DISEÑO: Figma · Photoshop · Illustrator
  - HERRAMIENTAS: Bacula
- Cada herramienta mantiene tarjeta con ícono. Escalable: agregar = añadir objeto al grupo. Posible grupo futuro "APRENDIENDO".
- Personaje: `partial`, rodeado de herramientas, centro.

```json
// collections/stack.json
{
  "groups": [
    { "id": "desarrollo", "label": "DESARROLLO", "order": 1, "tools": [
      { "name": "HTML", "icon": "/assets/icons/html.svg", "order": 1 },
      { "name": "CSS", "icon": "/assets/icons/css.svg", "order": 2 },
      { "name": "JavaScript", "icon": "/assets/icons/js.svg", "order": 3 },
      { "name": "React", "icon": "/assets/icons/react.svg", "order": 4 }
    ]},
    { "id": "diseno", "label": "DISEÑO", "order": 2, "tools": [
      { "name": "Figma", "icon": "/assets/icons/figma.svg", "order": 1 },
      { "name": "Photoshop", "icon": "/assets/icons/photoshop.svg", "order": 2 },
      { "name": "Illustrator", "icon": "/assets/icons/illustrator.svg", "order": 3 }
    ]},
    { "id": "herramientas", "label": "HERRAMIENTAS", "order": 3, "tools": [
      { "name": "Bacula", "icon": "/assets/icons/bacula.svg", "order": 1 }
    ]}
  ]
}
```

### §06 · SERVICIOS

- Etiqueta: `§ 06 · SERVICIOS`
- Título: **"¿Tienes una idea?"** / **"Hablemos."**
- **3 servicios** (nombre · para quién · qué incluye · entregables · CTA propio · precio condicional).
- CTA por servicio, prellena el asunto del modal.
- Precios condicionales: `from` ("Desde $X"), `consult` ("A consultar"), `fixed` ("$X").
  - Desarrollo Frontend → Desde $X (incluye bullet "Productos con modelo de suscripción (SaaS)").
  - Diseño UX/UI → Desde $X.
  - Identidad Visual (branding + iconos) → A consultar.
- Personaje: `partial`, handshake, izquierda.

```json
// collections/servicios.json — patrón de un item
{
  "id": "desarrollo-frontend",
  "order": 1,
  "name": "Desarrollo Frontend",
  "for_whom": "Para founders y equipos que necesitan llevar su producto al navegador.",
  "includes": [
    "Maquetación responsive y accesible",
    "Interfaces con React",
    "Integración con APIs y datos",
    "Productos con modelo de suscripción (SaaS)",
    "Optimización de performance"
  ],
  "deliverables": "Código limpio, documentado y desplegado.",
  "pricing": { "type": "from", "amount": null, "currency": "USD", "label": "Desde" },
  "cta": { "text": "Cotizar desarrollo", "prefill_subject": "Cotización · Desarrollo Frontend" },
  "visible": true
}
```

> Sobre suscripciones: Jesús construye productos *que tienen* modelo de suscripción (como Mermis), no vende suscripciones propias. Es una capacidad dentro de Desarrollo Frontend, no un servicio aparte.

### §07 · TIENDA / RECURSOS

- Etiqueta: `§ 07 · TIENDA`
- Título: **"Recursos listos"** / **"para usar."**
- **Catálogo unificado con filtros:** `TODOS · DISEÑO · DEV · DISPONIBLE AHORA · POR ENCARGO`. Un producto puede estar en varios filtros.
- Tarjeta: preview · nombre · tipo · qué incluye · precio · badge de estado (`DISPONIBLE` / `POR ENCARGO`) · botón.
- **Flujo de compra (catálogo + contacto):** "Comprar" / "Solicitar" → abre modal de contacto prellenado. Sin pasarela de pago por ahora. Preparado para migrar a Gumroad/Lemon Squeezy cambiando `cta.action` a `"external"`.
- Productos iniciales: plantillas de Figma, iconografía (cargables después).
- Personaje: `peek`, asomado por borde inferior (misma pose que §04).

```json
// collections/productos.json — patrón de items
{
  "filters": ["TODOS", "DISEÑO", "DEV", "DISPONIBLE AHORA", "POR ENCARGO"],
  "items": [
    {
      "id": "pack-iconos-linea",
      "order": 1,
      "name": "Pack de Iconos Línea",
      "type": "Iconografía",
      "categories": ["DISEÑO"],
      "status": "available",
      "includes": "120 iconos · SVG + PNG",
      "preview": { "image": "/assets/products/pack-iconos-linea/preview.webp", "aspect_ratio": "1:1" },
      "gallery": [],
      "pricing": { "type": "fixed", "amount": null, "currency": "USD" },
      "cta": { "text": "Comprar", "action": "contact", "prefill_subject": "Compra · Pack de Iconos Línea" },
      "badge": "DISPONIBLE",
      "visible": true
    },
    {
      "id": "plantilla-figma-dashboard",
      "order": 2,
      "name": "Plantilla Dashboard (Figma)",
      "type": "Plantilla Figma",
      "categories": ["DISEÑO", "DEV"],
      "status": "on_request",
      "includes": "Sistema de dashboard personalizable",
      "preview": { "image": "/assets/products/plantilla-dashboard/preview.webp", "aspect_ratio": "4:3" },
      "gallery": [],
      "pricing": { "type": "consult", "amount": null, "currency": null },
      "cta": { "text": "Solicitar", "action": "contact", "prefill_subject": "Encargo · Plantilla Dashboard personalizada" },
      "badge": "POR ENCARGO",
      "visible": true
    }
  ]
}
```

### §08 · EDUCACIÓN

- Etiqueta: `§ 08 · EDUCACIÓN`
- Título: **"Aprendiendo,"** / **"en continuo."** *("en continuo" en azul)*
- Lista vertical de filas (Monolith), orden cronológico inverso.
- Cada tarjeta: año · curso · plataforma · descripción · botón "VER CERTIFICADO ↗" (condicional: solo si `link.url` existe).
- Personaje: `partial`, leyendo, esquina.

```json
// collections/educacion.json — patrón de un item
{
  "id": "react-cero-experto",
  "order": 1,
  "year": 2025,
  "title": "React: De cero a experto",
  "platform": "Udemy",
  "description": "Hooks, context, performance, patrones avanzados, testing con React Testing Library.",
  "link": { "url": null, "label": "Ver certificado" },
  "visible": true
}
```

Cursos cargados: React (2025), Bacula (2025), JavaScript Moderno ES6+ (2024), Diseño UX/UI con Figma (2024).

### §09 · AHORA

- Etiqueta: `§ 09 · AHORA`
- Título: **"En qué estoy"** / **"este mes."** *("este mes" en azul)*
- Intro izquierda: *"Una página corta sobre lo que realmente estoy haciendo ahora mismo."* + `ACTUALIZADO 2026` + `VENEZUELA — DISPONIBLE REMOTAMENTE`.
- 5 estados (sin mencionar Mermis): CONSTRUYENDO · APRENDIENDO · TRABAJANDO · DISPONIBLE · LEYENDO.
- Personaje: `partial`, pose actual, derecha.

```json
{
  "id": "ahora",
  "section_number": "09",
  "section_label": "AHORA",
  "title": { "line_1": "En qué estoy", "line_2": "este mes.", "highlight": "este mes" },
  "intro": { "text": "Una página corta sobre lo que realmente estoy haciendo ahora mismo.", "highlight": "realmente" },
  "updated": "2026",
  "location": "Venezuela — Disponible remotamente",
  "states": [
    { "label": "CONSTRUYENDO", "text": "Mi portfolio v2 y mejoras incrementales en mis proyectos públicos en GitHub." },
    { "label": "APRENDIENDO", "text": "Next.js, TypeScript y patrones de arquitectura frontend para apps medianas." },
    { "label": "TRABAJANDO", "text": "Freelance ligero — diseño UI e ilustración para clientes independientes." },
    { "label": "DISPONIBLE", "text": "Abierto a roles frontend junior/mid-junior remotos, y a proyectos freelance pequeños." },
    { "label": "LEYENDO", "text": "Refactoring UI · Designing Data-Intensive Applications · documentación de Next.js." }
  ]
}
```

### §10 · CONTACTO

- Etiqueta: `§ 10 · CONTACTO`
- **Tratamiento visual estilo Acid con paleta Monolith** (ver sección 8.3): fondo crema, palabras gigantes en outline negro girando en carrusel horizontal (marquee), palabra central rellena en azul royal. Marquee: `CONSTRUYAMOS · TU IDEA · TU PRODUCTO · TU MARCA · TRABAJEMOS · JUNTOS`.
- **Botón pill flotante azul royal con texto crema** (centro) → abre el modal de canales.
- Email grande clickeable en negro → abre modal (no mailto directo).
- **Modal adaptativo (Interpretación B):** el usuario llena un solo formulario (asunto prellenado según origen + nombre + mensaje) y elige el canal de envío. El mensaje se arma y **abre la app correspondiente con el texto precargado**. Sin backend.
  - **Correo** → `mailto:` con asunto + cuerpo.
  - **WhatsApp** → `wa.me/<número>?text=<mensaje codificado>`.
  - **Telegram** → enlace a usuario; el texto precargado no es 100% confiable vía `t.me` → resolver con copiar-al-portapapeles + aviso, o enlace directo. Decidir en fase de código.
  - **GitHub** → enlace directo al perfil (no recibe mensaje, es `type: link`).
- Personaje: `full`, despedida, centro, grande.

```json
// global/site.json — canales de contacto
{
  "contact_channels": [
    { "id": "email", "label": "Correo", "icon": "mail", "value": "jactcalles@gmail.com", "type": "prefill", "method": "mailto" },
    { "id": "whatsapp", "label": "WhatsApp", "icon": "whatsapp", "value": "", "type": "prefill", "method": "wa.me" },
    { "id": "telegram", "label": "Telegram", "icon": "telegram", "value": "", "type": "prefill", "method": "t.me" },
    { "id": "github", "label": "GitHub", "icon": "github", "value": "github.com/YiMonk", "type": "link", "method": "direct" }
  ]
}
```

---

## 6. Datos de contacto y enlaces conocidos

- Email: jactcalles@gmail.com
- GitHub: github.com/YiMonk
- WhatsApp: *(pendiente)*
- Telegram: *(pendiente)*
- LinkedIn / Behance / Dribbble: *(no definidos aún)*

---

## 7. Decisiones técnicas tomadas

- **Sin panel admin** por ahora. Gestión de contenido vía archivos JSON. Migración futura a Decap CMS o Sanity sin reestructurar.
- **Sin backend.** Formularios y contacto resueltos con enlaces precargados (mailto, wa.me, t.me) en JS puro.
- **Stack: Astro** (ver sección 9 para el detalle completo).
- **Personaje 3D Nivel 1** (renders estáticos + crossfade por scroll). Upgrade futuro a Three.js (Nivel 2) podría ser un caso de estudio en sí mismo.
- **Lista de espera de Mermis:** capturar emails desde el día uno (servicio gratuito tipo Formspree/Buttondown/hoja de cálculo; definir en implementación).

---

## 8. Dirección de arte (CERRADA)

### 8.1 Paleta — Monolith (única para todo el sitio)

Una sola paleta en todo el sitio. **No se usa lima ni azul oscuro del tema Acid** — del Acid solo se toman tratamientos visuales (ver §10), nunca sus colores.

| Token | Hex | Uso |
|-------|-----|-----|
| Crema / fondo | `#EDEAE3` | Fondo principal de todas las secciones |
| Negro / texto | `#0A0A0A` | Texto principal, titulares |
| Azul royal / acento | `#2C5FF6` | Palabras destacadas en titulares, CTAs, enlaces |
| Grises de apoyo | derivados | Texto secundario, bordes, metadatos |

> Los hex son aproximaciones tomadas de las capturas del Monolith. Afinar contra el original si hay valores exactos.

### 8.2 Tipografía — 2 fuentes (Google Fonts)

- **Orbitron** → display / titulares (los textos gigantes de cada sección). Geométrica, tecnológica.
- **Space Mono** → todo lo demás: etiquetas, metadatos, números, CTAs y párrafos. Es el punto medio entre máquina de escribir y consola.

> Nota: ambas fuentes tienen carácter fuerte; Space Mono se usa también en párrafos. Mantener los párrafos **cortos** (ya aplicado en todos los copys) para preservar legibilidad.

Acentos: palabras clave de los titulares van en azul royal (como "en continuo", "capa visible" del Monolith original).

### 8.3 Tratamiento especial §10 Contacto (estilo Acid, paleta Monolith)

Se toma el *estilo* del tema Acid pero con colores Monolith:
- Fondo crema (igual que el resto del sitio, no azul oscuro).
- Palabras gigantes en **outline negro** desplazándose en carrusel horizontal (marquee, loop infinito), con una palabra central **rellena en azul royal**.
- Botón **pill flotante azul royal con texto crema** (máximo contraste contra el fondo crema y las palabras outline negras) → abre el modal de canales.
- Email clickeable en negro debajo.
- Palabras del marquee: `CONSTRUYAMOS · TU IDEA · TU PRODUCTO · TU MARCA · TRABAJEMOS · JUNTOS`.

---

## 9. Stack técnico (CERRADO)

- **Framework: Astro.** Contenido estático desde JSON, islas interactivas solo donde hacen falta (carrusel de bifurcación, filtros de proyectos/tienda, modal de contacto, scroll del personaje). Excelente performance para mobile.
- **Routing:** páginas estáticas + rutas dinámicas para casos de estudio (`/proyectos/[slug]`).
- **Contenido:** carpeta `/content` con JSON (ver sección 4). Astro los importa en build.
- **Imágenes:** optimización con el componente de imagen de Astro; WebP + fallback; lazy loading (clave para el personaje y los grids).
- **Sin backend:** formularios/contacto resueltos con enlaces precargados (mailto, wa.me, t.me) en JS de cliente.
- **Hosting sugerido:** Vercel o Netlify (deploy directo desde GitHub).
- **Fuentes:** Orbitron + Space Mono vía Google Fonts (o self-hosted con fontsource para mejor performance).

---

## 10. Pendientes para fase de implementación

1. **Comportamiento fino de animaciones:** transiciones entre secciones, scroll del personaje, hover de tarjetas, reorganización de filtros, velocidad del marquee.
2. **Responsive:** breakpoints, comportamiento del personaje en mobile, masonry en pantallas chicas.
3. **Reevaluar nav** (narrativo vs comercial) una vez montado.
4. **Decisión Telegram** (texto precargado vs enlace directo).
5. **Captura de emails de la lista de espera de Mermis** (servicio gratuito a definir).
6. **Hex exactos** del Monolith si se quieren afinar contra el original.

---

*Fin del documento maestro. Versión correspondiente a la fase de arquitectura de contenido cerrada.*
