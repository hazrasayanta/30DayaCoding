import React, { useState } from 'react';

const TransferItems = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: false },
    { id: 3, name: 'Item 3', checked: false },
    { id: 4, name: 'Item 4', checked: false },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggle = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleTransfer = () => {
    const checkedItems = items.filter((item) => item.checked);
    setSelectedItems([...selectedItems, ...checkedItems]);
    const remainingItems = items.filter((item) => !item.checked);
    setItems(remainingItems);
  };

  return (
    <div>
      <h2>Transfer Items</h2>
      <div>
        <h3>Available Items</h3>
        {items.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggle(item.id)}
            />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Selected Items</h3>
        {selectedItems.map((item) => (
          <div key={item.id}>
            <input type="checkbox" checked disabled />
            <label>{item.name}</label>
          </div>
        ))}
      </div>
      <button onClick={handleTransfer}>Transfer Selected Items</button>
    </div>
  );
};

export default TransferItems;
