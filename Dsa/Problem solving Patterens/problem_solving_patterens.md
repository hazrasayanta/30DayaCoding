# Algorithms and Problem Solving Patterns

Here's a comprehensive list of problem-solving patterns you should learn for data structures and algorithms (DSA) in JavaScript. Mastering these patterns will help you approach a wide range of problems efficiently.

### 1. **Frequency Counter**

- Uses objects or hash maps to count the frequency of elements.
- Efficient for avoiding nested loops (O(n) instead of O(n²)).
- **Example problems**: Anagrams, frequency matching.

### 2. **Two Pointers**

- Uses two pointers to iterate through a data structure from opposite ends or at different speeds.
- Often used in problems involving sorted arrays or strings.
- **Example problems**: Sum pairs, palindrome check, container with most water.

### 3. **Sliding Window**

- Involves creating a "window" that slides across the data to keep track of a subset (e.g., subarrays).
- Efficient for problems where you need to find the maximum or minimum in a range.
- **Example problems**: Maximum subarray sum, longest substring without repeating characters.

### 4. **Divide and Conquer**

- Breaks a problem into smaller subproblems, solves each recursively, and combines the results.
- Commonly used in sorting and searching algorithms.
- **Example problems**: Merge sort, quicksort, binary search.

### 5. **Dynamic Programming**

- Breaks problems down into overlapping subproblems and uses memoization or tabulation to store results.
- Efficient for optimization problems.
- **Example problems**: Fibonacci sequence, coin change problem, knapsack problem.

### 6. **Greedy Algorithm**

- Makes the locally optimal choice at each step with the hope of finding a global optimum.
- Typically used in optimization problems.
- **Example problems**: Activity selection, minimum spanning tree, coin change.

### 7. **Backtracking**

- Involves trying out different possibilities and undoing ("backtracking") decisions that lead to invalid states.
- Useful in constraint satisfaction problems.
- **Example problems**: N-Queens problem, Sudoku solver, maze problems.

### 8. **Recursion**

- Solves a problem by having a function call itself with a simpler input, until a base case is reached.
- Useful for problems that can be broken down into similar subproblems.
- **Example problems**: Factorial, binary tree traversals, permutations.

### 9. **Binary Search**

- Efficient searching algorithm for sorted data structures.
- Reduces the search space by half in each iteration.
- **Example problems**: Searching in a sorted array, finding the peak element.

### 10. **Kadane’s Algorithm**

- Used to find the maximum sum of a contiguous subarray.
- Efficient for solving subarray problems.
- **Example problems**: Maximum subarray sum.

### 11. **Bit Manipulation**

- Involves using bitwise operators for optimization and solving certain types of problems.
- **Example problems**: Counting set bits, finding missing numbers.

### 12. **Breadth-First Search (BFS)**

- Used to explore all nodes at the present depth level before moving on to nodes at the next depth level.
- Commonly used in tree and graph traversal.
- **Example problems**: Shortest path in an unweighted graph, level order traversal of a tree.

### 13. **Depth-First Search (DFS)**

- Explores as far as possible along each branch before backtracking.
- Used in tree/graph traversal and finding connected components.
- **Example problems**: Maze traversal, connected components, detecting cycles in a graph.

### 14. **Merge Intervals**

- Involves merging overlapping intervals in a given set of intervals.
- **Example problems**: Merging overlapping intervals, inserting intervals.

### 15. **Topological Sort**

- Linear ordering of vertices such that for every directed edge `uv`, vertex `u` comes before `v`.
- Used in scheduling problems with dependencies.
- **Example problems**: Task scheduling, course prerequisites.

### 16. **Fast and Slow Pointers (Tortoise and Hare)**

- Uses two pointers that move at different speeds to detect cycles or intersections in linked lists or arrays.
- **Example problems**: Detecting cycles in a linked list, finding the middle of a linked list.

### 17. **Union-Find (Disjoint Set)**

- Helps keep track of disjoint sets and efficiently merges them.
- Used in problems involving dynamic connectivity.
- **Example problems**: Connected components, Kruskal’s algorithm.

### 18. **Matrix Traversal**

- Techniques for traversing and solving problems in 2D grids (e.g., matrix or maze problems).
- **Example problems**: Island counting, pathfinding in a maze.

### 19. **Prefix Sum**

- Precomputes cumulative sums for efficient range queries.
- **Example problems**: Range sum queries, subarray sum problems.

### 20. **Heap Pattern**

- Uses a priority queue or heap to keep track of the minimum or maximum elements efficiently.
- **Example problems**: Finding the Kth largest element, merging K sorted lists.

### 21. **Monotonic Stack**

- A stack that maintains a specific order (either increasing or decreasing) as elements are pushed and popped.
- **Example problems**: Next greater element, largest rectangle in histogram.

### 22. **Flood Fill Algorithm**

- Similar to DFS/BFS, it fills a region based on a certain condition.
- **Example problems**: Coloring a region in a 2D grid, connected component labeling.

---

### Key Focus Areas for Beginners:

- **Two Pointers**
- **Sliding Window**
- **Recursion**
- **Divide and Conquer**
- **Binary Search**

As you advance, move into:

- **Dynamic Programming**
- **Greedy Algorithm**
- **Backtracking**

Mastering these patterns will help you solve most common algorithmic challenges effectively!

Great! Let's go in-depth on each of these problem-solving patterns. We’ll start with the first pattern, **Frequency Counter**, and work our way through each one step by step.

---

### 1. **Frequency Counter**

**Concept**:
The frequency counter pattern involves using a data structure, typically an object or hash map, to keep track of how many times values (or groups of values) appear in a collection. By storing these counts, you can often eliminate the need for nested loops, thus reducing the time complexity of problems from O(n²) to O(n).

**Why it’s useful**:

- Instead of comparing multiple elements against each other using nested loops (which takes O(n²) time), you create a frequency object that allows you to perform comparisons in O(n) time.
- Particularly useful in problems involving comparison of arrays, strings, or lists to check for matching elements or patterns.

**Common Use Cases**:

- Checking if two strings are anagrams.
- Finding duplicate elements in an array.
- Counting the frequency of elements to compare different datasets.

**How it works**:
You create a map (using an object or hash map) where the keys are the items and the values are the frequencies. Then, you can loop through the map and check frequencies or use it for comparisons.

**Example problem**: **Anagram Check**

*Problem*: Write a function that accepts two strings and checks whether they are anagrams (i.e., if both strings have the same characters in the same frequency).

#### JavaScript Solution:

```javascript
function isAnagram(str1, str2) {
  // If lengths don't match, they can't be anagrams
  if (str1.length !== str2.length) return false;

  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  // Count frequencies of each character in both strings
  for (let char of str1) {
    frequencyCounter1[char] = (frequencyCounter1[char] || 0) + 1;
  }
  for (let char of str2) {
    frequencyCounter2[char] = (frequencyCounter2[char] || 0) + 1;
  }

  // Compare frequency counters
  for (let key in frequencyCounter1) {
    if (frequencyCounter1[key] !== frequencyCounter2[key]) {
      return false;
    }
  }

  return true;
}

// Test
console.log(isAnagram("listen", "silent"));  // true
console.log(isAnagram("hello", "ollhe"));    // true
console.log(isAnagram("rat", "car"));        // false
```

**Optimized Version**:

We can reduce the space used by only maintaining one frequency counter instead of two:

```javascript
function isAnagramOptimized(str1, str2) {
  if (str1.length !== str2.length) return false;

  let frequencyCounter = {};

  // Count frequencies of each character in str1
  for (let char of str1) {
    frequencyCounter[char] = (frequencyCounter[char] || 0) + 1;
  }

  // Reduce the frequencies based on str2
  for (let char of str2) {
    if (!frequencyCounter[char]) return false;
    frequencyCounter[char]--;
  }

  return true;
}

// Test
console.log(isAnagramOptimized("listen", "silent"));  // true
console.log(isAnagramOptimized("hello", "ollhe"));    // true
console.log(isAnagramOptimized("rat", "car"));        // false
```

### Complexity Analysis:

- **Time complexity**: O(n), where `n` is the length of the string. We loop through the strings to create frequency counters and compare them.
- **Space complexity**: O(n), where `n` is the number of unique characters in the string (since we’re storing counts in a frequency counter).

---

### 2. **Two Pointers**

**Concept**:
The two-pointer pattern is used when dealing with arrays or strings. The idea is to iterate over the data structure using two pointers (indexes). The pointers can either start from:

- Opposite ends of the array, moving towards the middle.
- The beginning of the array, with one pointer moving faster than the other.

**Why it’s useful**:

- Reduces the need for nested loops.
- Often used when you need to find pairs or triplets of elements that meet certain conditions.
- Works efficiently with sorted arrays or strings.

**Common Use Cases**:

- Finding pairs in an array that sum to a specific value.
- Checking if a string is a palindrome.
- Merging sorted arrays.

**Example problem**: **Two Sum (Sorted Array)**

*Problem*: Given a sorted array of integers, find two numbers that sum up to a specific target.

#### JavaScript Solution:

```javascript
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];  // No pair found
}

// Test
console.log(twoSum([1, 2, 3, 4, 6], 6));  // [0, 3] => arr[0] + arr[3] == 6
console.log(twoSum([2, 3, 4, 5, 9], 8));  // [1, 2] => arr[1] + arr[2] == 8
```

**Optimized Explanation**:

- **Time complexity**: O(n), where `n` is the length of the array. We make a single pass through the array with the two pointers.
- **Space complexity**: O(1), since we’re only using a few variables to keep track of pointers.

---

Let me know if you'd like to dive deeper into more patterns, or continue with the next one!

### 3. **Sliding Window**

**Concept**:
The sliding window pattern is used to optimize the performance of problems that involve arrays or lists, especially when you need to calculate something over a contiguous subset of the data. Instead of recalculating from scratch each time you move the subset, you "slide" the window across the data, adjusting the result incrementally.

**Why it’s useful**:

- It helps in optimizing brute-force solutions, especially those requiring repetitive calculations over overlapping subsets.
- Reduces time complexity by avoiding recalculating for the same parts of the input multiple times.

**Common Use Cases**:

- Finding the maximum or minimum sum of a subarray.
- Finding the longest substring with certain properties (e.g., without repeating characters).
- Finding subarrays that satisfy certain conditions (e.g., sum up to a target).

**How it works**:
You define a window (typically a subarray) that slides across the array, expanding or shrinking dynamically as you iterate. You keep track of a result (e.g., sum, max length) and update it as you move the window.

---

**Example problem**: **Maximum Sum Subarray of Size K**

*Problem*: Given an array of integers and a number `k`, find the maximum sum of a subarray of size `k`.

