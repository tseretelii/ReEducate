const express = require("express");
const mongoose = require("mongoose");


const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://wereteligigi_db_user:2kX6axoYNGjgFN7C@homework17.jrnigyx.mongodb.net/?appName=Homework17";

async function connectToMongo() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

connectToMongo();

const app = express();
app.use(express.json());


app.post("/user", (req, res) => {
  const { name, age } = req.body;
  if (!name || typeof age !== "number") {
    return res.status(400).send("Please provide both name (string) and age (number).");
  }

  res.send(`User ${name} is ${age} years old.`);
});


/**
 * @typedef {Object} Product
 * @property {string} name
 * @property {number} price
 */

/** @type {Product[]} */
const products = [
  { name: "Keyboard", price: 45 },
  { name: "Mouse", price: 30 },
  { name: "Headset", price: 60 },
];

const totalPrice = products.reduce((sum, item) => sum + item.price, 0);
console.log(`Total price: ${totalPrice}`);
if (totalPrice > 100) {
  console.log("Discount available!");
}


/**
 * @typedef {Object} IHero
 * @property {string} name
 * @property {number} age
 */

/**
 * @typedef {IHero & { power: string, level?: string }} ISuperHero
 */

/**
 * @param {ISuperHero} hero
 */
function levelUp(hero) {
  hero.level = hero.age > 30 ? "Pro" : "Newbie";
  console.log(`${hero.name} is now level: ${hero.level}`);
}

const hero1 = {
  name: "Batman",
  age: 35,
  power: "Stealth",
};
levelUp(hero1);


/**
 * @template T
 * @param {T[]} items
 * @returns {T | undefined}
 */
function first(items) {
  return items[0];
}

console.log("First number:", first([10, 20, 30]));
console.log("First product name:", first(products).name);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("POST a JSON body like { \"name\": \"Nika\", \"age\": 22 } to /user");
});

