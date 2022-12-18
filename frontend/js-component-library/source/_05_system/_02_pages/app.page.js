import { accounts } from "./data";
import { publish, subscribe } from "./messagePubSub";
import Navigation from "./Navigation";
import Wallet from "./Wallet";
import AppPageTemplate from "./AppPageTemplate";
import Login from "./Login";

(() => {
  /////////////////////////////////////////////////
  // Elements

  const labelDate = document.querySelector(".date");
  const labelBalance = document.querySelector(".balance__value");
  const labelSumIn = document.querySelector(".summary__value--in");
  const labelSumOut = document.querySelector(".summary__value--out");
  const labelSumInterest = document.querySelector(".summary__value--interest");
  const labelTimer = document.querySelector(".timer");

  const containerApp = document.querySelector("#app-container");
  const containerMovements = document.querySelector(".movements");

  const btnTransfer = document.querySelector(".form__btn--transfer");
  const btnLoan = document.querySelector(".form__btn--loan");
  const btnClose = document.querySelector(".form__btn--close");
  const btnSort = document.querySelector(".btn--sort");

  const inputLoginUsername = document.querySelector(".login__input--user");
  const inputLoginPin = document.querySelector(".login__input--pin");
  const inputTransferTo = document.querySelector(".form__input--to");
  const inputTransferAmount = document.querySelector(".form__input--amount");
  const inputLoanAmount = document.querySelector(".form__input--loan-amount");
  const inputCloseUsername = document.querySelector(".form__input--user");
  const inputClosePin = document.querySelector(".form__input--pin");

  /////////////////////////////////////////////////
  // Functions



  const createUsernames = function (accs) {
    accs.forEach(function (acc) {
      acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
    });
  };
  createUsernames(accounts);

  ///////////////////////////////////////
  // Event handlers

  btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = "";

    if (
      amount > 0 &&
      receiverAcc &&
      global.document.data.currentAccount.balance >= amount &&
      receiverAcc?.username !== global.document.data.currentAccount.username
    ) {
      // Doing the transfer
      global.document.data.currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // Update UI
      updateUI(global.document.data.currentAccount);
    }
  });

  btnLoan.addEventListener("click", function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
      amount > 0 &&
      global.document.data.currentAccount.movements.some(
        (mov) => mov >= amount * 0.1
      )
    ) {
      // Add movement
      global.document.data.currentAccount.movements.push(amount);

      // Update UI
      updateUI(global.document.data.currentAccount);
    }
    inputLoanAmount.value = "";
  });

  btnClose.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      inputCloseUsername.value ===
        global.document.data.currentAccount.username &&
      Number(inputClosePin.value) === global.document.data.currentAccount.pin
    ) {
      const index = accounts.findIndex(
        (acc) => acc.username === global.document.data.currentAccount.username
      );
      console.log(index);
      // .indexOf(23)

      // Delete account
      accounts.splice(index, 1);

      // Hide UI
      containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = "";
  });

  let sorted = false;
  btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(global.document.data.currentAccount.movements, !sorted);
    sorted = !sorted;
  });
})();

(() => {
  document.querySelectorAll(`[data-js="AppPage"]`).forEach((el) => {
    AppPageTemplate(el);
  });

  document.querySelectorAll(`[data-js="Login"]`).forEach((el) => {
    Login(el, el.parentNode.closest("[data-js]"));
  });

  document.querySelectorAll(`[data-js="Navigation"]`).forEach((el) => {
    Navigation(el, el.parentNode.closest("[data-js]"));
  });

  document.querySelectorAll(`[data-js="Wallet"]`).forEach((el) => {
    Wallet(el, el.parentNode.closest("[data-js]"));
  });
})();
