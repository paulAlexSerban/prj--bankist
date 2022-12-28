const PageHeader = (el, parent) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;

    elements.header = document.querySelector(".header");
    elements.nav = document.querySelector(".nav");
  };

  const setupEventListeners = () => {};

  const stickyNav = (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) elements.nav.classList.add("sticky");
    else elements.nav.classList.remove("sticky");
  };

  const setupIntersectionObserver = () => {
    states.navHeight = elements.nav.getBoundingClientRect().height;
    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${states.navHeight}px`,
    });

    headerObserver.observe(elements.header);
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    setupIntersectionObserver();
    console.log({ PageHeader: { elements, states, data } });
  };

  init();
};

export default PageHeader;
