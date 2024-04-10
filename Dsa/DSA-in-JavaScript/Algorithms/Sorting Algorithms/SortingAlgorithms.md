# Sorting In JavaScript

## # Basic Sorting

### 1. Sort an Array

**=>** In JavaScript, you can use the built-in `sort()` method to sort an array of elements. The `sort()` method sorts the elements of an array in place and returns the sorted array. By default, the `sort()` method sorts the elements as strings in lexicographic (dictionary) order. However, you can provide a custom comparison function to sort elements based on specific criteria.

Here's how you can use the `sort()` method to sort an array of numbers in ascending order:

```javascript
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
console.log("Original Array:", numbers); // Output: [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]

numbers.sort((a, b) => a - b); // Sort in ascending order
console.log("Sorted Array (Ascending):", numbers); // Output: [0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283]
```

In this example:

- We have an array `numbers` containing unsorted numbers.
- We call the `sort()` method on the `numbers` array and provide a custom comparison function `(a, b) => a - b` to sort the elements in ascending order.
- The comparison function subtracts `b` from `a`, which sorts the numbers in ascending order.
- After sorting, the sorted array is logged to the console.

You can also sort arrays of strings, objects, or other types by providing appropriate comparison functions to the `sort()` method. Additionally, you can use the `reverse()` method to reverse the order of elements in the sorted array if you need descending order sorting.

### 2. Sort a String

**=>** In JavaScript, strings are immutable, meaning you cannot directly sort the characters of a string in place. However, you can convert the string to an array of characters, sort the array, and then join the characters back into a string to achieve the desired result.

Here's how you can sort a string in JavaScript:

```javascript
const str = "hello";
const sortedStr = str.split("").sort().join("");
console.log("Original String:", str); // Output: hello
console.log("Sorted String:", sortedStr); // Output: ehllo
```

In this example:

- We have a string `str` containing the word "hello".
- We use the `split("")` method to convert the string into an array of characters.
- We call the `sort()` method on the array to sort the characters in lexicographical order (alphabetical order).
- We use the `join("")` method to join the sorted array of characters back into a string.
- Finally, we log both the original and sorted strings to the console.

Keep in mind that sorting a string in this way sorts the characters based on their Unicode code points. If you need a custom sorting order, you can provide a comparison function to the `sort()` method. Additionally, if you need to handle Unicode characters or special cases, you may need to use more advanced techniques or libraries.

## # Basic Sorting Algoritms

### 1. Bubble Sort In JavaScript

**=>** Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Here's how you can implement bubble sort in JavaScript:

```javascript
function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
  
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap arr[i] and arr[i+1]
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);

    return arr;
}

// Test the function
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
console.log("Original Array:", numbers); // Output: [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]
console.log("Sorted Array:", bubbleSort(numbers)); // Output: [0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283]
```

In this implementation:

- We use a `do-while` loop to repeatedly iterate over the array until no more swaps are needed, indicating that the array is sorted.
- Within the loop, we use a `for` loop to compare adjacent elements and swap them if they are in the wrong order.
- We use a `swapped` flag to keep track of whether any swaps were made in each pass through the array. If no swaps are made in a pass, the array is considered sorted, and the loop terminates.
- Finally, we return the sorted array.

Bubble sort has a time complexity of O(n^2) in the worst and average cases, where n is the number of elements in the array. It is not considered efficient for large datasets but can be useful for educational purposes or for sorting small arrays.

### 2. Selection Sort in JavaScript

**=>** Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum element from the unsorted part of the array and moving it to the beginning. Here's how you can implement Selection Sort in JavaScript:

```javascript
function selectionSort(arr) {
    const n = arr.length;

    // Traverse through all array elements
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in unsorted array
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

// Test the function
const arr = [64, 25, 12, 22, 11];
console.log("Original Array:", arr); // Output: [64, 25, 12, 22, 11]
console.log("Sorted Array:", selectionSort(arr)); // Output: [11, 12, 22, 25, 64]
```

In this implementation:

- We define a function `selectionSort` that takes an array `arr` as input.
- We iterate through the array and for each iteration, we find the index of the minimum element in the unsorted part of the array.
- We then swap the minimum element with the first element of the unsorted part.
- We continue this process until the entire array is sorted.
- Finally, we return the sorted array.

Selection Sort has a time complexity of O(n^2) in all cases, where n is the number of elements in the array. This makes it inefficient for large arrays, but it's relatively simple to implement and can be useful for small arrays or as a teaching tool for understanding sorting algorithms.

### 3. Insertion Sort In JavaScript

**=>** Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It iterates through the array, removing one element from the input data, finds the location it belongs within the sorted list, and inserts it there. Here's how you can implement Insertion Sort in JavaScript:

```javascript
function insertionSort(arr) {
    const n = arr.length;

    // Traverse through the array starting from the second element
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;

        // Move elements of arr[0..i-1], that are greater than current,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }

    return arr;
}

// Test the function
const arr = [12, 11, 13, 5, 6];
console.log("Original Array:", arr); // Output: [12, 11, 13, 5, 6]
console.log("Sorted Array:", insertionSort(arr)); // Output: [5, 6, 11, 12, 13]
```

In this implementation:

- We define a function `insertionSort` that takes an array `arr` as input.
- We iterate through the array starting from the second element (`i = 1`).
- For each element at index `i`, we compare it with the elements to its left and shift them to the right until we find the correct position for the current element.
- We then insert the current element into its correct position.
- We continue this process until the entire array is sorted.
- Finally, we return the sorted array.

