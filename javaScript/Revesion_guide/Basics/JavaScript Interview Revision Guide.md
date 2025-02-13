
# **JavaScript Interview Revision Guide** 🚀

## **1. JavaScript Basics**

### ✅ **What is JavaScript?**

* JavaScript is a high-level, interpreted programming language used for web development.
* It is single-threaded and follows an  **event-driven, non-blocking I/O model** .

### ✅ **Data Types**

JavaScript has  **8 data types** :

1. **Primitive** (Immutable):
   * `String`, `Number`, `Boolean`, `Undefined`, `Null`, `BigInt`, `Symbol`
2. **Non-Primitive** (Mutable):
   * `Object` (includes Arrays, Functions, Dates, etc.)

```js
let str = "Hello"; // String
let num = 10; // Number
let bool = true; // Boolean
let obj = { key: "value" }; // Object
let arr = [1, 2, 3]; // Array (Object type)
let bigInt = 9007199254740991n; // BigInt
let sym = Symbol("id"); // Symbol
let undef; // Undefined
let nul = null; // Null
```

### ✅ **Hoisting**

* **Hoisting** is JavaScript's default behavior of moving function and variable declarations to the top of the code.
* Variables declared with `var` are hoisted but initialized as `undefined`.
* `let` and `const` are hoisted but  **not initialized** .

```js
console.log(x); // undefined
var x = 5; 

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

---

## **2. Scope & Closures**

### ✅ **Scope**

* **Global Scope** : Variables declared outside any function are global.
* **Local Scope** : Variables declared inside a function are local.
* **Block Scope** : Variables declared with `let` or `const` inside `{}` cannot be accessed outside.

```js
var a = "Global"; 
function test() {
    let b = "Local"; 
    console.log(a); // Accessible
    console.log(b); // Accessible
}
console.log(a); // Accessible
// console.log(b); // Error (b is not defined)
```

### ✅ **Closures**

* A **closure** is a function that retains access to its parent’s variables even after the parent function has finished executing.
* It is useful for **data privacy** and  **encapsulation** .

```js
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
    };
}
const closureFunc = outerFunction("Hello");
closureFunc("World"); // Outer: Hello, Inner: World
```

---

## **3. Functions & Asynchronous JavaScript**

### ✅ **Function Types**

1. **Function Declaration (Hoisted)**
   ```js
   function greet() { return "Hello!"; }
   ```
2. **Function Expression (Not Hoisted)**
   ```js
   const greet = function() { return "Hi!"; };
   ```
3. **Arrow Functions (Short Syntax, No `this` Binding)**
   ```js
   const add = (a, b) => a + b;
   ```

### ✅ **Callback Functions**

* A function **passed as an argument** to another function. Used in  **event handling & async operations** .

```js
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}
fetchData(console.log); // "Data received" after 1s
```

### ✅ **Promises (Async Handling)**

* A **Promise** is an object that represents the eventual completion or failure of an asynchronous operation.

```js
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Success!"), 1000);
});
myPromise.then(console.log).catch(console.error);
```

### ✅ **Async/Await**

* `async` makes a function return a  **Promise** .
* `await` pauses execution until the Promise resolves.

```js
async function fetchData() {
    return "Fetched Data";
}

async function getData() {
    let result = await fetchData();
    console.log(result);
}
getData(); // Fetched Data
```

---

## **4. Objects & Prototypes**

### ✅ **Objects in JavaScript**

* Objects are **key-value pairs** that store properties and methods.

```js
const user = {
    name: "John",
    age: 30,
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
};
user.greet(); // Hello, my name is John
```

### ✅ **Prototype & Inheritance**

* JavaScript uses **Prototype-based inheritance** instead of class-based inheritance.

```js
function Person(name) {
    this.name = name;
}
Person.prototype.sayHello = function() {
    console.log(`Hello, I am ${this.name}`);
};
const p1 = new Person("Alice");
p1.sayHello(); // Hello, I am Alice
```

---

## **5. ES6+ Features**

### ✅ **Destructuring**

* Extracts values from objects/arrays easily.

```js
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name, age); // Alice 25
```

### ✅ **Spread & Rest Operators**

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // Spread
console.log(arr2); // [1, 2, 3, 4, 5]

function sum(...nums) { // Rest
    return nums.reduce((acc, val) => acc + val, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

---

## **6. Event Loop & Concurrency**

### ✅ **How JavaScript Executes Code (Event Loop)**

* JavaScript uses a **single-threaded event loop** for concurrency.
* **Microtasks (Promises) execute before Macrotasks (setTimeout, setInterval)** .

```js
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// Output:
// Start
// End
// Promise
// Timeout
```

---

## **7. DOM Manipulation**

```js
document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("output").textContent = "Button Clicked!";
});
```

---

## **8. Fetch API & HTTP Requests**

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
```

---

## **9. JavaScript Design Patterns**

### ✅ **Singleton Pattern**

```js
const Singleton = (function() {
    let instance;
    function createInstance() {
        return { name: "Singleton Instance" };
    }
    return {
        getInstance: function() {
            if (!instance) instance = createInstance();
            return instance;
        }
    };
})();
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

---

## **10. Error Handling**

```js
try {
    throw new Error("Something went wrong");
} catch (error) {
    console.log(error.message);
} finally {
    console.log("Execution completed");
}
```

---

This guide covers **all major JavaScript topics** for your interview. **Memorize the key points & practice examples** to explain confidently. 💪🔥
