'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-24T17:01:17.194Z',
    '2022-05-27T23:36:17.929Z',
    '2022-05-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovement = function (date, local) {
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDayPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0); ///At the begining here it was an else but as you well know if the function reads return it will stop so there is no need for else

  // const month = `${date.getMonth() + 1}`.padStart(2, 0);

  // const year = `${date.getFullYear()}`;

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(local).format(date);
};

const formatCurr = function (value, local, currency) {
  return new Intl.NumberFormat(local, {
    style: `currency`,
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovement(date, acc.locale);

    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // Set time to 5 minutes

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    labelTimer.textContent = `${min} : ${sec}`;
    //In each call, print the remaining time to UI
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      // Display UI and message
      labelWelcome.textContent = `Please log in into your account`;
    }
    //decrease 1 sec
    time = time - 1;

    //when 0 seconds, stop timer logout user
  };

  //Call  the timer ever sec

  let time = 120;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

////////////////Fake login
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

/////////Exp with api

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    receiverAcc.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    //rest timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
///////////////////////////////////////////////
////Conver numbers.

console.log(23 === 23.59);
//Conversion, basically same shit
console.log(Number(`23`));
console.log(+`23`);

//parsing
console.log(Number.parseInt(`30px`)); //res 30
console.log(Number.parseInt(`e223`)); //res NaN

console.log(Number.parseFloat(`  2.3sajdfasj  `)); //res 2.3
console.log(Number.parseInt(` 2.3sadjjhas `)); //res 2

console.log(Number.isNaN(`20`)); //false
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN(+`e23`)); //true it is a NaN so it returns true

//checking ultimate if the value is a number
console.log(Number.isFinite(0));
console.log(Number.isFinite(`20`));

//square root
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3)); // the only way sa afli puterea la 3
console.log(Math.max(5, 18, 13, 14, `23`, 11, 2)); //returns 23
console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.min(5, 18, 23, 11, 2));
console.log(Math.PI * Number.parseFloat(`10px`) ** 2); // just to show hows some things can be calculated
*/
/*
//////////////////////////////////////////////////////////////////////
/////////Math. rounding numbers
console.log(Math.random() * 6); //number between 0 and 1
console.log(Math.trunc(Math.random() * 6) + 1); //

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; //numbers between 0 and max max is also included so for

//Rounding integers
console.log(Math.trunc(23.3)); //eliminta decimalele

console.log(Math.round(23.3));
console.log(Math.round(23.9)); //rotunjeaza

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9)); // da 24, nu a zis exact ce face
console.log(Math.ceil(-23.9)); //nu da 24, din cauza ca e cu -

console.log(Math.floor(23.3));
console.log(Math.floor(23.9)); //da 23 indiferend daca e - sau +
console.log(Math.floor(-23.9));

console.log(Math);
//rounding decimals
console.log((2.7).toFixed(0)); //returns a string not a number which is 3 in this case
console.log((2.7).toFixed(3)); //2.700
console.log((2.3453).toFixed(2)); //2.35
console.log(+(2.3453).toFixed(2)); //into number

//It is important to note that numbers are primitive and primitives dont have properties or functions and shit. So The number is transfermed in a property of a number object and
//then after the operation is finnished it is converted back into a number or a primitive
*/
/*
/////////////////////////////////////////////
////////// The remainder operator
console.log(5 % 2); //1
console.log(5 / 2); //5 = 2*2+1

console.log(8 % 3);
console.log(8 / 3); //8 = 2*3+2

const isEven = function (n) {
  return n % 2 === 0;
};

labelBalance.addEventListener(`click`, function () {
  [...document.querySelectorAll(`.movements__row`)].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = `orangered`;
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = `blue`;
    }
  });
});
*/
/*
////////////////////////////////////////////
///////////Numeric separator

const diameterSun = 287_460_000_000;
console.log(diameterSun);

const priceCents = 345_99;

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15; //3._1415 does not work only if it is between 2 dgits
console.log(PI);

console.log(Number(`230_000`)); //doesnt work, only when it's purple
console.log(parseInt(`230_00`)); //it obviously returs 230 as everything else afte _ is ignored

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER); //biggest number possible// anything after may not be correct
console.log(3141279813812847198243712731n); //transform the number in bigint
console.log(BigInt(3141279813812847198243712731));

//Operations
console.log(10000n + 10000n); //demonstration that it works
console.log(1029370127487121371298739812n * 1000n);

const huge = 9218389127398127391n;
const num = 23;

Math.sqrt(16n); // doenst work

//console.log(huge * num); //doesnt work, we need to use the constructor bigInt
console.log(huge * BigInt(num)); //it does work

console.log(20n > 15);
console.log(20n === 20); //it returns false because === doesnt do type cohersion and since 20n is a big int it doesnt work
console.log(typeof 20n);
console.log(20n == 20); // this works because == get's pased type so it will return true

console.log(huge + `Jew`); //the n will nolt appear, it is converted in string

console.log(11n / 3n); // this will cut the decimal part off
*/
/*
//Create a date

const now = new Date();
console.log(now);

console.log(new Date(`May 28 2022 22:49:30`));
console.log(new Date(`December 24, 2015`));

console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
*/
/*
//Working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.toISOString()); // this is important because this is how a sting must be written
console.log(future.getTime()); //rez

console.log(new Date(2142249780000));

console.log(Date.now()); //curent date

future.setFullYear(2040);

console.log(future); //changed the year
*/

/*
//////////////////////////////////////////
////////////Operations with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDayPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDayPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));

console.log(days1);
*/
/*
///////////////////////////////////////
/////Internationalizing numbers
const options = {
  style: `currency`,
  unit: `mile-per-hour`,
  currency: `EUR`,
};

const num = 3884764.23;
console.log(`US: `, new Intl.NumberFormat(`en-US`, options).format(num));
console.log(`Germany: `, new Intl.NumberFormat(`de-DE`, options).format(num));
console.log(`Ro: `, new Intl.NumberFormat(`ro-RO`, options).format(num));
console.log(`SYR: `, new Intl.NumberFormat(`ar-SY`, options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/
//////////////////////////////////////////////////
//////////Numbers dates intl and timers
/*
const ingredients = [`olives`, `spinach`];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log(`Waiting `);

if (ingredients.includes(`spinach`)) clearTimeout(pizzaTimer);

setInterval(function () {
  const options = {
    hour: `numeric`,
    minute: `numeric`,
    second: `numeric`,
  };
  const date = new Date();
  console.log(Intl.DateTimeFormat(navigator.language, options).format(date));
}, 1000);
*/

///////////////////////////////////////////////////////////
/////////////////IUmplementing a countdown timer
