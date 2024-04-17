import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed]);

  return (
    <div>
      <span>{displayText}</span>
    </div>
  );
};

// Example usage:
const App = () => {
  return <Typewriter text="Hello, world!" speed={100} />;
};

export default App;
