function canJump(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            // If the current index is beyond the maximum reach, return false
            return false;
        }
        // Update the maximum reach
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) {
            // If the maximum reach is beyond or at the last index, return true
            return true;
        }
    }

    return false;
}

// Test case
const nums = [2, 3, 1, 1, 4];
console.log(canJump(nums)); // Output: true
