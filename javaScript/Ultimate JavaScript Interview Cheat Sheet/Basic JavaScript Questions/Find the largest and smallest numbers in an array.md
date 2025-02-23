# 💡 **Question:** How do you find the largest and smallest numbers in an array in JavaScript?

👉 **Answer:**

To find the **largest and smallest numbers** in an array, we can use multiple approaches with different efficiencies.

---

### **1️⃣ Using `Math.min()` and `Math.max()` with Spread Operator (Best for Small Arrays - O(n))**

```js
function findMinMax(arr) {
    return {
        min: Math.min(...arr),
        max: Math.max(...arr)
    };
}

console.log(findMinMax([3, 1, 7, 9, 2, 8])); // Output: { min: 1, max: 9 }
```

🔹 **Key Points to Mention:**

✔ Uses `Math.min()` and `Math.max()` with the spread operator.

✔ **Time Complexity: O(n)** but can be inefficient for very large arrays due to spreading (`...`).

✔ Best for  **small to medium-sized arrays** .

---

### **2️⃣ Using a Loop (Best for Large Arrays - O(n))**

```js
function findMinMax(arr) {
    let min = arr[0], max = arr[0];

    for (let num of arr) {
        if (num < min) min = num;
        if (num > max) max = num;
    }

    return { min, max };
}

console.log(findMinMax([3, 1, 7, 9, 2, 8])); // Output: { min: 1, max: 9 }
```

🔹 **Key Points to Mention:**

✔ **Most efficient for large arrays** (O(n), no extra space).

✔  **Avoids using spread operator** , making it memory-efficient.

✔ Works well even if the array contains negative numbers.

---

### **3️⃣ Using `reduce()` (Functional Approach - O(n))**

```js
function findMinMax(arr) {
    return arr.reduce((acc, num) => {
        acc.min = Math.min(acc.min, num);
        acc.max = Math.max(acc.max, num);
        return acc;
    }, { min: Infinity, max: -Infinity });
}

console.log(findMinMax([3, 1, 7, 9, 2, 8])); // Output: { min: 1, max: 9 }
```

🔹 **Key Points to Mention:**

✔ Uses functional programming with `reduce()`.

✔  **O(n) time complexity** , but might be less readable.

---

### **4️⃣ Using `sort()` (Less Efficient - O(n log n))**

```js
function findMinMax(arr) {
    arr.sort((a, b) => a - b);
    return { min: arr[0], max: arr[arr.length - 1] };
}

console.log(findMinMax([3, 1, 7, 9, 2, 8])); // Output: { min: 1, max: 9 }
```

🔹 **Key Points to Mention:**

❌ **O(n log n) complexity** (not optimal for large datasets).

✔  **Easy to understand but slower than O(n) methods** .

---

### **What to Say in the Interview:**

🗣 *"The best way to find the smallest and largest numbers in an array is by using a simple loop, which has **O(n) time complexity** and is memory-efficient. For smaller arrays, using `Math.min(...arr)` and `Math.max(...arr)` is convenient but not ideal for large datasets due to spreading. A `reduce()` approach is another functional alternative. Sorting the array is possible, but it is inefficient with **O(n log n) complexity** and should be avoided for this problem."*

👉 **Final Answer:**

*"For best performance in large datasets, use a simple loop to track `min` and `max` values in O(n) time."* 🚀
