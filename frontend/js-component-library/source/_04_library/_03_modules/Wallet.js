import { publish, subscribe } from "../../_02_utils/messagePubSub";

const Wallet = (el) => {
  const elements = {};
  const states = {
    sorted: false,
  };
  const data = global.document.data;
  const accounts = global.document.accounts;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.containerMovements = document.querySelector(".movements");
    elements.labelBalance = document.querySelector(".balance__value");
    elements.labelSumIn = document.querySelector(".summary__value--in");
    elements.labelSumOut = document.querySelector(".summary__value--out");
    elements.labelSumInterest = document.querySelector(
      ".summary__value--interest"
    );
    elements.btnTransfer = document.querySelector(".form__btn--transfer");
    elements.inputTransferAmount = document.querySelector(
      ".form__input--amount"
    );
    elements.inputTransferTo = document.querySelector(".form__input--to");
    elements.btnLoan = document.querySelector(".form__btn--loan");
    elements.inputLoanAmount = document.querySelector(
      ".form__input--loan-amount"
    );
    elements.btnClose = document.querySelector(".form__btn--close");
    elements.inputCloseUsername = document.querySelector(".form__input--user");
    elements.inputClosePin = document.querySelector(".form__input--pin");
    elements.btnSort = document.querySelector(".btn--sort");
    elements.labelTimer = document.querySelector(".timer");
    elements.labelDate = document.querySelector(".date");
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ wallet: { elements, states, data } });
    console.log(accounts);
  };

  const setupEventListeners = () => {
    subscribe("login::user", (e) => {
      updateUI(data.currentAccount);
      toggleWallet();
    });

    elements.btnTransfer.addEventListener("click", function (e) {
      e.preventDefault();
      const amount = +elements.inputTransferAmount.value;
      const receiverAcc = getReceiverAccount();
      elements.inputTransferAmount.value = elements.inputTransferTo.value = "";

      if (
        amount > 0 &&
        receiverAcc &&
        data.currentAccount.balance >= amount &&
        receiverAcc?.username !== data.currentAccount.username
      ) {
        // Doing the transfer
        data.currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Add transfer date
        data.currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(data.currentAccount);

        // Reset timer
        clearInterval(data.timer);
        data.timer = startLogOutTimer();
      }
    });

    elements.btnLoan.addEventListener("click", function (e) {
      e.preventDefault();

      const amount = Math.floor(elements.inputLoanAmount.value);

      if (
        amount > 0 &&
        data.currentAccount.movements.some((mov) => mov >= amount * 0.1)
      ) {
        setTimeout(function () {
          // Add movement
          data.currentAccount.movements.push(amount);

          // Add loan date
          data.currentAccount.movementsDates.push(new Date().toISOString());

          // Update UI
          updateUI(data.currentAccount);

          // Reset timer
          clearInterval(data.timer);
          data.timer = startLogOutTimer();
        }, 2500);
      }
      elements.inputLoanAmount.value = "";
    });

    elements.btnClose.addEventListener("click", function (e) {
      e.preventDefault();

      if (
        elements.inputCloseUsername.value === data.currentAccount.username &&
        +elements.inputClosePin.value === data.currentAccount.pin
      ) {
        const index = accounts.findIndex(
          (acc) => acc.username === data.currentAccount.username
        );
        toggleWallet(true);
        accounts.splice(index, 1);
      }

      elements.inputCloseUsername.value = elements.inputClosePin.value = "";
    });

    elements.btnSort.addEventListener("click", function (e) {
      e.preventDefault();
      displayMovements(data.currentAccount, !states.sorted);
      states.sorted = !states.sorted;
    });
  };

  const toggleWallet = (hide = false) => {
    el.style.opacity = hide ? 0 : 100;
    data.now = new Date();
  };

  const getReceiverAccount = () => {
    return accounts.find(
      (acc) => acc.username === elements.inputTransferTo.value
    );
  };

  const displayMovements = function (acc, sort = false) {
    elements.containerMovements.innerHTML = "";

    const movs = sort
      ? acc.movements.slice().sort((a, b) => a - b)
      : acc.movements;

    movs.forEach(function (mov, i) {
      const type = mov > 0 ? "deposit" : "withdrawal";

      const date = new Date(acc.movementsDates[i]);
      const displayDate = formatMovementDate(date, acc.locale);

      const formattedMov = formatCur(mov, acc.locale, acc.currency);

      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
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
    elements.labelSumIn.textContent = formatCur(
      incomes,
      acc.locale,
      acc.currency
    );

    const out = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    elements.labelSumOut.textContent = formatCur(
      Math.abs(out),
      acc.locale,
      acc.currency
    );

    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => {
        // console.log(arr);
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    elements.labelSumInterest.textContent = formatCur(
      interest,
      acc.locale,
      acc.currency
    );
  };

  const startLogOutTimer = function () {
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);

      // In each call, print the remaining time to UI
      elements.labelTimer.textContent = `${min}:${sec}`;

      // When 0 seconds, stop timer and log out user
      if (time === 0) {
        clearInterval(timer);
        publish("timer::logout");
        el.style.opacity = 0;
      }

      // Decrease 1s
      time--;
    };

    // Set time to 5 minutes
    let time = 300;

    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);

    return timer;
  };

  const updateUI = (acc) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    elements.labelDate.textContent = new Intl.DateTimeFormat(
      data.currentAccount.locale,
      options
    ).format(data.now);

    // Timer
    if (data.timer) clearInterval(data.timer);
    data.timer = startLogOutTimer();

    // Display movements
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
  };

  const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(date);
  };

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  init();
};

export default Wallet;
