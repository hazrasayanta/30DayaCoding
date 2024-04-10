function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j + 1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr;
}

// Example usage
const array = [5, 3, 8, 4, 2];
console.log("Original array:", array);
console.log("Sorted array:", bubbleSort(array));
// Output: [2, 3, 4, 5, 8]
