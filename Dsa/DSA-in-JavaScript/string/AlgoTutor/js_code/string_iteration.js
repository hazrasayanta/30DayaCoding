// String iteration refers to the process of traversing or looping through each character in a 
// string to perform some operation on each character individually or on substrings of the string. 
// Iterating over a string is commonly done using loops or higher-order functions provided by programming languages.

// Here are some common methods for iterating over a string:

// 1.For Loop: Using a traditional for loop to iterate through each character in the string.

let str = "Hello";

for (let i = 0; i < str.length; i++) {
    console.log(str[i]); // Output: Each character of the string "Hello" printed on a new line
}

// 2.For...of Loop: Using a for...of loop to iterate through each character in the string directly.

let str = "Hello";

for (let char of str) {
    console.log(char); // Output: Each character of the string "Hello" printed on a new line
}


// 3.Array Iteration Methods: Converting the string to an array of characters and then using array iteration methods like forEach, map, filter, etc.

let str = "Hello";

Array.from(str).forEach(char => {
    console.log(char); // Output: Each character of the string "Hello" printed on a new line
});

// 4.Array Map Method: Converting the string to an array of characters and then using the array map method to transform each character.
let str = "Hello";

Array.from(str).map(char => {
    console.log(char); // Output: Each character of the string "Hello" printed on a new line
    return char.toUpperCase(); // Example of transforming each character to uppercase
});


// String iteration is useful for tasks such as searching for specific characters, 
// transforming characters, or performing any operation that involves processing 
// individual characters or substrings within a string.