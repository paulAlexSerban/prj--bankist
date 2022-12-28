const PageNavigation = (el, parent) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.navLinks = document.querySelector(".nav__links");
  };

  const setupEventListeners = () => {
    elements.navLinks.addEventListener("click", (e) => {
      e.preventDefault();

      // Matching strategy
      if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      }
    });

    // Passing "argument" into handler
    elements.el.addEventListener("mouseover", (e) => {
      handleHover(e, 0.5);
    });
    elements.el.addEventListener("mouseout", (e) => {
      handleHover(e, 1);
    });
  };

  const handleHover = (e, opacity) => {
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");
      const logo = link.closest(".nav").querySelector("img");

      siblings.forEach((el) => {
        if (el !== link) el.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
    }
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ PageNavigation: { elements, states, data } });
  };

  init();
};

export default PageNavigation;
