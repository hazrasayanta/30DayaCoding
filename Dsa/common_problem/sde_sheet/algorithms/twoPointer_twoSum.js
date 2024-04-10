function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];

        if (sum === target) {
            return [arr[left], arr[right]]; // Return the pair of elements
        } else if (sum < target) {
            left++; // Move left pointer to the right to increase the sum
        } else {
            right--; // Move right pointer to the left to decrease the sum
        }
    }

    return []; // Return empty array if no such pair exists
}

// Example usage
const arr = [1, 2, 3, 4, 5, 6];
const target = 9;
console.log("Pair of elements:", twoSum(arr, target)); // Output: [3, 6]
