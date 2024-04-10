function lengthOfLastWord(s) {
    // Trim any trailing spaces
    s = s.trim();
    
    let length = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        // Iterate from the end of the string
        if (s[i] !== ' ') {
            // If current character is not a space, increment length
            length++;
        } else {
            // If current character is a space and length > 0, we have found the last word
            if (length > 0) {
                break;
            }
        }
    }
    
    return length;
}

// Test case
const s = "Hello World";
console.log(lengthOfLastWord(s)); // Output: 5
