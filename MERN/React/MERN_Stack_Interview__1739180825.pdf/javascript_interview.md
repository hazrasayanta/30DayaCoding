# Most asked question in javascript interview

## 1. Difference between javascript and other programming languages.

**=>** JavaScript differs from other programming languages in several key aspects:

### 1. **Execution Environment**

* **JavaScript:** Primarily runs in web browsers but can also run on servers using Node.js.
* **Other Languages:** Many languages (like Python, Java, and C++) run in dedicated runtime environments rather than being inherently tied to the browser.

### 2. **Interpreted vs. Compiled**

* **JavaScript:** Interpreted (or Just-in-Time compiled), meaning it runs directly without needing a separate compilation step.
* **Other Languages:** Many languages like C, C++, and Java require compilation before execution.

### 3. **Dynamic Typing**

* **JavaScript:** Dynamically typed, meaning variables can change types at runtime.
* **Other Languages:** Statically typed languages (like Java and C++) require variable types to be defined explicitly.

### 4. **Weak vs. Strong Typing**

* **JavaScript:** Weakly typed, allowing implicit type coercion (`"5" + 5 → "55"`).
* **Other Languages:** Strongly typed languages (like Python and Java) enforce stricter type rules.

### 5. **Asynchronous Programming**

* **JavaScript:** Has built-in asynchronous programming capabilities like Promises, async/await, and event loops.
* **Other Languages:** Some languages (like Python and Java) support asynchronous programming but typically require additional libraries or frameworks.

### 6. **Object-Oriented Approach**

* **JavaScript:** Prototype-based object-oriented programming.
* **Other Languages:** Many use class-based object-oriented programming (like Java, C++, and Python).

### 7. **Multi-Paradigm Nature**

* **JavaScript:** Supports functional, imperative, and object-oriented programming.
* **Other Languages:** Some languages (like Haskell) are purely functional, while others (like Java) are strictly object-oriented.

### 8. **Memory Management**

* **JavaScript:** Automatic garbage collection.
* **Other Languages:** Some languages (like C and C++) require manual memory management.

### 9. **Concurrency Model**

* **JavaScript:** Uses a single-threaded event loop with non-blocking I/O.
* **Other Languages:** Many languages use multi-threading (like Java and Python).

### 10. **Use Cases**

* **JavaScript:** Best suited for web development, frontend (React, Angular, Vue), and backend (Node.js).
* **Other Languages:** Other languages have broader applications, such as system programming (C, C++), data science (Python, R), and enterprise applications (Java, C#).

## 2. Explain execution context in javascript, event loop works.

=> Here are the diagrams explaining **Execution Context, Call Stack, and Event Loop** in JavaScript:

---

### **1️⃣ Execution Context & Call Stack Diagram**

When JavaScript executes functions, they are added to the **Call Stack** and removed when execution is complete.

#### **Example Code:**

```javascript
function first() {
  console.log("First Function");
  second();
}

function second() {
  console.log("Second Function");
  third();
}

function third() {
  console.log("Third Function");
}

first();
```

#### **Step-by-Step Call Stack Execution**

1. `first()` is called → Added to Call Stack
2. `second()` is called inside `first()` → Added to Call Stack
3. `third()` is called inside `second()` → Added to Call Stack
4. `third()` finishes → Removed from Call Stack
5. `second()` finishes → Removed from Call Stack
6. `first()` finishes → Removed from Call Stack

#### **📌 Diagram of Call Stack Execution**

```
Initial State:
   (Empty Stack)

After `first()` is called:
   | first()   |
   | GEC       |

After `second()` is called inside `first()`:
   | second()  |
   | first()   |
   | GEC       |

After `third()` is called inside `second()`:
   | third()   |
   | second()  |
   | first()   |
   | GEC       |

After `third()` finishes:
   | second()  |
   | first()   |
   | GEC       |

After `second()` finishes:
   | first()   |
   | GEC       |

After `first()` finishes:
   | GEC       |

Final State:
   (Empty Stack)
```

---

### **2️⃣ Event Loop & Asynchronous Execution**

The **Event Loop** manages **asynchronous code** like `setTimeout`, `Promises`, and `HTTP requests`.

#### **Example Code:**

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 0);

Promise.resolve().then(() => console.log("Promise Callback"));

