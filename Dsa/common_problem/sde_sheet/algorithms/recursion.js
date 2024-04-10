// Factorial function using recursion
function factorial(n) {
    // Base case: if n is 0 or 1, return 1
    if (n === 0 || n === 1) {
        return 1;
    } else {
        // Recursive case: n * factorial(n - 1)
        return n * factorial(n - 1);
    }
}

// Example usage
console.log(factorial(5)); // Output: 120 (5! = 5 * 4 * 3 * 2 * 1 = 120)
