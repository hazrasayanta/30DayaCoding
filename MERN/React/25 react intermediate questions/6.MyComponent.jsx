import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Promise
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise resolved after 2 seconds');
      }, 2000);
    });

    promise.then((result) => {
      setMessage((prevMessage) => prevMessage + result + '\n');
    });

    // setTimeout
    setTimeout(() => {
      setMessage(
        (prevMessage) => prevMessage + 'Timeout completed after 1 second\n'
      );
    }, 1000);

    // setInterval
    const interval = setInterval(() => {
      setMessage((prevMessage) => prevMessage + 'Interval tick\n');
    }, 1500);

    // Clean up setInterval
    return () => clearInterval(interval);
  }, []); // Empty dependency array means useEffect runs only once

  return (
    <div>
      <pre>{message}</pre>
    </div>
  );
};

export default MyComponent;
