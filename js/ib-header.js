(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var mobileToggle = document.getElementById("ibNavMobileToggle");
    var navLinks = document.getElementById("ibNavLinks");

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    var menuItem = document.getElementById("ibNavMenuItem");
    var menuToggle = document.getElementById("ibNavMenuToggle");

    var dropdowns = [
      { wrap: document.getElementById("ibCharterDropdown"), toggle: document.getElementById("ibCharterToggle") },
      { wrap: document.getElementById("ibTransactionsDropdown"), toggle: document.getElementById("ibTransactionsToggle") },
    ];

    function closeAll(except) {
      dropdowns.forEach(function (d) {
        if (d.wrap && d.wrap !== except) {
          d.wrap.classList.remove("is-open");
          d.toggle.setAttribute("aria-expanded", "false");
        }
      });
      if (menuItem && menuItem !== except) {
        menuItem.classList.remove("is-open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      }
    }

    dropdowns.forEach(function (d) {
      if (!d.wrap || !d.toggle) return;
      d.toggle.addEventListener("click", function () {
        var isOpen = d.wrap.classList.contains("is-open");
        closeAll();
        if (!isOpen) {
          d.wrap.classList.add("is-open");
          d.toggle.setAttribute("aria-expanded", "true");
        }
      });
    });

    if (menuItem && menuToggle) {
      menuToggle.addEventListener("click", function () {
        var isOpen = menuItem.classList.contains("is-open");
        closeAll();
        if (!isOpen) {
          menuItem.classList.add("is-open");
          menuToggle.setAttribute("aria-expanded", "true");
        }
      });
    }

    document.addEventListener("click", function (event) {
      var target = event.target;
      var insideAny = dropdowns.some(function (d) { return d.wrap && d.wrap.contains(target); }) || (menuItem && menuItem.contains(target));
      if (!insideAny) closeAll();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeAll();
    });

    if (navLinks) {
      navLinks.querySelectorAll(".nav__flyout a").forEach(function (link) {
        link.addEventListener("click", function () {
          navLinks.classList.remove("is-open");
          if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  });
})();
