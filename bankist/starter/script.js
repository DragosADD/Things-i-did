'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each).
//For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array,
// and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
/*
//challenge 1

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

function checkDogs(arr1, arr2) {
  const shallowDogsJulia = arr1.slice(1, -1);
  const dogs = shallowDogsJulia.concat(arr2);
  console.log(dogs);
  for (const [doggy, i] of dogs.entries()) {
    if (i >= 3) {
      console.log(`Dog number ${doggy + 1} is an adult, and is ${i} years old`);
    } else {
      console.log(`Dog number ${doggy + 1} is still a pupy`);
    }
  }
}


checkDogs(dogsJulia, dogsKate);
*/

// console.log(`${ownersEatTooLittle.join(` and `)}'s eat to little!`);
// console.log(`${ownersEatTooMuch.join(` and `)}'s eat to much!`);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


/*
const dogAges = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });
  const dogs18less = humanAge.filter(function (age) {
    return age >= 18;
  });

  const avgAGE = dogs18less.reduce(function (acc, curr, i, arr) {
    return acc + curr / arr.length;
  }, 0);

  console.log(ages);
  console.log(`The human age of all dogs is ${humanAge}`);
  console.log(`The dogs who are adults are ${dogs18less}`);
  console.log(`The avg age of and adult dog is: ${avgAGE}`);
};

calcAverageHumanAge(dogAges);
*/
/*
const calcAverageHumanAge = function (ages) {
  const avgAGE = ages
    .map(function (age) {
      if (age <= 2) {
        return 2 * age;
      } else {
        return 16 + age * 4;
      }
    })
    .filter(function (age) {
      return age >= 18;
    })
    .reduce(function (acc, curr, i, arr) {
      return acc + curr / arr.length;
    }, 0);
  console.log(avgAGE);
};
const dogAges = [5, 2, 4, 1, 15, 8, 3];
calcAverageHumanAge(dogAges);
*/

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. 
Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, 
so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). 
Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*
/*
//1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(function (obj) {
  obj.recomandedFood = obj.weight ** 0.75 * 28;
});
console.log(dogs);

///2
// dogs.forEach(function (obj) {
//   const fatorskinny = function (value) {
//     if (obj.curFood > obj.recomandedFood) {
//       return `a lot`;
//     } else if (obj.curFood < obj.recomandedFood) {
//       return `too little`;
//     }
//   };
//   obj.owners.forEach(function (owner) {
//     if (owner.includes(`Sarah`)) {
//       console.log(`Sarah dog eats ${fatorskinny(obj)}`);
//     }
//   });
// });

const dogSarah = dogs.find(function (obj) {
  if (obj.owners.includes(`Sarah`)) return obj;
});

if (dogSarah.curFood > dogSarah.recomandedFood) {
  console.log(`Dog IS FAT`);
} else if (dogSarah.curFood < dogSarah.recomandedFood) {
  console.log(`Dog is skinny bitch`);
} else {
  console.log(`Good job`);
}
//3
const ownersEatTooLittle = dogs
  .filter(function (dog) {
    return dog.curFood > dog.recomandedFood;
  })
  .flatMap(obj => obj.owners);
const ownersEatTooMuch = dogs
  .filter(function (dog) {
    return dog.curFood > dog.recomandedFood;
  })
  .flatMap(obj => obj.owners);

//4

console.log(`${ownersEatTooMuch.join(` and `)}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(` and `)}'s dogs eat too little`);
//5

console.log(dogs.some(obj => obj.curFood === obj.recomandedFood));

//6
console.log(
  dogs.some(
    obj =>
      obj.curFood > obj.recomandedFood * 0.9 &&
      (obj.curFood < obj.recomandedFood) & 1.1
  )
);
//7
const dogOkey = dogs.filter(function (obj) {
  if (
    obj.curFood > obj.recomandedFood * 0.9 &&
    (obj.curFood < obj.recomandedFood) & 1.1
  )
    return obj;
});
console.log(dogOkey);
//8
const shallowCopy = dogs.slice().sort(function (curr, next) {
  if (curr.recomandedFood > next.recomandedFood) return 1;
  else return -1;
});
console.log(shallowCopy);
*/

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = ``;
  // .textcontent  = 0

  const mos = sort ? movements.slice().sort((a, b) => a - b) : movements;
  mos.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    const html = `
       <div class="movements__row">
         <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};

//displayMovement(account1.movements);

//////////////////////////////////////////////////////////////
////////////create username
const user = `Steven Thomas Williams`;

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${income} EUR`;

  const out = account.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  labelSumOut.textContent = `${Math.abs(out)} EUR`;
  const interest = account.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (deposit) {
      return (deposit * 1.2) / 100;
    })
    .filter(function (deposit, i, arr) {
      return deposit >= 1;
    })
    .reduce(function (acc, inte) {
      return acc + inte;
    }, 0);
  labelSumInterest.textContent = `${interest} EUR`;
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${account.balance} EUR`;
};

function createUserNames(accs) {
  accs.forEach(function (accs) {
    accs.username = accs.owner
      .toLocaleLowerCase()
      .split(` `)
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
}

createUserNames(accounts);

const updateUI = function (acc) {
  if (acc) {
    displayMovement(acc.movements); //calling the functions
    //display balance
    calcDisplayBalance(acc);
    //display summary
    calcDisplaySummary(acc);
  }
};

//Event handler
let currentAccount;
btnLogin.addEventListener(`click`, function (e) {
  ///Prevent form from submiting
  e.preventDefault();
  currentAccount = accounts.find(function (acc) {
    if (acc.username === inputLoginUsername.value) return acc; //We are basically returning the needed account with find
  });
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //with the question mark we are seeing if current account exists then we see if the pin also is ok
    ///display ui welcome message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(` `)[0]}`; //modifing the tex of the label
    //display movements
    containerApp.style.opacity = 100; //we are showing the ui once the above statemets are met

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = ``; //makeing the text disapear from the textcontents

    inputLoginPin.blur(); //bluring the cursor
  }
  updateUI(currentAccount);
});

