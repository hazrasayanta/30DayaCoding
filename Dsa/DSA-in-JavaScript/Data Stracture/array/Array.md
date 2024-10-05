# Array

## 1. Basic Nature

**=>** The basic nature of JavaScript arrays is that they are ordered collections of data. Here are some key characteristics of JavaScript arrays:

1. **Indexed Elements**: Arrays in JavaScript are zero-indexed, meaning the first element is at index 0, the second at index 1, and so on. You can access elements using their index.
2. **Dynamic Size**: Arrays in JavaScript are dynamic, meaning their size can grow or shrink dynamically as elements are added or removed. There is no fixed size limit for arrays.
3. **Heterogeneous Data Types**: JavaScript arrays can contain elements of different data types within the same array. You can have a mix of numbers, strings, objects, functions, or even other arrays within a single JavaScript array.
4. **Length Property**: Arrays have a `length` property that indicates the number of elements in the array. This property is automatically updated when elements are added or removed from the array.
5. **Mutability**: JavaScript arrays are mutable, meaning you can modify the elements of the array after it has been created. You can add, remove, or modify elements as needed.
6. **Array Methods**: JavaScript provides a variety of built-in methods for manipulating arrays, such as `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `slice()`, `concat()`, `join()`, `indexOf()`, `forEach()`, `map()`, `filter()`, and `reduce()`. These methods allow you to perform common operations on arrays efficiently.
7. **Iterating Over Arrays**: You can iterate over the elements of an array using loops like `for` loops or using array methods like `forEach()`, `map()`, `filter()`, etc.
8. **Reference Type**: Arrays in JavaScript are reference types, meaning when you assign an array to a variable or pass it as an argument to a function, you are passing a reference to the array, not a copy of the array. Modifying the array through one reference will affect all other references to the same array.

Overall, JavaScript arrays are versatile and powerful data structures that are commonly used for storing and manipulating collections of data in JavaScript programs.

# `<Understand Array>`

## 2. Arrays in javaScript

**=>** Arrays in JavaScript are used to store multiple values in a single variable. They are a special type of object used to store a collection of data, and the data can be of any type (e.g., strings, numbers, objects, functions). Arrays in JavaScript are zero-indexed, meaning the first element is at index 0, the second element at index 1, and so on.

Here's a basic example of how to create an array and access its elements:

```javascript
// Creating an array
let fruits = ['apple', 'banana', 'orange', 'mango'];

// Accessing elements of the array
console.log(fruits[0]); // Output: apple
console.log(fruits[1]); // Output: banana
console.log(fruits[2]); // Output: orange
console.log(fruits[3]); // Output: mango

// Modifying elements of the array
fruits[1] = 'grape';
console.log(fruits); // Output: ['apple', 'grape', 'orange', 'mango']

// Array length
console.log(fruits.length); // Output: 4
```

Arrays in JavaScript also have many built-in methods that can be used to manipulate the data they contain. Some commonly used methods include `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `slice()`, `concat()`, `join()`, `indexOf()`, `forEach()`, `map()`, `filter()`, and `reduce()`.

Here's an example of using some array methods:

```javascript
// Adding elements to the end of the array
fruits.push('strawberry');
console.log(fruits); // Output: ['apple', 'grape', 'orange', 'mango', 'strawberry']

// Removing the last element from the array
let lastFruit = fruits.pop();
console.log(lastFruit); // Output: strawberry
console.log(fruits); // Output: ['apple', 'grape', 'orange', 'mango']

// Removing the first element from the array
let firstFruit = fruits.shift();
console.log(firstFruit); // Output: apple
console.log(fruits); // Output: ['grape', 'orange', 'mango']

// Adding elements to the beginning of the array
fruits.unshift('kiwi', 'pineapple');
console.log(fruits); // Output: ['kiwi', 'pineapple', 'grape', 'orange', 'mango']

// Removing elements from specific positions
let removedFruits = fruits.splice(1, 2); // Removes 2 elements starting from index 1
console.log(removedFruits); // Output: ['pineapple', 'grape']
console.log(fruits); // Output: ['kiwi', 'orange', 'mango']

// Creating a copy of a portion of the array
let copy = fruits.slice(1, 3); // Copies elements from index 1 to index 2 (not inclusive of index 3)
console.log(copy); // Output: ['orange', 'mango']

// Iterating over elements using forEach
fruits.forEach(function(fruit) {
    console.log(fruit);
});
// Output:
// kiwi
// orange
// mango
```

