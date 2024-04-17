# Sample of Js and react questions

## 1. React's Context API: How would you create and consume a context to share a theme (dark or light) across multiple components in a React application?

**=>** To create and consume a context to share a theme (dark or light) across multiple components in a React application using React's Context API, follow these steps:

1. **Create the Context**: Define a new context using `React.createContext()`. This context will hold the theme state and provide methods to update it.
2. **Provide the Context**: Wrap the root component of your application with a context provider component. This provider component will pass the theme state and methods to update it down the component tree.
3. **Consume the Context**: Use the `useContext()` hook or the context consumer component to access the theme state and methods anywhere within the component tree.

Here's an example implementation:

```jsx
// ThemeContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const ThemeContext = createContext();

// Provide the context
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

```jsx
// App.js
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
```

```jsx
// Header.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ background: theme === 'dark' ? '#333' : '#f0f0f0', color: theme === 'dark' ? '#fff' : '#333' }}>
      <h1>Header</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
};

export default Header;
```

```jsx
// Main.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main style={{ background: theme === 'dark' ? '#222' : '#f9f9f9', color: theme === 'dark' ? '#fff' : '#333' }}>
      <h2>Main Content</h2>
      <p>This is the main content area.</p>
    </main>
  );
};

export default Main;
```

```jsx
// Footer.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer style={{ background: theme === 'dark' ? '#333' : '#f0f0f0', color: theme === 'dark' ? '#fff' : '#333' }}>
      <p>Footer</p>
    </footer>
  );
};

export default Footer;
```

In this example, the `ThemeProvider` component provides the `theme` state and `toggleTheme` function to all descendant components wrapped within it. The `Header`, `Main`, and `Footer` components consume the theme context and update their styles accordingly based on the current theme. When the "Toggle Theme" button in the `Header` component is clicked, it triggers the `toggleTheme` function, which updates the theme state and causes a re-render of all components consuming the theme context.

## **2. React Hook Dependency Array**: Given the **useEffect** hook with an empty dependency array, what happens when the state it relies on changes and why?

**=>** When you use the `useEffect` hook with an empty dependency array (`[]`), it means that the effect should only run once after the initial render of the component. This is because the effect has no dependencies, so it doesn't need to re-run whenever any state or prop changes.

If the state it relies on changes, it won't trigger the effect to re-run because the dependency array is empty. The effect will only run once, after the initial render, regardless of any changes to the state it relies on.

Here's an example:

```jsx
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Effect ran');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyComponent;
```

In this example, the effect will only run once, after the initial render of `MyComponent`, because it has an empty dependency array. Even if the `count` state changes when the "Increment" button is clicked, the effect won't re-run because it's not dependent on any state or prop changes.

## **3. React Performance Optimization**: What is memoization in React and how can you use **React.memo()** to optimize the rendering of functional components?

**=>** Memoization in React refers to the technique of storing the results of expensive function calls and reusing them when the same inputs occur again. In the context of React, memoization can be used to optimize the rendering of functional components by preventing unnecessary re-renders.

`React.memo()` is a higher-order component provided by React that memoizes the result of a functional component based on its props. When a component wrapped with `React.memo()` receives new props, React will compare the previous props with the new props. If the props are shallowly equal, React will reuse the memoized result and skip re-rendering the component.

Here's how you can use `React.memo()` to optimize the rendering of functional components:

```jsx
import React from 'react';

const MyComponent = React.memo(({ prop1, prop2 }) => {
  // Component logic here
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
});

export default MyComponent;
```

In this example, `MyComponent` is wrapped with `React.memo()`. When `MyComponent` receives new props, React will check if the new props are shallowly equal to the previous props. If they are, React will reuse the memoized result and skip re-rendering the component.

Memoization with `React.memo()` is particularly useful for optimizing functional components that rely on the same props but don't need to re-render when those props change. However, it's important to note that memoization is a trade-off between memory usage and performance. Memoizing too aggressively can lead to increased memory usage, so it's important to use memoization judiciously where it provides significant performance benefits.

## **4. JS Promises**: Write a function called **serialPromises** that takes an array of functions returning promises and executes them serially, meaning it waits for one to finish before moving on to the next.

**=>** You can implement the `serialPromises` function using async/await. Here's how you can do it:

```javascript
async function serialPromises(promisesArray) {
  for (const promiseFunc of promisesArray) {
    await promiseFunc();
  }
}
```

This function takes an array of functions returning promises (`promisesArray`) as input. It iterates over each function in the array using a for...of loop and awaits the execution of each promise function using the await keyword. This ensures that each promise is executed serially, meaning it waits for the previous one to resolve before moving on to the next.

You can use this function like this:

```javascript
// Example array of promise functions
const promiseFunctions = [
  () => new Promise(resolve => setTimeout(() => {
    console.log('Promise 1 resolved');
    resolve();
  }, 1000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log('Promise 2 resolved');
    resolve();
  }, 2000)),
  () => new Promise(resolve => setTimeout(() => {
    console.log('Promise 3 resolved');
    resolve();
  }, 3000)),
];

