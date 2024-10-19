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


### 8. **Sliding Window**

**Concept**:
The sliding window technique is a way to optimize problems that involve arrays or sequences by keeping a window of elements that moves over the data. This is especially useful for problems involving finding the maximum, minimum, or sum of subarrays of a given size or some other form of subarray processing.

Instead of recalculating results from scratch each time you move the window, you "slide" it, making small updates at each step. This significantly reduces the time complexity from O(n²) to O(n) in many cases.

**Why it’s useful**:

- **Efficiency**: It reduces time complexity by avoiding redundant recalculations.
- **Common use cases**: It’s great for problems like finding the longest substring, maximum sum subarray, or counting distinct elements in subarrays.

**Types of Sliding Window**:

1. **Fixed-size window**: The window size remains constant as it moves.
2. **Dynamic-size window**: The window size can grow or shrink depending on the problem constraints.

---

### Example problem: **Maximum Sum Subarray of Size K**

*Problem*: Given an array of integers and a number `k`, find the maximum sum of a subarray of size `k`.

#### Brute Force Approach:

You could sum every possible subarray of size `k` (using two nested loops), but this would take O(n*k) time, which is inefficient for large arrays.

#### Sliding Window Approach:

We can maintain a window of size `k` and slide it across the array while keeping track of the sum.

#### JavaScript Solution:

```javascript
function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;

  // Calculate the sum of the first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  maxSum = windowSum;

  // Slide the window across the array
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];  // Update the sum by sliding the window
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Test
const arr = [2, 1, 5, 1, 3, 2];
const k = 3;
console.log(maxSumSubarray(arr, k));  // Output: 9 (subarray [5, 1, 3])
```

**Explanation**:

- **Initial window**: Calculate the sum of the first `k` elements.
- **Slide**: Move the window by adding the next element and removing the previous element from the sum.
- **Update max sum**: After each slide, check if the current window sum is the maximum.

**Time complexity**: O(n), where `n` is the length of the array.
**Space complexity**: O(1), since we only need a few extra variables.

---

### Example problem: **Longest Substring Without Repeating Characters**

*Problem*: Given a string, find the length of the longest substring without repeating characters.

#### Sliding Window Approach:

We can use a dynamic sliding window that grows or shrinks as we find repeating characters.

#### JavaScript Solution:

```javascript
function lengthOfLongestSubstring(s) {
  let start = 0, maxLength = 0;
  const seenChars = new Map();

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    // If we have seen the character and it's within the current window
    if (seenChars.has(char) && seenChars.get(char) >= start) {
      start = seenChars.get(char) + 1;
    }

    seenChars.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Test
console.log(lengthOfLongestSubstring("abcabcbb"));  // Output: 3 (substring "abc")
```

**Explanation**:

- **Start with an empty window**: As you iterate over the string, add characters to the window.
- **If a character repeats**: Adjust the start of the window to exclude the previous occurrence of the repeating character.
- **Track max length**: After processing each character, check if the current window is the longest one seen so far.

**Time complexity**: O(n), where `n` is the length of the string.
**Space complexity**: O(min(n, m)), where `m` is the size of the character set (since we store each unique character).

---

### Example problem: **Smallest Subarray with Sum Greater Than or Equal to S**

*Problem*: Given an array of positive integers and a positive integer `S`, find the length of the smallest contiguous subarray whose sum is greater than or equal to `S`. Return 0 if no such subarray exists.

#### Sliding Window Approach:

We can use a shrinking window. Start by expanding the window (by adding elements) until the sum is greater than or equal to `S`. Then, shrink the window from the left side to find the smallest subarray.

#### JavaScript Solution:

```javascript
function minSubArrayLen(s, arr) {
  let minLength = Infinity, windowSum = 0, start = 0;

  for (let end = 0; end < arr.length; end++) {
    windowSum += arr[end];

    // Shrink the window as small as possible while the window sum is >= S
    while (windowSum >= s) {
      minLength = Math.min(minLength, end - start + 1);
      windowSum -= arr[start];
      start++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

// Test
console.log(minSubArrayLen(7, [2, 1, 5, 2, 3, 2]));  // Output: 2 (subarray [5, 2])
```

**Explanation**:

- **Expand the window**: Increase the window size by adding elements until the sum of the window is greater than or equal to `S`.
- **Shrink the window**: Try to minimize the window size by removing elements from the left while maintaining the sum constraint.

**Time complexity**: O(n), where `n` is the length of the array.
**Space complexity**: O(1), since we only need extra space for a few variables.

---

### Example problem: **Longest Substring with At Most K Distinct Characters**

*Problem*: Given a string, find the length of the longest substring that contains at most `k` distinct characters.

#### Sliding Window Approach:

Use a dynamic sliding window. Expand the window by adding characters until you have more than `k` distinct characters. Then, shrink the window until you are back to `k` distinct characters.

#### JavaScript Solution:

```javascript
function longestSubstrKDistinct(s, k) {
  let start = 0, maxLength = 0;
  const charCount = new Map();

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    // Add the character to the window and count its occurrences
    charCount.set(char, (charCount.get(char) || 0) + 1);

    // If we have more than k distinct characters, shrink the window
    while (charCount.size > k) {
      const leftChar = s[start];
      charCount.set(leftChar, charCount.get(leftChar) - 1);
      if (charCount.get(leftChar) === 0) {
        charCount.delete(leftChar);
      }
      start++;
    }

    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Test
console.log(longestSubstrKDistinct("araaci", 2));  // Output: 4 (substring "araa")
```

**Explanation**:

- **Expand the window**: Add characters to the window while counting distinct characters.
- **Shrink the window**: If there are more than `k` distinct characters, remove characters from the left until the constraint is satisfied again.

**Time complexity**: O(n), where `n` is the length of the string.
**Space complexity**: O(k), where `k` is the number of distinct characters.

---

### Sliding Window Pattern Summary:

- **Optimal for subarray or substring problems**: Especially when working with fixed or variable window sizes.
- **Efficient**: Reduces redundant recalculations by maintaining a window and updating its state incrementally.
- **Flexible**: Works well for both fixed-size and variable-size windows, depending on the problem.
- Sliding window is often combined with hash maps or arrays to track elements within the window.

---

### Key Problems to Practice:

1. **Find Maximum in Sliding Window**: Find the maximum value in every subarray of size `k` as the window slides over the array.
2. **Count Occurrences of Anagrams**: Given a string and a pattern, find all anagrams of the pattern in the string using a sliding window.
3. **Fruit Into Baskets**: Given a list of trees, find the maximum amount of fruit you can collect from exactly two types of trees.


### 9. **Two Pointers**

**Concept**:
The two-pointer technique involves using two pointers to traverse an array or list. It’s particularly useful for problems that require comparisons or calculations between elements in a single pass. The pointers can move in the same direction (forward) or opposite directions (one from the beginning and one from the end).

**Why it’s useful**:

- **Efficiency**: Reduces time complexity by avoiding nested loops in certain scenarios.
- **Simplicity**: Often leads to cleaner and more readable code for problems involving pairs, triplets, or subsequences.

---

### Types of Two Pointers:

1. **Moving in the same direction**: Both pointers start at the same position and move towards the end, often used for problems like finding a pair that meets a condition.
2. **Moving in opposite directions**: One pointer starts at the beginning and the other at the end, useful for problems like searching for pairs that add up to a specific value.

---

### Example problem: **Container With Most Water**

*Problem*: Given an array of heights representing the height of vertical lines, find two lines that together with the x-axis form a container that can hold the most water.

#### Brute Force Approach:

You could check every possible pair of lines to find the maximum area, which would take O(n²) time.

#### Two Pointers Approach:

Use two pointers, one at the beginning and one at the end of the array. Calculate the area and then move the pointer pointing to the shorter line inward, since moving the taller line will not yield a larger area.

#### JavaScript Solution:

```javascript
function maxArea(height) {
  let maxArea = 0;
  let left = 0, right = height.length - 1;

  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const area = width * currentHeight;
    maxArea = Math.max(maxArea, area);

    // Move the pointer for the shorter line
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

// Test
const heights = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(heights));  // Output: 49
```

**Explanation**:

- **Calculate the area**: Use the shorter of the two lines as the height and the distance between the two pointers as the width.
- **Update pointers**: Move the pointer that points to the shorter line to potentially find a taller line.

**Time complexity**: O(n), where `n` is the number of heights.
**Space complexity**: O(1), since we only use a few extra variables.

---

### Example problem: **3Sum**

*Problem*: Given an array of integers, find all unique triplets in the array that add up to zero.

#### Two Pointers Approach:

First, sort the array. For each element, use two pointers to find pairs that sum to the negative of the current element.

#### JavaScript Solution:

```javascript
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;  // Skip duplicates

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        // Skip duplicates
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// Test
console.log(threeSum([-1,0,1,2,-1,-4]));  // Output: [[-1,-1,2],[-1,0,1]]
```

**Explanation**:

- **Sort the array**: This allows you to avoid duplicates and use the two-pointer technique effectively.
- **Find pairs**: For each element, use two pointers to find pairs that, together with the current element, sum to zero.

**Time complexity**: O(n²), where `n` is the length of the array (due to the nested loop).
**Space complexity**: O(1), for the result array (excluding the input).

---

### Example problem: **Remove Duplicates from Sorted Array**

*Problem*: Given a sorted array, remove the duplicates in-place such that each element appears only once and returns the new length of the array.

#### Two Pointers Approach:

Use one pointer to iterate through the array and another to track the position of unique elements.

#### JavaScript Solution:

```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let uniqueIndex = 1;  // Start from the second element

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[uniqueIndex] = nums[i];
      uniqueIndex++;
    }
  }

  return uniqueIndex;
}

// Test
const nums = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(nums));  // Output: 5 (unique elements are [0,1,2,3,4])
```

**Explanation**:

- **Iterate through the array**: If the current element is different from the previous one, it is unique.
- **Update the unique index**: Place the unique element at the current unique index.

**Time complexity**: O(n), where `n` is the length of the array.
**Space complexity**: O(1), since we modify the array in-place.

---

### Example problem: **Valid Palindrome II**

*Problem*: Given a string, determine if it can be a palindrome after deleting at most one character.

#### Two Pointers Approach:

Use two pointers starting from the ends of the string and move toward the center, allowing for one character deletion if characters don't match.

#### JavaScript Solution:

```javascript
function validPalindrome(s) {
  const isPalindrome = (str, left, right, count) => {
    while (left < right) {
      if (str[left] !== str[right]) {
        if (count === 1) return false; // Already deleted a character
        return isPalindrome(str, left + 1, right, count + 1) || isPalindrome(str, left, right - 1, count + 1);
      }
      left++;
      right--;
    }
    return true;
  };

  return isPalindrome(s, 0, s.length - 1, 0);
}

// Test
console.log(validPalindrome("abca"));  // Output: true
```

**Explanation**:

- **Recursive helper function**: Check if the substring is a palindrome, allowing for a character deletion.
- **Check both possibilities**: If there's a mismatch, check by either removing the left or right character.

**Time complexity**: O(n), where `n` is the length of the string (in the worst case).
**Space complexity**: O(n) due to recursion stack.

---

### Two Pointers Pattern Summary:

- **Efficient for sorted arrays**: Works particularly well when the array is sorted or has a specific order.
- **Flexible**: Can be adapted for various problems involving pairs, triplets, or subsequences.
- **Easy to implement**: Often leads to straightforward and efficient solutions.

---

### Key Problems to Practice:

1. **Find the Peak Element**: Find an element which is greater than or equal to its neighbors using two pointers.
2. **Sum of Two Integers**: Given a sorted array, find if there exists a pair with a given sum using two pointers.
3. **Pair with Given Sum**: Similar to the above but without needing to return the actual pairs.


### 10. **Fast and Slow Pointers (Tortoise and Hare)**

**Concept**:
The fast and slow pointers technique involves using two pointers that move at different speeds—one moving twice as fast as the other. This pattern is especially useful for problems involving cycles in linked lists or finding the middle of a list.

**Why it’s useful**:

- **Cycle Detection**: Efficiently identifies if a cycle exists in a sequence.
- **Finding Midpoints**: Easily locates the middle element of a linked list or array.

---

### Example problem: **Linked List Cycle**

*Problem*: Given a linked list, determine if it has a cycle in it.

#### Approach:

Use one pointer (slow) that moves one step at a time and another pointer (fast) that moves two steps at a time. If they meet, a cycle exists; if the fast pointer reaches the end, there is no cycle.

#### JavaScript Solution:

```javascript
function hasCycle(head) {
  if (!head) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;          // Move slow pointer by 1
    fast = fast.next.next;     // Move fast pointer by 2

    if (slow === fast) {
      return true;             // Cycle detected
    }
  }

  return false;                // No cycle
}

// Example linked list node structure
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// Test
const head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(-4);
head.next.next.next.next = head.next;  // Creates a cycle
console.log(hasCycle(head));  // Output: true
```

**Explanation**:

- **Pointers initialization**: Start both pointers at the head of the linked list.
- **Loop through the list**: Move `slow` by one and `fast` by two until they meet or `fast` reaches the end.

**Time complexity**: O(n), where `n` is the number of nodes in the linked list.
**Space complexity**: O(1), since only a few pointers are used.

---

### Example problem: **Middle of the Linked List**

*Problem*: Given a linked list, return the middle node. If there are two middle nodes, return the second middle node.

#### Approach:

Use the fast and slow pointers to find the middle node. When the fast pointer reaches the end, the slow pointer will be at the middle.

#### JavaScript Solution:

```javascript
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;          // Move slow pointer by 1
    fast = fast.next.next;     // Move fast pointer by 2
  }

  return slow;                // Slow will be at the middle
}

// Test
const head2 = new ListNode(1);
head2.next = new ListNode(2);
head2.next.next = new ListNode(3);
head2.next.next.next = new ListNode(4);
head2.next.next.next.next = new ListNode(5);
console.log(middleNode(head2).val);  // Output: 3
```

**Explanation**:

- **Simultaneous movement**: `slow` moves one step while `fast` moves two steps.
- **Return the slow pointer**: When `fast` reaches the end, `slow` will be at the middle node.

**Time complexity**: O(n), where `n` is the number of nodes in the linked list.
**Space complexity**: O(1).

---

### Example problem: **Linked List Cycle II**

*Problem*: Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

#### Approach:

First, detect the cycle using the fast and slow pointers. If a cycle is detected, find the entry point by moving one pointer to the head and keeping the other at the meeting point.

#### JavaScript Solution:

```javascript
function detectCycle(head) {
  let slow = head;
  let fast = head;

  // First step: detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) { // Cycle detected
      let entry = head;
      while (entry !== slow) {
        entry = entry.next;
        slow = slow.next;
      }
      return entry; // Entry point of the cycle
    }
  }

  return null; // No cycle
}

// Test
const head3 = new ListNode(1);
head3.next = new ListNode(2);
head3.next.next = head3;  // Creates a cycle
console.log(detectCycle(head3));  // Output: ListNode { val: 1, next: ... }
```

**Explanation**:

- **Cycle detection**: Similar to the previous cycle detection problem.
- **Finding the entry point**: Move one pointer to the head and let the other pointer remain at the meeting point; they will meet at the cycle's entry point.

**Time complexity**: O(n).
**Space complexity**: O(1).

---

### Fast and Slow Pointers Pattern Summary:

- **Cycle detection**: Effective for identifying cycles in data structures.
- **Finding midpoints**: Simple way to find middle elements in lists.
- **Clean implementation**: Often results in straightforward and readable code.

---

### Key Problems to Practice:

1. **Palindrome Linked List**: Determine if a linked list is a palindrome.
2. **Happy Number**: Use fast and slow pointers to determine if a number is a "happy" number (reaching 1).
3. **Intersection of Two Linked Lists**: Determine the intersection point of two linked lists.


### 11. **Merge Intervals**

**Concept**:
The merge intervals pattern is used to process a list of intervals, combining overlapping intervals into a single interval. This pattern is commonly used in problems related to scheduling and event handling.

**Why it’s useful**:

- **Overlap resolution**: Efficiently manages overlapping ranges or intervals.
- **Time complexity reduction**: Helps reduce the time complexity of certain problems by consolidating intervals.

---

### Example problem: **Merge Intervals**

*Problem*: Given a collection of intervals, merge all overlapping intervals.

#### Approach:

1. **Sort the intervals** based on the starting time.
2. Iterate through the sorted intervals and merge them if they overlap.
3. Add the merged intervals to the result list.

#### JavaScript Solution:

```javascript
function merge(intervals) {
  if (intervals.length === 0) return [];

  // Step 1: Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);
  
  const merged = [intervals[0]]; // Start with the first interval

  // Step 2: Iterate through the intervals
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    // If the current interval overlaps with the last merged one, merge them
    if (current[0] <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // No overlap, add the current interval to merged
      merged.push(current);
    }
  }

  return merged; // Return the merged intervals
}

// Test
const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log(merge(intervals)); // Output: [[1, 6], [8, 10], [15, 18]]
```

**Explanation**:

- **Sorting**: The intervals are sorted based on the start time to facilitate merging.
- **Merging**: For each interval, check if it overlaps with the last merged interval. If it does, update the end of the last merged interval; otherwise, add the current interval to the merged list.

**Time complexity**: O(n log n), where n is the number of intervals (due to sorting).
**Space complexity**: O(n) for storing the merged intervals.

---

### Example problem: **Insert Interval**

*Problem*: Given a set of non-overlapping intervals and a new interval, insert the new interval into the intervals (merging if necessary).

#### Approach:

1. **Sort** the intervals (if not already sorted).
2. Iterate through the intervals and determine where to insert the new interval.
3. Merge as necessary.

#### JavaScript Solution:

```javascript
function insert(intervals, newInterval) {
  const merged = [];
  let i = 0;

  // Step 1: Add all intervals before the new interval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    merged.push(intervals[i]);
    i++;
  }

  // Step 2: Merge the new interval with overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  merged.push(newInterval); // Add the merged new interval

  // Step 3: Add all remaining intervals
  while (i < intervals.length) {
    merged.push(intervals[i]);
    i++;
  }

  return merged; // Return the merged intervals
}

// Test
const intervals2 = [[1, 3], [6, 9]];
const newInterval = [2, 5];
console.log(insert(intervals2, newInterval)); // Output: [[1, 5], [6, 9]]
```

**Explanation**:

- **Adding non-overlapping intervals**: First, include all intervals that end before the new interval starts.
- **Merging**: Merge the new interval with any overlapping intervals.
- **Adding remaining intervals**: Finally, include all intervals that start after the new interval ends.

**Time complexity**: O(n), where n is the number of intervals (if sorted).
**Space complexity**: O(n) for storing the merged intervals.

---

### Merge Intervals Pattern Summary:

- **Sorting**: A critical first step in many interval problems.
- **Efficient merging**: Combining intervals reduces complexity in various applications.
- **Adaptability**: This pattern can be modified for various constraints (e.g., inclusive vs. exclusive overlaps).

---

### Key Problems to Practice:

1. **Meeting Rooms**: Determine the minimum number of meeting rooms required given a list of meeting time intervals.
2. **Employee Free Time**: Find the times when all employees are free based on their schedules.
3. **Minimum Interval to Include Each Query**: For a list of intervals and queries, find the minimum interval that contains each query.


### 12. **0/1 Knapsack Problem**

**Concept**:
The 0/1 Knapsack Problem is a classic problem in combinatorial optimization. It involves selecting a subset of items, each with a weight and a value, to maximize the total value without exceeding a given weight capacity. Each item can either be included (1) or excluded (0), hence the name "0/1".

**Why it’s useful**:

- **Optimization problems**: Common in resource allocation, budget management, and logistics.
- **Dynamic programming**: Serves as a foundational problem for understanding dynamic programming approaches.

---

### Example problem: **0/1 Knapsack Problem**

*Problem*: Given weights and values of `n` items, and a maximum weight capacity `W`, determine the maximum value that can be accommodated in the knapsack.

#### Approach:

1. **Dynamic Programming Table**: Create a DP table where `dp[i][w]` represents the maximum value that can be attained with the first `i` items and a maximum weight of `w`.
2. **Transition**: For each item, decide whether to include it or not based on its weight and value.

#### JavaScript Solution:

```javascript
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

  // Build the DP table
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        // Choose the maximum between including the item or not
        dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
      } else {
        dp[i][w] = dp[i - 1][w]; // Item cannot be included
      }
    }
  }

  return dp[n][capacity]; // Maximum value that can be obtained
}

// Test
const weights = [1, 2, 3];
const values = [10, 15, 40];
const capacity = 6;
console.log(knapsack(weights, values, capacity)); // Output: 55
```

**Explanation**:

- **DP Table Initialization**: Create a 2D DP array initialized to 0.
- **Filling the Table**: For each item and weight, decide whether to include the item based on its weight and value.
- **Final Result**: The maximum value is found in `dp[n][capacity]`.

**Time complexity**: O(n * W), where n is the number of items and W is the maximum weight.
**Space complexity**: O(n * W) for the DP table.

---

### Example problem: **Unbounded Knapsack Problem**

*Problem*: Similar to the 0/1 Knapsack, but you can use an unlimited number of each item. Find the maximum value that can be obtained with a given capacity.

#### Approach:

1. **DP Table**: Similar to the 0/1 Knapsack but with a slight adjustment in the transition step.
2. **Transition**: Instead of deciding to include the item once, check for each item how many times it can be included.

#### JavaScript Solution:

```javascript
function unboundedKnapsack(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);

  // Build the DP table
  for (let w = 0; w <= capacity; w++) {
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] <= w) {
        dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
      }
    }
  }

  return dp[capacity]; // Maximum value that can be obtained
}

// Test
const weights2 = [1, 2, 3];
const values2 = [10, 15, 40];
const capacity2 = 6;
console.log(unboundedKnapsack(weights2, values2, capacity2)); // Output: 80
```

**Explanation**:

- **1D DP Array**: Use a single-dimensional array to store the maximum values for weights from `0` to `capacity`.
- **Updating Values**: For each weight, update the maximum value based on how many times an item can be included.

**Time complexity**: O(W * n), where n is the number of items.
**Space complexity**: O(W) for the DP array.

---

### 0/1 Knapsack Pattern Summary:

- **Dynamic Programming**: A fundamental approach for optimization problems.
- **Adaptability**: The basic idea can be adapted for other variations (e.g., unbounded knapsack, bounded knapsack).
- **Problem-Solving**: Great for learning how to break down complex problems into simpler subproblems.

---

### Key Problems to Practice:

1. **Subset Sum Problem**: Given a set of integers, determine if there's a subset whose sum equals a given target.
2. **Minimum Coin Change Problem**: Find the minimum number of coins needed to make a specific amount with given denominations.
3. **Partition Equal Subset Sum**: Determine if a given set can be partitioned into two subsets with equal sum.


### 13. **Dynamic Programming (DP)**

**Concept**:
Dynamic programming is a method used to solve complex problems by breaking them down into simpler subproblems. It is particularly useful for optimization problems where overlapping subproblems exist, allowing for the storage of previously computed results to avoid redundant calculations.

**Why it’s useful**:

- **Efficiency**: Reduces the time complexity of problems that can be solved using recursive methods.
- **Optimality**: Helps in finding the optimal solution in problems that involve making a sequence of interrelated decisions.

---

### Example problem: **Fibonacci Sequence**

*Problem*: Calculate the nth Fibonacci number.

#### Recursive Approach:

The naive recursive approach has exponential time complexity due to overlapping subproblems.

