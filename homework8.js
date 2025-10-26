// 1
let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]];

function flattenArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            let flattened = flattenArray(arr[i]);
            for (let j = 0; j < flattened.length; j++) {
                result.push(flattened[j]);
            }
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

function sortArray(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function removeDuplicates(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < result.length; j++) {
            if (arr[i] === result[j]) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            result.push(arr[i]);
        }
    }
    return result;
}

let flattened = flattenArray(arr);
let sorted = sortArray(flattened);
let uniqueSorted = removeDuplicates(sorted);
console.log("Task 1 - Flattened, sorted, unique array:", uniqueSorted);

// 2
let products = [
    { name: "Phone", price: 1200, rating: 4.5 },
    { name: "Laptop", price: 2500, rating: 4.8 },
    { name: "Book", price: 30, rating: 4.9 },
    { name: "TV", price: 800, rating: 4.0 }
];

function findHighestRatedUnder1000(products) {
    let bestProduct = null;
    let highestRating = 0;
    
    for (let i = 0; i < products.length; i++) {
        if (products[i].price < 1000 && products[i].rating > highestRating) {
            highestRating = products[i].rating;
            bestProduct = products[i];
        }
    }
    
    return bestProduct;
}

let bestProduct = findHighestRatedUnder1000(products);
console.log("Task 2 - Highest rated product under 1000:", bestProduct);

// 3
let sentence = "dog cat dog bird cat dog fish bird";

function countWordsWithReduce(sentence) {
    let words = sentence.split(' ');
    return words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});
}

function findMostFrequentWithForLoop(wordCount) {
    let mostFrequent = '';
    let maxCount = 0;
    
    for (let word in wordCount) {
        if (wordCount[word] > maxCount) {
            maxCount = wordCount[word];
            mostFrequent = word;
        }
    }
    
    return { word: mostFrequent, count: maxCount };
}

let wordCount = countWordsWithReduce(sentence);
let mostFrequent = findMostFrequentWithForLoop(wordCount);
console.log("Task 3 - Word counts:", wordCount);
console.log("Task 3 - Most frequent word:", mostFrequent);

console.log("\n" + "=".repeat(50) + "\n");


// 1
function countLetterOccurrences(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            count++;
        }
    }
    return count;
}

console.log("For Loop Task 1 - Count 'a' in 'banana':", countLetterOccurrences("banana", "a"));

// 2
function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log("For Loop Task 2 - 'ana' is palindrome:", isPalindrome("ana"));
console.log("For Loop Task 2 - 'abba' is palindrome:", isPalindrome("abba"));
console.log("For Loop Task 2 - 'gig' is palindrome:", isPalindrome("gig"));
console.log("For Loop Task 2 - 'hello' is palindrome:", isPalindrome("hello"));

// 3
function mergeArraysAndSum(arr1, arr2) {
    // Merge arrays
    let merged = [...arr1, ...arr2];
    
    let unique = [];
    for (let i = 0; i < merged.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < unique.length; j++) {
            if (merged[i] === unique[j]) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            unique.push(merged[i]);
        }
    }
    
    let sum = 0;
    for (let i = 0; i < unique.length; i++) {
        sum += unique[i];
    }
    
    return { merged: merged, unique: unique, sum: sum };
}

let array1 = [1, 2, 3, 4];
let array2 = [3, 4, 5, 6];
let result = mergeArraysAndSum(array1, array2);
console.log("For Loop Task 3 - Merged arrays:", result.merged);
console.log("For Loop Task 3 - Unique elements:", result.unique);
console.log("For Loop Task 3 - Sum:", result.sum);

// 4
function factorial(n) {
    if (n < 0) return "Factorial is not defined for negative numbers";
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log("For Loop Task 4 - Factorial of 5:", factorial(5));
console.log("For Loop Task 4 - Factorial of 0:", factorial(0));

// 5
function twoSum(arr, target) {
    let pairs = [];
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                pairs.push([i, j]);
            }
        }
    }
    
    return pairs;
}

let numbers = [1, 2, 3, 4, 5, 6, -7, -8];
let target = -15;
let twoSumResult = twoSum(numbers, target);
console.log("For Loop Task 5 - Array:", numbers);
console.log("For Loop Task 5 - Target:", target);
console.log("For Loop Task 5 - Pairs (indices):", twoSumResult);

function twoSumValues(arr, target) {
    let pairs = [];
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                pairs.push([arr[i], arr[j]]);
            }
        }
    }
    
    return pairs;
}

let twoSumValuesResult = twoSumValues(numbers, target);
console.log("For Loop Task 5 - Pairs (values):", twoSumValuesResult);
