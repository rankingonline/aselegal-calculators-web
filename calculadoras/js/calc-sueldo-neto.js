/* =====================================================================
   Aselegal · Calculadora de SUELDO NETO (trabajador por cuenta ajena)
   Contrato §6.3A: bruto anual − retención IRPF (tramos Andalucía 2025)
   − cotización SS trabajador (~6,35%) → neto mensual y anual.

   Lógica de cálculo derivada de ref-sueldo-neto.html (tramos IRPF por
   escalones) y adaptada al contrato del copy. La tabla de tramos oficial
   y el ejemplo del copy (25.000 € → IRPF ~15% → SS 6,35% → ≈19.662 €/año)
   prevalecen sobre la maquetación de referencia.

   --- CONTRATO DE MARKUP (ids esperados en la página) ---
   Inputs:
     #sn-bruto        number  salario bruto anual (€)
     .calc__toggle [data-sn-pagas]  botones con data-sn-pagas="12|14"
     #sn-hijos        number  nº de hijos a cargo
     #sn-discap       select  0 | 3000 | 9000  (grado de discapacidad)
     #sn-mono         checkbox  hogar monoparental (sin cónyuge con hijos)
   Salida:
     #sn-neto-mes     neto mensual (titular)
     #sn-neto-anual   neto anual
     #sn-bruto-val / #sn-ss-val / #sn-irpf-val / #sn-neto-val  (desglose)
     #sn-irpf-tipo    tipo de retención aplicado
   ===================================================================== */
(function () {
  "use strict";
  var UI = window.AselegalUI;

  /* Tramos IRPF combinados (estatal + autonómico) Andalucía 2025: 19%–47%.
     TODO: verificar — la escala autonómica de Andalucía 2025 difiere
     ligeramente en los tramos medios; aquí se usa la escala combinada
     habitual, suficiente para un cálculo orientativo. */
  var IRPF = [[12450, 0.19], [20200, 0.24], [35200, 0.30], [60000, 0.37], [300000, 0.45], [Infinity, 0.47]];

  var TIPO_SS = 0.0635;                 /* cotización trabajador ~6,35% */
  var BASE_SS_MAX_ANUAL = 4909.50 * 12; /* base máxima cotización (≈58.914 €/año) */
  var MINIMO_PERSONAL = 5550;           /* mínimo del contribuyente */
  var OTROS_GASTOS = 2000;              /* art. 19.2.f) otros gastos deducibles */
  var DESC = [2400, 2700, 4000, 4500];  /* mínimo por descendiente (4º y ss. = 4.500) */
  var RED_MONOPARENTAL = 3400;          /* aprox. reducción situación familiar 1 */

  /* art. 60 LIRPF — mínimo personal por discapacidad */
  var DISCAP_MINIMO = [0, 3000, 9000];
  /* art. 20 LIRPF — reducción adicional por rendimientos del trabajo para
     trabajadores activos con discapacidad (se suma a reduccionTrabajo) */
  var DISCAP_REDUC_TRABAJO = [0, 3500, 7750];

  function reduccionTrabajo(rnp) {
    if (rnp <= 14852) return 7302;
    if (rnp <= 19747.5) return 7302 - 1.75 * (rnp - 14852);
    return 0;
  }
  function minimoDescendientes(n) {
    var s = 0;
    for (var i = 0; i < n; i++) s += i < DESC.length ? DESC[i] : DESC[DESC.length - 1];
    return s;
  }

  var pagas = 12; /* el ejemplo del copy expresa el neto mensual con 12 pagas */

  function calc() {
    var bruto = Math.max(UI.num("sn-bruto"), 0);
    var hijos = Math.max(Math.round(UI.num("sn-hijos")), 0);
    var discapGrado = Math.min(Math.max(Math.round(UI.num("sn-discap")), 0), 2);
    var mono = document.getElementById("sn-mono");
    var esMono = mono && mono.checked;

    /* Seguridad Social (trabajador) */
    var ss = TIPO_SS * Math.min(bruto, BASE_SS_MAX_ANUAL);

    /* Retención IRPF */
    var gastos = ss + OTROS_GASTOS;
    var rnp = bruto - gastos;                              /* rendimiento neto previo */
    /* Reducción por trabajo (art. 20) + reducción adicional por discapacidad activa (art. 20 LIRPF) */
    var rendNeto = Math.max(rnp - reduccionTrabajo(rnp) - DISCAP_REDUC_TRABAJO[discapGrado], 0);
    var baseLiquidable = Math.max(rendNeto - (esMono ? RED_MONOPARENTAL : 0), 0);

    /* Mínimo personal (art. 57) + por descendientes (art. 58) + por discapacidad (art. 60) */
    var minimo = MINIMO_PERSONAL + minimoDescendientes(hijos) + DISCAP_MINIMO[discapGrado];
    var cuota = UI.progresivo(baseLiquidable, IRPF) - UI.progresivo(minimo, IRPF);
    var irpf = Math.max(cuota, 0);
    var tipo = bruto > 0 ? (irpf / bruto) * 100 : 0;

    var netoAnual = Math.max(bruto - ss - irpf, 0);
    var netoMes = netoAnual / pagas;

    set("sn-neto-mes", UI.euro(netoMes));
    set("sn-neto-anual", UI.euro(netoAnual) + " al año");
    set("sn-bruto-val", UI.euro(bruto));
    set("sn-ss-val", "− " + UI.euro(ss));
    set("sn-irpf-val", "− " + UI.euro(irpf));
    set("sn-neto-val", UI.euro(netoAnual));
    set("sn-irpf-tipo", "Retención estimada " + UI.pct(tipo, 1));
  }

  function set(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; }

  function init() {
    var root = document.getElementById("calc-sueldo-neto");
    if (!root) return;

    /* Toggle de pagas */
    var btns = root.querySelectorAll("[data-sn-pagas]");
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener("click", function () {
        pagas = parseInt(b.getAttribute("data-sn-pagas"), 10) || 12;
        Array.prototype.forEach.call(btns, function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
        calc();
      });
    });

    ["sn-bruto", "sn-hijos", "sn-discap", "sn-mono"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener(el.tagName === "SELECT" || el.type === "checkbox" ? "change" : "input", calc);
    });

    calc();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