#### JavaScript Solution (Recursive):

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test
console.log(fibonacci(10)); // Output: 55
```

**Time complexity**: O(2^n) (exponential).
**Space complexity**: O(n) (due to the call stack).

#### Dynamic Programming Approach:

We can use memoization or tabulation to solve this efficiently.

##### Memoization (Top-Down):

Store results of subproblems in a cache to avoid redundant calculations.

```javascript
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Test
console.log(fibonacciMemo(10)); // Output: 55
```

**Time complexity**: O(n) (linear).
**Space complexity**: O(n) (for memo storage).

##### Tabulation (Bottom-Up):

Build a table iteratively to store results of all subproblems.

```javascript
function fibonacciTab(n) {
  if (n <= 1) return n;
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Test
console.log(fibonacciTab(10)); // Output: 55
```

**Time complexity**: O(n) (linear).
**Space complexity**: O(n) (for the table).

---

### Example problem: **Longest Common Subsequence (LCS)**

*Problem*: Given two strings, find the length of their longest common subsequence.

#### Approach:

1. Create a 2D DP table where `dp[i][j]` represents the length of the LCS of the first `i` characters of string `A` and the first `j` characters of string `B`.
2. Use the following relations:
   - If characters match: `dp[i][j] = dp[i - 1][j - 1] + 1`
   - If they don’t match: `dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])`

#### JavaScript Solution:

```javascript
function longestCommonSubsequence(A, B) {
  const dp = Array(A.length + 1).fill(0).map(() => Array(B.length + 1).fill(0));

  for (let i = 1; i <= A.length; i++) {
    for (let j = 1; j <= B.length; j++) {
      if (A[i - 1] === B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // Characters match
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Characters do not match
      }
    }
  }

  return dp[A.length][B.length]; // Length of LCS
}

// Test
const A = "AGGTAB";
const B = "GXTXAYB";
console.log(longestCommonSubsequence(A, B)); // Output: 4 (GTAB)
```

**Time complexity**: O(m * n), where m and n are the lengths of the two strings.
**Space complexity**: O(m * n) for the DP table.

---

### Dynamic Programming Pattern Summary:

- **Optimization**: Ideal for problems where we can break down solutions into overlapping subproblems.
- **Memoization vs. Tabulation**: Understanding both techniques is crucial for solving different types of DP problems effectively.
- **Flexibility**: Can be adapted for a wide range of problems, including combinatorial, numerical, and optimization problems.

---

### Key Problems to Practice:

1. **0/1 Knapsack Problem**: Choose items to maximize value without exceeding capacity.
2. **Coin Change Problem**: Find the minimum number of coins needed to make a specific amount.
3. **Edit Distance**: Determine the minimum number of edits (insertions, deletions, substitutions) required to transform one string into another.


### 14. **Graph Algorithms**

**Concept**:
Graph algorithms are used to process and analyze graph structures, which consist of nodes (vertices) and edges connecting them. These algorithms are crucial in a variety of applications, including networking, pathfinding, and social networks.

**Why it’s useful**:

- **Networking**: Essential for routing protocols and network topology analysis.
- **Pathfinding**: Used in navigation systems, games, and robotics.
- **Data structure understanding**: Provides insights into how to efficiently manage and traverse data.

---

### Example problem: **Breadth-First Search (BFS)**

*Problem*: Given a graph represented as an adjacency list, traverse the graph starting from a given source node.

#### BFS Approach:

1. Use a queue to keep track of nodes to explore.
2. Mark nodes as visited to avoid cycles.
3. Explore neighbors level by level.

#### JavaScript Solution:

```javascript
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set();
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node); // Process the node

    // Visit each neighbor
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// Test
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};

bfs(graph, 'A'); // Output: A B C D E F
```

**Time complexity**: O(V + E), where V is the number of vertices and E is the number of edges.
**Space complexity**: O(V) for the visited set and queue.

---

### Example problem: **Depth-First Search (DFS)**

*Problem*: Traverse the same graph as in the BFS example, but using depth-first search.

#### DFS Approach:

1. Use a stack (or recursion) to explore as far down a branch as possible before backtracking.
2. Mark nodes as visited.

#### JavaScript Solution (Iterative):

```javascript
function dfs(graph, start) {
  const stack = [start];
  const visited = new Set();
  
  while (stack.length > 0) {
    const node = stack.pop();
  
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node); // Process the node

      // Visit each neighbor
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}

