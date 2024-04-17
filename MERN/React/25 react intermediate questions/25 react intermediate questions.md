# 25 react intermediate questions

## **1. Given a list of checkbox items, transfer checked items from one container to the other.**

**=>** Here's a simple React component that allows users to transfer checked items from one container to another using checkboxes:

```jsx
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
```

In this component:

- The `items` state represents the list of available items, each with an `id`, `name`, and `checked` property.
- The `selectedItems` state holds the list of items that have been selected and transferred.
- When a checkbox is toggled, the `handleToggle` function updates the `checked` property of the corresponding item in the `items` state.
- The `handleTransfer` function filters the checked items from the `items` state and adds them to the `selectedItems` state. Then, it removes the transferred items from the `items` state.
- The component renders two sections: one for available items and one for selected items. Each item is rendered as a checkbox input with its corresponding label.

## **2. Given a textarea and a document box, Insert the text in the document in such a way that it HIGHLIGHTS the text content which is most recently added to the document.**

**=>** You can achieve this by maintaining a separate state to store the text content of the document along with the most recently added text. Here's a basic implementation using React:

```jsx
import React, { useState } from 'react';

const HighlightedDocument = () => {
  const [documentContent, setDocumentContent] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const handleTextareaChange = (event) => {
    const newText = event.target.value;
    setDocumentContent(newText);
    setHighlightedText(newText);
  };

  const handleInsertText = () => {
    // Logic to insert text into the document
    // Here, we simply append the text to the existing content
    const newText = documentContent + '\nNew text added here.';
    setDocumentContent(newText);
    setHighlightedText('New text added here.');
  };

  return (
    <div>
      <h2>Highlighted Document</h2>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={documentContent}
          onChange={handleTextareaChange}
          rows={10}
          cols={50}
          placeholder="Type or paste your document content here..."
        />
      </div>
      <div>
        <button onClick={handleInsertText}>Insert Text</button>
      </div>
      <div style={{ marginTop: '10px', border: '1px solid black', padding: '5px' }}>
        <p>Document:</p>
        <pre>
          {documentContent.split('\n').map((line, index) => (
            <span key={index} style={{ backgroundColor: line === highlightedText ? 'yellow' : 'transparent' }}>
              {line}
              <br />
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default HighlightedDocument;
```

In this component:

- The `documentContent` state stores the entire text content of the document.
- The `highlightedText` state stores the most recently added text content.
- The `handleTextareaChange` function updates both states when the textarea content changes.
- The `handleInsertText` function simulates inserting text into the document by appending a new line with the text "New text added here." to the existing content. It updates both states accordingly.
- The document is displayed in a `pre` element, where each line is rendered within a `span`. The background color of the `span` is set to yellow if its content matches the `highlightedText`.

## **3. Given a **Select All** checkbox - toggle the children's checkboxes in such a way that when the **select all** button is clicked, all the boxes are checked. Similarly, when the button is toggled, the checkboxes become unchecked.**

**=>** You can achieve this functionality by using state to manage the checked state of each individual checkbox and a separate state to manage the checked state of the "Select All" checkbox. Here's a basic implementation using React:

```jsx
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
      checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes);
    setSelectAllChecked(updatedCheckboxes.every((checkbox) => checkbox.checked));
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={selectAllChecked} onChange={toggleSelectAll} />
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
```

In this component:

- The `selectAllChecked` state tracks whether the "Select All" checkbox is checked or not.
- The `checkboxes` state maintains an array of checkbox objects, each containing an `id`, `label`, and `checked` property.
- The `toggleSelectAll` function toggles the checked state of all checkboxes when the "Select All" checkbox is clicked. It updates both the `selectAllChecked` state and the `checked` property of each checkbox.
- The `handleCheckboxChange` function toggles the checked state of individual checkboxes when they are clicked. It updates the `checked` property of the clicked checkbox and checks whether all checkboxes are checked to update the `selectAllChecked` state accordingly.
- The checkboxes are rendered within an unordered list (`<ul>`) with each checkbox rendered as a list item (`<li>`). The "Select All" checkbox and individual checkboxes use their respective `checked` properties to manage their checked state.

