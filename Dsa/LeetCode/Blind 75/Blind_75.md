# The **Blind 75** is a curated list of 75 essential coding interview questions that are popular among software engineers. Here’s a breakdown of the categories and the problems typically included in the Blind 75 list:

### Arrays and Hashing

1. Two Sum
2. Best Time to Buy and Sell Stock
3. Contains Duplicate
4. Product of Array Except Self
5. Maximum Subarray
6. Maximum Product Subarray
7. Find Minimum in Rotated Sorted Array
8. Search in Rotated Sorted Array
9. 3Sum
10. Container With Most Water

### Sliding Window

11. Longest Substring Without Repeating Characters
12. Minimum Window Substring
13. Permutation in String
14. Longest Repeating Character Replacement

### Binary Search

15. Binary Search
16. Find First and Last Position of Element in Sorted Array
17. Search a 2D Matrix
18. Kth Largest Element in an Array

### Linked Lists

19. Reverse a Linked List
20. Detect a Cycle in Linked List
21. Merge Two Sorted Lists
22. Merge k Sorted Lists
23. Remove Nth Node From End of List
24. Copy List with Random Pointer

### Trees and Graphs

25. Binary Tree Inorder Traversal
26. Validate Binary Search Tree
27. Lowest Common Ancestor of a Binary Search Tree
28. Implement Trie (Prefix Tree)
29. Add and Search Word - Data structure design
30. Word Search
31. Number of Islands
32. Clone Graph

### Dynamic Programming

33. Climbing Stairs
34. Coin Change
35. Longest Increasing Subsequence
36. Longest Common Subsequence
37. Word Break
38. Maximum Product Subarray
39. Decode Ways
40. Unique Paths
41. Jump Game
42. Minimum Path Sum
43. House Robber

### Backtracking

44. Permutations
45. Subsets
46. Combination Sum
47. N-Queens
48. Word Search II

### Other

49. Valid Parentheses
50. Implement strStr()
51. Rotate Image
52. Group Anagrams
53. Minimum Window Substring
54. Top K Frequent Elements
55. Daily Temperatures
56. Sliding Window Maximum
57. Course Schedule
58. Evaluate Reverse Polish Notation
59. Binary Tree Level Order Traversal
60. Find All Anagrams in a String

### Additional Topics

61. Largest Rectangle in Histogram
62. Trapping Rain Water
63. Serialize and Deserialize Binary Tree
64. Design Hit Counter
65. Range Sum Query - Immutable
66. Longest Palindromic Substring
67. Palindrome Partitioning
68. Coin Change 2
69. Maximum Subarray Sum Circular
70. Search in Rotated Sorted Array II
71. Find the Duplicate Number
72. Maximum Sum of Non-Adjacent Elements
73. Shortest Path in Binary Matrix
74. 0/1 Knapsack Problem
75. Count of Smaller Numbers After Self

You can find these problems on [LeetCode](https://leetcode.com/) by searching for the titles. Additionally, various platforms and resources provide tutorials and discussions around these problems to help you understand and solve them effectively.

# < Arrays and Hashing >

## 1. Two Sum

**=>** Here's the solution for the **Two Sum** problem along with a detailed explanation, as well as the time and space complexity analysis.

### Problem Statement

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

### Example

```plaintext
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
```

### JavaScript Solution

```javascript
function twoSum(nums, target) {
    const map = new Map(); // Create a map to store the number and its index
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]; // Calculate the complement
        if (map.has(complement)) { // Check if the complement is in the map
            return [map.get(complement), i]; // Return the indices
        }
        map.set(nums[i], i); // Store the number and its index in the map
    }
    return []; // Return an empty array if no solution is found
}
```

### Explanation

1. **Initialization**: Create a new `Map` to store the numbers and their corresponding indices.
2. **Iterate through the Array**: Loop through each number in the `nums` array:

   - Calculate the `complement`, which is the difference between the `target` and the current number.
3. **Check for Complement**: Use the `Map` to check if the `complement` exists:

   - If it exists, return the index of the `complement` (retrieved from the map) and the current index.
4. **Store the Current Number**: If the `complement` does not exist in the map, store the current number and its index in the map for future reference.
5. **Return Result**: If no solution is found by the end of the loop, return an empty array.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We traverse the array once, and each lookup in the map takes constant time \( O(1) \).
- **Space Complexity**: \( O(n) \)

  - In the worst case, we store all `n` numbers in the map.

### Example Usage

```javascript
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(result); // Output: [0, 1]
```

## 2. Best Time to Buy and Sell Stock

**=>** Here’s the solution for the **Best Time to Buy and Sell Stock** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

### Example

```plaintext
Input: prices = [7, 1, 5, 3, 6, 4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.
```

### JavaScript Solution

```javascript
function maxProfit(prices) {
    let maxProfit = 0; // To track the maximum profit
    let minPrice = Infinity; // To track the minimum price so far

    for (let price of prices) {
        // Check if the current price is lower than the minimum price
        if (price < minPrice) {
            minPrice = price; // Update the minimum price
        } else {
            // Calculate the profit if sold at the current price and compare it with maxProfit
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
    }
    return maxProfit;
}
```

### Explanation

1. **Initialization**:

   - `maxProfit` is initialized to `0` because no transaction has been made yet.
   - `minPrice` is initialized to `Infinity` to track the lowest stock price seen so far.
2. **Iterate Through Prices**:

   - For each stock price, compare it with `minPrice`. If the current price is lower, update `minPrice`.
   - If the current price is higher than `minPrice`, calculate the potential profit (`price - minPrice`) and update `maxProfit` if this potential profit is greater than the current `maxProfit`.
3. **Return Result**:

   - Return the `maxProfit` at the end, which holds the highest profit possible from one buy/sell transaction.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We traverse the array only once.
- **Space Complexity**: \( O(1) \)

  - We are using only a few extra variables (`maxProfit` and `minPrice`), so the space usage is constant.

### Example Usage

```javascript
const prices = [7, 1, 5, 3, 6, 4];
const result = maxProfit(prices);
console.log(result); // Output: 5
```

### Additional Test Case

```plaintext
Input: prices = [7, 6, 4, 3, 1]
Output: 0
Explanation: In this case, no transaction is done, as the price continues to decline.
```

### Key Points

- We aim to find the best day to buy and then the best day to sell after that.
- The key is tracking the minimum price as we iterate through the prices and calculating the profit at each step.

## 3. Contains Duplicate

**=>** Here’s the solution for the **Contains Duplicate** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

### Example

```plaintext
Input: nums = [1, 2, 3, 1]
Output: true
```

```plaintext
Input: nums = [1, 2, 3, 4]
Output: false
```

### JavaScript Solution

```javascript
function containsDuplicate(nums) {
    const set = new Set(); // Use a Set to track seen numbers

    for (let num of nums) {
        if (set.has(num)) { // If the number is already in the set, return true
            return true;
        }
        set.add(num); // Otherwise, add the number to the set
    }
  
    return false; // If no duplicates found, return false
}
```

### Explanation

1. **Set Data Structure**:

   - A `Set` is used because it only stores unique values. As we iterate through the array, we check if the current number is already in the set. If it is, it means we've encountered a duplicate, so we return `true`.
2. **Loop Through the Array**:

   - We loop through each number in the `nums` array.
   - For each number, we check if it already exists in the set:
     - If it does, return `true` since a duplicate has been found.
     - If it doesn’t, add the number to the set and continue the loop.
3. **Return Result**:

   - If we finish the loop without finding any duplicates, return `false`.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We are iterating over the array once, and each operation with the set (checking for existence and adding elements) takes constant time \( O(1) \).
- **Space Complexity**: \( O(n) \)

  - In the worst case, all elements are distinct, and we store all `n` elements in the set, resulting in linear space usage.

### Example Usage

```javascript
const nums = [1, 2, 3, 1];
const result = containsDuplicate(nums);
console.log(result); // Output: true
```

### Additional Test Case

```plaintext
Input: nums = [1, 2, 3, 4]
Output: false
Explanation: No duplicates found in the array, so the output is false.
```

### Key Points

- Using a `Set` is an optimal approach for this problem since it efficiently handles uniqueness checks.
- This approach avoids the need for nested loops, reducing the time complexity from \( O(n^2) \) (with brute force) to \( O(n) \).

## 4. Product of Array Except Self

**=>** Here’s the solution for the **Product of Array Except Self** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The algorithm should run in **O(n)** time and should not use division.

### Example

```plaintext
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

### JavaScript Solution

```javascript
function productExceptSelf(nums) {
    const length = nums.length;
    const answer = new Array(length).fill(1);

    // Calculate left products
    let leftProduct = 1;
    for (let i = 0; i < length; i++) {
        answer[i] = leftProduct;
        leftProduct *= nums[i]; // Update left product for the next iteration
    }

    // Calculate right products and multiply with the left products
    let rightProduct = 1;
    for (let i = length - 1; i >= 0; i--) {
        answer[i] *= rightProduct; // Multiply the current answer by the right product
        rightProduct *= nums[i]; // Update right product for the next iteration
    }

    return answer;
}
```

### Explanation

1. **Left Product Calculation**:

   - Traverse the array from left to right.
   - For each element at index `i`, store the product of all elements to its left in the `answer[i]` array.
   - Initialize `leftProduct` as 1, which will accumulate the product of elements from the left side as you traverse.
2. **Right Product Calculation**:

   - Traverse the array from right to left.
   - For each element at index `i`, multiply the current value of `answer[i]` (which contains the left product) with the product of all elements to its right.
   - Initialize `rightProduct` as 1, which will accumulate the product of elements from the right side.
3. **Final Output**:

   - The final result is an array where each element at index `i` is the product of all elements of `nums` except `nums[i]`.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We traverse the array twice (once for the left products and once for the right products), so the time complexity is linear.
- **Space Complexity**: \( O(1) \) (excluding the output array)

  - We are using the `answer` array to store the result, but no extra space other than that. If we don't count the output array, the space complexity is constant.

### Example Usage

```javascript
const nums = [1, 2, 3, 4];
const result = productExceptSelf(nums);
console.log(result); // Output: [24, 12, 8, 6]
```

### Additional Test Case

```plaintext
Input: nums = [5, 2, 3, 1]
Output: [6, 15, 10, 30]
Explanation: 
- For index 0: 2 * 3 * 1 = 6
- For index 1: 5 * 3 * 1 = 15
- For index 2: 5 * 2 * 1 = 10
- For index 3: 5 * 2 * 3 = 30
```

### Key Points

- This approach avoids using division and ensures \( O(n) \) time complexity.
- By storing left products first and then calculating right products in reverse, we efficiently solve the problem using only one additional array.

## 5. Maximum Subarray

**=>** Here’s the solution for the **Maximum Subarray** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

### Example

```plaintext
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

### JavaScript Solution (Kadane’s Algorithm)

```javascript
function maxSubArray(nums) {
    let currentSum = nums[0]; // Initialize current sum to the first element
    let maxSum = nums[0]; // Initialize max sum to the first element

    for (let i = 1; i < nums.length; i++) {
        // Calculate the maximum sum of the subarray ending at the current index
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        // Update maxSum if the currentSum is greater
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}
```

### Explanation

1. **Initialization**:

   - We initialize `currentSum` and `maxSum` to the first element of the array, `nums[0]`.
2. **Iterating through the array**:

   - For each element in `nums`, we decide whether to include it in the current subarray or start a new subarray:
     - `currentSum = Math.max(nums[i], currentSum + nums[i])`:
       - If the current number alone (`nums[i]`) is greater than adding it to the current subarray (`currentSum + nums[i]`), then start a new subarray from this element.
     - Update `maxSum` by comparing it with `currentSum` at each step: `maxSum = Math.max(maxSum, currentSum)`.
3. **Return Result**:

   - At the end of the loop, `maxSum` contains the largest sum of any subarray within `nums`.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We traverse the array once, making the time complexity linear.
- **Space Complexity**: \( O(1) \)

  - We only use a few variables (`currentSum` and `maxSum`), so the space complexity is constant.

### Example Usage

```javascript
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArray(nums);
console.log(result); // Output: 6
```

### Additional Test Case

```plaintext
Input: nums = [5, 4, -1, 7, 8]
Output: 23
Explanation: The entire array is the subarray with the largest sum.
```

### Key Points

- **Kadane’s Algorithm** efficiently solves the problem in \( O(n) \) time.
- The key idea is to decide at each step whether to include the current element in the ongoing subarray or to start a new subarray.

## 6. Maximum Product Subarray

**=>** Here’s the solution for the **Maximum Product Subarray** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums`, find the contiguous subarray within `nums` that has the largest product, and return that product.

### Example

```plaintext
Input: nums = [2, 3, -2, 4]
Output: 6
Explanation: [2, 3] has the largest product = 6.
```

```plaintext
Input: nums = [-2, 0, -1]
Output: 0
Explanation: The result cannot be 2 because the subarray must be contiguous.
```

### JavaScript Solution

```javascript
function maxProduct(nums) {
    if (nums.length === 0) return 0;

    let maxProduct = nums[0];
    let minProduct = nums[0]; // To handle negative numbers
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let current = nums[i];
    
        // Swap maxProduct and minProduct if current is negative
        if (current < 0) {
            [maxProduct, minProduct] = [minProduct, maxProduct];
        }

        // Update max and min products for the current position
        maxProduct = Math.max(current, maxProduct * current);
        minProduct = Math.min(current, minProduct * current);

        // Update result to track the maximum product found
        result = Math.max(result, maxProduct);
    }

    return result;
}
```

### Explanation

1. **Track Maximum and Minimum Products**:

   - We maintain two variables: `maxProduct` and `minProduct` to track the maximum and minimum products at each index.
   - Why do we need `minProduct`? Because a negative number can flip the sign and turn a previously small product into a larger one when multiplied.
2. **Handling Negative Numbers**:

   - If the current number is negative, we swap `maxProduct` and `minProduct` because multiplying a negative number by the minimum product can result in the maximum product.
3. **Update the Result**:

   - At each step, update `result` with the maximum product found so far.
4. **Time and Space Complexity**:

   - **Time Complexity**: \( O(n) \)

     - We traverse the array once, so the time complexity is linear.
   - **Space Complexity**: \( O(1) \)

     - Only a few variables (`maxProduct`, `minProduct`, and `result`) are used, making the space complexity constant.

### Example Usage

```javascript
const nums = [2, 3, -2, 4];
const result = maxProduct(nums);
console.log(result); // Output: 6
```

### Additional Test Case

```plaintext
Input: nums = [-2, 3, -4]
Output: 24
Explanation: The product of [-2, 3, -4] is 24, which is the largest product.
```

### Key Points

- **Handling Negative Numbers** is crucial in this problem, as a negative number can flip the product from negative to positive or vice versa.
- This algorithm runs efficiently in \( O(n) \) and doesn’t use any extra space apart from a few variables.

## 7. Find Minimum in Rotated Sorted Array

**=>** Here’s the solution for the **Find Minimum in Rotated Sorted Array** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the rotated sorted array `nums` of unique elements, return the minimum element of this array.

You must write an algorithm that runs in \( O(\log n) \) time.

### Example

```plaintext
Input: nums = [3, 4, 5, 1, 2]
Output: 1
Explanation: The original array was [1, 2, 3, 4, 5] rotated 3 times.
```

```plaintext
Input: nums = [4, 5, 6, 7, 0, 1, 2]
Output: 0
Explanation: The original array was [0, 1, 2, 4, 5, 6, 7] rotated 4 times.
```

```plaintext
Input: nums = [11, 13, 15, 17]
Output: 11
Explanation: The original array was [11, 13, 15, 17] and it was not rotated.
```

### JavaScript Solution (Binary Search)

```javascript
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If mid element is greater than the last element, the minimum is in the right part
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Otherwise, the minimum is in the left part or at mid
            right = mid;
        }
    }

    return nums[left]; // After the loop, left will point to the smallest element
}
```

### Explanation

- The array is initially sorted, but after being rotated, the minimum element is somewhere within the array.
- The goal is to find the minimum element in **logarithmic time**, which implies a binary search approach.

1. **Binary Search Approach**:

   - We start with two pointers: `left` at the start and `right` at the end of the array.
   - Calculate the `mid` index: `mid = Math.floor((left + right) / 2)`.
2. **Check the Relationship Between `nums[mid]` and `nums[right]`**:

   - If `nums[mid]` is **greater than** `nums[right]`, it means the minimum element must be to the right of `mid`. So, move `left` to `mid + 1`.
   - Otherwise, if `nums[mid]` is **less than or equal to** `nums[right]`, the minimum element could be at `mid` or to the left of it, so move `right` to `mid`.
3. **Terminate When `left` Meets `right`**:

   - The loop continues until `left == right`. At this point, `left` will point to the minimum element in the rotated array.
4. **Return the Minimum**:

   - Once the loop exits, `left` will point to the smallest element in the array, so return `nums[left]`.

### Time and Space Complexity

- **Time Complexity**: \( O(\log n) \)

  - We halve the search space with every iteration of the binary search, so the time complexity is logarithmic.
- **Space Complexity**: \( O(1) \)

  - We are using only a few variables (`left`, `right`, `mid`), so the space complexity is constant.

### Example Usage

```javascript
const nums = [4, 5, 6, 7, 0, 1, 2];
const result = findMin(nums);
console.log(result); // Output: 0
```

### Additional Test Case

```plaintext
Input: nums = [3, 4, 5, 6, 7, 0, 1, 2]
Output: 0
Explanation: The original array was [0, 1, 2, 3, 4, 5, 6, 7].
```

### Key Points

- This solution leverages **binary search** to efficiently find the minimum element in \( O(\log n) \).
- The critical observation is whether the `mid` element is greater than the `right` element, which allows us to discard half of the search space in each iteration.

## 8. Search in Rotated Sorted Array

**=>** Here’s the solution for the **Search in Rotated Sorted Array** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an integer array `nums` sorted in ascending order (with **distinct** values), and a target value `target`. Suppose `nums` is rotated at some pivot unknown to you beforehand (i.e., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`).

You should search for `target` in `nums` and return its index. If it does not exist, return `-1`.

You must write an algorithm with \( O(\log n) \) runtime complexity.

### Example

```plaintext
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

```plaintext
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

```plaintext
Input: nums = [1], target = 0
Output: -1
```

### JavaScript Solution (Binary Search)

```javascript
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // Check if mid is the target
        if (nums[mid] === target) {
            return mid;
        }

        // Determine if the left half is sorted
        if (nums[left] <= nums[mid]) {
            // Target is in the sorted left half
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // If left half isn't sorted, then the right half must be sorted
        else {
            // Target is in the sorted right half
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    // If we exit the loop, the target is not in the array
    return -1;
}
```

### Explanation

1. **Binary Search with Extra Logic for Rotated Array**:

   - Since the array is rotated, we cannot perform a standard binary search. However, one half of the array (either the left or right) will always be sorted.
   - We use the binary search technique, but at each step, we check if the left or right half is sorted.
2. **Check Which Half is Sorted**:

   - Compare `nums[left]` with `nums[mid]`. If `nums[left] <= nums[mid]`, the left half is sorted.
     - If the target lies within this sorted half (i.e., `nums[left] <= target < nums[mid]`), move the `right` pointer to `mid - 1` to search the left half.
     - Otherwise, search the right half by moving the `left` pointer to `mid + 1`.
   - If the left half is not sorted, then the right half must be sorted.
     - If the target lies within the sorted right half (i.e., `nums[mid] < target <= nums[right]`), move the `left` pointer to `mid + 1` to search the right half.
     - Otherwise, search the left half by moving the `right` pointer to `mid - 1`.
3. **Return the Result**:

   - If we find the `target`, return its index.
   - If the `target` is not found, return `-1`.

### Time and Space Complexity

- **Time Complexity**: \( O(\log n) \)

  - The algorithm is a modified binary search, so we halve the search space with each iteration, making the time complexity logarithmic.
- **Space Complexity**: \( O(1) \)

  - We only use a few variables (`left`, `right`, `mid`), so the space complexity is constant.

### Example Usage

```javascript
const nums = [4, 5, 6, 7, 0, 1, 2];
const target = 0;
const result = search(nums, target);
console.log(result); // Output: 4
```

### Additional Test Cases

```plaintext
Input: nums = [4,5,6,7,0,1,2], target = 6
Output: 2

Input: nums = [1], target = 1
Output: 0

Input: nums = [6,7,0,1,2,4,5], target = 3
Output: -1
```

### Key Points

- The key to solving this problem efficiently is to leverage the fact that one half of the array (left or right) will always be sorted, which allows us to decide which half to continue searching in.
- By applying this logic, we maintain the \( O(\log n) \) time complexity expected in binary search problems.

## 9. 3Sum

**=>** Here’s the solution for the **3Sum** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that:

- \(i \neq j\), \(i \neq k\), and \(j \neq k\)
- `nums[i] + nums[j] + nums[k] == 0`

Notice that the solution set must not contain duplicate triplets.

### Example

```plaintext
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[i] + nums[j] + nums[k] == 0,
-1 + -1 + 2 = 0 and -1 + 0 + 1 = 0.
```

