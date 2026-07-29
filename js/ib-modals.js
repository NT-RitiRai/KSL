(function () {
  var STORAGE_KEY = "ksl_ib_terms_accepted";

  document.addEventListener("DOMContentLoaded", function () {
    var termsOverlay = document.getElementById("ibTermsOverlay");
    var disclosuresOverlay = document.getElementById("ibDisclosuresOverlay");
    var acceptBtn = document.getElementById("ibTermsAccept");
    var closeBtn = document.getElementById("ibDisclosuresClose");

    if (!termsOverlay || !disclosuresOverlay) return;

    if (window.localStorage && window.localStorage.getItem(STORAGE_KEY)) {
      return;
    }

    function openTerms() {
      termsOverlay.classList.add("is-open");
    }

    function openDisclosures() {
      termsOverlay.classList.remove("is-open");
      disclosuresOverlay.classList.add("is-open");
    }

    function closeDisclosures() {
      disclosuresOverlay.classList.remove("is-open");
      if (window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, "1");
      }
    }

    if (acceptBtn) acceptBtn.addEventListener("click", openDisclosures);
    if (closeBtn) closeBtn.addEventListener("click", closeDisclosures);

    setTimeout(openTerms, 3000);
  });
})();
