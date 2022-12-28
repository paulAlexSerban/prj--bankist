const LazyImage = (el, parent) => {
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
    elements.imgTargets = document.querySelectorAll("img[data-src]");
  };

  const setupEventListeners = () => {};

  const setupIntersectionObserver = () => {
    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: "200px",
    });

    elements.imgTargets.forEach((img) => imgObserver.observe(img));
  };

  // Lazy loading images
  const loadImg = (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    setupIntersectionObserver();
    console.log({ LazyImage: { elements, states, data } });
  };

  init();
};

export default LazyImage;