These are just a few examples of what you can do with arrays in JavaScript. They are incredibly versatile and are used extensively in JavaScript programming.

## 3. Dynamic VS Static Arrays

**=>** In JavaScript, there's not a strict differentiation between "dynamic" and "static" arrays as you might encounter in some other programming languages like C or Java. Instead, JavaScript arrays are inherently dynamic, meaning they can change in size dynamically at runtime.

However, you can create arrays with a predefined size (akin to what you might call "static" arrays in other languages) using either the `Array()` constructor or by simply declaring an array with a specific length. For instance:

```javascript
// Creating an array with a predefined size using the Array constructor
let staticArray1 = new Array(5); // Creates an array with 5 empty slots

// Creating an array with a specific length using array literal syntax
let staticArray2 = new Array(3); // Creates an array with 3 empty slots

console.log(staticArray1); // Output: [ <5 empty items> ]
console.log(staticArray2); // Output: [ <3 empty items> ]
```

However, it's important to understand that these arrays are still dynamic in nature; they can change in size, and you can still add or remove elements to/from them. The specified length only affects the initial allocation of memory for the array. For example:

```javascript
staticArray1[2] = "Hello";
console.log(staticArray1); // Output: [ <2 empty items>, 'Hello', <2 empty items> ]
```

In this example, even though `staticArray1` was created with a length of 5, only one element has been assigned, and JavaScript doesn't enforce any constraints on further additions or deletions.

So, while you can create arrays with a predetermined size in JavaScript, they're still fundamentally dynamic in terms of their behavior, and they can grow or shrink as needed, similar to dynamically sized arrays in other languages.

# `<Memory Allocation>`

## 4. Memory Allocation (Access and Storage) in Array Js

=> In JavaScript, memory allocation, access, and storage for arrays are handled dynamically by the JavaScript engine. When you create an array in JavaScript, memory is allocated dynamically to accommodate the elements you add to the array.

### Memory Allocation:

When you declare an array in JavaScript, memory is allocated to store the array itself and its elements. The JavaScript engine handles the memory allocation process transparently, and you don't need to worry about managing memory explicitly as you might in lower-level languages like C or C++.

### Accessing Elements:

JavaScript arrays are zero-indexed, meaning the first element is at index 0, the second element at index 1, and so on. Accessing elements in an array is straightforward using square bracket notation `[]` along with the index of the element you want to access.

```javascript
let arr = [10, 20, 30, 40];
console.log(arr[0]); // Output: 10
console.log(arr[2]); // Output: 30
```

### Storage:

The storage of array elements is handled dynamically by the JavaScript engine. As you add elements to an array, the engine allocates memory to accommodate the new elements. Similarly, when elements are removed from an array, the engine may release the memory associated with those elements, depending on how memory management is implemented.

### Performance Considerations:

While JavaScript abstracts away many memory management concerns, it's essential to be mindful of performance implications when working with large arrays or in performance-critical applications.

1. **Time Complexity**: The time complexity of common array operations like accessing, inserting, or deleting elements varies depending on the operation and the size of the array. Understanding the time complexity of these operations can help you write more efficient code.
2. **Memory Usage**: Be aware of memory usage when dealing with large arrays, especially in environments with limited memory resources (e.g., browsers). Unnecessary creation of large arrays or holding onto references to arrays that are no longer needed can lead to increased memory usage and potential performance issues like memory leaks.
3. **Optimizations**: JavaScript engines often employ optimizations to improve the performance of array operations. For example, some engines may use techniques like "sparse arrays" to optimize memory usage for arrays with a large number of uninitialized or sparse elements.

Overall, while JavaScript abstracts away low-level memory management details, understanding how memory allocation, access, and storage work in JavaScript arrays can help you write more efficient and performant code.

# `<Operations>`

## 5. Js Array Accessing and Updating Operations

**=>** In JavaScript, you can access and update array elements using square bracket notation `[]` along with the index of the element you want to access or update. Here's how you can perform these operations:

