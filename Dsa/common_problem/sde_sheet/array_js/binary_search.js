function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid; // Target found, return its index
        } else if (nums[mid] < target) {
            left = mid + 1; // Continue searching in the right half
        } else {
            right = mid - 1; // Continue searching in the left half
        }
    }

    return -1; // Target not found
}

// Test case
const nums = [-1, 0, 3, 5, 9, 12];
const target = 9;
console.log(search(nums, target)); // Output: 4
