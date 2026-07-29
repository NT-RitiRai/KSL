(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var items = document.querySelectorAll(".faq__item");

    items.forEach(function (item) {
      var question = item.querySelector(".faq__question");
      if (!question) return;

      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        items.forEach(function (other) {
          other.classList.remove("is-open");
          var btn = other.querySelector(".faq__question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("is-open");
          question.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
})();
