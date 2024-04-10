function intToRoman(num) {
    const symbols = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
    const values = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    
    let result = "";
    
    for (let i = values.length - 1; i >= 0; i--) {
        while (num >= values[i]) {
            result += symbols[i];
            num -= values[i];
        }
    }
    
    return result;
}

// Test cases
console.log(intToRoman(3)); // Output: "III"
console.log(intToRoman(4)); // Output: "IV"
console.log(intToRoman(9)); // Output: "IX"
console.log(intToRoman(58)); // Output: "LVIII"
console.log(intToRoman(1994)); // Output: "MCMXCIV"
