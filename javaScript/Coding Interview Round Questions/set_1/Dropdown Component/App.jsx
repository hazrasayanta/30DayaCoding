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
