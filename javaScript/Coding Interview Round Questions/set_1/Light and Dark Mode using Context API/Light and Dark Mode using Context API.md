Here's a **React implementation of Light and Dark Mode** using the Context API for managing the theme globally across the application.

---

### Step-by-Step Implementation:

1. **Create a `ThemeContext` for managing the theme state.**
2. **Provide the context to your app.**
3. **Use the context in components to toggle the theme and style elements.**

---

### Complete Code:

#### 1. `ThemeContext.js` (Creating the Theme Context)

```jsx
import React, { createContext, useState, useContext } from "react";

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

export const useTheme = () => useContext(ThemeContext);
```

---

#### 2. `App.js` (Main Application)

```jsx
import React from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./App.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded ${
        theme === "light" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-200"
      }`}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

const MainContent = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 rounded shadow-md ${
        theme === "light"
          ? "bg-white text-black"
          : "bg-gray-900 text-gray-200"
      }`}
    >
      <h1 className="text-2xl font-bold">Hello, {theme === "light" ? "Day!" : "Night!"}</h1>
      <p className="mt-2">
        This is a {theme} mode example using the React Context API.
      </p>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300">
        <ThemeToggleButton />
        <div className="mt-6">
          <MainContent />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
```

---

#### 3. `App.css` (Styling for Light/Dark Mode)

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.light {
  background-color: #f0f0f0;
  color: #000;
}

body.dark {
  background-color: #121212;
  color: #fff;
}
```

---

### Key Features:

1. **Context API for Global State:**
   * The `ThemeProvider` wraps the application, making the `theme` and `toggleTheme` available to any child component via `useTheme`.
2. **Dynamic Styling:**
   * The `theme` determines the background, text color, and button styles dynamically.
3. **Theme Toggle:**
   * Clicking the button toggles between light and dark modes.
4. **CSS Transitions:**
   * Smooth transitions for background and text color changes.

---

### How It Works:

* `ThemeProvider` manages the current theme (`light` or `dark`) in its state and provides the state and `toggleTheme` function to children.
* `ThemeToggleButton` uses the `useTheme` hook to access the current theme and toggle it on button click.
* `MainContent` dynamically adjusts its styles based on the theme.

---

### Output Example:

* **Light Mode:**
  * White background, black text, blue button.
* **Dark Mode:**
  * Dark gray background, light text, dark gray button.

---

### Add-On Features:

1. **Persist Theme:**
   * Use `localStorage` to save the selected theme and apply it on reload:
     ```jsx
     const savedTheme = localStorage.getItem("theme") || "light";
     const [theme, setTheme] = useState(savedTheme);

     const toggleTheme = () => {
       const newTheme = theme === "light" ? "dark" : "light";
       setTheme(newTheme);
       localStorage.setItem("theme", newTheme);
     };
     ```
2. **Auto Theme Based on System Preference:**
   * Detect system preference using `window.matchMedia`:
     ```jsx
     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
     const [theme, setTheme] = useState(prefersDark ? "dark" : "light");
     ```

Let me know if you’d like to expand this example further! 😊
