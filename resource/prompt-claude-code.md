# Prompt para Claude Code — Sección "Calculadoras" de Aselegal

> Pega este archivo como instrucción inicial en Claude Code. Todos los recursos están en `/resource`. La guía visual de obligado cumplimiento es **`/resource/aselegal-design-system.md`**.

---

## 1. Rol y objetivo

Actúas como **desarrollador front-end senior** especializado en webs corporativas de servicios profesionales. Tu tarea es construir una **sección de calculadoras** para el despacho **Aselegal** (asesoría fiscal, laboral, jurídica y mercantil en Sevilla, 30 años de trayectoria, web en WordPress + Elementor: `https://aselegal.com`).

La sección se compone de:

1. **Página hub** `/calculadoras/` — página contenedora y de navegación que presenta y enlaza a las 3 calculadoras.
2. **3 páginas de detalle**, cada una con su calculadora interactiva, contenido SEO y CTAs hacia los servicios de Aselegal:
   - **Calculadora de sueldo neto** → cuánto cobras realmente (bruto → neto).
   - **Calculadora de cuota de autónomos** → cuánto pagas a la SS según tus ingresos (15 tramos 2025).
   - **¿Autónomo o SL?** → qué estructura conviene según tu beneficio (IRPF vs IS).

**Resultado esperado:** un mini-sitio estático, modular, responsive, accesible y 100% alineado con la marca Aselegal, listo para integrarse en la web del cliente (o servirse como páginas independientes bajo `/calculadoras/`).

---

## 2. Inventario de `/resource` (léelo TODO antes de programar)

| Archivo | Qué es | Cómo usarlo |
| :-- | :-- | :-- |
| `aselegal-design-system.md` | **Guía visual / tokens.** Fuente de la verdad de colores, tipografías, escala, espaciados, componentes. | **Obligatorio.** Genera `tokens.css` desde su bloque `:root`. No inventes valores fuera de aquí. |
| `00-hub-calculadoras.md` | Copy de la página hub. | Texto literal del hub. **Respeta el copy; no lo reescribas.** |
| `01-sueldo-neto.md` | Copy calculadora de sueldo neto. | Estructura y texto de la página 1. |
| `02-cuota-autonomos.md` | Copy calculadora de cuota de autónomos. | Estructura y texto de la página 2. Incluye la tabla oficial de 15 tramos 2025. |
| `03-autonomo-o-sl.md` | Copy ¿Autónomo o SL? | Estructura y texto de la página 3. Incluye notas operativas para dev (slug, metas, internal linking). |
| `ref-sueldo-neto.html` | HTML de referencia calculadora 1. | **Solo referencia.** Reutiliza/valida su **lógica de cálculo**; **rehaz** la maqueta y los estilos a la marca Aselegal. |
| `ref-cuota-autonomos.html` | HTML de referencia calculadora 2. | Ídem. |
| `ref-autonomo-o-sl.html` | HTML de referencia calculadora 3. | Ídem. |
| `assets/` | Logo SVG y favicons si se incluyen. | Logo oficial: `LOGO-VECTOR-ASELEGAL-1.svg`. |

> Si algún archivo de copy no estuviera presente, **detente y pídelo** antes de inventar contenido. El contenido legal/fiscal no se inventa.

---

## 3. Principios rectores (no negociables)

1. **El copy manda en el contenido.** Usa el texto de los `.md` tal cual (titulares, párrafos, tablas, FAQ, notas legales, textos de CTA). No parafrasees ni cambies cifras.
2. **El design system manda en lo visual.** Cero hex/px sueltos: todo vía variables de `tokens.css`.
3. **Los HTML de referencia mandan en la lógica de cálculo**, no en el diseño. Extrae las fórmulas, los tramos y los tipos; **descarta** su maquetación y reconstrúyela con los componentes de Aselegal. Si la lógica del HTML contradice las cifras del copy o la tabla oficial de tramos, **prevalece el copy / la tabla oficial** y lo señalas en un comentario.
4. **No inventes datos fiscales.** Porcentajes, tramos y tipos salen del copy y de los HTML de referencia. Marca con `/* TODO: verificar */` cualquier valor del que no tengas fuente.
5. **Inspiración estructural:** Taxfix (`taxfix.com/es-es/calculadoras/`). Patrón a replicar en espíritu (no en marca): hero claro → grid de tarjetas "las que más se usan" con CTA "Calcular" → confianza → CTA final. **El estilo es Aselegal, no Taxfix.**

---

## 4. Stack y estructura del proyecto

