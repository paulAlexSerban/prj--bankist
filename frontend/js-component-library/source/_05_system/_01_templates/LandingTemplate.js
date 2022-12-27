import CookieLoader from "../../_04_library/_03_modules/CookieLoader.js";
import ButtonScroll from "../../_04_library/_01_components/ButtonScroll.js";
import ModalWindow from "../../_04_library/_01_components/ModalWindow.js";
import PageNavigation from "../../_04_library/_03_modules/PageNavigation.js";

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

    document.querySelectorAll(`[data-js="ButtonScroll"]`).forEach((el) => {
      ButtonScroll(el, el.parentNode.closest("[data-js]"));
    });

    document.querySelectorAll(`[data-js="ModalWindow"]`).forEach((el) => {
      ModalWindow(el, el.parentNode.closest("[data-js]"));
    });

    document.querySelectorAll(`[data-js="PageNavigation"]`).forEach((el) => {
      PageNavigation(el, el.parentNode.closest("[data-js]"));
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
