function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid; // Target found, return its index
        } else if (nums[mid] < target) {
            left = mid + 1; // Continue searching in the right half
        } else {
            right = mid; // Continue searching in the left half
        }
    }

    return left; // Return the index where target should be inserted
}

// Test case
const nums = [1, 3, 4, 5, 6];
const target = 2;
console.log(searchInsert(nums, target)); // Output: 1