### Accessing Array Elements:

To access elements in an array, use square brackets `[]` with the index of the element you want to retrieve. Remember that arrays in JavaScript are zero-indexed, meaning the first element is at index 0, the second at index 1, and so on.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

console.log(arr[0]); // Output: 'apple'
console.log(arr[2]); // Output: 'orange'
```

### Updating Array Elements:

You can update array elements by assigning a new value to the element at a specific index.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

arr[1] = 'grape'; // Update the element at index 1
console.log(arr); // Output: ['apple', 'grape', 'orange', 'mango']
```

### Accessing and Updating Nested Array Elements:

If your array contains nested arrays (also known as multidimensional arrays), you can use multiple sets of square brackets to access elements within nested arrays.

```javascript
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[0][1]); // Output: 2 (accessing element at row 0, column 1)

matrix[2][1] = 10; // Updating element at row 2, column 1
console.log(matrix); // Output: [[1, 2, 3], [4, 5, 6], [7, 10, 9]]
```

### Accessing and Updating Array Length:

You can access the length of an array using the `length` property. This property returns the number of elements in the array.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

console.log(arr.length); // Output: 4
```

You can also update the length of an array. If you set the length property to a value smaller than the current length, the array will be truncated. If you set it to a value larger than the current length, the array will be extended, and new empty slots will be added.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

arr.length = 2; // Truncating the array
console.log(arr); // Output: ['apple', 'banana']

arr.length = 5; // Extending the array
console.log(arr); // Output: ['apple', 'banana', <3 empty items>]
```

### Iterating Over Array Elements:

You can use various looping mechanisms like `for` loop, `forEach()` method, `for...of` loop, etc., to iterate over array elements and perform operations on them.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

// Using for loop
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// Using forEach() method
arr.forEach(function(element) {
    console.log(element);
});

// Using for...of loop
for (let fruit of arr) {
    console.log(fruit);
}
```

These are some of the fundamental operations you can perform on JavaScript arrays for accessing and updating elements.

## 6. Js Array Insertion and Deletion Operation (start, middle, end)

**=>** In JavaScript, you can insert and delete elements from arrays at the start, middle, or end using various built-in methods and techniques. Here are examples of insertion and deletion operations:

### Insertion Operations:

#### 1. Inserting Elements at the Start:

- Use `unshift()` method to insert one or more elements at the beginning of the array.

```javascript
let arr = ['banana', 'orange', 'mango'];

arr.unshift('apple'); // Insert 'apple' at the start
console.log(arr); // Output: ['apple', 'banana', 'orange', 'mango']
```

#### 2. Inserting Elements at the Middle:

- Use `splice()` method to insert elements at a specified index in the array. You specify the index at which to start changing the array and the number of elements to remove (0 in this case), followed by the new elements you want to insert.

```javascript
let arr = ['apple', 'banana', 'mango'];

arr.splice(2, 0, 'orange'); // Insert 'orange' at index 2
console.log(arr); // Output: ['apple', 'banana', 'orange', 'mango']
```

#### 3. Inserting Elements at the End:

- Use `push()` method to add one or more elements to the end of the array.

```javascript
let arr = ['apple', 'banana', 'orange'];

arr.push('mango'); // Insert 'mango' at the end
console.log(arr); // Output: ['apple', 'banana', 'orange', 'mango']
```

### Deletion Operations:

#### 1. Deleting Elements from the Start:

- Use `shift()` method to remove the first element from the array.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

arr.shift(); // Remove the first element
console.log(arr); // Output: ['banana', 'orange', 'mango']
```

#### 2. Deleting Elements from the Middle:

- Use `splice()` method to remove elements from a specified index in the array. You specify the index at which to start changing the array and the number of elements to remove (in this case, 1).

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

arr.splice(2, 1); // Remove element at index 2
console.log(arr); // Output: ['apple', 'banana', 'mango']
```

#### 3. Deleting Elements from the End:

- Use `pop()` method to remove the last element from the array.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

arr.pop(); // Remove the last element
console.log(arr); // Output: ['apple', 'banana', 'orange']
```

These are some of the common techniques for inserting and deleting elements from JavaScript arrays at different positions. Depending on your specific requirements, you can choose the appropriate method.

