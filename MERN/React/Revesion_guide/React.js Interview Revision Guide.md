
# **React.js Interview Revision Guide** 🚀

## **1. What is React.js?**

* **React.js** is a **JavaScript library** for building **fast, scalable, and interactive** user interfaces.
* It is **component-based, declarative, and uses a virtual DOM** for efficient rendering.

### ✅ **Key Features**

✔️ **Component-Based** – UI is broken into reusable components.

✔️ **Virtual DOM** – React updates only the necessary parts of the UI, improving performance.

✔️ **One-Way Data Binding** – Unidirectional data flow ensures better control.

✔️ **Hooks** – Allow functional components to use state and lifecycle methods.

---

## **2. React Components**

### ✅ **Types of Components**

1. **Functional Components (Stateless) – Recommended**
   * Simple functions that return JSX.
   * Can use hooks like `useState`, `useEffect`.

```jsx
function Hello() {
    return <h1>Hello, World!</h1>;
}
```

2. **Class Components (Stateful) – Older Method**
   * Uses `this.state` and `this.setState`.

```jsx
class Hello extends React.Component {
    render() {
        return <h1>Hello, World!</h1>;
    }
}
```

---

## **3. JSX (JavaScript XML)**

* JSX allows writing  **HTML inside JavaScript** .
* **Must return a single parent element** .

```jsx
const element = <h1>Hello, {name}!</h1>;
```

---

## **4. Props & State**

### ✅ **Props (Read-Only Data Passed to Components)**

* Props allow passing data from parent to child components.

```jsx
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
<Greeting name="Alice" />;
```

### ✅ **State (Component's Internal Data - Mutable)**

* `useState` is used to manage component state.

```jsx
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

---

## **5. Event Handling in React**

* Uses camelCase (`onClick`, `onChange`).
* Functions passed to event handlers **must be arrow functions** or bound.

```jsx
function ClickButton() {
    const handleClick = () => alert("Button Clicked!");
    return <button onClick={handleClick}>Click Me</button>;
}
```

---

## **6. React Lifecycle Methods (Class Components Only)**

| Method                     | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `componentDidMount()`    | Runs after component mounts (API calls).  |
| `componentDidUpdate()`   | Runs after re-render (dependency change). |
| `componentWillUnmount()` | Runs before unmounting (cleanup).         |

Example:

```jsx
class MyComponent extends React.Component {
    componentDidMount() {
        console.log("Mounted!");
    }
    render() {
        return <h1>Hello</h1>;
    }
}
```

---

## **7. React Hooks (For Functional Components)**

| Hook           | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `useState`   | Manage component state.                           |
| `useEffect`  | Handle side effects (API calls, event listeners). |
| `useContext` | Access global context values.                     |

### ✅ **`useEffect` Example (Runs After Render)**

```jsx
import { useEffect } from "react";

function Example() {
    useEffect(() => {
        console.log("Component Rendered!");
    }, []); // Runs only once

    return <h1>Hello</h1>;
}
```

---

## **8. Conditional Rendering**

### ✅ **Using `&&` Operator**

```jsx
const isLoggedIn = true;
return <div>{isLoggedIn && <h1>Welcome back!</h1>}</div>;
```

### ✅ **Using Ternary Operator**

```jsx
return <div>{isLoggedIn ? <h1>Welcome</h1> : <h1>Please Log In</h1>}</div>;
```

---

## **9. Lists & Keys**

* Use `.map()` to render lists.
* Each item  **must have a unique `key`** .

```jsx
const names = ["Alice", "Bob", "Charlie"];
return (
    <ul>
        {names.map((name, index) => (
            <li key={index}>{name}</li>
        ))}
    </ul>
);
```

---

## **10. React Router (Navigation in React)**

```jsx
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}
```

---

## **11. API Calls in React**

### ✅ **Using `fetch()`**

```jsx
import { useEffect, useState } from "react";

function FetchData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return <div>{data.length > 0 ? data[0].title : "Loading..."}</div>;
}
```

---

## **12. Context API (Global State Management)**

* Used to avoid  **prop drilling** .

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function ThemeButton() {
    const theme = useContext(ThemeContext);
    return <button style={{ background: theme === "dark" ? "#333" : "#fff" }}>Click</button>;
}

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <ThemeButton />
        </ThemeContext.Provider>
    );
}
```

---

## **13. Redux (State Management - Alternative to Context API)**

* **Redux Flow** : **Action → Reducer → Store → Component**

### ✅ **Redux Example**

```jsx
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

// Reducer
function counterReducer(state = { count: 0 }, action) {
    if (action.type === "INCREMENT") return { count: state.count + 1 };
    return state;
}

// Store
const store = createStore(counterReducer);

function Counter() {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();
  
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
        </div>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    );
}
```

---

## **14. Performance Optimization**

* **`useMemo()`** – Memoizes expensive calculations.
* **`useCallback()`** – Memoizes functions.
* **React.memo** – Prevents unnecessary re-renders.

```jsx
const MemoizedComponent = React.memo(MyComponent);
```
