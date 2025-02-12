## **Advanced-Level React Context API Interview Questions with Answers, Code Examples & Diagrams**

---

## **1️⃣ How do you share global state efficiently using the Context API?**

🔹 **Steps for Efficient Global State Management:**

✔ Use **multiple Contexts** (split state into logical groups).

✔ Use **`useReducer()`** for state logic instead of `useState()`.

✔ Wrap the **Provider** at the appropriate level to avoid unnecessary re-renders.

### **🔹 Example: Efficient Global State with `useReducer()`**

```jsx
const AppStateContext = createContext();

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    default: return state;
  }
}

const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
```

### **🖼️ Diagram: Efficient Global State**

```plaintext
App
│
├── AppStateContext.Provider
│   ├── ComponentA (Can Read & Update State)
│   ├── ComponentB (Can Read & Update State)
```

---

## **2️⃣ How does the Context API compare to Redux, MobX, or Zustand?**

| Feature                  | **Context API**      | **Redux**                             | **MobX** | **Zustand**               |
| ------------------------ | -------------------------- | ------------------------------------------- | -------------- | ------------------------------- |
| **Complexity**     | Low                        | High                                        | Medium         | Low                             |
| **Boilerplate**    | Minimal                    | High                                        | Low            | Minimal                         |
| **Performance**    | Can cause re-renders       | Optimized                                   | Optimized      | Optimized                       |
| **Async Handling** | Manual (via `useEffect`) | Middleware (`redux-thunk`,`redux-saga`) | Built-in       | Built-in                        |
| **Best Use Case**  | Small to medium apps       | Large-scale apps                            | Reactive state | Global state with minimal setup |

🔹 **Use Redux for:** Complex state logic, debugging, middleware.

🔹 **Use Context API for:** Theming, authentication, localized state.

---

## **3️⃣ How do you combine the Context API with the `useReducer` hook?**

🔹 `useReducer()` helps manage complex state logic inside Context.

### **🔹 Example: Using `useReducer()` with Context**

```jsx
const CounterContext = createContext();

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    default: return state;
  }
}

const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
```

---

## **4️⃣ What are the drawbacks of using the Context API?**

🔹 **Re-renders All Consumers** when state updates.

🔹 **Not ideal for deeply nested state** (use Redux or Zustand instead).

🔹 **No built-in debugging tools** (Redux has time-travel debugging).

🔹 **Prop-drilling alternative, but still requires careful structuring.**

---

## **5️⃣ How do you manage deeply nested state with the Context API?**

🔹 **Solution 1: Use Multiple Contexts**

🔹 **Solution 2: Use `useReducer()`**

🔹 **Solution 3: Combine Context API with Zustand/Redux**

---

## **6️⃣ How can you prevent unnecessary re-renders when using the Context API?**

✔ Use `React.memo()` for components.

✔ Split contexts into separate logical groups.

✔ Use **selector patterns** to extract only needed values.

✔ Wrap state updates in `useReducer()` for better performance.

---

## **7️⃣ How do you test a component that uses the Context API?**

🔹 Use  **Jest + React Testing Library** .

🔹 Mock the context provider in tests.

### **🔹 Example: Testing Context with Jest**

```jsx
import { render, screen } from "@testing-library/react";
import { ThemeContext } from "./ThemeContext";
import MyComponent from "./MyComponent";

test("renders with correct theme", () => {
  render(
    <ThemeContext.Provider value="dark">
      <MyComponent />
    </ThemeContext.Provider>
  );
  
  expect(screen.getByText(/dark theme/i)).toBeInTheDocument();
});
```

---

## **8️⃣ How do you implement authentication using the Context API?**

🔹 Store authentication state inside a  **Provider** .

🔹 Use `useContext()` inside components to access auth state.

🔹 Provide **login/logout functions** inside Context.

### **🔹 Example: Auth Context**

```jsx
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginButton = () => {
  const { login } = useContext(AuthContext);
  return <button onClick={() => login("Sayanta")}>Login</button>;
};
```

---

## **9️⃣ Can you nest multiple Context Providers? What are the pros and cons?**

🔹 **Pros:**

✔ Modular state management

✔ Avoids a **single giant context**

🔹 **Cons:**

❌ **Provider Hell** (Too many nested providers)

### **🖼️ Example: Multiple Providers (Bad Practice)**

```jsx
<AuthContext.Provider value={auth}>
  <ThemeContext.Provider value={theme}>
    <LanguageContext.Provider value={language}>
      <App />
    </LanguageContext.Provider>
  </ThemeContext.Provider>
</AuthContext.Provider>
```

🔹 **Solution:** Use a **Global Provider Wrapper**

```jsx
const AppProviders = ({ children }) => (
  <AuthContext.Provider value={auth}>
    <ThemeContext.Provider value={theme}>
      <LanguageContext.Provider value={language}>
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  </AuthContext.Provider>
);
```

---

## **🔟 How do you use the Context API with Server Components in React 18?**

🔹 **React 18 introduces Server Components, where Context needs careful handling.**

✔  **Use Context Providers in Client Components** .

✔ **Do not fetch data inside Server Components using Context.**

### **🔹 Example: Server Components with Context**

```jsx
// Server Component (Cannot use useContext here)
export default async function ServerComponent() {
  const data = await fetch("https://api.example.com/data").then(res => res.json());
  return <ClientComponent data={data} />;
}

// Client Component (Uses Context API)
function ClientComponent({ data }) {
  const theme = useContext(ThemeContext);
  return <p style={{ color: theme === "dark" ? "white" : "black" }}>{data.title}</p>;
}
```

---

## **🚀 Quick Recap for Advanced-Level Interviews**

| **Question**                                | **Key Answer**                               |
| ------------------------------------------------- | -------------------------------------------------- |
| **1. Share global state efficiently?**      | Use `useReducer()`, split contexts.              |
| **2. Context API vs Redux/MobX/Zustand?**   | Redux = Large-scale, Context = Simple state.       |
| **3. Use Context API with `useReducer`?** | Yes, for complex state logic.                      |
| **4. Drawbacks of Context API?**            | Re-renders, not scalable for deeply nested states. |
| **5. Deeply nested state solutions?**       | Use multiple contexts,`useReducer()`.            |
| **6. Prevent re-renders?**                  | Use `React.memo()`, split contexts.              |
| **7. Test Context API?**                    | Use Jest + React Testing Library.                  |
| **8. Auth with Context API?**               | Store user state in Context, provide login/logout. |
| **9. Nesting Context Providers?**           | Modular but avoid excessive nesting.               |
| **10. Context API with Server Components?** | Wrap Client Components inside Context Providers.   |

---
