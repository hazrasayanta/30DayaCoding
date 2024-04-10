function isPalindrome(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

function validPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            // Check if skipping either left or right character makes the substring a palindrome
            return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
        }
        left++;
        right--;
    }
    
    // If the loop finishes without finding any non-palindromic characters, return true
    return true;
}

// Test cases
console.log(validPalindrome("aba")); // Output: true
console.log(validPalindrome("abca")); // Output: true
console.log(validPalindrome("abc")); // Output: false
