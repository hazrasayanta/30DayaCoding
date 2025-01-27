function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
  
    let a = 0, b = 1;
  
    for (let i = 2; i <= n; i++) {
      const next = a + b;
      a = b;
      b = next;
    }
  
    return b;
  }
  
  // Example usage:
  console.log(fib(0)); // 0
  console.log(fib(1)); // 1
  console.log(fib(2)); // 1
  console.log(fib(3)); // 2
  console.log(fib(4)); // 3
  console.log(fib(5)); // 5
  console.log(fib(6)); // 8
  console.log(fib(7)); // 13


// Alternative Solutions:

// 1. Recursive Approach (Naive): 
function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fib(n - 1) + fib(n - 2);
  }

// Time Complexity: O(2^n) (Exponential growth due to redundant calculations)
// Space Complexity: O(n) (Call stack)

// 2. Recursive with Memoization:
function fib(n, memo = {}) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (memo[n]) return memo[n];
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
  }

//   Time Complexity: O(n) (Avoids redundant calculations by caching results)
//   Space Complexity: O(n) (Call stack + memo object)
  
  