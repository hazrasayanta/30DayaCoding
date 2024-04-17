import React from 'react';

const MyComponent = () => {
  const obj = {
    first: function () {
      console.log('Inside first function');
      console.log('This:', this);
    },
    second: function () {
      console.log('Inside second function');
      console.log('This:', this);
    },
  };

  const arrowFunc = () => {
    obj.first();
  };

  function normalFunc() {
    obj.second();
  }

  arrowFunc();
  normalFunc();

  return <div>Check the console for output.</div>;
};

export default MyComponent;
