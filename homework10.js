const fs = require('fs');
const path = require('path');

// 1
function task1() {
    const inputNumbers = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    fs.writeFileSync('numbers.txt', inputNumbers);
    
    const data = fs.readFileSync('numbers.txt', 'utf8');
    const numbers = data.trim().split('\n').map(Number);
    
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    
    fs.writeFileSync('sum.txt', `Sum of all numbers: ${sum}`);
    console.log("Task 1 - Sum calculated and saved:", sum);
}

// 2
function task2() {
    const inputText = "Hello World! This is a test message.";
    fs.writeFileSync('input.txt', inputText);
    
    const text = fs.readFileSync('input.txt', 'utf8');
    
    const reversedText = text.split('').reverse().join('');
    
    fs.writeFileSync('reversed.txt', reversedText);
    console.log("Task 2 - Text reversed and saved");
    console.log("Original:", text);
    console.log("Reversed:", reversedText);
}

// 3
function task3() {
    const users = [
        { name: "Gio", age: 25, email: "gio@gmail.com" },
        { name: "Nika", age: 30, email: "nika@example.com" },
        { name: "Mariam", age: 22, email: "mariam@reeducate.ge" },
        { name: "Lasha", age: 28, email: "lasha@reeducate.ge" },
        { name: "Ana", age: 35, email: "ana@mail.com" }
    ];
    
    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));
    console.log("Task 3 - Users array saved to data.json");
}

// 4
function task4() {
    fs.writeFileSync('file1.txt', "Content from file 1\nLine 2 from file 1");
    fs.writeFileSync('file2.txt', "Content from file 2\nLine 2 from file 2");
    
    const content1 = fs.readFileSync('file1.txt', 'utf8');
    const content2 = fs.readFileSync('file2.txt', 'utf8');
    
    const mergedContent = `File 1 Content:\n${content1}\n\nFile 2 Content:\n${content2}`;
    fs.writeFileSync('merged.txt', mergedContent);
    console.log("Task 4 - Files merged and saved to merged.txt");
}

// 5
function task5() {
    const text = "This is a sample text for word counting. It contains multiple words and sentences.";
    
    fs.writeFileSync('sample.txt', text);
    
    const readText = fs.readFileSync('sample.txt', 'utf8');
    
    const words = readText.trim().split(/\s+/);
    const wordCount = words.length;
    
    console.log("Task 5 - Text written and read from file");
    console.log("Word count:", wordCount);
    console.log("Words:", words);
}

// 6
function task6() {
    const users = [
        { name: "Gio", age: 25, email: "gio@gmail.com" },
        { name: "Nika", age: 17, email: "nika@example.com" },
        { name: "Mariam", age: 22, email: "mariam@reeducate.ge" },
        { name: "Lasha", age: 16, email: "lasha@reeducate.ge" },
        { name: "Ana", age: 35, email: "ana@mail.com" }
    ];
    
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    
    const usersData = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    
    const filteredUsers = usersData.filter(user => user.age > 18);
    
    fs.writeFileSync('users.json', JSON.stringify(filteredUsers, null, 2));
    console.log("Task 6 - Users filtered (age > 18) and saved back to users.json");
    console.log("Filtered users:", filteredUsers);
}

// 7
function task7() {
    const students = [
        { name: "Gio", score: 85, passed: true },
        { name: "Nika", score: 45, passed: false },
        { name: "Mariam", score: 92, passed: true },
        { name: "Lasha", score: 38, passed: false },
        { name: "Ana", score: 78, passed: true },
        { name: "David", score: 25, passed: false }
    ];
    
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
    
    const studentsData = JSON.parse(fs.readFileSync('students.json', 'utf8'));
    
    const passedStudents = studentsData.filter(student => student.score > 50);
    
    fs.writeFileSync('passed.json', JSON.stringify(passedStudents, null, 2));
    console.log("Task 7 - Students created, filtered (score > 50) and saved to passed.json");
    console.log("Passed students:", passedStudents);
}

// 8
function task8() {
    const users = [
        { "name": "Gio", "email": "gio@gmail.com" },
        { "name": "Nika", "email": "nikaexample.com" },
        { "name": "Mariam", "email": "mariam@reeducate.ge" },
        { "name": "Lasha", "email": "lashareeducate.ge" },
        { "name": "Ana", "email": "ana@mail.com" }
    ];
    
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    const usersData = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    
    const validUsers = usersData.filter(user => user.email.includes('@'));
    
    fs.writeFileSync('users.json', JSON.stringify(validUsers, null, 2));
    console.log("Task 8 - Users with invalid emails removed");
    console.log("Valid users:", validUsers);
}

console.log("Starting File Handling Tasks...\n");

task1();
console.log("\n" + "=".repeat(50) + "\n");

task2();
console.log("\n" + "=".repeat(50) + "\n");

task3();
console.log("\n" + "=".repeat(50) + "\n");

task4();
console.log("\n" + "=".repeat(50) + "\n");

task5();
console.log("\n" + "=".repeat(50) + "\n");

task6();
console.log("\n" + "=".repeat(50) + "\n");

task7();
console.log("\n" + "=".repeat(50) + "\n");

task8();
console.log("\n" + "=".repeat(50) + "\n");

console.log("All tasks completed! Check the generated files:");
console.log("- numbers.txt, sum.txt");
console.log("- input.txt, reversed.txt");
console.log("- data.json");
console.log("- file1.txt, file2.txt, merged.txt");
console.log("- sample.txt");
console.log("- users.json");
console.log("- students.json, passed.json");
