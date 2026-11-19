---
description: Decisiones de diseño UI/UX aprendidas en el portafolio de Jesús Calles. Consultar antes de implementar componentes, animaciones, capas fijas o sistemas de scroll.
---

# Skill: Diseño UI — Portafolio Jesús Calles

Documento acumulativo de patrones, decisiones y lecciones de este proyecto. Actualizarlo cuando se descubra algo nuevo.

---

## 1. Jerarquía de z-index

| Capa | z-index | Notas |
|------|---------|-------|
| Nav (fixed) | 100 | Siempre encima de todo |
| Personaje (fixed) | 3 | Encima de secciones, debajo del nav |
| Secciones (`section`) | 2 | `position: relative; z-index: 2` (global.css) |
| Fondos / overlays de sección | 1 | Dentro de la sección |

**Regla clave:** el personaje debe estar en z-index ≥ 3 para ser visible. El error original fue z-index: 1 (enterrado detrás de las secciones con fondo sólido crema).

---

## 2. Animaciones de personaje (Character.astro)

### Separación de responsabilidades: outer vs inner

El personaje usa dos capas de divs:
- **Outer `.character`**: solo posicionamiento (`position: absolute`, `top/left/right/bottom`, `transform` de centrado como `translateY(-50%)`).
- **Inner `.character__anim`**: solo animación (keyframes de entrada/salida con `--dash-tx`/`--dash-ty`).

**Por qué separar:** si la animación usa `transform`, sobreescribe el transform de posicionamiento del outer y el personaje salta o desaparece. Mezclarlos en un solo elemento no funciona. Siempre separar.

### Animación direccional (dash)

El personaje saliente se lanza hacia la posición del entrante, y el entrante llega desde la posición del saliente. Esto crea un "dash" físico entre poses.

**Cálculo del vector en JS:**
```js
const pC = charCenter(prev); // getBoundingClientRect() del outer (invisible pero en layout)
const nC = charCenter(next);
const tx = (nC.x - pC.x) * 0.30; // 30% del desplazamiento real
const ty = (nC.y - pC.y) * 0.30;
```
- `--dash-tx` / `--dash-ty` en el inner del **saliente**: se mueve hacia el entrante.
- `--dash-tx * -1` / `--dash-ty * -1` en el inner del **entrante**: llega desde el saliente.

**Keyframes:**
```css
@keyframes char-dash-out {
  0%   { opacity: 0.92; transform: translate(0,0) scale(1); }
  18%  { transform: translate(calc(var(--dash-tx)*-0.04), calc(var(--dash-ty)*-0.04)) scale(1.03); }
  100% { opacity: 0;    transform: translate(var(--dash-tx), var(--dash-ty)) scale(0.82); }
}
@keyframes char-dash-in {
  0%   { opacity: 0;    transform: translate(calc(var(--dash-tx)*-1), calc(var(--dash-ty)*-1)) scale(0.82); }
  65%  { opacity: 1;    transform: translate(calc(var(--dash-tx)*0.04), calc(var(--dash-ty)*0.04)) scale(1.04); }
  100% { opacity: 0.92; transform: translate(0,0) scale(1); }
}
```
- Salida: 210ms `ease-in` (acelera al salir).
- Entrada: 360ms `cubic-bezier(0.22, 1, 0.36, 1)` (settle con spring).
- El 18% inicial del dash-out simula un "impulso" antes de lanzarse.
- El 65% del dash-in simula un ligero overshoot antes de asentarse.

### Gestión de clases

`.is-active` = pose visible y estable.
`.is-entering` = animación de entrada en curso (sobreescribe la opacidad del `.is-active`).
`.is-exiting` = animación de salida en curso (remove `.is-active` para no fijar la opacidad).

Después de `animationend`, remover `.is-entering`/`.is-exiting` y limpiar las CSS variables del inner.

### Nota sobre `getBoundingClientRect` en elementos invisibles

Los elementos `opacity: 0` siguen estando en el layout y devuelven coordenadas correctas con `getBoundingClientRect()`. Esto permite calcular el vector de dirección antes de que el elemento sea visible.

---

## 3. IntersectionObserver robusto para scroll — patrón "visible set + closest to center"

### El problema del threshold único

`threshold: 0.1` con un solo observer activa el personaje en cuanto el 10% de una sección es visible. Con scroll rápido, dos secciones pueden estar al 10% simultáneamente y el personaje alterna de forma errática.

### Solución: Set de visibles + sección más centrada

```js
const visible = new Set<string>(); // secciones actualmente en el viewport

// Cuando una sección entra → visible.add(num)
// Cuando sale → visible.delete(num)
// En cada cambio → elegir la del centro del viewport

function updateCharacter() {
  const vpCenter = window.innerHeight / 2;
  let bestNum = '', bestDist = Infinity;

  visible.forEach((num) => {
    const rect = sectionEls.get(num)?.getBoundingClientRect();
    if (!rect) return;
    const dist = Math.abs((rect.top + rect.bottom) / 2 - vpCenter);
    if (dist < bestDist) { bestDist = dist; bestNum = num; }
  });

  const next = bestNum ? (sectionMap.get(bestNum) ?? null) : null;
  // next === null si la sección no tiene personaje (ej. §02 Bifurcación) → desactiva
  if (next === currentActive) return;
  currentActive?.classList.remove('is-active');
  next?.classList.add('is-active');
  currentActive = next;
}
```

