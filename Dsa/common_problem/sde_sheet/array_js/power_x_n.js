function pow(x, n) {
    if (n === 0) {
        return 1;
    } else if (n < 0) {
        return 1 / pow(x, -n);
    } else if (n % 2 === 0) {
        const half = pow(x, n / 2);
        return half * half;
    } else {
        return x * pow(x, n - 1);
    }
}

// Test case
const x = 2.00000;
const n = 10;
console.log(pow(x, n)); // Output: 1024