**Enfoque recomendado:** sitio **estático portable** (HTML + CSS con tokens + JavaScript vanilla modular). Razón: las calculadoras son interactivas (inputs → cálculo en vivo) y el destino es un WordPress/Elementor donde lo más fácil de integrar es markup limpio + un CSS de tokens + JS sin dependencias. Sin frameworks ni build pesado salvo que se pida.

> Si Francisco prefiere componentes (React/Vue) o integración como bloque de Elementor, mantén la misma separación tokens/lógica/markup para poder portarlo. Pregunta antes de cambiar de stack.

Estructura propuesta:

```
/calculadoras/
├── index.html                  # Hub
├── sueldo-neto/index.html       # Calculadora 1
├── cuota-autonomos/index.html   # Calculadora 2
├── autonomo-empresa/index.html  # Calculadora 3
├── css/
│   ├── tokens.css               # :root del design system
│   ├── base.css                 # reset + tipografía base + utilidades
│   └── components.css           # botones, tarjetas, tablas, FAQ, panel calc.
├── js/
│   ├── calc-sueldo-neto.js
│   ├── calc-cuota-autonomos.js
│   ├── calc-autonomo-sl.js
│   └── ui.js                    # acordeón FAQ, helpers de formato (€, %), validación
├── partials/                    # header/footer/CTA reutilizables (si se usa includes)
│   ├── header.html
│   ├── footer.html
│   └── cta-band.html
└── assets/                      # logo, iconos, favicons
```

**Reutilización:** header, footer, banda "Por qué Aselegal", bloque de contacto (Reviews + Maps + formulario) y bloque de "Servicios relacionados" deben ser **componentes/partials compartidos**, no copiados a mano en cada página.

---

## 5. Arquitectura de información y slugs

| Página | Slug propuesto | Meta title | Notas |
| :-- | :-- | :-- | :-- |
| Hub | `/calculadoras/` | "Calculadoras fiscales y laborales \| Aselegal" | Hub + breadcrumb raíz |
| Sueldo neto | `/calculadoras/sueldo-neto/` | "Calculadora de sueldo neto 2025 \| Aselegal" | — |
| Cuota autónomos | `/calculadoras/cuota-autonomos/` | "Calculadora de cuota de autónomos 2025 \| Aselegal" | — |
| Autónomo o SL | `/calculadoras/autonomo-empresa/` | "¿Autónomo o SL? Calcula qué te conviene \| Aselegal" | Slug confirmado en notas dev del copy 3 |

> **Verifica los slugs** contra el CSV de auditoría / redirecciones del cliente antes de fijar URLs (lo indican las notas operativas del copy 3). No publiques sin esa verificación.

Navegación: el hub enlaza a las 3; cada calculadora enlaza de vuelta al hub (breadcrumb: Inicio › Calculadoras › [Calculadora]) y, en cruce, a las otras dos calculadoras relacionadas cuando el copy lo mencione (p. ej. sueldo neto ↔ cuota autónomos ↔ autónomo o SL).

---

## 6. Especificación por página

### 6.1 Hub `/calculadoras/`

Usa el copy de `00-hub-calculadoras.md`. Estructura (patrón Taxfix, estilo Aselegal):

1. **Hero:** H1 + entradilla + CTA principal hacia contacto/servicios. Fondo limpio; opción de imagen/ilustración sobria a la derecha.
2. **Grid de calculadoras (3 tarjetas)** usando el componente *Tarjeta de calculadora* del design system (§6.2): icono de línea + título (`--fs-h3`, navy) + descripción de 1–2 líneas + CTA "Calcular →". Tarjeta entera clicable. Grid 3/2/1 columnas según breakpoint.
3. **Cómo funcionan / para qué sirven** (si el copy lo trae): texto breve + iconografía.
4. **Banda "Por qué Aselegal"** (30 años en Sevilla, respondemos el mismo día, equipo fiscal+laboral+jurídico, portal Cegid).
5. **CTA final + bloque de contacto** (placeholders de Reviews, Maps, formulario).

### 6.2 Plantilla común de las páginas de calculadora

Las 3 páginas de detalle siguen el orden del copy (es prácticamente idéntico entre ellas). Maquétalas con esta plantilla:

