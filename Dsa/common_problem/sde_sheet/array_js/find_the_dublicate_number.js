function findDuplicate(nums) {
    // Phase 1: Detect intersection point of the two pointers
    let slow = nums[0];
    let fast = nums[0];
    do {
        slow = nums[slow]; // Move one step
        fast = nums[nums[fast]]; // Move two steps
    } while (slow !== fast);

    // Phase 2: Find the entrance to the cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow]; // Move one step
        fast = nums[fast]; // Move one step
    }

    return slow; // Return the repeated number
}

// Test case
const nums = [1, 3, 4, 2, 2];
console.log(findDuplicate(nums)); // Output: 2
