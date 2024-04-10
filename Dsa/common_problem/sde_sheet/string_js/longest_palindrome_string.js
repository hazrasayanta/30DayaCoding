function longestPalindrome(s) {
    if (s.length <= 1) return s; // Base case: return the input if it's empty or has one character
    
    let start = 0, end = 0; // Initialize variables to store start and end indices of the longest palindrome
    
    // Function to expand around a center and find palindrome
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    
    // Iterate through each character in the string
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(i, i); // Check for palindromes with odd length
        const len2 = expandAroundCenter(i, i + 1); // Check for palindromes with even length
        const len = Math.max(len1, len2); // Get the maximum length
        
        // Update start and end indices if a longer palindrome is found
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    
    // Return the longest palindrome substring
    return s.substring(start, end + 1);
}

// Test the function
console.log(longestPalindrome("babad")); // Output: "bab"
