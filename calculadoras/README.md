# Aselegal · Sección «Calculadoras»

Mini-sitio estático (HTML + CSS con tokens + JavaScript vanilla, **sin dependencias ni build**) con el hub de calculadoras y 3 calculadoras interactivas, alineado al sistema de diseño de Aselegal y listo para integrarse en `aselegal.com/calculadoras/`.

## Páginas

| Página | Ruta | Slug de publicación propuesto |
| :-- | :-- | :-- |
| Hub | `index.html` | `/calculadoras/` |
| Calculadora de sueldo neto | `sueldo-neto/index.html` | `/calculadoras/sueldo-neto/` |
| Calculadora de cuota de autónomos | `cuota-autonomos/index.html` | `/calculadoras/cuota-autonomos/` |
| Calculadora ¿Autónomo o SL? | `autonomo-empresa/index.html` | `/calculadoras/autonomo-empresa/` |

> **Alcance:** se han construido **3 calculadoras**. El copy del hub (`00-hub-calculadoras.md`) menciona 8; por decisión de producto el **hub solo muestra las 3 calculadoras activas** (sueldo neto, cuota de autónomos, autónomo o SL). El resto del copy del hub (hero, «por qué Aselegal», servicios, FAQ, contacto) se conserva **verbatim**.

## Estructura

```
calculadoras/
├── index.html                  # Hub (3 tarjetas)
├── sueldo-neto/index.html
├── cuota-autonomos/index.html
├── autonomo-empresa/index.html
├── css/
│   ├── tokens.css              # :root del design system (única fuente de tokens)
│   ├── base.css                # reset, tipografía, layout, utilidades
│   └── components.css          # header, footer, botones, tarjetas, panel calc, tablas, FAQ, bandas, contacto
├── js/
│   ├── ui.js                   # formato € / %, acordeón FAQ, menú móvil, helpers (defer, cargar primero)
│   ├── calc-sueldo-neto.js
│   ├── calc-cuota-autonomos.js
│   └── calc-autonomo-sl.js
├── partials/                   # marcado canónico compartido (header / footer / cta-band)
│   ├── header.html             # usa el token {{BASE}} = ruta relativa a /calculadoras/
│   ├── footer.html
│   └── cta-band.html
└── assets/
    ├── logo/                   # logo-aselegal.svg (oficial) + .png
    └── img/placeholder.jpg     # imagen de ejemplo reutilizada en los hero
```

> `.gitignore` está en la raíz del repo (ignora `.DS_Store`, `node_modules/`, logs, `.env`, etc.).

**Partials:** al ser un sitio estático sin build, el header/footer/wa-float se **inlinan** en cada página (idénticos). `partials/*.html` son la **copia canónica** para mantenimiento: si cambian, propágalos a las 4 páginas. El token `{{BASE}}` vale `""` en el hub y `"../"` en las páginas de detalle.

## Previsualizar en local

Sírvelo por HTTP (las rutas relativas y los JSON-LD funcionan mejor que con `file://`):

```bash
# desde la raíz del repo (carpeta que contiene /calculadoras)
python3 -m http.server 8000
# abre http://localhost:8000/calculadoras/
```

## Lógica de cálculo (resumen y mantenimiento)

Las fórmulas se derivan de los HTML de referencia (`/resource/ref-*` → `CALCUL~*.HTM`) y se ajustan al contrato del prompt (§6.3). Cuando el HTML de referencia contradice el copy o la tabla oficial, **prevalece el copy/tabla** (marcado en comentarios del JS).

- **Sueldo neto** (`calc-sueldo-neto.js`): `bruto − SS trabajador (6,35 %, con base máx. 2025) − retención IRPF` → neto mensual y anual. IRPF por escalones (19–47 %, escala combinada estatal+autonómica Andalucía 2025) con mínimo personal (5.550 €), reducción por rendimientos del trabajo, mínimo por descendientes y discapacidad. Calibrado contra el ejemplo del copy (25.000 € → IRPF ~15 %).
- **Cuota de autónomos** (`calc-cuota-autonomos.js`): sitúa los rendimientos netos mensuales en uno de los **15 tramos 2025** y devuelve tramo, base mínima/máxima, cuota mín./mes y cuota anual. **La tabla `TRAMOS` es verbatim del copy `02-cuota-autonomos.md`.** ➜ Para actualizar con los PGE 2026, edita **solo** ese array y la tabla HTML de la página.
- **Autónomo o SL** (`calc-autonomo-sl.js`): compara el impuesto sobre el beneficio — **Autónomo (IRPF)** vs **SL (IS 23 % ≤ 1 M€ facturación, 25 % resto)** — y muestra el neto tras impuestos y la diferencia. Modelo simplificado **a propósito** (lo exige el copy): no incluye coste de constitución/mantenimiento de la SL ni cotización del socio-trabajador (así lo dice el disclaimer literal de la página).

