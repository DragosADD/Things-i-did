`use strict`;

// Driver Code
// let min, max;
// let a = [70, 250, 50, 80, 140, 12, 14];

//maximum number using the recursive method
//bubble sort

// let aux;
// let schimbat; B(n*n)

// for (let j = 0; j < a.length; j++) {
//   schimbat = false;
//   for (let i = 0; i < a.length; i++) {
//     if (a[i] > a[i + 1]) {
//       aux = a[i];
//       a[i] = a[i + 1];
//       a[i + 1] = aux;
//       schimbat = true;
//     }
//     if ((schimbat = false)) break;
//   }
// }

// function bubbleSort(arr, n) { // this a a B() this is using recurse method but still the same thing
//   if (n === 0 || n === 1) {
//     return;
//   }
//   let schimbat;
//   for (let i = 0; i < n; i++) {
//     if (a[i] > a[i + 1]) {
//       aux = a[i];
//       a[i] = a[i + 1];
//       a[i + 1] = aux;
//       schimbat = true;
//     }
//   }
//   bubbleSort(arr, n - 1);
// }

// bubbleSort(a, a.length);

// function DAC_max(arr, index, length) {
//   if (length - 1 === 0) return arr[index];
//   if (index >= length - 2) {
//     if (a[index] > a[index + 1]) return a[index];
//     else return a[index];
//   }

//   const max = DAC_max(arr, index + 1, length);

//   if (a[index] > max) return a[index];
//   else return max;
// }

// console.log(DAC_max(a, 0, a.length));

// function Dac_min(arr, index, length) {
//   let min;
//   if (length - 1 === 0) return arr[index];
//   if (index >= length - 2) {
//     if (arr[index] < arr[index + 1]) return arr[index];
//     else return arr[index + 1];
//   }

//   min = Dac_min(arr, index + 1, length);
//   if (arr[index] < min) return arr[index];
//   else return min;
// }

//log n

//1 sa se gasesasca numaru respectiv sa sa se observe cate impartiri au avut loc

// const array = [];

// let i = 0;

// for (let i = 0; i < 1000; i++) {
//   array.push(i);
// }

// const countNumber = function (arr, nr) {
//   let leftMargine = 0;
//   let rightMargine = arr.length;

//   let mijloc;

//   while (leftMargine < rightMargine) {
//     mijloc = Math.floor((leftMargine + rightMargine) / 2);
//     let nrNou = array[mijloc];

//     i++;

//     if (mijloc === nr) return `${nrNou} ${i}`;
//     if (nr > mijloc) {
//       leftMargine = mijloc + 1;
//       console.log(mijloc);
//     }
//     if (nr < mijloc) {
//       rightMargine = mijloc - 1;
//       console.log(mijloc);
//     }
//   }
// };

// console.log(countNumber(array, 43));
// let n = 16;
// let i = 0;

// while (n > 1) {
//   n = n / 2;
//   i = i + 1;
// }

// // console.log(i, n);

// let Arr = [2, 4, 6, 8, 10, 12, 14, 16, 18];

// const findIndexOfNumber = function (arr, number) {
//   let stangMarg = 0;
//   let dreptMarg = arr.length - 1;
//   while (stangMarg < dreptMarg) {
//     let midMarg = Math.floor((stangMarg + dreptMarg) / 2);
//     let wantedPolice = arr[midMarg];
//     if (wantedPolice === number) {
//       return midMarg + 1;
//     }
//     if (number > wantedPolice) stangMarg = midMarg - 1;
//     if (number < wantedPolice) dreptMarg = midMarg + 1;
//   }
// };

// console.log(findIndexOfNumber(Arr, 12));

//Bubble sort

// const ordoneaza = function (arr) {
//   let schimba = 0;
//   for (let i = 0; i < arr.length; i++) {
//     arr.forEach((element, i) => {
//       if (element > arr[i + 1]) {
//         schimba = arr[i];
//         arr[i] = arr[i + 1];
//         arr[i + 1] = schimba;
//       }
//     });
//   }
// };

// let Arr = [14, 6, 4, 18, 10, 16, 2, 12, 4];

// ordoneaza(Arr);
// console.log(Arr);

// const arr = [];
// const n = 10;

// for (let i = 2; i < n; i++) {
//   if (i === 2) {
//     arr.push(0);
//     arr.push(1);
//   }
//   arr.push(arr[i - 2] + arr[i - 1]);
// }

// console.log(arr);

// let a = [2, 3];

// function calc(a) {
//   for (let i = 0; i < 6; i++) {
//     if (i !== 0 && i != 1) {
//       a[i] = a[i - 1] + a[i - 2];
//     }
//   }
//   console.log(a);
// }

// console.log(calc([2, 3]));
// for (let i = 1; i < 10; i++) {
//   for (let j = 1; j < 10; i++) {
//     a[0] = i;
//     a[1] = j;
//     if (calc(a) === 13) console.log(i, j);
//   }
// }

// let a = [1, 2, 3, 4, 5];

// for (let i = 0; i < a.length; i++) {
//   if ((i + 1) % 2 === 0) {
//     let schimbare;
//     schimbare = a[i - 1];
//     a[i - 1] = a[i];
//     a[i] = schimbare;
//   }
// }

// console.log(a);
let i = 0;

function boo(lista, a, b) {
  i++;
  if ((a = b)) {
    return [lista[a], i];
  }
  c = Math.floor((a + b) / 2);
  return boo(lista, a, c) - boo(lista, c + 1, b);
}

console.log(boo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 24, 42));
