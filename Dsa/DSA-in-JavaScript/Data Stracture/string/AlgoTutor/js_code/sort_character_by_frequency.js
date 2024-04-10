function frequencySort(s) {
    // Step 1: Count the frequency of each character
    const charFrequency = new Map();
    for (let char of s) {
        charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
    }

    // Step 2: Sort characters based on frequency in descending order
    const sortedChars = [...charFrequency.keys()].sort((a, b) => charFrequency.get(b) - charFrequency.get(a));

    // Step 3: Construct the sorted string
    let sortedString = "";
    for (let char of sortedChars) {
        sortedString += char.repeat(charFrequency.get(char));
    }

    return sortedString;
}

// Test cases
console.log(frequencySort("tree")); // Output: "eert"
console.log(frequencySort("cccaaa")); // Output: "aaaccc"
console.log(frequencySort("Aabb")); // Output: "bbAa"
