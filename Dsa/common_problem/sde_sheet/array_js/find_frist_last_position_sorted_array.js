function searchRange(nums, target) {
    // Helper function to find the leftmost (starting) index of target
    const findLeftIndex = () => {
        let left = 0;
        let right = nums.length - 1;
        let leftIndex = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                leftIndex = mid; // Update leftIndex if target found
                right = mid - 1; // Continue searching in the left half
            } else if (nums[mid] < target) {
                left = mid + 1; // Continue searching in the right half
            } else {
                right = mid - 1; // Continue searching in the left half
            }
        }

        return leftIndex;
    };

    // Helper function to find the rightmost (ending) index of target
    const findRightIndex = () => {
        let left = 0;
        let right = nums.length - 1;
        let rightIndex = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                rightIndex = mid; // Update rightIndex if target found
                left = mid + 1; // Continue searching in the right half
            } else if (nums[mid] < target) {
                left = mid + 1; // Continue searching in the right half
            } else {
                right = mid - 1; // Continue searching in the left half
            }
        }

        return rightIndex;
    };

    // Find the leftmost and rightmost indices of target
    const leftIndex = findLeftIndex();
    const rightIndex = findRightIndex();

    return [leftIndex, rightIndex];
}

// Test case
const nums = [5, 7, 7, 8, 8, 10];
const target = 8;
console.log(searchRange(nums, target)); // Output: [3, 4]
