function singleNonDuplicate(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // Check if mid is even
        if (mid % 2 === 1) mid--;

        // If the mid element is followed by its pair
        if (nums[mid] === nums[mid + 1]) {
            left = mid + 2;
        } else {
            right = mid;
        }
    }

    return nums[left];
}

// Test case
const nums = [1, 1, 2, 3, 3, 4, 4, 8, 8];
console.log(singleNonDuplicate(nums)); // Output: 2
