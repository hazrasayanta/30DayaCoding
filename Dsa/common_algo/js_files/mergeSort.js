function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr; // Base case: if the array has 0 or 1 element, it is already sorted
    }

    // Divide the array into two halves
    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    // Recursively sort each half
    const sortedLeftHalf = mergeSort(leftHalf);
    const sortedRightHalf = mergeSort(rightHalf);

    // Merge the sorted halves
    return merge(sortedLeftHalf, sortedRightHalf);
}

// Merge function to merge two sorted arrays
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and add the smaller one to the result array
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements from left array
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Add remaining elements from right array
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;
}

// Example usage
const array = [5, 3, 8, 4, 2];
console.log("Original array:", array);
console.log("Sorted array:", mergeSort(array));
// Output: [2, 3, 4, 5, 8]
