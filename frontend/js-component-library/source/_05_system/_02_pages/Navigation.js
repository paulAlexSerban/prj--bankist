import { accounts } from "./data";
import { publish, subscribe } from "./messagePubSub";

const Navigation = (el, parent) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.labelWelcome = document.querySelector(".js-welcome");
    elements.containerApp = document.querySelector("#app-container");
  };

  const setupEventListeners = () => {
    subscribe("login::user", () => {
      displayUI();
    });
  };

  const displayUI = () => {
    elements.labelWelcome.textContent = `Welcome back, ${
      data.currentAccount.owner.split(" ")[0]
    }`;
    elements.containerApp.style.opacity = 100;
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ navigation: { elements, states, data } });
  };

  init();
};

export default Navigation;