//event hendler
btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(function (acc) {
    if (acc.username === inputTransferTo.value) {
      return acc;
    }
  });

  console.log(amount, receiverAccount);
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
  }
  updateUI(currentAccount);
  inputTransferAmount.value = inputTransferTo.value = ``;
  inputTransferAmount.blur();
});

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (account) {
      //findIndex is better than indexOf because it is more precise index of returns the index of the value but with find index we can search based onmultiple conditions
      if (currentAccount.username === account.username) {
        return account;
      }
    });
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log(`Fuck you`);
  }
  inputLoanAmount.value = ``;
});
let sorted = false;
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault;
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
///////////////////////////////////////
//////////////////////Arrays practice

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, pos) => sum + pos, 0);
console.log(bankDepositSum);

//2

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

//3

// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, curr) => {
//       curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    function (sums, curr) {
      // if (curr > 0) {
      //   sums.deposits += curr;
      // } else {
      //   sums.withdrawals += curr;
      // }
      sums[curr > 0 ? `deposits` : `withdrawals`] += curr;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

//4

// this is a nice title -> This Is A Nice Title

const convertTitleCase = function (title) {
  const exceptions = [`a`, `an`, `the`, `buth`, `with`, `in`, `and`];
  const capitalise = function (str) {
    return str[0].toUpperCase() + str.slice(1);
  };
  const titleCase = title
    .toLowerCase()
    .split(` `)
    .map(word => (exceptions.includes(word) ? word : capitalise(word)))
    .join(` `);

  return capitalise(titleCase);
};
console.log(convertTitleCase(`this is a nice title`));
console.log(convertTitleCase(`this is a LONG title but not too long`));
console.log(convertTitleCase(`and here is another One`));
*/
/*
////////////////////////////////////////////////
/////////////More arrays ways of creating shit
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 7));

const x = new Array(7); //by passing one number you are actually passing in the length of the array
console.log(x);
//   // this acutally doesnt work, arrays that were created via new Array are shit

x.fill(1, 3, 5); //it mutates the underlying array
//if you pass one number it will fill the array with that number
//the second number will say at what positionshould it start to fill
//the third number will represent the end paramenter
console.log(x);

arr.fill(23, 2, 6); // it mutates the original and it replace the positions from arr[2] until arr[6]
arr.fill(23, 6, 8); // it adds 1 more since the length of the array is 7
console.log(arr);

///Aray.from()
const y = Array.from({ length: 7 }, () => 1); //it gives the array the length of 7 and fills it with 1
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1); //instead of cur you can also write _ if you are not using the element
console.log(z);

//test Create an array of 100 dice rolls
const diceRolls = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 6 + 1)
);
console.log(diceRolls);

labelBalance.addEventListener(`click`, function () {
  const movementsUI = Array.from(
    document.querySelectorAll(`.movements__value`),
    el => Number(el.textContent)
  );
  console.log(movementsUI);

  const movementsUi2 = [...document.querySelectorAll(`.movements__value`)]; // this also works but the mapping would have to be done seperately
});

///Whick array methods should you use



/*
/////////////////////////////////////////////////////
/////////////sort method

//String
const owners = [`Jonas`, `Zach`, `Adam`, `Martha`];
console.log(owners.sort());
console.log(owners);

//Numbers
// console.log(movements);
// console.log(movements.sort());
// console.log(movements);

//return < 0, if you want a before B then you write -1
//return > 0,  --------,,------- b before a then you write 1

// const ascended = movements.sort(function (currentValue, nextValue) {
//   if (currentValue > nextValue) {
//     return 1;
//   } else if (currentValue < nextValue) {
//     return -1;
//   }
// });

const ascended = movements.sort(function (currentValue, nextValue) {
  return currentValue - nextValue;
});
console.log(ascended);

// const descended = movements.sort(function (cur, next) {
//   if (cur > next) {
//     return -1;
//   } else if (cur < next) {
//     return 1;
//   }
// });
const descended = movements.sort(function (cur, next) {
  return next - cur;
});
console.log(descended);
*/
/*
////////////////////////////////////////\
/////////FLat and flatMap

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

console.log(arrDeep.flat(0));
console.log(arr.flat());

// const movementsTotal = accounts.map(function (acc) {
//   return acc.movements;
// });
// console.log(movementsTotal.flat());

//flat is usefull when we have multiple layers since we can spacify it but it takes longer
//to process so if possible we use the following method when map is also needed
const overalBalance = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatmap flatmap is better if you need to map it and also flatten it however we can only cover 1(2 actually) layers
//it should however be used when possible
const overalBalance2 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance2);
*/
/*
/////////////////////////////////////////////////////////////////
////////////////////some method has the purpose to return a boolean value based on a condition
//equality
console.log(movements.includes(-130));

//condition
console.log(movements.some(mov => mov === -130));
const anydeposits = movements.some(mov => mov > 0);
console.log(anydeposits);
//////////////Every method returns tru if every element indetifies with the condition

console.log(account4.movements.every(mov => mov > 0));
console.log(account1.movements.every(mov => mov > 0));

const deposit = mov => mov > 0;

console.log(movements.filter(deposit));
console.log(movements.some(deposit));
console.log(movements.every(deposit));
*/
/*
///////////////////////////////////////////////////
/////////Find method finds an element of the array, this also represents the first lement which matches the ocndition

const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(function (acc) {
  if (acc.owner === `Jessica Davis`) return acc;
});
console.log(account);

function findOjbect(accounts) {
  for (const acc of accounts) {
    if (acc.owner === `Jessica Davis`) return acc;
  }
}

console.log(findOjbect(accounts));
*/
/*
////////////////////////////////////////////////
////////////Magic of CHAINING METHODS

const eurToUsd = 1.1;
//demonstration
const totalDepInUSD = movements
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov) {
    return mov * eurToUsd;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

console.log(totalDepInUSD);
*/
/*
//////////////////////////////////////////////////////
////////////Reduce Method to boil down all the elements from an array to a single vallue
//acc (accumulator) is like a snowball
const balance = movements.reduce(function (acc, curr, i, arr) {
  console.log(`Iteration ${i}: curr: ${curr} and the whole array :${arr}`);
  return acc + curr;
}, 0); // 0 represent the initial value of the accumulator(acc)
console.log(balance);

const maxValue = movements.reduce(function (acc, curr) {
  if (curr > acc) {
    acc = curr;
  }
  return acc;
}, movements[0]);
console.log(maxValue);
*/
/*
/////////////////////////////////////////
//////////Filter method is used to filter through elements with a certain condition

const deposit = movements.filter(function (mov) {
  return mov > 0;
}); //if it were to use for of you had to use push, this is simpler

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});

console.log(deposit);
console.log(withdrawals);
*/

