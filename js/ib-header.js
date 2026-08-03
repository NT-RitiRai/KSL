(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var mobileToggle = document.getElementById("ibNavMobileToggle");
    var navLinks = document.getElementById("ibNavLinks");
    var overlay = document.getElementById("navMobileOverlay");

    function closeMobileNav() {
      if (navLinks) navLinks.classList.remove("is-open");
      if (mobileToggle) {
        mobileToggle.classList.remove("is-open");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
      document.body.classList.remove("mobile-nav-open");
    }

    var drawerClose = document.getElementById("ibNavDrawerClose");
    if (drawerClose) {
      drawerClose.onclick = function (e) {
        e.preventDefault();
        closeMobileNav();
      };
    }

    if (mobileToggle && navLinks) {
      mobileToggle.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = navLinks.classList.contains("is-open");
        if (isOpen) {
          closeMobileNav();
        } else {
          navLinks.classList.add("is-open");
          mobileToggle.classList.add("is-open");
          mobileToggle.setAttribute("aria-expanded", "true");
          document.body.classList.add("mobile-nav-open");
          navLinks.scrollTop = 0;
          setTimeout(function () {
            if (navLinks) navLinks.scrollTop = 0;
          }, 50);
        }
      };

      if (overlay) {
        overlay.onclick = function (e) {
          e.preventDefault();
          closeMobileNav();
        };
      }
    }

    var menuItem = document.getElementById("ibNavMenuItem");
    var menuToggle = document.getElementById("ibNavMenuToggle");

    var dropdowns = [
      { wrap: document.getElementById("ibCharterDropdown"), toggle: document.getElementById("ibCharterToggle") },
      { wrap: document.getElementById("ibTransactionsDropdown"), toggle: document.getElementById("ibTransactionsToggle") },
    ];

    function closeAllDropdowns(except) {
      dropdowns.forEach(function (d) {
        if (d.wrap && d.wrap !== except) {
          d.wrap.classList.remove("is-open");
          if (d.toggle) d.toggle.setAttribute("aria-expanded", "false");
        }
      });
      if (menuItem && menuItem !== except) {
        menuItem.classList.remove("is-open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      }
    }

    dropdowns.forEach(function (d) {
      if (!d.wrap || !d.toggle) return;
      d.toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = d.wrap.classList.contains("is-open");
        closeAllDropdowns(d.wrap);
        if (!isOpen) {
          d.wrap.classList.add("is-open");
          d.toggle.setAttribute("aria-expanded", "true");
        }
      });
    });

    if (menuItem && menuToggle) {
      menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = menuItem.classList.contains("is-open");
        closeAllDropdowns(menuItem);
        if (!isOpen) {
          menuItem.classList.add("is-open");
          menuToggle.setAttribute("aria-expanded", "true");
        }
      });
    }

    document.addEventListener("click", function (event) {
      var target = event.target;
      var insideAny = dropdowns.some(function (d) { return d.wrap && d.wrap.contains(target); }) || (menuItem && menuItem.contains(target));
      if (!insideAny) closeAllDropdowns();

      if (navLinks && navLinks.classList.contains("is-open") && !navLinks.contains(target) && mobileToggle && !mobileToggle.contains(target)) {
        closeMobileNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeAllDropdowns();
        closeMobileNav();
      }
    });

    if (navLinks) {
      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          closeMobileNav();
        });
      });
    }
  });
})();
