function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return the index if the target is found
        }
    }
    return -1; // Return -1 if the target is not found
}

// Example usage
const array = [5, 3, 8, 4, 2];
const target = 8;
console.log("Index of target element:", linearSearch(array, target));
// Output: 2