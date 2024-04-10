function isIsomorphic(s, t) {
    if (s.length !== t.length) return false; // Different lengths cannot be isomorphic
    
    const sMap = {}; // Map to store mappings from characters in s to characters in t
    const tMap = {}; // Map to store mappings from characters in t to characters in s
    
    // Iterate through each character in both strings simultaneously
    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];
        
        // Check if the current characters are already mapped
        if (sMap[charS] !== undefined) {
            // Ensure consistency of the mapping
            if (sMap[charS] !== charT) return false;
        } else {
            sMap[charS] = charT; // Create a mapping from charS to charT
        }
        
        // Check if the current characters in t are already mapped
        if (tMap[charT] !== undefined) {
            // Ensure consistency of the mapping
            if (tMap[charT] !== charS) return false;
        } else {
            tMap[charT] = charS; // Create a mapping from charT to charS
        }
    }
    
    // If no inconsistencies are found, strings are isomorphic
    return true;
}

// Test the function
console.log(isIsomorphic("egg", "add")); // Output: true
