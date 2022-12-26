
import LandingTemplate from "../_01_templates/LandingTemplate";

(() => {
  global.document.data = {};

  document.querySelectorAll(`[data-js="LandingTemplate"]`).forEach((el) => {
    LandingTemplate(el);
  });
})();
