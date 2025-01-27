Here’s a basic and reusable dropdown component in React:

### Complete Code:

```jsx
import React, { useState } from "react";

const Dropdown = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-2 text-left border rounded-lg bg-white shadow-sm border-gray-300"
      >
        {selectedOption || label || "Select an option"}
        <span className="float-right">▼</span>
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 border rounded-lg shadow-lg bg-white border-gray-300 z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
```

---

### Example Usage:

```jsx
import React from "react";
import Dropdown from "./Dropdown";

const App = () => {
  const handleSelect = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dropdown Example</h1>
      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]}
        label="Choose an option"
        onSelect={handleSelect}
      />
    </div>
  );
};

export default App;
```

---

### Explanation:

1. **Props:**
   * `options`: An array of options to display in the dropdown.
   * `label`: A placeholder for the dropdown button when no option is selected.
   * `onSelect`: A callback function that gets called with the selected option.
2. **State:**
   * `isOpen`: Controls the visibility of the dropdown menu.
   * `selectedOption`: Stores the currently selected option.
3. **Styling:**
   * Used Tailwind CSS for simplicity. You can replace these classes with your preferred styling solution (CSS modules, styled-components, etc.).
4. **Behavior:**
   * Clicking the button toggles the dropdown.
   * Clicking an option selects it, closes the dropdown, and calls `onSelect`.

---

### Key Features:

* Simple and reusable design.
* Handles opening/closing logic.
* Easily customizable with props for options, labels, and styles.

Would you like me to extend it with more advanced features like multi-select or search? 😊