## **4. Create a function **sum** that implements currying. Currying is a transformation of functions that translates a function from being callable as f(x, y, z) into callable as f(x)(y)(z).**

**=>** Sure, here's how you can implement currying in React using a functional component:

```jsx
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
```

In this example:

- We define the `sum` function using arrow function syntax, which returns another arrow function, which in turn returns another arrow function. This creates a curried function.
- Inside the `CurriedSum` functional component, we call `sum` with one argument at a time, resulting in a chain of function calls that eventually returns the sum of all arguments.
- The result is rendered in the component.

## **5. Given an object with functions first() and second() - Guess the output of the given snippet that contains two function calls, one is an arrow function and the other is a normal function.**

**=>** Sure, here's an example of how you might implement this in a React component:

```javascript
import React from 'react';

const MyComponent = () => {
  const obj = {
    first: function() {
      console.log('Inside first function');
      console.log('This:', this);
    },
    second: function() {
      console.log('Inside second function');
      console.log('This:', this);
    }
  };

  const arrowFunc = () => {
    obj.first();
  };

  function normalFunc() {
    obj.second();
  }

  arrowFunc();
  normalFunc();

  return (
    <div>
      Check the console for output.
    </div>
  );
};

export default MyComponent;
```

In this React component, the `MyComponent` renders a simple `<div>` element, and in the component body, it defines the `obj` object with `first()` and `second()` functions. It then defines `arrowFunc` as an arrow function and `normalFunc` as a regular function, each calling one of the functions in `obj`. Finally, it calls both `arrowFunc` and `normalFunc`. The output will be logged to the console.

## **6. Given a set of instructions in javascript, guess the output of the given code snippet. It will have promises, setTimeout(), setInterval(), and other asynchronous APIs of javascript.**

**=>** Sure, here's an example of a React component containing asynchronous operations like promises, setTimeout(), and setInterval():

```javascript
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
      setMessage((prevMessage) => prevMessage + 'Timeout completed after 1 second\n');
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
```

In this component:

- We use the `useState` hook to manage the state of the message.
- In the `useEffect` hook, we create a promise that resolves after 2 seconds and updates the message state when resolved.
- We also use `setTimeout` to update the message state after 1 second.
- Additionally, we use `setInterval` to update the message state every 1.5 seconds. We also clean up the setInterval using the return function of the useEffect hook to prevent memory leaks.
- The message state is displayed within a `<pre>` tag to preserve the newline formatting.

## **7. useOutsideClick custom hook can be used to determine if a click event was triggered outside of the target element's boundary. Create a function called useOutsideClick that triggers a toast if a click event is triggered outside of a centered div element.**

**=>** Here's how you can implement the `useOutsideClick` custom hook in React to trigger a toast notification when a click event occurs outside of a centered `div` element:

```javascript
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
```

In this example:

- We define the `useOutsideClick` custom hook, which takes a `ref` and a `callback` function. It listens for click events outside of the referenced element and triggers the callback function when such an event occurs.
- In the `App` component, we create a centered `div` element using the `useRef` hook to obtain a reference to it.
- We define a callback function `handleOutsideClick` that triggers a toast notification (in this case, an alert) when a click event occurs outside of the centered `div`.
- We use the `useOutsideClick` hook, passing in the `centeredDivRef` and `handleOutsideClick` function as arguments.
- When a click event occurs outside of the centered `div`, the toast notification is triggered.

## **8. A Typewriter Effect is something where a piece of text constructs itself with some milliseconds in delay. You will see the text getting generated from start to finish. In this problem, create a Typewriter Effect from scratch using native React and/or Javascript functions.**

**=>** Here's how you can implement a Typewriter Effect using React:

```jsx
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
```

In this implementation:

- We create a `Typewriter` component that takes `text` and `speed` as props.
- Inside the component, we use `useState` hooks to manage the `displayText` (the currently displayed text) and `currentIndex` (the index of the next character to be displayed).
- We use the `useEffect` hook to update the `displayText` and `currentIndex` at regular intervals determined by the `speed` prop.
- The `useEffect` hook sets up a timer using `setTimeout` to add the next character from the `text` prop to the `displayText` until the entire text is displayed.
- The component renders a `span` element to display the `displayText`.
- In the `App` component (or any other parent component), we can use the `Typewriter` component and pass the desired text and speed as props.

## **9. Create a Command Palette that opens up with Keyboard events like Command + K. In this problem, The command palette will have navigation links to which a user can navigate. Also, the user can search on the page on the command palette for a link to which they want to navigate.**

**=>** Here's a basic implementation of a Command Palette in React that opens with the keyboard shortcut Command + K. Users can navigate through links and search for specific links:

```jsx
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
```

This example assumes that you have a list of commands with `label` and `url` properties. The Command Palette opens when the user presses Command + K and allows them to search through the commands and navigate to the selected link.

## **10. Create a Link Previewer component in React that takes in children prop, that, when hovered over, displays the link that was provided to the component as a URL prop. This preview component will be an overlay component that displays the website based on their URLs.**

=> Here's a basic implementation of a Link Previewer component in React:

```jsx
import React, { useState } from 'react';

const LinkPreviewer = ({ children, url }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </span>
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '300px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
          }}
        >
          <iframe
            title="Link Preview"
            src={url}
            width="100%"
            height="200"
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
};

export default LinkPreviewer;
```

You can use this component like this:

```jsx
import React from 'react';
import LinkPreviewer from './LinkPreviewer';

const App = () => {
  return (
    <div>
      <h1>Hover over the link to see the preview</h1>
      <LinkPreviewer url="https://www.example.com">
        <a href="https://www.example.com">Example Link</a>
      </LinkPreviewer>
    </div>
  );
};

export default App;
```

This component displays a link (`Example Link`) as children. When hovered over, it displays a preview of the website provided in the `url` prop within an iframe. Adjust the styling and iframe dimensions as needed.

## **11. Create a Form Component in React that renders out a list of input fields and validates them before finally submitting the form. Create the form from scratch WITHOUT using any third-party libraries like Formik or react-hook-forms.**

=> Here's a basic implementation of a form component in React that renders a list of input fields and validates them before submitting the form:

```jsx
import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, submit data
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } else {
      // Form has errors, do not submit
      console.error('Form has errors:', formErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      <h2>Form</h2>
      {isSubmitted ? (
        <p>Form successfully submitted!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Form;
```

This component renders a form with input fields for name, email, password, and confirm password. It validates the form fields on submission and displays error messages if any. If the form is successfully submitted, it displays a success message.

## **12. Given a list of products and a list of filters, create a multi-filters buttons bar with a list of filters. If any of the filter is clicked, the list of products should change.**

**=>** Here's an example implementation of a multi-filters buttons bar component in React:

```jsx
import React, { useState } from 'react';

const MultiFilterButtons = ({ products, filters }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Filter products based on active filters
  React.useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        activeFilters.every((filter) => product.tags.includes(filter))
      );
      setFilteredProducts(filtered);
    }
  }, [activeFilters, products]);

  return (
    <div>
      <h2>Filters</h2>
      <div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            style={{
              backgroundColor: activeFilters.includes(filter) ? 'blue' : 'gray',
              color: 'white',
              margin: '5px',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {filter}
          </button>
        ))}
      </div>
      <h2>Products</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MultiFilterButtons;
```

You can use this component by passing in the `products` array and the `filters` array as props. The `products` array should contain objects with a `tags` property representing the filters associated with each product. The `filters` array should contain unique filter values.

Here's how you can use the `MultiFilterButtons` component:

