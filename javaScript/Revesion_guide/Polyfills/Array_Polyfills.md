# 🚀 **JavaScript Array Methods & Polyfills – Interview Guide**

In JavaScript, arrays come with powerful built-in methods like `.map()`, `.filter()`, `.reduce()`, etc. Understanding their functionality and polyfills is crucial for JavaScript interviews.

---

## **✅ Q1: What is `.map()` and how to implement its polyfill?**

### **1️⃣ `.map()` Method**

✔ **Purpose:** Creates a **new array** by applying a function to each element.

✔ **Does NOT modify the original array.**

✔ **Returns:** A new array with transformed values.

🔹 **Example:**

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // ✅ [2, 4, 6]
```

---

### **2️⃣ Polyfill for `.map()`**

✔ Uses a loop to apply the callback function to each element.

✔ Returns a new array without modifying the original.

🔹 **Custom Implementation:**

```js
Array.prototype.myMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// ✅ Usage:
const customDoubled = numbers.myMap(num => num * 2);
console.log(customDoubled); // ✅ [2, 4, 6]
```

---

## **✅ Q2: What is `.filter()` and how to implement its polyfill?**

### **1️⃣ `.filter()` Method**

✔ **Purpose:** Returns a **new array** containing only elements that satisfy a condition.

✔ **Does NOT modify the original array.**

✔ **Returns:** A filtered array.

🔹 **Example:**

```js
const nums = [1, 2, 3, 4];
const evens = nums.filter(num => num % 2 === 0);

console.log(evens); // ✅ [2, 4]
```

---

### **2️⃣ Polyfill for `.filter()`**

✔ Uses a loop to check each element against a condition.

🔹 **Custom Implementation:**

```js
Array.prototype.myFilter = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// ✅ Usage:
const customEvens = nums.myFilter(num => num % 2 === 0);
console.log(customEvens); // ✅ [2, 4]
```

---

## **✅ Q3: What is `.reduce()` and how to implement its polyfill?**

### **1️⃣ `.reduce()` Method**

✔ **Purpose:** Reduces an array to a **single value** (sum, product, etc.).

✔ **Takes an accumulator and current value as arguments.**

✔ **Returns:** A single computed value.

🔹 **Example:**

```js
const sum = [1, 2, 3].reduce((acc, num) => acc + num, 0);
console.log(sum); // ✅ 6
```

---

### **2️⃣ Polyfill for `.reduce()`**

✔ Loops through the array and accumulates a result.

🔹 **Custom Implementation:**

```js
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  
  return accumulator;
};

// ✅ Usage:
const customSum = [1, 2, 3].myReduce((acc, num) => acc + num, 0);
console.log(customSum); // ✅ 6
```

---

## **✅ Q4: What is `.forEach()` and how to implement its polyfill?**

### **1️⃣ `.forEach()` Method**

✔ **Purpose:** Iterates over an array and executes a function for each element.

✔ **Does NOT return anything (undefined).**

✔ **Useful for performing actions (e.g., logging).**

🔹 **Example:**

```js
[1, 2, 3].forEach(num => console.log(num));
```

---

### **2️⃣ Polyfill for `.forEach()`**

✔ Loops through the array and applies the function.

🔹 **Custom Implementation:**

```js
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

// ✅ Usage:
[1, 2, 3].myForEach(num => console.log(num));
```

---

## **✅ Q5: What is `.find()` and how to implement its polyfill?**

### **1️⃣ `.find()` Method**

✔ **Purpose:** Returns the **first element** that satisfies a condition.

✔ **Returns:** The found element or `undefined` if no match is found.

🔹 **Example:**

```js
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const user = users.find(u => u.id === 2);
console.log(user); // ✅ { id: 2, name: "Bob" }
```

---

### **2️⃣ Polyfill for `.find()`**

✔ Loops through the array and returns the first match.

🔹 **Custom Implementation:**

```js
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

// ✅ Usage:
const customUser = users.myFind(u => u.id === 2);
console.log(customUser); // ✅ { id: 2, name: "Bob" }
```

---

## **✅ Q6: What is `.some()` and `.every()` and their polyfills?**

### **1️⃣ `.some()` Method**

✔ **Purpose:** Returns `true` if **at least one** element satisfies the condition.

✔ **Returns:** `true` or `false`.

🔹 **Example:**

```js
const hasEven = [1, 3, 5, 8].some(num => num % 2 === 0);
console.log(hasEven); // ✅ true
```

🔹 **Polyfill:**

```js
Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};
```

---

### **2️⃣ `.every()` Method**

✔ **Purpose:** Returns `true` only if **all** elements satisfy the condition.

✔ **Returns:** `true` or `false`.

🔹 **Example:**

```js
const allEven = [2, 4, 6].every(num => num % 2 === 0);
console.log(allEven); // ✅ true
```

🔹 **Polyfill:**

```js
Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};
```

---

## **🚀 Interview Tip:**

🔹 Explain the **purpose, return value, and mutability** of each method.

🔹 Implement **polyfills** to show deep knowledge.

🔹 **Key Differences:**

* `.map()`  **returns a new array** , `.forEach()` does  **not** .
* `.filter()` keeps  **matching elements** , `.find()` returns  **first match** .
* `.some()` checks for  **at least one match** , `.every()` checks  **all match** .

---

🔥 **Master these methods and polyfills, and you'll ace JavaScript interviews!** 🚀
