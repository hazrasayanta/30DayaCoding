import React, { useState, useEffect } from 'react';

const CommandPalette = ({ commands }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommands, setFilteredCommands] = useState(commands);

  useEffect(() => {
    // Add event listener for Command + K keydown
    const handleKeyDown = (event) => {
      if (event.metaKey && event.key === 'k') {
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = commands.filter((command) =>
      command.label.toLowerCase().includes(searchTerm)
    );
    setFilteredCommands(filtered);
  };

  return (
    <div>
      {isOpen && (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ul>
            {filteredCommands.map((command) => (
              <li key={command.id}>
                <a href={command.url} onClick={handleClose}>
                  {command.label}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

// Example usage:
const App = () => {
  const commands = [
    { id: 1, label: 'Home', url: '/' },
    { id: 2, label: 'About', url: '/about' },
    { id: 3, label: 'Contact', url: '/contact' },
  ];

  return <CommandPalette commands={commands} />;
};

export default App;