```plaintext
Input: nums = [0,1,1]
Output: []
Explanation: No triplet sums to 0.
```

```plaintext
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: Only one triplet sums to 0.
```

### JavaScript Solution (Two Pointers)

```javascript
function threeSum(nums) {
    const result = [];
    // Sort the array to make it easier to avoid duplicates
    nums.sort((a, b) => a - b);
  
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicate elements to avoid repeated results
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // Move left and right pointers to the next different values
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++; // Increase sum by moving left pointer to a larger value
            } else {
                right--; // Decrease sum by moving right pointer to a smaller value
            }
        }
    }

    return result;
}
```

### Explanation

1. **Sorting the Array**:

   - First, we sort the array in ascending order. This helps in efficiently using the two-pointer technique and avoiding duplicates.
2. **Fixing One Number and Using Two Pointers**:

   - The outer loop iterates through the array, fixing one number (`nums[i]`) at a time.
   - For the other two numbers, we use two pointers (`left` and `right`). The `left` pointer starts just after `i`, and the `right` pointer starts at the end of the array.
3. **Two Pointer Approach**:

   - We calculate the sum of the three numbers: `nums[i] + nums[left] + nums[right]`.
     - If the sum equals `0`, we've found a valid triplet. We add it to the result and move both `left` and `right` pointers to the next different values to avoid duplicates.
     - If the sum is less than `0`, we move the `left` pointer to the right to increase the sum.
     - If the sum is greater than `0`, we move the `right` pointer to the left to decrease the sum.
4. **Skipping Duplicates**:

   - To avoid duplicate triplets, we skip repeated elements by checking if the current element is the same as the previous one. We apply this logic both when fixing `nums[i]` and when moving the `left` and `right` pointers after finding a valid triplet.
5. **Terminate the Search**:

   - The search terminates when `left` is no longer less than `right`. After that, the loop continues to the next `i` value.

### Time and Space Complexity

- **Time Complexity**: \( O(n^2) \)

  - Sorting the array takes \( O(n \log n) \).
  - The main loop runs \( O(n) \), and for each element, we perform a two-pointer search in \( O(n) \), resulting in \( O(n^2) \) overall.
- **Space Complexity**: \( O(1) \) (excluding the space used for the result).

  - We use constant extra space for the pointers and indices. However, the result array grows based on the number of triplets found, which is not considered in the space complexity analysis.

### Example Usage

```javascript
const nums = [-1, 0, 1, 2, -1, -4];
const result = threeSum(nums);
console.log(result); // Output: [[-1, -1, 2], [-1, 0, 1]]
```

### Additional Test Cases

```plaintext
Input: nums = [0,0,0,0]
Output: [[0,0,0]]
Explanation: Only one triplet sums to 0, and duplicates are avoided.

Input: nums = [-2,0,0,2,2]
Output: [[-2,0,2]]
Explanation: One valid triplet, and duplicates are skipped.
```

### Key Points

- The main idea is to **fix one number** and use the **two-pointer technique** to find the other two numbers that sum to zero.
- Sorting the array simplifies the problem by enabling the efficient skipping of duplicates and allowing the two-pointer approach to work.

## 10. Container With Most Water

**=>** Here’s the solution for the **Container With Most Water** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the \(i^{th}\) line are \((i, 0)\) and \((i, height[i])\).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

### Example

```plaintext
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: 
The vertical lines are drawn at indices 0, 1, 2, 3, 4, 5, 6, 7, and 8. 
The two lines that can contain the most water are at indices 1 (height 8) and 8 (height 7).
The container between these lines holds 49 units of water.
```

```plaintext
Input: height = [1,1]
Output: 1
```

```plaintext
Input: height = [4,3,2,1,4]
Output: 16
```

```plaintext
Input: height = [1,2,1]
Output: 2
```

### JavaScript Solution (Two Pointers)

```javascript
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // Calculate the area with the current two lines
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        const area = width * h;
        maxWater = Math.max(maxWater, area);

        // Move the pointer corresponding to the shorter line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}
```

### Explanation

1. **Two Pointers Approach**:

   - We use two pointers: `left` at the beginning of the array and `right` at the end of the array.
   - The width between the two lines is `right - left`, and the height of the container is determined by the shorter of the two lines, i.e., `Math.min(height[left], height[right])`.
2. **Calculate the Area**:

   - For each pair of lines, calculate the area as:
     \[
     \text{Area} = \text{width} \times \text{height}
     \]
     where `height` is the minimum height between `height[left]` and `height[right]`.
3. **Move the Shorter Line**:

   - After calculating the area, to potentially find a larger container, we move the pointer corresponding to the shorter line:
     - If `height[left] < height[right]`, we move `left++`.
     - Otherwise, we move `right--`.

   The idea behind this is that moving the shorter line gives us a chance to find a taller line which may form a larger container.
4. **Repeat Until Pointers Meet**:

   - We continue moving the pointers inward until `left` meets `right`, checking the area at each step and updating the maximum found area.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We only make one pass through the array, checking each pair of lines exactly once.
- **Space Complexity**: \( O(1) \)

  - The algorithm only uses a few variables (`left`, `right`, `maxWater`), so the space complexity is constant.

### Example Usage

```javascript
const height = [1,8,6,2,5,4,8,3,7];
const result = maxArea(height);
console.log(result); // Output: 49
```

### Additional Test Cases

```plaintext
Input: height = [1,1]
Output: 1
Explanation: Only one unit of water can be contained.

Input: height = [4,3,2,1,4]
Output: 16
Explanation: The container between lines at index 0 and index 4 holds 16 units of water.

Input: height = [1,2,1]
Output: 2
Explanation: The container between lines at index 0 and index 2 holds 2 units of water.
```

### Key Points

- **Two Pointer Strategy**: The key insight is that moving the pointer corresponding to the shorter line has the best chance of maximizing the area because the area is limited by the height of the shorter line.
- **Efficient Time Complexity**: Using the two-pointer approach reduces the time complexity to \( O(n) \), which is optimal for this problem.

# < Sliding Window >

## 11. Longest Substring Without Repeating Characters

**=>** Here’s the solution for the **Longest Substring Without Repeating Characters** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a string `s`, find the length of the longest substring without repeating characters.

### Example

```plaintext
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

```plaintext
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

```plaintext
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

### JavaScript Solution (Sliding Window with Hash Map)

```javascript
function lengthOfLongestSubstring(s) {
    let charIndexMap = new Map();
    let maxLength = 0;
    let start = 0; // Start of the current window

    for (let end = 0; end < s.length; end++) {
        const currentChar = s[end];

        // If we find a repeated character within the window, move the start pointer
        if (charIndexMap.has(currentChar)) {
            // Move the start pointer to the right of the previous index of the repeated character
            start = Math.max(start, charIndexMap.get(currentChar) + 1);
        }

        // Update the latest index of the current character
        charIndexMap.set(currentChar, end);

        // Calculate the length of the current window and update maxLength
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}
```

### Explanation

1. **Sliding Window Technique**:

   - We use two pointers, `start` and `end`, which form a sliding window over the string `s`.
   - `start` represents the beginning of the current substring without repeating characters, and `end` iterates through the string.
2. **Hash Map to Track Character Indexes**:

   - We maintain a hash map `charIndexMap` that stores the index of each character as we encounter them.
   - If we find a character that has already been seen, we update the `start` pointer to exclude the previous occurrence of that character.
3. **Update Window Size**:

   - For each character, we calculate the current window size (`end - start + 1`) and compare it to `maxLength` to keep track of the longest substring.
4. **Handling Repeated Characters**:

   - If we encounter a character that’s already in the window, we update the `start` pointer to the index **after** the previous occurrence of the character. This ensures that we exclude the previous occurrence from the current window.
5. **Edge Cases**:

   - If the string is empty, the result is `0`.
   - If there are no repeating characters in the string, the result is the length of the string itself.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We traverse the string with the `end` pointer, and for each character, we perform operations in constant time (insertion and lookup in the hash map). Hence, the time complexity is linear with respect to the length of the string.
- **Space Complexity**: \( O(min(n, m)) \)

  - `n` is the length of the input string, and `m` is the size of the character set (which is constant for ASCII). In the worst case, the hash map contains all distinct characters from the input string, but space complexity is bounded by the size of the character set.

### Example Usage

```javascript
const s = "abcabcbb";
const result = lengthOfLongestSubstring(s);
console.log(result); // Output: 3
```

### Additional Test Cases

```plaintext
Input: s = ""
Output: 0
Explanation: An empty string has no substrings.

Input: s = "bbbbb"
Output: 1
Explanation: The longest substring without repeating characters is "b", which has length 1.

Input: s = "pwwkew"
Output: 3
Explanation: The longest substring without repeating characters is "wke", with the length of 3.
```

### Key Points

- **Sliding Window Technique**: The sliding window approach efficiently finds the longest substring without repeating characters by dynamically adjusting the window size.
- **Hash Map for Fast Lookups**: The hash map helps track the last occurrence of characters, enabling us to skip over repeated characters and adjust the window quickly.
- **Edge Cases**: Be sure to handle strings with all identical characters, empty strings, and strings with no repeated characters.

## 12. Minimum Window Substring

**=>** Here’s the solution for the **Minimum Window Substring** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

### Example

```plaintext
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
```

```plaintext
Input: s = "a", t = "a"
Output: "a"
```

```plaintext
Input: s = "a", t = "aa"
Output: ""
```

### JavaScript Solution (Sliding Window with Hash Map)

We can solve this problem using a sliding window approach with two pointers and a hash map to track character counts.

```javascript
function minWindow(s, t) {
    if (s.length < t.length) return "";

    const charCountT = new Map();
    for (const char of t) {
        charCountT.set(char, (charCountT.get(char) || 0) + 1);
    }

    let required = charCountT.size;
    let left = 0, right = 0;
    let formed = 0;
    const windowCounts = new Map();
    let minLength = Infinity;
    let minWindow = "";

    while (right < s.length) {
        const currentChar = s[right];
        windowCounts.set(currentChar, (windowCounts.get(currentChar) || 0) + 1);

        // Check if the current character satisfies the count needed
        if (charCountT.has(currentChar) && windowCounts.get(currentChar) === charCountT.get(currentChar)) {
            formed++;
        }

        // Try to contract the window until it's no longer valid
        while (left <= right && formed === required) {
            const charInWindow = s[left];

            // Save the smallest window and its length
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minWindow = s.substring(left, right + 1);
            }

            // Remove the leftmost character from the window
            windowCounts.set(charInWindow, windowCounts.get(charInWindow) - 1);
            if (charCountT.has(charInWindow) && windowCounts.get(charInWindow) < charCountT.get(charInWindow)) {
                formed--;
            }
            left++;
        }

        right++;
    }

    return minWindow;
}
```

### Explanation

1. **Character Count Map**:

   - We create a map `charCountT` to count the frequency of each character in `t`. This helps us know how many of each character we need to include in our window.
2. **Sliding Window**:

   - We maintain two pointers (`left` and `right`) to represent the current window in the string `s`.
   - We also maintain a count of how many unique characters from `t` are currently in the window with the variable `formed`.
3. **Expand the Right Pointer**:

   - As we move the `right` pointer, we include the character at `s[right]` into our window.
   - We then check if this character helps us satisfy the requirements (i.e., it matches the required count in `t`).
4. **Contract the Left Pointer**:

   - Once we have a valid window (i.e., `formed` equals the number of unique characters in `t`), we try to minimize the window size by moving the `left` pointer to the right.
   - During this process, if we find a smaller valid window, we update our `minWindow` and `minLength`.
5. **End Condition**:

   - We continue this process until the `right` pointer reaches the end of the string `s`.
6. **Return Result**:

   - If we found a valid window, we return the substring; otherwise, we return an empty string.

### Time and Space Complexity

- **Time Complexity**: \( O(n + m) \)

  - Here, \( n \) is the length of string `s` and \( m \) is the length of string `t`. We make a linear pass over both strings to build the character counts and to find the minimum window.
- **Space Complexity**: \( O(m) \)

  - We store the character counts for the string `t` in a map, which in the worst case could store all unique characters in `t`.

### Example Usage

```javascript
const s = "ADOBECODEBANC";
const t = "ABC";
const result = minWindow(s, t);
console.log(result); // Output: "BANC"
```

### Additional Test Cases

```plaintext
Input: s = "a", t = "a"
Output: "a"
Explanation: The whole string is the minimum window.

Input: s = "a", t = "aa"
Output: ""
Explanation: The target contains more characters than available in the source.

Input: s = "a", t = "abc"
Output: ""
Explanation: The target cannot be formed from the source string.

Input: s = "ADOBECODEBANC", t = "ABBBCC"
Output: ""
Explanation: There is no window that can satisfy the target string.
```

### Key Points

- **Sliding Window Technique**: The use of a sliding window efficiently expands and contracts to find the minimum substring containing the required characters.
- **Hash Map for Counting**: The hash map is crucial for keeping track of character frequencies and efficiently checking whether the current window meets the requirements.
- **Edge Cases**: Consider cases with single-character strings, targets longer than the source string, and strings with no valid windows.

## 13. Permutation in String

**=>** Here’s the solution for the **Permutation in String** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given two strings `s1` and `s2`, write a function to return true if `s2` contains a permutation of `s1`. In other words, one of the first string's permutations is the substring of the second string.

### Example

```plaintext
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
```

```plaintext
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

### JavaScript Solution (Sliding Window with Hash Map)

To solve this problem, we can use a sliding window approach combined with a character count using a hash map.

```javascript
function checkInclusion(s1, s2) {
    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);
  
    // Fill the character count for s1
    for (const char of s1) {
        s1Count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    const s1Length = s1.length;
    const s2Length = s2.length;

    // Sliding window over s2
    for (let i = 0; i < s2Length; i++) {
        // Add the current character to the s2Count
        s2Count[s2[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;

        // Remove the leftmost character from the window if the size exceeds s1Length
        if (i >= s1Length) {
            s2Count[s2[i - s1Length].charCodeAt(0) - 'a'.charCodeAt(0)]--;
        }

        // Compare the counts of the current window with s1Count
        if (s1Count.join('') === s2Count.join('')) {
            return true;
        }
    }

    return false;
}
```

### Explanation

1. **Character Count Arrays**:

   - We use two arrays `s1Count` and `s2Count` of size 26 (for each letter in the alphabet) to keep track of the frequency of characters in `s1` and the current window of `s2`.
2. **Filling `s1Count`**:

   - We iterate over `s1` and populate `s1Count` with the frequency of each character.
3. **Sliding Window**:

   - We iterate over `s2` using a sliding window of size equal to `s1`.
   - For each character in `s2`, we update the `s2Count` by adding the character at the current index.
   - If the current index exceeds the length of `s1`, we also decrement the count of the character that is sliding out of the window.
4. **Comparison**:

   - After updating `s2Count`, we compare it with `s1Count`. If they match, it means a permutation of `s1` exists in the current window of `s2`.
5. **Return Result**:

   - If no permutation is found after checking all possible windows, we return `false`.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We perform a single pass through `s2`, and for each character, we do a constant amount of work to update counts and compare arrays.
- **Space Complexity**: \( O(1) \)

  - The character count arrays are of fixed size (26), so the space complexity is constant.

### Example Usage

```javascript
const s1 = "ab";
const s2 = "eidbaooo";
const result = checkInclusion(s1, s2);
console.log(result); // Output: true
```

### Additional Test Cases

```plaintext
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
Explanation: There is no permutation of s1 in s2.

Input: s1 = "hello", s2 = "ooollehullo"
Output: true
Explanation: The string "hello" is a permutation in "ooollehullo".

Input: s1 = "abc", s2 = "ccccbbbbaaaa"
Output: false
Explanation: No permutation of "abc" is in the given string.

Input: s1 = "abcd", s2 = "abcde"
Output: true
Explanation: The string "abcd" is a permutation in "abcde".
```

### Key Points

- **Sliding Window Technique**: This allows us to efficiently check all possible substrings of `s2` with a fixed size.
- **Character Count Comparison**: Using arrays for counting characters gives a fast way to compare the current window with the target string.
- **Edge Cases**: Consider cases where one of the strings is empty or when the strings have no matching characters.

## 14. Longest Repeating Character Replacement

**=>** Here’s the solution for the **Longest Repeating Character Replacement** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a string `s` and an integer `k`, you can replace any character in the string up to `k` times. Your goal is to find the length of the longest substring that contains the same letter after performing at most `k` replacements.

### Example

```plaintext
Input: s = "ABAB", k = 2
Output: 4
```

```plaintext
Input: s = "AABABBA", k = 1
Output: 4
```

### JavaScript Solution (Sliding Window)

We can use a sliding window approach to keep track of the maximum length of a substring that can be formed by replacing characters.

```javascript
function characterReplacement(s, k) {
    const count = new Array(26).fill(0); // Frequency of characters
    let left = 0;
    let maxCount = 0; // Max frequency of a single character in the current window
    let maxLength = 0; // Maximum length of the substring found

    for (let right = 0; right < s.length; right++) {
        const index = s[right].charCodeAt(0) - 'A'.charCodeAt(0);
        count[index]++;
        maxCount = Math.max(maxCount, count[index]);

        // Check if we need to shrink the window
        if (right - left + 1 - maxCount > k) {
            count[s[left].charCodeAt(0) - 'A'.charCodeAt(0)]--;
            left++;
        }

        // Calculate the maximum length of the substring
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

### Explanation

1. **Character Count Array**:

   - We use a count array of size 26 (for each letter in the English alphabet) to keep track of the frequency of characters in the current window.
2. **Sliding Window**:

   - We maintain two pointers, `left` and `right`, to represent the current window in the string.
   - We expand the `right` pointer to include more characters into the window.
3. **Update Frequency**:

   - For each character added to the window (`s[right]`), we update its count in the `count` array.
   - We also update `maxCount` to reflect the maximum frequency of any character in the current window.
4. **Check Validity of Window**:

   - If the length of the current window minus `maxCount` exceeds `k`, it means we cannot make the current window valid with at most `k` replacements. Therefore, we shrink the window from the left by incrementing the `left` pointer.
5. **Calculate Maximum Length**:

   - After each iteration, we calculate the maximum length of the substring found so far.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - We make a single pass through the string `s`, and for each character, we do a constant amount of work.
- **Space Complexity**: \( O(1) \)

  - The space used by the `count` array is constant (size 26), so the space complexity is \( O(1) \).

### Example Usage

```javascript
const s = "AABABBA";
const k = 1;
const result = characterReplacement(s, k);
console.log(result); // Output: 4
```

### Additional Test Cases

```plaintext
Input: s = "ABAB", k = 2
Output: 4
Explanation: The entire string can be made the same letter with 2 replacements.

Input: s = "AABABBA", k = 1
Output: 4
Explanation: We can replace one 'B' to make "AABBBBA".

Input: s = "AAAB", k = 0
Output: 3
Explanation: No replacements, so the longest substring is "AAA".

Input: s = "AABBCC", k = 2
Output: 4
Explanation: We can replace two 'B's or two 'C's to make "AAA" or "DDD".
```

### Key Points

- **Sliding Window Technique**: This approach effectively allows us to find the maximum substring by expanding and contracting the window based on conditions.
- **Frequency Counting**: Keeping track of character frequencies enables us to determine how many replacements are needed to maintain a valid substring.
- **Edge Cases**: Handle cases with no replacements allowed or when all characters are the same.

# < Binary Search >

## 15. Binary Search

**=>** Here’s the solution for the **Binary Search** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a sorted array of integers `nums` and an integer `target`, write a function to search for `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.

### Example

```plaintext
Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4
```

```plaintext
Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1
```

### JavaScript Solution (Iterative Approach)

Binary search works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half. Repeatedly check until the value is found or the interval is empty.

```javascript
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid; // Target found
        } else if (nums[mid] < target) {
            left = mid + 1; // Move to the right half
        } else {
            right = mid - 1; // Move to the left half
        }
    }

    return -1; // Target not found
}
```

### Explanation

1. **Initialization**:

   - Start with two pointers, `left` initialized to 0 and `right` initialized to the last index of the array.
2. **Iterative Loop**:

   - While `left` is less than or equal to `right`, calculate the `mid` index.
   - Compare the middle element `nums[mid]` with the `target`:
     - If `nums[mid]` is equal to `target`, return `mid`.
     - If `nums[mid]` is less than `target`, adjust `left` to `mid + 1`, narrowing the search to the right half.
     - If `nums[mid]` is greater than `target`, adjust `right` to `mid - 1`, narrowing the search to the left half.
3. **Termination**:

   - If the loop exits without finding the target, return -1.

### Time and Space Complexity

- **Time Complexity**: \( O(\log n) \)

  - Each step halves the search space, leading to logarithmic time complexity.
- **Space Complexity**: \( O(1) \)

  - The space used is constant since we are only using a few variables for indices.

### Example Usage

```javascript
const nums = [-1, 0, 3, 5, 9, 12];
const target = 9;
const result = binarySearch(nums, target);
console.log(result); // Output: 4
```

### Additional Test Cases