console.log("End");
```

#### **📌 Execution Flow:**

1. `"Start"` → Executes immediately (Call Stack)
2. `setTimeout()` → Moves to  **Web API** , callback goes to  **Callback Queue** .
3. `Promise.resolve().then()` → Moves to  **Microtask Queue** .
4. `"End"` → Executes immediately (Call Stack)
5. **Microtask Queue (Promise)** executes first → `"Promise Callback"`
6. **Callback Queue (`setTimeout`)** executes last → `"Timeout Callback"`

#### **📌 Diagram of Event Loop Execution**

```
---------------------------------
| Call Stack       | Web APIs   |
|------------------|-----------|
| console.log()    | setTimeout() (0ms) |
| console.log()    | ------------- |
|------------------|-----------|
---------------------------------

| Microtask Queue | Callback Queue |
|-----------------|---------------|
| Promise.then()  | setTimeout()   |
---------------------------------

Execution Order:
1️⃣ "Start" → (Call Stack)
2️⃣ "End" → (Call Stack)
3️⃣ "Promise Callback" → (Microtask Queue)
4️⃣ "Timeout Callback" → (Callback Queue)
```

---

### **🔹 Summary**

* **Execution Context:** Each function call creates a new execution context.
* **Call Stack:** Manages function execution using **LIFO** (Last In, First Out).
* **Event Loop:** Handles async tasks efficiently.
* **Microtask Queue executes first before Callback Queue.**


## 3. Difference between let , const and var.

=> **Difference Between `let`, `const`, and `var` in JavaScript**

| Feature                  | `var`                    | `let`                     | `const`                                                 |
| ------------------------ | -------------------------- | --------------------------- | --------------------------------------------------------- |
| **Scope**          | Function-scoped            | Block-scoped                | Block-scoped                                              |
| **Hoisting**       | Hoisted with `undefined` | Hoisted but not initialized | Hoisted but not initialized                               |
| **Re-declaration** | Allowed                    | Not allowed                 | Not allowed                                               |
| **Re-assignment**  | Allowed                    | Allowed                     | ❌ Not allowed (Immutable reference)                      |
| **Mutability**     | Can be changed             | Can be changed              | Value cannot be changed, but objects & arrays are mutable |
| **Use Case**       | Avoid using                | Use when value changes      | Use when value remains constant                           |

---

### **1️⃣ `var` (Function Scoped)**

* Can be **re-declared** and  **re-assigned** .
* **Hoisted** but initialized with `undefined`.
* **Function-scoped** , meaning it's accessible throughout the function.

#### **Example:**

```javascript
var x = 10;
if (true) {
  var x = 20;  // Re-declared (Allowed)
  console.log(x);  // 20
}
console.log(x);  // 20 (var leaks out of the block)
```

**⚠️ Problem:** `var` doesn’t respect block scope, which can cause unexpected behavior.

---

### **2️⃣ `let` (Block Scoped)**

* Can be **re-assigned** but **not re-declared** within the same scope.
* **Hoisted but not initialized** (throws an error if accessed before declaration).
* **Block-scoped** , meaning it’s only accessible inside `{}`.

#### **Example:**

```javascript
let y = 10;
if (true) {
  let y = 20;  // New `y` inside block (Not the same `y`)
  console.log(y);  // 20
}
console.log(y);  // 10 (Original `y` remains unchanged)
```

**✅ Use `let` when values need to change.**

---

### **3️⃣ `const` (Block Scoped & Immutable)**

* **Cannot be re-declared or re-assigned.**
* **Hoisted but not initialized** .
* **Block-scoped** like `let`.
* **Objects & arrays declared with `const` can be mutated** , but the variable cannot be reassigned.

#### **Example:**

```javascript
const z = 30;
z = 40;  // ❌ Error: Assignment to constant variable
```

**✅ Use `const` for constants that don’t change.**

---

### **4️⃣ `const` with Objects & Arrays**

Although you **cannot reassign** a `const` variable, objects and arrays remain  **mutable** .

```javascript
const obj = { name: "John" };
obj.name = "Doe";  // ✅ Allowed (modifying object properties)
console.log(obj.name);  // "Doe"