#### JavaScript Solution:

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0;
  let currentSum = 0;

  // Calculate the sum of the first window
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }

  maxSum = currentSum;

  // Slide the window, subtracting the element that is going out of the window
  // and adding the new element coming into the window
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// Test
console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3));  // Output: 9 ([5, 1, 3])
console.log(maxSubarraySum([2, 3, 4, 1, 5], 2));    // Output: 7 ([3, 4])
```

**Explanation**:

1. First, you calculate the sum of the first `k` elements (the first window).
2. Then, for each subsequent element, you "slide" the window one element to the right by subtracting the element going out of the window and adding the new one coming in.
3. This allows you to avoid recalculating the sum from scratch for each window.

**Optimized Solution**:
This sliding window solution achieves a time complexity of O(n), as it only requires one pass through the array. The space complexity is O(1), since we're only storing a few variables.

---

**Example problem**: **Longest Substring Without Repeating Characters**

*Problem*: Given a string, find the length of the longest substring without repeating characters.

#### JavaScript Solution:

```javascript
function longestSubstring(s) {
  let start = 0;
  let maxLength = 0;
  let seenChars = {};

  for (let end = 0; end < s.length; end++) {
    let char = s[end];

    // If we see a repeating character, move the start pointer
    if (seenChars[char] !== undefined && seenChars[char] >= start) {
      start = seenChars[char] + 1;
    }

    // Update the last seen position of the character
    seenChars[char] = end;

    // Calculate the max length of the substring
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Test
console.log(longestSubstring("abcabcbb"));   // Output: 3 ("abc")
console.log(longestSubstring("bbbbb"));      // Output: 1 ("b")
console.log(longestSubstring("pwwkew"));     // Output: 3 ("wke")
```

**Explanation**:

1. We maintain a sliding window between `start` and `end`. `start` marks the start of the current substring, and `end` moves through the string.
2. If a repeating character is found, we move `start` to the position after the last occurrence of that character.
3. We keep track of the maximum length of substrings as we slide the window.

**Optimized Solution**:

- **Time complexity**: O(n), because each character is processed only once.
- **Space complexity**: O(min(n, m)), where `n` is the length of the string and `m` is the size of the character set.

---

**General Sliding Window Template**:

For many problems using the sliding window technique, you can use this general approach:

1. Initialize your window (often with two pointers).
2. Expand the window by moving the end pointer.
3. Update your result as needed (e.g., by adding the new element to a sum, calculating the max length, etc.).
4. If the window size exceeds the desired size or a condition is violated, shrink the window by moving the start pointer.
5. Repeat steps 2–4 until the entire data structure is traversed.

---

**Key Problems to Practice**:

- **Minimum Size Subarray Sum**: Find the smallest subarray whose sum is greater than or equal to a target value.
- **Find All Anagrams in a String**: Return all the start indices of anagrams of a given string in a longer string.
- **Maximum Sum of K Consecutive Elements**: Similar to the example above but applied to various scenarios.

---

Let me know if you want further clarification on the sliding window pattern or if you’re ready to move on to the next pattern, **Divide and Conquer**!

### 4. **Divide and Conquer**

**Concept**:
The divide and conquer pattern involves breaking down a problem into smaller subproblems, solving each of those subproblems, and then combining the results to form the final solution. It is a recursive approach and is especially useful for reducing the time complexity of problems that can be divided into independent subproblems.

**Why it’s useful**:

- It significantly reduces the complexity of problems where you can split the input into smaller parts, solve them independently, and merge the results.
- It is used in many algorithmic strategies like sorting, searching, and solving mathematical problems.

**Common Use Cases**:

- Sorting algorithms (e.g., Merge Sort, Quick Sort).
- Searching algorithms (e.g., Binary Search).
- Computational geometry (e.g., closest pair of points).
- Tree-based problems (e.g., divide the tree into smaller subtrees).

**How it works**:

1. **Divide** the problem into smaller subproblems of the same type.
2. **Conquer** each subproblem by solving it recursively.
3. **Combine** the solutions to the subproblems to get the solution to the original problem.

---

### Example problem: **Binary Search**

*Problem*: Given a sorted array and a target value, write a function to search for the target in the array using the binary search algorithm. Return the index of the target if found, otherwise return -1.

**Binary search** is a classic divide-and-conquer algorithm. It works by repeatedly dividing the search interval in half. If the target value is less than the middle element, the search continues in the left half; if it’s greater, it continues in the right half.

#### JavaScript Solution:

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Target not found
}

// Test
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 4));  // Output: 3
console.log(binarySearch([10, 20, 30, 40, 50], 35));  // Output: -1
```

**Explanation**:

1. **Divide**: The array is split into two halves by calculating the middle element.
2. **Conquer**: Depending on whether the target is smaller or larger than the middle element, the algorithm decides which half of the array to search next.
3. **Combine**: The result is found once the target is located, or the entire array is searched and the target is not found.

---

### Example problem: **Merge Sort**

Merge sort is a classic divide-and-conquer sorting algorithm. It divides the array into smaller subarrays until each subarray contains only one element, then it merges those subarrays back together in sorted order.

#### JavaScript Solution:

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  // Divide the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Merge the two sorted halves
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  // Merge the two arrays in sorted order
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Test
console.log(mergeSort([5, 2, 9, 1, 5, 6]));  // Output: [1, 2, 5, 5, 6, 9]
console.log(mergeSort([3, 0, -1, 8, 7, 2])); // Output: [-1, 0, 2, 3, 7, 8]
```

**Explanation**:

1. **Divide**: The array is recursively split into two halves until each subarray contains one element.
2. **Conquer**: The base case is reached when the array has only one element. This means it’s already sorted.
3. **Combine**: The two sorted subarrays are merged back together into one sorted array using the `merge` function.

**Complexity**:

- **Time complexity**: O(n log n), where `n` is the number of elements in the array. The array is split into halves (log n divisions) and merged back together (n comparisons at each level).
- **Space complexity**: O(n), because we need extra space to store the merged result.

---

### Divide and Conquer Pattern Summary:

- **Binary Search** divides the array in half and eliminates one half in each step, which reduces the search space exponentially.
- **Merge Sort** splits the array into individual elements, sorts them, and then combines the sorted elements back together, yielding an efficient sorting algorithm.

---

### Key Problems to Practice:

1. **Quick Sort**: Another divide-and-conquer algorithm that selects a "pivot" element, partitions the array into two halves, and recursively sorts each half.
2. **Closest Pair of Points**: In computational geometry, divide the set of points into two halves, recursively solve for each half, and combine the results.
3. **Counting Inversions**: Count how many inversions (pairs of elements that are out of order) exist in an array, using a modified merge sort algorithm.

---

Let me know if you'd like to dive deeper into more examples of divide and conquer, or if you’re ready to move on to the next pattern, **Dynamic Programming**!

### 5. **Dynamic Programming**

**Concept**:
Dynamic programming (DP) is an optimization technique used to solve problems by breaking them down into overlapping subproblems, solving each subproblem only once, and storing its solution (usually in a table or array) to avoid redundant work. DP is particularly useful for problems that exhibit **optimal substructure** and **overlapping subproblems**.

- **Optimal substructure**: The optimal solution to a problem can be constructed from optimal solutions to its subproblems.
- **Overlapping subproblems**: The problem can be broken down into subproblems, which are reused multiple times in the recursive process.

**Why it’s useful**:

- DP reduces the time complexity of algorithms that have repeated calculations (e.g., recursive algorithms with exponential complexity) by storing the results of subproblems in a table (memoization or tabulation).
- It turns inefficient recursive algorithms (e.g., the naive Fibonacci sequence) into efficient ones.

**Common Use Cases**:

- Problems involving decisions (e.g., choosing items for a knapsack).
- Optimization problems (e.g., finding the shortest path, maximizing profit).
- Counting problems (e.g., counting ways to do something).

**How it works**:

1. **Define the state**: Decide on a way to represent subproblems (e.g., using an array where `dp[i]` stores the solution to subproblem `i`).
2. **Formulate the recurrence relation**: Figure out how to express the solution to a problem in terms of its subproblems.
3. **Base case**: Determine the solution for the simplest subproblem (the base case).
4. **Solve iteratively (bottom-up) or recursively (top-down)**: Either use memoization (top-down) or tabulation (bottom-up) to solve the problem efficiently.

---

### Example problem: **Fibonacci Sequence**

*Problem*: Calculate the nth Fibonacci number using dynamic programming.

#### Naive Recursive Approach:

The naive approach to calculating Fibonacci numbers uses a recursive function that recalculates subproblems repeatedly, leading to an exponential time complexity.

#### JavaScript Solution (Naive):

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// Test
console.log(fib(10));  // Output: 55
```

**Time complexity**: O(2^n) — exponential, because each Fibonacci number is recalculated multiple times.

---

#### Dynamic Programming Solution (Top-Down with Memoization):

In this approach, we store the results of previously solved subproblems in an array (memo), so we don’t have to recalculate them.

#### JavaScript Solution:

```javascript
function fib(n, memo = {}) {
  if (n <= 1) return n;

  if (memo[n]) return memo[n];

  // Store the result of the subproblem in the memo table
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

// Test
console.log(fib(10));  // Output: 55
```

**Explanation**:

- **State**: `memo[n]` stores the nth Fibonacci number.
- **Recurrence relation**: `fib(n) = fib(n - 1) + fib(n - 2)`.
- **Base case**: `fib(0) = 0` and `fib(1) = 1`.

**Time complexity**: O(n), because each Fibonacci number is calculated only once.

---

#### Dynamic Programming Solution (Bottom-Up with Tabulation):

This approach uses an iterative process and stores the Fibonacci numbers in an array as we build up the solution from smaller subproblems.

#### JavaScript Solution:

```javascript
function fib(n) {
  if (n <= 1) return n;

  let dp = [0, 1];  // Base cases

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Test
console.log(fib(10));  // Output: 55
```

**Explanation**:

- **State**: `dp[i]` stores the ith Fibonacci number.
- **Recurrence relation**: `dp[i] = dp[i - 1] + dp[i - 2]`.
- **Base case**: `dp[0] = 0` and `dp[1] = 1`.

**Time complexity**: O(n).
**Space complexity**: O(n) due to the use of the `dp` array.

You can reduce the space complexity to O(1) by only keeping track of the last two Fibonacci numbers instead of storing all of them:

```javascript
function fib(n) {
  if (n <= 1) return n;

  let a = 0, b = 1;

  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }

  return b;
}

// Test
console.log(fib(10));  // Output: 55
```

---

### Example problem: **0/1 Knapsack Problem**

*Problem*: Given `n` items, each with a weight and a value, determine the maximum value you can obtain by selecting items such that their total weight does not exceed a given capacity `W`. You cannot break items (each item is either taken or not).

#### JavaScript Solution:

```javascript
function knapsack(weights, values, W) {
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));

  // Build up the dp table
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][W];
}

// Test
const weights = [1, 2, 3];
const values = [60, 100, 120];
const W = 5;
console.log(knapsack(weights, values, W));  // Output: 220
```

**Explanation**:

1. **State**: `dp[i][w]` represents the maximum value obtainable using the first `i` items and a total weight of `w`.
2. **Recurrence relation**: If the weight of the ith item is less than or equal to `w`, you can choose to either include it or exclude it. If you include it, the new value is the value of the item plus the maximum value you can get from the remaining weight (`w - weight[i]`). If you exclude it, you keep the previous maximum value.
3. **Base case**: If there are no items or the weight is 0, the value is 0 (`dp[0][w] = 0` and `dp[i][0] = 0`).

**Time complexity**: O(nW), where `n` is the number of items and `W` is the knapsack capacity.
**Space complexity**: O(nW) due to the `dp` table.

---

### Dynamic Programming Pattern Summary:

- **Memoization (Top-Down)**: Recursively solve the problem while caching results for reuse.
- **Tabulation (Bottom-Up)**: Iteratively build up solutions from the base cases.
- DP is used to optimize recursive problems that have overlapping subproblems and optimal substructure, turning exponential-time problems into polynomial-time ones.

---

### Key Problems to Practice:

1. **Longest Common Subsequence**: Find the length of the longest subsequence common to two sequences.
2. **Edit Distance**: Find the minimum number of edits (insertions, deletions, replacements) required to convert one string into another.
3. **House Robber**: Maximize the amount of money you can rob from houses arranged in a line, without robbing two adjacent houses.
4. **Coin Change**: Find the fewest number of coins that you need to make a certain amount.
5. **Palindromic Substrings**: Count how many substrings in a given string are palindromes.

---

Let me know if you'd like to explore any of the dynamic programming problems further, or if you're ready to move on to the next pattern, **Greedy Algorithms**!

### 6. **Greedy Algorithms**

**Concept**:
Greedy algorithms make a series of choices, selecting the option that seems best at the current step, with the hope that these local choices will lead to a globally optimal solution. Unlike dynamic programming, which solves overlapping subproblems and explores multiple possibilities, a greedy algorithm doesn't revisit past decisions—it commits to the best available option and moves forward.

**Why it’s useful**:

- Greedy algorithms are often much faster than dynamic programming since they reduce the need to store and revisit subproblems.
- They work well for problems where local optimization leads to a global solution, though they do not always guarantee optimal solutions for all problem types.

**How it works**:

1. **Greedy choice property**: Make a locally optimal choice at each step with the hope of finding a globally optimal solution.
2. **Optimal substructure**: A problem has optimal substructure if an optimal solution to the entire problem can be composed of optimal solutions to its subproblems.

Greedy algorithms are generally easier to design and understand but only work when the problem exhibits the **greedy choice property**. They may not always produce the best solution in problems where this property doesn't hold, so their application needs careful analysis.

---

### Example problem: **Activity Selection Problem**

*Problem*: Given a set of activities with start and end times, choose the maximum number of activities that don’t overlap.

#### Greedy Approach:

- Sort activities by their end times.
- Select the first activity that finishes the earliest.
- Then select the next activity that starts after the previous one finishes.
- Continue until no more activities can be selected.

#### JavaScript Solution:

```javascript
function activitySelection(activities) {
  // Sort activities by end time
  activities.sort((a, b) => a.end - b.end);

  let count = 1;  // Select the first activity
  let lastEndTime = activities[0].end;

  for (let i = 1; i < activities.length; i++) {
    // If this activity starts after the last selected one ends
    if (activities[i].start >= lastEndTime) {
      count++;
      lastEndTime = activities[i].end;  // Update lastEndTime
    }
  }

  return count;
}

// Test
const activities = [
  { start: 1, end: 3 },
  { start: 2, end: 4 },
  { start: 3, end: 5 },
  { start: 0, end: 6 },
  { start: 5, end: 7 },
  { start: 8, end: 9 },
  { start: 5, end: 9 }
];

console.log(activitySelection(activities));  // Output: 4
```

**Explanation**:

- **Greedy choice**: Pick the activity that finishes the earliest, allowing for more future activities to fit into the schedule.
- **State**: Track the last activity's end time and select subsequent activities based on that.
- **Optimal substructure**: Selecting the activity that ends the earliest allows for the most future activity selections, ensuring an optimal solution.

**Time complexity**: O(n log n) due to sorting the activities.
**Space complexity**: O(1), assuming sorting in place.

---

### Example problem: **Fractional Knapsack Problem**

*Problem*: Given a set of items, each with a weight and a value, find the maximum value that can be obtained by selecting items to fit within a given capacity `W`. Unlike the 0/1 Knapsack problem, here you can take fractional amounts of an item.

#### Greedy Approach:

- Calculate the value per unit weight for each item.
- Sort the items by their value-to-weight ratio.
- Start picking items with the highest ratio, and if an item fits fully in the knapsack, take it. If it doesn’t, take a fraction of it until the knapsack is full.

#### JavaScript Solution:

```javascript
function fractionalKnapsack(items, W) {
  // Sort items by value-to-weight ratio
  items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

  let maxValue = 0;

  for (let i = 0; i < items.length; i++) {
    if (W >= items[i].weight) {
      // If the whole item fits, take it
      maxValue += items[i].value;
      W -= items[i].weight;
    } else {
      // Take the fractional part of the item
      maxValue += (items[i].value / items[i].weight) * W;
      break;  // The knapsack is full
    }
  }

  return maxValue;
}

// Test
const items = [
  { weight: 10, value: 60 },
  { weight: 20, value: 100 },
  { weight: 30, value: 120 }
];

const W = 50;
console.log(fractionalKnapsack(items, W));  // Output: 240
```

**Explanation**:

- **Greedy choice**: Always pick the item with the highest value-to-weight ratio to maximize the total value.
- **State**: Track how much capacity remains in the knapsack and the value accumulated so far.
- **Optimal substructure**: Once you pick an item (or a fraction of it), the problem reduces to the same knapsack problem with a reduced capacity.

**Time complexity**: O(n log n) due to sorting the items by value-to-weight ratio.
**Space complexity**: O(1), assuming sorting in place.

---

### Example problem: **Huffman Coding (Data Compression)**

*Problem*: Given a set of characters and their frequencies, create an optimal prefix-free binary code (Huffman code) to minimize the total length of the encoded message.

#### Greedy Approach:

- Create a priority queue (min-heap) of characters based on their frequency.
- Extract two characters with the lowest frequency, merge them, and insert the combined node back into the heap.
- Repeat this process until only one node remains. This node will be the root of the Huffman tree.
- Traverse the tree to assign binary codes to the characters.

#### JavaScript Solution:

```javascript
class Node {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

function huffmanCoding(frequencies) {
  // Create a priority queue (min-heap) based on frequency
  let heap = Object.entries(frequencies).map(([char, freq]) => new Node(char, freq));
  heap.sort((a, b) => a.freq - b.freq);

  while (heap.length > 1) {
    // Extract two nodes with the lowest frequency
    let left = heap.shift();
    let right = heap.shift();

    // Create a new internal node with these two as children
    let newNode = new Node(null, left.freq + right.freq, left, right);
    heap.push(newNode);

    // Re-sort the heap
    heap.sort((a, b) => a.freq - b.freq);
  }

  // The final node is the root of the Huffman tree
  const root = heap[0];
  const codes = {};

  // Generate the Huffman codes by traversing the tree
  function generateCodes(node, code) {
    if (node.char !== null) {
      codes[node.char] = code;
    } else {
      if (node.left) generateCodes(node.left, code + '0');
      if (node.right) generateCodes(node.right, code + '1');
    }
  }

  generateCodes(root, '');
  return codes;
}

// Test
const frequencies = { 'a': 5, 'b': 9, 'c': 12, 'd': 13, 'e': 16, 'f': 45 };
console.log(huffmanCoding(frequencies)); 
// Output: Huffman codes for each character
```

**Explanation**:

- **Greedy choice**: Merge the two least frequent characters to minimize the total encoding length.
- **State**: Track the Huffman tree as it’s built and use it to generate the prefix-free binary codes.
- **Optimal substructure**: Merging the two smallest frequencies guarantees that the overall encoding length is minimized.

**Time complexity**: O(n log n) due to heap operations.
**Space complexity**: O(n) to store the Huffman tree and codes.

---

### Greedy Algorithm Pattern Summary:

- **Greedy choice property**: Make the locally optimal choice at each step.
- **Optimal substructure**: Solving subproblems optimally leads to a globally optimal solution.
- Greedy algorithms are faster and more straightforward than dynamic programming but don’t always guarantee optimality, especially when the greedy choice property isn’t present.

---

### Key Problems to Practice:

1. **Coin Change (Greedy)**: Minimize the number of coins needed to make a certain amount.
2. **Job Sequencing Problem**: Maximize profit by scheduling jobs with deadlines and profits.
3. **Prim's Algorithm**: Find the minimum spanning tree in a graph.
4. **Kruskal's Algorithm**: Another algorithm for finding the minimum spanning tree.
5. **Dijkstra’s Shortest Path**: Find the shortest path from a source node to all other nodes in a weighted graph.

Let me know if you'd like to dive deeper into one of these problems or explore the next pattern, **Backtracking**!

### 7. **Backtracking**

**Concept**:
Backtracking is an algorithmic technique used to solve problems by exploring all possible solutions. It incrementally builds a solution by making choices, and if a choice leads to a solution that violates the problem constraints, it "backtracks" by undoing the last choice and tries a different path. This method is particularly useful for problems where you need to explore all configurations or permutations.

**Why it’s useful**:

- **Efficient exploration**: Backtracking allows you to explore all potential solutions but can prune large portions of the search space by abandoning invalid or unnecessary paths early.
- **General-purpose**: It works well for problems involving permutations, combinations, and constraint satisfaction problems (e.g., Sudoku, N-Queens, etc.).

**How it works**:

1. **Choose**: Make a choice.
2. **Explore**: Recursively explore possible solutions based on that choice.
3. **Un-choose**: If the choice leads to an invalid solution or a dead-end, backtrack by undoing the last choice and explore other options.

---

### Example problem: **N-Queens Problem**

*Problem*: Place N queens on an N×N chessboard so that no two queens threaten each other. A queen can attack horizontally, vertically, or diagonally.

#### Backtracking Approach:

- Place queens one by one in different rows.
- Before placing a queen, check if placing it in the current position is safe (i.e., it doesn't share the same row, column, or diagonal with any already placed queen).
- If placing a queen violates the constraints, backtrack and try the next position.

#### JavaScript Solution:

```javascript
function solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const result = [];

  // Helper function to check if the current position is safe for the queen
  function isSafe(board, row, col, n) {
    // Check the column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
  
    // Check the upper left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
  
    // Check the upper right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
  
    return true;
  }

  // Backtracking function to place queens
  function backtrack(board, row, n) {
    if (row === n) {
      // If all queens are placed, store the solution
      result.push(board.map(r => r.join('')));
      return;
    }
  
    for (let col = 0; col < n; col++) {
      if (isSafe(board, row, col, n)) {
        // Place the queen
        board[row][col] = 'Q';
  
        // Recurse to place the next queen
        backtrack(board, row + 1, n);
  
        // Backtrack: remove the queen
        board[row][col] = '.';
      }
    }
  }

  backtrack(board, 0, n);
  return result;
}

// Test
const solutions = solveNQueens(4);
console.log(solutions);
// Output: 2 solutions, each showing a board layout
```

**Explanation**:

- **Choose**: Place a queen on the board at a specific row and column.
- **Explore**: Recursively attempt to place queens in subsequent rows.
- **Un-choose**: If placing a queen leads to an invalid state, remove it and try the next column.

**Time complexity**: O(n!), where n is the number of queens.
**Space complexity**: O(n^2) for the board and recursion stack.

---

### Example problem: **Sudoku Solver**

*Problem*: Given a 9×9 Sudoku board, fill the empty cells such that each row, column, and 3×3 subgrid contains the numbers 1 to 9 exactly once.

#### Backtracking Approach:

- Try placing numbers 1 to 9 in each empty cell.
- For each placement, check if it’s valid (i.e., the number doesn’t already exist in the current row, column, or 3×3 subgrid).
- If a placement is valid, proceed to the next empty cell.
- If placing a number leads to a conflict, backtrack and try the next number.

#### JavaScript Solution:

```javascript
function solveSudoku(board) {
  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num || 
         board[Math.floor(row / 3) * 3 + Math.floor(i / 3)]
         [Math.floor(col / 3) * 3 + i % 3] === num) {
        return false;
      }
    }
    return true;
  };

  const solve = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '.') {
          for (let num = '1'; num <= '9'; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
        
              if (solve(board)) return true;  // Recur to solve the rest
        
              board[row][col] = '.';  // Backtrack
            }
          }
          return false;  // No valid number found
        }
      }
    }
    return true;  // All cells filled
  };

  solve(board);
}

// Test
let board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];

solveSudoku(board);
console.log(board);
```

**Explanation**:

- **Choose**: Try placing numbers 1 to 9 in each empty cell.
- **Explore**: Recursively move to the next empty cell once a valid number is placed.
- **Un-choose**: If a number leads to an invalid Sudoku state, backtrack and try the next number.

**Time complexity**: Exponential in the worst case.
**Space complexity**: O(1) extra space apart from the input board.

---

### Example problem: **Permutations**

*Problem*: Given a collection of distinct integers, return all possible permutations.

#### Backtracking Approach:

- Fix each element at the start and recursively permute the remaining elements.
- After generating all permutations starting with a particular element, backtrack by swapping it back and try the next element.

#### JavaScript Solution:

```javascript
function permute(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);  // Push a copy of nums
      return;
    }

    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];  // Swap
      backtrack(start + 1);  // Recurse
      [nums[start], nums[i]] = [nums[i], nums[start]];  // Backtrack (swap back)
    }
  }

  backtrack(0);
  return result;
}

// Test
const nums = [1, 2, 3];
console.log(permute(nums)); 
// Output: All permutations of [1, 2, 3]
```

**Explanation**:

- **Choose**: Swap the current element with each of the remaining elements.
- **Explore**: Recursively permute the rest of the elements.
- **Un-choose**: Swap the elements back to restore the original order.

**Time complexity**: O(n!), where n is the number of elements.
**Space complexity**: O(n!) to store the permutations.

---

### Backtracking Pattern Summary:

- **Choices**: Make a decision, explore the results, and backtrack if necessary.
- **Recursive exploration**: Solutions are explored in a depth-first manner.
- **Pruning**: Backtracking can eliminate large portions of the search space by abandoning choices that don’t lead to valid solutions.
- Backtracking can be less efficient than greedy or dynamic programming for some problems, but it’s powerful for exploring all possible configurations.

---

### Key Problems to Practice:

1. **Combination Sum**: Find all unique combinations of numbers that sum to a target.
2. **Word Search**: Given a 2D board and a word, find if the word exists in the board.
3. **Letter Case Permutation**: Generate all possible letter case permutations of a given string.
4. **Subsets**: Generate all

 possible subsets of a set.


### 19. **Recursion**

**Concept**:
Recursion is a method of solving problems where a function calls itself, directly or indirectly. It involves breaking down a problem into smaller, more manageable subproblems that have the same structure as the original. The recursion terminates when a base case is reached, where the problem becomes simple enough to solve directly.

**Why it’s useful**:

- **Simplifies Complex Problems**: Some problems, especially those involving repeated substructures (e.g., trees, fractals), are naturally recursive and can be simplified by breaking them down.
- **Clean and Elegant Code**: Recursive solutions are often more intuitive and compact than iterative ones for problems that naturally involve repetition or self-similarity.

---

### Example problem: **Factorial of a Number**

*Problem*: Find the factorial of a number `n` (i.e., `n! = n * (n - 1) * ... * 1`).

#### Recursive Approach:

1. The base case is when `n = 1` or `n = 0`, return `1`.
2. For any other `n`, recursively compute `n!` by multiplying `n` with the factorial of `n - 1`.

#### JavaScript Solution:

```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive case
}

// Test
console.log(factorial(5)); // Output: 120
```

**Time complexity**: O(N), since we make `N` recursive calls.
**Space complexity**: O(N) for the recursive call stack.

---

### Example problem: **Fibonacci Sequence**

*Problem*: Compute the `n`th Fibonacci number, where the sequence is defined as:

- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n ≥ 2.

#### Recursive Approach:

1. Base cases are F(0) = 0 and F(1) = 1.
2. For `n ≥ 2`, the function recursively computes the sum of F(n-1) and F(n-2).

#### JavaScript Solution:

```javascript
function fibonacci(n) {
  if (n === 0) return 0; // Base case
  if (n === 1) return 1; // Base case
  return fibonacci(n - 1) + fibonacci(n - 2); // Recursive case
}

// Test
console.log(fibonacci(6)); // Output: 8 (Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8)
```

**Time complexity**: O(2^N), as each call spawns two more calls.
**Space complexity**: O(N) for the call stack.

#### Optimized with **Memoization**:

You can improve performance by storing already computed values to avoid redundant calculations (dynamic programming).

```javascript
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n]; // Check memo
  if (n === 0) return 0;
  if (n === 1) return 1;
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo); // Store in memo
  return memo[n];
}

// Test
console.log(fibonacciMemo(6)); // Output: 8
```

**Time complexity (with memoization)**: O(N), as each value is computed once.
**Space complexity**: O(N), due to memoization and call stack.

---

### Example problem: **Permutations of a String**

*Problem*: Generate all permutations of a given string.

#### Recursive Approach:

1. The base case is when the string length is 1, return the string itself.
2. For each character, recursively compute the permutations of the remaining substring and insert the current character in all possible positions.

#### JavaScript Solution:

```javascript
function permute(str) {
  if (str.length === 1) return [str]; // Base case
  
  const permutations = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remainingStr = str.slice(0, i) + str.slice(i + 1); // Exclude the current character
    const remainingPermutations = permute(remainingStr); // Recur on the remaining string
    for (const perm of remainingPermutations) {
      permutations.push(char + perm); // Combine current character with each permutation
    }
  }
  
  return permutations;
}

// Test
console.log(permute("abc")); // Output: [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
```

**Time complexity**: O(N!), as we generate all permutations of the string.
**Space complexity**: O(N!), due to the storage of permutations and call stack depth.

---

### Recursive Pattern Summary:

- **Base Case**: Always define a base case to terminate the recursion.
- **Recursive Case**: Define how the function calls itself with a simpler or smaller version of the original problem.
- **Stack Limitations**: Recursive solutions can be elegant but might run into stack overflow issues if the recursion depth is too large.

---

### Key Problems to Practice:

1. **Binary Tree Traversals**: Preorder, Inorder, and Postorder tree traversals can be implemented recursively.
2. **Tower of Hanoi**: Solve the problem of moving discs between pegs recursively.
3. **Subset Generation**: Generate all subsets (power set) of a given set of elements recursively.


### 9. **Binary Search**

**Concept**:
Binary search is an efficient algorithm used to find the position of a target value within a sorted array or collection. It works by repeatedly dividing the search interval in half. If the value of the target is less than the middle element, the search continues in the left half, otherwise in the right half. This divide-and-conquer approach significantly reduces the number of comparisons needed.

**Why it’s useful**:

- **Fast Search**: Binary search has a time complexity of O(log N), making it highly efficient for large datasets compared to linear search (O(N)).
- **Applicability**: It works only on sorted collections, making it particularly useful for ordered data like databases, sorted arrays, and range-based queries.

---

### Binary Search Algorithm Steps:

1. **Start** with two pointers, `low` at the start of the array and `high` at the end.
2. **Find the middle element**: `mid = Math.floor((low + high) / 2)`.
3. **Compare** the target with the middle element:
   - If target == `mid`, return the index.
   - If target < `mid`, move `high` to `mid - 1` (search in the left half).
   - If target > `mid`, move `low` to `mid + 1` (search in the right half).
4. **Repeat** the process until `low` > `high`, meaning the target is not in the array.

---

### Example problem: **Binary Search in a Sorted Array**

*Problem*: Given a sorted array of integers, find the index of a target value.

#### JavaScript Solution:

```javascript
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2); // Find the middle index

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      low = mid + 1; // Search in the right half
    } else {
      high = mid - 1; // Search in the left half
    }
  }

  return -1; // Target not found
}

// Test
const sortedArray = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(sortedArray, 7));  // Output: 3
console.log(binarySearch(sortedArray, 4));  // Output: -1 (not found)
```

**Time complexity**: O(log N), where N is the number of elements in the array.
**Space complexity**: O(1), since it uses only a constant amount of extra space.

---

### Recursive Binary Search

Binary search can also be implemented recursively, which has a more intuitive structure but uses more stack space.

#### Recursive JavaScript Solution:

```javascript
function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1; // Base case: Target not found

  let mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) {
    return mid; // Target found
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, high); // Search in the right half
  } else {
    return binarySearchRecursive(arr, target, low, mid - 1); // Search in the left half
  }
}

// Test
console.log(binarySearchRecursive(sortedArray, 7));  // Output: 3
console.log(binarySearchRecursive(sortedArray, 4));  // Output: -1 (not found)
```

**Time complexity**: O(log N).
**Space complexity**: O(log N), due to recursive calls and stack usage.

---

### Binary Search Variants

#### 1. **Finding First or Last Occurrence**:

In a sorted array with duplicate values, binary search can be adapted to find the first or last occurrence of the target.

#### Finding First Occurrence:

```javascript
function binarySearchFirst(arr, target) {
  let low = 0, high = arr.length - 1;
  let result = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      result = mid; // Target found, record the index
      high = mid - 1; // Search left half for first occurrence
    } else if (arr[mid] < target) {
      low = mid + 1; // Search in the right half
    } else {
      high = mid - 1; // Search in the left half
    }
  }

  return result;
}

// Test
const duplicatesArray = [1, 2, 4, 4, 4, 5, 6];
console.log(binarySearchFirst(duplicatesArray, 4)); // Output: 2 (first occurrence of 4)
```

#### 2. **Binary Search on Infinite Array**:

If the array is infinite (or very large), a modified version of binary search is used by expanding the search window exponentially.

#### 3. **Binary Search on Rotated Sorted Array**:

In some cases, the sorted array may be rotated, making the binary search trickier but still applicable.

---

### Example problem: **Search Insert Position**

*Problem*: Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

#### JavaScript Solution:

```javascript
function searchInsert(arr, target) {
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      low = mid + 1; // Move right
    } else {
      high = mid - 1; // Move left
    }
  }

  return low; // Insert position
}

// Test
const sortedArray = [1, 3, 5, 6];
console.log(searchInsert(sortedArray, 5));  // Output: 2
console.log(searchInsert(sortedArray, 2));  // Output: 1
console.log(searchInsert(sortedArray, 7));  // Output: 4
```

**Time complexity**: O(log N).
**Space complexity**: O(1).

---

### Binary Search Pattern Summary:

- **Sorted Input**: Binary search requires the input array (or search space) to be sorted.
- **Divide and Conquer**: Split the array in half at each step, discarding the half where the target cannot exist.
- **Logarithmic Time**: With each iteration, the search space is halved, resulting in a logarithmic time complexity.

---

### Key Problems to Practice:

1. **Peak Element**: Find a peak element in an array where the peak is greater than its neighbors.
2. **Find Minimum in Rotated Sorted Array**: Given a rotated sorted array, find the minimum element.
3. **Square Root using Binary Search**: Find the integer square root of a number using binary search.


### 10. **Kadane’s Algorithm**

**Concept**:
Kadane’s Algorithm is an efficient algorithm used to find the **maximum sum of a contiguous subarray** within a one-dimensional array of numbers. It operates with a greedy approach and dynamic programming concepts to solve the maximum subarray sum problem.

**Why it’s useful**:

- **Optimal Substructure**: Kadane’s algorithm makes use of the fact that the maximum sum subarray ending at position `i` can either include the element at `i` or start a new subarray.
- **Linear Time**: It works in O(N) time, making it highly efficient for solving problems involving maximum sum subarrays in large arrays.
- **Real-World Usage**: It is widely applicable in financial modeling, weather prediction, and anywhere consecutive data need analysis for peaks or patterns.

---

### Kadane’s Algorithm Explanation

Given an array of integers (which may include negative numbers), the task is to find the subarray with the largest sum.

#### Kadane’s Algorithm Steps:

1. **Initialize**:

   - `maxEndingHere` = 0: This tracks the maximum sum of the subarray ending at the current position.
   - `maxSoFar` = `-Infinity`: This keeps track of the global maximum sum found so far.
2. **Iterate** through the array:

   - For each element `x` in the array, update `maxEndingHere` as:
     - `maxEndingHere = Math.max(x, maxEndingHere + x)`:
       - This step decides whether to add the current element `x` to the existing subarray (if it increases the sum) or start a new subarray from `x`.
   - Update `maxSoFar` as:
     - `maxSoFar = Math.max(maxSoFar, maxEndingHere)`:
       - This keeps track of the global maximum across all subarrays.
3. **Return** `maxSoFar` as the result.

---

### Example problem: **Maximum Subarray Sum**

*Problem*: Given an array of integers, find the contiguous subarray with the largest sum.

#### JavaScript Solution:

```javascript
function kadane(arr) {
  let maxEndingHere = 0;
  let maxSoFar = -Infinity; // Initialize to the smallest possible number to handle negative arrays

  for (let i = 0; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]); // Choose between current element or extending the subarray
    maxSoFar = Math.max(maxSoFar, maxEndingHere); // Update global maximum sum
  }

  return maxSoFar;
}

// Test cases
console.log(kadane([1, 2, 3, -2, 5])); // Output: 9 (subarray: [1, 2, 3, -2, 5])
console.log(kadane([-2, -3, 4, -1, -2, 1, 5, -3])); // Output: 7 (subarray: [4, -1, -2, 1, 5])
console.log(kadane([-1, -2, -3, -4])); // Output: -1 (subarray: [-1])
```

**Time complexity**: O(N), where N is the length of the array.
**Space complexity**: O(1), since only constant space is used.

---

### Breakdown of the Example:

Given an array: `[1, 2, 3, -2, 5]`.

- **Initial State**:

  - `maxEndingHere = 0`, `maxSoFar = -Infinity`
- **Iteration 1 (x = 1)**:

  - `maxEndingHere = Math.max(1, 0 + 1) = 1`
  - `maxSoFar = Math.max(-Infinity, 1) = 1`
- **Iteration 2 (x = 2)**:

  - `maxEndingHere = Math.max(2, 1 + 2) = 3`
  - `maxSoFar = Math.max(1, 3) = 3`
- **Iteration 3 (x = 3)**:

  - `maxEndingHere = Math.max(3, 3 + 3) = 6`
  - `maxSoFar = Math.max(3, 6) = 6`
- **Iteration 4 (x = -2)**:

  - `maxEndingHere = Math.max(-2, 6 - 2) = 4`
  - `maxSoFar = Math.max(6, 4) = 6`
- **Iteration 5 (x = 5)**:

  - `maxEndingHere = Math.max(5, 4 + 5) = 9`
  - `maxSoFar = Math.max(6, 9) = 9`

Thus, the maximum sum is **9**.

---

### Key Intuition:

- **Greedy Approach**: The decision at each step is greedy in that it chooses the current element if the current subarray sum is smaller. This guarantees that we’re always tracking the maximum possible subarray sum.
- **Dynamic Programming**: The algorithm builds upon previous subarray sums. Each iteration is based on the best solution from the previous iteration, making it a dynamic programming approach.

---

### Edge Cases to Consider:

1. **All Negative Numbers**:

   - The algorithm works even if all elements are negative, as it will choose the least negative number as the maximum subarray.
   - Example: `[-2, -3, -1, -5]` would return `-1` as the maximum sum.
2. **Single Element**:

   - If the array contains a single element, that element is the maximum sum.
3. **Empty Array**:

   - Depending on the problem definition, if the array is empty, you might want to return 0 or handle this edge case separately.

---

### Variants of Kadane's Algorithm

1. **Maximum Circular Subarray**:
   In some problems, the array is considered circular (i.e., the end of the array connects to the start). This requires modifying Kadane's algorithm to handle cases where the maximum subarray wraps around.

   **Concept**: The maximum circular subarray sum is either the result of normal Kadane’s algorithm or the total sum of the array minus the minimum subarray sum.
2. **2D Maximum Subarray**:
   Kadane’s algorithm can be extended to work on 2D matrices, where you find the submatrix with the maximum sum.
3. **Kadane’s Algorithm with Indices**:
   Often, you may be asked not just to find the maximum sum, but also to return the indices of the subarray that gives the maximum sum. This can be done by keeping track of the start and end indices during the computation.

---

### Example problem: **Maximum Subarray Sum with Indices**

*Problem*: Given an array of integers, find the contiguous subarray with the largest sum and return the start and end indices.

#### JavaScript Solution:

```javascript
function kadaneWithIndices(arr) {
  let maxEndingHere = 0;
  let maxSoFar = -Infinity;
  let start = 0, end = 0, tempStart = 0;

  for (let i = 0; i < arr.length; i++) {
    if (maxEndingHere + arr[i] < arr[i]) {
      maxEndingHere = arr[i];
      tempStart = i; // Update potential start of the new subarray
    } else {
      maxEndingHere += arr[i];
    }

    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
    }
  }

  return { maxSum: maxSoFar, start, end };
}

// Test
console.log(kadaneWithIndices([1, 2, 3, -2, 5])); 
// Output: { maxSum: 9, start: 0, end: 4 }
console.log(kadaneWithIndices([-2, -3, 4, -1, -2, 1, 5, -3])); 
// Output: { maxSum: 7, start: 2, end: 6 }
```

**Time complexity**: O(N)
**Space complexity**: O(1)

---

### Kadane's Algorithm Summary:

- **Key Idea**: At each step, decide whether to extend the current subarray or start a new subarray with the current element.
- **Time Efficiency**: It works in linear time, making it suitable for large datasets.
- **Variants**: The algorithm can be adapted for circular arrays, 2D arrays, and subarrays with additional constraints (e.g., sum within a range).

---


### 11. **Bit Manipulation**

**Concept**:
Bit manipulation involves performing operations directly on binary representations of numbers. It utilizes bitwise operators to perform fast, low-level operations that manipulate bits within integers. Understanding and leveraging bit manipulation is crucial in solving problems related to efficiency, as it provides significant performance benefits in both time and space complexity.

**Why it’s useful**:

- **Memory Efficiency**: It allows working with data in a compact form.
- **Speed**: Operations on bits are extremely fast compared to arithmetic operations.
- **Problem Solving**: Certain problems (such as those related to power of two, subsets, or parity) are naturally suited to bit manipulation techniques.
- **Security and Cryptography**: Bit-level operations are fundamental in encryption and hashing algorithms.

---

### Common Bitwise Operators in JavaScript

| Operator    | Symbol | Description                                                                                            |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------ |
| AND         | `&`  | Sets each bit to 1 if both bits are 1                                                                  |
| OR          | `      | `                                                                                                      |
| XOR         | `^`  | Sets each bit to 1 if only one of the bits is 1                                                        |
| NOT         | `~`  | Inverts all the bits (bitwise negation)                                                                |
| Left Shift  | `<<` | Shifts the bits of a number to the left by a specified number of positions (multiplies by powers of 2) |
| Right Shift | `>>` | Shifts the bits of a number to the right by a specified number of positions (divides by powers of 2)   |

---

### Key Bit Manipulation Techniques and Applications

#### 1. **Checking if a number is even or odd**

- If the least significant bit (LSB) of a number is 1, the number is odd; otherwise, it’s even.
- **Example**: `n & 1`

```javascript
function isOdd(n) {
  return (n & 1) === 1; // If the last bit is 1, the number is odd
}

// Test cases
console.log(isOdd(5));  // true (5 is odd)
console.log(isOdd(8));  // false (8 is even)
```

#### 2. **Swapping two numbers without a temporary variable**

- Using XOR (`^`), you can swap two numbers without needing extra space.

```javascript
function swap(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return [a, b];
}

// Test cases
let [x, y] = swap(3, 5);
console.log(x, y); // Output: 5 3
```

#### 3. **Checking if a number is a power of two**

- A number is a power of two if it has exactly one bit set to 1. This can be verified using the expression `n & (n - 1)` which turns off the lowest set bit.

```javascript
function isPowerOfTwo(n) {
  return (n > 0) && ((n & (n - 1)) === 0);
}

// Test cases
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(18)); // false
```

#### 4. **Counting the number of set bits (Hamming Weight)**

- You can count how many bits are set to 1 in the binary representation of a number using bit manipulation.

```javascript
function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    count += (n & 1);  // Check if the least significant bit is 1
    n >>= 1;           // Shift the number right to process the next bit
  }
  return count;
}

// Test cases
console.log(countSetBits(9));  // Output: 2 (binary 1001 has 2 ones)
console.log(countSetBits(15)); // Output: 4 (binary 1111 has 4 ones)
```

#### 5. **Finding the only non-repeating element in an array**

- Given an array where every element appears twice except for one, you can find the single element using XOR. XOR of two identical numbers is 0, and XOR of a number with 0 is the number itself.

```javascript
function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;  // XOR all elements, duplicates cancel each other out
  }
  return result;
}

// Test cases
console.log(singleNumber([4, 1, 2, 1, 2])); // Output: 4
console.log(singleNumber([2, 2, 3, 3, 4])); // Output: 4
```

#### 6. **Flipping bits of a number**

- To flip all bits in a number (turn 1s to 0s and 0s to 1s), you can use the bitwise NOT (`~`) operator.

```javascript
function flipBits(n) {
  return ~n;
}

// Test case
console.log(flipBits(5)); // Output: -6 (binary 101 becomes 010)
```

#### 7. **Extracting the rightmost set bit**

- To isolate the rightmost set bit (the lowest bit that is 1), use `n & (-n)`.

```javascript
function getRightmostSetBit(n) {
  return n & -n;
}

// Test cases
console.log(getRightmostSetBit(10)); // Output: 2 (binary 1010, rightmost set bit is 0010)
console.log(getRightmostSetBit(12)); // Output: 4 (binary 1100, rightmost set bit is 0100)
```

#### 8. **Finding the XOR of all numbers in a range**

- XOR has the property that it cancels itself out. The XOR of all numbers in a range can be computed efficiently without looping through each number.

```javascript
function xorRange(n) {
  if (n % 4 === 0) return n;
  if (n % 4 === 1) return 1;
  if (n % 4 === 2) return n + 1;
  return 0;
}

// Test case
console.log(xorRange(7)); // Output: 0 (XOR of numbers from 0 to 7 is 0)
```

#### 9. **Subsets of a set using bit masking**

- Each subset of a set can be represented by a bitmask, where each bit determines whether to include an element. There are `2^n` subsets for a set of size `n`, corresponding to all binary numbers with `n` bits.

```javascript
function getSubsets(nums) {
  let subsets = [];
  let n = nums.length;
  for (let i = 0; i < (1 << n); i++) {
    let subset = [];
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        subset.push(nums[j]);
      }
    }
    subsets.push(subset);
  }
  return subsets;
}

// Test case
console.log(getSubsets([1, 2, 3]));
/*
Output:
[
  [], [1], [2], [1, 2], 
  [3], [1, 3], [2, 3], [1, 2, 3]
]
*/
```

---

### Important Bit Manipulation Problems

1. **Reverse Bits**: Given a 32-bit unsigned integer, reverse the bits.
2. **Counting Bits**: For each number from 0 to a given number `num`, calculate the number of 1's in their binary representation.
3. **Hamming Distance**: Find the number of positions at which the corresponding bits between two integers are different.
4. **Gray Code**: Convert a binary number to its corresponding Gray Code, where only one bit changes between successive numbers.

---

### Summary:

Bit manipulation is a powerful technique for solving a wide range of problems efficiently. Key applications include checking conditions (e.g., odd/even, power of two), optimizing memory usage, working with sets and subsets, and solving low-level algorithmic challenges. It plays a critical role in cryptography, optimization, and hardware programming.

---


### 12. **Breadth-First Search (BFS)**

**Concept**:
Breadth-First Search (BFS) is a graph traversal algorithm that explores vertices level by level. It starts at a given node (source) and visits all the neighboring nodes at the present depth before moving on to nodes at the next depth level. BFS is widely used for searching the shortest path in unweighted graphs or solving problems that require a level-by-level exploration of a graph or tree structure.

**Characteristics**:

- BFS explores all nodes at the current depth level before moving to the next depth level.
- It is particularly useful for finding the shortest path in unweighted graphs.
- BFS uses a **queue** (FIFO data structure) to keep track of the next nodes to visit.
- It ensures that each node is visited in the order it is discovered, so it is excellent for level-order traversal in trees.

---

### BFS Algorithm

1. **Initialization**:

   - Start by placing the source node in a queue.
   - Mark it as visited.
2. **Process Queue**:

   - While the queue is not empty:
     - Remove the front node from the queue.
     - Visit its unvisited neighbors.
     - Mark those neighbors as visited and enqueue them.
3. **Repeat**:

   - Continue this process until all nodes have been visited, or the desired condition is met.

---

### BFS Example in JavaScript

```javascript
function bfs(graph, start) {
  let queue = [start];   // Initialize queue with the start node
  let visited = new Set();  // To keep track of visited nodes
  visited.add(start);  // Mark the start node as visited

  while (queue.length > 0) {
    let node = queue.shift();  // Dequeue the front node
    console.log(node);  // Process the current node

    // Loop through the neighbors of the current node
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);  // Enqueue the unvisited neighbor
        visited.add(neighbor);  // Mark the neighbor as visited
      }
    }
  }
}

// Example usage
const graph = {
  1: [2, 3],
  2: [4, 5],
  3: [6, 7],
  4: [],
  5: [],
  6: [],
  7: []
};

bfs(graph, 1);  // Output: 1 2 3 4 5 6 7 (Level-order traversal)
```

In this example, the BFS function traverses the graph level by level, starting from node `1` and visiting each of its neighbors before proceeding to the next level.

---

### BFS on Trees

BFS is frequently used for **level-order traversal** of binary trees.

```javascript
function bfsTree(root) {
  if (!root) return;
  
  let queue = [root];
  
  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node.value);  // Process the current node

    // Enqueue left child if exists
    if (node.left) {
      queue.push(node.left);
    }

    // Enqueue right child if exists
    if (node.right) {
      queue.push(node.right);
    }
  }
}

// Example binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Create binary tree
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

bfsTree(root);  // Output: 1 2 3 4 5 6 7
```

---

### Applications of BFS

1. **Shortest Path in Unweighted Graphs**:
   BFS is used to find the shortest path between two nodes in an unweighted graph because it explores all nodes level by level. When a node is reached, the shortest path to that node is guaranteed.

```javascript
function bfsShortestPath(graph, start, target) {
  let queue = [[start]];  // Queue stores paths instead of just nodes
  let visited = new Set();
  visited.add(start);

  while (queue.length > 0) {
    let path = queue.shift();  // Dequeue the front path
    let node = path[path.length - 1];  // Get the last node of the path

    // Check if target is reached
    if (node === target) {
      return path;  // Return the path if target is found
    }

    // Explore neighbors
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        let newPath = [...path, neighbor];  // Create a new path with the neighbor
        queue.push(newPath);  // Enqueue the new path
      }
    }
  }

  return null;  // Return null if no path is found
}

// Example graph
const graphExample = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
};

console.log(bfsShortestPath(graphExample, 'A', 'F')); // Output: [ 'A', 'C', 'F' ]
```

2. **Connected Components**:
   BFS is used to find connected components in a graph. It explores all nodes connected to a given node, which helps in identifying distinct clusters or regions.
3. **Cycle Detection**:
   BFS can be used to detect cycles in an undirected graph by marking visited nodes and checking if a node has been revisited before completing the traversal.
4. **Solving Maze Problems**:
   BFS is ideal for solving maze or grid-based problems, as it explores all possible paths in an orderly manner and guarantees finding the shortest path in unweighted grids.

---

### BFS in Grid-Based Problems

BFS is highly useful in grid-based problems, such as solving mazes, finding the shortest path in a grid, or exploring all possible positions in a matrix.

**Example: Finding the Shortest Path in a Grid**

```javascript
function bfsGridShortestPath(grid, start, end) {
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];  // Directions for moving up, down, left, and right
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [[...start, 0]];  // Store [x, y, distance] in queue
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();

    // If we reach the end
    if (x === end[0] && y === end[1]) {
      return dist;
    }

    // Explore the four possible directions
    for (let [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // Check if the new position is within the grid and not visited or blocked
      if (newX >= 0 && newY >= 0 && newX < rows && newY < cols && grid[newX][newY] === 0 && !visited.has([newX, newY].toString())) {
        queue.push([newX, newY, dist + 1]);
        visited.add([newX, newY].toString());
      }
    }
  }

  return -1;  // Return -1 if no path is found
}

// Example usage
const grid = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0]
];

console.log(bfsGridShortestPath(grid, [0, 0], [4, 4]));  // Output: 8
```

In this example, BFS explores the grid in a level-order manner to find the shortest path from the top-left corner to the bottom-right corner, avoiding obstacles represented by `1`.

---

### Time and Space Complexity of BFS

- **Time Complexity**: `O(V + E)` where `V` is the number of vertices and `E` is the number of edges in the graph. This is because BFS visits every vertex and explores all its neighbors.
- **Space Complexity**: `O(V)` where `V` is the number of vertices. This is the space needed to store the visited nodes and the queue.

---

### Summary

- **BFS** explores nodes level by level, making it ideal for problems that require level-order traversal or shortest paths in unweighted graphs.
- It uses a queue to process nodes in a FIFO manner, ensuring that nodes at the same level are explored before moving deeper.
- BFS is widely applicable in grid problems, pathfinding, connected components, and more.
- Understanding BFS is essential for solving many graph-based problems, and its variations (like BFS on trees or grids) are common in coding challenges.


### 13. **Depth-First Search (DFS)**

**Concept**:
Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. Unlike BFS, which explores the graph level by level, DFS dives deep into the graph, visiting nodes along a single path as far as possible before exploring alternative paths.

DFS is particularly useful in scenarios that involve exploring all possible paths, detecting cycles, solving puzzles (like mazes), or searching graphs that are deep rather than wide.

**Characteristics**:

- DFS uses a **stack** (LIFO) data structure (either explicitly or through recursion).
- It can be implemented recursively or iteratively.
- DFS does not guarantee the shortest path, but it is useful for tasks that require visiting all nodes, such as topological sorting or finding connected components.
- DFS is often used for problems like finding strongly connected components, solving maze problems, and more.

---

### DFS Algorithm

1. **Initialization**:

   - Start at the source node.
   - Mark it as visited.
2. **Explore**:

   - Visit an unvisited neighbor and mark it as visited.
   - Recursively visit all unvisited neighbors of the current node until no more neighbors can be visited.
3. **Backtrack**:

   - Once all neighbors of a node have been visited, backtrack to the previous node to explore other unvisited neighbors.
4. **Repeat**:

   - Continue until all nodes in the graph have been visited or the desired node is found.

---

### DFS Example in JavaScript (Recursive Approach)

```javascript
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  
  console.log(node);  // Process the current node
  visited.add(node);  // Mark the node as visited

  // Recursively visit all neighbors of the current node
  for (let neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}

// Example usage
const graph = {
  1: [2, 3],
  2: [4, 5],
  3: [6, 7],
  4: [],
  5: [],
  6: [],
  7: []
};

dfs(graph, 1);  // Output: 1 2 4 5 3 6 7 (Preorder traversal)
```

In this recursive implementation, DFS explores each node by diving deep into the graph before backtracking. Starting from node `1`, DFS explores its left-most branch completely before backtracking and exploring other branches.

---

### DFS Example in JavaScript (Iterative Approach)

DFS can also be implemented iteratively using a **stack**. Here’s how you can implement it:

```javascript
function dfsIterative(graph, start) {
  let stack = [start];  // Initialize stack with the start node
  let visited = new Set();  // To keep track of visited nodes

  while (stack.length > 0) {
    let node = stack.pop();  // Pop the top node from the stack

    if (!visited.has(node)) {
      console.log(node);  // Process the current node
      visited.add(node);  // Mark the node as visited

      // Push all neighbors to the stack (in reverse order)
      for (let neighbor of graph[node].reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}

// Example usage
dfsIterative(graph, 1);  // Output: 1 3 7 6 2 5 4 (Order may vary based on stack handling)
```

In the iterative approach, the stack replaces the recursive call stack, making it a good fit for situations where deep recursion might lead to stack overflow.

---

### DFS on Trees

DFS is commonly used for traversing trees in different orders: **preorder**, **inorder**, and **postorder**.

- **Preorder**: Visit root, then left subtree, then right subtree.
- **Inorder**: Visit left subtree, then root, then right subtree.
- **Postorder**: Visit left subtree, then right subtree, then root.

Here’s a simple recursive DFS for binary tree traversal (preorder):

```javascript
function dfsPreorder(root) {
  if (!root) return;
  
  console.log(root.value);  // Process the current node
  dfsPreorder(root.left);  // Visit the left subtree
  dfsPreorder(root.right);  // Visit the right subtree
}

// Example binary tree node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Create binary tree
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

dfsPreorder(root);  // Output: 1 2 4 5 3 6 7
```

This DFS example performs a **preorder traversal** of the binary tree, visiting the root node first, then the left subtree, followed by the right subtree.

---

### Applications of DFS

1. **Detecting Cycles**:
   DFS is widely used to detect cycles in both directed and undirected graphs by keeping track of visited nodes and back edges.
2. **Topological Sorting**:
   DFS is used for **topological sorting** in Directed Acyclic Graphs (DAGs), where nodes are visited in postorder and added to a stack. This stack gives the topologically sorted order of nodes.

```javascript
function topologicalSort(graph) {
  let visited = new Set();
  let stack = [];

  function dfs(node) {
    visited.add(node);

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    stack.push(node);  // Push node to stack after visiting all neighbors
  }

  for (let node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }

  return stack.reverse();  // Return stack in reverse for topological order
}

// Example graph
const graphTopSort = {
  5: [2, 0],
  4: [0, 1],
  3: [1],
  2: [],
  1: [],
  0: []
};

console.log(topologicalSort(graphTopSort));  // Output: [ 3, 4, 5, 1, 2, 0 ]
```

3. **Solving Maze Problems**:
   DFS is used to explore all paths in maze problems, especially for backtracking problems like generating and solving mazes.
4. **Finding Connected Components**:
   DFS is used to explore all nodes connected to a given node, making it useful for finding connected components in an undirected graph.
5. **Pathfinding**:
   DFS is used in problems where the goal is to find any path from one node to another (not necessarily the shortest).
6. **Strongly Connected Components (SCCs)**:
   DFS is employed in **Tarjan’s Algorithm** or **Kosaraju’s Algorithm** to find strongly connected components in directed graphs.

---

### DFS in Grid-Based Problems

DFS is useful for grid-based problems where you need to explore all possible directions from a starting point, especially in backtracking problems.

**Example: Solving a Maze Using DFS**

```javascript
function dfsMaze(grid, x, y, visited) {
  // Boundary and obstacle checks
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] === 1 || visited.has(`${x},${y}`)) {
    return false;
  }

  // Mark as visited
  visited.add(`${x},${y}`);

  // Check if we've reached the goal
  if (grid[x][y] === 9) {
    console.log('Found the goal!');
    return true;
  }

  // Explore neighbors (up, down, left, right)
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let [dx, dy] of directions) {
    if (dfsMaze(grid, x + dx, y + dy, visited)) {
      return true;
    }
  }

  return false;
}

// Example grid (0 = open, 1 = obstacle, 9 = goal)
const maze = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 9],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0]
];

let visited = new Set();
console.log(dfsMaze(maze, 0, 0, visited));  // Output: "Found the goal!" true
```

In this example, DFS explores the maze from a starting point and searches for the goal (`9`). It explores all possible paths, backtracking whenever it hits a dead-end.

---

### Time and Space Complexity of DFS

- **Time Complexity**: `O(V + E)`, where `V` is the number of vertices and `E` is the number of edges. Each node and edge is explored once.
- **Space Complexity

**: `O(V)`, where `V` is the number of vertices. The space complexity is determined by the recursion stack or the stack used for the iterative version.


### 14. **Merge Intervals**

**Concept**:
The **Merge Intervals** problem involves merging overlapping intervals in a list of intervals. Each interval is represented as a pair of values: a start time and an end time. If two intervals overlap or touch each other, they should be merged into a single interval.

For example, given intervals like `[1, 3]` and `[2, 6]`, the merged result would be `[1, 6]` because these intervals overlap.

This problem is a common pattern in interval-related tasks, such as scheduling, calendar management, or range merging.

---

### Steps to Solve the Merge Intervals Problem

1. **Sort the Intervals**:

   - Sort the intervals based on their start times. This makes it easier to detect overlaps between consecutive intervals.
2. **Iterate and Merge**:

   - Initialize an empty result list to store merged intervals.
   - Iterate through the list of intervals:
     - If the current interval does not overlap with the previous one, add it to the result.
     - If the current interval overlaps, merge it with the previous interval by updating the end time of the previous interval to the maximum end time between the two overlapping intervals.
3. **Return the Result**:

   - After processing all intervals, the result list will contain only non-overlapping intervals.

---

### Example of Merge Intervals in JavaScript

Here’s how you can implement the merge intervals algorithm in JavaScript:

```javascript
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals; // No need to merge if 1 or 0 intervals

  // Step 1: Sort the intervals by their start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let currentInterval = intervals[0]; // Initialize with the first interval

  // Step 2: Iterate through the intervals
  for (let i = 1; i < intervals.length; i++) {
    let nextInterval = intervals[i];

    // Check if the intervals overlap
    if (currentInterval[1] >= nextInterval[0]) {
      // Merge the intervals by updating the end of the current interval
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      // No overlap, push the current interval and move to the next one
      merged.push(currentInterval);
      currentInterval = nextInterval;
    }
  }

  // Step 3: Push the last interval
  merged.push(currentInterval);

  return merged;
}

// Example usage
const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log(mergeIntervals(intervals));  // Output: [[1, 6], [8, 10], [15, 18]]
```

In this example, the intervals are first sorted based on their start time. The algorithm then goes through the sorted intervals and merges overlapping ones. The final output only contains non-overlapping merged intervals.

---

### Example Walkthrough

Consider the following list of intervals:

```
Intervals: [[1, 3], [2, 6], [8, 10], [15, 18]]
```

1. **Sort the intervals by their start times**:

   ```
   [[1, 3], [2, 6], [8, 10], [15, 18]]
   ```
2. **Start merging**:

   - Compare `[1, 3]` with `[2, 6]`: These intervals overlap, so we merge them into `[1, 6]`.
   - Compare `[1, 6]` with `[8, 10]`: No overlap, so we keep `[8, 10]`.
   - Compare `[8, 10]` with `[15, 18]`: No overlap, so we keep `[15, 18]`.
3. **Final Merged Intervals**:

   ```
   [[1, 6], [8, 10], [15, 18]]
   ```

---

### Edge Cases to Consider

1. **Single Interval**:

   - If the input only contains one interval, it should be returned as is.

   ```javascript
   mergeIntervals([[5, 10]]);  // Output: [[5, 10]]
   ```
2. **Non-overlapping Intervals**:

   - If none of the intervals overlap, the output should be the same as the input.

   ```javascript
   mergeIntervals([[1, 2], [3, 4], [5, 6]]);  // Output: [[1, 2], [3, 4], [5, 6]]
   ```
3. **Fully Overlapping Intervals**:

   - If all intervals overlap, the result should be a single merged interval.

   ```javascript
   mergeIntervals([[1, 4], [2, 3], [3, 5]]);  // Output: [[1, 5]]
   ```
4. **Touching Intervals**:

   - If intervals touch but do not overlap (i.e., the end of one interval is equal to the start of the next), they should still be merged.

   ```javascript
   mergeIntervals([[1, 2], [2, 3]]);  // Output: [[1, 3]]
   ```

---

### Time and Space Complexity

- **Time Complexity**: `O(n log n)` because sorting the intervals takes `O(n log n)`, and merging them takes `O(n)`. So, the overall time complexity is dominated by the sorting step.
- **Space Complexity**: `O(n)` because we are storing the merged intervals in a new list.

---

### Applications of Merge Intervals

1. **Scheduling Problems**:

   - Merging intervals can be applied to solve scheduling conflicts or determining free time slots in calendars.
2. **Range Merging**:

   - In scenarios involving ranges (like merging ranges of IP addresses, log file entries, or stock prices), merge intervals can be used.
3. **Data Compression**:

   - In certain data compression algorithms, merging overlapping ranges of data segments can help reduce redundancy and save space.
4. **Meeting Room Scheduling**:

   - Given the start and end times of meetings, we can use the merge intervals pattern to find the minimum number of rooms required to schedule all meetings.

---

### Variations of Merge Intervals

1. **Insert Interval**:
   Given a new interval, insert it into an existing set of intervals and merge if necessary. This is a variation where you have to figure out the right place to insert the new interval and then merge it with the surrounding intervals.

   ```javascript
   function insertInterval(intervals, newInterval) {
     intervals.push(newInterval);
     return mergeIntervals(intervals);
   }

   console.log(insertInterval([[1, 3], [6, 9]], [2, 5]));
   // Output: [[1, 5], [6, 9]]
   ```
2. **Erase Overlaps**:
   Find the minimum number of intervals that need to be removed to make the rest of the intervals non-overlapping. This is a different problem but follows the same principles of merging intervals, except instead of merging, you figure out which intervals to remove.

---

### Summary

The **Merge Intervals** problem is a classic example of interval manipulation and is commonly asked in coding interviews. The main idea is to sort the intervals and then iterate through them, merging overlapping ones. This pattern is not only useful in algorithms but also in real-world scenarios like scheduling, time management, and range-based tasks.


### 15. **Topological Sort**

**Concept**:
Topological Sort is an algorithm used to order the vertices of a **Directed Acyclic Graph (DAG)** in a linear sequence such that for every directed edge `u -> v`, vertex `u` comes before vertex `v` in the ordering. This kind of sorting is useful when you have dependencies between tasks and you want to find an order in which to complete them.

**Applications**:

- Task scheduling (e.g., course prerequisite management)
- Dependency resolution (e.g., in build systems like `make`, package managers)
- Resolving compilation order in programming languages

---

### Pre-Requisites:

1. **Directed Acyclic Graph (DAG)**: Topological Sort only works on graphs that are directed and acyclic. If the graph has cycles, topological sorting is not possible because there's no valid linear order for the vertices.
2. **In-Degree**: In a directed graph, the in-degree of a vertex is the number of incoming edges to that vertex.

---

### Steps to Solve Topological Sort

There are two primary ways to implement Topological Sort:

1. **Kahn’s Algorithm (BFS Approach)**
2. **DFS (Depth-First Search) Approach**

---

### 1. **Kahn’s Algorithm (BFS Approach)**

Kahn's Algorithm uses **Breadth-First Search (BFS)** and is based on calculating the **in-degree** of vertices (i.e., the number of incoming edges to each vertex).

#### Steps:

1. **Calculate the In-Degree**:

   - For every vertex in the graph, calculate how many incoming edges it has (its in-degree).
2. **Initialize a Queue**:

   - Add all vertices with an in-degree of 0 (i.e., those with no dependencies) to a queue.
3. **Process the Queue**:

   - While the queue is not empty:
     - Remove a vertex from the queue and add it to the result list.
     - For each adjacent vertex of the removed vertex, reduce its in-degree by 1.
     - If any adjacent vertex now has an in-degree of 0, add it to the queue.
4. **Check for Cycles**:

   - If at the end of the process, all vertices are sorted and there are no remaining vertices with non-zero in-degrees, the graph is a valid DAG, and the topological order is valid. If there are remaining vertices, it means the graph contains a cycle.

---

#### Example of Kahn's Algorithm in JavaScript

```javascript
function topologicalSort(vertices, edges) {
  const inDegree = Array(vertices).fill(0);  // Track in-degrees
  const adjList = Array(vertices).fill(0).map(() => []);  // Adjacency list

  // Step 1: Build the graph
  for (let [u, v] of edges) {
    adjList[u].push(v);
    inDegree[v]++;
  }

  // Step 2: Collect all nodes with 0 in-degree
  const queue = [];
  for (let i = 0; i < vertices; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const sortedOrder = [];

  // Step 3: Process each node in the queue
  while (queue.length > 0) {
    const vertex = queue.shift();
    sortedOrder.push(vertex);

    // Decrease the in-degree of each adjacent node
    for (let neighbor of adjList[vertex]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // Step 4: If sortedOrder doesn't contain all vertices, there's a cycle
  if (sortedOrder.length !== vertices) {
    throw new Error("Graph contains a cycle, topological sort not possible");
  }

  return sortedOrder;
}

// Example usage
const vertices = 6;
const edges = [
  [5, 2], [5, 0],
  [4, 0], [4, 1],
  [2, 3], [3, 1]
];

console.log(topologicalSort(vertices, edges));  // Output: [5, 4, 2, 3, 1, 0]
```

### Explanation:

1. Vertices with no dependencies (in-degree 0) are processed first.
2. The vertices are removed from the queue one by one, and their dependencies (adjacent vertices) are updated by reducing their in-degree.
3. Once a vertex’s in-degree becomes 0, it is added to the queue.
4. The result contains the topological order.

### Time Complexity:

- **O(V + E)**: Where `V` is the number of vertices and `E` is the number of edges. This is because we process each vertex once and traverse each edge once.

### Space Complexity:

- **O(V + E)**: The space used for the adjacency list and the in-degree array.

---

### 2. **DFS (Depth-First Search) Approach**

The DFS approach leverages recursion to visit each vertex and its adjacent vertices. The vertices are added to the result in post-order (after all their neighbors have been visited), ensuring that dependencies are resolved before the vertex itself is added.

#### Steps:

1. **Mark each vertex as unvisited**.
2. **Run DFS** on each unvisited vertex:
   - Recursively visit all of the current vertex’s neighbors.
   - After all neighbors are visited, add the current vertex to the result.
3. **Reverse the result** list to get the correct topological order (because vertices are added in reverse post-order).

---

#### Example of DFS Approach in JavaScript

```javascript
function topologicalSortDFS(vertices, edges) {
  const adjList = Array(vertices).fill(0).map(() => []);
  const visited = Array(vertices).fill(false);
  const result = [];

  // Step 1: Build the graph
  for (let [u, v] of edges) {
    adjList[u].push(v);
  }

  // Step 2: Define DFS function
  function dfs(vertex) {
    visited[vertex] = true;

    // Visit all neighbors
    for (let neighbor of adjList[vertex]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }

    // Add vertex to the result in post-order
    result.push(vertex);
  }

  // Step 3: Apply DFS to each vertex
  for (let i = 0; i < vertices; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  // Step 4: Reverse the result to get topological order
  return result.reverse();
}

// Example usage
const vertices = 6;
const edges = [
  [5, 2], [5, 0],
  [4, 0], [4, 1],
  [2, 3], [3, 1]
];

console.log(topologicalSortDFS(vertices, edges));  // Output: [5, 4, 2, 3, 1, 0]
```

### Explanation:

1. Each vertex is visited once using DFS.
2. After visiting all neighbors of a vertex, it is added to the result list.
3. The list is reversed at the end to reflect the correct topological order.

### Time Complexity:

- **O(V + E)**: As we visit each vertex and each edge once.

### Space Complexity:

- **O(V + E)**: For the adjacency list, visited array, and the recursion stack.

---

### Cycle Detection in Topological Sort

If a cycle exists in the graph, a valid topological ordering cannot exist. In Kahn’s algorithm, a cycle is detected if the number of vertices in the result is less than the total number of vertices (i.e., not all vertices are processed). In the DFS approach, cycles can be detected if a vertex is revisited during DFS (back edges).

---

### Applications of Topological Sort

1. **Course Scheduling**:

   - University courses often have prerequisites, and the order in which courses should be taken can be determined using topological sorting.
2. **Dependency Management**:

   - In build systems like `make`, tasks have dependencies, and topological sort ensures that tasks are executed in the correct order.
3. **Package Managers**:

   - Package managers use topological sorting to ensure that dependent packages are installed in the correct order.
4. **Job Scheduling**:

   - In job scheduling problems, jobs may have dependencies on each other, and topological sort helps determine a valid execution order.

---

### Summary

**Topological Sort** is a crucial algorithm in tasks that involve dependencies. It ensures that tasks or processes are completed in the right order. You should be familiar with both Kahn’s algorithm (BFS approach) and the DFS approach, as both are commonly used in different scenarios. This is a fundamental graph algorithm used in many practical applications, including task scheduling, build systems, and dependency resolution.


### 16. **Fast and Slow Pointers (Tortoise and Hare)**

**Concept**:
The Fast and Slow Pointers technique is used to solve problems related to linked lists and arrays. It involves using two pointers that move at different speeds (one moving faster than the other) to identify certain properties or behaviors in the data structure. This technique is particularly useful for detecting cycles, finding the middle of a linked list, and solving other similar problems.

---

### Applications:

1. **Cycle Detection in Linked Lists**: Determine if a linked list contains a cycle.
2. **Finding the Start of a Cycle**: Identify the node where a cycle begins in a linked list.
3. **Finding the Middle of a Linked List**: Determine the middle node in a singly linked list.
4. **Palindrome Linked List**: Check if a linked list is a palindrome.

---

### General Steps:

1. **Initialize Two Pointers**:

   - One pointer (`slow`) moves one step at a time.
   - The other pointer (`fast`) moves two steps at a time.
2. **Traverse the Structure**:

   - Move both pointers through the linked list or array.
   - Check the conditions that define the problem (e.g., cycle detection or finding the middle).
3. **Analyze Pointer Positions**:

   - Depending on where the pointers meet or how far they travel, you can conclude the solution to the problem.

---

### 1. **Cycle Detection in Linked Lists**

#### Steps:

1. Initialize two pointers: `slow` and `fast`, both pointing to the head of the linked list.
2. Move `slow` by one step and `fast` by two steps in each iteration.
3. If there is a cycle, `slow` and `fast` will eventually meet inside the cycle. If `fast` reaches the end of the list (null), then the list does not contain a cycle.

---

#### Example in JavaScript

```javascript
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function hasCycle(head) {
  if (!head) return false; // If the list is empty

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;            // Move slow pointer by 1
    fast = fast.next.next;      // Move fast pointer by 2

    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false; // No cycle
}

// Example Usage
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = head; // Creates a cycle

console.log(hasCycle(head)); // Output: true
```

### Explanation:

- The `slow` pointer moves one step, while the `fast` pointer moves two steps.
- If a cycle exists, they will eventually meet. If the `fast` pointer reaches `null`, it means there is no cycle.

---

### 2. **Finding the Start of a Cycle**

If you want to determine where the cycle begins after detecting that a cycle exists, you can use the following steps:

#### Steps:

1. After detecting a cycle, keep one pointer at the meeting point and move the other pointer to the head of the list.
2. Move both pointers one step at a time.
3. The point where they meet will be the starting node of the cycle.

---

#### Example in JavaScript

```javascript
function detectCycle(head) {
  if (!head) return null;

  let slow = head;
  let fast = head;

  // Step 1: Detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Step 2: Find the entry point of the cycle
      let entry = head;
      while (entry !== slow) {
        entry = entry.next;
        slow = slow.next;
      }
      return entry; // Cycle start node
    }
  }

  return null; // No cycle
}

// Example Usage
const head = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
head.next = node2;
node2.next = node3;
node3.next = node2; // Creates a cycle

console.log(detectCycle(head)); // Output: ListNode { value: 2, next: ListNode { ... } }
```

### Explanation:

- After detecting a cycle, the entry point is found by moving one pointer to the head and the other to the meeting point, progressing them both one step at a time until they meet.

---

### 3. **Finding the Middle of a Linked List**

#### Steps:

1. Initialize two pointers, `slow` and `fast`, at the head.
2. Move `slow` by one step and `fast` by two steps until `fast` reaches the end.
3. When `fast` reaches the end, `slow` will be at the middle of the linked list.

---

#### Example in JavaScript

```javascript
function findMiddle(head) {
  if (!head) return null;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next; // Move slow pointer by 1
    fast = fast.next.next; // Move fast pointer by 2
  }

  return slow; // Middle node
}

// Example Usage
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

console.log(findMiddle(head)); // Output: ListNode { value: 3, next: ListNode { ... } }
```

### Explanation:

- The `slow` pointer will point to the middle node when `fast` reaches the end of the list.

---

### 4. **Palindrome Linked List**

To determine if a linked list is a palindrome, you can use the Fast and Slow Pointers technique to find the middle and then compare the first half with the reversed second half.

#### Steps:

1. Use the fast and slow pointers to find the middle of the list.
2. Reverse the second half of the list.
3. Compare the first half and the reversed second half.

---

#### Example in JavaScript

```javascript
function isPalindrome(head) {
  if (!head || !head.next) return true;

  let slow = head;
  let fast = head;

  // Step 1: Find the middle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half
  let prev = null;
  while (slow) {
    const nextTemp = slow.next;
    slow.next = prev;
    prev = slow;
    slow = nextTemp;
  }

  // Step 3: Compare the two halves
  let left = head;
  let right = prev; // Start of the reversed half

  while (right) {
    if (left.value !== right.value) {
      return false; // Not a palindrome
    }
    left = left.next;
    right = right.next;
  }

  return true; // Is a palindrome
}

// Example Usage
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);

console.log(isPalindrome(head)); // Output: true
```

### Explanation:

- The linked list is divided into two halves. The second half is reversed and then compared with the first half to check for palindromic properties.

---

### Time Complexity

- **O(n)**: Where `n` is the number of nodes in the linked list. Each node is processed a constant number of times.

### Space Complexity

- **O(1)**: No additional space is used apart from a few pointers.

---

### Summary

The **Fast and Slow Pointers** technique is a powerful pattern for solving problems related to linked lists and arrays. It efficiently detects cycles, finds middle nodes, and checks for palindromes using minimal space and linear time. This technique is fundamental in algorithm design and is widely applicable in various data structure problems.


### 17. **Union-Find (Disjoint Set)**

**Concept**:
The Union-Find data structure, also known as Disjoint Set Union (DSU), is a powerful tool for solving problems that involve grouping elements into disjoint sets and efficiently performing union and find operations. It is particularly useful in scenarios involving connectivity, such as network connectivity, Kruskal's algorithm for finding the Minimum Spanning Tree, and solving problems related to connected components in graphs.

---

### Key Operations:

1. **Find**: Determine which set a particular element belongs to. This operation can be optimized using **path compression**.
2. **Union**: Merge two sets into a single set. This operation can be optimized using **union by rank** or **union by size**.

---

### Data Structure:

A typical implementation of Union-Find maintains two main arrays:

- **parent**: An array where `parent[i]` points to the parent of element `i`. If `parent[i]` is `i`, then `i` is the root of the set.
- **rank (or size)**: An array used to keep track of the rank or size of the sets for efficient union operations.

### Basic Steps:

1. **Initialization**:

   - Each element is its own parent (i.e., each element is a separate set).
   - The rank (or size) of each set is initialized to 1.
2. **Find Operation**:

   - If an element is not its own parent, recursively find its parent and update the parent to the root (path compression).
   - Return the root of the set containing the element.
3. **Union Operation**:

   - Find the roots of the sets containing the two elements.
   - If they are in different sets, merge them. Attach the smaller tree under the larger tree to keep the tree shallow (using union by rank/size).

---

### Applications:

1. **Cycle Detection in Graphs**: Check if adding an edge creates a cycle.
2. **Kruskal's Algorithm**: Find the Minimum Spanning Tree in a weighted graph.
3. **Connected Components**: Identify connected components in undirected graphs.
4. **Dynamic Connectivity**: Maintain and query the connectivity of nodes as edges are added or removed.

---

### Implementation in JavaScript

```javascript
class UnionFind {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size).fill(1);
    // Initialize each element to be its own parent
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  // Find with path compression
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  // Union by rank
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      // Union by rank
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }

  // Check if two elements are in the same set
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Example Usage
const uf = new UnionFind(10);
uf.union(1, 2);
uf.union(2, 3);
console.log(uf.connected(1, 3)); // Output: true
console.log(uf.connected(1, 4)); // Output: false
uf.union(3, 4);
console.log(uf.connected(1, 4)); // Output: true
```

### Explanation:

- **Initialization**: The constructor initializes the `parent` array so that each element is its own parent, and the `rank` array to keep track of the tree heights.
- **Find**: The `find` method includes path compression, flattening the structure of the tree whenever `find` is called, which optimizes future queries.
- **Union**: The `union` method merges two sets based on their rank, ensuring that the smaller tree is always attached under the larger tree, keeping the overall tree shallow.
- **Connected**: The `connected` method checks if two elements are in the same set by comparing their roots.

---

### Time Complexity:

- **Find**: \(O(\alpha(n))\) where \(\alpha\) is the inverse Ackermann function, which grows very slowly.
- **Union**: \(O(\alpha(n))\)

### Space Complexity:

- **O(n)** for the parent and rank arrays.

---

### Summary

The **Union-Find** (Disjoint Set Union) data structure is a versatile and efficient way to manage and query connected components. It is widely used in various algorithms and applications, particularly in graph theory and network connectivity problems. By utilizing path compression and union by rank, it maintains optimal performance for large datasets.


### 18. **Matrix Traversal**

**Concept**:
Matrix traversal refers to the process of visiting all the elements in a matrix (2D array) systematically. This is a fundamental operation in many algorithms, particularly in graph theory, dynamic programming, and searching/sorting problems.

---

### Common Traversal Patterns:

1. **Row-wise Traversal**: Visiting elements in each row from left to right.
2. **Column-wise Traversal**: Visiting elements in each column from top to bottom.
3. **Spiral Order Traversal**: Visiting the matrix in a spiral pattern, starting from the outer layer and moving inward.
4. **Diagonal Traversal**: Visiting elements along diagonals, starting from the top-left corner.

---

### Traversal Techniques

#### 1. Row-wise Traversal

In row-wise traversal, you iterate through each row and each column sequentially.

**Example**:

```javascript
function rowWiseTraversal(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      console.log(matrix[i][j]);
    }
  }
}

// Example usage
const matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

rowWiseTraversal(matrix1); // Output: 1 2 3 4 5 6 7 8 9
```

#### 2. Column-wise Traversal

In column-wise traversal, you iterate through each column before moving to the next row.

**Example**:

```javascript
function columnWiseTraversal(matrix) {
  for (let j = 0; j < matrix[0].length; j++) {
    for (let i = 0; i < matrix.length; i++) {
      console.log(matrix[i][j]);
    }
  }
}

// Example usage
const matrix2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

columnWiseTraversal(matrix2); // Output: 1 4 7 2 5 8 3 6 9
```

#### 3. Spiral Order Traversal

Spiral order traversal involves visiting elements in a clockwise spiral pattern.

**Example**:

```javascript
function spiralOrder(matrix) {
  if (matrix.length === 0) return [];
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse from left to right
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // Traverse from top to bottom
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    if (top <= bottom) {
      // Traverse from right to left
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      // Traverse from bottom to top
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  return result;
}

// Example usage
const matrix3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(spiralOrder(matrix3)); // Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
```

#### 4. Diagonal Traversal

Diagonal traversal can be performed by traversing the diagonals starting from the top-left corner to the bottom-right corner.

**Example**:

```javascript
function diagonalTraversal(matrix) {
  if (matrix.length === 0) return [];
  const result = [];
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let d = 0; d < rows + cols - 1; d++) {
    let row = d < cols ? 0 : d - cols + 1;
    let col = d < cols ? d : cols - 1;

    while (row < rows && col >= 0) {
      result.push(matrix[row][col]);
      row++;
      col--;
    }
  }
  return result;
}

// Example usage
const matrix4 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(diagonalTraversal(matrix4)); // Output: [1, 2, 4, 7, 5, 3, 6, 8, 9]
```

---

### Time Complexity:

- **Row-wise/Column-wise Traversal**: \(O(m \times n)\), where \(m\) is the number of rows and \(n\) is the number of columns.
- **Spiral Order Traversal**: \(O(m \times n)\) since each element is processed once.
- **Diagonal Traversal**: \(O(m \times n)\) as each element is visited.

### Space Complexity:

- **Row-wise/Column-wise Traversal**: \(O(1)\) (not counting the output).
- **Spiral Order Traversal**: \(O(m \times n)\) for the output.
- **Diagonal Traversal**: \(O(m \times n)\) for the output.

---

### Applications:

- Image processing (e.g., convolution operations).
- Matrix-related algorithms, such as searching and sorting.
- Solving puzzles or games that involve grid-based traversal.

---

### Summary

Matrix traversal is an essential skill in data structures and algorithms, providing a foundation for more complex algorithms. Understanding various traversal techniques, such as row-wise, column-wise, spiral, and diagonal traversal, allows for efficient data manipulation and problem-solving across a wide range of applications.


### 19. **Prefix Sum**

**Concept**:
The prefix sum technique is a powerful method used to efficiently calculate the sum of a subarray or sub-range in an array. By preprocessing the array into a prefix sum array, we can answer multiple range sum queries in constant time \(O(1)\) after an initial \(O(n)\) preprocessing step.

---

### Definition:

Given an array \(arr\) of length \(n\), the prefix sum array \(prefix\) is defined as:
\[
prefix[i] = arr[0] + arr[1] + ... + arr[i-1]
\]
This means that the \(i\)-th element of the prefix sum array contains the sum of all elements from the start of the original array up to index \(i-1\).

### Formula for Range Sum:

To calculate the sum of elements between indices \(L\) and \(R\) in the original array, we can use:
\[
\text{sum}(L, R) = prefix[R + 1] - prefix[L]
\]

---

### Example:

Let's consider an example to illustrate the prefix sum technique.

**Original Array**:

```javascript
const arr = [1, 2, 3, 4, 5];
```

**Prefix Sum Array**:

```javascript
const prefix = [0, 1, 3, 6, 10, 15];
// prefix[0] = 0 (no elements summed)
// prefix[1] = 1 (arr[0])
// prefix[2] = 1 + 2 = 3
// prefix[3] = 1 + 2 + 3 = 6
// prefix[4] = 1 + 2 + 3 + 4 = 10
// prefix[5] = 1 + 2 + 3 + 4 + 5 = 15
```

### Implementation:

#### 1. Build Prefix Sum Array

```javascript
function buildPrefixSum(arr) {
  const prefix = new Array(arr.length + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  return prefix;
}

// Example usage
const arr = [1, 2, 3, 4, 5];
const prefixSum = buildPrefixSum(arr);
console.log(prefixSum); // Output: [0, 1, 3, 6, 10, 15]
```

#### 2. Calculate Range Sum

```javascript
function rangeSum(prefix, L, R) {
  return prefix[R + 1] - prefix[L];
}

// Example usage
const L = 1; // Starting index
const R = 3; // Ending index
console.log(rangeSum(prefixSum, L, R)); // Output: 9 (2 + 3 + 4)
```

### Time Complexity:

- **Building the Prefix Sum Array**: \(O(n)\), where \(n\) is the number of elements in the original array.
- **Range Sum Query**: \(O(1)\).

### Space Complexity:

- **Prefix Sum Array**: \(O(n)\) for storing the prefix sums.

---

### Applications:

- **Range Queries**: Quickly calculating the sum of elements over multiple queries.
- **Dynamic Programming**: Helpful in problems involving subarrays or continuous segments.
- **Frequency Arrays**: Calculating cumulative frequencies in statistics.

---

### Summary

The prefix sum technique allows for efficient computation of range sums in an array by preprocessing the data into a prefix sum array. This method significantly reduces the time complexity of range queries from \(O(n)\) to \(O(1)\), making it invaluable for numerous applications in data analysis, dynamic programming, and algorithm optimization.


### 20. **Heap Pattern**

**Concept**:
Heaps are a special type of binary tree that satisfy the heap property, where each parent node is either greater than (max-heap) or less than (min-heap) its children. This structure allows heaps to efficiently support priority queues and various algorithms, such as heapsort. The heap pattern primarily focuses on solving problems related to priority queues, selecting the largest or smallest elements, and merging sorted data.

---

### Characteristics of Heaps:

1. **Complete Binary Tree**: Heaps are complete binary trees, meaning all levels are fully filled except possibly for the last level, which is filled from left to right.
2. **Heap Property**:
   - In a **max-heap**, the value of each node is greater than or equal to the values of its children.
   - In a **min-heap**, the value of each node is less than or equal to the values of its children.

### Common Operations:

1. **Insert**: Adding a new element while maintaining the heap property.
2. **Delete**: Removing the root element (maximum or minimum) and restoring the heap.
3. **Peek**: Retrieving the root element without removing it.
4. **Heapify**: Transforming an arbitrary array into a valid heap.

### Applications:

- **Priority Queues**: Managing a collection of elements with varying priorities.
- **Heap Sort**: An efficient sorting algorithm based on the heap data structure.
- **Finding Kth Largest/Smallest Element**: Efficiently finding the k-th largest or smallest element in an array.
- **Merging K Sorted Lists**: Combining multiple sorted lists into one sorted list efficiently.

---

### Implementation of Heap Operations

#### 1. Building a Max-Heap

Here's a simple implementation of a max-heap in JavaScript:

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Insert an element into the heap
  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  // Bubble up to maintain the max-heap property
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] <= this.heap[parentIndex]) break;
      // Swap
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  // Remove and return the maximum element
  extractMax() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return max;
  }

  // Bubble down to maintain the max-heap property
  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild > element) swap = leftChildIndex;
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild > element) || 
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      // Swap
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }

  // Peek at the maximum element
  peek() {
    return this.heap[0] || null;
  }
}

