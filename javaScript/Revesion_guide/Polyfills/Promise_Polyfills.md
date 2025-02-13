# 🚀 **JavaScript Promise Methods & Polyfills – Interview Guide**

Understanding Promises and their methods (`Promise.all`, `Promise.race`, `Promise.allSettled`, and `Promise.any`) is crucial for JavaScript interviews. Below are explanations and polyfills for these methods.

---

## ✅ **Q1: What is `Promise.all()` and how to implement its polyfill?**

### **1️⃣ `Promise.all()` Method**

✔ **Purpose:** Takes an array of promises and resolves when **all** of them are resolved.

✔ **If any promise rejects, it immediately rejects the entire `Promise.all()`.**

✔ **Returns:** An array of resolved values.

🔹 **Example:**

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(console.log); // ✅ [1, 2, 3]
```

---

### **2️⃣ Polyfill for `Promise.all()`**

✔ Uses `Promise` and `Array.map()`.

✔ Resolves all promises in parallel.

🔹 **Custom Implementation:**

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// ✅ Usage:
Promise.myAll([p1, p2, p3]).then(console.log); // ✅ [1, 2, 3]
```

---

## ✅ **Q2: What is `Promise.race()` and how to implement its polyfill?**

### **1️⃣ `Promise.race()` Method**

✔ **Purpose:** Returns the result of the **first promise** to settle (resolve/reject).

🔹 **Example:**

```js
const p1 = new Promise((res) => setTimeout(res, 500, "Fast"));
const p2 = new Promise((res) => setTimeout(res, 1000, "Slow"));

Promise.race([p1, p2]).then(console.log); // ✅ "Fast"
```

---

### **2️⃣ Polyfill for `Promise.race()`**

✔ Resolves/rejects  **as soon as the first promise settles** .

🔹 **Custom Implementation:**

```js
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

// ✅ Usage:
Promise.myRace([p1, p2]).then(console.log); // ✅ "Fast"
```

---

## ✅ **Q3: What is `Promise.allSettled()` and how to implement its polyfill?**

### **1️⃣ `Promise.allSettled()` Method**

✔ **Purpose:** Resolves when all promises are settled ( **fulfilled or rejected** ).

✔ **Returns:** An array of `{ status, value }` or `{ status, reason }`.

🔹 **Example:**

```js
const p1 = Promise.resolve("Success");
const p2 = Promise.reject("Error");
const p3 = Promise.resolve("Done");

Promise.allSettled([p1, p2, p3]).then(console.log);
/*
✅ [
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Error" },
  { status: "fulfilled", value: "Done" }
]
*/
```

---

### **2️⃣ Polyfill for `Promise.allSettled()`**

✔ Waits for all promises to **settle** (resolve or reject).

🔹 **Custom Implementation:**

```js
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    let results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

// ✅ Usage:
Promise.myAllSettled([p1, p2, p3]).then(console.log);
```

---

## ✅ **Q4: What is `Promise.any()` and how to implement its polyfill?**

### **1️⃣ `Promise.any()` Method**

✔ **Purpose:** Returns the first **fulfilled** promise.

✔ **If all reject, returns an  **AggregateError** .**

🔹 **Example:**

```js
const p1 = Promise.reject("Error 1");
const p2 = new Promise((res) => setTimeout(res, 500, "Success"));
const p3 = Promise.reject("Error 2");

Promise.any([p1, p2, p3]).then(console.log); // ✅ "Success"
```

---

### **2️⃣ Polyfill for `Promise.any()`**

✔ Resolves with the first fulfilled promise.

✔ If all reject, returns `AggregateError`.

🔹 **Custom Implementation:**

```js
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let rejectedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          errors[index] = err;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};

// ✅ Usage:
Promise.myAny([p1, p2, p3]).then(console.log).catch(console.error);
```

---

## 🚀 **Interview Summary:**

| Promise Method           | Resolves When?                                  | Rejects When?                                     | Key Behavior                               |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| `Promise.all()`        | **All**promises resolve                   | **Any**promise rejects                      | Returns all resolved values                |
| `Promise.race()`       | **First**promise settles (resolve/reject) | N/A                                               | Returns first settled value                |
| `Promise.allSettled()` | **All**promises settle (resolve/reject)   | Never rejects                                     | Returns `{status, value/reason}`for each |
| `Promise.any()`        | **First**fulfilled promise                | If**all**reject, returns `AggregateError` | Returns first resolved value               |

---

### 🚀 **Final Takeaways for Interviews:**

✅ Know the **differences** between `Promise.all()`, `race()`, `allSettled()`, and `any()`.

✅ Understand  **how they handle rejections** .

✅ Be prepared to **write polyfills** to showcase deep understanding.

🔥 Master these concepts, and you'll be ahead in JavaScript interviews! 🚀