```plaintext
Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1
Explanation: The target 2 is not in the array.

Input: nums = [1, 2, 3, 4, 5], target = 1
Output: 0
Explanation: The target 1 is at index 0.

Input: nums = [1, 2, 3, 4, 5], target = 5
Output: 4
Explanation: The target 5 is at index 4.

Input: nums = [], target = 3
Output: -1
Explanation: The array is empty, so the target cannot be found.
```

### Key Points

- **Sorted Array Requirement**: Binary search only works on sorted arrays.
- **Efficiency**: It provides a highly efficient way to search compared to linear search, especially for large datasets.
- **Edge Cases**: Consider cases with empty arrays or arrays with only one element.

## 16. Find First and Last Position of Element in Sorted Array

**=>** Here’s the solution for the **Find First and Last Position of Element in Sorted Array** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value. If `target` is not found in the array, return `[-1, -1]`. You must write an algorithm with O(log n) runtime complexity.

### Example

```plaintext
Input: nums = [5, 7, 7, 8, 8, 10], target = 8
Output: [3, 4]
```

```plaintext
Input: nums = [5, 7, 7, 8, 8, 10], target = 6
Output: [-1, -1]
```

### JavaScript Solution (Binary Search)

To solve this problem efficiently, we can use binary search twice: once to find the first position and once to find the last position of the target.

```javascript
function searchRange(nums, target) {
    const findLeftIndex = (nums, target) => {
        let left = 0;
        let right = nums.length - 1;
        let leftIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                leftIndex = mid; // Update leftIndex when target is found
                right = mid - 1; // Move to the left to find the first occurrence
            } else if (nums[mid] < target) {
                left = mid + 1; // Move to the right half
            } else {
                right = mid - 1; // Move to the left half
            }
        }

        return leftIndex; // Return the first occurrence index
    };

    const findRightIndex = (nums, target) => {
        let left = 0;
        let right = nums.length - 1;
        let rightIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                rightIndex = mid; // Update rightIndex when target is found
                left = mid + 1; // Move to the right to find the last occurrence
            } else if (nums[mid] < target) {
                left = mid + 1; // Move to the right half
            } else {
                right = mid - 1; // Move to the left half
            }
        }

        return rightIndex; // Return the last occurrence index
    };

    const leftIndex = findLeftIndex(nums, target);
    const rightIndex = findRightIndex(nums, target);

    return [leftIndex, rightIndex];
}
```

### Explanation

1. **Finding the Left Index**:

   - Use a binary search to find the first occurrence of `target`.
   - If the middle element matches the `target`, store `mid` in `leftIndex` and continue searching in the left half to find earlier occurrences.
2. **Finding the Right Index**:

   - Use a binary search to find the last occurrence of `target`.
   - If the middle element matches the `target`, store `mid` in `rightIndex` and continue searching in the right half to find later occurrences.
3. **Return Result**:

   - After finding both indices, return them in an array. If the target is not found, both indices will be -1.

### Time and Space Complexity

- **Time Complexity**: \( O(\log n) \)

  - Each binary search takes logarithmic time, and since we perform two searches, the overall complexity remains \( O(\log n) \).
- **Space Complexity**: \( O(1) \)

  - We are using a constant amount of space for variables.

### Example Usage

```javascript
const nums = [5, 7, 7, 8, 8, 10];
const target = 8;
const result = searchRange(nums, target);
console.log(result); // Output: [3, 4]
```

### Additional Test Cases

```plaintext
Input: nums = [5, 7, 7, 8, 8, 10], target = 6
Output: [-1, -1]
Explanation: The target 6 is not in the array.

Input: nums = [1, 2, 3, 4, 5, 6], target = 4
Output: [3, 3]
Explanation: The target 4 is at index 3.

Input: nums = [1, 1, 1, 1, 1], target = 1
Output: [0, 4]
Explanation: The target 1 is present from index 0 to 4.

Input: nums = [], target = 0
Output: [-1, -1]
Explanation: The array is empty, so the target cannot be found.
```

### Key Points

- **Two Binary Searches**: This approach efficiently finds the first and last positions of the target by performing two binary searches.
- **Sorted Array Requirement**: The algorithm assumes that the input array is sorted.
- **Edge Cases**: Consider cases with empty arrays or cases where the target is not present.

## 17. Search a 2D Matrix

**=>** Here’s the solution for the **Search a 2D Matrix** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- Integers in each column are sorted from top to bottom.

### Example

```plaintext
Input: matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
], target = 3
Output: true
```

```plaintext
Input: matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
], target = 13
Output: false
```

### JavaScript Solution

The approach leverages the properties of the matrix, allowing us to start from the top-right corner and eliminate rows or columns based on the comparison with the target.

```javascript
function searchMatrix(matrix, target) {
    if (!matrix.length || !matrix[0].length) {
        return false; // If the matrix is empty
    }

    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        const current = matrix[row][col];

        if (current === target) {
            return true; // Target found
        } else if (current > target) {
            col--; // Move left if the current number is greater than target
        } else {
            row++; // Move down if the current number is less than target
        }
    }

    return false; // Target not found
}
```

### Explanation

1. **Initialization**:

   - Start from the top-right corner of the matrix (`row = 0` and `col = matrix[0].length - 1`).
2. **While Loop**:

   - Continue searching while `row` is within bounds of the number of rows and `col` is within bounds of the number of columns.
   - Compare the current element `matrix[row][col]` with the `target`:
     - If it equals the target, return `true`.
     - If it’s greater than the target, move left (`col--`), since all elements to the right will also be greater.
     - If it’s less than the target, move down (`row++`), since all elements below will be greater.
3. **Termination**:

   - If the loop exits without finding the target, return `false`.

### Time and Space Complexity

- **Time Complexity**: \( O(m + n) \)

  - In the worst case, you may traverse a maximum of \( m + n \) elements (moving through rows and columns).
- **Space Complexity**: \( O(1) \)

  - The space used is constant since we are only using a few variables.

### Example Usage

```javascript
const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60]
];
const target = 3;
const result = searchMatrix(matrix, target);
console.log(result); // Output: true
```

### Additional Test Cases

```plaintext
Input: matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
], target = 13
Output: false
Explanation: The target 13 is not in the matrix.

Input: matrix = [[-5]], target = -5
Output: true
Explanation: The matrix contains the target -5.

Input: matrix = [[-1, 3]], target = 3
Output: true
Explanation: The target 3 is found at index [0][1].
```

### Key Points

- **Efficiency**: This method is efficient due to the sorted properties of the matrix.
- **Edge Cases**: The function handles cases where the matrix is empty or has only one element.
- **Directional Movement**: The choice of starting from the top-right corner is crucial for minimizing unnecessary comparisons.

## 18. Kth Largest Element in an Array

**=>** Here’s the solution for the **Kth Largest Element in an Array** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.

### Example

```plaintext
Input: nums = [3, 2, 1, 5, 6, 4], k = 2
Output: 5
```

```plaintext
Input: nums = [3, 2, 3], k = 1
Output: 3
```

### JavaScript Solution

There are various approaches to solving this problem, but one of the most efficient ways is to use a **Quickselect** algorithm, which is an efficient selection algorithm to find the k-th largest element in an unordered list. This algorithm is related to the QuickSort sorting algorithm.

Here's how you can implement it:

```javascript
function findKthLargest(nums, k) {
    const quickSelect = (left, right, k) => {
        const pivot = nums[right];
        let partitionIndex = left;

        for (let i = left; i < right; i++) {
            if (nums[i] > pivot) { // We want k-th largest, hence > pivot
                [nums[i], nums[partitionIndex]] = [nums[partitionIndex], nums[i]]; // Swap
                partitionIndex++;
            }
        }

        [nums[partitionIndex], nums[right]] = [nums[right], nums[partitionIndex]]; // Swap pivot to correct position

        if (partitionIndex === k) {
            return nums[partitionIndex];
        } else if (partitionIndex < k) {
            return quickSelect(partitionIndex + 1, right, k); // Search right side
        } else {
            return quickSelect(left, partitionIndex - 1, k); // Search left side
        }
    };

    return quickSelect(0, nums.length - 1, k - 1); // k-1 for zero-based index
}
```

### Explanation

1. **Quickselect Function**:

   - This function partitions the array around a pivot.
   - Elements greater than the pivot are moved to the left, and elements less than the pivot are moved to the right.
   - After partitioning, if the pivot's index matches `k`, the pivot is the k-th largest element.
   - If the pivot's index is less than `k`, search the right subarray; otherwise, search the left subarray.
2. **Main Function**:

   - Call `quickSelect` with the initial indices (0 to the last index) and adjust `k` for zero-based indexing by subtracting 1.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \) on average.

  - The average case for Quickselect is linear time, although the worst case is quadratic time \( O(n^2) \) if the pivot chosen is always the smallest or largest element.
- **Space Complexity**: \( O(1) \)

  - The space used is constant as we are modifying the array in place and using a few variables.

### Example Usage

```javascript
const nums = [3, 2, 1, 5, 6, 4];
const k = 2;
const result = findKthLargest(nums, k);
console.log(result); // Output: 5
```

### Additional Test Cases

```plaintext
Input: nums = [3, 2, 3], k = 1
Output: 3
Explanation: The largest element is 3.

Input: nums = [1], k = 1
Output: 1
Explanation: The only element in the array is 1.

Input: nums = [1, 2, 3, 4, 5, 6], k = 3
Output: 4
Explanation: The third largest element is 4.
```

### Key Points

- **In-Place Selection**: The algorithm modifies the input array, allowing it to find the k-th largest element without sorting the entire array.
- **Average Case Efficiency**: The Quickselect algorithm is efficient and typically runs in linear time for large arrays.
- **Partitioning Logic**: The pivot selection is key to achieving better average performance.

# < Linked Lists > 

## 19. Reverse a Linked List

**=>** Here’s the solution for the **Reverse a Linked List** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given the head of a singly linked list, reverse the list, and return the reversed list.

### Example

```plaintext
Input: head = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
```

```plaintext
Input: head = [1, 2]
Output: [2, 1]
```

```plaintext
Input: head = []
Output: []
```

### JavaScript Solution

You can reverse a linked list using an iterative approach or a recursive approach. Here’s the iterative approach, which is often preferred for its simplicity and efficiency.

#### Iterative Approach

```javascript
function reverseList(head) {
    let prev = null;  // Previous node
    let current = head;  // Current node

    while (current) {
        let nextTemp = current.next;  // Store next node
        current.next = prev;           // Reverse the link
        prev = current;                // Move prev to current
        current = nextTemp;            // Move to the next node
    }

    return prev;  // New head of the reversed list
}
```

### Explanation

1. **Initialization**:

   - Use two pointers, `prev` (initialized to `null`) and `current` (initialized to the head of the list).
2. **While Loop**:

   - Iterate through the list until `current` is `null`.
   - Store the next node in `nextTemp` so you don't lose track of the rest of the list.
   - Reverse the `next` pointer of the current node to point to the previous node.
   - Move the `prev` pointer to the current node and the `current` pointer to the next node.
3. **Termination**:

   - Once the loop ends, `prev` will be pointing to the new head of the reversed list, which you return.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - You traverse the list once, where \( n \) is the number of nodes in the linked list.
- **Space Complexity**: \( O(1) \)

  - The reversal is done in place, so no additional space proportional to the input size is used.

### Example Usage

To define a linked list in JavaScript, you can create a simple `ListNode` class:

```javascript
class ListNode {
    constructor(value = 0, next = null) {
        this.value = value;
        this.next = next;
    }
}

// Example to create a linked list: 1 -> 2 -> 3 -> 4 -> 5
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

const reversedHead = reverseList(head);

// Function to print the linked list
function printList(node) {
    let current = node;
    let result = [];
    while (current) {
        result.push(current.value);
        current = current.next;
    }
    console.log(result.join(' -> '));
}

printList(reversedHead); // Output: 5 -> 4 -> 3 -> 2 -> 1
```

### Additional Test Cases

```plaintext
Input: head = [1]
Output: [1]
Explanation: A single node remains the same when reversed.

Input: head = [1, 2, 3]
Output: [3, 2, 1]
Explanation: The linked list is reversed to 3 -> 2 -> 1.
```

### Key Points

- **In-Place Reversal**: The iterative method does not use extra space and reverses the linked list in place.
- **Simplicity**: This approach is straightforward and easy to understand.
- **Single Pass**: Only a single traversal of the linked list is needed, making it efficient.

## 20. Detect a Cycle in Linked List

**=>** Here’s the solution for the **Detect a Cycle in Linked List** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given the head of a linked list, determine if the linked list has a cycle in it.

### Example

```plaintext
Input: head = [3, 2, 0, -4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the second node.

Input: head = [1, 2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the first node.

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

### JavaScript Solution

The most efficient way to detect a cycle in a linked list is to use **Floyd’s Tortoise and Hare** algorithm. This algorithm uses two pointers that move at different speeds.

#### Solution using Floyd’s Cycle Detection Algorithm

```javascript
function hasCycle(head) {
    if (!head) return false; // If the list is empty, no cycle exists.

    let slow = head;          // Initialize slow pointer
    let fast = head;          // Initialize fast pointer

    while (fast && fast.next) {
        slow = slow.next;     // Move slow pointer one step
        fast = fast.next.next; // Move fast pointer two steps

        if (slow === fast) {  // Cycle detected
            return true;
        }
    }

    return false; // No cycle detected
}
```

### Explanation

1. **Pointer Initialization**:

   - Two pointers, `slow` and `fast`, are initialized at the head of the list. The `slow` pointer moves one step at a time, while the `fast` pointer moves two steps at a time.
2. **Traversal**:

   - In a loop, move `slow` one step and `fast` two steps until either `fast` reaches the end of the list or the two pointers meet.
3. **Cycle Detection**:

   - If `slow` meets `fast`, a cycle exists, and the function returns `true`.
   - If `fast` reaches the end of the list (`null`), there is no cycle, and the function returns `false`.

### Time and Space Complexity

- **Time Complexity**: \( O(n) \)

  - In the worst case, both pointers traverse the entire list once.
- **Space Complexity**: \( O(1) \)

  - Only two pointers are used, regardless of the input size.

### Example Usage

To define a linked list in JavaScript, you can create a simple `ListNode` class and simulate a cycle:

```javascript
class ListNode {
    constructor(value = 0, next = null) {
        this.value = value;
        this.next = next;
    }
}

// Example to create a linked list: 3 -> 2 -> 0 -> -4 -> (back to 2)
const head = new ListNode(3);
const second = new ListNode(2);
const third = new ListNode(0);
const fourth = new ListNode(-4);

head.next = second;
second.next = third;
third.next = fourth;
fourth.next = second; // Creates a cycle

const result = hasCycle(head);
console.log(result); // Output: true
```

### Additional Test Cases

```plaintext
Input: head = [1, 2, 3]
Output: false
Explanation: There is no cycle in the linked list.

Input: head = [1]
Output: false
Explanation: A single node without a cycle remains the same when reversed.
```

### Key Points

- **Floyd’s Cycle Detection**: This algorithm efficiently detects cycles using two pointers with different speeds, which can meet if a cycle exists.
- **Space Efficiency**: The approach is optimal since it uses constant space, making it suitable for large linked lists.
- **Real-World Applications**: Cycle detection is useful in many applications, such as detecting loops in network protocols or programming environments.

## 21. Merge Two Sorted Lists

**=>** Here’s the solution for the **Merge Two Sorted Lists** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given the heads of two sorted linked lists, `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

### Example

```plaintext
Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
Output: [1, 1, 2, 3, 4, 4]

Input: list1 = [], list2 = [0]
Output: [0]

Input: list1 = [], list2 = []
Output: []
```

### JavaScript Solution

The solution can be implemented iteratively or recursively. Below is the iterative approach, which is often easier to understand.

#### Iterative Approach

```javascript
function mergeTwoLists(list1, list2) {
    let dummy = new ListNode(0); // Create a dummy node to simplify the merge process
    let current = dummy;          // Pointer to construct the new list

    while (list1 && list2) {
        if (list1.val < list2.val) {
            current.next = list1; // Attach list1 node
            list1 = list1.next;    // Move to the next node in list1
        } else {
            current.next = list2; // Attach list2 node
            list2 = list2.next;    // Move to the next node in list2
        }
        current = current.next;    // Move to the next position in the merged list
    }

    // If there are remaining nodes in either list, attach them
    current.next = list1 || list2;

    return dummy.next; // Return the merged list starting from the next node of dummy
}
```

### Explanation

1. **Initialization**:

   - A dummy node is created to act as the starting point for the new merged list. The `current` pointer is used to build the merged list.
2. **While Loop**:

   - Traverse both lists until one of them is exhausted.
   - Compare the current values of `list1` and `list2` and attach the smaller node to the merged list.
   - Move the pointer of the list from which the node was taken to the next node.
3. **Remaining Nodes**:

   - Once one of the lists is exhausted, attach the remaining nodes of the other list to the merged list. Since both lists are sorted, the remaining nodes will also be sorted.
4. **Return**:

   - The merged list is returned starting from the next node of the dummy node.

### Time and Space Complexity

- **Time Complexity**: \( O(m + n) \)

  - Where \( m \) and \( n \) are the lengths of `list1` and `list2`, respectively. You traverse both lists once.
- **Space Complexity**: \( O(1) \)

  - The merging is done in place, and only a constant amount of extra space is used for pointers.

### Example Usage

To define a linked list in JavaScript, you can create a simple `ListNode` class:

```javascript
class ListNode {
    constructor(value = 0, next = null) {
        this.value = value;
        this.next = next;
    }
}

// Example to create two linked lists: 
// list1: 1 -> 2 -> 4
const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(4);

// list2: 1 -> 3 -> 4
const list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);

// Merging the two lists
const mergedHead = mergeTwoLists(list1, list2);

// Function to print the linked list
function printList(node) {
    let current = node;
    let result = [];
    while (current) {
        result.push(current.value);
        current = current.next;
    }
    console.log(result.join(' -> '));
}

printList(mergedHead); // Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### Additional Test Cases

```plaintext
Input: list1 = [], list2 = [0]
Output: [0]
Explanation: Merging an empty list with a non-empty list returns the non-empty list.

Input: list1 = [1, 3], list2 = [2]
Output: [1, 2, 3]
Explanation: The merged list is sorted by merging elements from both lists.
```

### Key Points

- **Dummy Node**: Using a dummy node simplifies the merging logic and allows easy return of the merged list.
- **In-Place Merging**: The approach efficiently merges the lists without using additional space for new nodes.
- **Sorted Order**: The properties of the input lists being sorted are leveraged to maintain the sorted order in the merged list.

## 22. Merge k Sorted Lists

**=>** Here’s the solution for the **Merge k Sorted Lists** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an array of `k` linked lists, each of which is sorted in ascending order. Merge all the linked lists into one sorted linked list and return it.

### Example

```plaintext
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]

Input: lists = []
Output: []

Input: lists = [[]]
Output: []
```

### JavaScript Solution

The most efficient way to merge multiple sorted linked lists is to use a **min-heap** (priority queue). The heap allows us to efficiently retrieve the smallest element among the heads of the lists.

#### Solution using Min-Heap

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].val >= this.heap[parentIndex].val) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const minNode = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return minNode;
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.heap[leftChildIndex].val < this.heap[smallestIndex].val) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex].val < this.heap[smallestIndex].val) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            index = smallestIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function mergeKLists(lists) {
    const minHeap = new MinHeap();
    const dummy = new ListNode(0); // Create a dummy node
    let current = dummy;

    // Insert the head of each list into the min-heap
    for (const list of lists) {
        if (list) {
            minHeap.insert(list);
        }
    }

    // While the heap is not empty
    while (!minHeap.isEmpty()) {
        const minNode = minHeap.extractMin(); // Get the smallest node
        current.next = minNode;                // Attach it to the merged list
        current = current.next;                // Move current pointer

        if (minNode.next) {                    // If the extracted node has a next node, add it to the heap
            minHeap.insert(minNode.next);
        }
    }

    return dummy.next; // Return the merged list starting from the next node of dummy
}
```

### Explanation

1. **Min-Heap Class**:

   - A custom Min-Heap class is created to handle node insertion, extraction, and maintaining the heap property.
2. **Initialization**:

   - A dummy node is created to simplify the merging process. The `current` pointer is used to build the merged list.
3. **Insert Initial Nodes**:

   - The heads of each linked list are inserted into the min-heap.
4. **Merging Process**:

   - While the min-heap is not empty, the smallest node is extracted and attached to the merged list.
   - If the extracted node has a next node, it is inserted into the min-heap.
5. **Return**:

   - The merged linked list is returned starting from the next node of the dummy node.

### Time and Space Complexity

- **Time Complexity**: \( O(N \log k) \)

  - Where \( N \) is the total number of nodes across all lists, and \( k \) is the number of linked lists. Each insertion and extraction operation on the heap takes \( O(\log k) \) time.
- **Space Complexity**: \( O(k) \)

  - The heap contains at most \( k \) nodes at any time (the heads of each list).

### Example Usage

To define a linked list in JavaScript, you can create instances of the `ListNode` class:

```javascript
// Create linked lists: 
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));

// Merge k lists
const mergedHead = mergeKLists([list1, list2, list3]);

// Function to print the linked list
function printList(node) {
    let current = node;
    let result = [];
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    console.log(result.join(' -> '));
}

printList(mergedHead); // Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
```

### Additional Test Cases

```plaintext
Input: lists = []
Output: []
Explanation: Merging an empty list returns an empty list.

Input: lists = [[]]
Output: []
Explanation: A list containing an empty list returns an empty list.

Input: lists = [[1, 4], [2, 5], [3]]
Output: [1, 2, 3, 4, 5]
```

### Key Points

- **Heap Efficiency**: Using a min-heap allows efficient merging of multiple sorted lists.
- **Dummy Node**: The dummy node simplifies list manipulation and provides a clear return point for the merged list.
- **Generalization**: The solution can handle any number of input lists, making it flexible for various scenarios.

## 23. Remove Nth Node From End of List

**=>** Here’s the solution for the **Remove Nth Node From End of List** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given the head of a linked list, remove the nth node from the end of the list and return its head.

### Example

```plaintext
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Input: head = [1], n = 1
Output: []

Input: head = [1,2], n = 1
Output: [1]
```

### JavaScript Solution

The most efficient way to solve this problem is to use the **two-pointer technique**. By using two pointers, we can traverse the list in a single pass.

#### Solution using Two Pointers

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head); // Create a dummy node to handle edge cases
    let first = dummy;  // First pointer will be moved n+1 steps ahead
    let second = dummy; // Second pointer will point to the previous node of the node to be removed

    // Move first pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }

    // Move both pointers until first reaches the end
    while (first !== null) {
        first = first.next;
        second = second.next;
    }

    // Remove the nth node from the end
    second.next = second.next.next;

    return dummy.next; // Return the new head
}
```

### Explanation

1. **Dummy Node**:

   - A dummy node is created to simplify edge case handling, such as removing the head of the list.
2. **Two Pointers**:

   - The `first` pointer is moved `n + 1` steps ahead to create a gap of `n` between the `first` and `second` pointers.
   - Both pointers are then moved forward in tandem until the `first` pointer reaches the end of the list.
3. **Remove Node**:

   - The `second` pointer will point to the node just before the one we want to remove. We adjust the `next` pointer of `second` to skip the nth node from the end.
4. **Return the New Head**:

   - The new head of the list is returned by returning `dummy.next`.

### Time and Space Complexity

- **Time Complexity**: \( O(L) \)

  - Where \( L \) is the length of the linked list. The algorithm makes a single pass through the list.
- **Space Complexity**: \( O(1) \)

  - Only a constant amount of space is used for the pointers, regardless of the size of the input list.

### Example Usage

To define a linked list in JavaScript, you can create instances of the `ListNode` class:

```javascript
// Create a linked list: 1 -> 2 -> 3 -> 4 -> 5
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));

// Remove the 2nd node from the end
const newHead = removeNthFromEnd(head, 2);

// Function to print the linked list
function printList(node) {
    let current = node;
    let result = [];
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    console.log(result.join(' -> '));
}

printList(newHead); // Output: 1 -> 2 -> 3 -> 5
```

### Additional Test Cases

```plaintext
Input: head = [1], n = 1
Output: []
Explanation: The list becomes empty after removing the only node.

Input: head = [1, 2], n = 1
Output: [1]
Explanation: The last node is removed.

Input: head = [1, 2, 3, 4, 5], n = 5
Output: [2, 3, 4, 5]
Explanation: The first node is removed.
```

### Key Points

- **Dummy Node**: Helps in simplifying the edge cases where the head of the list may need to be removed.
- **Two-Pointer Technique**: Efficiently finds the node to be removed in a single pass through the list.

## 24. Copy List with Random Pointer

**=>** Here's the solution for the **Copy List with Random Pointer** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a linked list where each node has an additional random pointer which could point to any node in the list or null, you need to create a deep copy of the list. The deep copy should consist of exactly the same nodes as the original list. Each new node should have its `val` set to the value of the original node, and its `next` and `random` pointers should point to the corresponding nodes in the copied list.

### Example

```plaintext
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
```

### JavaScript Solution

To copy the list, we can use a **hash map** to keep track of the mapping between the original nodes and their copies.

#### Solution Using Hash Map

```javascript
class Node {
    constructor(val, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    if (!head) return null;

    const map = new Map();
    let current = head;

    // First pass: Create all nodes and map original nodes to copied nodes
    while (current) {
        map.set(current, new Node(current.val));
        current = current.next;
    }

    current = head;

    // Second pass: Assign next and random pointers
    while (current) {
        const copiedNode = map.get(current);
        copiedNode.next = map.get(current.next) || null; // Assign next pointer
        copiedNode.random = map.get(current.random) || null; // Assign random pointer
        current = current.next;
    }

    return map.get(head); // Return the head of the copied list
}
```

### Explanation

1. **Node Class**:

   - A simple `Node` class is defined to represent each node in the linked list.
2. **First Pass (Creating Copies)**:

   - Traverse the original linked list and create a new node for each original node, storing the original node and the corresponding copied node in a hash map.
3. **Second Pass (Setting Pointers)**:

   - Traverse the original list again, using the hash map to set the `next` and `random` pointers for each copied node.
4. **Return the New Head**:

   - Finally, return the copied head node from the hash map.

### Time and Space Complexity

- **Time Complexity**: \( O(N) \)

  - Where \( N \) is the number of nodes in the linked list. The algorithm makes two passes through the list.
- **Space Complexity**: \( O(N) \)

  - The space used by the hash map to store the mapping of original nodes to copied nodes.

### Example Usage

To define a linked list with random pointers in JavaScript, you can create instances of the `Node` class:

```javascript
// Create a linked list: 1 -> 2 with random pointers
const node1 = new Node(1);
const node2 = new Node(2);
node1.next = node2;
node1.random = node2; // Node 1's random points to Node 2
node2.random = node1; // Node 2's random points to Node 1

// Copy the list
const copiedListHead = copyRandomList(node1);

// Function to print the copied list
function printList(node) {
    let current = node;
    let result = [];
    while (current) {
        result.push({
            val: current.val,
            random: current.random ? current.random.val : null
        });
        current = current.next;
    }
    console.log(result);
}

printList(copiedListHead); 
// Output: [ { val: 1, random: 2 }, { val: 2, random: 1 } ]
```

### Additional Test Cases

```plaintext
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
```

### Key Points

- **Hash Map**: The hash map is crucial for efficiently mapping original nodes to their copied counterparts and for handling random pointers.
- **Two-Pass Approach**: This solution uses two passes over the list, ensuring that both the `next` and `random` pointers are correctly set.

# < Trees and Graphs >

## 25. Binary Tree Inorder Traversal

**=>** Here's the solution for the **Binary Tree Inorder Traversal** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

Given the root of a binary tree, return the inorder traversal of its nodes' values.

### Example

```plaintext
Input: root = [1,null,2,3]
Output: [1,3,2]

Input: root = []
Output: []

Input: root = [1]
Output: [1]
```

### JavaScript Solution

We can solve this problem using both **recursive** and **iterative** approaches. Below are both methods.

#### Solution 1: Recursive Approach

```javascript
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function inorderTraversal(root) {
    const result = [];

    function traverse(node) {
        if (!node) return;
        traverse(node.left);      // Visit left subtree
        result.push(node.val);    // Visit node itself
        traverse(node.right);     // Visit right subtree
    }

    traverse(root);
    return result;
}
```

### Explanation (Recursive)

1. **TreeNode Class**:

   - A simple `TreeNode` class is defined to represent each node in the binary tree.
2. **Inorder Traversal Function**:

   - We define a helper function `traverse` that performs the inorder traversal recursively.
   - For each node, we first traverse the left subtree, then add the node's value to the result, and finally traverse the right subtree.
3. **Return Result**:

   - The result array is returned after the traversal is complete.

### Time and Space Complexity (Recursive)

- **Time Complexity**: \( O(N) \)

  - Where \( N \) is the number of nodes in the binary tree. Each node is visited once.
- **Space Complexity**: \( O(H) \)

  - Where \( H \) is the height of the tree. The maximum depth of the recursive call stack can go up to \( H \).

#### Solution 2: Iterative Approach

```javascript
function inorderTraversal(root) {
    const result = [];
    const stack = [];
    let current = root;

    while (current || stack.length) {
        // Reach the leftmost node of the current node
        while (current) {
            stack.push(current);
            current = current.left;
        }
        // Current must be null at this point
        current = stack.pop();
        result.push(current.val); // Add the node value to the result
        current = current.right;   // Move to the right subtree
    }

    return result;
}
```

### Explanation (Iterative)

1. **Stack Initialization**:

   - We use a stack to keep track of the nodes. We also have a `current` pointer that starts at the root.
2. **Traversal**:

   - While there are nodes to process (either `current` or stack is not empty), we do the following:
     - Traverse to the leftmost node, pushing all nodes onto the stack.
     - Once there are no left children, pop the top node from the stack, add its value to the result, and move to its right child.
3. **Return Result**:

   - Finally, we return the result array containing the inorder traversal.

### Time and Space Complexity (Iterative)

- **Time Complexity**: \( O(N) \)

  - Same as the recursive approach, each node is visited once.
- **Space Complexity**: \( O(H) \)

  - Where \( H \) is the height of the tree. The stack can hold at most \( H \) nodes.

### Example Usage

To define a binary tree in JavaScript, you can create instances of the `TreeNode` class:

```javascript
// Create a binary tree: 
//     1
//      \
//       2
//      /
//     3
const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);

// Perform inorder traversal
const result = inorderTraversal(root);
console.log(result); // Output: [1, 3, 2]
```

### Additional Test Cases

```plaintext
Input: root = [1,null,2,3]
Output: [1,3,2]

Input: root = []
Output: []

Input: root = [1]
Output: [1]
```

### Key Points

- **Inorder Traversal**: This traversal visits nodes in the order of left child, node itself, and right child.
- **Recursive vs Iterative**: Both methods are valid. The iterative approach is useful in avoiding recursion depth limits for very deep trees.

## 26. Validate Binary Search Tree

**=>** Here's the solution for the **Validate Binary Search Tree** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows:

1. The left subtree of a node contains only nodes with keys less than the node's key.
2. The right subtree of a node contains only nodes with keys greater than the node's key.
3. Both the left and right subtrees must also be binary search trees.

### Example

```plaintext
Input: root = [2,1,3]
Output: true

Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

### JavaScript Solution

We can solve this problem using **recursive** depth-first search (DFS) with an additional check to ensure that the values of the nodes fall within the allowed range.

#### Solution Using Recursion

```javascript
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isValidBST(root) {
    function validate(node, low, high) {
        if (!node) return true; // An empty node is a valid BST
      
        const val = node.val;
        if (val <= low || val >= high) return false; // Current node violates the BST property

        // Recursively validate left and right subtrees with updated bounds
        return validate(node.left, low, val) && validate(node.right, val, high);
    }

    return validate(root, -Infinity, Infinity); // Start with the whole range of values
}
```

### Explanation

1. **TreeNode Class**:

   - A simple `TreeNode` class is defined to represent each node in the binary tree.
2. **isValidBST Function**:

   - This function initiates the validation by calling the helper function `validate` with the initial bounds set to negative and positive infinity.
3. **Validate Function**:

   - If the current node is `null`, it returns `true` because an empty subtree is valid.
   - If the node's value is less than or equal to the lower bound or greater than or equal to the upper bound, it returns `false` because this violates the BST properties.
   - Recursively validate the left subtree (with updated upper bound) and the right subtree (with updated lower bound).

### Time and Space Complexity

- **Time Complexity**: \( O(N) \)

  - Where \( N \) is the number of nodes in the binary tree. Each node is visited once.
- **Space Complexity**: \( O(H) \)

  - Where \( H \) is the height of the tree. The space complexity is due to the recursive call stack.

### Example Usage

To define a binary tree in JavaScript, you can create instances of the `TreeNode` class:

```javascript
// Create a binary search tree: 
//     2
//    / \
//   1   3
const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);

// Validate the binary search tree
const result = isValidBST(root);
console.log(result); // Output: true
```

### Additional Test Cases

```plaintext
Input: root = [2,1,3]
Output: true

Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Input: root = [10,5,15,null,null,6,20]
Output: false
Explanation: The root node's value is 10 but its right child node's value 15 is greater than 10.
```

### Key Points

- **BST Properties**: The validation leverages the properties of a binary search tree by maintaining bounds for each node's value.
- **Recursive Approach**: The recursion ensures that we check every node's value against its bounds effectively.

## 27. Lowest Common Ancestor of a Binary Search Tree

**=>** Here’s the solution for the **Lowest Common Ancestor of a Binary Search Tree** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on a BST:

- The lowest common ancestor of nodes `p` and `q` is defined as the lowest node in the BST that has both `p` and `q` as descendants.

### Example

```plaintext
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of 2 and 8 is 6.

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of 2 and 4 is 2.
```

### JavaScript Solution

We can solve this problem efficiently using the properties of a binary search tree.

#### Solution

```javascript
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function lowestCommonAncestor(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left; // Both nodes are in the left subtree
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right; // Both nodes are in the right subtree
        } else {
            return root; // This is the LCA
        }
    }
    return null; // In case there's no LCA (this won't happen in a valid BST)
}
```

### Explanation

1. **TreeNode Class**:

   - A simple `TreeNode` class is defined to represent each node in the binary tree.
2. **Lowest Common Ancestor Function**:

   - The function `lowestCommonAncestor` takes the root of the BST and the two nodes `p` and `q` for which we want to find the LCA.
   - We use a loop to traverse the tree until we find the LCA:
     - If both `p` and `q` are smaller than `root.val`, then the LCA must be in the left subtree.
     - If both `p` and `q` are larger than `root.val`, then the LCA must be in the right subtree.
     - If one is on the left and the other is on the right (or one of them is the current node), then the current node is the LCA.

### Time and Space Complexity

- **Time Complexity**: \( O(H) \)

  - Where \( H \) is the height of the tree. In the worst case, we may traverse from the root to a leaf.
- **Space Complexity**: \( O(1) \)

  - Since we are using only a constant amount of space (no additional data structures).

### Example Usage

To define a binary search tree in JavaScript, you can create instances of the `TreeNode` class:

```javascript
// Create a binary search tree:
//        6
//      /   \
//     2     8
//    / \   / \
//   0   4 7   9
//      / \
//     3   5
const root = new TreeNode(6);
root.left = new TreeNode(2);
root.right = new TreeNode(8);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(4);
root.left.right.left = new TreeNode(3);
root.left.right.right = new TreeNode(5);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);

// Define the nodes p and q
const p = root.left; // Node with value 2
const q = root.right; // Node with value 8

// Find the lowest common ancestor
const result = lowestCommonAncestor(root, p, q);
console.log(result.val); // Output: 6
```

### Additional Test Cases

```plaintext
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2

Input: root = [2,1], p = 1, q = 2
Output: 2
```

### Key Points

- **BST Properties**: This solution leverages the unique properties of a binary search tree, allowing us to efficiently find the LCA without needing to explore all nodes.
- **Iterative Approach**: The iterative method is generally more space-efficient than a recursive one, especially for deep trees.

## 28. Implement Trie (Prefix Tree)

**=>** Here’s the solution for the **Implement Trie (Prefix Tree)** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Implement a trie (prefix tree) with the following operations:

1. `insert(word)`: Inserts a word into the trie.
2. `search(word)`: Returns true if the word is in the trie (exact match).
3. `startsWith(prefix)`: Returns true if there is a previously inserted word that starts with the given prefix.

### Example

```plaintext
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");
trie.search("app");     // returns true
```

### JavaScript Solution

We can implement the Trie using a nested object structure to represent nodes.

#### Trie Implementation

```javascript
class TrieNode {
    constructor() {
        this.children = {}; // Dictionary to store child nodes
        this.isEndOfWord = false; // Indicates if this node is the end of a word
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(); // Root node of the Trie
    }

    // Inserts a word into the trie
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode(); // Create a new node if the character doesn't exist
            }
            node = node.children[char]; // Move to the child node
        }
        node.isEndOfWord = true; // Mark the end of the word
    }

    // Returns true if the word is in the trie
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                return false; // Character not found, word doesn't exist
            }
            node = node.children[char]; // Move to the child node
        }
        return node.isEndOfWord; // Check if it is the end of a valid word
    }

    // Returns true if there is a word that starts with the given prefix
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return false; // Character not found, no word starts with this prefix
            }
            node = node.children[char]; // Move to the child node
        }
        return true; // All characters found, prefix exists
    }
}
```

### Explanation

1. **TrieNode Class**:

   - Represents a node in the Trie.
   - Each node contains:
     - A `children` object that maps characters to child nodes.
     - A boolean `isEndOfWord` to indicate whether the node marks the end of a valid word.
2. **Trie Class**:

   - Contains the root node of the Trie.
   - Implements three methods: `insert`, `search`, and `startsWith`.
3. **Insert Method**:

   - For each character in the word:
     - If the character does not exist in the current node's children, create a new `TrieNode`.
     - Move to the corresponding child node.
   - After processing all characters, mark the last node as `isEndOfWord = true`.
4. **Search Method**:

   - For each character in the word:
     - Check if the character exists in the current node's children.
     - If any character is not found, return `false`.
   - After processing all characters, return the `isEndOfWord` status of the last node.
5. **StartsWith Method**:

   - Similar to the `search` method, but instead of checking the `isEndOfWord`, we only check if all characters of the prefix exist in the Trie.

### Time and Space Complexity

- **Time Complexity**:

  - `insert`: \( O(M) \) where \( M \) is the length of the word being inserted.
  - `search`: \( O(M) \) where \( M \) is the length of the word being searched.
  - `startsWith`: \( O(P) \) where \( P \) is the length of the prefix being checked.
- **Space Complexity**: \( O(M \cdot N) \)

  - Where \( M \) is the average length of the words inserted and \( N \) is the number of words. This is because each word can potentially create new nodes.

### Example Usage

```javascript
// Create a Trie object
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");

// Search for words
console.log(trie.search("apple"));   // Output: true
console.log(trie.search("app"));     // Output: true
console.log(trie.search("appl"));    // Output: false

// Check prefixes
console.log(trie.startsWith("app")); // Output: true
console.log(trie.startsWith("ap"));  // Output: true
console.log(trie.startsWith("a"));   // Output: true
console.log(trie.startsWith("b"));   // Output: false
```

### Additional Test Cases

```plaintext
Input: 
trie.insert("banana");
trie.search("banana");     // Output: true
trie.search("ban");        // Output: false
trie.startsWith("ban");    // Output: true
trie.insert("ban");
trie.search("ban");        // Output: true
```

### Key Points

- **Trie Structure**: The Trie allows for efficient prefix-based search operations.
- **Dynamic Size**: The Trie grows dynamically as words are inserted, making it flexible in terms of space usage.

## 29. Add and Search Word - Data structure design

=> Here’s the solution for the **Add and Search Word - Data structure design** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Design a data structure that supports the following operations:

1. `addWord(word)`: Adds a word into the data structure.
2. `search(word)`: Searches for a word in the data structure. A word could contain the dot character `.` to represent any one letter.

### Example

```plaintext
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // returns false
wordDictionary.search("bad"); // returns true
wordDictionary.search(".ad"); // returns true
wordDictionary.search("b.."); // returns true
```

### JavaScript Solution

We can implement this using a Trie structure that allows us to handle the wildcard search effectively.

#### TrieNode Implementation

```javascript
class TrieNode {
    constructor() {
        this.children = {}; // Dictionary to store child nodes
        this.isEndOfWord = false; // Indicates if this node is the end of a word
    }
}
```

#### WordDictionary Implementation

```javascript
class WordDictionary {
    constructor() {
        this.root = new TrieNode(); // Root node of the Trie
    }

    // Adds a word into the data structure
    addWord(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode(); // Create a new node if the character doesn't exist
            }
            node = node.children[char]; // Move to the child node
        }
        node.isEndOfWord = true; // Mark the end of the word
    }

    // Searches for a word in the data structure
    search(word) {
        return this._searchInNode(word, this.root); // Start searching from the root
    }

    // Helper function to search in the Trie with support for wildcards
    _searchInNode(word, node) {
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (char === '.') { // If it's a wildcard character
                // Check all possible children
                for (const child in node.children) {
                    if (this._searchInNode(word.slice(i + 1), node.children[child])) {
                        return true; // If any child matches the remaining word
                    }
                }
                return false; // If no child matches
            } else {
                // If the character is not a wildcard, move down the Trie
                if (!node.children[char]) {
                    return false; // Character not found
                }
                node = node.children[char]; // Move to the child node
            }
        }
        return node.isEndOfWord; // Check if it is the end of a valid word
    }
}
```

### Explanation

1. **TrieNode Class**:

   - Represents a node in the Trie.
   - Contains:
     - A `children` object that maps characters to child nodes.
     - A boolean `isEndOfWord` to indicate whether the node marks the end of a valid word.
2. **WordDictionary Class**:

   - Contains the root node of the Trie.
   - Implements two methods: `addWord` and `search`.