// Test
dfs(graph, 'A'); // Output: A C F E B D
```

#### JavaScript Solution (Recursive):

```javascript
function dfsRecursive(graph, node, visited = new Set()) {
  if (!visited.has(node)) {
    visited.add(node);
    console.log(node); // Process the node

    // Visit each neighbor
    for (const neighbor of graph[node]) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
}

// Test
dfsRecursive(graph, 'A'); // Output: A B D E F C
```

**Time complexity**: O(V + E).
**Space complexity**: O(V) for the visited set and stack (or recursion depth).

---

### Graph Algorithms Pattern Summary:

- **Traversal**: BFS and DFS are fundamental methods for exploring graphs.
- **Applications**: Useful for various problems like shortest paths, connected components, and network flow.
- **Understanding Graphs**: Knowing how to represent graphs (adjacency list vs. adjacency matrix) is crucial for implementing graph algorithms effectively.

---

### Key Problems to Practice:

1. **Shortest Path**: Use Dijkstra’s algorithm to find the shortest path from a source to all other nodes in a weighted graph.
2. **Connected Components**: Find all connected components in an undirected graph.
3. **Topological Sorting**: Given a directed acyclic graph (DAG), find a linear ordering of its vertices.


### 15. **Backtracking**

**Concept**:
Backtracking is a problem-solving technique that involves building up a solution incrementally and abandoning solutions (backtracking) as soon as it is determined that the current path cannot lead to a valid solution. It is often used for solving constraint satisfaction problems.

**Why it’s useful**:

- **Combinatorial Problems**: Efficiently finds solutions to problems involving combinations, permutations, or subsets.
- **Optimization**: Allows for exploring all possible configurations and finding the optimal solution.

---

### Example problem: **N-Queens Problem**

*Problem*: Place N queens on an N×N chessboard such that no two queens threaten each other.

#### Approach:

1. Use a backtracking function to try placing queens row by row.
2. For each row, try every column and check if placing a queen there is valid (i.e., no other queens in the same column or diagonals).
3. If a valid position is found, move to the next row. If no valid positions are available, backtrack to the previous row and try the next column.

#### JavaScript Solution:

```javascript
function solveNQueens(n) {
  const results = [];
  const board = Array(n).fill().map(() => Array(n).fill('.'));

  const isValid = (row, col) => {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false; // Check column
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false; // Check upper left diagonal
      if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false; // Check upper right diagonal
    }
    return true;
  };

  const backtrack = (row) => {
    if (row === n) {
      results.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q'; // Place queen
        backtrack(row + 1); // Recur to place next queen
        board[row][col] = '.'; // Remove queen (backtrack)
      }
    }
  };

  backtrack(0);
  return results;
}

// Test
console.log(solveNQueens(4)); // Output: All valid board configurations for 4 queens
```

**Time complexity**: O(N!), as the algorithm generates all possible configurations.
**Space complexity**: O(N) for the recursion stack and the board.

---

### Example problem: **Permutations**

*Problem*: Generate all possible permutations of a given array.

#### Approach:

1. Use a backtracking function that swaps elements to create new permutations.
2. Keep track of which elements have been used in the current permutation.
3. When the permutation is complete (i.e., its length equals the input array), add it to the result.

#### JavaScript Solution:

```javascript
function permute(nums) {
  const results = [];

  const backtrack = (path, used) => {
    if (path.length === nums.length) {
      results.push([...path]); // Add a complete permutation
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // Skip if already used
      used[i] = true; // Mark as used
      path.push(nums[i]); // Add to current permutation
      backtrack(path, used); // Recur
      path.pop(); // Backtrack
      used[i] = false; // Unmark for next permutation
    }
  };

  backtrack([], Array(nums.length).fill(false));
  return results;
}

// Test
console.log(permute([1, 2, 3])); // Output: All permutations of [1, 2, 3]
```

**Time complexity**: O(N!), as we generate all permutations.
**Space complexity**: O(N) for the recursion stack and the path.

---

### Backtracking Pattern Summary:

- **Recursive Structure**: Backtracking problems often use recursion with a base case and recursive calls.
- **State Management**: Keeping track of the current state (what has been used, current path) is essential.
- **Pruning**: The ability to abandon invalid paths quickly is key to efficiency.

---

### Key Problems to Practice:

1. **Subset Generation**: Generate all subsets of a set.
2. **Combination Sum**: Find all combinations of numbers that add up to a target value.
3. **Sudoku Solver**: Solve a given Sudoku puzzle using backtracking.


### 16. **Dynamic Programming (DP)**

**Concept**:
Dynamic programming is an optimization technique used to solve complex problems by breaking them down into simpler subproblems and storing the results of these subproblems to avoid redundant computations. It is typically used for problems that exhibit overlapping subproblems and optimal substructure.

**Why it’s useful**:

- **Efficiency**: Significantly reduces time complexity by avoiding repeated calculations.
- **Comprehensive Solutions**: Capable of providing optimal solutions for problems with many constraints.

---

### Example problem: **Fibonacci Sequence**

*Problem*: Calculate the Nth Fibonacci number.

#### DP Approach:

1. Use an array to store previously computed Fibonacci numbers.
2. Build up the solution iteratively.

#### JavaScript Solution (Bottom-Up Approach):

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // F(n) = F(n-1) + F(n-2)
  }
  return dp[n];
}

// Test
console.log(fibonacci(10)); // Output: 55
```

**Time complexity**: O(N).
**Space complexity**: O(N) for the DP array.

#### JavaScript Solution (Top-Down Approach with Memoization):

```javascript
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n]; // Return cached result
  if (n <= 1) return n;
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Test
console.log(fibonacciMemo(10)); // Output: 55
```

