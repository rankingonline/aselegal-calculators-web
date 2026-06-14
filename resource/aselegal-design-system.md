# Aselegal — Sistema de Diseño (Sección Calculadoras)

> **Fuente de la verdad visual del proyecto.** Todos los tokens (colores, tipografías, tamaños, espaciados, sombras, componentes) salen de aquí. El prompt de Claude Code referencia este archivo: **no se inventan valores fuera de este documento**.
>
> Tokens extraídos de la web real (`aselegal.com`, theme Elementor) y **homologados** para mejorar consistencia de espaciados, escala tipográfica y legibilidad. Donde hay mejora respecto al sitio original, se indica con `(mejora)` y el valor antiguo entre paréntesis.

---

## 0. Cómo usar este documento

1. Copia el bloque `:root` de la sección **§7 (CSS Variables)** a un `tokens.css` global del proyecto.
2. Usa **siempre variables**, nunca hex/px sueltos en los componentes.
3. La marca tiene dos pilares: **PT Serif** para titulares (carácter de despacho, serio, con historia) y **Montserrat** para cuerpo e interfaz (limpio, legible en herramientas). No introducir más familias.
4. Color de marca: **azul `#0080B5`** (interacción / CTA) + **azul marino `#051D4B`** (titulares / autoridad). El resto es soporte.

---

## 1. Identidad de marca (datos reales del sitio)

| Elemento | Valor |
| :-- | :-- |
| Cliente | Aselegal — Asesoría fiscal, laboral, jurídica y mercantil |
| Ubicación / posicionamiento | Sevilla · "30 años en la ciudad, no en una central" · "Respondemos el mismo día" |
| Logo (SVG oficial) | `https://aselegal.com/wp-content/uploads/2024/09/LOGO-VECTOR-ASELEGAL-1.svg` |
| Plataforma origen | WordPress + Elementor |
| Tipografías cargadas | PT Serif, Montserrat, Raleway (apoyo puntual) |

**Logo:** usar el SVG oficial. Mantener dos versiones disponibles en `/assets/`:
- `logo-aselegal.svg` (versión de color, sobre fondos claros).
- `logo-aselegal-blanco.svg` (versión monocroma blanca, para bandas oscuras navy/azul). Si no existe oficial, generar una a partir del SVG forzando `fill: #FFFFFF`.
- Altura recomendada en header: **40–48 px**. Área de respeto mínima alrededor: la altura de la "A" del logotipo.

---

## 2. Color

### 2.1 Paleta de marca (extraída de Elementor globals)

| Token | Hex | Rol original | Uso en calculadoras |
| :-- | :-- | :-- | :-- |
| Azul (primary) | `#0080B5` | `--e-global-color-primary` | CTA, enlaces, foco, acentos interactivos, valores de resultado |
| Azul marino (accent) | `#051D4B` | `--e-global-color-accent` | Titulares fuertes, bandas oscuras, footer, hover de CTA secundario |
| Gris claro superficie | `#F7F7F7` | `--e-global-color-68efe74` | Fondos de sección alterna, fondos de tarjeta suave |
| Línea / azul-gris | `#DBE1E9` | `--e-global-color-a115014` | Bordes, divisores, contornos de input |
| Gris secundario | `#DEDEDE` | `--e-global-color-secondary` | Bordes suaves, estados deshabilitados |
| Blanco | `#FFFFFF` | base | Superficies, texto sobre oscuro |
| Negro texto | `#000000` | `--e-global-color-text` | (ver mejora abajo) |

### 2.2 Paleta homologada del proyecto `(mejora)`

Se mantiene la marca y se añaden tintes/sombras para estados, foco y jerarquía, además de un negro suavizado para cuerpo (más cómodo en lectura larga que `#000` puro).

```
/* Marca */
--color-blue:        #0080B5;   /* primary / interacción / CTA */
--color-blue-dark:   #006A96;   /* hover/active de CTA azul (mejora) */
--color-blue-soft:   #E6F2F8;   /* fondos suaves, highlight de resultado (mejora) */
--color-navy:        #051D4B;   /* accent / titulares / bandas oscuras */
--color-navy-dark:   #03143A;   /* hover sobre navy (mejora) */

/* Neutros */
--color-ink:         #1F2A3C;   /* texto cuerpo (mejora; antes #000000) */
--color-muted:       #5A6B82;   /* texto secundario / notas / captions (mejora) */
--color-line:        #DBE1E9;   /* bordes y divisores */
--color-line-strong: #C3CCD9;   /* borde en hover/foco de input (mejora) */
--color-surface:     #FFFFFF;   /* superficie base */
--color-surface-alt: #F7F7F7;   /* sección/fondo alterno */
--color-secondary:   #DEDEDE;   /* deshabilitado / borde suave */

/* Estados (para validación de inputs de calculadora) (mejora) */
--color-success:     #1E8E5A;
--color-success-soft:#E7F4ED;
--color-warning:     #B26A00;
--color-warning-soft:#FBF1E0;
--color-error:       #C0392B;
--color-error-soft:  #FBEAE8;
```