## 7. Js Array Forward and Backward Traversal

**=>** In JavaScript, you can traverse arrays forward and backward using various looping mechanisms or built-in methods. Here's how you can perform forward and backward traversal:

### Forward Traversal:

#### 1. Using a `for` Loop:

You can use a `for` loop to iterate over the elements of the array from the first to the last index.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

#### 2. Using `forEach()` Method:

The `forEach()` method allows you to execute a provided function once for each array element.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

arr.forEach(function(element) {
    console.log(element);
});
```

#### 3. Using `for...of` Loop:

The `for...of` loop iterates over the values of an iterable object (like an array), accessing each element in sequence.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

for (let fruit of arr) {
    console.log(fruit);
}
```

### Backward Traversal:

#### 1. Using a `for` Loop in Reverse:

You can use a `for` loop to iterate over the elements of the array from the last to the first index.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
}
```

#### 2. Using `forEach()` Method with `reverse()`:

You can combine the `forEach()` method with the `reverse()` method to traverse the array in reverse order.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

arr.reverse().forEach(function(element) {
    console.log(element);
});
```

#### 3. Using a `for...of` Loop with a Reversed Array:

You can use a `for...of` loop to iterate over the values of a reversed array.

```javascript
let arr = ['apple', 'banana', 'orange', 'mango'];

for (let fruit of arr.reverse()) {
    console.log(fruit);
}
```

### Note:

- While backward traversal methods like `reverse()` modify the original array, the order of elements in the original array will be reversed after the operation. If you don't want to modify the original array, you may need to create a copy of it before using these methods.
- Each method has its advantages and use cases. Choose the method that best fits your specific requirements and coding style.

# `<Multi Dimensional>`

## 8. Js Array Multi Dimensional Access

**=>** In JavaScript, you can create multi-dimensional arrays to store data in a tabular format. Accessing elements in a multi-dimensional array involves specifying both the row and column indices. Here's how you can access elements in a multi-dimensional array:

### Example of a Multi-Dimensional Array:

```javascript
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

### Accessing Elements:

To access elements in a multi-dimensional array, you use multiple sets of square brackets `[rowIndex][columnIndex]`.

```javascript
console.log(matrix[0][0]); // Output: 1
console.log(matrix[1][2]); // Output: 6
console.log(matrix[2][1]); // Output: 8
```

In the example above:

- `matrix[0][0]` accesses the element in the first row and first column, which is `1`.
- `matrix[1][2]` accesses the element in the second row and third column, which is `6`.
- `matrix[2][1]` accesses the element in the third row and second column, which is `8`.

### Modifying Elements:

You can also modify elements in a multi-dimensional array using the same syntax.

```javascript
matrix[1][0] = 10; // Modifying element at row 2, column 1
console.log(matrix); // Output: [[1, 2, 3], [10, 5, 6], [7, 8, 9]]
```

### Iterating Over Elements:

You can use nested loops to iterate over all elements in a multi-dimensional array.

```javascript
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        console.log(matrix[i][j]);
    }
}
```

This nested loop will iterate over each row of the array, and for each row, it will iterate over the elements in that row, printing each element.

### Notes:

- You can have arrays of more than two dimensions as well, though they are less common.
- Multi-dimensional arrays are commonly used to represent grids, matrices, or tables of data.
- Be mindful of array bounds when accessing elements in multi-dimensional arrays to avoid out-of-bounds errors.

# `<Manipulation>`

## 9. Js Array Manipulation Reverse

**=>** In JavaScript, you can reverse the order of elements in an array using the `reverse()` method. This method reverses the order of the elements in place, meaning it modifies the original array. Here's how you can use it:

```javascript
let arr = [1, 2, 3, 4, 5];

