import AppNavigation from "../../_04_library/_03_modules/AppNavigation";
import Wallet from "../../_04_library/_03_modules/Wallet";
import Login from "../../_04_library/_03_modules/Login";

const AppPageTemplate = (el) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.el = el;
  };

  const loadComponents = () => {
    document.querySelectorAll(`[data-js="Login"]`).forEach((el) => {
      Login(el, el.parentNode.closest("[data-js]"));
    });

    document.querySelectorAll(`[data-js="Navigation"]`).forEach((el) => {
      AppNavigation(el, el.parentNode.closest("[data-js]"));
    });

    document.querySelectorAll(`[data-js="Wallet"]`).forEach((el) => {
      Wallet(el, el.parentNode.closest("[data-js]"));
    });
  };

  const init = () => {
    setupDomReference();
    loadComponents();
    console.log({ page: { elements, states, data } });
  };

  init();
};

export default AppPageTemplate;
