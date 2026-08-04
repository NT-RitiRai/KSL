(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-persona-card]"));
    if (!cards.length) return;

    function setActive(target) {
      cards.forEach(function (card) {
        card.classList.toggle("is-active", card === target);
      });
    }

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        var willActivate = !card.classList.contains("is-active");
        setActive(willActivate ? card : null);
      });

      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest("[data-persona-card]")) {
        setActive(null);
      }
    });
  });
})();
