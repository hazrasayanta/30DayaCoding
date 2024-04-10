function myAtoi(s) {
  let i = 0;
  let sign = 1;
  let result = 0;
  // Step 1: Ignore leading whitespace
  while (s[i] === ' ') {
    i++;
  }
  // Step 2: Determine sign
  if (s[i] === '+' || s[i] === '-') {
    sign = s[i] === '-' ? -1 : 1;
    i++;
  }
  // Step 3: Read digits until non-digit character or end of input
  while (i < s.length && /[0-9]/.test(s[i])) {
    result = result * 10 + parseInt(s[i]);
    i++;
  }
  // Step 4: Apply sign and handle overflow
  result *= sign;
  if (result < -(2 ** 31)) {
    return -(2 ** 31);
  } else if (result > 2 ** 31 - 1) {
    return 2 ** 31 - 1;
  }

  return result;
}

// Test cases
console.log(myAtoi('42')); // Output: 42
console.log(myAtoi('   -42')); // Output: -42
console.log(myAtoi('4193 with words')); // Output: 4193
console.log(myAtoi('words and 987')); // Output: 0
console.log(myAtoi('-91283472332')); // Output: -2147483648
