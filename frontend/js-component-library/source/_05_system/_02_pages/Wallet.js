import { accounts } from "./data";
import { publish, subscribe } from "./messagePubSub";

const Wallet = (el) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.containerMovements = document.querySelector(".movements");
    elements.labelBalance = document.querySelector(".balance__value");
    elements.labelSumIn = document.querySelector(".summary__value--in");
    elements.labelSumOut = document.querySelector(".summary__value--out");
    elements.labelSumInterest = document.querySelector(".summary__value--interest");
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ wallet: { elements, states, data } });
  };

  const setupEventListeners = () => {
    subscribe("login::user", (e) => {
      updateUI(data.currentAccount);
    });
  };

  const displayMovements = function (movements, sort = false) {
    elements.containerMovements.innerHTML = "";
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
      elements.containerMovements.insertAdjacentHTML("afterbegin", html);
    });
  };

  const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    elements.labelBalance.textContent = `${acc.balance}€`;
  };

  const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
      elements.labelSumIn.textContent = `${incomes}€`;

    const out = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    elements.labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
        // console.log(arr);
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    elements.labelSumInterest.textContent = `${interest}€`;
  };



  const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
  };

  init();
};

export default Wallet;