// Example usage
const maxHeap = new MaxHeap();
maxHeap.insert(10);
maxHeap.insert(20);
maxHeap.insert(5);
console.log(maxHeap.peek()); // Output: 20
console.log(maxHeap.extractMax()); // Output: 20
console.log(maxHeap.peek()); // Output: 10
```

#### 2. Finding the Kth Largest Element

You can use a min-heap to efficiently find the k-th largest element in an array.

```javascript
function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
      minHeap.extractMin(); // Maintain only k largest elements
    }
  }
  return minHeap.peek();
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild < element) swap = leftChildIndex;
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild < element) || 
          (swap !== null && rightChild < leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }

  peek() {
    return this.heap[0] || null;
  }

  size() {
    return this.heap.length;
  }
}

// Example usage
const nums = [3, 2, 1, 5, 6, 4];
const k = 2;
console.log(findKthLargest(nums, k)); // Output: 5
```

### Time Complexity:

- **Insert**: \(O(\log n)\) for both min-heap and max-heap.
- **Extract**: \(O(\log n)\) for both min-heap and max-heap.
- **Building a Heap**: \(O(n)\) for creating a heap from an array.
- **Finding Kth Largest Element**: \(O(n \log k)\) if using a min-heap.

### Space Complexity:

- **Heap Storage**: \(O(n)\) for storing the elements in the heap.

---

### Summary

The heap pattern is essential for efficiently managing data with varying priorities, enabling fast access to the maximum or minimum elements. Its applications in priority queues, sorting algorithms, and finding k-th largest/smallest elements make it a crucial topic in data structures and algorithms. Understanding how to implement and manipulate heaps can significantly enhance problem-solving skills in algorithmic challenges.


### 21. **Monotonic Stack**

**Concept**:
A monotonic stack is a data structure that maintains its elements in a specific order, either monotonically increasing or monotonically decreasing. This means that as you traverse the stack, the values either never decrease (increasing) or never increase (decreasing). Monotonic stacks are particularly useful for solving problems involving "next greater" or "next smaller" elements, and for problems that involve intervals or ranges.

---

### Characteristics of Monotonic Stacks:

1. **Monotonic Behavior**: The elements in the stack are maintained in a sorted order based on the specified monotonic condition (increasing or decreasing).
2. **Dynamic Updates**: As new elements are processed, the stack can be adjusted to maintain the monotonic property.
3. **Efficient Lookups**: Monotonic stacks allow for efficient retrieval of the nearest larger or smaller element.

### Applications:

- **Next Greater Element**: Finding the next greater element for each element in an array.
- **Next Smaller Element**: Finding the next smaller element for each element in an array.
- **Trapping Rain Water**: Calculating how much rainwater can be trapped after it rains.
- **Histogram Area**: Finding the largest rectangle that can fit under a histogram.

---

### Common Operations:

1. **Push**: Add an element to the stack while maintaining the monotonic property.
2. **Pop**: Remove the top element from the stack.
3. **Top**: Retrieve the top element of the stack.

### Example Problem: Next Greater Element

Let's implement a solution for the **Next Greater Element** problem, where for each element in an array, we need to find the next greater element on its right.

#### Problem Statement:

Given an array of integers, return an array of the same size where each element is replaced by the next greater element to its right. If no such element exists, replace it with -1.

#### Example:

```plaintext
Input: [4, 5, 2, 10]
Output: [5, 10, 10, -1]
```

#### Implementation:

Here's how you can implement this using a monotonic stack in JavaScript:

```javascript
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1); // Initialize result array with -1
  const stack = []; // Monotonic stack

  for (let i = 0; i < nums.length; i++) {
    // While the stack is not empty and the current number is greater than the number at the index stored at the top of the stack
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const index = stack.pop(); // Pop the index
      result[index] = nums[i]; // Set the next greater element
    }
    stack.push(i); // Push the current index onto the stack
  }
  
  return result;
}

