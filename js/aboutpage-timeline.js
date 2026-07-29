(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var row = document.getElementById("timelineRow");
    if (!row) return;

    var cards = Array.prototype.slice.call(row.querySelectorAll("[data-timeline-card]"));
    var prevBtn = document.getElementById("timelinePrev");
    var nextBtn = document.getElementById("timelineNext");
    var current = 0;

    function setActive(index) {
      current = (index + cards.length) % cards.length;
      cards.forEach(function (card, i) {
        card.classList.toggle("is-active", i === current);
      });
      cards[current].scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }

    cards.forEach(function (card, i) {
      card.addEventListener("click", function () {
        setActive(i);
      });
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { setActive(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { setActive(current + 1); });
  });
})();