arr.reverse();
console.log(arr); // Output: [5, 4, 3, 2, 1]
```

In the example above, the `reverse()` method is called on the array `arr`, which reverses the order of its elements. After calling `reverse()`, the original array `arr` is modified, and its elements are now in reverse order.

### Notes:

- The `reverse()` method modifies the original array and returns a reference to the reversed array.
- This method reverses the order of the elements in place, meaning it doesn't create a new array with reversed elements but instead changes the positions of elements within the existing array.
- Be cautious when using `reverse()` if the original array is referenced elsewhere in your code, as the modifications made by `reverse()` will affect all references to the array. If you want to preserve the original array, consider creating a copy of it before calling `reverse()`.

## 10. Js Array Manipulation Rotate

**=>** To rotate the elements of an array in JavaScript, you can use a combination of array manipulation techniques such as slicing and concatenating. Here's how you can implement a function to rotate an array:

```javascript
function rotateArray(arr, steps) {
    if (steps === 0 || arr.length === 0) {
        return arr; // No rotation needed
    }

    const length = arr.length;
    steps %= length; // Normalize steps in case it's greater than array length

    if (steps < 0) {
        // If steps is negative, rotate to the left by taking elements from the end and adding them to the beginning
        return arr.slice(steps).concat(arr.slice(0, length + steps));
    } else {
        // If steps is positive, rotate to the right by taking elements from the beginning and adding them to the end
        return arr.slice(length - steps).concat(arr.slice(0, length - steps));
    }
}

// Example usage:
let arr = [1, 2, 3, 4, 5];
console.log(rotateArray(arr, 2)); // Output: [4, 5, 1, 2, 3] (Right rotation by 2 steps)
console.log(rotateArray(arr, -1)); // Output: [2, 3, 4, 5, 1] (Left rotation by 1 step)
```

In the `rotateArray` function:

- We first handle edge cases where no rotation is needed (`steps === 0` or `arr.length === 0`).
- We normalize the number of steps to rotate (`steps %= length`) to handle cases where `steps` is greater than the length of the array.
- Depending on whether `steps` is positive or negative, we slice the array and concatenate the appropriate portions to rotate the array to the right or left respectively.
- We use the `slice` method to extract portions of the array, and `concat` to combine them into the rotated array.

This function allows you to rotate an array either to the right or left by a specified number of steps. Adjust the value of `steps` to rotate the array in the desired direction.

## 11. Js Array Manipulation Shuffle

**=>** To shuffle the elements of an array in JavaScript, you can use the Fisher-Yates shuffle algorithm. This algorithm efficiently shuffles the elements of an array randomly. Here's how you can implement it:

```javascript
function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
    }
    return array;
}

// Example usage:
let arr = [1, 2, 3, 4, 5];
console.log(shuffleArray(arr)); // Output: [4, 3, 5, 1, 2] (Example shuffled array)
```

In the `shuffleArray` function:

- We iterate over the array from the last element to the first.
- For each element at index `i`, we generate a random index `j` between `0` and `i` (inclusive).
- We then swap the elements at indices `i` and `j`.
- After the loop completes, the array will be shuffled.

This function shuffles the elements of the array in place and returns the shuffled array. Each permutation of the original array has an equal probability of occurring, making this algorithm suitable for generating random permutations.

## 12. Js Array Manipulation Randomization

**=>** To perform randomization on an array in JavaScript, you can utilize a combination of techniques such as shuffling and selecting random elements. Here's how you can implement randomization functions:

### 1. Shuffle Array:

You can use the Fisher-Yates shuffle algorithm to shuffle the elements of the array randomly.

```javascript
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
```

### 2. Select Random Element:

You can create a function to select a random element from the array.

```javascript
function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
```

### Example Usage:

```javascript
let arr = [1, 2, 3, 4, 5];

// Shuffle the array
console.log(shuffleArray(arr)); // Output: Shuffled array

