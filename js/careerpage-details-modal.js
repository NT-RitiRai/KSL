(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("jobModal");
    if (!modal) return;

    var openers = document.querySelectorAll("[data-job-modal-open]");
    var closers = modal.querySelectorAll("[data-job-modal-close]");
    var lastFocused = null;

    function openModal(event) {
      if (event) event.preventDefault();
      lastFocused = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var closeBtn = modal.querySelector(".job-modal__close");
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    openers.forEach(function (opener) {
      opener.addEventListener("click", openModal);
    });

    closers.forEach(function (closer) {
      closer.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  });
})();
