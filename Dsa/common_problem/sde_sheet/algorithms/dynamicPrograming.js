// Fibonacci function using dynamic programming (memoization)
function fibonacci(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    if (n <= 1) {
        return n;
    }
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// Example usage
console.log("Fibonacci of 6:", fibonacci(6)); // Output: 8 (0, 1, 1, 2, 3, 5, 8)
