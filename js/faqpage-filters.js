(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var filters = document.querySelectorAll(".faqpage-list__filter");
    var items = document.querySelectorAll(".faqpage-list .faq__item, .faq .faq__item");

    filters.forEach(function (filter) {
      filter.addEventListener("click", function () {
        filters.forEach(function (other) {
          other.classList.remove("is-active");
          other.setAttribute("aria-selected", "false");
        });
        filter.classList.add("is-active");
        filter.setAttribute("aria-selected", "true");

        var category = (filter.getAttribute("data-category") || filter.textContent.trim().toLowerCase()).replace(/[^a-z0-9]/g, "");

        items.forEach(function (item) {
          var itemCat = (item.getAttribute("data-category") || item.textContent.trim().toLowerCase()).toLowerCase().replace(/[^a-z0-9]/g, "");
          if (category === "all" || category === "" || itemCat.indexOf(category) !== -1 || category.indexOf(itemCat) !== -1) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  });
})();
