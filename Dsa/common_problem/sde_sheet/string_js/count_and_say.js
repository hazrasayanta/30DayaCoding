function countAndSay(n) {
    if (n === 1) return '1';
    
    const prevTerm = countAndSay(n - 1);
    let count = 1;
    let result = '';
    
    for (let i = 0; i < prevTerm.length; i++) {
        if (prevTerm[i] === prevTerm[i + 1]) {
            count++;
        } else {
            result += count + prevTerm[i];
            count = 1;
        }
    }
    
    return result;
}

// Test cases
console.log(countAndSay(1)); // Output: "1"
console.log(countAndSay(2)); // Output: "11"
console.log(countAndSay(3)); // Output: "21"
console.log(countAndSay(4)); // Output: "1211"
console.log(countAndSay(5)); // Output: "111221"
