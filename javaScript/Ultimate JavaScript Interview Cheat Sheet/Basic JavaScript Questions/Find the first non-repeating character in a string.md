# 💡 **Question:** How do you find the first non-repeating character in a string in JavaScript?

👉 **Answer:**

We need to find the first character in a string that appears **only once** and return it. If all characters are repeating, return `null` or `-1`.

---

### **1️⃣ Using a Hash Map (Best Performance - O(n))**

```js
function firstNonRepeatingChar(str) {
    let charCount = {};

    // Count occurrences of each character
    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Find the first character with count 1
    for (let char of str) {
        if (charCount[char] === 1) return char;
    }

    return null; // Return null if no unique character is found
}

console.log(firstNonRepeatingChar("swiss"));  // Output: "w"
console.log(firstNonRepeatingChar("racecar")); // Output: "e"
console.log(firstNonRepeatingChar("aabb"));   // Output: null
```

🔹 **Key Points to Mention:**

✔ Uses a **hash map (object)** to store character counts.

✔ First pass to count characters, second pass to find the first unique one.

✔  **Time Complexity: O(n)** , **Space Complexity: O(1)** (since we only store characters).

---

### **2️⃣ Using a Map (Preserves Order - O(n))**

```js
function firstNonRepeatingChar(str) {
    let charMap = new Map();

    // Count occurrences of each character
    for (let char of str) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }

    // Find the first character with count 1
    for (let char of str) {
        if (charMap.get(char) === 1) return char;
    }

    return null;
}

console.log(firstNonRepeatingChar("swiss"));  // Output: "w"
console.log(firstNonRepeatingChar("racecar")); // Output: "e"
console.log(firstNonRepeatingChar("aabb"));   // Output: null
```

🔹 **Key Points to Mention:**

✔ `Map` maintains  **insertion order** , unlike plain objects.

✔  **Time Complexity: O(n)** ,  **Space Complexity: O(1)** .

---

### **3️⃣ Using Array Index (Less Efficient - O(n²))**

```js
function firstNonRepeatingChar(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
            return str[i];
        }
    }
    return null;
}

console.log(firstNonRepeatingChar("swiss"));  // Output: "w"
console.log(firstNonRepeatingChar("racecar")); // Output: "e"
console.log(firstNonRepeatingChar("aabb"));   // Output: null
```

🔹 **Key Points to Mention:**

❌ **Less efficient (O(n²))** due to multiple `indexOf()` and `lastIndexOf()` calls.

✔ Simple, but not ideal for large strings.

---

### **What to Say in the Interview:**

🗣 *"To find the first non-repeating character in a string, the best approach is using a **hash map (object or Map)** to store character counts. We first loop through the string to count occurrences, then iterate again to find the first character that appears once. This ensures an  **O(n) time complexity** , making it efficient. An alternative approach using `indexOf()` and `lastIndexOf()` works but has  **O(n²) complexity** , making it slower for large strings."*

👉 **Final Answer:**

*"The hash map approach is the best choice as it efficiently finds the first non-repeating character in  **O(n) time** ."* 🚀
