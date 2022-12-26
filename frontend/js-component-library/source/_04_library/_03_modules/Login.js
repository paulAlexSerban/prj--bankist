import { publish } from "../../_02_utils/messagePubSub";

const Login = (el) => {
  const elements = {};
  const states = {};
  const data = global.document.data;
  const accounts = global.document.accounts;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.btnLogin = document.querySelector(".js-login-button");
    elements.inputLoginUsername = document.querySelector(".js-input-user");
    elements.inputLoginPin = document.querySelector(".js-input-pin");
  };

  const setupEventListeners = () => {
    elements.btnLogin.addEventListener("click", (e) => {
      e.preventDefault();
      loginAccount();
    });
  };

  const loginAccount = () => {
    data.currentAccount = accounts.find(
      (acc) => acc.username === elements.inputLoginUsername.value
    );

    if (data.currentAccount?.pin === +elements.inputLoginPin.value) {
      clearInputFields();
      publish("login::user", data.currentAccount);
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
