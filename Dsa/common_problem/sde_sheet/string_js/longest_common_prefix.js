function longestCommonPrefix(strs) {
    if (strs.length === 0) return ""; // If the array is empty, return an empty string
    
    let prefix = strs[0]; // Initialize the prefix with the first string
    
    // Iterate through the remaining strings in the array
    for (let i = 1; i < strs.length; i++) {
        // Iterate through characters of the current string and the prefix simultaneously
        for (let j = 0; j < prefix.length; j++) {
            // If the characters don't match or if we reach the end of the current string, update the prefix
            if (strs[i][j] !== prefix[j] || j === strs[i].length) {
                prefix = prefix.substring(0, j); // Update prefix to the common prefix found so far
                break; // Break out of the inner loop
            }
        }
        
        // If prefix is an empty string, there is no common prefix, so return immediately
        if (prefix === "") return "";
    }
    
    return prefix; // Return the longest common prefix
}

// Test the function
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
