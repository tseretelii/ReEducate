// 1
console.log("First Exercise");
let arr = [];

for (let i = 1; i <= 15; i++) {
  if (i > 4) {
    arr.push(i);
  }
}

console.log(arr);

// 2
console.log("\nSecond Exercise");
for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}

// 3
console.log("\nThird Exercise");
let min = arr[0];

for (let i = 0; i < arr.length - 1; i++) {
  if (min > arr[i]) {
    min = arr[i];
  }
}
console.log(min);

// 4
console.log("\nFourth Exercise");
let sliceFrom = arr.length / 2 - 1;
let sliceTo = arr.length / 2 + 1;

let slicedArr = arr.slice(Math.floor(sliceFrom), Math.ceil(sliceTo));
console.log(`From: ${sliceFrom}; To ${sliceTo}`);
console.log(slicedArr);

// 5
console.log("\nFifth Exercise");
let secondArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

arr = [...arr, ...secondArr];

console.log(arr);

// 6
console.log("\nSixth Exercise");
unique = [...new Set(arr)];

console.log(unique);

// 7
console.log("\nSeventh Exercise");
let even = [];
let odd = [];

for (i = 0; i < arr.length - 1; i++) {
  if (arr[i] % 2 === 0) {
    even.push(arr[i]);
  } else {
    odd.push(arr[i]);
  }
}

console.log(`Even: ${even}\nOdd: ${odd}`);

// 8
console.log("\nEighth Exercise");
arr.push(-1, -2, -3, -12);

let positiveNumCount = 0;
let sumNegativeNums = 0;

for (i = 0; i < arr.length - 1; i++) {
  if (arr[i] > 0) {
    positiveNumCount++;
  } else {
    sumNegativeNums -= arr[i];
  }
}

console.log(
  `Positive Number Count: ${positiveNumCount}\nSum Of Negative Numbers: ${sumNegativeNums}`
);

// 9
console.log("\nNinth Exercise");
function inverseArr(arr) {
  let inversedArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    inversedArr.push(-arr[i]);
  }

  return inversedArr;
}

let inverse = inverseArr(arr)

console.log(inverse)


// 10
console.log("\nTenth Exercise");

let arr2 =  [1, [2, [3]], [4]]

console.log(arr2.flat(Infinity))