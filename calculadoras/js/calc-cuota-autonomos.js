/* =====================================================================
   Aselegal · Calculadora de CUOTA DE AUTÓNOMOS 2026
   Contrato §6.3B: rendimientos netos mensuales → tramo, base mínima,
   base máxima y cuota mínima/mes. Tipo general ≈30,6 %.

   La tabla oficial de 15 tramos 2026 (Orden de Cotización SS 2026).
   Es la fuente de la verdad: prevalece sobre la lógica simplificada
   del HTML de referencia.
   Para actualizar en años sucesivos, modificar solo el array TRAMOS.

   --- CONTRATO DE MARKUP ---
   Input:  #ca-rend   number  rendimientos netos mensuales estimados (€)
   Salida: #ca-cuota (cuota mín./mes) · #ca-tramo (rango) ·
           #ca-base-min · #ca-base-max · #ca-cuota-anual
   Tabla:  filas con class "js-tramo-row" y data-tramo="0..14" se resaltan.
   ===================================================================== */
(function () {
  "use strict";
  var UI = window.AselegalUI;

  /* Tramos de cotización por ingresos reales · 2026 (Seguridad Social, Orden de Cotización 2026) */
  var TRAMOS = [
    { hasta: 670,      baseMin: 653.59,  baseMax: 718.95,  cuota: 200.10, label: "Menos de 670 €/mes" },
    { hasta: 900,      baseMin: 718.95,  baseMax: 900.00,  cuota: 220.10, label: "Entre 670 y 900 €/mes" },
    { hasta: 1166.70,  baseMin: 849.67,  baseMax: 1166.70, cuota: 260.06, label: "Entre 900 y 1.166,70 €/mes" },
    { hasta: 1300,     baseMin: 950.98,  baseMax: 1300.00, cuota: 291.05, label: "Entre 1.166,70 y 1.300 €/mes" },
    { hasta: 1500,     baseMin: 960.78,  baseMax: 1500.00, cuota: 294.05, label: "Entre 1.300 y 1.500 €/mes" },
    { hasta: 1700,     baseMin: 960.78,  baseMax: 1700.00, cuota: 294.05, label: "Entre 1.500 y 1.700 €/mes" },
    { hasta: 1850,     baseMin: 1013.07, baseMax: 1850.00, cuota: 309.99, label: "Entre 1.700 y 1.850 €/mes" },
    { hasta: 2030,     baseMin: 1029.41, baseMax: 2030.00, cuota: 315.00, label: "Entre 1.850 y 2.030 €/mes" },
    { hasta: 2330,     baseMin: 1045.75, baseMax: 2330.00, cuota: 320.00, label: "Entre 2.030 y 2.330 €/mes" },
    { hasta: 2760,     baseMin: 1078.43, baseMax: 2760.00, cuota: 330.00, label: "Entre 2.330 y 2.760 €/mes" },
    { hasta: 3190,     baseMin: 1143.79, baseMax: 3190.00, cuota: 350.00, label: "Entre 2.760 y 3.190 €/mes" },
    { hasta: 3620,     baseMin: 1209.15, baseMax: 3620.00, cuota: 370.00, label: "Entre 3.190 y 3.620 €/mes" },
    { hasta: 4050,     baseMin: 1274.51, baseMax: 4050.00, cuota: 390.00, label: "Entre 3.620 y 4.050 €/mes" },
    { hasta: 6000,     baseMin: 1339.87, baseMax: 6000.00, cuota: 410.00, label: "Entre 4.050 y 6.000 €/mes" },
    { hasta: Infinity, baseMin: 1732.03, baseMax: 4139.40, cuota: 530.00, label: "Más de 6.000 €/mes" }
  ];

  /* "Menos de 670" = estricto < 670; el resto, límite superior inclusivo. */
  function tramoDe(rend) {
    if (rend < 670) return 0;
    for (var i = 1; i < TRAMOS.length - 1; i++) {
      if (rend <= TRAMOS[i].hasta) return i;
    }
    return TRAMOS.length - 1;
  }

  function set(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; }

  function calc() {
    var rend = Math.max(UI.num("ca-rend"), 0);
    var idx = tramoDe(rend);
    var t = TRAMOS[idx];

    set("ca-cuota", UI.euro2(t.cuota));
    set("ca-tramo", t.label);
    set("ca-base-min", UI.euro2(t.baseMin));
    set("ca-base-max", UI.euro2(t.baseMax));
    set("ca-cuota-anual", UI.euro(t.cuota * 12));

    /* Resaltar la fila de la tabla correspondiente */
    var rows = document.querySelectorAll(".js-tramo-row");
    Array.prototype.forEach.call(rows, function (r) {
      r.classList.toggle("is-highlight", parseInt(r.getAttribute("data-tramo"), 10) === idx);
    });
  }

  function init() {
    if (!document.getElementById("calc-cuota-autonomos")) return;
    var input = document.getElementById("ca-rend");
    if (input) input.addEventListener("input", calc);
    calc();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