3. **AddWord Method**:

   - For each character in the word:
     - If the character does not exist in the current node's children, create a new `TrieNode`.
     - Move to the corresponding child node.
   - After processing all characters, mark the last node as `isEndOfWord = true`.
4. **Search Method**:

   - Calls the helper method `_searchInNode` to search for the word in the Trie.
   - The helper function can handle wildcards (`.`).
5. **Wildcard Search Logic**:

   - For each character in the word:
     - If the character is a dot (`.`), iterate through all child nodes.
     - For each child, recursively call `_searchInNode` with the remaining part of the word.
     - If any child returns `true`, the search is successful.
     - If the character is not found in the current node's children, return `false`.
   - After processing all characters, return the `isEndOfWord` status of the last node.

### Time and Space Complexity

- **Time Complexity**:

  - `addWord`: \( O(M) \) where \( M \) is the length of the word being added.
  - `search`: In the worst case, it could take \( O(N \cdot 26^K) \), where \( N \) is the number of words in the dictionary, \( K \) is the length of the word being searched, and \( 26 \) represents the maximum branching factor of children nodes for each wildcard character. In practice, the average case is much lower due to early termination.
- **Space Complexity**: \( O(M \cdot N) \)

  - Where \( M \) is the average length of the words added and \( N \) is the number of words. This accounts for all the nodes created in the Trie structure.

### Example Usage

```javascript
// Create a WordDictionary object
const wordDictionary = new WordDictionary();

// Add words
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");

// Search for words
console.log(wordDictionary.search("pad")); // Output: false
console.log(wordDictionary.search("bad")); // Output: true
console.log(wordDictionary.search(".ad")); // Output: true
console.log(wordDictionary.search("b..")); // Output: true
```

### Additional Test Cases

```plaintext
Input:
wordDictionary.addWord("bat");
wordDictionary.addWord("rat");
wordDictionary.search("bat");  // Output: true
wordDictionary.search("b..");   // Output: true
wordDictionary.search("r..");   // Output: true
wordDictionary.search("c..");   // Output: false
```

### Key Points

- **Dynamic Size**: The Trie can accommodate a dynamic number of words and supports efficient prefix-based searches.
- **Wildcard Support**: The implementation efficiently handles wildcard searches with recursion.

## 30. Word Search

**=>** Here's the solution for the **Word Search** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a 2D board and a word, find if the word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where "adjacent" cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

### Example

```plaintext
Input:
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCED"

Output: true

Input:
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "SEE"

Output: true

Input:
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCB"

Output: false
```

### JavaScript Solution

We can implement this using Depth-First Search (DFS) to explore the grid.

```javascript
class Solution {
    exist(board, word) {
        const rows = board.length;
        const cols = board[0].length;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (this.dfs(board, word, row, col, 0)) {
                    return true; // Found the word
                }
            }
        }
        return false; // Word not found
    }

    dfs(board, word, row, col, index) {
        // Base cases
        if (index === word.length) return true; // Found all characters of the word
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] !== word[index]) {
            return false; // Out of bounds or character does not match
        }

        // Mark the cell as visited
        const temp = board[row][col];
        board[row][col] = '#'; // Use a special character to mark visited

        // Explore all possible directions (up, down, left, right)
        const found = this.dfs(board, word, row + 1, col, index + 1) ||
                      this.dfs(board, word, row - 1, col, index + 1) ||
                      this.dfs(board, word, row, col + 1, index + 1) ||
                      this.dfs(board, word, row, col - 1, index + 1);

        // Restore the original value for backtracking
        board[row][col] = temp;

        return found; // Return whether the word was found
    }
}
```

### Explanation

1. **exist Method**:

   - Iterate through each cell in the board.
   - Call the `dfs` method to search for the word starting from the current cell.
   - If any call to `dfs` returns `true`, the word exists in the grid.
2. **dfs Method**:

   - Check base cases:
     - If `index` equals the length of the word, it means all characters have been matched, so return `true`.
     - If the current cell is out of bounds or the character does not match the current character of the word, return `false`.
   - Mark the current cell as visited by replacing its value with a special character (e.g., `'#'`).
   - Recursively search in all four possible directions (up, down, left, right).
   - After exploring, restore the original value of the cell for backtracking.
   - Return whether the word was found in any direction.

### Time and Space Complexity

- **Time Complexity**:

  - In the worst case, the algorithm could explore every cell in the grid for every character of the word, resulting in a time complexity of \( O(N \times M \times 4^L) \), where:
    - \( N \) is the number of rows,
    - \( M \) is the number of columns,
    - \( L \) is the length of the word.
  - In practice, it is much faster due to pruning paths that do not lead to a solution.
- **Space Complexity**:

  - The space complexity is \( O(L) \) due to the recursion stack, where \( L \) is the maximum length of the word.

### Example Usage

```javascript
const solution = new Solution();
const board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];
console.log(solution.exist(board, "ABCCED")); // Output: true
console.log(solution.exist(board, "SEE"));    // Output: true
console.log(solution.exist(board, "ABCB"));    // Output: false
```

### Additional Test Cases

```plaintext
Input:
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCEF"  // Output: false

Input:
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "DCA" // Output: true
```

### Key Points

- **DFS Algorithm**: This approach effectively utilizes DFS to explore all potential paths in the grid.
- **Backtracking**: By marking cells as visited and restoring them after exploration, the algorithm efficiently avoids revisiting cells.

## 31. Number of Islands

**=>** Here’s the solution for the **Number of Islands** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a 2D grid of `'1's` (land) and `'0's` (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Example

```plaintext
Input:
11110
11010
11000
00000

Output: 1

Input:
11000
11000
00100
00011

Output: 3
```

### JavaScript Solution

We can implement this using Depth-First Search (DFS) or Breadth-First Search (BFS) to explore each island.

```javascript
class Solution {
    numIslands(grid) {
        if (grid.length === 0) return 0;
      
        let count = 0;
        const rows = grid.length;
        const cols = grid[0].length;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (grid[row][col] === '1') {
                    count++;
                    this.dfs(grid, row, col); // Start DFS to mark the entire island
                }
            }
        }
      
        return count;
    }

    dfs(grid, row, col) {
        // Base cases
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === '0') {
            return; // Out of bounds or water
        }

        // Mark the cell as visited
        grid[row][col] = '0'; // Change '1' to '0' to mark it as visited

        // Explore all four possible directions (up, down, left, right)
        this.dfs(grid, row + 1, col);
        this.dfs(grid, row - 1, col);
        this.dfs(grid, row, col + 1);
        this.dfs(grid, row, col - 1);
    }
}
```

### Explanation

1. **numIslands Method**:

   - Check if the grid is empty. If yes, return 0.
   - Initialize a counter `count` to keep track of the number of islands.
   - Iterate through each cell in the grid.
   - If a cell contains `'1'` (land), increment the `count` and call the `dfs` method to mark all cells of the island.
2. **dfs Method**:

   - Check base cases:
     - If the current cell is out of bounds or contains `'0'` (water), return.
   - Mark the current cell as visited by changing `'1'` to `'0'`.
   - Recursively explore all four possible directions (up, down, left, right) to mark the entire island.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(N \times M) \), where \( N \) is the number of rows and \( M \) is the number of columns. Each cell is visited once.
- **Space Complexity**:

  - The space complexity is \( O(N \times M) \) in the worst case due to the recursion stack (in the case of a completely filled grid). However, in practice, it is \( O(\min(N, M)) \) for the maximum depth of recursion.

### Example Usage

```javascript
const solution = new Solution();
const grid1 = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0']
];
console.log(solution.numIslands(grid1)); // Output: 1

const grid2 = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1']
];
console.log(solution.numIslands(grid2)); // Output: 3
```

### Additional Test Cases

```plaintext
Input:
grid = [
  ['1', '1', '1', '1', '0'],
  ['0', '1', '0', '0', '0'],
  ['1', '0', '0', '1', '1']
]
Output: 3

Input:
grid = [
  ['0', '0', '0', '0'],
  ['0', '0', '0', '0'],
  ['0', '0', '0', '0']
]
Output: 0
```

### Key Points

- **DFS Algorithm**: This approach efficiently marks all parts of an island as visited, preventing double counting.
- **Backtracking**: The algorithm employs a simple marking strategy to track visited cells.

## 32. Clone Graph

**=>** Here’s the solution for the **Clone Graph** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a reference of a node in a **connected** undirected graph, return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

### Example

```plaintext
Input:
       1
     /   \
    2 --- 3
     \   /
      4

Output: 
Clone of the graph.
```

### JavaScript Solution

We can solve this problem using Depth-First Search (DFS) and a hash map to keep track of already cloned nodes.

```javascript
class Node {
    constructor(val, neighbors) {
        this.val = val;
        this.neighbors = neighbors || [];
    }
}

class Solution {
    cloneGraph(node) {
        if (!node) return null; // Edge case for empty graph

        const visited = new Map(); // To keep track of visited nodes

        // Helper function to perform DFS
        const dfs = (currentNode) => {
            if (visited.has(currentNode)) {
                return visited.get(currentNode); // Return the cloned node if it exists
            }

            // Clone the node
            const clonedNode = new Node(currentNode.val);
            visited.set(currentNode, clonedNode); // Store the clone in the map

            // Recursively clone neighbors
            for (const neighbor of currentNode.neighbors) {
                clonedNode.neighbors.push(dfs(neighbor)); // Clone and add each neighbor
            }

            return clonedNode; // Return the cloned node
        };

        return dfs(node); // Start DFS from the input node
    }
}
```

### Explanation

1. **cloneGraph Method**:

   - Check if the input node is null. If yes, return null.
   - Create a `visited` map to track cloned nodes to avoid duplicates.
   - Call the helper function `dfs` to start the cloning process.
2. **dfs Method**:

   - If the current node has already been cloned (exists in `visited`), return the cloned node from the map.
   - Create a new clone of the current node and store it in the `visited` map.
   - Iterate through each neighbor of the current node and recursively clone them, adding the cloned neighbors to the cloned node's neighbors.
   - Return the cloned node.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(V + E) \), where \( V \) is the number of vertices (nodes) and \( E \) is the number of edges in the graph. Each node and edge is processed once.
- **Space Complexity**:

  - The space complexity is \( O(V) \) for the visited map, which stores all the cloned nodes. The recursion stack can also go up to \( O(V) \) in the worst case.

### Example Usage

```javascript
// Example usage
const solution = new Solution();
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);

node1.neighbors = [node2, node3];
node2.neighbors = [node1, node3, node4];
node3.neighbors = [node1, node2];
node4.neighbors = [node2];

const clonedGraph = solution.cloneGraph(node1);

// To display the cloned graph, you can implement a function to print the graph
const printGraph = (node) => {
    const visited = new Set();
    const queue = [node];

    while (queue.length) {
        const currentNode = queue.shift();
        if (!visited.has(currentNode)) {
            visited.add(currentNode);
            console.log(`Node ${currentNode.val} -> [${currentNode.neighbors.map(n => n.val).join(', ')}]`);
            queue.push(...currentNode.neighbors);
        }
    }
};

printGraph(clonedGraph);
```

### Additional Test Cases

```plaintext
Input:
       1
     /   \
    2 --- 3
     \   /
      4

Output: 
Cloned graph with the same structure.

Input: null
Output: null (empty graph)
```

### Key Points

- **DFS with Recursion**: This approach efficiently traverses the graph and creates clones while maintaining references in a map to prevent cycles and duplicates.
- **Handling Cycles**: The use of a map to keep track of visited nodes ensures that we don't get stuck in cycles in the graph.

# < Dynamic Programming >

# 33. Climbing Stairs

**=>** Here’s the solution for the **Climbing Stairs** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

### Example

```plaintext
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top:
1. 1 step + 1 step
2. 2 steps

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top:
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

### JavaScript Solution

This problem can be solved using either dynamic programming or recursion with memoization. Here, I'll provide a dynamic programming approach.

```javascript
class Solution {
    climbStairs(n) {
        if (n <= 1) return 1; // Base cases

        const dp = new Array(n + 1);
        dp[0] = 1; // 1 way to stay at the ground (0 steps)
        dp[1] = 1; // 1 way to climb 1 step

        // Fill the dp array
        for (let i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2]; // Sum of the two previous steps
        }

        return dp[n]; // The number of ways to climb n steps
    }
}
```

### Explanation

1. **Base Cases**:

   - If `n` is `0`, there's `1` way to stay at the ground.
   - If `n` is `1`, there's also `1` way to climb it (one step).
2. **Dynamic Programming Array**:

   - Create a `dp` array where `dp[i]` represents the number of distinct ways to climb to the `i-th` step.
   - Initialize `dp[0]` to `1` and `dp[1]` to `1`.
3. **Fill the DP Array**:

   - For each step from `2` to `n`, calculate the number of ways to reach that step by summing the ways to reach the two previous steps:
     \[
     dp[i] = dp[i - 1] + dp[i - 2]
     \]
4. **Return Result**:

   - Finally, return `dp[n]`, which contains the number of ways to reach the top.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n) \) since we iterate through the range from `2` to `n`.
- **Space Complexity**:

  - The space complexity is \( O(n) \) for the `dp` array.
  - This can be optimized to \( O(1) \) by only storing the last two results instead of the whole array.

### Optimized Space Complexity Solution

Here’s the optimized version using constant space:

```javascript
class Solution {
    climbStairs(n) {
        if (n <= 1) return 1; // Base cases

        let first = 1; // dp[0]
        let second = 1; // dp[1]
        let ways = 0;

        for (let i = 2; i <= n; i++) {
            ways = first + second; // The number of ways to reach the i-th step
            first = second; // Move to the next step
            second = ways; // Update the second to current ways
        }

        return second; // The number of ways to climb n steps
    }
}
```

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.climbStairs(2)); // Output: 2
console.log(solution.climbStairs(3)); // Output: 3
console.log(solution.climbStairs(4)); // Output: 5
```

### Additional Test Cases

```plaintext
Input: n = 0
Output: 1

Input: n = 5
Output: 8
```

### Key Points

- **Dynamic Programming**: This approach builds upon previously computed results, making it efficient.
- **Optimization**: The space complexity can be reduced by only keeping track of the last two computed values.

## 34. Coin Change

**=>** Here’s the solution for the **Coin Change** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. You want to compute the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of the coins, return `-1`.

### Example

```plaintext
Input: coins = [1, 2, 5], amount = 11
Output: 3
Explanation: 11 can be made up of 5 + 5 + 1.

Input: coins = [2], amount = 3
Output: -1
```

### JavaScript Solution

We can solve this problem using a dynamic programming approach.

```javascript
class Solution {
    coinChange(coins, amount) {
        const dp = new Array(amount + 1).fill(Infinity); // Initialize dp array
        dp[0] = 0; // Base case: 0 coins are needed to make amount 0

        // Fill the dp array
        for (let i = 1; i <= amount; i++) {
            for (const coin of coins) {
                if (i - coin >= 0) { // Check if coin can be used
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1); // Update the dp value
                }
            }
        }

        return dp[amount] === Infinity ? -1 : dp[amount]; // Check if amount can be made
    }
}
```

### Explanation

1. **Dynamic Programming Array**:

   - Create a `dp` array where `dp[i]` represents the minimum number of coins needed to make the amount `i`.
   - Initialize the array with `Infinity` to signify that those amounts are initially unreachable. Set `dp[0]` to `0` since no coins are needed to make the amount `0`.
2. **Fill the DP Array**:

   - For each amount `i` from `1` to `amount`, iterate through each coin.
   - If the coin value is less than or equal to `i`, update the `dp[i]` with the minimum value between the current `dp[i]` and `dp[i - coin] + 1` (indicating using one more coin).
3. **Return Result**:

   - Finally, check if `dp[amount]` is still `Infinity`. If it is, return `-1` (meaning the amount cannot be formed with the given coins). Otherwise, return `dp[amount]`.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n \times m) \), where \( n \) is the amount and \( m \) is the number of coins. We fill the `dp` array for each amount using each coin.
- **Space Complexity**:

  - The space complexity is \( O(n) \) for the `dp` array, which stores the minimum number of coins needed for each amount.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.coinChange([1, 2, 5], 11)); // Output: 3
console.log(solution.coinChange([2], 3)); // Output: -1
console.log(solution.coinChange([1], 0)); // Output: 0
console.log(solution.coinChange([1], 2)); // Output: 2
```

### Additional Test Cases

```plaintext
Input: coins = [1, 3, 4], amount = 6
Output: 2
Explanation: 6 can be made up of 3 + 3.

Input: coins = [2, 5, 10], amount = 27
Output: 4
Explanation: 27 can be made up of 10 + 10 + 5 + 2.
```

### Key Points

- **Dynamic Programming**: This approach efficiently builds upon previously computed results to find the minimum number of coins.
- **Initialization**: Proper initialization of the `dp` array is crucial to ensure correct results.

## 35. Longest Increasing Subsequence

**=>** Here’s the solution for the **Longest Increasing Subsequence (LIS)** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

### Example

```plaintext
Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4
Explanation: The longest increasing subsequence is [2, 3, 7, 101], so the length is 4.

Input: nums = [0, 1, 0, 3, 2, 3]
Output: 4
```

### JavaScript Solution

We can solve this problem using dynamic programming.

```javascript
class Solution {
    lengthOfLIS(nums) {
        const n = nums.length;
        if (n === 0) return 0;

        const dp = new Array(n).fill(1); // Initialize dp array with 1

        // Fill the dp array
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1); // Update dp[i]
                }
            }
        }

        return Math.max(...dp); // Return the maximum length
    }
}
```

### Explanation

1. **Dynamic Programming Array**:

   - Create a `dp` array where `dp[i]` represents the length of the longest increasing subsequence that ends with the element at index `i`. Initialize all values to `1` since each element can be an increasing subsequence of length `1`.
2. **Fill the DP Array**:

   - Iterate through the array with two nested loops:
     - The outer loop (with index `i`) goes from `1` to `n - 1`.
     - The inner loop (with index `j`) goes from `0` to `i - 1`.
     - For each pair of indices, check if `nums[i] > nums[j]`. If true, update `dp[i]` with the maximum value between `dp[i]` and `dp[j] + 1`. This means we can extend the increasing subsequence that ends at `j` by adding `nums[i]`.
3. **Return Result**:

   - Finally, return the maximum value from the `dp` array, which gives the length of the longest increasing subsequence.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n^2) \), where \( n \) is the length of the `nums` array. This is due to the nested loops iterating over the elements.
- **Space Complexity**:

  - The space complexity is \( O(n) \) for the `dp` array.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // Output: 4
console.log(solution.lengthOfLIS([0, 1, 0, 3, 2, 3])); // Output: 4
console.log(solution.lengthOfLIS([7, 7, 7, 7, 7, 7])); // Output: 1
```

### Additional Test Cases

```plaintext
Input: nums = [1, 3, 6, 7, 8, 4, 5]
Output: 5
Explanation: The longest increasing subsequence is [1, 3, 4, 5, 6].

Input: nums = []
Output: 0
```

### Key Points

- **Dynamic Programming**: This approach efficiently builds upon previously computed results to find the longest increasing subsequence.
- **Optimal Substructure**: The problem exhibits optimal substructure, meaning the optimal solution can be constructed from optimal solutions of its subproblems.

### Optimized Solution (Using Binary Search)

For a more efficient solution, we can reduce the time complexity to \( O(n \log n) \) using a binary search approach.

```javascript
class Solution {
    lengthOfLIS(nums) {
        const sub = []; // Array to store the end elements of potential increasing subsequences

        for (const num of nums) {
            let left = 0, right = sub.length;

            // Binary search for the insertion point
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (sub[mid] < num) {
                    left = mid + 1; // Move right
                } else {
                    right = mid; // Move left
                }
            }

            // If num is larger than any element in sub, append it
            if (left >= sub.length) {
                sub.push(num);
            } else {
                sub[left] = num; // Replace the end element of the subsequence
            }
        }

        return sub.length; // The length of the sub array represents the length of LIS
    }
}
```

### Explanation of Optimized Solution

- We maintain an array `sub` that contains the smallest end elements of increasing subsequences of various lengths.
- For each number in `nums`, we use binary search to find its position in the `sub` array:
  - If it can extend the largest subsequence, we append it.
  - If it can replace an element, we update it.
- The length of the `sub` array at the end gives the length of the longest increasing subsequence.

### Example Usage of Optimized Solution

```javascript
const solution = new Solution();
console.log(solution.lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // Output: 4
console.log(solution.lengthOfLIS([0, 1, 0, 3, 2, 3])); // Output: 4
```

## 36. Longest Common Subsequence

**=>** Here’s the solution for the **Longest Common Subsequence (LCS)** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given two strings `text1` and `text2`, return the length of their longest common subsequence. A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.

### Example

```plaintext
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.

Input: text1 = "abc", text2 = "def"
Output: 0
```

### JavaScript Solution

We can solve this problem using dynamic programming.

```javascript
class Solution {
    longestCommonSubsequence(text1, text2) {
        const m = text1.length;
        const n = text2.length;

        // Create a 2D array to store lengths of longest common subsequence
        const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

        // Fill the dp array
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1; // Match found
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Take the max from the previous computations
                }
            }
        }

        return dp[m][n]; // Length of longest common subsequence
    }
}
```