// Example usage
const nums = [4, 5, 2, 10];
console.log(nextGreaterElement(nums)); // Output: [5, 10, 10, -1]
```

### Explanation of the Code:

1. **Initialization**: We create a result array initialized with -1 (the default value for cases where no greater element exists) and an empty stack.
2. **Traversal**: We iterate through the input array. For each element:
   - We check if the current element is greater than the element at the index stored at the top of the stack.
   - If it is, we pop the index from the stack and set the corresponding position in the result array to the current element (the next greater element).
3. **Push**: We then push the current index onto the stack for future comparisons.
4. **Return**: Finally, we return the result array containing the next greater elements.

### Time Complexity:

- **Overall**: \(O(n)\), since each element is pushed and popped from the stack at most once.

### Space Complexity:

- **Stack**: \(O(n)\) in the worst case, where all elements are pushed onto the stack.

---

### Example Problem: Trapping Rain Water

Now, let’s consider another problem where we can utilize a monotonic stack to calculate how much water can be trapped between the heights of bars represented in an array.

#### Problem Statement:

Given an array of non-negative integers representing the heights of bars, compute how much water can be trapped after raining.

#### Example:

```plaintext
Input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
```

#### Implementation:

Here's the implementation using a monotonic stack:

```javascript
function trap(height) {
  const stack = [];
  let waterTrapped = 0;

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (stack.length === 0) break; // No left boundary

      const distance = i - stack[stack.length - 1] - 1; // Distance to the left boundary
      const boundedHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
      waterTrapped += distance * boundedHeight; // Calculate trapped water
    }
    stack.push(i); // Push current index onto the stack
  }
  
  return waterTrapped;
}

