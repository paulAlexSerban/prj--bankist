import { subscribe } from "../../_02_utils/messagePubSub";

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
      elements.labelWelcome.textContent = `Welcome back, ${
        data.currentAccount.owner.split(" ")[0]
      }`;
    });

    subscribe("timer:logout", () => {
      elements.labelWelcome.textContent = "Log in to get started";
    });
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ navigation: { elements, states, data } });
  };

  init();
};

export default Navigation;
