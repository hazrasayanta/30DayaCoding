function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // Find the middle index of the array
        let mid = Math.floor((left + right) / 2);

        // If the target is found at the middle, return the index
        if (arr[mid] === target) {
            return mid;
        }

        // If the target is less than the middle element, search the left half
        if (target < arr[mid]) {
            right = mid - 1;
        }
        // If the target is greater than the middle element, search the right half
        else {
            left = mid + 1;
        }
    }

    // If the target is not found, return -1
    return -1;
}

// Example usage
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 5;
console.log("Index of target element:", binarySearch(array, target));
// Output: 4
