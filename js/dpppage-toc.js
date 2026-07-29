(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll(".dpppage-toc__link");
    var sections = document.querySelectorAll(".dpppage-section");
    if (!links.length || !sections.length) return;

    var linksById = {};
    links.forEach(function (link) {
      linksById[link.getAttribute("href").slice(1)] = link;
    });

    var setActive = function (id) {
      links.forEach(function (link) {
        link.classList.remove("is-active");
      });
      if (linksById[id]) linksById[id].classList.add("is-active");
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  });
})();
