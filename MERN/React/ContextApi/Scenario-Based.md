## **Scenario-Based React Context API Interview Questions with Solutions**

---

## **3️⃣1️⃣ How would you implement a global theme switcher using the Context API?**

🔹 **Steps to Implement:**

1️⃣ Create a `ThemeContext`.

2️⃣ Store the theme (`light`/`dark`) in state.

3️⃣ Provide a toggle function.

4️⃣ Use `localStorage` for persistence.

5️⃣ Wrap `App` inside `ThemeProvider`.

### **🔹 Solution: Theme Context**

```jsx
import { createContext, useState, useEffect, useContext } from "react";

// 1️⃣ Create Context
const ThemeContext = createContext();

// 2️⃣ Theme Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3️⃣ Custom Hook
export const useTheme = () => useContext(ThemeContext);

// 4️⃣ Example: Usage in a Component
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};
```

### **🖼️ Diagram**

```plaintext
App
│
├── ThemeProvider
│   ├── Navbar (Uses Theme)
│   ├── ThemeSwitcher (Toggles Theme)
```

✅ **Optimizations:**

✔ Use `localStorage` to persist theme.

✔ Wrap `toggleTheme()` in `useCallback()` for performance.

---

## **3️⃣2️⃣ How would you handle a multi-language (i18n) system using Context API?**

🔹 **Steps to Implement:**

✔ Create a `LanguageContext`.

✔ Store language (`en`, `fr`, etc.) in state.

✔ Provide a function to switch language.

✔ Use JSON for translations.

### **🔹 Solution: Multi-Language Context**

```jsx
import { createContext, useState, useContext } from "react";

// 1️⃣ Create Context
const LanguageContext = createContext();

// 2️⃣ Language Provider
const translations = {
  en: { greeting: "Hello" },
  fr: { greeting: "Bonjour" },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const switchLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3️⃣ Custom Hook
export const useLanguage = () => useContext(LanguageContext);

// 4️⃣ Example: Usage in a Component
const LanguageSwitcher = () => {
  const { language, switchLanguage, translations } = useLanguage();
  return (
    <div>
      <p>{translations[language].greeting}</p>
      <button onClick={() => switchLanguage("fr")}>French</button>
      <button onClick={() => switchLanguage("en")}>English</button>
    </div>
  );
};
```

✅ **Optimizations:**

✔ Use `localStorage` to store selected language.

✔ Use `useMemo()` to cache translations.

---

## **3️⃣3️⃣ If your Context API state updates too frequently, how would you optimize it?**

🔹 **Optimization Strategies:**

✔ **Use `useMemo()` to prevent unnecessary calculations.**

✔ **Use multiple contexts** (split state logically).

✔ **Use `useReducer()` instead of `useState()`.**

✔ **Wrap expensive functions in `useCallback()`.**

### **🔹 Example: Optimizing Re-renders**

```jsx
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Sayanta", age: 25 });

  // Avoid unnecessary re-renders
  const updateUser = useCallback((newUser) => {
    setUser((prev) => ({ ...prev, ...newUser }));
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

## **3️⃣4️⃣ What would you do if you need to access multiple contexts in a component?**

🔹 **Solution 1: Use `useContext()` multiple times**

```jsx
const Component = () => {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  return <p>{auth.user} prefers {theme.theme} mode</p>;
};
```

🔹 **Solution 2: Use a Wrapper Component for Better Structure**

```jsx
const useCombinedContext = () => ({
  auth: useContext(AuthContext),
  theme: useContext(ThemeContext),
});

const Component = () => {
  const { auth, theme } = useCombinedContext();
  return <p>{auth.user} prefers {theme.theme} mode</p>;
};
```

---

## **3️⃣5️⃣ How do you structure Context Providers in a large-scale application?**

🔹 **Best Practices:**

✔ **Use Multiple Contexts** (Split state into logical modules).

✔ **Create a `Providers` Component** to wrap the application.

✔ **Use `useReducer()` for complex logic.**

✔ **Use Custom Hooks to simplify context consumption.**

### **🔹 Example: Large-Scale Context Structure**

```
/src
│── contexts
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   ├── LanguageContext.js
│── providers
│   ├── AppProviders.js
│── components
│   ├── Navbar.js
│   ├── Dashboard.js
│── App.js
```

### **🔹 Solution: `AppProviders.js` to Manage Contexts**

```jsx
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

export const AppProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  </AuthProvider>
);
```

### **🔹 Usage in `App.js`**

```jsx
import { AppProviders } from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <Dashboard />
    </AppProviders>
  );
}
```

✅ **Advantages of This Approach:**

✔ **Easier debugging & modularity.**

✔ **Better scalability in large applications.**

✔ **No unnecessary re-renders across unrelated contexts.**

---

## **🚀 Quick Recap for Scenario-Based Interviews**

| **Scenario**                                  | **Solution**                                                |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| **31. Theme Switcher?**                       | Store theme in Context, persist in `localStorage`.              |
| **32. Multi-language (i18n)?**                | Store translations in JSON, switch via Context.                   |
| **33. Context state updates too frequently?** | Use `useMemo()`, split contexts,`useReducer()`.               |
| **34. Access multiple contexts?**             | Use `useContext()`multiple times or wrap them in a helper hook. |
| **35. Large-scale Context Structure?**        | Use multiple providers, wrap them in `AppProviders.js`.         |

---

### 🚀 **You're now fully prepared for advanced React Context API scenario-based interviews!**

Would you like **real-world system design** questions on state management? 🤓
