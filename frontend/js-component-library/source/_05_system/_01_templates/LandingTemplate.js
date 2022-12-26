import CookieLoader from "../../_04_library/_03_modules/CookieLoader.js";

const LandingTemplate = (el) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.el = el;
  };

  const loadComponents = () => {
    document.querySelectorAll(`[data-js="CookieLoader"]`).forEach((el) => {
      CookieLoader(el, el.parentNode.closest("[data-js]"));
    });
  };

  const init = () => {
    setupDomReference();
    loadComponents();
    console.log({ page: { elements, states, data } });
  };

  init();
};

export default LandingTemplate;