// Select a random element from the array
console.log(getRandomElement(arr)); // Output: Random element from the array
```

### Notes:

- The `shuffleArray` function shuffles the array in place using the Fisher-Yates shuffle algorithm.
- The `getRandomElement` function selects a random element from the array by generating a random index.
- These functions provide flexibility for randomizing arrays in JavaScript. You can use them based on your specific requirements, such as shuffling the array or selecting random elements from it.

# `<Patterns>`

## 13. Js Array Patterns Two Pointers

**=>** The "Two Pointers" technique is often used in algorithms to solve problems involving arrays and sequences. It typically involves using two pointers or indices that traverse the array from different positions or directions to efficiently solve the problem. Here's how you can utilize the Two Pointers technique with arrays in JavaScript:

### Two Pointers for Finding a Target Sum:

Let's say you have a sorted array of numbers and you need to find a pair of elements that sum up to a target value.

```javascript
function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const sum = arr[left] + arr[right];

        if (sum === target) {
            return [arr[left], arr[right]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return []; // If no such pair exists
}

// Example usage:
let arr = [1, 2, 3, 4, 5, 6, 7];
let target = 9;
console.log(twoSum(arr, target)); // Output: [2, 7] (2 + 7 = 9)
```

In this example:

- We initialize two pointers, `left` at the beginning of the array and `right` at the end of the array.
- We iterate over the array using the while loop and move the pointers towards each other.
- At each step, we calculate the sum of elements at the current positions of the pointers.
- If the sum is equal to the target, we return the pair of elements.
- If the sum is less than the target, we move the left pointer to the right to increase the sum.
- If the sum is greater than the target, we move the right pointer to the left to decrease the sum.
- We continue this process until the pointers meet or until we find the target sum.

This is just one example of using the Two Pointers technique with arrays in JavaScript. It's commonly employed in various algorithms for solving problems efficiently.

## 14. Js Array Patterns Sliding Window

**=>** The sliding window pattern is a common technique used to solve problems involving arrays or strings where you need to find a contiguous subarray or substring satisfying certain conditions. It typically involves maintaining a window of elements as you iterate through the array and adjusting the window based on the problem constraints. Here's how you can utilize the sliding window pattern with arrays in JavaScript:

### Sliding Window for Finding Maximum Sum of K Consecutive Elements:

Let's say you have an array of numbers and you need to find the maximum sum of K consecutive elements.

```javascript
function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];

        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - (k - 1)];
        }
    }

    return maxSum;
}

// Example usage:
let arr = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0];
let k = 3;
console.log(maxSumSubarray(arr, k)); // Output: 16 (Maximum sum of 3 consecutive elements: 7 + 8 + 1)
```

In this example:

- We initialize two variables, `maxSum` to store the maximum sum found so far and `windowSum` to store the sum of the current window.
- We iterate through the array using a loop and add each element to the `windowSum`.
- Once the window size reaches `k`, we update the `maxSum` with the maximum of its current value and `windowSum`, then adjust the `windowSum` by subtracting the leftmost element of the window.
- We continue this process until we reach the end of the array.

This is just one example of using the sliding window pattern with arrays in JavaScript. It's a versatile technique that can be applied to various problems involving arrays or strings where you need to efficiently find a subarray or substring satisfying certain conditions.

## 15. Js Array Patterns Sub Array

**=>** The term "subarray" typically refers to a contiguous section of an array. There are many problems in programming where you need to find or manipulate subarrays. Understanding how to work with subarrays efficiently can help in solving such problems effectively. Here's how you can approach working with subarrays in JavaScript:

### Finding Subarrays:

You can find subarrays of an array using nested loops. The outer loop controls the starting index of the subarray, while the inner loop controls the ending index.

```javascript
function subArrays(arr) {
    const subarrays = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            subarrays.push(arr.slice(i, j + 1));
        }
    }
    return subarrays;
}

// Example usage:
let arr = [1, 2, 3];
console.log(subArrays(arr)); // Output: [[1], [1, 2], [1, 2, 3], [2], [2, 3], [3]]
```

### Working with Subarrays:

Once you have subarrays, you can perform various operations on them, such as finding the sum, maximum, minimum, or applying certain conditions.

```javascript
// Example: Finding the sum of all subarrays
function subarraySum(arr) {
    let sum = 0;
    for (let subarray of arr) {
        sum += subarray.reduce((acc, curr) => acc + curr, 0);
    }
    return sum;
}

// Example usage:
let arr = [[1], [1, 2], [1, 2, 3], [2], [2, 3], [3]];
console.log(subarraySum(arr)); // Output: 15 (Sum of all subarrays)
```

### Notes:

- Generating all subarrays using nested loops has a time complexity of O(n^3) because there are O(n^2) subarrays and each subarray takes O(n) time to create using `slice()`.
- You can optimize certain operations on subarrays using techniques like the sliding window pattern or prefix sum techniques.
- Depending on the problem, you may need to adjust the approach for finding or working with subarrays to optimize performance and meet specific requirements.
-