// Execute promises serially
serialPromises(promiseFunctions)
  .then(() => {
    console.log('All promises completed');
  });
```

This code will execute the promises in the `promiseFunctions` array serially, waiting for each one to resolve before moving on to the next.

## **5. React Event Handling**: What is event pooling in React? Describe a scenario where this concept might be noticeable.

**=>** Event pooling in React is an optimization technique where synthetic events (instances of `SyntheticEvent`) are reused across multiple event handlers instead of creating a new event object for each event. When an event is fired, React creates a synthetic event object and dispatches it to the appropriate event handler. After the event handler finishes processing the event, React resets the synthetic event and adds it back to the pool for reuse.

This approach helps reduce memory consumption and improves performance by reducing the number of objects that need to be created and garbage collected during event handling.

A scenario where event pooling might be noticeable is in scenarios where many event handlers are attached to DOM elements, such as in a large form with many input fields, each with its own `onChange` event handler. Without event pooling, creating a new event object for each change event could lead to increased memory usage and potential performance degradation, especially in applications with many interactive components. By reusing synthetic event objects from the pool, React can optimize memory usage and reduce the overhead of creating and garbage collecting event objects.

## **6. JavaScript Prototypes**: Explain the difference between **__proto__** and **prototype** in JavaScript.

**=>** In JavaScript, `__proto__` and `prototype` are related concepts, but they serve different purposes:

1. `__proto__`:

   - `__proto__` is a special property that exists on every object in JavaScript.
   - It is a reference to the object's prototype, which is used to delegate property lookup to the prototype chain.
   - When you access a property on an object, JavaScript first checks if the property exists on the object itself. If not, it looks up the prototype chain by following the `__proto__` reference to find the property on the object's prototype.
   - `__proto__` is part of the internal mechanism for prototype-based inheritance in JavaScript.
2. `prototype`:

   - `prototype` is a property that exists on constructor functions in JavaScript.
   - It is used in conjunction with constructor functions to establish the prototype chain for objects created using the constructor.
   - When you create an object using a constructor function with the `new` keyword, the newly created object inherits properties and methods from the constructor's `prototype` property.
   - Any properties or methods added to the `prototype` of a constructor function are shared among all objects created using that constructor.
   - `prototype` is used to implement behavior sharing and inheritance in JavaScript.

In summary, `__proto__` is a reference to the prototype of an individual object, while `prototype` is a property of constructor functions used to establish the prototype chain for objects created with that constructor.

## **7. React Render Props**: Describe the render props pattern in React and provide a use-case where it might be beneficial over Higher Order Components.

**=>** The render props pattern in React is a design pattern where a component's functionality is encapsulated within a component that receives a function as a prop. This function, often called the "render prop," is responsible for rendering the content of the component. By passing this function as a prop, the parent component retains control over what content is rendered by the child component.

Here's a simplified example of the render props pattern:

```jsx
import React from 'react';

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

function App() {
  return (
    <MouseTracker render={({ x, y }) => (
      <div>
        <h1>Mouse position: ({x}, {y})</h1>
      </div>
    )} />
  );
}

export default App;
```

In this example, the `MouseTracker` component tracks the mouse position and passes it to the `render` prop function provided by the parent component (`App`). The `App` component decides what to render based on the mouse position received from `MouseTracker`.

The render props pattern can be beneficial over Higher Order Components (HOCs) in scenarios where:

1. **Flexibility**: Render props provide more flexibility and composability compared to HOCs. With render props, the parent component has fine-grained control over what content is rendered by the child component, allowing for more dynamic and customized behavior.
2. **Simpler API**: Render props often result in a simpler and more intuitive API compared to HOCs. With render props, you only need to pass a function as a prop, making the usage more straightforward and easier to understand.
3. **Avoidance of Prop Conflicts**: Render props help avoid prop name conflicts that can occur when using multiple HOCs, as they don't introduce additional props into the component's props.

However, it's important to note that both patterns have their use cases, and the choice between them depends on the specific requirements of your application and your personal preference for code organization and readability.

## **8. JS Async/Await**: Given a function that returns a promise, refactor it to use async/await. What are the potential pitfalls of using async/await?

**=>** Sure, here's an example of refactoring a function that returns a promise to use async/await:

Before:

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    // Simulate fetching data from an API
    setTimeout(() => {
      resolve('Data fetched successfully');
    }, 1000);
  });
}
```