### 2.3 Reglas de uso de color

- **Titulares (H1–H3):** `--color-navy`. Nunca azul `#0080B5` en bloques largos de titular (contraste insuficiente para texto pequeño).
- **Texto cuerpo:** `--color-ink`. Notas/disclaimers: `--color-muted`.
- **Enlaces y CTA principal:** fondo `--color-blue`, texto blanco; hover `--color-blue-dark`.
- **Resultado destacado de la calculadora:** número grande en `--color-navy` sobre fondo `--color-blue-soft`.
- **Accesibilidad:** texto blanco sobre `#0080B5` solo en tamaño ≥16px y peso ≥600 (botones). Para texto normal sobre azul, usar `--color-navy` de fondo. Texto navy/ink sobre blanco cumple AA holgado.

---

## 3. Tipografía

### 3.1 Familias

| Rol | Familia | Fallback | Pesos a cargar |
| :-- | :-- | :-- | :-- |
| Titulares | **PT Serif** | Georgia, "Times New Roman", serif | 400, 700 |
| Cuerpo / UI | **Montserrat** | "Helvetica Neue", Arial, sans-serif | 300, 400, 500, 600, 700 |
| Apoyo (opcional) | Raleway | Montserrat | 600 (solo si se replica algún módulo existente) |

Carga (Google Fonts, `display=swap`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=PT+Serif:wght@400;700&display=swap" rel="stylesheet">
```

> El sitio sirve estas fuentes localmente vía Elementor. Para esta sección, Google Fonts con `display=swap` es suficiente; si se integra en el WP existente, reutilizar las fuentes ya encoladas y **no** duplicar la carga.

### 3.2 Escala tipográfica homologada `(mejora)`

Escala fluida con `clamp()` (móvil → desktop). Sustituye los saltos irregulares del sitio (p. ej. 14/16/22px sin sistema) por una escala coherente.

| Token | Uso | `font-size` (clamp) | Familia | Peso | line-height |
| :-- | :-- | :-- | :-- | :-- | :-- |
| `--fs-display` | H1 hero | `clamp(2.25rem, 1.6rem + 2.8vw, 3.5rem)` (36→56) | PT Serif | 700 | 1.12 |
| `--fs-h2` | Títulos de sección | `clamp(1.75rem, 1.4rem + 1.6vw, 2.625rem)` (28→42) | PT Serif | 700 | 1.18 |
| `--fs-h3` | Subtítulos / nombre de calculadora | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` (22→28) | PT Serif | 700 | 1.25 |
| `--fs-h4` | Encabezados menores / FAQ | `1.25rem` (20) | Montserrat | 600 | 1.35 |
| `--fs-lead` | Entradilla / intro | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` (18→22) | Montserrat | 400 | 1.6 |
| `--fs-body` | Texto base | `1rem` (16) | Montserrat | 400 | 1.65 |
| `--fs-small` | Notas, disclaimers, captions | `0.875rem` (14) | Montserrat | 400 | 1.55 |
| `--fs-result` | Número grande de resultado | `clamp(2rem, 1.5rem + 2.5vw, 3rem)` (32→48) | PT Serif | 700 | 1.05 |

Reglas:
- **No usar `line-height: 1em`** del sitio original en cuerpo (`--e-global-typography-2067017`). Es demasiado apretado. Cuerpo siempre 1.6–1.65 `(mejora)`.
- `text-transform: capitalize` global de Elementor: **eliminar** en cuerpo y titulares de párrafo. Mantener mayúsculas solo donde lo pida el copy. `(mejora)`
- Medida de lectura (`max-width`) de bloques de prosa: **68ch / ~720px**. Las tablas y la calculadora pueden ir a ancho de contenedor.

---

## 4. Espaciado y layout

### 4.1 Escala de espaciado (base 8px) `(mejora)`

El sitio mezcla `padding:10px / 15px / 30px` sin sistema. Se homologa a una escala de 8.

```
--space-1: 0.25rem;  /*  4px */
--space-2: 0.5rem;   /*  8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.5rem;   /* 24px */
--space-6: 2rem;     /* 32px */
--space-7: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-9: 5rem;     /* 80px */
--space-10: 6rem;    /* 96px */
```

### 4.2 Contenedor y secciones

| Token | Valor | Nota |
| :-- | :-- | :-- |
| `--container-max` | `1200px` | Ancho máximo de contenido |
| `--container-pad` | `clamp(1rem, 5vw, 2rem)` | Padding lateral responsivo |
| `--prose-max` | `720px` | Ancho máximo de bloques de texto |
| `--section-pad-y` | `clamp(3.5rem, 6vw, 6rem)` (56→96) | Padding vertical de sección homologado `(mejora)` |
| `--gap-card` | `var(--space-5)` (24px) | Separación entre tarjetas en grid |

### 4.3 Breakpoints

```
--bp-sm: 480px;   /* móvil grande */
--bp-md: 768px;   /* tablet */
--bp-lg: 1024px;  /* laptop */
--bp-xl: 1200px;  /* desktop */
```

Patrón de grid del hub de calculadoras: **3 columnas** ≥1024px, **2** entre 640–1023px, **1** <640px.

---

## 5. Radios, sombras y bordes

```
/* Radios — el sitio usa 3–6px; se sube ligeramente en tarjetas-herramienta para look moderno (mejora) */
--radius-sm:   6px;    /* inputs, badges */
--radius-md:   10px;   /* botones, tarjetas pequeñas */
--radius-lg:   16px;   /* tarjetas de calculadora, paneles de resultado */
--radius-pill: 999px;  /* chips, pills, CTA tipo pastilla */

/* Sombras — tintadas en navy para cohesión (mejora; sitio usa negro plano) */
--shadow-sm: 0 1px 3px rgba(5, 29, 75, 0.08);
--shadow-md: 0 8px 24px rgba(5, 29, 75, 0.10);
--shadow-lg: 0 16px 48px rgba(5, 29, 75, 0.14);

/* Bordes */
--border: 1px solid var(--color-line);
--border-strong: 1px solid var(--color-line-strong);
--focus-ring: 0 0 0 3px rgba(0, 128, 181, 0.35);  /* anillo de foco accesible */
```

---

## 6. Componentes

### 6.1 Botones / CTA

| Variante | Fondo | Texto | Borde | Hover |
| :-- | :-- | :-- | :-- | :-- |
| **Primario** | `--color-blue` | `#FFFFFF` | — | `--color-blue-dark` |
| **Secundario (navy)** | `--color-navy` | `#FFFFFF` | — | `--color-navy-dark` |
| **Outline** | transparente | `--color-blue` | `2px solid --color-blue` | fondo `--color-blue-soft` |
| **Texto/enlace** | — | `--color-blue` | — | subrayado |

Specs comunes: `padding: 0.875rem 1.75rem` (14/28px), `font: 600 1rem/1 Montserrat`, `border-radius: var(--radius-pill)`, transición 150ms, foco visible con `--focus-ring`. CTA principal del proyecto: texto del copy (p. ej. "Consulta con Aselegal", "Habla con nuestro equipo").

### 6.2 Tarjeta de calculadora (hub)

- Contenedor: `--color-surface`, `--border`, `--radius-lg`, `--shadow-sm`; hover → `--shadow-md` + `translateY(-4px)`.
- Estructura: **icono** (línea, navy/azul, 40–48px) → **título** (`--fs-h3`, navy) → **descripción** (`--fs-body`, 1–2 líneas, `--color-muted`) → **CTA** "Calcular →" (outline o texto).
- Toda la tarjeta es clicable (enlace que envuelve), CTA visible como refuerzo.

### 6.3 Panel de la calculadora (página de detalle)

- **Shell** en `--radius-lg`, `--shadow-md`, padding `--space-6`, fondo blanco; sobre fondo de sección `--color-surface-alt` para destacarla.
- **Inputs:** label `--fs-small` `--color-muted` arriba; campo con `--border`, `--radius-sm`, `padding 0.75rem 1rem`, `--fs-body`; foco → `--border-strong` + `--focus-ring`. Sliders y selects con el mismo lenguaje.
- **Panel de resultado:** fondo `--color-blue-soft`, `--radius-lg`, número en `--fs-result` navy, etiqueta del concepto en `--fs-small`. Mostrar siempre **neto mensual y anual** (sueldo neto), **tramo + cuota** (autónomos), **comparativa lado a lado** (autónomo vs SL).
- **Nota legal/orientativa:** `--fs-small` `--color-muted`, debajo del resultado (texto exacto del copy de cada calculadora).

### 6.4 Tablas (situaciones, tramos, ejemplos numéricos)

- Cabecera: fondo `--color-navy`, texto blanco, `--fs-small` 600.
- Filas: alternancia `#FFFFFF` / `--color-surface-alt`; borde inferior `--color-line`.
- Celdas: `padding 0.75rem 1rem`, `--fs-body`.
- Importes/cifras: alineados a la derecha, peso 600.
- **Responsive:** en <640px, scroll horizontal con sombra de borde, o colapso a formato "etiqueta + valor" apilado.

### 6.5 FAQ (acordeón)

- Pregunta: `--fs-h4` Montserrat 600 navy, con icono +/– a la derecha.
- Respuesta: `--fs-body`, `--color-ink`, `--prose-max`.
- Borde inferior `--color-line` entre ítems. Accesible por teclado (`button`, `aria-expanded`).

### 6.6 Bandas de confianza / "Por qué Aselegal"

- Banda con fondo `--color-navy` (o `--color-surface-alt`), 3–4 columnas de bloques: título corto `--fs-h4` + texto `--fs-body`. Sobre navy, texto blanco y subtítulos en `--color-blue-soft`.

### 6.7 Bloque de contacto

- Reservar contenedores para: **widget Google Reviews**, **widget Google Maps** y **formulario de contacto** (los marca el copy con `[WIDGET …]`). Dejar placeholders claros y bien maquetados; integración real según WP/Elementor del cliente.

---

## 7. CSS Variables — bloque `:root` listo para usar

```css
:root {
  /* === Color === */
  --color-blue: #0080B5;
  --color-blue-dark: #006A96;
  --color-blue-soft: #E6F2F8;
  --color-navy: #051D4B;
  --color-navy-dark: #03143A;
  --color-ink: #1F2A3C;
  --color-muted: #5A6B82;
  --color-line: #DBE1E9;
  --color-line-strong: #C3CCD9;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F7F7F7;
  --color-secondary: #DEDEDE;
  --color-success: #1E8E5A;  --color-success-soft: #E7F4ED;
  --color-warning: #B26A00;  --color-warning-soft: #FBF1E0;
  --color-error: #C0392B;    --color-error-soft: #FBEAE8;

  /* === Tipografía === */
  --font-head: "PT Serif", Georgia, "Times New Roman", serif;
  --font-body: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  --fs-display: clamp(2.25rem, 1.6rem + 2.8vw, 3.5rem);
  --fs-h2: clamp(1.75rem, 1.4rem + 1.6vw, 2.625rem);
  --fs-h3: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  --fs-h4: 1.25rem;
  --fs-lead: clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem);
  --fs-body: 1rem;
  --fs-small: 0.875rem;
  --fs-result: clamp(2rem, 1.5rem + 2.5vw, 3rem);
  --lh-tight: 1.15;
  --lh-base: 1.65;

  /* === Espaciado === */
  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem;
  --space-5: 1.5rem; --space-6: 2rem; --space-7: 3rem; --space-8: 4rem;
  --space-9: 5rem; --space-10: 6rem;

  /* === Layout === */
  --container-max: 1200px;
  --container-pad: clamp(1rem, 5vw, 2rem);
  --prose-max: 720px;
  --section-pad-y: clamp(3.5rem, 6vw, 6rem);
  --gap-card: var(--space-5);

  /* === Radios / sombras / bordes === */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-pill: 999px;
  --shadow-sm: 0 1px 3px rgba(5,29,75,.08);
  --shadow-md: 0 8px 24px rgba(5,29,75,.10);
  --shadow-lg: 0 16px 48px rgba(5,29,75,.14);
  --border: 1px solid var(--color-line);
  --border-strong: 1px solid var(--color-line-strong);
  --focus-ring: 0 0 0 3px rgba(0,128,181,.35);
}

/* Base recomendada */
body { font-family: var(--font-body); font-size: var(--fs-body); line-height: var(--lh-base); color: var(--color-ink); background: var(--color-surface); }
h1,h2,h3 { font-family: var(--font-head); color: var(--color-navy); line-height: var(--lh-tight); }
a { color: var(--color-blue); }
:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-sm); }
```

---

## 8. Accesibilidad (mínimos del proyecto)

- Contraste texto/fondo **AA**: cuerpo navy/ink sobre blanco (✔). Evitar texto pequeño azul `#0080B5` sobre blanco; reservar azul para CTA (texto blanco ≥16px/600), enlaces y acentos.
- Foco siempre visible (`--focus-ring`).
- Inputs con `<label>` asociado; mensajes de error con `aria-live`.
- FAQ y acordeones operables por teclado.
- Objetivos táctiles ≥44×44px.
- Respetar `prefers-reduced-motion` en las transiciones de tarjetas/resultado.

---

## 9. Checklist de homologación aplicada

- [x] Escala tipográfica fluida y coherente (sustituye saltos 14/16/22 sin sistema).
- [x] `line-height` de cuerpo a 1.65 (sitio usaba 1em).
- [x] Eliminado `text-transform: capitalize` global en prosa.
- [x] Espaciado a base 8px (sitio mezclaba 10/15/30px).
- [x] Padding de sección unificado con `clamp()`.
- [x] Negro de cuerpo suavizado a `--color-ink`.
- [x] Sombras tintadas en navy para cohesión.
- [x] Estados de color (success/warning/error) añadidos para validación de inputs.
