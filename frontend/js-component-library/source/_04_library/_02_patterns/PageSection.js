const PageSection = (el, parent) => {
  const elements = {};
  const states = {
    scrollPosition:
      window.scrollY ||
      window.scrollTop ||
      document.getElementsByTagName("html")[0].scrollTop,
  };
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.allSections = document.querySelectorAll(".section");
  };

  const setupEventListeners = () => {};

  const revealSection = (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const setupIntersectionObserver = () => {
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    elements.allSections.forEach((section) => {
      sectionObserver.observe(section);
      if (!(states.scrollPosition === 0))
        section.classList.add("section--hidden");
    });
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    setupIntersectionObserver();

    console.log({ PageSection: { elements, states, data } });
  };

  init();
};

export default PageSection;