After:

```javascript
async function fetchData() {
  return new Promise((resolve, reject) => {
    // Simulate fetching data from an API
    setTimeout(() => {
      resolve('Data fetched successfully');
    }, 1000);
  });
}
```

Using async/await simplifies the syntax and makes the code more readable by allowing you to write asynchronous code in a synchronous style.

Potential pitfalls of using async/await include:

1. **Error Handling**: While async/await simplifies error handling by allowing you to use try/catch blocks, it's important to handle errors properly. Forgetting to handle errors can lead to uncaught exceptions and unexpected behavior.
2. **Promise Rejection**: When using async/await, if a promise is rejected inside an async function and not handled properly, it can lead to unhandled promise rejections.
3. **Performance**: In some cases, using async/await may introduce performance overhead compared to using promises directly. This is because async/await adds extra layers of abstraction and may result in slightly slower execution.
4. **Debugging**: Debugging code with async/await can be more challenging compared to synchronous code or code using promises. Understanding the order of execution and tracking down issues related to asynchronous behavior can be more complex.
5. **Nested Functions**: Using async/await can sometimes lead to deeply nested functions, especially when dealing with multiple asynchronous operations. This can make the code harder to read and maintain.

Despite these potential pitfalls, async/await is a powerful feature that can greatly improve the readability and maintainability of asynchronous code when used correctly. It's important to be aware of these pitfalls and follow best practices to mitigate them.

## **9. React Portals**: What are React Portals and how can they be used to render content outside the parent DOM hierarchy, such as modals or tooltips?

**=>** React Portals provide a way to render children into a DOM node that exists outside of the parent component's DOM hierarchy. This allows you to render content in a different part of the DOM, such as at the top level of the document body, while still logically being a child of the parent component.

Here's how React Portals work:

1. **Create a Portal**: To create a portal, you use the `ReactDOM.createPortal()` method. This method takes two arguments: the first argument is the JSX element or component you want to render, and the second argument is the DOM node where you want to render it.
2. **Render Content Outside Parent DOM**: By using portals, you can render content outside the parent DOM hierarchy. This is useful for scenarios like modals, tooltips, or any other scenario where you want to render content at a different position in the DOM tree.
3. **Example**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById('modal-root') // Render modal content outside the parent DOM hierarchy
  );
};

const App = () => {
  return (
    <div>
      <h1>App Content</h1>
      <Modal>
        <div>
          <h2>Modal Content</h2>
          <button>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
```

In this example, the `<Modal>` component uses `ReactDOM.createPortal()` to render its children (including the modal content) into a DOM node with the ID `modal-root`. This allows the modal content to be rendered outside of the parent component's DOM hierarchy.

Using React Portals can be helpful for managing z-index stacking, avoiding CSS conflicts, and ensuring that certain UI elements are positioned correctly regardless of their parent components.

## **10. JavaScript Closures**: Given a loop that creates functions, explain the common problem associated with closures inside loops and provide a solution to fix it.

**=>** In JavaScript, closures inside loops can lead to unexpected behavior due to the way closures capture variables. The common problem arises when you create functions inside a loop that access variables from the outer scope. Since JavaScript has function-level scope and closures capture variables by reference, the variables captured by the closures will reflect their final value after the loop has finished iterating, rather than the value they had at the time the closure was created.

Here's an example of the problem:

```javascript
function createFunctions() {
  var functions = [];
  for (var i = 0; i < 5; i++) {
    functions.push(function() {
      console.log(i);
    });
  }
  return functions;
}

var functions = createFunctions();
functions.forEach(function(func) {
  func(); // Outputs 5, 5, 5, 5, 5 instead of 0, 1, 2, 3, 4
});
```

In this example, all the functions pushed into the `functions` array capture the variable `i` by reference. When these functions are executed later, they all reference the same variable `i`, which has been incremented to `5` by the time they are called.

To fix this issue, you can create a new scope for each iteration of the loop by using an immediately-invoked function expression (IIFE) inside the loop. This way, each function captures its own copy of the loop variable at the time it's created.

Here's the corrected version using an IIFE:

```javascript
function createFunctions() {
  var functions = [];
  for (var i = 0; i < 5; i++) {
    (function(index) {
      functions.push(function() {
        console.log(index);
      });
    })(i);
  }
  return functions;
}

var functions = createFunctions();
functions.forEach(function(func) {
  func(); // Outputs 0, 1, 2, 3, 4
});
```

In this corrected version, each iteration of the loop creates its own closure with its own copy of the loop variable `i`, ensuring that each function captures the correct value of `i` at the time it's created.