1. **Hero / intro:** H1, párrafos de apertura del copy, **CTA** ("Consulta con Aselegal").
2. **Calculadora** (panel destacado, §6.3 del design system): inputs + resultado en vivo + **nota orientativa** (texto literal del copy). Placeholder claro donde el copy dice `[INSERTAR CALCULADORA INTERACTIVA …]`.
3. **Tabla "Para qué situaciones es útil"** (componente tabla, §6.4).
4. **"Cómo se calcula / cómo funciona"** (explicación con subsecciones numeradas del copy).
5. **Ejemplo con números** (tabla de ejemplo del copy). CTA intermedia ("Habla con nuestro equipo").
6. **"Por qué Aselegal"** (banda de confianza compartida).
7. **"Para quién es / Para quién no es"** esta calculadora.
8. **"Servicios relacionados en Aselegal"** (enlaces del copy a `/servicios/...` y blog). CTA.
9. **"Lo que dicen nuestros clientes"** → placeholder `[WIDGET GOOGLE REVIEWS]`.
10. **"Consulta con nuestro equipo"** → placeholders `[WIDGET GOOGLE MAPS]` + `[FORMULARIO DE CONTACTO]`.
11. **FAQ** (acordeón accesible, §6.5) con todas las preguntas del copy.
12. **JSON-LD `FAQPage`** generado a partir de las preguntas/respuestas del copy (SEO).

### 6.3 Lógica de cada calculadora

> Toma las fórmulas de los `ref-*.html`. Abajo, el contrato funcional que debe cumplir cada una (derivado del copy). Formatea todas las cifras en euros con separador de miles español (`1.638 €`) y porcentajes con coma decimal.

**A) Sueldo neto (`calc-sueldo-neto.js`)**
- *Inputs:* salario bruto anual (€), nº de pagas (12/14), situación personal (hijos, discapacidad, hogar monoparental) según permita el HTML de referencia.
- *Cálculo:* bruto − retención IRPF (tramos autonómicos **Andalucía 2025**) − cotización SS trabajador (**≈6,35%** sobre base) → neto.
- *Salida:* **neto mensual** y **neto anual**, desglosado en dos líneas (IRPF y SS), como en el ejemplo del copy (bruto 25.000 € → IRPF ~15% → SS ~6,35% → ≈19.662 €/año ≈ 1.638 €/mes).
- *Nota:* resultado orientativo; mostrar disclaimer literal del copy.

**B) Cuota de autónomos (`calc-cuota-autonomos.js`)**
- *Input:* rendimientos netos mensuales estimados (€).
- *Cálculo:* situar en uno de los **15 tramos 2025** y mostrar base mínima, base máxima y **cuota mínima/mes** (tipo general ≈30,6%). Datos exactos en la tabla de abajo (copia verbatim).
- *Salida:* tramo aplicable, base mínima, cuota mínima mensual, cuota anual estimada; mención a tarifa plana (80 €/mes 12 meses) y a la regularización anual (texto del copy).

  **Tabla oficial de tramos 2025 (usar estos valores):**

  | Rendimientos netos/mes | Base mínima | Base máxima | Cuota mín./mes |
  | :-- | :-- | :-- | :-- |
  | < 670 € | 653,59 € | 718,95 € | 200,10 € |
  | 670–900 € | 718,95 € | 900,00 € | 220,10 € |
  | 900–1.166,70 € | 849,67 € | 1.166,70 € | 260,06 € |
  | 1.166,70–1.300 € | 950,98 € | 1.300,00 € | 291,05 € |
  | 1.300–1.500 € | 960,78 € | 1.500,00 € | 294,05 € |
  | 1.500–1.700 € | 960,78 € | 1.700,00 € | 294,05 € |
  | 1.700–1.850 € | 1.013,07 € | 1.850,00 € | 309,99 € |
  | 1.850–2.030 € | 1.029,41 € | 2.030,00 € | 315,00 € |
  | 2.030–2.330 € | 1.045,75 € | 2.330,00 € | 320,00 € |
  | 2.330–2.760 € | 1.078,43 € | 2.760,00 € | 330,00 € |
  | 2.760–3.190 € | 1.143,79 € | 3.190,00 € | 350,00 € |
  | 3.190–3.620 € | 1.209,15 € | 3.620,00 € | 370,00 € |
  | 3.620–4.050 € | 1.274,51 € | 4.050,00 € | 390,00 € |
  | 4.050–6.000 € | 1.339,87 € | 6.000,00 € | 410,00 € |
  | > 6.000 € | 1.732,03 € | 4.139,40 € | 530,00 € |

  > Define estos tramos en un único array/constante en el JS para poder actualizarlos fácilmente cuando cambien con los PGE 2026.

