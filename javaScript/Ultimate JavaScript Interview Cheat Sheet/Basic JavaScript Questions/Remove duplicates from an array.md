# 💡 **Question:** How do you remove duplicates from an array in JavaScript?

👉 **Answer:**

There are multiple ways to remove duplicates from an array efficiently. Below are the most common methods:

---

### **1️⃣ Using `Set()` (Best Performance - O(n))**

```js
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Output: [1, 2, 3, 4, 5]
```

🔹 **Key Points to Mention:**

✔ `Set` stores only unique values, automatically removing duplicates.

✔  **Time Complexity: O(n)** ,  **Space Complexity: O(n)** .

✔ **Best for performance** when order doesn't matter.

---

### **2️⃣ Using a Hash Map (Preserves Order - O(n))**

```js
function removeDuplicates(arr) {
    let uniqueElements = {};
    return arr.filter(item => !uniqueElements[item] && (uniqueElements[item] = true));
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Output: [1, 2, 3, 4, 5]
```

🔹 **Key Points to Mention:**

✔ Uses an **object as a lookup table** to track seen values.

✔ **Preserves original order** unlike `Set()`.

✔  **Time Complexity: O(n)** ,  **Space Complexity: O(n)** .

---

### **3️⃣ Using `filter()` and `indexOf()` (O(n²) - Less Efficient)**

```js
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Output: [1, 2, 3, 4, 5]
```

🔹 **Key Points to Mention:**

❌ Calls `indexOf()` for each element → **O(n²) complexity** (not ideal for large arrays).

✔ Preserves order but  **not the most efficient** .

---

### **4️⃣ Using `reduce()` (Preserves Order - O(n))**

```js
function removeDuplicates(arr) {
    return arr.reduce((acc, item) => {
        if (!acc.includes(item)) acc.push(item);
        return acc;
    }, []);
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Output: [1, 2, 3, 4, 5]
```

🔹 **Key Points to Mention:**

✔ Uses `reduce()` to accumulate unique values.

✔  **Preserves order** , but  **`includes()` makes it O(n²) in worst case** .

---

### **What to Say in the Interview:**

🗣 *"The most efficient way to remove duplicates from an array is by using a `Set()`, which provides **O(n) time complexity** and automatically ensures uniqueness. However, if preserving order is important, a hash map (`{}` or `Map()`) approach is preferred. Other methods like `filter()` with `indexOf()` or `reduce()` work but are **less efficient** for large arrays."*

👉 **Final Answer:**

*"For best performance, use `new Set(arr)`, but if order matters, use a hash map."* 🚀
