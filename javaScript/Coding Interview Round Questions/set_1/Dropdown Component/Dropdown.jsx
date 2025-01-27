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
        <span className="float-right">&#9660;</span>
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
