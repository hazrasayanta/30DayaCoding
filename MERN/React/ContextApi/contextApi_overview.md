Context API in React is a state management solution that allows you to pass data through the component tree without needing to pass props manually at every level. It helps in avoiding "prop drilling" and is useful for managing global state, such as themes, authentication, and user preferences.

### **Key Concepts of Context API**

1. **React.createContext** → Creates a new context object.
2. **Provider** → Supplies the data to the consuming components.
3. **Consumer / useContext** → Accesses the context data in child components.

---

### **Example: Using Context API**

#### **1. Create a Context**

Create a file `ThemeContext.js`:

```jsx
import { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
```

---

#### **2. Wrap Your App with the Provider**

Modify `App.js`:

```jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import Home from "./Home";

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
```

---

#### **3. Consume Context in a Component**

Modify `Home.js`:

```jsx
import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff", padding: "20px" }}>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default Home;
```

---

### **Key Takeaways**

* `createContext()` creates a context object.
* `Provider` supplies the state to child components.
* `useContext()` allows child components to access the context.
* Helps avoid prop drilling in deeply nested components.

Would you like me to include an advanced example with reducers?