```jsx
import React from 'react';
import MultiFilterButtons from './MultiFilterButtons';

const products = [
  { id: 1, name: 'Product 1', tags: ['tag1', 'tag2'] },
  { id: 2, name: 'Product 2', tags: ['tag1', 'tag3'] },
  { id: 3, name: 'Product 3', tags: ['tag2', 'tag3'] },
  { id: 4, name: 'Product 4', tags: ['tag3', 'tag4'] },
];

const filters = ['tag1', 'tag2', 'tag3', 'tag4'];

const App = () => {
  return (
    <div>
      <MultiFilterButtons products={products} filters={filters} />
    </div>
  );
};

export default App;
```

This will render a multi-filters buttons bar where you can toggle filters, and the list of products will change accordingly.

## **13. Create a minimal Lightbox Gallery. A lightbox gallery is an image gallery with many images lined up as tiles. Once a tile is clicked, a full-screen image opens up in a modal, showing the clicked picture. It also has all the other images lined up at the bottom. Once a tile at the bottom is clicked, it shows the clicked image in full screen.**

**=>** Here's a minimal implementation of a Lightbox Gallery in React:

```jsx
import React, { useState } from 'react';
import './LightboxGallery.css'; // CSS file for styling

const LightboxGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="thumbnail"
          onClick={() => openLightbox(image)}
        />
      ))}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxGallery;
```

And here's an example of how you can use the `LightboxGallery` component:

```jsx
import React from 'react';
import LightboxGallery from './LightboxGallery';

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  // Add more image URLs here...
];

const App = () => {
  return (
    <div>
      <h1>Lightbox Gallery</h1>
      <LightboxGallery images={images} />
    </div>
  );
};

export default App;
```

Make sure to create a CSS file (`LightboxGallery.css`) for styling the gallery. The CSS file should include styles for the gallery layout, thumbnails, and the lightbox modal.

```

//LightboxGallery.css
.gallery {
  display: flex;
  flex-wrap: wrap;
}

.thumbnail {
  width: 150px;
  height: 150px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.thumbnail:hover {
  transform: scale(1.1);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 100%;
}

```

## **14. A modal is an overlay screen that appears when the user performs some action on the website. For example, You must be familiar with a window popping on many websites when you click the sign-in buttons. You are required to create something similar, but minimal.**

=> Sure, here's a minimal example of how you can create a modal in React:

```jsx
import React, { useState } from 'react';
import './Modal.css';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>This is a Modal</h2>
            <p>Click outside the modal to close</p>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
```

And the accompanying CSS file `Modal.css`:

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
```

This code creates a simple modal component in React. When the "Open Modal" button is clicked, the modal appears, and clicking outside the modal or the "Close Modal" button closes it.

## **15. As seen on the TailwindCSS website, create a horizontal grid of moving cards that loop infinitely. When hovered over, the cards slow down and are clickable.**

=> 

Got it! Here's the React-only version of the moving cards component:

```jsx
import React from 'react';
import './MovingCards.css';

const MovingCards = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="relative w-full max-w-screen-lg">
        <div className="overflow-hidden relative">
          <div className="flex space-x-4 -translate-x-0 animate-scroll">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-48 h-32 bg-white rounded-md shadow-md flex-shrink-0 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="p-4">
                  <h2 className="text-lg font-semibold">Card {index + 1}</h2>
                  <p>This is a card.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingCards;
```

This React component creates a horizontal grid of moving cards. Each card is a React component, and their movement is achieved using CSS animations and transitions. Adjust the number of cards and other styles as needed.

## **16. Keypress events are triggered whenever a user hits any of the keys on the keyboard and some action happens on the web application. Create a custom hook called useKeyPress to listen for Key press events. Once a specific key combination is hit, show a toast or a modal on the screen.**

**=>** Here's how you can create a custom hook called `useKeyPress` to listen for key press events and trigger an action when a specific key combination is hit:

```javascript
import { useEffect } from 'react';

const useKeyPress = (targetKey, callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    // Add event listener for key down event
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetKey, callback]);
};

