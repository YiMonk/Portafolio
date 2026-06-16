# Convenciones del proyecto

## IDs de sección

Cada sección del portafolio debe tener estos atributos en su elemento raíz:

```html
<section id="section-NN" data-section-number="NN">
  <!-- contenido -->
</section>
```

Donde `NN` es el número de dos dígitos: `00` para Hero, `01` para Mermis, etc.

Esto es requerido por:
- `Nav.astro` → el IntersectionObserver actualiza el indicador de sección central
- `Character.astro` → el IntersectionObserver activa la pose del personaje correspondiente

El atributo `id` permite también la navegación por anchor desde el nav derecho.

## Zonas de contenido vs personaje

El personaje está en `position: fixed; z-index: 1`. Las secciones tienen `z-index: 2` — el texto siempre queda encima.

Para evitar solapamiento visual, cada sección debe organizar su contenido en la zona opuesta a donde está el personaje:

| Sección | Posición del personaje | Zona del contenido |
|---------|----------------------|-------------------|
| §00 Hero | center-right | Columna izquierda (grid 1/2) |
| §01 Mermis | bottom-left | Centro/derecha |
| §02 Bifurcación | hidden | 100% ancho (sin restricción de zona) |
| §03 Sobre mí | right | Centro/izquierda |
| §04 Proyectos | peek (borde inferior) | Centro (personaje no interfiere con grids) |
| §05 Stack | center | Contenido rodea al personaje (rejilla) |
| §06 Servicios | left | Centro/derecha |
| §07 Tienda | peek (borde inferior) | Centro |
| §08 Educación | corner (esquina) | Centro/izquierda |
| §09 Ahora | right | Centro/izquierda |
| §10 Contacto | center | Contenido arriba, personaje debajo |

En mobile (< 768px): personaje con `opacity: 0.35` para no interferir con el layout de columna única.
