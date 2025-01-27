Here is an efficient implementation of the `fib(n)` function using an  **iterative approach** :

### Code:

```javascript
/**
 * @param {number} n
 * @return {number}
 */
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
```

### Time Complexity:

* **O(n)** : The function iterates from `2` to `n`, performing a constant amount of work in each iteration.

### Space Complexity:

* **O(1)** : The function uses only two variables (`a` and `b`) to store intermediate results, without creating additional data structures like arrays.

---

### Alternative Solutions:

1. **Recursive Approach (Naive)** :

```javascript
   function fib(n) {
     if (n === 0) return 0;
     if (n === 1) return 1;
     return fib(n - 1) + fib(n - 2);
   }
```

* **Time Complexity** : O(2^n) (Exponential growth due to redundant calculations)
* **Space Complexity** : O(n) (Call stack)

1. **Recursive with Memoization** :

```javascript
   function fib(n, memo = {}) {
     if (n === 0) return 0;
     if (n === 1) return 1;
     if (memo[n]) return memo[n];
     memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
     return memo[n];
   }
```

* **Time Complexity** : O(n) (Avoids redundant calculations by caching results)
* **Space Complexity** : O(n) (Call stack + memo object)

### Conclusion:

The **iterative approach** is the most optimal solution in terms of both time and space. It avoids recursion's overhead while achieving O(1) space complexity.
