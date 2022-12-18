import { accounts } from "./data";
import { publish, subscribe } from "./messagePubSub";

const Login = (el) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.btnLogin = document.querySelector(".js-login-button");
    elements.inputLoginUsername = document.querySelector(".js-input-user");
    elements.inputLoginPin = document.querySelector(".js-input-pin");
  };

  const setupEventListeners = () => {
    elements.btnLogin.addEventListener("click", function (e) {
      e.preventDefault();
      loginAccount();
    });
  };

  const loginAccount = () => {
    data.currentAccount = accounts.find(
      (acc) => acc.username === elements.inputLoginUsername.value
    );

    if (data.currentAccount?.pin === Number(elements.inputLoginPin.value)) {
      clearInputFields();
      publish("login::user", data.currentAccount);
      // updateUI(data.currentAccount); // use publish/subscibe to trigger displayUI from wallet
    }
  };

  const clearInputFields = () => {
    elements.inputLoginUsername.value = elements.inputLoginPin.value = "";
    elements.inputLoginPin.blur();
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ login: { elements, states, data } });
  };

  init();
};

export default Login;
