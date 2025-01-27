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
