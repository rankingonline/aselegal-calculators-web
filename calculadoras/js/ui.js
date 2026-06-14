/* =====================================================================
   Aselegal · Calculadoras — ui.js
   Helpers compartidos (formato € y %, validación) + comportamiento de UI
   (menú móvil, acordeón FAQ accesible). Sin dependencias.
   Se carga con `defer` antes de los scripts de cálculo.
   ===================================================================== */
(function (global) {
  "use strict";

  /* ---- Formato es-ES ---- */
  var nf0 = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 });
  var nf2 = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /** Entero con separador de miles + " €"  ->  "1.638 €" */
  function euro(n) {
    if (!isFinite(n)) n = 0;
    return nf0.format(Math.round(n)) + " €";
  }
  /** Dos decimales + " €"  ->  "1.029,41 €" */
  function euro2(n) {
    if (!isFinite(n)) n = 0;
    return nf2.format(n) + " €";
  }
  /** Porcentaje con coma decimal  ->  "6,35 %" */
  function pct(n, decimals) {
    if (decimals == null) decimals = 1;
    if (!isFinite(n)) n = 0;
    return n.toLocaleString("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + " %";
  }

  /** Lee un input numérico de forma segura (NaN -> 0). */
  function num(id) {
    var el = typeof id === "string" ? document.getElementById(id) : id;
    if (!el) return 0;
    var v = parseFloat(String(el.value).replace(",", "."));
    return isNaN(v) ? 0 : v;
  }

  /** Acota un valor a [min, max]. */
  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  /** Valor del radio marcado de un grupo `name`, o null. */
  function radio(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  /**
   * IRPF progresivo por escalones (cuota íntegra).
   * brackets: array [límiteSuperior, tipo]. Último límite = Infinity.
   * Se usa para autónomo/sueldo neto (tramos Andalucía 2025: 19%–47%).
   */
  function progresivo(base, brackets) {
    if (base <= 0) return 0;
    var tax = 0, prev = 0;
    for (var i = 0; i < brackets.length; i++) {
      var top = brackets[i][0], rate = brackets[i][1];
      if (base > top) { tax += (top - prev) * rate; prev = top; }
      else { tax += (base - prev) * rate; break; }
    }
    return tax;
  }

  global.AselegalUI = {
    euro: euro, euro2: euro2, pct: pct,
    num: num, clamp: clamp, radio: radio, progresivo: progresivo
  };

  /* ---- Comportamiento de UI (al cargar el DOM) ---- */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* Menú móvil */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      });
    }

    /* Acordeón FAQ accesible */
    var questions = document.querySelectorAll(".faq__question");
    Array.prototype.forEach.call(questions, function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq__item");
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        if (item) item.classList.toggle("is-open", !expanded);
      });
    });
  });
})(window);