> Los tramos IRPF combinados (19–47 %) llevan un `TODO: verificar` en el JS: la escala autonómica exacta de Andalucía 2025 difiere ligeramente en los tramos medios; es suficiente para un cálculo orientativo.

## Integración en WordPress / Elementor

1. **Fuentes:** la sección carga PT Serif + Montserrat desde Google Fonts con `display=swap`. Si se integra en el WP existente, **reutiliza las fuentes ya encoladas** por el theme y elimina el `<link>` de Google Fonts para no duplicar la carga.
2. **CSS:** encola `css/tokens.css`, `css/base.css` y `css/components.css` (en ese orden). `tokens.css` define el `:root`; el resto depende de él.
3. **JS:** encola `js/ui.js` primero (con `defer`) y luego el `calc-*.js` de cada página.
4. **Markup:** pega el `<main>` de cada página en una plantilla/bloque HTML de Elementor. El header/footer de la sección replican los de aselegal.com; si la página vive dentro del theme, puedes usar el header/footer nativos del WP y quedarte solo con el `<main>`.
5. **Slugs:** publica con los slugs de la tabla de arriba. **Verifica antes** que no hay colisión ni redirección en el CSV de auditoría del cliente.

## Imágenes, reseñas y mapa

- **Imágenes:** hay una sola imagen de stock en `assets/img/placeholder.jpg` que se reutiliza en el hero de las 4 páginas (con la etiqueta «Imagen de ejemplo»). Es un **marcador**: sustituye cada instancia por la fotografía real correspondiente (despacho, equipo, atención al cliente…). El componente `.media-shot`/`.media-band` mantiene el encuadre (`object-fit: cover`).
- **Reseñas:** el bloque «Lo que dicen nuestros clientes» es un **widget de ejemplo con datos ficticios** (3 tarjetas + nota de aviso). Sustitúyelo por el widget real de Google Reviews de Aselegal.
- **Mapa:** la sección de contacto incrusta el **iframe real de Google Maps** de Aselegal (Pl. de Cuba, 3, Sevilla), responsive vía `.map-embed`. Carga con `loading="lazy"`.

## Pendientes antes de publicar

- [ ] **Verificar slugs/redirecciones** contra el CSV de auditoría (lo pide la nota dev del copy 3).
- [ ] Sustituir el **widget de reseñas de ejemplo** por el de Google Reviews real, el **formulario maqueta** por el formulario real de Aselegal, y las **imágenes de ejemplo** por fotografías propias.
- [ ] **Favicon set** completo (ahora se usa el SVG del logo como favicon).
- [ ] **Enlaces sociales** del footer: no se han incluido por no tener URLs confirmadas; añadir las oficiales de Aselegal si procede.
- [ ] Revisar **tipos IRPF / IS / tramos** si cambian con los PGE 2026 (tabla de tramos, escalas en los JS, tablas de ejemplo del copy).
- [ ] Imagen Open Graph definitiva (ahora apunta al PNG del logo).
- [ ] Revisión previa: enviar a `fap@aselegal.com` con copia a `gabrielalvarez@aselegal.com` (nota dev copy 3). Silencio 48-72 h = aprobación.

## Marca y accesibilidad

- Logo oficial en `assets/logo/logo-aselegal.svg` (azul `#0080B5` + negro). En el footer (banda navy) se recolorea a blanco con `filter: brightness(0) invert(1)`.
- Titulares en **PT Serif**, cuerpo/UI en **Montserrat**; paleta navy `#051D4B` / azul `#0080B5`.
- Objetivo **WCAG AA**: un solo `<h1>` por página, labels asociados, foco visible (`--focus-ring`), FAQ operable por teclado, `aria-live` en resultados, objetivos táctiles ≥44 px, `prefers-reduced-motion` respetado.
- SEO: `meta title`/`description` por página, jerarquía de headings, JSON-LD `FAQPage` + `BreadcrumbList`, `lang="es"`, Open Graph básico.