**Time complexity**: O(N) due to memoization.
**Space complexity**: O(N) for the memo object.

---

### Example problem: **Coin Change Problem**

*Problem*: Given an array of coin denominations and a total amount, find the number of ways to make the amount using the coins.

#### DP Approach:

1. Use a DP array where the index represents the amount, and the value at each index represents the number of ways to make that amount.
2. Iterate through each coin and update the DP array for each possible amount.

#### JavaScript Solution:

```javascript
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1; // Base case: 1 way to make amount 0

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin]; // Update ways to make amount
    }
  }
  return dp[amount];
}

// Test
console.log(coinChange([1, 2, 5], 5)); // Output: 4 (ways to make amount 5)
```

**Time complexity**: O(N * M), where N is the amount and M is the number of coins.
**Space complexity**: O(N) for the DP array.

---

### Dynamic Programming Pattern Summary:

- **Overlapping Subproblems**: Problems that can be divided into smaller, repeating subproblems.
- **Optimal Substructure**: The optimal solution of a problem can be constructed from optimal solutions of its subproblems.
- **Storage**: Store the results of subproblems in a table or array to avoid redundant calculations.

---

### Key Problems to Practice:

1. **Longest Common Subsequence (LCS)**: Find the longest subsequence present in both sequences.
2. **Knapsack Problem**: Given weights and values of items, determine the maximum value that can fit in a knapsack of a given capacity.
3. **Edit Distance**: Find the minimum number of operations required to convert one string into another.


### 17. **Greedy Algorithms**

**Concept**:
Greedy algorithms build up a solution piece by piece, always choosing the next piece that offers the most immediate benefit (or local optimum). They do not consider the larger problem, aiming for a quick and easy solution. Greedy algorithms work well for problems where local optimization leads to global optimization.

**Why it’s useful**:

- **Efficiency**: Greedy algorithms often have lower time complexity and can provide quick solutions.
- **Simplicity**: They are generally easier to implement and understand than dynamic programming solutions.

---

### Example problem: **Activity Selection Problem**

*Problem*: Given a set of activities with start and finish times, select the maximum number of activities that don't overlap.

#### Greedy Approach:

1. Sort the activities by their finish time.
2. Select the first activity, then select the next activity that starts after the last selected activity finishes.

#### JavaScript Solution:

```javascript
function activitySelection(activities) {
  // Sort activities based on finish times
  activities.sort((a, b) => a[1] - b[1]);

  const selectedActivities = [];
  let lastFinishTime = -1;

  for (const activity of activities) {
    if (activity[0] >= lastFinishTime) { // If the start time is greater than or equal to last finish time
      selectedActivities.push(activity); // Select this activity
      lastFinishTime = activity[1]; // Update last finish time
    }
  }
  
  return selectedActivities;
}

// Test
const activities = [[0, 6], [1, 4], [3, 5], [5, 7], [5, 9], [8, 9]];
console.log(activitySelection(activities)); // Output: [[1, 4], [5, 7], [8, 9]]
```

**Time complexity**: O(N log N), due to sorting.
**Space complexity**: O(N), for the selected activities array.

---

### Example problem: **Coin Change Problem (Minimum Coins)**

*Problem*: Given a set of coin denominations and an amount, find the minimum number of coins required to make that amount.

#### Greedy Approach:

1. Sort the coins in descending order.
2. Start with the largest coin and use as many of those coins as possible before moving to the next largest coin.

#### JavaScript Solution:

```javascript
function minCoins(coins, amount) {
  coins.sort((a, b) => b - a); // Sort coins in descending order
  let count = 0;

  for (const coin of coins) {
    while (amount >= coin) {
      amount -= coin; // Use this coin
      count++; // Increment count
    }
  }
  
  return amount === 0 ? count : -1; // Return -1 if amount cannot be formed
}

// Test
console.log(minCoins([1, 2, 5], 11)); // Output: 3 (5 + 5 + 1)
```

**Time complexity**: O(N log N) for sorting, O(N) for the greedy selection.
**Space complexity**: O(1) if we don’t consider the input array.

---

### Greedy Algorithm Pattern Summary:

- **Local Optimum**: Always choose the best option available at the moment without looking ahead.
- **Optimal Substructure**: The optimal solution can be constructed from optimal solutions of its subproblems, but unlike dynamic programming, greedy algorithms don’t guarantee an optimal solution for all problems.
- **Simple Implementation**: Generally easier to implement and requires less memory than dynamic programming solutions.

---

### Key Problems to Practice:

1. **Huffman Coding**: Construct an optimal prefix code based on frequencies of characters.
2. **Minimum Spanning Tree (MST)**: Find the minimum weight spanning tree of a graph using Prim’s or Kruskal’s algorithm.
3. **Dijkstra’s Algorithm**: Find the shortest path from a source vertex to all other vertices in a graph.
