(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll(".hero__tab");
    var panels = document.querySelectorAll(".hero__panel-text");
    var cta = document.getElementById("heroPanelCta");

    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");

        tabs.forEach(function (t) {
          var isActive = t === tab;
          t.classList.toggle("is-active", isActive);
          t.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        panels.forEach(function (panel) {
          var isTarget = panel.getAttribute("data-panel") === target;
          panel.hidden = !isTarget;
          if (isTarget && cta) {
            var href = panel.getAttribute("data-href");
            if (href) cta.setAttribute("href", href);
          }
        });
      });
    });
  });
})();