export default useKeyPress;
```

You can use this `useKeyPress` hook in your component like this:

```javascript
import React from 'react';
import useKeyPress from './useKeyPress'; // Assuming you've placed the hook in a separate file

const MyComponent = () => {
  const handleKeyPress = () => {
    // Action to perform when the specific key combination is hit
    // For example, showing a toast or modal
    console.log('Key combination pressed!');
  };

  // Using the useKeyPress hook to listen for 'Enter' key press
  useKeyPress('Enter', handleKeyPress);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
```

In this example, the hook listens for the 'Enter' key press event, and when it occurs, it calls the `handleKeyPress` function, where you can define the action you want to perform, such as showing a toast or modal.

## **17. Implement a custom hook to get and set values from and to Local Storage. A custom hook is a way (or rather a mechanism) to reuse stateful logic. State and effects inside a custom hook are completely isolated.**

**=>** Sure, here's how you can implement a custom hook called `useLocalStorage` to get and set values from and to local storage:

```javascript
import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get initial value from local storage or use the initialValue if not available
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return initialValue;
    }
  });

  // Function to set a new value to local storage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting data to local storage:', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
```

You can use this `useLocalStorage` hook in your components like this:

```javascript
import React from 'react';
import useLocalStorage from './useLocalStorage'; // Assuming you've placed the hook in a separate file

const MyComponent = () => {
  // Using the useLocalStorage hook to get and set a value from and to local storage
  const [name, setName] = useLocalStorage('name', '');

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleInputChange} />
      <p>Hello, {name}!</p>
    </div>
  );
};

export default MyComponent;
```

In this example, the hook `useLocalStorage` takes a `key` and an `initialValue` as parameters and returns a stateful value `storedValue` and a function `setValue` to set the value to local storage. This hook encapsulates the logic of getting and setting values to local storage, making it easy to reuse across components.

## **18. A countdown timer has hours, minutes, and seconds that count down to 0 when started. In this problem, you are required to create a Countdown component that takes in an input of minutes, that when started, counts down to zero and prints the countdown on the screen.**

**=>** Here's a basic implementation of a Countdown component in React:

```jsx
import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = ({ minutes }) => {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="countdown">
      <h2>Countdown Timer</h2>
      <div className="timer">{formatTime(time)}</div>
    </div>
  );
};

export default Countdown;
```

And here's a simple CSS file `Countdown.css` for styling the countdown timer:

```css
.countdown {
  text-align: center;
}

.timer {
  font-size: 2rem;
  font-weight: bold;
}
```

You can use this Countdown component by passing the `minutes` prop to specify the duration of the countdown in minutes.

# **19. Create a Job Feed page where the latest job postings are fetched from the Hackernews API. On clicking the job posting, the user should be able to land on the jobs page, which is an external website. The data is displayed on a grid with multiple columns and rows. Use modern react hooks concepts to ace this problem.**

**=>** Here's a solution using React hooks to fetch job postings from the Hacker News API and display them on a grid:

```jsx
import React, { useState, useEffect } from 'react';
import './JobFeed.css';

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
      const jobIds = await response.json();
      const jobPromises = jobIds.slice(0, 30).map(async (id) => {
        const jobResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return jobResponse.json();
      });
      const jobData = await Promise.all(jobPromises);
      setJobs(jobData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div className="job-feed">
      <h1>Job Feed</h1>
      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-item">
            <h3>{job.title}</h3>
            <p>{job.by}</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFeed;

/* JobFeed.css */

.job-feed {
  max-width: 800px;
  margin: 0 auto;
}

.job-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.job-item {
  border: 1px solid #ccc;
  padding: 20px;
}

.job-item h3 {
  margin-top: 0;
}

.job-item a {
  display: block;
  margin-top: 10px;
  text-decoration: none;
  color: blue;
}
```

This code fetches the latest job postings from the Hacker News API, limits them to the latest 30, and displays them on a grid layout. Each job posting includes the title, author, and a link to view the job externally.
