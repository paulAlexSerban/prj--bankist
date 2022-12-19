import { accounts } from "../../_01_abstracts/constants/data";
import AppPageTemplate from "../_01_templates/AppPageTemplate";

(() => {
  global.document.data = {};
  global.document.accounts = accounts;
  const createUsernames = (accs) => {
    accs.forEach((acc) => {
      acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
    });
  };

  createUsernames(global.document.accounts);

  document.querySelectorAll(`[data-js="AppPageTemplate"]`).forEach((el) => {
    AppPageTemplate(el);
  });
})();