### Explanation

1. **Dynamic Programming Table**:

   - Create a 2D array `dp` where `dp[i][j]` represents the length of the longest common subsequence of the substrings `text1[0...i-1]` and `text2[0...j-1]`.
   - Initialize all values to `0`. The dimensions of the table are `(m + 1) x (n + 1)` to account for the base case of empty strings.
2. **Fill the DP Table**:

   - Iterate through the lengths of both strings.
   - If the characters at the current indices match (`text1[i-1] === text2[j-1]`), increment the length of the subsequence by `1` based on the previous characters (`dp[i][j] = dp[i-1][j-1] + 1`).
   - If they do not match, take the maximum length found by either ignoring the current character of `text1` or `text2` (`dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])`).
3. **Return Result**:

   - The length of the longest common subsequence is stored in `dp[m][n]`.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(m \times n) \), where \( m \) is the length of `text1` and \( n \) is the length of `text2`. This is due to the nested loops filling the `dp` table.
- **Space Complexity**:

  - The space complexity is \( O(m \times n) \) for the `dp` table.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.longestCommonSubsequence("abcde", "ace")); // Output: 3
console.log(solution.longestCommonSubsequence("abc", "def")); // Output: 0
console.log(solution.longestCommonSubsequence("bl", "yby")); // Output: 1
```

### Additional Test Cases

```plaintext
Input: text1 = "abcba", text2 = "abcbcba"
Output: 5
Explanation: The longest common subsequence is "abcba".

Input: text1 = "oxcpqrsvwf", text2 = "shmtulqryy"
Output: 2
```

### Optimized Space Complexity

You can reduce the space complexity from \( O(m \times n) \) to \( O(\min(m, n)) \) by using two 1D arrays instead of a 2D array.

```javascript
class Solution {
    longestCommonSubsequence(text1, text2) {
        const m = text1.length;
        const n = text2.length;

        // Ensure dp array is created with the smaller length
        const dp = new Array(n + 1).fill(0);
        const prev = new Array(n + 1).fill(0);

        // Fill the dp array
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    dp[j] = prev[j - 1] + 1; // Match found
                } else {
                    dp[j] = Math.max(dp[j], prev[j]); // Take the max from previous
                }
            }
            // Update prev for the next iteration
            [prev, dp] = [dp, prev];
        }

        return prev[n]; // Length of longest common subsequence
    }
}
```

### Explanation of Optimized Space Solution

- Instead of maintaining a 2D array, use two 1D arrays (`dp` and `prev`).
- The `prev` array holds the previous values of the current row, while the `dp` array is updated in place for the current row.
- After processing each row, swap the references of `dp` and `prev`.

### Example Usage of Optimized Solution

```javascript
const solution = new Solution();
console.log(solution.longestCommonSubsequence("abcde", "ace")); // Output: 3
console.log(solution.longestCommonSubsequence("abc", "def")); // Output: 0
```

## 37. Word Break

**=>** Here’s the solution for the **Word Break** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a string `s` and a dictionary of strings `wordDict`, determine if `s` can be segmented into a space-separated sequence of one or more dictionary words.

### Example

```plaintext
Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: The string can be segmented as "leet code".

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: The string can be segmented as "apple pen apple".

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
```

### JavaScript Solution

We can solve this problem using dynamic programming.

```javascript
class Solution {
    wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const dp = Array(s.length + 1).fill(false);
        dp[0] = true; // Base case: empty string can be segmented

        for (let i = 1; i <= s.length; i++) {
            for (let j = 0; j < i; j++) {
                if (dp[j] && wordSet.has(s.substring(j, i))) {
                    dp[i] = true; // If the substring can be formed, mark it as true
                    break; // No need to check further, found a valid segmentation
                }
            }
        }

        return dp[s.length]; // Return whether the whole string can be segmented
    }
}
```

### Explanation

1. **Dynamic Programming Array**:

   - Create a boolean array `dp` of size `s.length + 1` initialized to `false`.
   - Set `dp[0] = true` because an empty string can always be segmented.
2. **Nested Loop**:

   - The outer loop iterates over the length of the string `s` from `1` to `s.length`.
   - The inner loop checks all possible previous positions `j` for the current position `i`.
   - If `dp[j]` is `true` (indicating the substring up to `j` can be segmented) and the substring `s.substring(j, i)` exists in the dictionary, then set `dp[i] = true` and break out of the inner loop.
3. **Return Result**:

   - The final result is stored in `dp[s.length]`, indicating whether the entire string can be segmented.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n^2) \), where \( n \) is the length of the string `s`. This is due to the nested loops, where the outer loop runs \( n \) times and the inner loop runs at most \( n \) times.
- **Space Complexity**:

  - The space complexity is \( O(n) \) for the `dp` array.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.wordBreak("leetcode", ["leet", "code"])); // Output: true
console.log(solution.wordBreak("applepenapple", ["apple", "pen"])); // Output: true
console.log(solution.wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // Output: false
```

### Additional Test Cases

```plaintext
Input: s = "cars", wordDict = ["car", "ca", "rs"]
Output: true
Explanation: The string can be segmented as "car s".

Input: s = "bb", wordDict = ["a", "b", "bbb", "bbbb"]
Output: true
Explanation: The string can be segmented as "bb".
```

### Optimized Space Complexity

We can optimize the space complexity to \( O(n) \) while keeping the same time complexity.

- The approach remains the same since we're already using only one array to store boolean values for each index of the string.

### Example Usage of Optimized Solution

The implementation remains the same as shown above, as the current implementation already uses optimal space.

## 38. Maximum Product Subarray

**=>** Here’s the solution for the **Maximum Product Subarray** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest product and return that product.

### Example

```plaintext
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be negative because we need to return the maximum product.

Input: nums = [-2,3,-4]
Output: 24
Explanation: The result is 24 because the subarray [3,-4] has the largest product 12.
```

### JavaScript Solution

We can solve this problem using a single pass through the array while keeping track of both the maximum and minimum products up to the current index.

```javascript
class Solution {
    maxProduct(nums) {
        if (nums.length === 0) return 0;

        let maxProduct = nums[0];
        let currentMax = nums[0];
        let currentMin = nums[0];

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] < 0) {
                // Swap currentMax and currentMin when a negative number is encountered
                [currentMax, currentMin] = [currentMin, currentMax];
            }

            // Update currentMax and currentMin
            currentMax = Math.max(nums[i], currentMax * nums[i]);
            currentMin = Math.min(nums[i], currentMin * nums[i]);

            // Update maxProduct if currentMax is greater
            maxProduct = Math.max(maxProduct, currentMax);
        }

        return maxProduct;
    }
}
```

### Explanation

1. **Initialization**:

   - We initialize `maxProduct`, `currentMax`, and `currentMin` with the first element of the array.
   - `maxProduct` keeps track of the overall maximum product found so far, while `currentMax` and `currentMin` keep track of the maximum and minimum products up to the current index.
2. **Loop Through the Array**:

   - We iterate through the array starting from the second element.
   - If we encounter a negative number, we swap `currentMax` and `currentMin` because multiplying by a negative number will turn the maximum product into the minimum and vice versa.
3. **Update Current Max and Min**:

   - We calculate `currentMax` as the maximum of the current number itself and the product of `currentMax` with the current number. This accounts for starting a new subarray.
   - We calculate `currentMin` similarly, which is important because a negative number multiplied by the minimum product could become a new maximum.
4. **Update Overall Maximum**:

   - We continuously update `maxProduct` with the highest value found in `currentMax`.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n) \), where \( n \) is the length of the array. We only go through the array once.
- **Space Complexity**:

  - The space complexity is \( O(1) \) since we are using a constant amount of space.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.maxProduct([2, 3, -2, 4])); // Output: 6
console.log(solution.maxProduct([-2, 0, -1])); // Output: 0
console.log(solution.maxProduct([-2, 3, -4])); // Output: 24
```

### Additional Test Cases

```plaintext
Input: nums = [1, -2, -3, 0, 7, -8, -2]
Output: 112
Explanation: The subarray [7, -8, -2] gives the maximum product 112.

Input: nums = [-2, -3, 0, -2, -40]
Output: 80
Explanation: The subarray [-2, -40] gives the maximum product 80.
```

## 39. Decode Ways

**=>** Here’s the solution for the **Decode Ways** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

A message containing letters from `A-Z` can be encoded into numbers using the mapping `A = 1`, `B = 2`, ..., `Z = 26`. For example, the encoded message "111" may represent:

- "AAA" (1 1 1)
- "KA" (11 1)
- "AK" (1 11)

Given a string `s` consisting of digits, return the number of ways to decode it.

### Example

```plaintext
Input: s = "12"
Output: 2
Explanation: It can be decoded as "AB" (1 2) or "L" (12).

Input: s = "226"
Output: 3
Explanation: It can be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Input: s = "0"
Output: 0
Explanation: There is no valid encoding for "0".

Input: s = "06"
Output: 0
```

### JavaScript Solution

We can solve this problem using dynamic programming.

```javascript
class Solution {
    numDecodings(s) {
        if (s.length === 0 || s[0] === '0') return 0;

        const dp = Array(s.length + 1).fill(0);
        dp[0] = 1; // Base case: An empty string has one way to decode

        for (let i = 1; i <= s.length; i++) {
            // Check single digit
            if (s[i - 1] !== '0') {
                dp[i] += dp[i - 1];
            }

            // Check two digits
            if (i > 1) {
                const twoDigit = parseInt(s.substring(i - 2, i), 10);
                if (twoDigit >= 10 && twoDigit <= 26) {
                    dp[i] += dp[i - 2];
                }
            }
        }

        return dp[s.length]; // Return the total ways to decode the entire string
    }
}
```

### Explanation

1. **Base Case**:

   - If the string is empty or starts with '0', it cannot be decoded, so we return `0`.
   - Initialize a dynamic programming array `dp` where `dp[i]` represents the number of ways to decode the substring `s[0:i]`. Set `dp[0] = 1` as there is one way to decode an empty string.
2. **Iterate Through the String**:

   - For each index `i` from `1` to `s.length`, check the following:
     - **Single Digit**: If `s[i - 1]` (the character at the current position) is not '0', it can represent a valid single character (A to I), so we add `dp[i - 1]` to `dp[i]`.
     - **Two Digits**: If `i > 1`, we check the two-digit number formed by `s[i - 2]` and `s[i - 1]`. If this number is between `10` and `26`, it represents a valid letter (J to Z), so we add `dp[i - 2]` to `dp[i]`.
3. **Return Result**:

   - The last element `dp[s.length]` will contain the total ways to decode the entire string.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n) \), where \( n \) is the length of the string `s`, as we iterate through the string once.
- **Space Complexity**:

  - The space complexity is \( O(n) \) due to the `dp` array.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.numDecodings("12")); // Output: 2
console.log(solution.numDecodings("226")); // Output: 3
console.log(solution.numDecodings("0")); // Output: 0
console.log(solution.numDecodings("06")); // Output: 0
```

### Additional Test Cases

```plaintext
Input: s = "11106"
Output: 5
Explanation: It can be decoded as "AAJF" (1 1 10 6), "KJF" (11 10 6), "AJF" (1 10 6), "AJA" (1 1 1 0 6), "AABF" (1 1 1 1 6).

Input: s = "22606"
Output: 2
Explanation: It can be decoded as "BZ" (2 26) or "BBF" (2 2 6).
```

### Space Optimization

We can optimize the space complexity to \( O(1) \) by only keeping track of the last two results instead of maintaining the entire `dp` array.

```javascript
class Solution {
    numDecodings(s) {
        if (s.length === 0 || s[0] === '0') return 0;

        let prev1 = 1; // Represents dp[i - 1]
        let prev2 = 1; // Represents dp[i - 2]

        for (let i = 1; i <= s.length; i++) {
            let current = 0;

            // Check single digit
            if (s[i - 1] !== '0') {
                current += prev1;
            }

            // Check two digits
            if (i > 1) {
                const twoDigit = parseInt(s.substring(i - 2, i), 10);
                if (twoDigit >= 10 && twoDigit <= 26) {
                    current += prev2;
                }
            }

            prev2 = prev1; // Move prev1 to prev2
            prev1 = current; // Move current to prev1
        }

        return prev1; // Return the last calculated value
    }
}
```

This optimized approach uses only two variables to store the necessary results, reducing space complexity to \( O(1) \) while maintaining the same time complexity.

## 40. Unique Paths

**=>** Here’s the solution for the **Unique Paths** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given a `m x n` grid representing a robot's position. The robot is located at the top-left corner of the grid (0, 0) and wants to move to the bottom-right corner (m-1, n-1). The robot can only move either down or right at any point in time.

Your task is to determine how many unique paths the robot can take to reach the bottom-right corner.

### Example

```plaintext
Input: m = 3, n = 7
Output: 28
```

### JavaScript Solution

We can solve this problem using dynamic programming.

```javascript
class Solution {
    uniquePaths(m, n) {
        const dp = Array.from({ length: m }, () => Array(n).fill(0));
      
        // Initialize the first row and first column
        for (let i = 0; i < m; i++) {
            dp[i][0] = 1; // Only one way to reach any cell in the first column
        }
      
        for (let j = 0; j < n; j++) {
            dp[0][j] = 1; // Only one way to reach any cell in the first row
        }

        // Fill in the dp array
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }

        return dp[m - 1][n - 1]; // Return the value in the bottom-right corner
    }
}
```

### Explanation

1. **Initialization**:

   - We create a 2D array `dp` of size `m x n`, where `dp[i][j]` will represent the number of unique paths to reach cell `(i, j)`.
   - The first row and first column are initialized to `1` because there is only one way to reach any cell in these two rows/columns (either all the way right or all the way down).
2. **Filling the dp Array**:

   - We start filling the `dp` array from cell `(1, 1)` onward. The number of ways to reach cell `(i, j)` is the sum of the number of ways to reach the cell directly above it `(i - 1, j)` and the cell directly to the left of it `(i, j - 1)`.
   - Thus, the relation becomes:
     \[
     dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
     \]
3. **Return Result**:

   - The bottom-right corner of the `dp` array (`dp[m-1][n-1]`) contains the total unique paths from the top-left to the bottom-right corner.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(m \times n) \) because we fill out a grid of size `m x n`.
- **Space Complexity**:

  - The space complexity is \( O(m \times n) \) due to the 2D `dp` array.

### Optimized Space Complexity

We can optimize the space complexity to \( O(n) \) by using a single array since we only need the current row and the previous row.

```javascript
class Solution {
    uniquePaths(m, n) {
        const dp = Array(n).fill(0);
      
        // Initialize the first row
        for (let j = 0; j < n; j++) {
            dp[j] = 1; // There is only one way to reach any cell in the first row
        }

        // Fill the dp array
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                dp[j] += dp[j - 1]; // Update the current cell based on the previous cell's values
            }
        }

        return dp[n - 1]; // The last cell contains the result
    }
}
```

### Explanation of the Optimized Approach

- Instead of a 2D array, we use a 1D array `dp` of size `n`. We initialize the array to represent the number of ways to reach the cells in the first row.
- As we iterate through each row, we update the `dp` array in place to keep track of the current row's unique paths based on the previous values.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.uniquePaths(3, 7)); // Output: 28
console.log(solution.uniquePaths(3, 2)); // Output: 3
```

### Additional Test Cases

```plaintext
Input: m = 1, n = 1
Output: 1
Explanation: There is only one way to stay in the start cell.

Input: m = 2, n = 2
Output: 2
Explanation: The paths are (1,1) -> (1,2) -> (2,2) and (1,1) -> (2,1) -> (2,2).
```

## 41. Jump Game

**=>** Here's the solution for the **Jump Game** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an array of non-negative integers `nums`, where each element in the array represents your maximum jump length at that position. Your goal is to determine if you can reach the last index starting from the first index.

### Example

```plaintext
Input: nums = [2, 3, 1, 1, 4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Input: nums = [3, 2, 1, 0, 4]
Output: false
Explanation: You will always arrive at index 3, which is maximum you can reach. It is maximum from where you can jump to the end.
```

### JavaScript Solution

We can solve this problem using a greedy approach.

```javascript
class Solution {
    canJump(nums) {
        let maxReachable = 0; // Maximum index we can reach
      
        for (let i = 0; i < nums.length; i++) {
            if (i > maxReachable) {
                return false; // If we cannot reach index i, return false
            }
            maxReachable = Math.max(maxReachable, i + nums[i]); // Update the maximum reachable index
            if (maxReachable >= nums.length - 1) {
                return true; // If we can reach the last index, return true
            }
        }
      
        return false; // If we exit the loop, it means we cannot reach the end
    }
}
```

### Explanation

1. **Initialization**:

   - We initialize `maxReachable` to 0, which tracks the farthest index we can reach as we iterate through the array.
2. **Iterating through the Array**:

   - For each index `i`, we check if it is greater than `maxReachable`. If it is, that means we cannot reach this index, so we return `false`.
   - We update `maxReachable` to be the maximum of its current value and `i + nums[i]`, which represents the farthest index we can reach from the current position.
3. **Check for Last Index**:

   - If at any point `maxReachable` is greater than or equal to the last index (`nums.length - 1`), we return `true`, indicating that we can reach the last index.
4. **Return Result**:

   - If we finish iterating through the array and have not returned `true`, we return `false`.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n) \) because we go through the array once.
- **Space Complexity**:

  - The space complexity is \( O(1) \) because we are using a constant amount of space for the `maxReachable` variable.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.canJump([2, 3, 1, 1, 4])); // Output: true
console.log(solution.canJump([3, 2, 1, 0, 4])); // Output: false
```

### Additional Test Cases

```plaintext
Input: nums = [0]
Output: true
Explanation: We are already at the last index.

Input: nums = [1, 0, 0, 0]
Output: false
Explanation: We can only jump to the first index, but cannot reach the end.
```

## 42. Minimum Path Sum

**=>** Here’s the solution for the **Minimum Path Sum** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a `m x n` grid filled with non-negative integers, you need to find a path from the top-left corner to the bottom-right corner, which minimizes the sum of the numbers along the path. You can only move either down or right at any point in time.

### Example

```plaintext
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
```

### JavaScript Solution

We can solve this problem using dynamic programming.

```javascript
class Solution {
    minPathSum(grid) {
        const m = grid.length;
        const n = grid[0].length;
        const dp = Array.from({ length: m }, () => Array(n).fill(0));
      
        dp[0][0] = grid[0][0]; // Starting point
      
        // Fill in the first row
        for (let j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
        }
      
        // Fill in the first column
        for (let i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }
      
        // Fill in the rest of the dp array
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }

        return dp[m - 1][n - 1]; // Return the value in the bottom-right corner
    }
}
```

### Explanation

1. **Initialization**:

   - We create a 2D array `dp` of the same size as `grid`, where `dp[i][j]` will represent the minimum path sum to reach cell `(i, j)`.
   - The starting point `dp[0][0]` is initialized with `grid[0][0]`.
2. **Filling the First Row and Column**:

   - For the first row, the only way to reach any cell is from the left, so we fill it by adding the value from the left cell.
   - Similarly, for the first column, the only way to reach any cell is from above, so we fill it by adding the value from the above cell.
3. **Filling the dp Array**:

   - For each cell `(i, j)` in the grid (except for the first row and column), the minimum path sum to that cell is the minimum of the values from the cell directly above it `(i - 1, j)` and the cell directly to the left of it `(i, j - 1)` plus the value of the current cell `grid[i][j]`.
   - Thus, the relation becomes:
     \[
     dp[i][j] = \min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
     \]
4. **Return Result**:

   - The value in the bottom-right corner of the `dp` array (`dp[m-1][n-1]`) contains the minimum path sum from the top-left to the bottom-right corner.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(m \times n) \) because we fill out a grid of size `m x n`.
- **Space Complexity**:

  - The space complexity is \( O(m \times n) \) due to the 2D `dp` array.

### Optimized Space Complexity

We can optimize the space complexity to \( O(n) \) by using a single array since we only need the current row and the previous row.

```javascript
class Solution {
    minPathSum(grid) {
        const m = grid.length;
        const n = grid[0].length;
        const dp = Array(n).fill(0);
      
        dp[0] = grid[0][0]; // Starting point
      
        // Initialize the first row
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j - 1] + grid[0][j];
        }

        // Fill the rest of the dp array
        for (let i = 1; i < m; i++) {
            dp[0] += grid[i][0]; // First column can only be filled from the top
            for (let j = 1; j < n; j++) {
                dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j]; // Update based on previous values
            }
        }

        return dp[n - 1]; // The last cell contains the result
    }
}
```

### Explanation of the Optimized Approach

- Instead of a 2D array, we use a 1D array `dp` of size `n`. We initialize the array to represent the minimum path sums for the first row.
- As we iterate through each row, we update the `dp` array in place to keep track of the minimum path sums based on previous values.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // Output: 7
console.log(solution.minPathSum([[1,2,3],[4,5,6]])); // Output: 12
```

### Additional Test Cases

```plaintext
Input: grid = [[1]]
Output: 1
Explanation: The only cell is also the result.

