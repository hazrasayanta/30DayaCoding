import React, { useState } from 'react';

const CheckboxList = () => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: 'Checkbox 1', checked: false },
    { id: 2, label: 'Checkbox 2', checked: false },
    { id: 3, label: 'Checkbox 3', checked: false },
    // Add more checkboxes as needed
  ]);

  const toggleSelectAll = () => {
    const updatedCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: !selectAllChecked,
    }));
    setCheckboxes(updatedCheckboxes);
    setSelectAllChecked(!selectAllChecked);
  };

  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
    setSelectAllChecked(
      updatedCheckboxes.every((checkbox) => checkbox.checked)
    );
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={selectAllChecked}
          onChange={toggleSelectAll}
        />
        Select All
      </label>
      <ul>
        {checkboxes.map((checkbox) => (
          <li key={checkbox.id}>
            <label>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleCheckboxChange(checkbox.id)}
              />
              {checkbox.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxList;
