## **Intermediate-Level React Context API Interview Questions with Answers, Code Examples & Diagrams**

---

## **1️⃣ What are the advantages of using the Context API over Redux?**

| Feature          | **Context API**        | **Redux**                    |
| ---------------- | ---------------------------- | ---------------------------------- |
| Setup Complexity | Simple (`createContext()`) | Complex (Reducers, Actions, Store) |
| Performance      | Faster for small apps        | Optimized for large apps           |
| Boilerplate      | Minimal                      | More code (reducers, actions)      |
| State Scope      | Localized global state       | Centralized global state           |
| Debugging        | Simple                       | Advanced debugging tools           |

**✅ When to use Context API?**

🔹 Small to medium apps.

🔹 When state management needs are minimal.

🔹 No need for complex reducers or middleware.

**✅ When to use Redux?**

🔹 Large-scale apps with complex state logic.

🔹 Need for  **time-travel debugging** .

🔹 Need for middleware like `redux-thunk` for async operations.

---

## **2️⃣ Can you use multiple Context Providers in a React app?**

### ✅ **Yes, you can use multiple Context Providers**

Each Context manages a separate piece of state, allowing **modular** state management.

### **🔹 Example (Multiple Contexts)**

```jsx
const ThemeContext = createContext();
const AuthContext = createContext();

const App = () => (
  <ThemeContext.Provider value="dark">
    <AuthContext.Provider value={{ user: "Sayanta", isLoggedIn: true }}>
      <Component />
    </AuthContext.Provider>
  </ThemeContext.Provider>
);
```

### **🖼️ Diagram: Multiple Contexts**

```plaintext
App
│
├── ThemeContext.Provider (Provides Theme)
│   ├── AuthContext.Provider (Provides Auth Data)
│       ├── Component (Uses both Theme & Auth)
```

---

## **3️⃣ What is the difference between useContext and Context.Consumer?**

| Feature       | `useContext()`(Modern)                 | `Context.Consumer`(Old)                                     |
| ------------- | ---------------------------------------- | ------------------------------------------------------------- |
| Syntax        | `const value = useContext(MyContext);` | `<MyContext.Consumer> {value => ...} </MyContext.Consumer>` |
| Readability   | Simple and clean                         | Verbose and nested                                            |
| React Version | Introduced in**React 16.8**        | Older versions                                                |
| Hooks Support | ✅ Yes                                   | ❌ No                                                         |

### **🔹 Example (`useContext()` - Modern)**

```jsx
const theme = useContext(ThemeContext);
```

### **🔹 Example (`Context.Consumer()` - Old)**

```jsx
<ThemeContext.Consumer>
  {theme => <p>Current Theme: {theme}</p>}
</ThemeContext.Consumer>
```

---

## **4️⃣ Is the Context API suitable for large-scale applications? Why or why not?**

### ✅ **Suitable for:**

✔ Managing  **theming, authentication, language preferences** .

✔ Small to **medium-sized** apps.

### ❌ **Not suitable for:**

❌ Large-scale apps with  **deeply nested state updates** .

❌ Apps needing **performance optimizations** (Redux is better for this).

---

## **5️⃣ How does Context API affect performance?**

🔹 **Performance Issue:**

Every time  **context value changes** , all **child components re-render** (even if they don’t use the updated value).

### **🖼️ Diagram: Re-render issue**

```plaintext
Context.Provider → Updates value → ALL Consumers re-render
```

---

## **6️⃣ How do you optimize performance when using the Context API?**

### ✅ **Best Practices:**

✔  **Split Contexts** : Avoid a single giant context for all states.

✔  **Use `React.memo()`** : Prevent unnecessary re-renders.

✔  **Wrap Provider inside a separate component** .

✔  **Use State Managers (Redux, Zustand) for Complex Cases** .

### **🔹 Example: Using `React.memo()` for Optimization**

```jsx
const ThemedComponent = React.memo(() => {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
});
```

---

## **7️⃣ Can you update context values from a child component?**

### ✅ **Yes, using `useState()` in Provider**

```jsx
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ChildComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
};
```

---

## **8️⃣ How do you provide a default value in `createContext()`?**

### ✅ **Syntax**

```jsx
const ThemeContext = createContext("light");
```

### **🔹 Example with Object Default Value**

```jsx
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });
```

---

## **9️⃣ How does the Context API work with functional components vs. class components?**

| Feature      | Functional Components (`useContext`)   | Class Components (`Context.Consumer`)                       |
| ------------ | ---------------------------------------- | ------------------------------------------------------------- |
| Syntax       | `const value = useContext(MyContext);` | `<MyContext.Consumer> {value => ...} </MyContext.Consumer>` |
| Readability  | Simple and clean                         | More boilerplate code                                         |
| Performance  | Better with hooks                        | More re-renders                                               |
| Recommended? | ✅ Yes (Modern React)                    | ❌ No (Deprecated)                                            |

---

## **🔟 Can you use the Context API with `React.memo()`?**

### ✅ **Yes, but only if props don't change**

If a component  **only depends on context** , `React.memo()` **won't prevent re-renders** when context updates.

### **🔹 Example: Using `React.memo()` with Context API**

```jsx
const ThemedComponent = React.memo(() => {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
});
```

---

## **🔥 Quick Recap for Interviews**

| **Question**                           | **Key Answer**                                          |
| -------------------------------------------- | ------------------------------------------------------------- |
| **1. Context API vs Redux?**           | Context API is simpler, Redux is better for large-scale apps. |
| **2. Multiple Contexts?**              | Yes, you can use multiple providers.                          |
| **3.`useContext`vs `Consumer`?**   | `useContext`is modern,`Consumer`is old.                   |
| **4. Suitable for Large Apps?**        | No, Redux is better for large-scale apps.                     |
| **5. Performance Issues?**             | Re-renders all consumers when state updates.                  |
| **6. Optimizing Performance?**         | Use `React.memo()`, split contexts.                         |
| **7. Updating Context in Child?**      | Yes, using `useState()`inside Provider.                     |
| **8. Default Value in Context?**       | `createContext(defaultValue)`.                              |
| **9. Functional vs Class Components?** | Functional (`useContext`) is better.                        |
| **10.`React.memo()`with Context?**   | Works, but still re-renders if context updates.               |

---
