function canShift(s, goal) {
    if (s.length !== goal.length) {
        return false; // If the lengths of s and goal are different, they can't be made equal by shifting
    }

    // Concatenate s with itself
    const concatenatedS = s + s;

    // Check if goal is a substring of concatenatedS
    return concatenatedS.includes(goal);
}

// Test cases
console.log(canShift("abcde", "cdeab")); // Output: true
console.log(canShift("abcde", "abced")); // Output: false