// Example usage
const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(heights)); // Output: 6
```

### Explanation of the Code:

1. **Initialization**: We create an empty stack and a variable to keep track of the total water trapped.
2. **Traversal**: We iterate through the array:
   - If the current height is greater than the height of the bar at the index stored at the top of the stack, it indicates that water can be trapped.
   - We pop the top index and check if the stack is not empty (to ensure we have a left boundary).
   - Calculate the distance to the left boundary and the bounded height.
   - Multiply these values to find the trapped water and add it to the total.
3. **Push**: We push the current index onto the stack.
4. **Return**: Finally, we return the total water trapped.

### Time Complexity:

- **Overall**: \(O(n)\), since each element is pushed and popped from the stack at most once.

### Space Complexity:

- **Stack**: \(O(n)\) in the worst case, where all elements are pushed onto the stack.

---

### Summary

Monotonic stacks provide an efficient way to handle problems involving the next greater or smaller elements and related interval problems. By maintaining a specific order of elements, monotonic stacks allow for quick lookups and efficient processing, making them a powerful tool in algorithm design. Understanding how to implement and utilize monotonic stacks can significantly improve your ability to tackle a variety of algorithmic challenges.


### 22. **Flood Fill Algorithm**

**Concept**:
The Flood Fill algorithm is a method used to determine the area connected to a given node in a multi-dimensional array (like a grid or an image) and fill it with a specific color or value. It is commonly used in graphics applications (like paint bucket tools in image editing software) and for solving problems involving connected components in grids.

The algorithm can be implemented using either a depth-first search (DFS) or breadth-first search (BFS) approach, making it flexible for different scenarios.

---

### Characteristics:

1. **Recursive or Iterative**: Flood Fill can be implemented recursively or iteratively using a queue or stack.
2. **Color Replacement**: It changes the color (or value) of connected pixels/nodes starting from a given point.
3. **4-directional or 8-directional**: The algorithm can be adapted to consider 4-directional (up, down, left, right) or 8-directional (including diagonals) movement.

---

### Applications:

- **Graphics Editing**: Used in tools to fill areas with color.
- **Game Development**: To find connected regions or determine the area a player can reach.
- **Image Processing**: For segmenting images and region filling.
- **Maze Solving**: To mark paths or visited areas in a maze.

---

### Example Problem: Flood Fill

#### Problem Statement:

You are given a 2D grid representing an image, where each pixel in the image is represented by an integer. Given a starting pixel (x, y) and a new color, the task is to replace the color of the starting pixel and all adjacent pixels with the new color.

#### Example:

```plaintext
Input: 
image = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1]
]
sr = 1, sc = 1, newColor = 2

