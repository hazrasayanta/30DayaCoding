import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

const App = () => {
  const centeredDivRef = useRef(null);

  const handleOutsideClick = () => {
    // Trigger toast notification when clicked outside the centered div
    // Replace this with your toast implementation
    alert('Clicked outside centered div!');
  };

  useOutsideClick(centeredDivRef, handleOutsideClick);

  return (
    <div>
      <div
        ref={centeredDivRef}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'lightblue',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1>Centered Div</h1>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