Input: grid = [[1, 2], [1, 1]]
Output: 3
Explanation: The path is 1 → 2 → 1.
```

## 43. House Robber

**=>** Here’s the solution for the **House Robber** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

You are a professional robber who knows that the owner of each house will be absent on certain nights. The houses are arranged in a circular street, and each house has a certain amount of money stashed. Your goal is to maximize the amount of money you can rob tonight without alerting the police. However, you cannot rob two adjacent houses.

### Example

```plaintext
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2) because they are adjacent.
The maximum you can rob is 3.

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3). Maximum amount you can rob = 1 + 3 = 4.
```

### JavaScript Solution

We can solve this problem using dynamic programming.

```javascript
class Solution {
    rob(nums) {
        const n = nums.length;
      
        if (n === 1) return nums[0]; // If there's only one house, rob it.
        if (n === 2) return Math.max(nums[0], nums[1]); // If there are two houses, rob the one with more money.

        // Helper function to calculate maximum money that can be robbed
        const robLinear = (houses) => {
            let prev1 = 0; // Money robbed until the previous house
            let prev2 = 0; // Money robbed until the house before the previous house
          
            for (let money of houses) {
                const temp = prev1; // Store previous value
                prev1 = Math.max(prev1, prev2 + money); // Current house + money robbed before the previous house
                prev2 = temp; // Move to the next house
            }
            return prev1; // Return the maximum money robbed
        };

        // Rob houses from 0 to n-2 (excluding the last house) and from 1 to n-1 (excluding the first house)
        return Math.max(robLinear(nums.slice(0, n - 1)), robLinear(nums.slice(1)));
    }
}
```

### Explanation

1. **Base Cases**:

   - If there is only one house, return its value because that's the only money you can rob.
   - If there are two houses, return the maximum of the two values since you can only rob one.
2. **Helper Function (`robLinear`)**:

   - This function takes a linear array of houses (not circular) and calculates the maximum money that can be robbed using dynamic programming.
   - We maintain two variables, `prev1` and `prev2`, to keep track of the maximum money that can be robbed up to the current house, avoiding the adjacent house condition.
   - For each house, we calculate the maximum money that can be robbed by either robbing the current house (which adds the money from the current house to `prev2`) or skipping it (taking the money from `prev1`).
3. **Calculating Maximum Robbery**:

   - We call the `robLinear` function twice:
     - Once excluding the last house (houses 0 to n-2).
     - Once excluding the first house (houses 1 to n-1).
   - The final result is the maximum of these two values.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n) \) because we go through the list of houses twice.
- **Space Complexity**:

  - The space complexity is \( O(1) \) because we use a constant amount of space for our variables.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.rob([2, 3, 2])); // Output: 3
console.log(solution.rob([1, 2, 3, 1])); // Output: 4
console.log(solution.rob([0])); // Output: 0
console.log(solution.rob([10, 1, 1, 10])); // Output: 20
```

### Additional Test Cases

```plaintext
Input: nums = [1, 2, 3]
Output: 4
Explanation: Rob house 1 (money = 1) and house 3 (money = 3). Total = 1 + 3 = 4.

Input: nums = [2, 7, 9, 3, 1]
Output: 12
Explanation: Rob house 2 (money = 7) and house 4 (money = 3), rob house 5 (money = 1). Total = 7 + 3 + 2 = 12.
```

# < Backtracking >

## 44. Permutations

**=>** Here’s the solution for the **Permutations** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an array of distinct integers, return all possible permutations. You can return the answer in any order.

### Example

```plaintext
Input: nums = [1, 2, 3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### JavaScript Solution

We can solve this problem using backtracking to explore all possible permutations.

```javascript
class Solution {
    permute(nums) {
        const result = [];
      
        const backtrack = (currentPermutation) => {
            if (currentPermutation.length === nums.length) {
                result.push([...currentPermutation]); // Store a copy of the current permutation
                return;
            }
            for (let num of nums) {
                if (currentPermutation.includes(num)) continue; // Skip if the number is already in the current permutation
                currentPermutation.push(num); // Add number to the current permutation
                backtrack(currentPermutation); // Recur with the updated permutation
                currentPermutation.pop(); // Remove the last added number (backtrack)
            }
        };
      
        backtrack([]); // Start the backtracking with an empty permutation
        return result; // Return all collected permutations
    }
}
```

### Explanation

1. **Backtracking Function**:

   - We define a helper function `backtrack` that takes the current permutation being built as an argument.
   - If the length of the `currentPermutation` equals the length of `nums`, it means we have formed a complete permutation, so we push a copy of it to the `result` array.
2. **Generating Permutations**:

   - We loop through each number in `nums`.
   - If the number is already included in `currentPermutation`, we skip it to avoid duplicates in the current permutation.
   - If it is not included, we add it to `currentPermutation`, call `backtrack` recursively to continue building the permutation, and then remove the last number added (backtrack) to explore other possibilities.
3. **Starting the Process**:

   - We call `backtrack` with an empty array to begin the process of generating permutations.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n!) \) because there are \( n! \) permutations of `n` distinct numbers, and generating each permutation takes \( O(n) \) time.
- **Space Complexity**:

  - The space complexity is \( O(n) \) for the recursion stack due to the depth of the recursion, and the space for storing the result is \( O(n!) \).

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.permute([1, 2, 3])); 
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

### Additional Test Cases

```plaintext
Input: nums = [0, 1]
Output: [[0, 1], [1, 0]]

Input: nums = [1]
Output: [[1]]

Input: nums = [1, 2, 3, 4]
Output: [[1,2,3,4], [1,2,4,3], [1,3,2,4], ..., [4,3,2,1]]
```

## 45. Subsets

**=>** Here’s the solution for the **Subsets** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. You may return the answer in any order.

### Example

```plaintext
Input: nums = [1, 2, 3]
Output: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
```

### JavaScript Solution

We can solve this problem using backtracking to explore all possible subsets.

```javascript
class Solution {
    subsets(nums) {
        const result = [];
      
        const backtrack = (start, currentSubset) => {
            result.push([...currentSubset]); // Add the current subset to the result
          
            for (let i = start; i < nums.length; i++) {
                currentSubset.push(nums[i]); // Include nums[i] in the current subset
                backtrack(i + 1, currentSubset); // Recur with the next index
                currentSubset.pop(); // Backtrack to explore other subsets
            }
        };
      
        backtrack(0, []); // Start backtracking with an empty subset
        return result; // Return all collected subsets
    }
}
```

### Explanation

1. **Backtracking Function**:

   - We define a helper function `backtrack` that takes the starting index and the current subset being built as arguments.
   - We push a copy of `currentSubset` into `result` to capture the current subset.
2. **Generating Subsets**:

   - We loop through each element in `nums`, starting from the `start` index.
   - We include the current number in `currentSubset`, and then recursively call `backtrack` with the next index (`i + 1`), which ensures that we build subsets without repeating elements.
   - After returning from the recursive call, we remove the last number added (backtrack) to explore other possibilities.
3. **Starting the Process**:

   - We call `backtrack` with the initial index `0` and an empty array to begin generating subsets.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(2^n) \) because there are \( 2^n \) possible subsets for `n` elements (each element can either be included or excluded).
- **Space Complexity**:

  - The space complexity is \( O(n) \) for the recursion stack and \( O(2^n) \) for storing the subsets in the result.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.subsets([1, 2, 3])); 
// Output: [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
```

### Additional Test Cases

```plaintext
Input: nums = [0]
Output: [[], [0]]

Input: nums = [1, 2, 3, 4]
Output: [[], [1], [2], [3], [4], [1,2], [1,3], [1,4], ..., [1,2,3,4]]
```

## 46. Combination Sum

**=>** Here’s the solution for the **Combination Sum** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an array of distinct integers `candidates` and an integer `target`, return all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order. The same number may be chosen from `candidates` an unlimited number of times.

### Example

```plaintext
Input: candidates = [2, 3, 6, 7], target = 7
Output: [[2, 2, 3], [7]]
```

### JavaScript Solution

We can solve this problem using backtracking to explore all possible combinations.

```javascript
class Solution {
    combinationSum(candidates, target) {
        const result = [];
      
        const backtrack = (start, currentCombination, currentSum) => {
            if (currentSum === target) {
                result.push([...currentCombination]); // Found a valid combination
                return;
            }
            if (currentSum > target) return; // Exceeded the target
          
            for (let i = start; i < candidates.length; i++) {
                currentCombination.push(candidates[i]); // Choose the candidate
                backtrack(i, currentCombination, currentSum + candidates[i]); // Recur with the updated sum
                currentCombination.pop(); // Backtrack to explore other combinations
            }
        };
      
        backtrack(0, [], 0); // Start backtracking
        return result; // Return all found combinations
    }
}
```

### Explanation

1. **Backtracking Function**:

   - We define a helper function `backtrack` that takes the starting index, the current combination being built, and the current sum as arguments.
   - If the `currentSum` equals `target`, we push a copy of `currentCombination` into `result`.
   - If the `currentSum` exceeds `target`, we return early to avoid further exploration.
2. **Generating Combinations**:

   - We loop through the `candidates` starting from the `start` index, allowing the same number to be included multiple times.
   - We add the current candidate to `currentCombination`, then recursively call `backtrack` with the updated sum.
   - After returning from the recursive call, we remove the last number added (backtrack) to explore other combinations.
3. **Starting the Process**:

   - We call `backtrack` with the initial index `0`, an empty array for the current combination, and `0` for the current sum.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity can be high, but in the worst case, it is \( O(N^T) \), where \( N \) is the number of candidates and \( T \) is the target value. This is because we may explore combinations that lead to the target multiple times.
- **Space Complexity**:

  - The space complexity is \( O(T) \) for the recursion stack, plus \( O(k) \) for the combinations stored in `result`, where \( k \) is the number of valid combinations.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.combinationSum([2, 3, 6, 7], 7)); 
// Output: [[2,2,3],[7]]
```

### Additional Test Cases

```plaintext
Input: candidates = [2, 3, 5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]

Input: candidates = [1], target = 2
Output: [[1,1]]
```

## 47. N-Queens

**=>** Here’s the solution for the **N-Queens** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

The N-Queens puzzle is the problem of placing N queens on an N×N chessboard such that no two queens threaten each other. This means that no two queens can be placed in the same row, the same column, or on the same diagonal.

### Example

```plaintext
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
```

### JavaScript Solution

We can solve this problem using backtracking to explore all valid placements of queens.

```javascript
class Solution {
    solveNQueens(n) {
        const result = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));
      
        const backtrack = (row) => {
            if (row === n) {
                result.push(board.map(row => row.join(''))); // Found a valid board configuration
                return;
            }
          
            for (let col = 0; col < n; col++) {
                if (this.isSafe(row, col, board, n)) {
                    board[row][col] = 'Q'; // Place the queen
                    backtrack(row + 1); // Recur to place the next queen
                    board[row][col] = '.'; // Backtrack and remove the queen
                }
            }
        };
      
        backtrack(0); // Start backtracking from the first row
        return result; // Return all found board configurations
    }
  
    isSafe(row, col, board, n) {
        // Check the same column and diagonals for threats
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false; // Check column
          
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false; // Check upper-left diagonal
          
            if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false; // Check upper-right diagonal
        }
        return true; // Safe to place the queen
    }
}
```

### Explanation

1. **Board Representation**:

   - We represent the board as a 2D array filled with `'.'` to indicate empty spaces. When we place a queen, we replace `'.'` with `'Q'`.
2. **Backtracking Function**:

   - We define a helper function `backtrack` that takes the current row as an argument.
   - If `row` equals `n`, we have successfully placed all queens, so we push the current board configuration into `result`.
3. **Placing Queens**:

   - We iterate through each column in the current row and check if placing a queen at `(row, col)` is safe using the `isSafe` function.
   - If it is safe, we place a queen and call `backtrack` for the next row.
   - After returning from the recursive call, we remove the queen (backtrack) by setting the position back to `'.'`.
4. **Safety Check**:

   - The `isSafe` function checks if placing a queen at `(row, col)` is valid by checking:
     - The same column for existing queens.
     - The upper-left diagonal.
     - The upper-right diagonal.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(N!) \) in the worst case since there are \( N \) rows and each row can have \( N \) possibilities. However, due to the constraints imposed by other queens, the actual number of configurations is significantly less.
- **Space Complexity**:

  - The space complexity is \( O(N) \) for the recursion stack. Additionally, we store the valid configurations, which can take up to \( O(N^2) \) space for each configuration.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.solveNQueens(4)); 
// Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
```

### Additional Test Cases

```plaintext
Input: n = 1
Output: [["Q"]]

Input: n = 2
Output: []

Input: n = 3
Output: []
```

## 48. Word Search II

**=>** Here’s the solution for the **Word Search II** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an `m x n` board of characters and a list of strings `words`, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (same letter cell may not be used more than once).

### Example

```plaintext
Input: 
board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]
words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

### JavaScript Solution

We can solve this problem using a Trie to store the words and backtracking to search for them in the board.

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
}

class Solution {
    findWords(board, words) {
        const trie = new Trie();
        const result = new Set();
      
        // Build the Trie from the words
        for (const word of words) {
            trie.insert(word);
        }
      
        const m = board.length;
        const n = board[0].length;
      
        const dfs = (i, j, node, path) => {
            const char = board[i][j];
            node = node.children[char];

            if (!node) return; // Stop the search if the char is not in Trie
            path.push(char);

            if (node.isEndOfWord) {
                result.add(path.join('')); // Found a word
                node.isEndOfWord = false; // Avoid duplicates
            }
          
            // Mark the cell as visited
            board[i][j] = '#';

            // Explore neighbors
            const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (const [dx, dy] of directions) {
                const x = i + dx;
                const y = j + dy;
                if (x >= 0 && x < m && y >= 0 && y < n && board[x][y] !== '#') {
                    dfs(x, y, node, path);
                }
            }

            // Backtrack
            board[i][j] = char; // Restore the cell
            path.pop();
        };
      
        // Start DFS from each cell
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                const char = board[i][j];
                if (trie.root.children[char]) {
                    dfs(i, j, trie.root, []);
                }
            }
        }

        return Array.from(result); // Convert Set to Array
    }
}
```

### Explanation

1. **Trie Structure**:

   - We create a `TrieNode` class that holds a dictionary of children nodes and a boolean indicating if it is the end of a word.
   - The `Trie` class allows us to insert words into the Trie.
2. **Building the Trie**:

   - We iterate over the list of words and insert each word into the Trie.
3. **Depth-First Search (DFS)**:

   - We define a DFS function that takes the current cell coordinates `(i, j)`, the current Trie node, and the path of characters being formed.
   - If the character at the current cell is not in the Trie, we return early.
   - If we reach a Trie node that marks the end of a word, we add the formed word to the result and mark the node as not the end of a word to avoid duplicates.
   - We then mark the cell as visited by changing it to `'#'`.
4. **Exploring Neighbors**:

   - We explore the four possible directions (right, down, left, up) and call DFS on valid neighboring cells.
5. **Backtracking**:

   - After exploring, we backtrack by restoring the cell to its original character and popping the last character from the path.
6. **Starting the Search**:

   - We loop through each cell in the board and start a DFS if the first character is present in the Trie.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(M \cdot N \cdot L) \), where \( M \) is the number of rows, \( N \) is the number of columns, and \( L \) is the maximum length of the words. Each cell is processed, and the depth of recursion can go up to the length of the longest word.
- **Space Complexity**:

  - The space complexity is \( O(L) \) for the Trie and the recursion stack, plus \( O(W) \) for storing the output where \( W \) is the number of valid words found.

### Example Usage

```javascript
const solution = new Solution();
const board = [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v']
];
const words = ["oath", "pea", "eat", "rain"];
console.log(solution.findWords(board, words)); 
// Output: ["eat", "oath"]
```

### Additional Test Cases

```plaintext
Input: 
board = [
  ['a', 'b'],
  ['c', 'd']
]
words = ["ab", "cd", "ad"]
Output: ["ab", "cd"]

Input: 
board = [
  ['a', 'a']
]
words = ["aaa"]
Output: ["aaa"]
```

# < Other >

## 49. Valid Parentheses

**=>** Here's the solution for the **Valid Parentheses** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given a string containing just the characters `('(', ')', '{', '}', '[' and `']`, determine if the input string is valid. An input string is valid if:

1. Open brackets must be closed by the corresponding closing brackets.
2. Open brackets must be closed in the correct order.

### Example

```plaintext
Input: "()[]{}"
Output: true

Input: "(]"
Output: false

Input: "([)]"
Output: false

Input: "{[]}"
Output: true
```

### JavaScript Solution

We can use a stack data structure to solve this problem. When we encounter an opening bracket, we push it onto the stack. When we encounter a closing bracket, we check if the stack is not empty and if the top of the stack matches the corresponding opening bracket.

```javascript
class Solution {
    isValid(s) {
        const stack = [];
        const mapping = {
            ')': '(',
            '}': '{',
            ']': '['
        };

        for (const char of s) {
            if (mapping[char]) {
                // Check if the stack is empty or the top of the stack does not match
                const topElement = stack.pop();
                if (topElement !== mapping[char]) {
                    return false;
                }
            } else {
                // It's an opening bracket, push to stack
                stack.push(char);
            }
        }
      
        // If the stack is empty, all brackets are matched
        return stack.length === 0;
    }
}
```

### Explanation

1. **Data Structure**:

   - We use an array `stack` to keep track of opening brackets. The last added opening bracket is the first one we check against closing brackets, following the Last In First Out (LIFO) principle.
2. **Mapping**:

   - A `mapping` object is created to store corresponding pairs of closing and opening brackets.
3. **Iterating Through the String**:

   - We loop through each character in the string:
     - If the character is a closing bracket (exists in the `mapping`), we pop the last element from the stack and check if it matches the corresponding opening bracket.
     - If it matches, we continue; if it doesn't match, we return `false`.
     - If the character is an opening bracket, we push it onto the stack.
4. **Final Check**:

   - After processing all characters, we check if the stack is empty. If it is, all brackets were matched correctly, and we return `true`. If not, we return `false`.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n) \), where \( n \) is the length of the string. We traverse the string once.
- **Space Complexity**:

  - The space complexity is \( O(n) \) in the worst case, when all characters are opening brackets and stored in the stack.

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.isValid("()[]{}")); // Output: true
console.log(solution.isValid("(]"));     // Output: false
console.log(solution.isValid("([)]"));   // Output: false
console.log(solution.isValid("{[]}"));   // Output: true
```

### Additional Test Cases

```plaintext
Input: "((()))"
Output: true

Input: "(()))"
Output: false

Input: "([]{})"
Output: true

Input: "[({})]"
Output: true

Input: "[(])"
Output: false
```

## 50. Implement strStr()

**=>** Here's the solution for the **Implement strStr()** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Implement the `strStr()` function. Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

### Example

```plaintext
Input: haystack = "hello", needle = "ll"
Output: 2

Input: haystack = "aaaaa", needle = "bba"
Output: -1

Input: haystack = "", needle = ""
Output: 0

Input: haystack = "a", needle = "a"
Output: 0
```

### JavaScript Solution

We can use a simple sliding window approach to find the substring. We will loop through the `haystack` and check if the substring from the current index matches the `needle`.

```javascript
class Solution {
    strStr(haystack, needle) {
        // Edge case: if needle is empty, return 0
        if (needle.length === 0) return 0;

        // Get the lengths of both strings
        const haystackLength = haystack.length;
        const needleLength = needle.length;

        // Loop through the haystack
        for (let i = 0; i <= haystackLength - needleLength; i++) {
            // Check if the substring matches needle
            if (haystack.substring(i, i + needleLength) === needle) {
                return i; // Return the starting index
            }
        }

        return -1; // If not found, return -1
    }
}
```

### Explanation

1. **Edge Case**:

   - If `needle` is an empty string, we return `0` immediately because an empty string is always considered to be found at the beginning of any string.
2. **Length Calculation**:

   - We calculate the lengths of both `haystack` and `needle` for easy access.
3. **Sliding Window Approach**:

   - We loop through the `haystack` up to `haystack.length - needle.length` to avoid out-of-bounds errors.
   - For each index `i`, we check the substring of `haystack` starting from `i` with a length equal to `needle`.
   - If it matches `needle`, we return the current index `i`.
4. **Return Value**:

   - If the loop completes without finding the `needle`, we return `-1`.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O((n - m + 1) \cdot m) \) in the worst case, where \( n \) is the length of `haystack` and \( m \) is the length of `needle`. This is due to the substring comparison in the loop.
  - However, if we optimize further, we can achieve \( O(n) \) with the Knuth-Morris-Pratt (KMP) algorithm or similar algorithms.
- **Space Complexity**:

  - The space complexity is \( O(1) \) since we are not using any additional space that scales with input size (aside from a few variables).

### Example Usage

```javascript
const solution = new Solution();
console.log(solution.strStr("hello", "ll")); // Output: 2
console.log(solution.strStr("aaaaa", "bba")); // Output: -1
console.log(solution.strStr("", ""));          // Output: 0
console.log(solution.strStr("a", "a"));        // Output: 0
```

