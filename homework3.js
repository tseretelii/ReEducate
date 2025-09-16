let arr = [1, 2, 3, 4, -1, -2, -3, -4, 100];
// 1
console.log("\n1.");

function multiplyArr(arr, times) {
  return arr.map((x) => x * times);
}

console.log(multiplyArr([1, 2, 3], 3));

// 2
console.log("\n2.");
let arr3 = arr.filter((x) => x % 3 === 0);
console.log(arr3);

// 3
console.log("\n3.");

let sumOfPositive = arr.reduce((sum, x) => {
  if (x >= 0) {
    sum += x;
  }
  return sum;
}, 0);

console.log(sumOfPositive);

// 4
console.log("\n4.");
let namesArr = ["giorgi", "nika", "mariami"];

console.log(namesArr.map((x) => x.slice(0, -1)));

// 5
console.log("\n5.");
console.log(arr.map((x) => x * 2).filter((x) => x % 3 === 0));

// 6
console.log("\n6.");
let products = [
  {
    category: "pizza",
    price: 20,
  },
  {
    category: "pizza",
    price: 20,
  },
  {
    category: "sushi",
    price: 30,
  },
  {
    category: "sushi",
    price: 30,
  },
];

console.log(
  products.reduce((sum, x) => {
    if (!sum[x.price]) {
      sum[x.price] = [];
    }
    sum[x.price].push(x);
    return sum;
  }, {})
);

// 7
console.log("\n7.");
let numsArr = [1, -1, -2, -10, 111, 3, 2, 5];

console.log(numsArr.sort((a, b) => a - b));

// 8
console.log("\n8.");

console.log(numsArr.map((x) => x * 2).filter((x) => x > 5));

// 9
console.log("\n9.");
let notUnique = [1, 1, 1, 1, 2, 2, 3, 3, 3];

console.log([...new Set(notUnique)]);

// 10
console.log("\n10.");
let nums = [-1, 20, 90, 4, 5, 111];

console.log(
  nums
    .sort((a, b) => a - b)
    .slice(0, 2)
    .reduce((sum,x) => {
      return sum + x
    }, 0)
);
