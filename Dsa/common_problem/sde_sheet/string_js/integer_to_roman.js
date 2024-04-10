function intToRoman(num) {
    // Define arrays for Roman numeral symbols and their corresponding values
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    
    let result = ''; // Initialize an empty string to store the Roman numeral
    
    // Iterate through the symbols array
    for (let i = 0; i < symbols.length; i++) {
        // While the input number is greater than or equal to the current value
        while (num >= values[i]) {
            // Append the corresponding symbol to the result string
            result += symbols[i];
            // Subtract the value from the input number
            num -= values[i];
        }
    }
    
    return result; // Return the final Roman numeral string
}

// Test the function
console.log(intToRoman(3)); // Output: "III"