Output: 
[
  [2, 2, 2],
  [2, 2, 0],
  [1, 0, 1]
]
```

#### Implementation:

Here's how to implement the Flood Fill algorithm using a recursive approach in JavaScript:

```javascript
function floodFill(image, sr, sc, newColor) {
    const oldColor = image[sr][sc];
    if (oldColor === newColor) return image; // No need to change color

    function fill(x, y) {
        // Check if the current position is out of bounds
        if (x < 0 || x >= image.length || y < 0 || y >= image[0].length) {
            return;
        }
        // Check if the current pixel is not the old color
        if (image[x][y] !== oldColor) {
            return;
        }
      
        // Change the color
        image[x][y] = newColor;

        // Recursively fill adjacent pixels
        fill(x + 1, y); // Down
        fill(x - 1, y); // Up
        fill(x, y + 1); // Right
        fill(x, y - 1); // Left
    }

    fill(sr, sc); // Start filling from the initial pixel
    return image;
}

// Example usage
const image = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1]
];
const sr = 1, sc = 1, newColor = 2;

console.log(floodFill(image, sr, sc, newColor));
// Output: [
//   [2, 2, 2],
//   [2, 2, 0],
//   [1, 0, 1]
// ]
```

### Explanation of the Code:

1. **Initial Check**: We check if the old color is the same as the new color. If so, we return the original image, as there's nothing to change.
2. **Recursive Function**: The `fill` function performs the filling operation:
   - It checks if the current pixel position is out of bounds.
   - It verifies if the current pixel's color matches the old color that needs to be replaced.
   - If both checks pass, it changes the color of the pixel and recursively calls itself for the four adjacent pixels (up, down, left, right).
3. **Starting Point**: We call the `fill` function starting from the specified pixel (sr, sc).
4. **Return Result**: Finally, we return the modified image.

### Time Complexity:

- **Overall**: \(O(N)\), where \(N\) is the number of pixels in the image. In the worst case, all pixels may need to be processed.

### Space Complexity:

- **Recursion Stack**: \(O(N)\) in the worst case for the recursion stack if all pixels are filled. For iterative BFS, it would also be \(O(N)\) due to the queue.

---

### Summary

The Flood Fill algorithm is a versatile technique for working with connected components in grids. It can be easily adapted for various applications and can be implemented using both DFS and BFS approaches. Understanding how to apply and optimize this algorithm can significantly enhance your problem-solving skills in computer graphics and related areas.
