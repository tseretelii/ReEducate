// 1. დაწერე ფუნქცია , რომელიც არგუმენტად იღებს sec-ს და ითვლის უკუსვლით იქმადე სანამ 0-მდე არ მივა

function countTime(seconds) {
  let timeout = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(timeout);
    }
    console.log(seconds);
    seconds--;
  }, 1000);
}

countTime(15);

// 2. დაწერე ფუქნცია ფუქნციას გადააწოდე რიცხვი  და ასევე ლოგე რენდომული რიცხვი იქამდე სანამ ეს გადაცემული და რენდომ რიცხვი არ. დაემთხვევა ერთმამენთს\

function randomUntilMatch(target) {
  const intervalId = setInterval(() => {
    const randomNum = Math.floor(Math.random() * 100);
    console.log(randomNum);

    if (randomNum === target) {
      clearInterval(intervalId);
      console.log(`Match found: ${randomNum}`);
    }
  }, 10);
}

randomUntilMatch(42);

// 3. დაწერე ფუქნცია რომელიც მიიღებს n და callback-ს როცა n > 27-ზე გაუშვი ეს callback-ი რომელიც დააკონსოლებს რომ ეს ნამდვილად მეტია 27-ზე სხვა შემთხვევაში დააკონსოლე რომ n ნაკლებია

function checkNumber(n, callback) {
  if (n > 27) {
    callback();
  } else {
    console.log("n <= 27");
  }
}

function foo() {
  console.log("n > 27");
}

checkNumber(30, foo);

checkNumber(15, foo);

// 4.დაწერე ფუქნცია რომელიც პარამეტრად მიიღებს API და დააბრუნებს ამ API-ში მყოფ  4 - users. https://jsonplaceholder.typicode.com/users დაწერე ორივენაირად than/catch & async/await

function getUsersThenCatch(api) {
  return fetch(api)
    .then((res) => {
      if (!res.ok) throw new Error("Error");
      return res.json();
    })
    .then((data) => data.slice(0, 4)) // მხოლოდ 4 user
    .catch((err) => {
      console.error("Error:", err.message);
    });
}

getUsersThenCatch("https://jsonplaceholder.typicode.com/users").then((users) =>
  console.log(users)
);

async function getUsersAsync(api) {
  try {
    const res = await fetch(api);
    const data = await res.json();
    return data.slice(0, 4);
  } catch (err) {
    console.error("error:", err.message);
  }
}

(async () => {
  const users = await getUsersAsync(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log(users);
})();

// 5) დააწყვილე reduce-თი ცალკე ვისი ასაკიც მეტია 10 ზე და ვისი ასაკიც ნაკლებია 20
let people = [
  { name: "Giorgi", age: 25 },
  { name: "Nika", age: 15 },
  { name: "Mariam", age: 30 },
  { name: "Luka", age: 18 },
];

let grouped = people.reduce(
  (acc, person) => {
    if (person.age > 10) {
      acc.over10.push(person);
    }
    if (person.age < 20) {
      acc.under20.push(person);
    }
    return acc;
  },
  { over10: [], under20: [] }
);

console.log(grouped);

// 6. დაწერე ფუნქცია რომელიც მიიღებს ორ რიცხვს და callback-ს. თუ პირველი მეტია მეორეზე გაუშვი callback და დაუბეჭდე "მეტია", სხვა შემთხვევაში "ნაკლები ან ტოლია".

function compareNumbers(a, b, callback) {
  if (a > b) {
    callback();
    console.log("მეტია");
  } else {
    console.log("ნაკლები ან ტოლია");
  }
}

compareNumbers(10, 5, () => {
  console.log("Callback გაეშვა რადგან პირველი რიცხვი მეტია");
});

compareNumbers(3, 7, () => {
  console.log("Callback გაეშვა რადგან პირველი რიცხვი მეტია");
});

// 7.დაწერე reduce, რომელიც დააჯგუფებს - ცალკე 20-ზე მეტ ფასიან რიცხვებს და
// ცალკე 20-ზე ნაკლები ან ტოლი ფასიანი ნივთები
let products = [
  { name: "Mouse", price: 15 },
  { name: "Keyboard", price: 45 },
  { name: "USB Cable", price: 7 },
  { name: "Headphones", price: 29.9 },
  { name: "Webcam", price: 52 },
];

let groupe = products.reduce(
  (acc, product) => {
    if (product.price > 20) {
      acc.over20.push(product);
    } else {
      acc.upTo20.push(product);
    }
    return acc;
  },
  { over20: [], upTo20: [] }
);

console.log(groupe);
