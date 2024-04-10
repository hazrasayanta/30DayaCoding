function beautySum(s) {
    let sum = 0;

    // Step 1: Iterate through all possible substrings
    for (let i = 0; i < s.length; i++) {
        let charCount = new Map(); // Map to store character frequencies

        // Step 2: Count frequency of characters in the substring
        for (let j = i; j < s.length; j++) {
            let char = s[j];
            charCount.set(char, (charCount.get(char) || 0) + 1);

            // Step 3: Calculate difference between most and least frequent characters
            const freqValues = [...charCount.values()];
            const maxFreq = Math.max(...freqValues);
            const minFreq = Math.min(...freqValues);
            const beauty = maxFreq - minFreq;

            // Step 4: Add beauty of substring to sum
            sum += beauty;
        }
    }

    return sum;
}

// Test cases
console.log(beautySum("aabcb")); // Output: 5
console.log(beautySum("aabcbaa")); // Output: 17
