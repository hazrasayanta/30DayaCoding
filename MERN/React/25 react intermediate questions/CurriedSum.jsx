import React from 'react';

const sum = (x) => (y) => (z) => x + y + z;

const CurriedSum = () => {
  // Example usage
  const result = sum(1)(2)(3); // Output: 6

  return (
    <div>
      <p>Result of curried sum: {result}</p>
    </div>
  );
};

export default CurriedSum;


// JavaScript 
function sum(x) {
    return function(y) {
      return function(z) {
        return x + y + z;
      };
    };
  }
  
  // Usage
  console.log(sum(1)(2)(3)); // Output: 6
  