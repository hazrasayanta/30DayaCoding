### **Two Pointers Algorithm**

#### Concept:

The **Two Pointers** technique involves using two pointers (or indices) to traverse through a data structure (usually an array or a string). Typically, one pointer starts at the beginning, and the other at the end, and they move towards each other based on specific conditions. This technique is useful for problems where you need to find pairs, reverse arrays, or merge arrays.

The Two Pointers technique helps reduce the time complexity of problems that would otherwise require nested loops. Many problems can be solved efficiently using this approach with a time complexity of **O(n)**.

#### Key Use Cases:

- Finding pairs that satisfy certain conditions (e.g., sum equals a target).
- Removing duplicates in a sorted array.
- Reversing a string or an array.
- Solving problems involving contiguous subarrays.
- Merging two sorted arrays.

---

### **Common Two Pointers Problems**

#### 1. **Pair Sum Problem (Two Sum in a Sorted Array)**

This is a classic problem where you have to find two numbers in a sorted array that sum up to a given target.

#### Problem Statement:

Given a sorted array of integers and a target sum, return the indices of two numbers such that they add up to the target.

#### Example:

```javascript
function twoSum(arr, target) {
    let left = 0;               // Start pointer at the beginning
    let right = arr.length - 1;  // End pointer at the end

    while (left < right) {
        const sum = arr[left] + arr[right];  // Calculate sum of elements at pointers
        if (sum === target) {
            return [left, right];  // Return indices if sum equals target
        } else if (sum < target) {
            left++;  // Move left pointer to increase the sum
        } else {
            right--;  // Move right pointer to decrease the sum
        }
    }
  
    return [];  // Return empty array if no valid pair is found
}

// Example usage
const arr = [1, 2, 3, 4, 6];
const target = 6;
console.log(twoSum(arr, target));  // Output: [1, 3] (arr[1] + arr[3] = 2 + 4 = 6)
```

#### Explanation:

- **Initial Setup**: The array is sorted, so we can start with one pointer at the beginning and the other at the end.
- **Pointer Movement**: If the sum of the elements at the two pointers is less than the target, we move the left pointer (to increase the sum). If the sum is greater than the target, we move the right pointer (to decrease the sum).
- **Efficiency**: The solution works in **O(n)** time because each pointer moves only once, compared to a nested loop solution which would be **O(n²)**.

---

#### 2. **Remove Duplicates from a Sorted Array**

This is another common problem where you have to modify the array in place by removing duplicate elements from a sorted array and returning the length of the new array.

#### Problem Statement:

Given a sorted array of integers, remove the duplicates in-place such that each element appears only once and return the new length.

#### Example:

```javascript
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;

    let left = 0;  // Initialize the first pointer

    for (let right = 1; right < arr.length; right++) {
        if (arr[right] !== arr[left]) {
            left++;             // Move left pointer
            arr[left] = arr[right];  // Update the position with a unique element
        }
    }

    return left + 1;  // New length of the array
}

// Example usage
const arr = [1, 1, 2, 2, 3, 3, 4, 4];
console.log(removeDuplicates(arr));  // Output: 4 (The first four elements of the array are [1, 2, 3, 4])
```

#### Explanation:

- **Pointer Roles**: The left pointer is used to store unique elements, while the right pointer scans through the array. Every time we find a new unique element, we increment the left pointer and store the new element there.
- **In-place Modification**: The array is modified in place, with unique elements shifted to the left side of the array.
- **Efficiency**: This solution runs in **O(n)** time, which is efficient compared to creating a new array.

---

#### 3. **Reverse a String**

This problem involves reversing a string in place by swapping elements at the beginning and the end using two pointers.

#### Problem Statement:

Given a string (or an array of characters), reverse it in place.

#### Example:

```javascript
function reverseString(str) {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        // Swap characters at left and right pointers
        [str[left], str[right]] = [str[right], str[left]];
        left++;
        right--;
    }

    return str;
}

// Example usage
const str = ['h', 'e', 'l', 'l', 'o'];
console.log(reverseString(str));  // Output: ['o', 'l', 'l', 'e', 'h']
```

#### Explanation:

- **Pointer Movement**: The left pointer moves from the start, and the right pointer moves from the end. They swap characters until the pointers meet.
- **In-place Swapping**: The string (or character array) is reversed in place, with no additional space used other than the input array.
- **Efficiency**: The algorithm runs in **O(n)** time, with each character swapped once.

---

#### 4. **Container With Most Water (Leetcode Medium)**

This problem requires calculating the maximum amount of water that can be contained between two lines, leveraging the two-pointer technique.

#### Problem Statement:

Given `n` non-negative integers `a1, a2, ..., an`, where each represents a point at coordinate `(i, ai)`, find two lines which together with the x-axis form a container, such that the container contains the most water.

#### Example:

```javascript
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        // Calculate the area with current left and right pointers
        const currentArea = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, currentArea);

        // Move the pointer that points to the shorter line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}

// Example usage
const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height));  // Output: 49
```

#### Explanation:

- **Pointer Movement**: The two pointers start at the beginning and the end. To maximize the area, you move the pointer with the shorter line, because moving the taller one wouldn’t increase the area.
- **Efficiency**: The solution runs in **O(n)** time, as each pointer is moved once.

---

### Summary of the Two Pointers Pattern:

- **Efficiency**: Many problems that involve pairs, or comparing elements from both ends of an array, can be solved using two pointers in linear time.
- **Use Cases**: The Two Pointers technique is useful for problems involving searching for pairs, partitioning arrays, removing duplicates, and more.
- **Optimizing Nested Loops**: Problems that require checking all pairs in an array, or comparing elements in sorted arrays, can often be optimized with Two Pointers instead of nested loops.

If you'd like further explanations or additional examples, feel free to ask!

# The **Two Pointers Pattern** is frequently used in popular coding problems on LeetCode, particularly in the Blind 150 list. Here's a list of the most notable problems in the **Blind 150** that use the **Two Pointers** approach:

### **Two Pointers Problems from LeetCode Blind 150**:

