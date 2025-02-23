# 💡 **Question:** How do you check if a string is a palindrome in JavaScript?

👉 **Answer:**

A **palindrome** is a word, phrase, or number that reads the same forward and backward (e.g., "racecar", "madam").

---

### **1️⃣ Using Two-Pointer Technique (Best for Performance)**

```js
function isPalindrome(str) {
    let left = 0, right = str.length - 1;
  
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
  
    return true;
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
```

🔹 **Key Points to Mention:**

✔ Uses **two pointers** to compare characters from both ends.

✔ **Time Complexity: O(n)** (efficient).

✔ **Space Complexity: O(1)** (in-place comparison).

---

### **2️⃣ Using String Reversal (Simple but Extra Space)**

```js
function isPalindrome(str) {
    return str === str.split("").reverse().join("");
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
```

🔹 **Key Points to Mention:**

✔ Uses `.split()`, `.reverse()`, and `.join()` to check if the reversed string is equal to the original.

✔  **Time Complexity: O(n)** , **Space Complexity: O(n)** (due to string splitting).

---

### **3️⃣ Using Recursion (Less Efficient for Large Strings)**

```js
function isPalindrome(str) {
    if (str.length <= 1) return true;
    if (str[0] !== str[str.length - 1]) return false;
    return isPalindrome(str.slice(1, -1));
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
```

🔹 **Key Points to Mention:**

✔ Elegant **recursive** approach.

✔ **Not ideal for large strings** (risk of stack overflow).

✔  **Time Complexity: O(n)** , **Space Complexity: O(n)** (due to recursion stack).

---

### **4️⃣ Ignoring Case & Special Characters (Real-World Use Case)**

```js
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Normalize string
    let left = 0, right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }

    return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("No 'x' in Nixon")); // true
console.log(isPalindrome("hello")); // false
```

🔹 **Key Points to Mention:**

✔ **Handles case insensitivity and removes special characters.**

✔ **Ideal for real-world palindrome checking.**

---

### **What to Say in the Interview:**

🗣 *"A palindrome is a string that reads the same forward and backward. The most efficient way to check this is by using the  **two-pointer approach** , which compares characters from both ends while moving towards the center. Alternatively, we can use `.reverse()`, but it requires extra space. A recursive approach also works but is not optimal for large strings. In real-world applications, we should normalize the input by removing non-alphanumeric characters and converting it to lowercase before checking."*

👉 **Final Answer:**

*"For performance and memory efficiency, the two-pointer approach is the best choice."* 🚀
