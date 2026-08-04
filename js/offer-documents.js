(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".od-tabs__tab"));
    var panels = Array.prototype.slice.call(document.querySelectorAll(".od-tabpanel"));
    var pagination = document.querySelector("[data-pagination]");
    if (!tabs.length || !panels.length || !pagination) return;

    var pageNumbersEl = pagination.querySelector("[data-page-numbers]");
    var prevBtn = pagination.querySelector("[data-page-prev]");
    var nextBtn = pagination.querySelector("[data-page-next]");

    var activePanel = panels.find(function (p) { return !p.hidden; }) || panels[0];
    var currentPage = 1;

    function getTotalPages(panel) {
      var cards = panel.querySelectorAll(".od-card");
      var max = 1;
      cards.forEach(function (card) {
        var p = parseInt(card.getAttribute("data-page"), 10) || 1;
        if (p > max) max = p;
      });
      return max;
    }

    function renderPage() {
      var totalPages = getTotalPages(activePanel);
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      activePanel.querySelectorAll(".od-card").forEach(function (card) {
        var p = parseInt(card.getAttribute("data-page"), 10) || 1;
        card.hidden = p !== currentPage;
      });

      pageNumbersEl.innerHTML = "";
      for (var i = 1; i <= totalPages; i++) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "od-page" + (i === currentPage ? " od-page--active" : "");
        btn.textContent = i < 10 ? "0" + i : String(i);
        if (i === currentPage) btn.setAttribute("aria-current", "page");
        (function (page) {
          btn.addEventListener("click", function () {
            currentPage = page;
            renderPage();
          });
        })(i);
        pageNumbersEl.appendChild(btn);
      }

      prevBtn.disabled = currentPage <= 1;
      nextBtn.disabled = currentPage >= totalPages;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");

        tabs.forEach(function (t) {
          var isActive = t === tab;
          t.classList.toggle("is-active", isActive);
          t.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        panels.forEach(function (panel) {
          var isTarget = panel.getAttribute("data-tabpanel") === target;
          panel.hidden = !isTarget;
          if (isTarget) activePanel = panel;
        });

        currentPage = 1;
        renderPage();
      });
    });

    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage -= 1;
        renderPage();
      }
    });

    nextBtn.addEventListener("click", function () {
      var totalPages = getTotalPages(activePanel);
      if (currentPage < totalPages) {
        currentPage += 1;
        renderPage();
      }
    });

    renderPage();
  });
})();
