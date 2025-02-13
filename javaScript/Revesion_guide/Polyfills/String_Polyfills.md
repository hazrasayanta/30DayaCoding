# 🚀 **JavaScript String Methods & Polyfills – Interview Guide**

In JavaScript, strings come with built-in methods like `.trim()`, `.includes()`, `.startsWith()`, `.endsWith()`, etc. Understanding their functionality and polyfills is crucial for interviews.

---

## **✅ Q1: What is `.trim()` and how to implement its polyfill?**

### **1️⃣ `.trim()` Method**

✔ **Purpose:** Removes **leading and trailing** whitespaces from a string.

✔ **Does NOT modify the original string.**

✔ **Returns:** A new string without extra spaces.

🔹 **Example:**

```js
const str = "   Hello World!   ";
console.log(str.trim()); // ✅ "Hello World!"
```

---

### **2️⃣ Polyfill for `.trim()`**

✔ Uses **RegEx** to remove spaces from both ends.

🔹 **Custom Implementation:**

```js
String.prototype.myTrim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

// ✅ Usage:
const customTrimmed = "   Hello World!   ".myTrim();
console.log(customTrimmed); // ✅ "Hello World!"
```

---

## **✅ Q2: What is `.includes()` and how to implement its polyfill?**

### **1️⃣ `.includes()` Method**

✔ **Purpose:** Checks if a substring exists in a string.

✔ **Returns:** `true` if found, otherwise `false`.

✔  **Case-sensitive** .

🔹 **Example:**

```js
console.log("JavaScript is awesome".includes("awesome")); // ✅ true
```

---

### **2️⃣ Polyfill for `.includes()`**

✔ Uses `indexOf()` to check for substring existence.

🔹 **Custom Implementation:**

```js
String.prototype.myIncludes = function (search, start = 0) {
  return this.indexOf(search, start) !== -1;
};

// ✅ Usage:
console.log("JavaScript is awesome".myIncludes("awesome")); // ✅ true
console.log("JavaScript".myIncludes("Python")); // ✅ false
```

---

## **✅ Q3: What is `.startsWith()` and how to implement its polyfill?**

### **1️⃣ `.startsWith()` Method**

✔ **Purpose:** Checks if a string **begins** with a specific substring.

✔ **Returns:** `true` or `false`.

✔  **Case-sensitive** .

🔹 **Example:**

```js
console.log("Hello World".startsWith("Hello")); // ✅ true
```

---

### **2️⃣ Polyfill for `.startsWith()`**

✔ Uses `substring()` to compare the beginning of the string.

🔹 **Custom Implementation:**

```js
String.prototype.myStartsWith = function (search, pos = 0) {
  return this.substring(pos, pos + search.length) === search;
};

// ✅ Usage:
console.log("Hello World".myStartsWith("Hello")); // ✅ true
console.log("JavaScript".myStartsWith("Script")); // ✅ false
```

---

## **✅ Q4: What is `.endsWith()` and how to implement its polyfill?**

### **1️⃣ `.endsWith()` Method**

✔ **Purpose:** Checks if a string **ends** with a specific substring.

✔ **Returns:** `true` or `false`.

✔  **Case-sensitive** .

🔹 **Example:**

```js
console.log("Hello World".endsWith("World")); // ✅ true
```

---

### **2️⃣ Polyfill for `.endsWith()`**

✔ Uses `substring()` to compare the ending.

🔹 **Custom Implementation:**

```js
String.prototype.myEndsWith = function (search, length = this.length) {
  return this.substring(length - search.length, length) === search;
};

// ✅ Usage:
console.log("Hello World".myEndsWith("World")); // ✅ true
console.log("JavaScript".myEndsWith("Java")); // ✅ false
```

---

## **✅ Q5: What is `.repeat()` and how to implement its polyfill?**

### **1️⃣ `.repeat()` Method**

✔ **Purpose:** Repeats a string **n** times.

✔ **Returns:** A new concatenated string.

🔹 **Example:**

```js
console.log("Hi!".repeat(3)); // ✅ "Hi!Hi!Hi!"
```

---

### **2️⃣ Polyfill for `.repeat()`**

✔ Uses a loop to concatenate the string.

🔹 **Custom Implementation:**

```js
String.prototype.myRepeat = function (count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += this;
  }
  return result;
};

// ✅ Usage:
console.log("Hi!".myRepeat(3)); // ✅ "Hi!Hi!Hi!"
```

---

## **✅ Q6: What is `.padStart()` and `.padEnd()` and their polyfills?**

### **1️⃣ `.padStart()` Method**

✔ **Purpose:** Pads the beginning of a string with a given character until it reaches a specified length.

✔ **Returns:** A new padded string.

🔹 **Example:**

```js
console.log("5".padStart(3, "0")); // ✅ "005"
```

---

### **2️⃣ Polyfill for `.padStart()`**

✔ Uses a loop to add padding.

🔹 **Custom Implementation:**

```js
String.prototype.myPadStart = function (targetLength, padString = " ") {
  let padding = "";
  while (padding.length + this.length < targetLength) {
    padding += padString;
  }
  return padding.substring(0, targetLength - this.length) + this;
};

// ✅ Usage:
console.log("5".myPadStart(3, "0")); // ✅ "005"
```

---

### **3️⃣ `.padEnd()` Method**

✔ **Purpose:** Pads the end of a string with a given character until it reaches a specified length.

✔ **Returns:** A new padded string.

🔹 **Example:**

```js
console.log("5".padEnd(3, "0")); // ✅ "500"
```

---

### **4️⃣ Polyfill for `.padEnd()`**

✔ Uses a loop to add padding.

🔹 **Custom Implementation:**

```js
String.prototype.myPadEnd = function (targetLength, padString = " ") {
  let padding = "";
  while (padding.length + this.length < targetLength) {
    padding += padString;
  }
  return this + padding.substring(0, targetLength - this.length);
};

// ✅ Usage:
console.log("5".myPadEnd(3, "0")); // ✅ "500"
```

---

## **🚀 Interview Tip:**

🔹 Explain **use cases, return values, and performance** considerations for each method.

🔹 Implement **polyfills** to show deep understanding.

🔹 **Key Differences:**

* `.trim()` removes spaces, `.padStart()` and `.padEnd()` add them.
* `.includes()` checks for substrings, `.startsWith()` and `.endsWith()` check positions.
* `.repeat()` duplicates a string.

---

🔥 **Master these string methods and polyfills, and you'll ace JavaScript interviews!** 🚀
