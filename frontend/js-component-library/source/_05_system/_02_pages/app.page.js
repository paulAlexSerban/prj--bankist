import { accounts } from "./data";

(() => {
  const AppPage = (el) => {
    const elements = {};
    const states = {};
    const data = {};

    const setupDomReference = () => {
      elements.el = el;
    };

    const init = () => {
      setupDomReference();
      console.log({ page: { elements, states, data } });
    };

    init();
  };

  document.querySelectorAll(`[data-js="AppPage"]`).forEach((el) => {
    AppPage(el);
  });
})();

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

  const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = "";

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
      const type = mov > 0 ? "deposit" : "withdrawal";

      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

      containerMovements.insertAdjacentHTML("afterbegin", html);
    });
  };

  const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
  };

  const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;

    const out = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
        // console.log(arr);
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
  };

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

  const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
  };

  ///////////////////////////////////////
  // Event handlers
  let currentAccount;

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
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // Update UI
      updateUI(currentAccount);
    }
  });

  btnLoan.addEventListener("click", function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
      // Add movement
      currentAccount.movements.push(amount);

      // Update UI
      updateUI(currentAccount);
    }
    inputLoanAmount.value = "";
  });

  btnClose.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(
        (acc) => acc.username === currentAccount.username
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
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
  });

  const Navigation = (el, parent) => {
    const elements = {};
    const states = {};
    const data = {};

    const setupDomReference = () => {
      elements.parent = parent;
      elements.el = el;
      elements.labelWelcome = document.querySelector(".js-welcome");
      elements.btnLogin = document.querySelector(".js-login-button");
    };

    const setupEventListeners = () => {
      elements.btnLogin.addEventListener("click", function (e) {
        e.preventDefault();
        loginAccount();
      });
    };

    const loginAccount = () => {
      currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
      );

      if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        elements.labelWelcome.textContent = `Welcome back, ${
          currentAccount.owner.split(" ")[0]
        }`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = "";
        inputLoginPin.blur();

        // Update UI
        updateUI(currentAccount);
      }
    };
    const init = () => {
      setupDomReference();
      setupEventListeners();
      console.log({ navigation: { elements, states, data } });
    };

    init();
  };

  document.querySelectorAll(`[data-js="Navigation"]`).forEach((el) => {
    Navigation(el, el.parentNode);
  });
})();
