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
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ PageNavigation: { elements, states, data } });
  };

  init();
};

export default PageNavigation;
