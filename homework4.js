// 1
const laptops = [
  { model: "Dell XPS 13", price: 1800 },
  { model: "MacBook Pro 14", price: 2499 },
  { model: "Lenovo ThinkPad X1", price: 2100 },
  { model: "Asus Zephyrus G14", price: 1999 },
];

let maxPrice = 0;

for (let lap of laptops) {
  if (lap.price > maxPrice) {
    maxPrice = lap.price;
  }
}

console.log(maxPrice);

// 2
let obj = {
  width: 10,
  height: 10,
  getArea: function () {
    return this.width * this.height;
  },
};

console.log(obj.getArea());

// 3
const students = [
  { name: "Giorgi", score: 85, passed: true },
  { name: "Nika", score: 50, passed: false },
  { name: "Mariam", score: 92, passed: true },
  { name: "Luka", score: 60, passed: false },
];

for (let stud of students) {
  if (stud.passed) {
    console.log(stud.name);
  }
}

// 4
const products = [
  { title: "Pencil", price: 2 },
  { title: "Notebook", price: 5 },
  { title: "Backpack", price: 35 },
  { title: "Ruler", price: 3 },
  { title: "Calculator", price: 40 },
];

let productNames = products.reduce((tot, x) => {
  if (x.price < 10) {
    tot.push(x.price);
  }
  return tot;
}, []);

console.log(productNames);

// 5
const movies = [
  { title: "Inception", rating: 9 },
  { title: "Avatar", rating: 7.5 },
  { title: "Joker", rating: 8.2 },
  { title: "Tenet", rating: 6.9 },
];

console.log(movies.sort((a, b) => a.rating - b.rating));

// 6
const phones = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 },
];

phones.sort((a, b) => a.price - b.price);

console.log(phones[0].model);

// 7
const books = [
  { title: "Harry Potter", pages: 500 },
  { title: "The Little Prince", pages: 120 },
  { title: "Lord of the Rings", pages: 700 },
  { title: "Animal Farm", pages: 250 },
];

for (let book of books) {
  if (book.pages > 300) {
    console.log(book);
  }
}

// 8
console.log(phones);

let sum = phones.reduce((sum, x) => {
  return sum + x.price;
}, 0);

console.log(sum);
