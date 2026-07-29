(function () {
  "use strict";

  function initToggle(toggleBtn) {
    var wrap = toggleBtn.closest(".testimonials__quote-wrap");
    if (!wrap) return;

    toggleBtn.addEventListener("click", function () {
      var expanded = wrap.classList.toggle("is-expanded");
      toggleBtn.textContent = expanded ? "Read less" : "Read more";
      toggleBtn.setAttribute("aria-expanded", String(expanded));
    });
  }

  function init() {
    var toggles = document.querySelectorAll("[data-testimonial-toggle]");
    toggles.forEach(initToggle);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
