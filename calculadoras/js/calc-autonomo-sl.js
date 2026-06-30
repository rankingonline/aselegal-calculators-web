/* =====================================================================
   Aselegal · Calculadora ¿AUTÓNOMO o SL?
   Contrato §6.3C: beneficio neto anual → comparar carga fiscal
   Autónomo (IRPF, tramos Andalucía) vs SL (IS 2026: 21 % sobre los
   primeros 50.000 €, 23 % sobre el resto para pymes < 1 M€; 25 % plano
   si facturación > 1 M€) → neto tras impuestos y diferencia.

   Modelo simplificado y deliberado (lo exige el copy): compara el IMPUESTO
   SOBRE EL BENEFICIO en cada estructura. NO incluye el coste de
   constitución/mantenimiento de la SL ni la cotización del socio-trabajador
   (así lo indica el disclaimer literal del copy). Para el análisis fino
   (sueldo + dividendos, costes fijos) → asesoramiento personalizado.

   --- CONTRATO DE MARKUP ---
   Inputs:
     #as-beneficio   number    beneficio neto anual estimado (€)
     #as-factura-1m  checkbox  facturación > 1 M€ (IS al 25 % en vez de 23 %)
   Salida:
     #as-auto-neto / #as-auto-meta   (opción Autónomo)
     #as-sl-neto   / #as-sl-meta     (opción SL)
     .as-opt-auto / .as-opt-sl       (tarjetas; reciben is-best)
     #as-msg        mensaje orientativo del punto de cruce
   ===================================================================== */
(function () {
  "use strict";
  var UI = window.AselegalUI;

  /* Tramos IRPF combinados Andalucía 2025: 19%–47% (ver nota en sueldo-neto). */
  var IRPF = [[12450, 0.19], [20200, 0.24], [35200, 0.30], [60000, 0.37], [300000, 0.45], [Infinity, 0.47]];
  var MINIMO_PERSONAL = 5550;
  var DIF_JUST_R = 0.05, DIF_JUST_CAP = 2000; /* gastos de difícil justificación */

  function irpfAutonomo(beneficio) {
    var dif = Math.min(DIF_JUST_R * beneficio, DIF_JUST_CAP);
    var base = Math.max(beneficio - dif - MINIMO_PERSONAL, 0);
    return UI.progresivo(base, IRPF);
  }

  function set(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; }

  function calcIS(beneficio, grande) {
    if (grande) return beneficio * 0.25;          /* > 1 M€ facturación: 25% plano */
    /* Pymes (< 1 M€): 21% sobre los primeros 50.000 €, 23% sobre el resto */
    return Math.min(beneficio, 50000) * 0.21 + Math.max(beneficio - 50000, 0) * 0.23;
  }

  function calc() {
    var beneficio = Math.max(UI.num("as-beneficio"), 0);
    var f1m = document.getElementById("as-factura-1m");
    var grande = f1m && f1m.checked;

    var irpf = irpfAutonomo(beneficio);
    var is = calcIS(beneficio, grande);
    var netoAuto = Math.max(beneficio - irpf, 0);
    var netoSL = Math.max(beneficio - is, 0);
    var dif = netoSL - netoAuto;
    var slMejor = dif >= 0;
    var tipoISEfectivo = beneficio > 0 ? (is / beneficio) * 100 : 0;

    set("as-auto-neto", UI.euro(netoAuto));
    set("as-auto-meta", "IRPF ≈ " + UI.euro(irpf) + " (" + UI.pct(beneficio > 0 ? irpf / beneficio * 100 : 0) + ")");
    set("as-sl-neto", UI.euro(netoSL));
    set("as-sl-meta", (grande ? "IS 25% plano" : "IS 21%/23% pyme") + " ≈ " + UI.euro(is) + " (" + UI.pct(tipoISEfectivo) + ")");

    var optAuto = document.querySelector(".as-opt-auto");
    var optSL = document.querySelector(".as-opt-sl");
    if (optAuto && optSL) {
      toggleBest(optAuto, !slMejor);
      toggleBest(optSL, slMejor);
    }

    var msg = "";
    var d = Math.abs(dif);
    if (beneficio <= 0) {
      msg = "Introduce tu beneficio neto anual estimado para ver la comparativa.";
    } else if (d < 600) {
      msg = "Estás en torno al punto de cruce (habitualmente entre 40.000 y 50.000 € de beneficio neto). A este nivel, la ventaja fiscal de la SL apenas compensa sus costes fijos: conviene analizarlo caso a caso.";
    } else if (slMejor) {
      msg = "Con este beneficio, tributar como SL te dejaría ≈ " + UI.euro(d) + " más al año en impuestos sobre el beneficio. Recuerda restar el coste de constituir y mantener la sociedad antes de decidir.";
    } else {
      msg = "Con este beneficio, seguir como autónomo te deja ≈ " + UI.euro(d) + " más al año. El punto de cruce suele situarse entre 40.000 y 50.000 € de beneficio neto.";
    }
    set("as-msg", msg);
  }

  function toggleBest(card, best) {
    card.classList.toggle("is-best", best);
    var badge = card.querySelector(".calc__opt-badge");
    if (badge) {
      badge.textContent = best ? "Mejor" : "Peor";
      badge.classList.toggle("is-best", best);
      badge.classList.toggle("is-worst", !best);
    }
  }

  function init() {
    if (!document.getElementById("calc-autonomo-sl")) return;
    ["as-beneficio", "as-factura-1m"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener(el.type === "checkbox" ? "change" : "input", calc);
    });
    calc();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
