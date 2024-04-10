function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      // Swap nums[low] and nums[mid]
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      // No need to swap, just move to the next element
      mid++;
    } else if (nums[mid] === 2) {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
      // Don't increment mid because the swapped element needs to be re-examined
    }
  }
}

// Test the function
const nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums); // Output: [0, 0, 1, 1, 2, 2]