obj = { age: 25 };  // ❌ Error: Assignment to constant variable
```

---

### **📌 Summary**

| Use `var`?  ❌ **(Avoid using)** |
| Use `let`?  ✅ **(When value changes)** |
| Use `const`? ✅ **(For constants and immutable references)** |


## 4. What are primitive and non primitive data types?

=> **Primitive and Non-Primitive Data Types in JavaScript**

JavaScript has two main types of data: **Primitive** and  **Non-Primitive (Reference) Types** .

---

## **1️⃣ Primitive Data Types**

✅ **Stored directly in memory (stack)**

✅ **Immutable (cannot be changed)**

✅ **Compared by value**

📌 **Types of Primitive Data Types**

| Data Type           | Example                         | Description                                                 |
| ------------------- | ------------------------------- | ----------------------------------------------------------- |
| **Number**    | `let num = 42;`               | Represents numeric values (integers & floating points).     |
| **String**    | `let str = "Hello";`          | Sequence of characters inside quotes.                       |
| **Boolean**   | `let isTrue = true;`          | Represents `true`or `false`.                            |
| **Undefined** | `let x;`                      | A variable that has been declared but not assigned a value. |
| **Null**      | `let y = null;`               | Represents the intentional absence of value.                |
| **Symbol**    | `let sym = Symbol("unique");` | A unique and immutable value (used for object properties).  |
| **BigInt**    | `let big = 123n;`             | Large integers beyond `Number.MAX_SAFE_INTEGER`.          |

#### **Example of Primitive Types**

```javascript
let a = 10;
let b = a;  // Copy by value
b = 20;
console.log(a);  // 10 (remains unchanged)
console.log(b);  // 20 (separate copy)
```

**📌 Primitive types are copied by value, not reference.**

---

## **2️⃣ Non-Primitive (Reference) Data Types**

✅ **Stored in heap memory (reference stored in stack)**

✅ **Mutable (can be changed)**

✅ **Compared by reference (not value)**

📌 **Types of Non-Primitive Data Types**

| Data Type          | Example                                  | Description                                    |
| ------------------ | ---------------------------------------- | ---------------------------------------------- |
| **Object**   | `let obj = { name: "John" };`          | Key-value pairs used to store structured data. |
| **Array**    | `let arr = [1, 2, 3];`                 | Ordered list of values.                        |
| **Function** | `function greet() { return "Hello"; }` | A block of reusable code.                      |
| **Date**     | `let date = new Date();`               | Represents dates and times.                    |

#### **Example of Non-Primitive Types**

```javascript
let obj1 = { name: "Alice" };
let obj2 = obj1;  // Copy by reference
obj2.name = "Bob";

console.log(obj1.name);  // "Bob" (both variables point to the same object)
console.log(obj2.name);  // "Bob"
```

**📌 Non-primitive types are copied by reference, meaning they share the same memory address.**

---

## **📌 Key Differences**

| Feature              | Primitive Types         | Non-Primitive Types                           |
| -------------------- | ----------------------- | --------------------------------------------- |
| **Storage**    | Stored in stack         | Stored in heap (reference in stack)           |
| **Mutability** | Immutable               | Mutable                                       |
| **Comparison** | Compared by value       | Compared by reference                         |
| **Copying**    | Creates a separate copy | Creates a reference (changes affect original) |

---

### **📝 Summary**

* **Primitive Types:** Number, String, Boolean, Undefined, Null, Symbol, BigInt.
* **Non-Primitive Types:** Object, Array, Function, Date.
* **Primitives are copied by value** , while  **non-primitives are copied by reference** .


## 5. What is the Nullish coalescing operator?

=> **Nullish Coalescing Operator (`??`) in JavaScript**

The **Nullish Coalescing Operator (`??`)** is used to provide a **default value** when a variable is `null` or `undefined`, but  **not when it is `false`, `0`, or an empty string (`""`)** .

---

### **🔹 Syntax:**

```javascript
let result = value ?? defaultValue;
```

* If `value` is  **not `null` or `undefined`** , `result` will be `value`.
* If `value` is  **`null` or `undefined`** , `result` will be `defaultValue`.

---

### **🔹 Example 1: Using `??` for Default Values**

```javascript
let user = null;
let username = user ?? "Guest";
console.log(username);  // Output: "Guest"
```

Here, `user` is `null`, so `"Guest"` is used as the default value.

---

### **🔹 Example 2: Difference Between `??` and `||`**

```javascript
let count1 = 0;
let count2 = count1 || 10;  // Uses 10 (because 0 is falsy)
let count3 = count1 ?? 10;  // Uses 0 (because 0 is not null or undefined)

