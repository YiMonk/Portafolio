# PROMPT INICIAL — pegar en Claude Code

> Copia y pega este mensaje como tu primer mensaje en Claude Code, una vez que tengas el `CLAUDE.md` en la raíz y las capturas en `/referencias`.

---

Lee primero el archivo `CLAUDE.md` en la raíz: es el documento maestro de mi portafolio personal (Jesús Calles, Frontend + Diseñador UX/UI). Contiene la arquitectura completa de las 11 secciones, los sistemas transversales, la dirección de arte y el stack. En la carpeta `/referencias` están las capturas del estilo visual de referencia (tema "Monolith" para todo el sitio, y tema "Acid" del cual solo tomamos el tratamiento del contacto, no sus colores).

Tengo tres subagentes configurados en `.claude/agents/`:
- **planner** (Sonnet): analiza, organiza y planifica cómo se va a construir cada parte antes de tocar código.
- **executor** (Haiku): ejecuta el trabajo de implementación. No me explica qué cambios hizo ni cómo, a menos que se lo pida explícitamente.
- **qa** (Haiku): revisa el código que produce el executor, detecta fallos según buenas prácticas de las tecnologías usadas y conformidad con el documento maestro, y reporta qué corregir.

Y un skill de diseño en `.claude/skills/ux-ui-design/` que define cómo aplicamos UX/UI en este proyecto.

**Flujo de trabajo que quiero seguir:**
1. **planner** propone el plan de la fase/sección → yo lo apruebo.
2. **executor** implementa el plan aprobado, en silencio.
3. **qa** revisa lo implementado y reporta hallazgos.
4. Si qa encuentra problemas → **executor** los corrige (en silencio) → qa vuelve a revisar si hace falta.
5. Cuando qa da el visto bueno, me lo presentas para mi aprobación final.

Quiero trabajar así, por fases, sin hacer todo de golpe:

**Fase 0 — Arranque (hagamos esto ahora):**
1. Usa el agente **planner** para proponerme un plan de la Fase 1 (estructura base): inicialización del proyecto Astro, estructura de carpetas, la carpeta `/content` con los JSON documentados, y el sistema de tokens de diseño (colores Monolith + Orbitron/Space Mono).
2. Muéstrame el plan y espera mi aprobación antes de ejecutar nada.

No escribas código todavía. Primero el plan de la Fase 1. Cuando lo apruebe, el agente **executor** lo implementa y luego **qa** lo revisa.

Recuerda durante todo el proyecto:
- Respeta la dirección de arte y la paleta del `CLAUDE.md` al pie de la letra.
- Mantén el sistema de contenido en JSON tal como está documentado.
- Avanzamos sección por sección, no todo de una vez.
- El **executor** trabaja en silencio (sin explicar cambios salvo que yo lo pida).
- El **qa** revisa antes de que yo dé el visto bueno final.


Todo esto lo subire a obsidian luego asi que crea

documentar en Obsidian el estado del proyecto 