### Por qué esta solución es mejor

- El personaje se activa **solo** mientras su sección está visible en el viewport.
- Cuando la sección sale completamente → el personaje se desactiva.
- Las secciones sin personaje (§02) devuelven `null` y apagan el personaje actual.
- `threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]` da actualizaciones frecuentes para que el "más centrado" se recalcule bien durante el scroll.
- Debounce con `requestAnimationFrame` evita múltiples llamadas en el mismo frame.

### Inicialización correcta

No asumir que §00 está visible al cargar. Calcular el estado inicial revisando `getBoundingClientRect()` de todas las secciones antes del primer observer event:

```js
sectionEls.forEach((el, num) => {
  const rect = el.getBoundingClientRect();
  if (rect.bottom > 0 && rect.top < window.innerHeight) visible.add(num);
});
updateCharacter();
```

---

## 4. Overlays y modo oscuro

### El problema de los overlays con CSS variables

Los overlays que deben oscurecer imágenes (como los de `.bif-card__overlay` en Bifurcación o el backdrop del modal de Contacto) NO deben usar `var(--color-gray-75)` porque en modo oscuro esa variable se vuelve clara (derivada de `rgba(232,229,222, ...)`).

**Solución:** hardcodear `rgba(10, 10, 10, 0.75)` — el negro absoluto nunca cambia con el tema.

```css
/* MAL: se invierte en dark mode */
background: var(--color-gray-75);

/* BIEN: siempre oscuro, para overlays sobre imágenes */
background: rgba(10, 10, 10, 0.75);
```

---

## 5. Transforms y border-radius en cards

### Card con imagen y border-radius

Cuando una card tiene `border-radius` y una imagen dentro, la imagen sobresale de las esquinas a menos que la card tenga `overflow: hidden`.

```css
.card {
  border-radius: var(--radius-md);
  overflow: hidden; /* imprescindible */
}
```

Sin `overflow: hidden`, el `border-radius` visual de la card no "clipea" la imagen y las esquinas de la imagen quedan cuadradas.

---

## 6. Separación de transforms: animación vs posicionamiento

**Regla general:** nunca poner animaciones CSS (`transition: transform`) en el mismo elemento que usa `transform` para posicionar (centrar, offset, etc.).

Si hay conflicto:
1. Elemento outer → `transform` de posición (p.ej. `translateY(-50%)`)
2. Elemento inner → `transform` de animación (p.ej. `translateY(18px) → 0`)

Aplica para: personaje, tooltips, modales, drawers, cualquier elemento centrado con transform.

---

## 7. Personaje embebido en sección (§10 Contacto)

### Por qué no usar el fixed layer para §10

En §10 el usuario quiere: carrusel (abajo) → personaje → datos de contacto (arriba).
Esto es IMPOSIBLE cuando el personaje es `position: fixed; z-index: 3` porque el fixed layer está en la jerarquía de stacking del root, por encima de todas las secciones (z-index: 2). No hay forma de que elementos dentro de la sección pinten sobre el fixed layer.

### Solución: personaje como elemento dentro de la sección

1. En `character.json`: `mode: "hidden"` para §10 (el fixed layer lo ignora).
2. En el componente de la sección: embeber el personaje como `position: absolute; z-index: 1` dentro de la sección.
3. La sección tiene `position: relative` (de global.css), por lo que el `absolute` se posiciona relativo a ella.
4. Dentro de la stacking context de la sección:
   - Carrusel: z-index: auto (≈ 0) → queda debajo
   - Personaje: z-index: 1 → en medio
   - Zona de datos/CTAs: z-index: 3 con `position: relative` → encima

### Patrón replicable

Cuando un personaje/overlay necesita estar entre dos capas de contenido de la MISMA sección, sacarlo del global fixed layer y embebélo en la sección como `position: absolute`.

---

## 9. Peek mode

El personaje en modo `peek` asoma desde el borde inferior de la pantalla. La pose queda visible solo parcialmente (la cabeza/torso superior).

```css
.character--pos-bottom {
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) translateY(var(--peek-offset, 68%));
}
```

`--peek-offset: 68%` significa que el 68% inferior del personaje queda fuera de pantalla. Ajustar este valor para mostrar más o menos del personaje.

El inner `.character__anim` para peek NO lleva translateY adicional (ya está posicionado correctamente por el outer).

---

*Actualizar este documento cada vez que se implementen nuevas decisiones de diseño o se corrijan bugs relacionados con UI/animaciones.*