console.log(count2);  // Output: 10
console.log(count3);  // Output: 0
```

* **`||` (Logical OR)** treats **`0`, `false`, `""`** as falsy.
* **`??` (Nullish Coalescing)** only considers  **`null` and `undefined`** .

---

### **🔹 Example 3: Nested Nullish Coalescing**

```javascript
let userSettings = null;
let defaultSettings = { theme: "dark", language: "en" };

let settings = userSettings ?? defaultSettings;
console.log(settings);  // Output: { theme: "dark", language: "en" }
```

---

### **📌 When to Use `??`?**

✅ Use `??` when you only want to handle `null` or `undefined`,  **not other falsy values (`0`, `false`, `""`)** .


## 6. What is the arrow function and how is it different from normal function?

=> **Arrow Function (`=>`) vs Normal Function (`function`) in JavaScript**

### **🔹 Arrow Function (`=>`)**

Arrow functions are a shorter way to write functions in JavaScript. They  **do not have their own `this`, arguments, super, or new.target** .

### **🔹 Syntax**

```javascript
const functionName = (param1, param2) => expression;
```

Equivalent to:

```javascript
function functionName(param1, param2) {
  return expression;
}
```

---

## **1️⃣ Key Differences Between Arrow Functions & Normal Functions**

| Feature                                 | Arrow Function (`=>`)                                        | Normal Function (`function`)           |
| --------------------------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| **Syntax**                        | Short & concise                                                | More verbose                             |
| **`this`Binding**               | Inherits `this`from the surrounding scope (lexical `this`) | Has its own `this`(dynamic)            |
| **Arguments Object**              | ❌ No `arguments`object                                      | ✅ Has `arguments`object               |
| **Can be used as a Constructor?** | ❌ No (`new`keyword won't work)                              | ✅ Yes (Used with `new`)               |
| **Hoisting**                      | Not hoisted                                                    | Hoisted (can be used before declaration) |
| **Use in Methods**                | ❌ Not ideal for object methods (`this`is not bound)         | ✅ Works well for methods                |
| **Return Keyword**                | Implicit return if one expression                              | Requires `return`keyword               |

---

## **2️⃣ Examples**

### **🔹 Arrow Function**

```javascript
const add = (a, b) => a + b;
console.log(add(5, 3)); // Output: 8
```

✅ **No need for `{}` or `return` if only one expression.**

✅ **Automatically returns the value.**

---

### **🔹 Normal Function**

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(5, 3)); // Output: 8
```

✅ **More flexible, especially for complex logic.**

---

## **3️⃣ `this` Binding Difference**

### **🔹 Arrow Function (Lexical `this`)**

Arrow functions  **do not have their own `this`** , they inherit `this` from their  **enclosing scope** .

```javascript
const obj = {
  name: "Alice",
  greet: () => {
    console.log(`Hello, ${this.name}`); // ❌ `this` is undefined
  }
};

obj.greet(); // Output: "Hello, undefined"
```

🔴 **Problem:** Arrow functions do not bind `this` to the object.

✅ **Solution:** Use a normal function:

```javascript
const obj2 = {
  name: "Alice",
  greet() {
    console.log(`Hello, ${this.name}`); // ✅ Works correctly
  }
};

obj2.greet(); // Output: "Hello, Alice"
```

---

## **4️⃣ `arguments` Object Difference**

### **🔹 Normal Function (Has `arguments`)**

```javascript
function normalFunction() {
  console.log(arguments);
}
normalFunction(1, 2, 3); 
// Output: [1, 2, 3]
```

### **🔹 Arrow Function (No `arguments`)**

```javascript
const arrowFunction = () => {
  console.log(arguments);
};
arrowFunction(1, 2, 3); 
// ❌ Error: arguments is not defined
```

✅ **Solution:** Use Rest Parameters (`...args`) instead.

```javascript
const arrowFunction = (...args) => {
  console.log(args);
};
arrowFunction(1, 2, 3); 
// Output: [1, 2, 3]
```

---

## **📌 When to Use?**

✅ **Use Arrow Functions (`=>`)** for:

* Short, simple functions
* Callback functions (`setTimeout`, `.map()`, `.filter()`)
* Functions that should inherit `this`

✅ **Use Normal Functions (`function`)** for:

* Methods inside objects (`this` behavior)
* Functions requiring `arguments`
* Functions used as constructors (`new`)

Would you like a diagram to visualize these differences? 🚀
