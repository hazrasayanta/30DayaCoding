function strStr(haystack, needle) {
    // If needle is an empty string, return 0
    if (needle === "") {
        return 0;
    }

    // Iterate through the haystack string
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        // Check if the substring starting at index i matches the needle
        if (haystack.substring(i, i + needle.length) === needle) {
            return i; // Return the index if found
        }
    }

    return -1; // Return -1 if not found
}

// Test case
console.log(strStr("sadbutsad", "sad")); // Output: 0
