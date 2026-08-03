(function () {
  var STORAGE_KEY = "ksl_od_residency_confirmed";

  document.addEventListener("DOMContentLoaded", function () {
    var overlay = document.getElementById("odResidencyOverlay");
    var form = document.getElementById("odResidencyForm");

    if (!overlay || !form) return;

    if (window.localStorage && window.localStorage.getItem(STORAGE_KEY)) {
      return;
    }

    overlay.classList.add("is-open");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      overlay.classList.remove("is-open");
      if (window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, "1");
      }

      var tokenMeta = document.querySelector('meta[name="csrf-token"]');
      if (tokenMeta) {
        fetch("/consent-submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": tokenMeta.getAttribute("content"),
          },
          body: JSON.stringify({
            consent_type: "offer-document-residency",
            page_url: window.location.href,
          }),
        }).catch(function () {});
      }
    });
  });
})();
