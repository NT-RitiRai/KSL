window.toggleFooterLegal = function (e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  var btn = document.getElementById("footerLegalToggle");
  var expanded = document.getElementById("footerLegalExpanded");
  if (!expanded || !btn) return;
  var isCurrentlyHidden = expanded.hasAttribute("hidden") || expanded.style.display === "none";
  if (isCurrentlyHidden) {
    expanded.removeAttribute("hidden");
    expanded.style.display = "flex";
    btn.setAttribute("aria-expanded", "true");
    btn.textContent = "Read less";
  } else {
    expanded.setAttribute("hidden", "hidden");
    expanded.style.display = "none";
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "Read more";
  }
};

(function () {
  function initMainHeader() {
    var toggle = document.getElementById("navMobileToggle");
    var navLinks = document.getElementById("navLinks");
    var overlay = document.getElementById("navMobileOverlay");

    function closeMobileNav() {
      if (navLinks) navLinks.classList.remove("is-open");
      if (toggle) {
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
      document.body.classList.remove("mobile-nav-open");
    }

    var drawerClose = document.getElementById("navDrawerClose");
    if (drawerClose) {
      drawerClose.onclick = function (e) {
        e.preventDefault();
        closeMobileNav();
      };
    }

    if (toggle && navLinks) {
      toggle.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = navLinks.classList.contains("is-open");
        if (isOpen) {
          closeMobileNav();
        } else {
          navLinks.classList.add("is-open");
          toggle.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
          document.body.classList.add("mobile-nav-open");
          navLinks.scrollTop = 0;
          // Keep forcing scrollTop back to 0 for a short window after opening.
          // Async image/font loads inside the always-expanded products flyout
          // can shift layout after the drawer opens, and some browsers'
          // scroll-anchoring will silently scroll the drawer down to
          // compensate — a couple of one-shot timeouts isn't reliably enough
          // to outlast that, so poll via rAF for ~600ms instead.
          var resetDeadline = Date.now() + 600;
          function forceScrollTop() {
            if (!navLinks || !navLinks.classList.contains("is-open")) return;
            navLinks.scrollTop = 0;
            if (Date.now() < resetDeadline && window.requestAnimationFrame) {
              window.requestAnimationFrame(forceScrollTop);
            }
          }
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(forceScrollTop);
          } else {
            setTimeout(function () {
              if (navLinks) navLinks.scrollTop = 0;
            }, 50);
            setTimeout(function () {
              if (navLinks) navLinks.scrollTop = 0;
            }, 250);
          }
        }
      };

      if (overlay) {
        overlay.onclick = function (e) {
          e.preventDefault();
          closeMobileNav();
        };
      }

      document.addEventListener("click", function (e) {
        if (navLinks.classList.contains("is-open") && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
          closeMobileNav();
        }
      });

      var navAnchors = navLinks.querySelectorAll("a:not(#navLoginToggle)");
      navAnchors.forEach(function (link) {
        link.addEventListener("click", function () {
          closeMobileNav();
        });
      });
    }

    var loginItem = document.getElementById("navLoginItem");
    var loginToggle = document.getElementById("navLoginToggle");

    if (loginItem && loginToggle) {
      // Desktop hover is handled purely by CSS (.nav__login-item:hover
      // .nav__login-menu), so click is the only JS-driven toggle here.
      // mouseenter/mouseleave listeners used to duplicate that, but touch
      // devices synthesize mouseenter+mouseleave right around a tap, which
      // raced with this click handler and made the dropdown flash open then
      // immediately close instead of staying open.
      loginToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var isOpen = loginItem.classList.contains("is-open");
        if (isOpen) {
          loginItem.classList.remove("is-open");
          loginToggle.setAttribute("aria-expanded", "false");
        } else {
          loginItem.classList.add("is-open");
          loginToggle.setAttribute("aria-expanded", "true");
        }
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
      menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
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
      footerLegalToggle.addEventListener("click", function (e) {
        window.toggleFooterLegal(e);
      });
    }

    var committeeTermsToggle = document.getElementById("committeeTermsToggle");
    var committeeTermsExpanded = document.getElementById("committeeTermsExpanded");

    if (committeeTermsToggle && committeeTermsExpanded) {
      committeeTermsToggle.addEventListener("click", function () {
        var isHidden = committeeTermsExpanded.hasAttribute("hidden");
        if (isHidden) {
          committeeTermsExpanded.removeAttribute("hidden");
          committeeTermsToggle.setAttribute("aria-expanded", "true");
          committeeTermsToggle.textContent = "Read less";
        } else {
          committeeTermsExpanded.setAttribute("hidden", "hidden");
          committeeTermsToggle.setAttribute("aria-expanded", "false");
          committeeTermsToggle.textContent = "Read more";
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMainHeader);
  } else {
    initMainHeader();
  }
})();
