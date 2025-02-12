## **Beginner-Level React Context API Interview Questions with Diagrams**

Here’s a **brief** but **detailed** version of each question with **diagrams** to help you **remember them easily** in interviews.

---

## **1️⃣ What is the Context API in React?**

### ✅ **Definition:**

The **Context API** is a React feature that provides a way to **share global state** between components **without** passing props manually at every level ( **avoids prop drilling** ).

### **🖼️ Diagram: Context API vs Prop Drilling**

**🔹 Without Context (Prop Drilling Issue)**

```plaintext
App → Parent → Child → Grandchild (Passing props at every level)
```

**🔹 With Context API (No Prop Drilling)**

```plaintext
App
│
├── ThemeProvider (Context)
│   ├── Header (Accesses context directly)
│   ├── Content (Accesses context directly)
│   ├── Footer (Accesses context directly)
```

---

## **2️⃣ How does the Context API work?**

### ✅ **3 Simple Steps:**

1️⃣ **Create a Context** using `createContext()`.

2️⃣ **Provide the Context** using `<Context.Provider>`.

3️⃣ **Consume the Context** using `useContext()` in child components.

### **🔹 Code Example:**

```jsx
import React, { createContext, useContext } from "react";

// 1️⃣ Create Context
const ThemeContext = createContext("light");

// 2️⃣ Provide Context
const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
};

// 3️⃣ Consume Context
const ThemedComponent = () => {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
};

// 4️⃣ Use in App
const App = () => (
  <ThemeProvider>
    <ThemedComponent />
  </ThemeProvider>
);

export default App;
```

---

## **3️⃣ What are the main components of the Context API?**

### ✅ **Key Components:**

| Component           | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `createContext()` | Creates a new context                                  |
| `Provider`        | Supplies data to child components                      |
| `Consumer`        | Accesses data (Old method, replaced by `useContext`) |
| `useContext()`    | Extracts values from the context (Modern approach)     |

---

## **4️⃣ What problem does the Context API solve?**

### ✅ **Problems Context API Solves:**

🔹 **Avoids Prop Drilling** (No need to pass props manually at every level).

🔹 **Easier Global State Management** (Good for themes, auth, languages).

🔹 **Better Readability & Maintainability** (No deeply nested props).

### **🔹 Prop Drilling vs Context API (Diagram)**

```plaintext
❌ Without Context API:
App → Parent → Child → Grandchild (Pass props manually)

✅ With Context API:
App
│
├── ThemeProvider (Context)
│   ├── Child1 (Uses context)
│   ├── Child2 (Uses context)
│   ├── Grandchild (Uses context)
```

---

## **5️⃣ How is the Context API different from prop drilling?**

| Feature      | Prop Drilling                 | Context API                      |
| ------------ | ----------------------------- | -------------------------------- |
| Data Sharing | Passed manually through props | Direct access via `useContext` |
| Scalability  | Harder for deep trees         | Easier for large apps            |
| Readability  | Poor in large projects        | Cleaner code                     |

---

## **6️⃣ How do you create a context in React?**

### ✅ **Syntax:**

```jsx
import { createContext } from "react";

// Create a new context
const ThemeContext = createContext("light");

export default ThemeContext;
```

---

## **7️⃣ What is a `Provider` in the Context API?**

### ✅ **Definition:**

A **Provider** is a wrapper component that **supplies data** to its child components.

### **🔹 Example:**

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

---

## **8️⃣ What is a `Consumer` in the Context API?**

### ✅ **Definition:**

A **Consumer** is used to  **access context values** . It is an older approach  **(replaced by `useContext()`)** .

### **🔹 Example (Old Method - `Consumer`)**

```jsx
<ThemeContext.Consumer>
  {theme => <p>Theme: {theme}</p>}
</ThemeContext.Consumer>
```

### ✅ **Modern Approach: `useContext()` is recommended instead**

---

## **9️⃣ How do you access context values in a child component?**

### ✅ **Using `useContext()` (Recommended)**

```jsx
const theme = useContext(ThemeContext);
```

### **🔹 Example:**

```jsx
const ThemedComponent = () => {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
};
```

---

## **🔟 How does the `useContext` hook work?**

### ✅ **Definition:**

The `useContext()` hook **extracts values from the context** without using `<Context.Consumer>`.

### **🔹 Example:**

```jsx
const theme = useContext(ThemeContext);
```

```jsx
const MyComponent = () => {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
};
```

---

### **🔥 Quick Recap for Interviews**

| **Question**                         | **Key Answer**                                                    |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| **1. What is Context API?**          | A global state management tool in React to avoid prop drilling.         |
| **2. How does it work?**             | Create Context → Provide Value → Use `useContext()`to consume it.   |
| **3. Main Components?**              | `createContext`,`Provider`,`Consumer`(deprecated),`useContext`. |
| **4. Problems it solves?**           | Avoids prop drilling, makes state management easier.                    |
| **5. Context API vs Prop Drilling?** | Context API allows direct access to values, avoids manual prop passing. |
| **6. Creating a Context?**           | `const MyContext = createContext(initialValue)`.                      |
| **7. What is a Provider?**           | A component that supplies data to children.                             |
| **8. What is a Consumer?**           | An older way to access context, replaced by `useContext()`.           |
| **9. Accessing Context in a Child?** | Use `const value = useContext(MyContext)`.                            |
| **10. How does `useContext`work?** | Extracts values from context without `Consumer`.                      |

---
