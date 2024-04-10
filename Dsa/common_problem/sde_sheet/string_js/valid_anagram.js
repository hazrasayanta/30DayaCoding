function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const charCount = new Map();

    // Count frequency of characters in s
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Decrement frequency of characters in t
    for (const char of t) {
        if (!charCount.has(char)) {
            return false; // Character not present in s
        }
        charCount.set(char, charCount.get(char) - 1);
        if (charCount.get(char) === 0) {
            charCount.delete(char);
        }
    }

    return charCount.size === 0;
}

// Test cases
console.log(isAnagram("anagram", "nagaram")); // Output: true
console.log(isAnagram("rat", "car")); // Output: false