### Additional Test Cases

```plaintext
Input: haystack = "mississippi", needle = "issip"
Output: 4

Input: haystack = "abc", needle = "d"
Output: -1

Input: haystack = "abcde", needle = "cde"
Output: 2
```

## 51. Rotate Image

**=>** Here's the solution for the **Rotate Image** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an `n x n` 2D matrix representing an image. You need to rotate the image by 90 degrees (clockwise). You have to do this in-place, which means you need to modify the input matrix directly without using any extra space.

### Example

```plaintext
Input:
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

Output:
[
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3]
]
```

### JavaScript Solution

We can solve this problem in two main steps:

1. Transpose the matrix.
2. Reverse each row.

Here's the implementation:

```javascript
class Solution {
    rotate(matrix) {
        const n = matrix.length;

        // Step 1: Transpose the matrix
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                // Swap elements
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }

        // Step 2: Reverse each row
        for (let i = 0; i < n; i++) {
            matrix[i].reverse();
        }
    }
}
```

### Explanation

1. **Transpose the Matrix**:

   - We swap the elements in such a way that the element at position `(i, j)` becomes the element at position `(j, i)`.
   - We only swap the upper triangle of the matrix (i.e., where `j > i`) to avoid double swapping and overwrite issues.
2. **Reverse Each Row**:

   - After transposing, each row is reversed. This effectively rotates the image 90 degrees clockwise.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n^2) \) where \( n \) is the length of the matrix. Both the transposing and the reversing of rows take \( O(n^2) \) time.
- **Space Complexity**:

  - The space complexity is \( O(1) \) because we are modifying the matrix in place and not using any extra space that scales with input size.

### Example Usage

```javascript
const solution = new Solution();
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
solution.rotate(matrix);
console.log(matrix);
// Output: [
//   [7, 4, 1],
//   [8, 5, 2],
//   [9, 6, 3]
// ]
```

### Additional Test Cases

```plaintext
Input: 
[
  [ 5,  1,  9, 11],
  [ 2,  4,  8, 10],
  [13,  3,  6,  7],
  [15, 14, 12, 16]
]

Output:
[
  [15, 13,  2,  5],
  [14,  3,  4,  1],
  [12,  6,  8,  9],
  [16,  7, 10, 11]
]
```

## 52. Group Anagrams

**=>** Here's the solution for the **Group Anagrams** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an array of strings, group the anagrams together. You can return the answer in any order.

### Example

```plaintext
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
```

### JavaScript Solution

We can use a hash map to group the anagrams. The key will be a sorted version of each string, and the value will be an array of strings that are anagrams of that key.

Here's the implementation:

```javascript
class Solution {
    groupAnagrams(strs) {
        const anagrams = {};

        for (const str of strs) {
            // Sort the string to create a key
            const key = str.split('').sort().join('');
          
            // If the key does not exist, create an array for it
            if (!anagrams[key]) {
                anagrams[key] = [];
            }
          
            // Push the original string into the corresponding anagram group
            anagrams[key].push(str);
        }

        // Return the grouped anagrams as an array of arrays
        return Object.values(anagrams);
    }
}
```

### Explanation

1. **Sorting to Create a Key**:

   - For each string in the input array, we sort the characters in the string. This sorted string serves as a unique key for all anagrams.
   - For example, both "eat" and "tea" will produce the key "aet".
2. **Using a Hash Map**:

   - We use an object (`anagrams`) to store arrays of strings that correspond to each unique key.
   - If the key does not already exist in the hash map, we create a new array for that key.
3. **Grouping Anagrams**:

   - We push the original string into the array corresponding to its sorted key.
4. **Returning the Result**:

   - Finally, we return the values of the hash map, which represent the grouped anagrams.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n \cdot k \log k) \) where \( n \) is the number of strings and \( k \) is the maximum length of a string. This is due to the sorting operation for each string.
- **Space Complexity**:

  - The space complexity is \( O(n \cdot k) \) because we store all the input strings in the hash map.

### Example Usage

```javascript
const solution = new Solution();
const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(solution.groupAnagrams(strs));
/*
Output: 
[
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"]
]
*/
```

### Additional Test Cases

```plaintext
Input: strs = [""]
Output: [[""]]

Input: strs = ["a"]
Output: [["a"]]

Input: strs = ["abc", "bca", "cab", "cba"]
Output: [["abc", "bca", "cab", "cba"]]
```

## 53. Minimum Window Substring

**=>** Here's the solution for the **Minimum Window Substring** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

### Example

```plaintext
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
```

### JavaScript Solution

We can solve this problem using the sliding window technique with two pointers. We will use a hash map to count the characters in `t`, and a second hash map to keep track of the characters in the current window of `s`.

Here's the implementation:

```javascript
class Solution {
    minWindow(s, t) {
        if (!s || !t) return "";

        const charCount = {};
        for (const char of t) {
            charCount[char] = (charCount[char] || 0) + 1;
        }

        let required = Object.keys(charCount).length;
        let left = 0, right = 0;
        let formed = 0;
        const windowCounts = {};
        let minLength = Infinity;
        let minWindow = "";

        while (right < s.length) {
            const char = s[right];
            windowCounts[char] = (windowCounts[char] || 0) + 1;

            // Check if this character is part of t and if we've met the required count
            if (char in charCount && windowCounts[char] === charCount[char]) {
                formed++;
            }

            // Try to contract the window until it ceases to be 'desirable'
            while (left <= right && formed === required) {
                const charLeft = s[left];

                // Update the minimum window if the current window is smaller
                if (right - left + 1 < minLength) {
                    minLength = right - left + 1;
                    minWindow = s.substring(left, right + 1);
                }

                // The character at the position pointed by `left` is no longer a part of the window
                windowCounts[charLeft]--;
                if (charLeft in charCount && windowCounts[charLeft] < charCount[charLeft]) {
                    formed--;
                }

                // Move left pointer ahead
                left++;
            }

            // Keep expanding the window by moving right pointer
            right++;
        }

        return minWindow;
    }
}
```

### Explanation

1. **Character Count for `t`**:

   - We first create a hash map (`charCount`) to store the frequency of each character in `t`.
2. **Sliding Window**:

   - We initialize two pointers, `left` and `right`, to represent the current window in `s`.
   - We also keep a count of how many characters from `t` we have formed in the current window (`formed`).
3. **Expanding the Window**:

   - We expand the window by moving the `right` pointer. For each character in `s`, we update its count in `windowCounts`.
4. **Checking for a Valid Window**:

   - If the current window contains all characters in `t` (i.e., `formed === required`), we try to shrink the window from the left by moving the `left` pointer until the window is no longer valid.
5. **Updating the Minimum Window**:

   - Whenever we find a valid window, we check if its length is smaller than the previously recorded minimum length. If it is, we update the minimum window substring.
6. **Returning the Result**:

   - Finally, we return the minimum window substring. If no such window exists, we return an empty string.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(S + T) \) where \( S \) is the length of string `s` and \( T \) is the length of string `t`. We traverse each character in `s` and `t` at most once.
- **Space Complexity**:

  - The space complexity is \( O(T) \) for storing the character counts in the hash maps.

### Example Usage

```javascript
const solution = new Solution();
const s = "ADOBECODEBANC";
const t = "ABC";
console.log(solution.minWindow(s, t)); // Output: "BANC"
```

### Additional Test Cases

```plaintext
Input: s = "a", t = "a"
Output: "a"

Input: s = "a", t = "aa"
Output: ""

Input: s = "AA", t = "AA"
Output: "AA"
```

## 54. Top K Frequent Elements

**=>** Here's the solution for the **Top K Frequent Elements** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

### Example

```plaintext
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1, 2]
```

### JavaScript Solution

We can solve this problem using a hash map to count the frequency of each element, and then we can use a min-heap (or an array sorted by frequency) to keep track of the top `k` frequent elements.

Here's the implementation using a hash map and sorting:

```javascript
class Solution {
    topKFrequent(nums, k) {
        // Step 1: Count the frequency of each number
        const frequencyMap = {};
        for (const num of nums) {
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        }

        // Step 2: Sort the numbers based on their frequency
        const sorted = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);

        // Step 3: Extract the top k frequent elements
        return sorted.slice(0, k).map(item => Number(item[0]));
    }
}
```

### Explanation

1. **Counting Frequencies**:

   - We first create a hash map (`frequencyMap`) to count the frequency of each element in the `nums` array. The key is the number, and the value is its frequency.
2. **Sorting**:

   - We convert the frequency map into an array of entries and sort it based on the frequency (the second element of the entry) in descending order.
3. **Extracting Top K Elements**:

   - After sorting, we take the first `k` entries from the sorted array, map them to get just the numbers, and return that as the result.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(N \log N) \) where \( N \) is the number of elements in `nums`. This is due to the sorting step. The counting step runs in \( O(N) \).
- **Space Complexity**:

  - The space complexity is \( O(N) \) to store the frequency map.

### Example Usage

```javascript
const solution = new Solution();
const nums = [1, 1, 1, 2, 2, 3];
const k = 2;
console.log(solution.topKFrequent(nums, k)); // Output: [1, 2]
```

### Additional Test Cases

```plaintext
Input: nums = [1], k = 1
Output: [1]

Input: nums = [1, 2], k = 2
Output: [1, 2]

Input: nums = [1, 1, 1, 2, 2, 3, 3, 3], k = 3
Output: [1, 2, 3] (order may vary)
```

If you're interested, we can also solve this problem using a min-heap approach for potentially better performance in some cases. Let me know if you'd like to see that or if you want to continue with the next problem!

## 55. Daily Temperatures

**=>** Here’s the solution for the **Daily Temperatures** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days until a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

### Example

```plaintext
Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

### JavaScript Solution

We can solve this problem using a stack to keep track of indices of the temperatures that we need to compare. This allows us to efficiently find the number of days until a warmer temperature.

Here's the implementation:

```javascript
class Solution {
    dailyTemperatures(temperatures) {
        const n = temperatures.length;
        const answer = new Array(n).fill(0);
        const stack = []; // stack to store indices of temperatures

        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
                const index = stack.pop();
                answer[index] = i - index; // Calculate the number of days until a warmer temperature
            }
            stack.push(i); // Push the current index onto the stack
        }

        return answer;
    }
}
```

### Explanation

1. **Initialization**:

   - We initialize an `answer` array with the same length as `temperatures`, filled with zeros.
   - We also initialize a stack to keep track of indices of the temperatures.
2. **Iterating through Temperatures**:

   - We iterate through each temperature using its index `i`.
   - While the stack is not empty and the current temperature is greater than the temperature at the index stored at the top of the stack, we pop the index from the stack.
3. **Calculating Days**:

   - For each index popped from the stack, we calculate the difference between the current index `i` and the popped index. This gives us the number of days until a warmer temperature.
4. **Pushing Current Index**:

   - After processing, we push the current index `i` onto the stack to potentially find a warmer temperature for it later.
5. **Returning the Result**:

   - Finally, we return the `answer` array.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(N) \) where \( N \) is the length of the `temperatures` array. Each temperature is pushed and popped from the stack at most once.
- **Space Complexity**:

  - The space complexity is \( O(N) \) for the stack and the answer array.

### Example Usage

```javascript
const solution = new Solution();
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(solution.dailyTemperatures(temperatures)); // Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

### Additional Test Cases

```plaintext
Input: temperatures = [30, 40, 50, 60]
Output: [1, 1, 1, 0]

Input: temperatures = [30, 60, 90]
Output: [1, 1, 0]

Input: temperatures = [70, 60, 50, 40]
Output: [0, 0, 0, 0]
```

## 56. Sliding Window Maximum

**=>** Here's the solution for the **Sliding Window Maximum** problem, along with a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an integer array `nums` and an integer `k`. You need to return an array that contains the maximum value in each sliding window of size `k`.

### Example

```plaintext
Input: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
Output: [3, 3, 5, 5, 6, 7]
```

### JavaScript Solution

We can solve this problem efficiently using a double-ended queue (deque) to maintain the indices of the maximum elements in the current window. This allows us to get the maximum in constant time.

Here's the implementation:

```javascript
class Solution {
    slidingWindowMaximum(nums, k) {
        const n = nums.length;
        if (n === 0 || k === 0) return [];
      
        const result = [];
        const deque = []; // To store indices of potential max elements

        for (let i = 0; i < n; i++) {
            // Remove elements not in the sliding window
            if (deque.length && deque[0] < i - k + 1) {
                deque.shift(); // Remove from front
            }

            // Remove smaller elements from the deque
            while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
                deque.pop(); // Remove from back
            }

            deque.push(i); // Add current index

            // Once we have processed the first k elements, add to results
            if (i >= k - 1) {
                result.push(nums[deque[0]]); // The front of the deque is the largest element
            }
        }

        return result;
    }
}
```

### Explanation

1. **Initialization**:

   - We first check if the input array is empty or if `k` is zero. If so, we return an empty array.
   - We initialize an empty array `result` to store the maximums and a `deque` to keep track of indices of potential maximum elements.
2. **Iterating through the Array**:

   - We iterate through each element in the `nums` array using index `i`.
3. **Maintain Window**:

   - We remove indices from the front of the deque if they are out of the current sliding window (i.e., if the index is less than `i - k + 1`).
4. **Remove Smaller Elements**:

   - We maintain the deque such that the values in `nums` corresponding to the indices in the deque are in descending order. If the current element is greater than the element at the index at the back of the deque, we remove indices from the back of the deque until this is no longer true.
5. **Add Current Index**:

   - We push the current index `i` onto the deque.
6. **Collect Maximums**:

   - Once we have processed at least `k` elements (i.e., when `i >= k - 1`), we take the value at the front of the deque (which is the maximum for the current window) and add it to `result`.
7. **Return the Result**:

   - Finally, we return the `result` array containing the maximums of each sliding window.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(N) \) where \( N \) is the length of the `nums` array. Each element is added and removed from the deque at most once.
- **Space Complexity**:

  - The space complexity is \( O(k) \) for the deque and \( O(N) \) for the result array.

### Example Usage

```javascript
const solution = new Solution();
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(solution.slidingWindowMaximum(nums, k)); // Output: [3, 3, 5, 5, 6, 7]
```

### Additional Test Cases

```plaintext
Input: nums = [1], k = 1
Output: [1]

Input: nums = [1, -1], k = 1
Output: [1, -1]

Input: nums = [9, 7, 5, 3], k = 2
Output: [9, 7, 5]
```

## 57. Course Schedule

**=>** Here’s the solution for the **Course Schedule** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given the total number of courses `numCourses` and an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` before course `a`. Return `true` if you can finish all courses. Otherwise, return `false`.

### Example

```plaintext
Input: numCourses = 2, prerequisites = [[1, 0]]
Output: true
```

```plaintext
Input: numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Output: false
```

### JavaScript Solution

We can solve this problem using **Topological Sorting**. We will use Kahn's Algorithm which is suitable for detecting cycles in a directed graph.

Here's the implementation:

```javascript
class Solution {
    canFinish(numCourses, prerequisites) {
        const indegree = new Array(numCourses).fill(0);
        const graph = Array.from({ length: numCourses }, () => []);
      
        // Build the graph and indegree array
        for (const [course, prereq] of prerequisites) {
            graph[prereq].push(course);
            indegree[course]++;
        }
      
        // Initialize the queue with courses that have no prerequisites
        const queue = [];
        for (let i = 0; i < numCourses; i++) {
            if (indegree[i] === 0) {
                queue.push(i);
            }
        }
      
        let count = 0; // To count how many courses we can take
      
        while (queue.length > 0) {
            const course = queue.shift();
            count++; // We can take this course
          
            // Reduce the indegree of neighboring courses
            for (const neighbor of graph[course]) {
                indegree[neighbor]--;
                if (indegree[neighbor] === 0) {
                    queue.push(neighbor); // Add to queue if no prerequisites remain
                }
            }
        }
      
        return count === numCourses; // Check if we can take all courses
    }
}
```

### Explanation

1. **Graph Representation**:

   - We create an adjacency list `graph` to represent the courses and their prerequisites.
   - We also maintain an `indegree` array where `indegree[i]` represents the number of prerequisites for course `i`.
2. **Building the Graph**:

   - For each prerequisite pair `[a, b]`, we add course `a` to the list of courses that depend on `b`, and increment the `indegree` of course `a`.
3. **Initializing the Queue**:

   - We initialize a queue with all courses that have no prerequisites (i.e., courses with `indegree` of `0`).
4. **Processing the Queue**:

   - We keep processing courses from the queue until it's empty.
   - For each course we process, we increment a counter (`count`) that tracks how many courses we can take.
5. **Updating Indegree**:

   - For each neighboring course (courses that depend on the current course), we decrement its `indegree`. If a neighbor's `indegree` becomes `0`, we add it to the queue.
6. **Final Check**:

   - After processing all courses, we check if the count of courses we could take is equal to `numCourses`. If it is, we can finish all courses; otherwise, we cannot.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(V + E) \) where \( V \) is the number of courses (`numCourses`) and \( E \) is the number of prerequisites.
- **Space Complexity**:

  - The space complexity is \( O(V + E) \) for the graph and the indegree array.

### Example Usage

```javascript
const solution = new Solution();
const numCourses1 = 2;
const prerequisites1 = [[1, 0];
console.log(solution.canFinish(numCourses1, prerequisites1)); // Output: true

const numCourses2 = 2;
const prerequisites2 = [[1, 0], [0, 1]];
console.log(solution.canFinish(numCourses2, prerequisites2)); // Output: false
```

### Additional Test Cases

```plaintext
Input: numCourses = 3, prerequisites = [[0, 1], [0, 2], [1, 2]]
Output: true

Input: numCourses = 4, prerequisites = [[0, 1], [1, 2], [2, 3], [3, 1]]
Output: false

Input: numCourses = 5, prerequisites = [[0, 1], [1, 2], [2, 0]]
Output: false
```

## 58. Evaluate Reverse Polish Notation

**=>** Here's the solution for the **Evaluate Reverse Polish Notation** problem, including a detailed explanation and time/space complexity analysis.

### Problem Statement

You are given an array of strings `tokens` that represents an expression in Reverse Polish Notation (RPN). Evaluate the expression and return an integer that represents the result.

### Example

```plaintext
Input: tokens = ["2", "1", "+", "3", "*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

```plaintext
Input: tokens = ["4", "13", "5", "/", "+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

### JavaScript Solution

We can solve this problem using a stack. We will iterate through the tokens, and for each token:

- If it's a number, we push it onto the stack.
- If it's an operator, we pop the necessary operands from the stack, apply the operation, and push the result back onto the stack.

Here's the implementation:

```javascript
class Solution {
    evalRPN(tokens) {
        const stack = [];
      
        for (const token of tokens) {
            if (!isNaN(token)) {
                // If the token is a number, push it onto the stack
                stack.push(Number(token));
            } else {
                // The token is an operator
                const b = stack.pop();
                const a = stack.pop();
                let result;
              
                switch (token) {
                    case '+':
                        result = a + b;
                        break;
                    case '-':
                        result = a - b;
                        break;
                    case '*':
                        result = a * b;
                        break;
                    case '/':
                        result = Math.trunc(a / b); // Use Math.trunc for correct integer division
                        break;
                }
              
                // Push the result back onto the stack
                stack.push(result);
            }
        }
      
        // The final result will be the only number remaining in the stack
        return stack.pop();
    }
}
```

### Explanation

1. **Stack Initialization**:

   - We initialize an empty stack to keep track of numbers.
2. **Iterating Through Tokens**:

   - We iterate through each token in the `tokens` array.
3. **Number Handling**:

   - If the token is a number (checked using `isNaN`), we convert it to a number and push it onto the stack.
4. **Operator Handling**:

   - If the token is an operator (`+`, `-`, `*`, `/`):
     - We pop the top two numbers from the stack (the second number popped is the first operand, and the first number popped is the second operand).
     - We perform the operation based on the operator and push the result back onto the stack.
     - For division, we use `Math.trunc` to ensure we get the integer division result (similar to truncating towards zero).
5. **Final Result**:

   - After processing all tokens, the final result will be the only number remaining in the stack, which we return.

### Time and Space Complexity

- **Time Complexity**:

  - The time complexity is \( O(n) \), where \( n \) is the number of tokens in the input array.
- **Space Complexity**:

  - The space complexity is \( O(n) \) in the worst case, where all tokens are numbers and we store them in the stack.

### Example Usage

```javascript
const solution = new Solution();
const tokens1 = ["2", "1", "+", "3", "*"];
console.log(solution.evalRPN(tokens1)); // Output: 9

const tokens2 = ["4", "13", "5", "/", "+"];
console.log(solution.evalRPN(tokens2)); // Output: 6

const tokens3 = ["10", "6", "9", "3", "/", "-", "*"];
console.log(solution.evalRPN(tokens3)); // Output: -30
```

### Additional Test Cases

```plaintext
Input: tokens = ["3", "4", "+", "2", "*", "7", "/"]
Output: 2

Input: tokens = ["2", "3", "1", "*", "+", "9", "-"]
Output: -4
```

Let me know if you want to proceed to another problem or have any questions!