**C) ¿Autónomo o SL? (`calc-autonomo-sl.js`)**
- *Input:* beneficio neto anual estimado (€, ingresos − gastos, antes de impuestos).
- *Cálculo:* comparar carga fiscal **Autónomo (IRPF, tramos Andalucía 2025: 19%–47%)** vs **SL (IS 23% hasta 1 M€ de facturación, 25% resto)**, mostrando el neto tras impuestos en cada estructura y la diferencia. Lógica concreta: input beneficio neto → IRPF (tramos Andalucía 2025) vs IS → diferencia neta (según nota dev del copy 3).
- *Salida:* comparativa lado a lado (Autónomo vs SL), importe de impuesto aproximado y neto tras impuestos, mensaje orientativo del punto de cruce (~40.000–50.000 € de beneficio). Mostrar disclaimer literal (no incluye coste de constitución/mantenimiento de la SL ni cotización del socio-trabajador).

---

## 7. SEO y metadatos

- `meta title` y `meta description` por página (ver §5; para autónomo/SL usar las de las notas dev del copy 3: description ~155 caracteres).
- Encabezados jerárquicos correctos (un solo `<h1>` por página).
- **JSON-LD:** `FAQPage` en cada calculadora (desde el copy) y `BreadcrumbList` en todas.
- `lang="es"`, `<title>`, Open Graph básico, favicon.
- Imágenes con `alt` descriptivo; logo como SVG inline o `<img>` con `alt="Aselegal"`.
- Internal linking entrante/saliente según notas del copy 3 (hub ↔ servicios emprendimiento/fiscal/mercantil ↔ blog).
- Slugs limpios en español; verificar contra auditoría antes de publicar.

---

## 8. Responsive, rendimiento y accesibilidad

- **Mobile-first.** Breakpoints del design system (480/768/1024/1200).
- Calculadora 100% usable en móvil: inputs grandes, resultado siempre visible (sticky en móvil si aporta).
- Tablas con scroll horizontal o colapso a "etiqueta+valor" en <640px.
- **Accesibilidad AA** (ver §8 del design system): labels asociados, foco visible, FAQ por teclado, `aria-live` en resultados, contraste correcto, objetivos táctiles ≥44px, `prefers-reduced-motion`.
- **Rendimiento:** sin dependencias innecesarias; fuentes con `display=swap` (o reutilizando las del WP); imágenes optimizadas; JS diferido (`defer`).

---

## 9. Criterios de aceptación (definición de "hecho")

- [ ] 4 páginas (hub + 3 calculadoras) maquetadas con el copy literal y los tokens del design system.
- [ ] Las 3 calculadoras calculan correctamente y muestran las salidas descritas en §6.3, con la tabla de tramos verbatim.
- [ ] Header, footer, banda "Por qué Aselegal", servicios relacionados y bloque de contacto son componentes reutilizables.
- [ ] Marca Aselegal aplicada: logo, PT Serif en titulares, Montserrat en cuerpo, paleta navy/azul.
- [ ] Responsive correcto en móvil/tablet/desktop; sin scroll horizontal accidental.
- [ ] Accesibilidad AA verificada (foco, labels, contraste, teclado).
- [ ] SEO: títulos/descriptions, jerarquía de headings, JSON-LD FAQ + Breadcrumb.
- [ ] Placeholders claros y maquetados para Reviews / Maps / Formulario.
- [ ] Cero valores fiscales inventados; cualquier dato sin fuente marcado con `TODO`.

---

## 10. Lo que NO debes hacer

- ❌ Reescribir o resumir el copy (cambia el sentido y rompe el SEO ya trabajado).
- ❌ Copiar la maquetación de los HTML de referencia o el estilo de Taxfix.
- ❌ Inventar tramos, tipos o porcentajes fiscales.
- ❌ Usar colores, tamaños o fuentes fuera del design system.
- ❌ Publicar URLs sin verificar slugs/redirecciones contra la auditoría del cliente.
- ❌ Introducir frameworks o dependencias pesadas sin acordarlo.

---

## 11. Plan de ejecución sugerido

1. Lee `aselegal-design-system.md` y genera `css/tokens.css`, `css/base.css`.
2. Lee los 4 `.md` de copy y los 3 `ref-*.html`; resume en un comentario la lógica de cálculo extraída de cada HTML.
3. Construye `css/components.css` (botones, tarjetas, tablas, FAQ, panel de calculadora).
4. Crea los partials compartidos (header, footer, CTA, contacto).
5. Monta el **hub** con el grid de 3 tarjetas.
6. Monta la **plantilla de calculadora** y derivá las 3 páginas con su copy.
7. Implementa los 3 JS de cálculo + `ui.js` (formato €/%, validación, acordeón).
8. Añade SEO (metas, JSON-LD), accesibilidad y responsive.
9. Repasa contra los **criterios de aceptación** (§9) y deja un `README.md` con cómo integrarlo en WordPress/Elementor y qué falta (widgets reales, verificación de slugs).
