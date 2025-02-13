
## **🔹 JavaScript Function Methods and Their Polyfills**

In JavaScript, functions are objects, and they come with built-in methods like `.call()`, `.apply()`, and `.bind()`. Understanding these methods and their polyfills is crucial for interviews.

---

### **✅ Q1: What is `call()` in JavaScript?**

### **1️⃣ `.call()` Method**

✔ **Purpose:** Calls a function with a given `this` value and arguments passed one by one.

✔ **Modifies `this`:** Explicitly sets `this` inside the function.

✔ **Executes Immediately.**

🔹 **Example:**

```js
function greet(role) {
  console.log(`Hello, my name is ${this.name}, and I am a ${role}.`);
}

const user = { name: "Sayanta" };

greet.call(user, "Developer"); // ✅ "Hello, my name is Sayanta, and I am a Developer."
```

---

### **2️⃣ Polyfill for `.call()`**

✔ The `.call()` method sets `this` and executes the function immediately.

🔹 **Custom Implementation:**

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window; // Default to global object if `null`
  const fnSymbol = Symbol(); // Create a unique property
  context[fnSymbol] = this; // Assign function to object
  const result = context[fnSymbol](...args); // Execute function
  delete context[fnSymbol]; // Clean up
  return result;
};

// ✅ Usage:
greet.myCall(user, "Developer"); // "Hello, my name is Sayanta, and I am a Developer."
```

---

### **✅ Q2: What is `apply()` in JavaScript?**

### **1️⃣ `.apply()` Method**

✔ **Purpose:** Calls a function with a given `this` value and an array of arguments.

✔ **Executes Immediately.**

✔ **Similar to `.call()`, but arguments are passed as an array.**

🔹 **Example:**

```js
greet.apply(user, ["Developer"]); // ✅ "Hello, my name is Sayanta, and I am a Developer."
```

---

### **2️⃣ Polyfill for `.apply()`**

✔ Works the same as `.call()`, except it takes arguments as an array.

🔹 **Custom Implementation:**

```js
Function.prototype.myApply = function (context, args) {
  context = context || window;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...(args || [])); // Spread operator for arguments
  delete context[fnSymbol];
  return result;
};

// ✅ Usage:
greet.myApply(user, ["Developer"]);
```

---

### **✅ Q3: What is `bind()` in JavaScript?**

### **1️⃣ `.bind()` Method**

✔ **Purpose:** Returns a new function with `this` bound to a specific object.

✔ **Does NOT execute immediately.**

✔ **Useful when passing functions as callbacks.**

🔹 **Example:**

```js
const boundGreet = greet.bind(user);
boundGreet("Developer"); // ✅ "Hello, my name is Sayanta, and I am a Developer."
```

---

### **2️⃣ Polyfill for `.bind()`**

✔ `.bind()` returns a new function instead of executing immediately.

🔹 **Custom Implementation:**

```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this; // Preserve reference to the original function
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]); // Combine stored and new arguments
  };
};

// ✅ Usage:
const boundGreetPolyfill = greet.myBind(user);
boundGreetPolyfill("Developer"); // "Hello, my name is Sayanta, and I am a Developer."
```

---

### **✅ Q4: What is the difference between `call()`, `apply()`, and `bind()`?**

| Method      | Execution                       | Arguments                   | Returns                 |
| ----------- | ------------------------------- | --------------------------- | ----------------------- |
| `call()`  | Executes Immediately            | Passed**one by one**  | Function's return value |
| `apply()` | Executes Immediately            | Passed as an**array** | Function's return value |
| `bind()`  | Returns a**new function** | Passed**one by one**  | New function reference  |

---

### **✅ Q5: When should you use `call()`, `apply()`, or `bind()`?**

✔ Use **`call()`** when arguments are known beforehand.

✔ Use **`apply()`** when arguments are in an array.

✔ Use **`bind()`** when you need to return a new function with a fixed `this`.

---

### **🚀 Interview Tip:**

When answering function method questions, always mention:

🔹 **What it does?**

🔹 **How it modifies `this`?**

🔹 **When to use it?**

🔹 **Its Polyfill (for advanced interviews).**

---

Hope this helps! Let me know if you need more clarifications. 🚀🔥
