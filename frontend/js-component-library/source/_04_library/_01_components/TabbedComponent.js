const TabbedComponent = (el, parent) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.tabs = document.querySelectorAll(".operations__tab");
    elements.tabsContainer = document.querySelector(
      ".operations__tab-container"
    );
    elements.tabsContent = document.querySelectorAll(".operations__content");
  };

  const setupEventListeners = () => {
    elements.tabsContainer.addEventListener("click", function (e) {
      const clicked = e.target.closest(".operations__tab");

      // Guard clause
      if (!clicked) return;

      // Remove active classes
      elements.tabs.forEach((tab) =>
        tab.classList.remove("operations__tab--active")
      );
      elements.tabsContent.forEach((targetContent) =>
        targetContent.classList.remove("operations__content--active")
      );

      // Activate tab
      clicked.classList.add("operations__tab--active");

      // Activate content area
      document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
    });
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ TabbedComponent: { elements, states, data } });
  };

  init();
};

export default TabbedComponent;
