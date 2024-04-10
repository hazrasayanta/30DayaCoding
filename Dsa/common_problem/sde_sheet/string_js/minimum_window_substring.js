function minWindow(s, t) {
  const targetMap = new Map();
  for (const char of t) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }

  let left = 0;
  let right = 0;
  let minLength = Infinity;
  let minStart = 0;
  let count = targetMap.size;

  while (right < s.length) {
    const char = s[right];
    if (targetMap.has(char)) {
      targetMap.set(char, targetMap.get(char) - 1);
      if (targetMap.get(char) === 0) count--;
    }
    right++;

    while (count === 0) {
      if (right - left < minLength) {
        minLength = right - left;
        minStart = left;
      }
      const leftChar = s[left];
      if (targetMap.has(leftChar)) {
        targetMap.set(leftChar, targetMap.get(leftChar) + 1);
        if (targetMap.get(leftChar) > 0) count++;
      }
      left++;
    }
  }

  return minLength === Infinity
    ? ''
    : s.substring(minStart, minStart + minLength);
}

// Test case
console.log(minWindow('ADOBECODEBANC', 'ABC')); // Output: "BANC"
