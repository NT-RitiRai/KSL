(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var pagination = document.querySelector("[data-pagination]");
    var grid = document.querySelector(".tr-grid__rows");
    if (!pagination || !grid) return;

    var pageNumbersEl = pagination.querySelector("[data-page-numbers]");
    var prevBtn = pagination.querySelector("[data-page-prev]");
    var nextBtn = pagination.querySelector("[data-page-next]");
    var currentPage = 1;

    function getTotalPages() {
      var cards = grid.querySelectorAll(".ib-track__card");
      var max = 1;
      cards.forEach(function (card) {
        var p = parseInt(card.getAttribute("data-page"), 10) || 1;
        if (p > max) max = p;
      });
      return max;
    }

    function renderPage() {
      var totalPages = getTotalPages();
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      grid.querySelectorAll(".ib-track__card").forEach(function (card) {
        var p = parseInt(card.getAttribute("data-page"), 10) || 1;
        card.hidden = p !== currentPage;
      });

      pageNumbersEl.innerHTML = "";
      for (var i = 1; i <= totalPages; i++) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tr-page" + (i === currentPage ? " tr-page--active" : "");
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

    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage -= 1;
        renderPage();
      }
    });

    nextBtn.addEventListener("click", function () {
      var totalPages = getTotalPages();
      if (currentPage < totalPages) {
        currentPage += 1;
        renderPage();
      }
    });

    renderPage();
  });
})();
