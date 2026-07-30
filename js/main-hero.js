(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("mainHero");
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll(".main-hero__slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".main-hero__dot"));
    var prevBtn = root.querySelector(".main-hero__arrow--prev");
    var nextBtn = root.querySelector(".main-hero__arrow--next");
    var current = 0;
    var AUTOPLAY_MS = 3500;
    var timer = null;

    function goTo(index) {
      var next = (index + slides.length) % slides.length;
      if (next === current) return;

      slides[current].classList.remove("is-active");
      slides[current].hidden = true;
      slides[current].setAttribute("aria-hidden", "true");

      dots[current].classList.remove("is-active");
      dots[current].setAttribute("aria-selected", "false");

      current = next;

      slides[current].hidden = false;
      slides[current].setAttribute("aria-hidden", "false");
      // Force reflow so the opacity transition runs after unhiding.
      void slides[current].offsetWidth;
      slides[current].classList.add("is-active");

      dots[current].classList.add("is-active");
      dots[current].setAttribute("aria-selected", "true");
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function restartAutoplay() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, AUTOPLAY_MS);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
        restartAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
        restartAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        restartAutoplay();
      });
    });

    root.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });

    root.addEventListener("mouseleave", restartAutoplay);

    restartAutoplay();
  });
})();
