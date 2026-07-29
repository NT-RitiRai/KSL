(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll(".charges-table__tab");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (other) {
          other.classList.remove("is-active");
          other.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
      });
    });
  });
})();