Insertion Sort has a time complexity of O(n^2) in the worst-case scenario, but it is efficient for small datasets or nearly sorted arrays.

## # Avdance Sorting Algoritms

### 1.1 Merge Sort in JavaScript

**=>** Merge Sort is a popular sorting algorithm known for its efficiency and stability. It follows the Divide and Conquer approach to recursively divide the array into smaller subarrays, sort them individually, and then merge them back together. Here's how you can implement Merge Sort in JavaScript:

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr; // Base case: array with 0 or 1 element is already sorted
    }

    // Split the array into two halves
    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    // Recursively sort each half
    const sortedLeftHalf = mergeSort(leftHalf);
    const sortedRightHalf = mergeSort(rightHalf);

    // Merge the sorted halves
    return merge(sortedLeftHalf, sortedRightHalf);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from the left and right arrays and merge them into the result array
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add any remaining elements from the left and right arrays
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Test the function
const arr = [12, 11, 13, 5, 6, 7];
console.log("Original Array:", arr); // Output: [12, 11, 13, 5, 6, 7]
console.log("Sorted Array:", mergeSort(arr)); // Output: [5, 6, 7, 11, 12, 13]
```

In this implementation:

- We define a function `mergeSort` that takes an array `arr` as input.
- If the array has 0 or 1 element, it is already sorted, so we return the array.
- Otherwise, we split the array into two halves, sort each half recursively using mergeSort, and then merge the sorted halves using the `merge` function.
- The `merge` function compares elements from the left and right halves and merges them into a single sorted array.
- We continue this process recursively until the entire array is sorted.
- Finally, we return the sorted array.

Merge Sort has a time complexity of O(n log n) in all cases, making it efficient for sorting large datasets. Additionally, it is a stable sorting algorithm, meaning that it preserves the relative order of equal elements.

### 1.2 Merge Sort in JavaScript (Space Optimised)

**=>** Here's an implementation of Merge Sort in JavaScript that is space-optimized by avoiding the creation of new arrays during the merging process:

```javascript
function mergeSort(arr) {
    const n = arr.length;
    const tempArr = Array(n); // Temporary array to store merged results

    // Divide the array into smaller subarrays and merge them
    for (let currSize = 1; currSize < n; currSize *= 2) {
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
            const mid = Math.min(leftStart + currSize - 1, n - 1);
            const rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);

            merge(arr, leftStart, mid, rightEnd, tempArr);
        }
    }

    return arr;
}

function merge(arr, left, mid, right, tempArr) {
    let i = left; // Initial index of first subarray
    let j = mid + 1; // Initial index of second subarray
    let k = left; // Initial index of merged subarray

    // Merge the two subarrays into tempArr
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            tempArr[k++] = arr[i++];
        } else {
            tempArr[k++] = arr[j++];
        }
    }

    // Copy the remaining elements of left subarray, if any
    while (i <= mid) {
        tempArr[k++] = arr[i++];
    }

    // Copy the remaining elements of right subarray, if any
    while (j <= right) {
        tempArr[k++] = arr[j++];
    }

    // Copy back the merged elements from tempArr to original array
    for (let idx = left; idx <= right; idx++) {
        arr[idx] = tempArr[idx];
    }
}

// Test the function
const arr = [12, 11, 13, 5, 6, 7];
console.log("Original Array:", arr); // Output: [12, 11, 13, 5, 6, 7]
console.log("Sorted Array:", mergeSort(arr)); // Output: [5, 6, 7, 11, 12, 13]
```

In this implementation:

- We use a temporary array `tempArr` to store merged results during the merging process.
- Instead of recursively dividing the array into smaller subarrays, we use a bottom-up approach to merge subarrays of increasing size.
- The `merge` function merges two subarrays into `tempArr` and then copies the merged elements back to the original array.
- This space-optimized version of Merge Sort still has a time complexity of O(n log n) and is more efficient in terms of memory usage compared to the traditional recursive approach.

### 2 Quick Sort in JavaScript

**=>** Here's an implementation of Quick Sort in JavaScript:

```javascript
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr; // Base case: array with 0 or 1 element is already sorted
    }

    const pivot = arr[0]; // Choose the first element as the pivot
    const left = [];
    const right = [];

    // Partition the array into two subarrays: elements less than pivot and elements greater than pivot
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursively sort the left and right subarrays
    const sortedLeft = quickSort(left);
    const sortedRight = quickSort(right);

    // Concatenate the sorted left subarray, pivot, and sorted right subarray
    return sortedLeft.concat(pivot, sortedRight);
}

// Test the function
const arr = [10, 7, 8, 9, 1, 5];
console.log("Original Array:", arr); // Output: [10, 7, 8, 9, 1, 5]
console.log("Sorted Array:", quickSort(arr)); // Output: [1, 5, 7, 8, 9, 10]
```

In this implementation:

- We choose the first element of the array as the pivot.
- We partition the array into two subarrays: elements less than the pivot and elements greater than the pivot.
- We recursively apply Quick Sort to the left and right subarrays.
- Finally, we concatenate the sorted left subarray, pivot, and sorted right subarray to form the sorted array.

Quick Sort has an average time complexity of O(n log n), making it an efficient sorting algorithm for most cases. However, its worst-case time complexity is O(n^2) when the pivot selection is poor (e.g., always choosing the smallest or largest element), but this can be mitigated by using randomized pivot selection or other techniques.
