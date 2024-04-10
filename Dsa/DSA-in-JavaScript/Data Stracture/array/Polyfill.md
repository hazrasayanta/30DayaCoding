# Map, Filter & Reduce & their Polyfills

## 1. `map()`

**=>** In JavaScript, the `map()` method is used to transform each element of an array according to a specified mapping function. It creates a new array with the results of calling the provided function on every element in the calling array. The `map()` method does not change the original array; instead, it returns a new array.

Here's the syntax of the `map()` method:

```javascript
const newArray = array.map(callback(currentValue[, index[, array]]) {
  // Return element for newArray, after executing something
}[, thisArg]);
```

- `callback`: Function that produces an element of the new array. It accepts three arguments:
  - `currentValue`: The current element being processed in the array.
  - `index` (Optional): The index of the current element being processed in the array.
  - `array` (Optional): The array `map()` was called upon.
- `thisArg` (Optional): Value to use as `this` when executing `callback`.

### Example:

Let's say we have an array of numbers, and we want to square each number in the array:

```javascript
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(function(number) {
  return number * number;
});

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```

### Arrow Function Syntax:

You can also use arrow functions to make the code more concise:

```javascript
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(number => number * number);

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```

### Note:

- The `map()` method does not mutate the original array; it returns a new array with the transformed elements.
- You can use the `map()` method for a wide range of transformations on arrays, such as mapping objects to specific properties, converting data formats, or applying calculations to elements.

## Polyfill of `map()`

**=>** Here's an example using the `myMap()` polyfill to transform an array of numbers:

```javascript
// Define the polyfill for myMap
if (!Array.prototype.myMap) {
    Array.prototype.myMap = function(callback, thisArg) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        const newArray = [];
        const obj = Object(this);
        const len = obj.length >>> 0;

        for (let i = 0; i < len; i++) {
            if (i in obj) {
                newArray[i] = callback.call(thisArg, obj[i], i, obj);
            }
        }

        return newArray;
    };
}

// Example usage of myMap polyfill
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.myMap(function(number) {
  return number * number;
});

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```

In this example:

- We first define the `myMap()` polyfill.
- Then, we define an array `numbers` containing some numbers.
- We use the `myMap()` method (polyfilled) to square each number in the array, producing a new array `squaredNumbers`.
- Finally, we log the `squaredNumbers` array to the console, which will output `[1, 4, 9, 16, 25]`.

## 2. `filter()`

**=>** In JavaScript, the `filter()` method is used to create a new array with all elements that pass a certain condition or criteria defined by a callback function. This method does not change the original array; instead, it returns a new array containing the elements that satisfy the condition.

Here's the syntax of the `filter()` method:

```javascript
const newArray = array.filter(callback(element[, index[, array]]) {
  // Return true to keep the element, false to discard it
}[, thisArg]);
```

- `callback`: Function to test each element of the array. It accepts three arguments:
  - `element`: The current element being processed in the array.
  - `index` (Optional): The index of the current element being processed in the array.
  - `array` (Optional): The array `filter()` was called upon.
- `thisArg` (Optional): Value to use as `this` when executing `callback`.

### Example:

Let's say we have an array of numbers, and we want to filter out only the even numbers:

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(function(number) {
  return number % 2 === 0;
});

console.log(evenNumbers); // Output: [2, 4, 6]
```

### Arrow Function Syntax:

You can also use arrow functions to make the code more concise:

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(number => number % 2 === 0);

console.log(evenNumbers); // Output: [2, 4, 6]
```

### Note:

- The `filter()` method does not mutate the original array; it returns a new array with the filtered elements.
- You can use the `filter()` method for a wide range of filtering operations on arrays, such as filtering objects based on certain properties, removing duplicate elements, or excluding elements based on certain conditions.

### Polyfill of `filter()`

=> Here's an example using the `myFilter()` polyfill to filter an array of numbers:

```javascript
// Define the polyfill for myFilter
if (!Array.prototype.myFilter) {
    Array.prototype.myFilter = function(callback, thisArg) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        const newArray = [];
        const obj = Object(this);
        const len = obj.length >>> 0;

        for (let i = 0; i < len; i++) {
            if (i in obj) {
                if (callback.call(thisArg, obj[i], i, obj)) {
                    newArray.push(obj[i]);
                }
            }
        }

        return newArray;
    };
}

// Example usage of myFilter polyfill
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.myFilter(function(number) {
  return number % 2 === 0;
});

console.log(evenNumbers); // Output: [2, 4, 6]
```

In this example:

- We first define the `myFilter()` polyfill.
- Then, we define an array `numbers` containing some numbers.
- We use the `myFilter()` method (polyfilled) to filter out only the even numbers from the array, producing a new array `evenNumbers`.
- Finally, we log the `evenNumbers` array to the console, which will output `[2, 4, 6]`.

## 3. `reduce()`

**=>** In JavaScript, the `reduce()` method is used to apply a function to each element of the array to reduce the array to a single value. It executes a reducer function (that you provide) on each element of the array, resulting in a single output value. The `reduce()` method takes two parameters: a reducer function and an optional initial value.

Here's the syntax of the `reduce()` method:

```javascript
const result = array.reduce(callback(accumulator, currentValue[, index[, array]]) {
  // Return updated accumulator value
}[, initialValue]);
```

- `callback`: A function that takes four arguments:
  - `accumulator`: The accumulator accumulates the callback's return values. It is the accumulated value previously returned in the last invocation of the callback or `initialValue`, if supplied.
  - `currentValue`: The current element being processed in the array.
  - `index` (Optional): The index of the current element being processed in the array.
  - `array` (Optional): The array `reduce()` was called upon.
- `initialValue` (Optional): A value to use as the first argument to the first call of the `callback`. If no initial value is supplied, the first element in the array will be used as the initial accumulator value and skipped as `currentValue`.

### Example:

Let's say we have an array of numbers, and we want to find the sum of all elements in the array:

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15 (1 + 2 + 3 + 4 + 5)
```

### Arrow Function Syntax:

You can also use arrow functions to make the code more concise:

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum); // Output: 15 (1 + 2 + 3 + 4 + 5)
```

### Note:

- The `reduce()` method does not mutate the original array; it returns a single value.
- You can use the `reduce()` method for a wide range of operations on arrays, such as calculating sums, averages, maximums, minimums, or performing more complex transformations on arrays.

## Polyfill of `reduce()` 

=> Here's an example using the `myReduce()` polyfill to find the sum of all elements in an array:

```javascript
// Define the polyfill for myReduce
if (!Array.prototype.myReduce) {
    Array.prototype.myReduce = function(callback, initialValue) {
        if (this == null) {
            throw new TypeError('Array.prototype.myReduce called on null or undefined');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        const obj = Object(this);
        const len = obj.length >>> 0;
        let accumulator = initialValue;

        for (let i = 0; i < len; i++) {
            if (i in obj) {
                if (accumulator === undefined) {
                    accumulator = obj[i];
                } else {
                    accumulator = callback.call(undefined, accumulator, obj[i], i, obj);
                }
            }
        }

        if (accumulator === undefined) {
            throw new TypeError('Reduce of empty array with no initial value');
        }

        return accumulator;
    };
}

// Example usage of myReduce polyfill
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.myReduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15 (1 + 2 + 3 + 4 + 5)
```

In this example:

- We first define the `myReduce()` polyfill.
- Then, we define an array `numbers` containing some numbers.
- We use the `myReduce()` method (polyfilled) to find the sum of all elements in the array, starting with an initial value of `0`.
- Finally, we log the `sum` to the console, which will output `15`, which is the sum of all elements in the array `[1, 2, 3, 4, 5]`.
