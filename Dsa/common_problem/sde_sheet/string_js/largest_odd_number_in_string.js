function largestOddNumber(num) {
    let largestOdd = '';
    let currentOdd = '';

    for (let i = 0; i < num.length; i++) {
        const digit = parseInt(num[i]);
        
        if (digit % 2 !== 0) {
            currentOdd += digit.toString();
            if (currentOdd.length > largestOdd.length) {
                largestOdd = currentOdd;
            }
        } else {
            currentOdd = '';
        }
    }

    return largestOdd;
}

// Test cases
console.log(largestOddNumber("52")); // Output: "5"