1. **Two Sum II - Input Array Is Sorted** (LeetCode #167)

   - **Problem**: Find two numbers in a sorted array that add up to a given target.
   - **Pattern**: Use two pointers starting at the beginning and end of the array to find the target sum.
2. **3Sum** (LeetCode #15)

   - **Problem**: Find all unique triplets in the array which give the sum of zero.
   - **Pattern**: First, fix one number and use two pointers to find the other two numbers that sum to zero.
3. **Container With Most Water** (LeetCode #11)

   - **Problem**: Find two lines that together with the x-axis form a container, such that the container contains the most water.
   - **Pattern**: Use two pointers at the start and end of the array and calculate the maximum area while moving the pointer with the smaller height.
4. **Remove Duplicates from Sorted Array** (LeetCode #26)

   - **Problem**: Remove duplicates from a sorted array in-place and return the new length.
   - **Pattern**: Use two pointers: one to scan the array and another to store unique elements.
5. **Trapping Rain Water** (LeetCode #42)

   - **Problem**: Given an elevation map, compute how much water it can trap after raining.
   - **Pattern**: Use two pointers from the start and end to calculate the trapped water.
6. **Move Zeroes** (LeetCode #283)

   - **Problem**: Move all 0’s in an array to the end while maintaining the relative order of the non-zero elements.
   - **Pattern**: Use two pointers, one to track the current position and one to swap non-zero elements.
7. **Linked List Cycle** (LeetCode #141)

   - **Problem**: Detect if there is a cycle in a linked list.
   - **Pattern**: Use two pointers (fast and slow), moving at different speeds to detect cycles.
8. **Merge Sorted Array** (LeetCode #88)

   - **Problem**: Merge two sorted arrays into one sorted array in-place.
   - **Pattern**: Use two pointers, one for each array, and merge them by comparing elements.
9. **Sort Colors** (LeetCode #75)

   - **Problem**: Sort an array containing 0’s, 1’s, and 2’s.
   - **Pattern**: Use two pointers to partition the array in one pass (Dutch National Flag problem).
10. **Palindrome Linked List** (LeetCode #234)

- **Problem**: Check if a singly linked list is a palindrome.
- **Pattern**: Use two pointers: one to find the middle and the other to compare elements in reverse order.

11. **Reverse Linked List** (LeetCode #206)

- **Problem**: Reverse a singly linked list.
- **Pattern**: Use two pointers: one to track the current node and one to point to the next node.

12. **Remove Nth Node From End of List** (LeetCode #19)

- **Problem**: Remove the N-th node from the end of the list in one pass.
- **Pattern**: Use two pointers where one is ahead by `n` steps to find the target node.

13. **Find Minimum in Rotated Sorted Array** (LeetCode #153)

- **Problem**: Find the minimum element in a rotated sorted array.
- **Pattern**: Use binary search combined with two pointers.

14. **Longest Substring Without Repeating Characters** (LeetCode #3)

- **Problem**: Find the length of the longest substring without repeating characters.
- **Pattern**: Use a sliding window (a variation of two pointers) to find the longest substring.

15. **Valid Palindrome** (LeetCode #125)

- **Problem**: Check if a given string is a palindrome, considering only alphanumeric characters.
- **Pattern**: Use two pointers to compare characters from both ends.

16. **Valid Parenthesis String** (LeetCode #678)

- **Problem**: Determine if a string of parentheses and asterisks is valid.
- **Pattern**: Use two pointers to evaluate the validity of parentheses in different cases.


### **Two Sum II - Input Array Is Sorted** (LeetCode #167)

#### **Problem**:

You are given a **sorted** array of integers `numbers[]` and a target integer `target`. The task is to find **two distinct numbers** from the array such that their sum equals the target value. You need to return the **1-based** indices of the two numbers. Note that the array is sorted in non-decreasing order, and there is exactly one solution.

#### **Example**:

```plaintext
Input: numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.
```

### **Pattern: Two Pointers**

Since the array is sorted, the **Two Pointers** technique works perfectly here. We can place one pointer at the beginning of the array and the other at the end, then adjust them based on the sum of the numbers at those two pointers.

#### **Approach**:

1. **Initialize Two Pointers**:

   - One pointer, `left`, starts at the beginning of the array (`index 0`).
   - Another pointer, `right`, starts at the end of the array (`index n - 1`).
2. **Sum Evaluation**:

   - Compute the sum of `numbers[left] + numbers[right]`.
   - If the sum equals the target, return the 1-based indices: `[left + 1, right + 1]`.
   - If the sum is **less** than the target, increment the `left` pointer to increase the sum.
   - If the sum is **greater** than the target, decrement the `right` pointer to decrease the sum.
3. **Stop when solution is found**:

   - Since it's guaranteed that there is exactly one solution, you don't need to handle cases where no solution exists.

#### **Algorithm**:

```javascript
var twoSum = function(numbers, target) {
    let left = 0; // Start at the beginning
    let right = numbers.length - 1; // Start at the end
  
    while (left < right) {
        let sum = numbers[left] + numbers[right];
      
        if (sum === target) {
            return [left + 1, right + 1]; // Return 1-based indices
        } else if (sum < target) {
            left++; // Move left pointer to the right to increase sum
        } else {
            right--; // Move right pointer to the left to decrease sum
        }
    }
  
    return []; // Shouldn't reach here as a solution is guaranteed
};
```

#### **Time Complexity**:

- **O(n)** where `n` is the number of elements in the array.
  - We traverse the array with two pointers, and each pointer moves at most `n` times.

#### **Space Complexity**:

- **O(1)** because no additional data structures are used beyond the input array and a few variables for the pointers.

---

### **Detailed Example**:

#### **Input**:

- `numbers = [2, 7, 11, 15]`
- `target = 9`

#### **Step-by-step Execution**:

1. **Initial state**:

   - `left = 0` (points to `2`)
   - `right = 3` (points to `15`)

   Sum = `numbers[left] + numbers[right] = 2 + 15 = 17`. This is **greater** than the target, so we move the `right` pointer one step left.
2. **Second state**:

   - `left = 0` (still points to `2`)
   - `right = 2` (points to `11`)

   Sum = `numbers[left] + numbers[right] = 2 + 11 = 13`. This is still **greater** than the target, so we move the `right` pointer one step left again.
3. **Third state**:

   - `left = 0` (still points to `2`)
   - `right = 1` (points to `7`)

   Sum = `numbers[left] + numbers[right] = 2 + 7 = 9`. This matches the target. Therefore, we return `[left + 1, right + 1]` which is `[1, 2]`.

#### **Edge Cases**:

1. **Only Two Elements**: If there are exactly two numbers, they must form the correct sum.
2. **Negative Numbers**: Works well with both positive and negative numbers as long as the array is sorted.
3. **Duplicates**: The problem doesn't require handling duplicates, but the algorithm works even if the array contains repeated values.

---

### **Why Two Pointers Works?**

- The array is sorted, which allows us to use the two pointers approach. By comparing sums at both ends of the array, we can intelligently adjust our pointers (increase or decrease the sum) without needing nested loops. This makes the solution efficient with a linear time complexity of **O(n)**.

This problem is a great introduction to the **Two Pointers** technique because of its simplicity and how it avoids brute-force solutions that would typically require **O(n²)** time complexity.


### **3Sum** (LeetCode #15)

#### **Problem**:

Given an integer array `nums`, return all the **triplets** `[nums[i], nums[j], nums[k]]` such that `i != j != k` and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.

#### **Example**:

```plaintext
Input: nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]
Explanation: The triplets that sum to 0 are [-1, -1, 2] and [-1, 0, 1].
```

### **Pattern: Two Pointers**

This problem uses the **Two Pointers** approach but applied in combination with **sorting** and fixing one element at a time. The idea is to reduce the complexity of the brute-force approach and avoid duplicates.

#### **Approach**:

1. **Sort the array**: Sorting simplifies the process of avoiding duplicates and helps implement the two-pointer technique.
2. **Fix the first element**: For each element in the array, treat it as a fixed `first` element of the triplet, and use two pointers to find the other two elements that sum to zero with `first`.
3. **Use Two Pointers** for the remaining part of the array:

   - Set one pointer `left` at the next element (after `first`) and another pointer `right` at the end of the array.
   - Calculate the sum of the three elements (`nums[first] + nums[left] + nums[right]`).
   - If the sum is zero, you've found a valid triplet. Move both pointers inward to find other combinations.
   - If the sum is less than zero, increment the `left` pointer to increase the sum.
   - If the sum is greater than zero, decrement the `right` pointer to decrease the sum.
4. **Skip Duplicates**: After finding a triplet, increment or decrement the pointers to skip over duplicate elements.

#### **Algorithm**:

```javascript
var threeSum = function(nums) {
    const result = [];
    nums.sort((a, b) => a - b); // Sort the array to apply two-pointer technique
  
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates for the first element
      
        let left = i + 1;
        let right = nums.length - 1;
      
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
          
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
              
                // Move left pointer right and skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Move right pointer left and skip duplicates
                while (left < right && nums[right] === nums[right - 1]) right--;
              
                left++;
                right--;
            } else if (sum < 0) {
                left++; // We need a larger sum, move left pointer to the right
            } else {
                right--; // We need a smaller sum, move right pointer to the left
            }
        }
    }
  
    return result;
};
```

#### **Time Complexity**:

- **O(n²)**: Sorting the array takes **O(n log n)**, and for each fixed element, the two-pointer approach takes **O(n)**. As we are repeating this for each element, the overall time complexity is **O(n²)**.

#### **Space Complexity**:

- **O(1)** for the extra space apart from the input and output. However, the output space is **O(k)** where `k` is the number of unique triplets found.

---

### **Detailed Example**:

#### **Input**:

- `nums = [-1, 0, 1, 2, -1, -4]`

#### **Step-by-step Execution**:

1. **Sort the array**:

   ```plaintext
   nums = [-4, -1, -1, 0, 1, 2]
   ```
2. **Fix `nums[0] = -4`**:

   - Set `left = 1` (`nums[1] = -1`) and `right = 5` (`nums[5] = 2`).
   - Calculate sum: `-4 + (-1) + 2 = -3`. The sum is less than 0, so move the `left` pointer to `2`.
3. **Fix `nums[1] = -1`**:

   - Set `left = 2` (`nums[2] = -1`) and `right = 5` (`nums[5] = 2`).
   - Sum: `-1 + (-1) + 2 = 0`. Found a triplet: `[-1, -1, 2]`.
   - Move both pointers to avoid duplicates: `left = 3`, `right = 4`.
4. **Fix `nums[1] = -1` (continued)**:

   - `left = 3` (`nums[3] = 0`) and `right = 4` (`nums[4] = 1`).
   - Sum: `-1 + 0 + 1 = 0`. Found another triplet: `[-1, 0, 1]`.
5. **Fix `nums[2] = -1`** (duplicate, so skip).
6. **Fix `nums[3] = 0`**:

   - Set `left = 4` (`nums[4] = 1`) and `right = 5` (`nums[5] = 2`).
   - Sum: `0 + 1 + 2 = 3`. The sum is greater than 0, so decrement `right`.
7. **Finish**: No more combinations. Return `[[ -1, -1, 2 ], [ -1, 0, 1 ]]`.

#### **Edge Cases**:

1. **Less than 3 elements**: If there are fewer than 3 elements, no triplets are possible.
2. **All positive or all negative numbers**: If all numbers are positive or negative, no valid triplets exist.
3. **Duplicates**: Ensure that the solution handles duplicates properly by skipping repeated elements after each valid triplet is found.

---

### **Why Two Pointers Works?**

The array is sorted, so once you fix the first element of the triplet, you can use the two pointers technique to find the other two elements. Sorting helps in:

- Efficiently navigating the search space using two pointers.
- Skipping over duplicates to avoid repeating the same triplet combinations.

This pattern transforms the brute-force **O(n³)** approach (using 3 nested loops) into a more optimal **O(n²)** solution.


### **Container With Most Water** (LeetCode #11)

#### **Problem**:

You are given an array `height` where `height[i]` represents the height of a vertical line drawn at index `i`. The goal is to find two lines such that together with the x-axis they form a container that holds the maximum amount of water. You need to return the maximum amount of water that the container can store.

#### **Example**:

```plaintext
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The two lines with the maximum water capacity are at index 1 and index 8 (heights 8 and 7), forming a container with a width of 7 and a height of 7. The area is 7 * 7 = 49.
```

#### **Pattern: Two Pointers**

This problem can be efficiently solved using the **Two Pointers** technique. By placing one pointer at the beginning and the other at the end of the array, you can iterate toward the center while calculating and comparing areas formed by the two lines.

#### **Approach**:

1. **Initialize Two Pointers**:

   - Set one pointer `left` at the beginning of the array and another pointer `right` at the end.
2. **Calculate the Area**:

   - The width of the container is determined by the distance between the two pointers: `right - left`.
   - The height is the **minimum** of the two heights: `min(height[left], height[right])`.
   - The area of the container is `width * height`.
3. **Maximize the Area**:

   - Track the maximum area found so far.
   - Move the pointer with the smaller height, as moving it might lead to a higher container (since the area is limited by the shorter line).
4. **Continue until pointers meet**:

   - Repeat this process, moving the pointers toward each other, until they meet in the middle.

#### **Algorithm**:

```javascript
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;
  
    while (left < right) {
        // Calculate the current area
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;
      
        // Update the maximum area
        maxArea = Math.max(maxArea, currentArea);
      
        // Move the pointer with the smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
  
    return maxArea;
};
```

#### **Explanation**:

1. **Start with two pointers**:

   - One at the beginning (`left = 0`) and the other at the end (`right = height.length - 1`).
2. **Calculate the area**:

   - At each step, calculate the width as `right - left` and the height as `min(height[left], height[right])`.
   - The area is `width * height`.
3. **Move the smaller pointer**:

   - To maximize the area, move the pointer with the smaller height inward because increasing the shorter line might lead to a larger container.
   - This is because the area is limited by the shorter of the two heights, so moving the shorter pointer gives a chance to find a taller line.
4. **End when pointers meet**:

   - The loop terminates when `left` meets `right`, meaning all possible containers have been considered.

#### **Time Complexity**:

- **O(n)**: We only pass through the array once while moving the two pointers.

#### **Space Complexity**:

- **O(1)**: Only a few extra variables are used to store the maximum area and the pointers.

---

### **Detailed Example**:

#### **Input**:

```plaintext
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
```

1. **Initial setup**:

   - `left = 0` (height = 1)
   - `right = 8` (height = 7)
   - **Width** = 8 (because `8 - 0 = 8`)
   - **Height** = min(1, 7) = 1
   - **Area** = 8 * 1 = 8
2. **Move the left pointer (since height[left] < height[right])**:

   - `left = 1` (height = 8)
   - `right = 8` (height = 7)
   - **Width** = 7 (because `8 - 1 = 7`)
   - **Height** = min(8, 7) = 7
   - **Area** = 7 * 7 = 49 (maximum so far)
3. **Move the right pointer**:

   - `left = 1` (height = 8)
   - `right = 7` (height = 3)
   - **Width** = 6
   - **Height** = min(8, 3) = 3
   - **Area** = 6 * 3 = 18
4. **Move the right pointer**:

   - `left = 1` (height = 8)
   - `right = 6` (height = 8)
   - **Width** = 5
   - **Height** = min(8, 8) = 8
   - **Area** = 5 * 8 = 40
5. **Move the right pointer**:

   - `left = 1` (height = 8)
   - `right = 5` (height = 4)
   - **Width** = 4
   - **Height** = min(8, 4) = 4
   - **Area** = 4 * 4 = 16
6. **Move the right pointer**:

   - `left = 1` (height = 8)
   - `right = 4` (height = 5)
   - **Width** = 3
   - **Height** = min(8, 5) = 5
   - **Area** = 3 * 5 = 15
7. **Move the right pointer**:

   - `left = 1` (height = 8)
   - `right = 3` (height = 2)
   - **Width** = 2
   - **Height** = min(8, 2) = 2
   - **Area** = 2 * 2 = 4
8. **Move the right pointer**:

   - `left = 1` (height = 8)
   - `right = 2` (height = 6)
   - **Width** = 1
   - **Height** = min(8, 6) = 6
   - **Area** = 1 * 6 = 6
9. **Finish**:

   - The maximum area found is `49`.

---

### **Key Insights**:

- The problem uses the **Two Pointers** pattern because we need to find an optimal solution by considering all possible containers formed by two vertical lines.
- Moving the pointer with the smaller height allows us to potentially find a taller line, which can result in a larger area.
- Sorting the array doesn't help in this case because the problem is about maximizing the area, which is affected by both height and width. Hence, the two-pointer technique is efficient in solving this problem in linear time.
