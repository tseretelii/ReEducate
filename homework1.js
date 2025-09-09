// 1
let fullName = "Gigi Tsereteli";

let [firstName, LastName] = fullName.split(" ");

console.log(`${firstName[0]}.${LastName[0]}.`);

// 2
let email = " EXAMPLE@MAIL.COM ";

if (email.includes("@")) {
  console.log(email.trim().toLowerCase());
}

// 3
let str = "luka";

console.log(str[0].toUpperCase());

// 4
for (i = 1; i <= 100; i++) {
  if (i % 5 === 0 && i % 3 === 0) {
    console.log("FooBar");
  } else if (i % 3 === 0) {
    console.log("Foo");
  } else if (i % 5 === 0) {
    console.log("Bar");
  } else {
    console.log(i);
  }
}

// 5
let text = "JS is stupid but sometimes cool";

console.log(text.replace("tupi", "****"));

// Theory
// 1. a. var : შეიძლება ხელახლა გამოცხადება და გადაწერა

//    b. let : იმავე სკოუპში ხელახლა გამოცხადება არ შეიძლება და გადაწერა შესაძლებელია

//    c. const : ხელახლა გამოცხადება და გადაწერა არ შეიძლება

// 2. 
// ჯამში გვაქვს 7 primitive + 1 reference (Object) ტიპი.
// a. Number – რიცხვითი მნიშვნელობები

// b. String – სიმბოლოთა თანმიმდევრობა.

// c. Boolean – true ან false

// d. Undefined – ცვლადი გამოცხადებულია, მაგრამ მნიშვნელობა არ აქვს

// e. Null – ცარიელი მნიშვნელობა

// f. Symbol – უნიკალური იდენტიფიკატორების შესაქმნელად

// g. BigInt – ძალიან დიდი რიცხვებისთვის, რომელიც Number-ის საზღვრებს სცდება

// h. Object – კომპლექსური სტრუქტურა, რომელიც ინახავს key–value წყვილებს (მაგ. Array, Function, Date)


// 3.
// Scope-ის ამოცანაა განსაზღვროს, რომელი ცვლადი სად არის ხელმისაწვდომი
// Scope-ში მუშაობს ორი ტიპის ძიება:

// a. Left-Hand Side (LHS) search:
//    ხდება მაშინ, როცა ცვლადს მნიშვნელობას ვანიჭებთ
//    Engine ეძებს ცვლადს, რომლის მარცხენა მხარეს უნდა ჩაჯდეს(assign) ახალი მნიშვნელობა
//    თუ ვერ იპოვა, non-strict რეჟიმში ქმნის ახალ ცვლადს global scope-ში,
//    strict რეჟიმში კი შეცდომას აგდებს.

// b. Right-Hand Side (RHS) search:
//    ხდება მაშინ, როცა ვცდილობთ ცვლადის მნიშვნელობის წაკითხვას.
//    Engine ეძებს ცვლადს, რომ მიიღოს მისი მნიშვნელობა.
//    თუ ვერ იპოვა, ReferenceError-ს აგდებს.

// დასკვნა:
// LHS search: "სად ჩავწერო მონაცემი?"
// RHS search: "საიდან წავიკითხო მონაცემი?"


// 4.
// split(separator)
//    სტრინგს ყოფს მოცემული გამყოფის (separator) მიხედვით და აბრუნებს მასივს.
//    მაგალითი: "a,b,c".split(",") -> ["a", "b", "c"]



// 5.
// String არის პრიმიტიული ტიპი
// - Primitive ტიპები immutable არიან მნიშვნელობა არ იცვლება, მხოლოდ ახალი იქმნება
// - როდესაც ვამატებთ მეთოდებს მაგ. "abc".toUpperCase(), 
//   სტრინგი დროებით "wrapper object"-ში გარდაიქმნება String object, 
//   მეთოდი სრულდება და შემდეგ ისევ primitive სტრინგი ბრუნდება.
// - ამიტომ String პრიმიტიულია, მაგრამ მას აქვს ობიექტის მსგავსი ქცევა
//   ამ ობიექტს ეწოდება "autoboxing"



// 6.
// == Equality operator
// - ადარებს ორ მნიშვნელობას ტიპის ავტომატური გარდაქმნით
// - მაგ.: 5 == "5" -> true სტრინგი გადაიქცევა რიცხვად

// === (Strict equality operator)
// - ადარებს ორ მნიშვნელობას ტიპის გარდაქმნის გარეშე.
// - საჭიროა როგორც მნიშვნელობა, ისე ტიპი ზუსტად ემთხვეოდეს.

// - მაგ.: 5 === "5" -> false რადგან ერთი Number-ია, მეორე String
