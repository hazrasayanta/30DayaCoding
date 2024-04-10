# Searching in JavaScript

## 1. Linear Search in JavaScript

**=>** Linear search is a simple searching algorithm that sequentially checks each element in a collection until a match is found or the entire collection has been searched. Here's how you can implement linear search in JavaScript:

```javascript
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return the index if the target is found
        }
    }
    return -1; // Return -1 if the target is not found
}

// Example usage:
const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
const target = 5;
const index = linearSearch(arr, target);
if (index !== -1) {
    console.log(`Found ${target} at index ${index}`); // Found 5 at index 4
} else {
    console.log(`${target} not found in the array`);
}
```

In this implementation:

- The `linearSearch` function takes an array `arr` and a target value `target` as input.
- It iterates through each element of the array using a `for` loop.
- For each element, it checks if the element is equal to the target value.
- If a match is found, it returns the index of the matching element.
- If the entire array is searched and no match is found, it returns -1 to indicate that the target value is not present in the array.

Linear search has a time complexity of O(n), where n is the number of elements in the array. This means that the time taken to search is directly proportional to the size of the input array. It is a straightforward algorithm but may not be efficient for very large datasets compared to other search algorithms like binary search or hash tables. However, it is useful for searching small arrays or unsorted collections.

## 2.1 Binary Search In JavaScript

**=>** Binary search is a search algorithm used to find the position of a target value within a sorted array. It works by repeatedly dividing the search interval in half until the target value is found or the interval is empty. Here's how you can implement binary search in JavaScript:

```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
  
        if (arr[mid] === target) {
            return mid; // Target found, return the index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }
  
    return -1; // Target not found
}

// Example usage:
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 11;
const index = binarySearch(arr, target);
if (index !== -1) {
    console.log(`Found ${target} at index ${index}`); // Found 11 at index 5
} else {
    console.log(`${target} not found in the array`);
}
```

In this implementation:

- The `binarySearch` function takes a sorted array `arr` and a target value `target` as input.
- It initializes two pointers, `left` and `right`, to the beginning and end of the array respectively.
- It enters a loop that continues as long as `left` is less than or equal to `right`.
- Inside the loop, it calculates the middle index `mid` of the current search interval.
- It compares the element at index `mid` with the target value:
  - If they are equal, it returns `mid` as the index of the target.
  - If the element at index `mid` is less than the target, it updates `left` to `mid + 1` to search in the right half of the array.
  - If the element at index `mid` is greater than the target, it updates `right` to `mid - 1` to search in the left half of the array.
- If the loop terminates without finding the target, it returns -1 to indicate that the target value is not present in the array.

Binary search has a time complexity of O(log n), where n is the number of elements in the array. This means that the time taken to search is proportional to the logarithm of the size of the input array, making it much more efficient than linear search for large datasets. However, binary search requires that the array be sorted beforehand, which may add an additional overhead.

## 2.2 Binary Search using Recursion

**=>** Here's how you can implement binary search using recursion in JavaScript:

```javascript
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1; // Base case: target not found
    }
  
    const mid = Math.floor((left + right) / 2);
  
    if (arr[mid] === target) {
        return mid; // Base case: target found
    } else if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right); // Search in the right half
    } else {
        return binarySearch(arr, target, left, mid - 1); // Search in the left half
    }
}

// Example usage:
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 11;
const index = binarySearch(arr, target);
if (index !== -1) {
    console.log(`Found ${target} at index ${index}`); // Found 11 at index 5
} else {
    console.log(`${target} not found in the array`);
}
```

In this implementation:

- The `binarySearch` function takes a sorted array `arr`, a target value `target`, and optional parameters `left` and `right` that define the search interval.
- If `left` is greater than `right`, the function returns -1 to indicate that the target value is not found in the array (base case).
- Otherwise, it calculates the middle index `mid` of the current search interval.
- If the element at index `mid` is equal to the target value, the function returns `mid` as the index of the target (base case).
- If the element at index `mid` is less than the target value, the function recursively calls itself with `mid + 1` as the new `left` value to search in the right half of the array.
- If the element at index `mid` is greater than the target value, the function recursively calls itself with `mid - 1` as the new `right` value to search in the left half of the array.

Binary search using recursion has the same time complexity as the iterative approach, which is O(log n), making it an efficient algorithm for searching in sorted arrays. However, recursion may have a higher memory overhead due to the recursive function calls and stack frames, especially for large datasets.

## 3. Find floor and ceil value of X in an array

**=>** To find the floor and ceiling values of a given number `X` in a sorted array, you can use binary search. Here's how you can implement it in JavaScript:

```javascript
function findFloor(arr, X) {
    let left = 0;
    let right = arr.length - 1;
    let floor = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === X) {
            return arr[mid]; // Found X in the array
        } else if (arr[mid] < X) {
            floor = arr[mid]; // Update floor value
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }

    return floor; // Return the floor value
}

function findCeil(arr, X) {
    let left = 0;
    let right = arr.length - 1;
    let ceil = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === X) {
            return arr[mid]; // Found X in the array
        } else if (arr[mid] > X) {
            ceil = arr[mid]; // Update ceil value
            right = mid - 1; // Search in the left half
        } else {
            left = mid + 1; // Search in the right half
        }
    }

    return ceil; // Return the ceil value
}

// Example usage:
const arr = [1, 2, 8, 10, 10, 12, 19];
const X = 5;
const floorValue = findFloor(arr, X);
const ceilValue = findCeil(arr, X);
console.log(`Floor value of ${X} is ${floorValue}`); //Floor value of 5 is 2
console.log(`Ceil value of ${X} is ${ceilValue}`); // Ceil value of 5 is 8
```

In this implementation:

- The `findFloor` function finds the largest element smaller than or equal to `X` in the array.
- The `findCeil` function finds the smallest element larger than or equal to `X` in the array.
- Both functions use binary search to efficiently locate the floor and ceiling values.
- If `X` is found in the array, the respective function returns `X` itself as both floor and ceiling values.
- If `X` is not found in the array, the functions return the floor and ceiling values based on the binary search logic.
- If `X` is smaller than the smallest element in the array, the floor value will be `-1`, and if `X` is larger than the largest element in the array, the ceil value will be `-1`.
