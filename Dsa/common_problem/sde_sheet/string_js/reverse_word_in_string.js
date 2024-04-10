function reverseWords(s) {
    // Trim leading and trailing spaces and split the string into an array of words
    const words = s.trim().split(/\s+/);
    
    // Reverse the array of words and join them with a single space
    return words.reverse().join(' ');
}

// Test the function
const s = "the sky is blue";
console.log(reverseWords(s)); // Output: "blue is sky the"
