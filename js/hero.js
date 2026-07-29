(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll(".hero__tab");
    var panels = document.querySelectorAll(".hero__panel-text");

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
          panel.hidden = panel.getAttribute("data-panel") !== target;
        });
      });
    });
  });
})();
