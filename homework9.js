// 1
function filterEvenAndFindAverage(arr) {
    let evenNumbers = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            evenNumbers.push(arr[i]);
        }
    }
    
    let sum = 0;
    for (let i = 0; i < evenNumbers.length; i++) {
        sum += evenNumbers[i];
    }
    
    let average = evenNumbers.length > 0 ? sum / evenNumbers.length : 0;
    
    return {
        evenNumbers: evenNumbers,
        average: average
    };
}

let numbers1 = [1, 2, 3, 4, 5, 6];
let result1 = filterEvenAndFindAverage(numbers1);
console.log("Task 1 - Even numbers:", result1.evenNumbers);
console.log("Task 1 - Average of even numbers:", result1.average);

// 2
function countWords(sentence) {
    let words = sentence.trim().split(/\s+/);
    return words.length;
}

let sentence = "I love JavaScript";
let wordCount = countWords(sentence);
console.log("Task 2 - Sentence:", sentence);
console.log("Task 2 - Word count:", wordCount);

// 3) Check if a number is prime
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    // Check odd divisors up to square root
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

console.log("Task 3 - Is 17 prime?", isPrime(17));
console.log("Task 3 - Is 15 prime?", isPrime(15));
console.log("Task 3 - Is 2 prime?", isPrime(2));
console.log("Task 3 - Is 1 prime?", isPrime(1));

// 4) Find the longest word
function findLongestWord(words) {
    let longestWord = "";
    let maxLength = 0;
    
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > maxLength) {
            maxLength = words[i].length;
            longestWord = words[i];
        }
    }
    
    return longestWord;
}

let words = ["dog", "elephant", "cat", "hippopotamus"];
let longestWord = findLongestWord(words);
console.log("Task 4 - Words:", words);
console.log("Task 4 - Longest word:", longestWord);

// 5) Find the most frequent number
function findMostFrequent(arr) {
    let frequency = {};
    
    for (let i = 0; i < arr.length; i++) {
        if (frequency[arr[i]]) {
            frequency[arr[i]]++;
        } else {
            frequency[arr[i]] = 1;
        }
    }
    
    let mostFrequent = arr[0];
    let maxCount = frequency[arr[0]];
    
    for (let num in frequency) {
        if (frequency[num] > maxCount) {
            maxCount = frequency[num];
            mostFrequent = parseInt(num);
        }
    }
    
    return {
        number: mostFrequent,
        count: maxCount,
        frequency: frequency
    };
}

let arr = [3, 5, 3, 2, 5, 5, 3, 5];
let mostFrequent = findMostFrequent(arr);
console.log("Task 5 - Array:", arr);
console.log("Task 5 - Most frequent number:", mostFrequent.number);
console.log("Task 5 - Frequency count:", mostFrequent.count);
console.log("Task 5 - All frequencies:", mostFrequent.frequency);

// 6
function countEvenAndOdd(nums) {
    let evenCount = 0;
    let oddCount = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }
    
    return {
        even: evenCount,
        odd: oddCount
    };
}

let nums = [1, 2, 3, 4, 5, 6, 7, 8];
let countResult = countEvenAndOdd(nums);
console.log("Task 6 - Numbers:", nums);
console.log("Task 6 - Even count:", countResult.even);
console.log("Task 6 - Odd count:", countResult.odd);

// 7
function findSmallest(nums) {
    let smallest = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < smallest) {
            smallest = nums[i];
        }
    }
    
    return smallest;
}

let nums2 = [10, 2, 33, 5, 7];
let smallest = findSmallest(nums2);
console.log("Task 7 - Numbers:", nums2);
console.log("Task 7 - Smallest number:", smallest);
