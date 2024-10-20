# Advance Patterens


Let's dive deeper into more advanced problem-solving patterns: **Dynamic Programming**, **Greedy Algorithms**, and **Backtracking**. Each of these techniques is powerful and widely used in solving optimization problems, combinatorial problems, and more.

---

### 1. **Dynamic Programming (DP)**

#### Concept:

Dynamic Programming is an optimization technique used to solve problems that can be broken down into overlapping subproblems, where the solution to larger problems depends on solutions to smaller subproblems. The core idea is to avoid redundant calculations by storing the results of solved subproblems (memoization) or iteratively building up the solution (tabulation).

#### Key Points:

- **Overlapping Subproblems**: The problem can be broken down into subproblems that are reused.
- **Optimal Substructure**: The optimal solution to the main problem can be constructed from the optimal solutions of its subproblems.
- **Memoization vs. Tabulation**: Memoization involves caching results using recursion, while tabulation fills up a table iteratively from the base case.

#### Common Use Cases:

- Fibonacci sequence.
- Longest Common Subsequence (LCS).
- Knapsack problem.
- Coin change problem.

#### Example Problem: **Fibonacci Sequence (Memoization)**

```javascript
function fibonacci(n, memo = {}) {
    if (n <= 1) return n; // Base case
    if (n in memo) return memo[n]; // Return cached result

    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo); // Recursion with memoization
    return memo[n];
}

// Example usage
console.log(fibonacci(10)); // Output: 55
```

#### Example Problem: **0/1 Knapsack Problem (Tabulation)**

```javascript
function knapsack(weights, values, W) {
    const n = values.length;
    const dp = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W]; // Max value
}

// Example usage
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const W = 7;
console.log(knapsack(weights, values, W)); // Output: 9
```

---

### 2. **Greedy Algorithm**

#### Concept:

A Greedy Algorithm builds up a solution piece by piece, always choosing the next piece that offers the most immediate benefit. This technique doesn't guarantee global optimization but is efficient for problems that exhibit the **Greedy Choice Property** and **Optimal Substructure**.

#### Key Points:

- **Greedy Choice Property**: A global optimum can be arrived at by selecting a local optimum at each step.
- **Optimal Substructure**: The solution to the problem can be constructed efficiently from optimal solutions to subproblems.
- **No Backtracking**: Unlike dynamic programming, greedy algorithms do not revise their previous decisions.

#### Common Use Cases:

- Activity Selection problem.
- Huffman coding (for data compression).
- Minimum Spanning Tree (Kruskal’s or Prim’s algorithm).
- Fractional Knapsack problem.

#### Example Problem: **Activity Selection (Interval Scheduling)**

```javascript
function activitySelection(activities) {
    activities.sort((a, b) => a[1] - b[1]); // Sort by end times
    let count = 1;
    let lastEndTime = activities[0][1];

    for (let i = 1; i < activities.length; i++) {
        if (activities[i][0] >= lastEndTime) { // If the next activity starts after the last one ends
            count++;
            lastEndTime = activities[i][1];
        }
    }

    return count;
}

// Example usage
const activities = [[1, 2], [3, 4], [0, 6], [5, 7], [8, 9], [5, 9]];
console.log(activitySelection(activities)); // Output: 4
```

---

### 3. **Backtracking**

#### Concept:

Backtracking is an exhaustive search algorithm where you build a solution incrementally and backtrack as soon as you realize that the current solution cannot lead to a valid result. It explores all possible solutions in a depth-first manner and is ideal for problems where the solution requires exploring multiple possibilities.

#### Key Points:

- **Recursive Exploration**: It explores one branch of possibilities until it reaches a dead-end or a valid solution, then backtracks to explore other branches.
- **Pruning**: Effective backtracking algorithms prune the search space by cutting off branches that are unlikely to yield a valid solution.
- **Exponential Time Complexity**: Backtracking can be time-consuming but is often the only feasible method for certain problems.

#### Common Use Cases:

- Solving puzzles (Sudoku, N-Queens).
- Permutations and combinations.
- Subset generation.
- Solving mazes.

#### Example Problem: **N-Queens Problem**

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function isSafe(board, row, col) {
        // Check upper column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check upper left diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check upper right diagonal
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    }

    function backtrack(row = 0) {
        if (row === n) {
            result.push(board.map(row => row.join(''))); // Valid solution found
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 'Q'; // Place queen
                backtrack(row + 1); // Explore further
                board[row][col] = '.'; // Backtrack
            }
        }
    }

    backtrack();
    return result;
}

// Example usage
console.log(solveNQueens(4)); // Output: all valid board configurations for 4-queens
```

---

### Summary

- **Dynamic Programming** is the go-to strategy for problems that can be broken down into overlapping subproblems with optimal substructure. Its efficiency comes from storing previously computed solutions.
- **Greedy Algorithms** work by selecting the locally optimal choice at each step with the hope of finding a globally optimal solution. They are fast but may not always produce the correct solution unless the problem has the right properties.
- **Backtracking** systematically explores all possible solutions by building up candidates and abandoning them (backtracking) when they are proven to be invalid or suboptimal.

These strategies are fundamental as you move into more complex algorithmic problem-solving. If you'd like more examples or deeper discussions on specific problems, feel free to ask!
