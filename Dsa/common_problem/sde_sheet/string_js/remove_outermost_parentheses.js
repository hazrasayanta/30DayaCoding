function removeOuterParentheses(s) {
    let result = ''; // Initialize an empty string to store the result
    let balance = 0; // Initialize a balance variable to track parentheses balance
    let startIndex = 0; // Initialize startIndex to mark the start of each primitive string

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            balance++; // Increment balance when encountering '('
        } else {
            balance--; // Decrement balance when encountering ')'
        }

        // Check if the balance becomes zero, indicating the end of a primitive string
        if (balance === 0) {
            // Remove outer parentheses and append the primitive string to the result
            result += s.substring(startIndex + 1, i);
            startIndex = i + 1; // Update startIndex for the next primitive string
        }
    }

    return result;
}

// Test the function
const s = "(()())(())";
console.log(removeOuterParentheses(s)); // Output: "()()()"
