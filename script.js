(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("navMobileToggle");
    var navLinks = document.getElementById("navLinks");

    if (toggle && navLinks) {
      toggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    var loginItem = document.getElementById("navLoginItem");
    var loginToggle = document.getElementById("navLoginToggle");

    if (loginItem && loginToggle) {
      loginToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var isOpen = loginItem.classList.toggle("is-open");
        loginToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      document.addEventListener("click", function (event) {
        if (!loginItem.contains(event.target)) {
          loginItem.classList.remove("is-open");
          loginToggle.setAttribute("aria-expanded", "false");
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          loginItem.classList.remove("is-open");
          loginToggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    var menuItem = document.getElementById("navMenuItem");
    var menuToggle = document.getElementById("navMenuToggle");

    if (menuItem && menuToggle) {
      menuToggle.addEventListener("click", function () {
        var isOpen = menuItem.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      document.addEventListener("click", function (event) {
        if (!menuItem.contains(event.target)) {
          menuItem.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          menuItem.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    if (navLinks) {
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          navLinks.classList.remove("is-open");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    var footerLegalToggle = document.getElementById("footerLegalToggle");
    var footerLegalExpanded = document.getElementById("footerLegalExpanded");

    if (footerLegalToggle && footerLegalExpanded) {
      footerLegalToggle.addEventListener("click", function () {
        var isOpen = footerLegalExpanded.hidden;
        footerLegalExpanded.hidden = !isOpen;
        footerLegalToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        footerLegalToggle.textContent = isOpen ? "less" : "Read more";
      });
    }
  });
})();
