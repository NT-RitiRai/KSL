(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var filters = document.querySelectorAll(".faqpage-list__filter");

    filters.forEach(function (filter) {
      filter.addEventListener("click", function () {
        filters.forEach(function (other) {
          other.classList.remove("is-active");
          other.setAttribute("aria-selected", "false");
        });
        filter.classList.add("is-active");
        filter.setAttribute("aria-selected", "true");
      });
    });
  });
})();