/*
////////////////////////////////////////////////
/////The new at method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
//or
console.log(arr.slice(-1)[0]);
//finally using at
console.log(arr.at(-1));
//Works on strings too
console.log(`jewishHead`.at(-1));
*/
/*
/////////////////////////////////////////////////
/////Simple Array methods

let arr = [`a`, `b`, `c`, `d`, `e`];

///slice, does not mutate
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());

//splice, mutates
console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);

//reverse, mutates
arr = [`a`, `b`, `c`, `d`, `e`];
const arr2 = [`j`, `i`, `h`, `g`, `f`];
console.log(arr2.reverse());
console.log(arr2);

//concat method
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); ////////////the one from above is the same as this one.

//join
console.log(letters.join(`-`));
*/
/*
////////////////////////////
////For each looP it is used to do shit with each element
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  movement > 0
    ? console.log(`Process [${i + 1}] deposited ${movement} dollars`)
    : console.log(`Process [${i + 1}] withdrew ${Math.abs(movement)} dollars`);
}
console.log(`-------For Each----------`);
movements.forEach(function (movement, i, arr) {
  movement > 0
    ? console.log(`Process [${i + 1}] deposited ${movement} dollars`)
    : console.log(`Process [${i + 1}] withdrew ${Math.abs(movement)} dollars`);
});
////If you need to break out of the loop you can use the break only for fo of. The for each is more usefull tho when that is not recquired for some reason
*/
/*
////////////////////////////////////////////
/////Fore each with maps and sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key},${value}, ${map}`);
});

//Set
const currenciesUnique = new Set([`USD`, `GBP`, `EUR`, `EUR`]);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
*/

/*
///////////////////////////////
/////////The map method same as foreach only that you change 
the element or rather your return something for each. 
It is used to create new shit. Good job explaining moron

const eurToUsd = 1.1;

// const movUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movUsd = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movUsd);

const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementsDescriptions);
*/
