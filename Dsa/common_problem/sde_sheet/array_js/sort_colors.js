function sortColors(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            // If current element is 0, swap it with the element at low pointer
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // If current element is 1, move mid pointer to next element
            mid++;
        } else {
            // If current element is 2, swap it with the element at high pointer
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}

// Test case
const nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums); // Output: [0, 0, 1, 1, 2, 2]
