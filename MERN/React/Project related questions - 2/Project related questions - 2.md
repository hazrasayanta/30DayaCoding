# Project related questions - 2

## **1. Weather App with Hooks**: Develop a responsive weather application that uses React hooks to fetch and display weather data based on user input. Implement error handling for failed fetch operations.

**=>** Here's a basic example of a weather app using React hooks to fetch and display weather data based on user input:

```jsx
import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city" />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
```

Replace `'YOUR_API_KEY'` with your actual OpenWeatherMap API key.

This app allows users to input a city, fetch weather data from the OpenWeatherMap API, and display the temperature and weather description for that city. It also handles errors if the city is not found or if there is an issue with the API request.

## **2. Async Redux Quiz App**: Create a quiz application where questions are fetched asynchronously from an API. Use Redux to manage the state, including user scores, active questions, and user-selected answers.

**=>** Here's an example of an Async Redux Quiz App:

First, let's define our Redux actions and reducers:

```javascript
// actions.js
export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
export const SELECT_ANSWER = 'SELECT_ANSWER';

export const fetchQuestionsRequest = () => ({
  type: FETCH_QUESTIONS_REQUEST,
});

export const fetchQuestionsSuccess = (questions) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

export const fetchQuestionsFailure = (error) => ({
  type: FETCH_QUESTIONS_FAILURE,
  payload: error,
});

export const selectAnswer = (questionId, selectedAnswer) => ({
  type: SELECT_ANSWER,
  payload: { questionId, selectedAnswer },
});
```

```javascript
// reducers.js
import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  SELECT_ANSWER,
} from './actions';

const initialState = {
  loading: false,
  questions: [],
  error: null,
  userAnswers: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_QUESTIONS_SUCCESS:
      return { ...state, loading: false, questions: action.payload, error: null };
    case FETCH_QUESTIONS_FAILURE:
      return { ...state, loading: false, questions: [], error: action.payload };
    case SELECT_ANSWER:
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.selectedAnswer,
        },
      };
    default:
      return state;
  }
};

export default reducer;
```

Next, let's create our Redux thunk action for fetching questions asynchronously:

```javascript
// actions.js (continued)
export const fetchQuestions = () => {
  return async (dispatch) => {
    dispatch(fetchQuestionsRequest());
    try {
      const response = await fetch('https://example.com/api/questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      dispatch(fetchQuestionsSuccess(data));
    } catch (error) {
      dispatch(fetchQuestionsFailure(error.message));
    }
  };
};
```

Finally, let's create our main component to connect to Redux and display the quiz:

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectAnswer } from './actions';

const QuizApp = () => {
  const dispatch = useDispatch();
  const { loading, questions, error, userAnswers } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleAnswerSelection = (questionId, selectedAnswer) => {
    dispatch(selectAnswer(questionId, selectedAnswer));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          <ul>
            {question.options.map((option) => (
              <li key={option.id}>
                <label>
                  <input
                    type="radio"
                    value={option.id}
                    checked={userAnswers[question.id] === option.id}
                    onChange={() => handleAnswerSelection(question.id, option.id)}
                  />
                  {option.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizApp;
```

Make sure to replace `'https://example.com/api/questions'` with the actual URL of your API endpoint that serves the quiz questions. This example assumes that the API returns an array of question objects, where each question object has an `id`, `text`, and `options` array containing objects with `id` and `text` properties.

## **3. Object-Oriented Form Builder**: Design a dynamic form builder using JavaScript classes. Users should be able to add different form fields like text, dropdown, radio buttons, etc., each represented as a separate class instance.

**=>** Here's an example of how you can implement a dynamic form builder using JavaScript classes:

```javascript
// Define a base class for form fields
class FormField {
  constructor(label) {
    this.label = label;
  }

  render() {
    throw new Error('Method render() must be implemented');
  }
}

// Define classes for different types of form fields
class TextField extends FormField {
  render() {
    return `<div>
              <label>${this.label}</label>
              <input type="text">
            </div>`;
  }
}

class DropdownField extends FormField {
  constructor(label, options) {
    super(label);
    this.options = options;
  }

  render() {
    const optionsHtml = this.options.map((option) => `<option value="${option}">${option}</option>`).join('');
    return `<div>
              <label>${this.label}</label>
              <select>${optionsHtml}</select>
            </div>`;
  }
}

class RadioButtonField extends FormField {
  constructor(label, options) {
    super(label);
    this.options = options;
  }

  render() {
    const optionsHtml = this.options.map((option) => `<label><input type="radio" name="${this.label}" value="${option}">${option}</label>`).join('');
    return `<div>
              <label>${this.label}</label>
              ${optionsHtml}
            </div>`;
  }
}

// Define the FormBuilder class
class FormBuilder {
  constructor() {
    this.fields = [];
  }

  addField(field) {
    this.fields.push(field);
  }

  render() {
    const formHtml = this.fields.map((field) => field.render()).join('');
    return `<form>${formHtml}</form>`;
  }
}

// Example usage
const formBuilder = new FormBuilder();
formBuilder.addField(new TextField('Name'));
formBuilder.addField(new DropdownField('Country', ['USA', 'Canada', 'UK']));
formBuilder.addField(new RadioButtonField('Gender', ['Male', 'Female', 'Other']));
const formHtml = formBuilder.render();
console.log(formHtml);
```

This example defines a base class `FormField` with a method `render()` that must be implemented by its subclasses (`TextField`, `DropdownField`, `RadioButtonField`). Each form field class has its own implementation of the `render()` method to generate the HTML for that particular field type.

The `FormBuilder` class is responsible for maintaining a list of form fields and rendering them into HTML when needed. It has a method `addField()` to add new form fields, and a method `render()` to generate the HTML for the entire form.

## **4. Chatbot using Context**: Develop a simple chatbot interface in React, and use the Context API to manage the chat history. Include predefined responses based on user input.

**=>** Sure! Here's an example of how you can create a simple chatbot interface using React and the Context API to manage the chat history and predefined responses:

```jsx
import React, { useState, useContext, createContext } from 'react';

// Create a context to manage chat history
const ChatContext = createContext();

// Chatbot component
const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle user input
  const handleUserInput = (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    // Process user input and generate bot response
    const botResponse = generateBotResponse(message);
    setMessages([...messages, { text: botResponse, sender: 'bot' }]);
  };

  // Function to generate bot response
  const generateBotResponse = (message) => {
    // Predefined responses based on user input
    const responses = {
      'hi': 'Hello!',
      'how are you': 'I am doing well, thank you!',
      'bye': 'Goodbye!',
      // Add more predefined responses here
    };
    return responses[message.toLowerCase()] || "I'm sorry, I don't understand.";
  };

  return (
    <ChatContext.Provider value={{ messages, handleUserInput }}>
      <div className="chatbot">
        <ChatHistory />
        <UserInput />
      </div>
    </ChatContext.Provider>
  );
};

// Chat history component
const ChatHistory = () => {
  const { messages } = useContext(ChatContext);

  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

// User input component
const UserInput = () => {
  const [input, setInput] = useState('');
  const { handleUserInput } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      handleUserInput(input);
      setInput('');
    }
  };

  return (
    <form className="user-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

// Main App component
const App = () => {
  return (
    <div className="app">
      <h1>Chatbot Interface</h1>
      <Chatbot />
    </div>
  );
};

export default App;
```

In this example:

- We create a `ChatContext` using `createContext()` to manage the chat history.
- The `Chatbot` component provides the context value and contains the logic to handle user input and generate bot responses.
- The `ChatHistory` component displays the chat history using messages stored in the context.
- The `UserInput` component allows users to input messages and submit them to the chatbot.
- The main `App` component renders the `Chatbot` component.

You can expand this example by adding more predefined responses and enhancing the user interface with styling and animations.

## **5. Promise-based File Uploader**: Build an asynchronous file uploader that uses promises to track the upload progress and displays it to the user. It should handle multiple file uploads and report success or failure for each.

**=>** Here's an example of a Promise-based file uploader in React:

```jsx
import React, { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const uploadFiles = () => {
    setUploading(true);
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        // Simulate uploading delay
        setTimeout(() => {
          // Simulate upload success/failure randomly
          const success = Math.random() > 0.5;
          if (success) {
            setUploadStatus((prevStatus) => ({
              ...prevStatus,
              [file.name]: { status: 'success', message: 'Uploaded successfully!' },
            }));
            resolve();
          } else {
            setUploadStatus((prevStatus) => ({
              ...prevStatus,
              [file.name]: { status: 'error', message: 'Upload failed!' },
            }));
            reject();
          }
        }, 1000); // Simulate 1 second delay for upload
      });
    });

    // Wait for all upload promises to resolve or reject
    Promise.all(uploadPromises)
      .then(() => {
        setUploading(false);
        setFiles([]);
      })
      .catch(() => {
        setUploading(false);
      });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadFiles} disabled={files.length === 0 || uploading}>
        Upload
      </button>
      {uploading && <p>Uploading...</p>}
      {files.length > 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
      <div>
        {Object.keys(uploadStatus).map((fileName) => (
          <p key={fileName} style={{ color: uploadStatus[fileName].status === 'error' ? 'red' : 'green' }}>
            {fileName}: {uploadStatus[fileName].message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
```

In this component:

- Users can select multiple files using the `<input type="file" multiple />` element.
- When the "Upload" button is clicked, the `uploadFiles` function is triggered.
- Inside `uploadFiles`, a Promise is created for each selected file to simulate the upload process asynchronously.
- The upload status (success or failure) for each file is stored in the `uploadStatus` state object.
- After all uploads are completed, the `uploading` state is set to `false`, and the selected files are cleared.
- The component renders the selected files and their upload status. If an upload fails, an error message is displayed in red.
- You can further customize this component with additional features such as progress bars, error handling, and UI improvements.

## **6. Redux & WebSockets Dashboard**: Design a real-time dashboard that fetches initial data using async/await and then updates in real-time through WebSockets. Use Redux to manage the state of the data on the dashboard.

**=>** To create a real-time dashboard using Redux and WebSockets, you'll need to follow these steps:

1. Set up your Redux store to manage the state of the dashboard data.
2. Fetch the initial data asynchronously using async/await and populate the Redux store.
3. Establish a WebSocket connection to receive real-time updates from the server.
4. Handle WebSocket messages to update the Redux store with new data.
5. Render the dashboard components based on the data stored in the Redux store.

Here's an example implementation:

```jsx
// DashboardActions.js
export const UPDATE_DATA = 'UPDATE_DATA';

export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: data,
});
```

```jsx
// DashboardReducer.js
import { UPDATE_DATA } from './DashboardActions';

const initialState = {
  // Initial state of the dashboard data
  // You can define any relevant properties here
  // For example:
  // data: [],
  // loading: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        // Update the dashboard data with the new data
        // For example:
        // data: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
```

```jsx
// DashboardComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from './DashboardActions';

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.data);

  useEffect(() => {
    // Fetch initial data asynchronously using async/await
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/dashboard-data');
        const data = await response.json();
        dispatch(updateData(data));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();

    // Establish WebSocket connection
    const socket = new WebSocket('wss://api.example.com/socket');
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };
    socket.onmessage = (event) => {
      // Handle incoming WebSocket messages
      const newData = JSON.parse(event.data);
      dispatch(updateData(newData));
    };
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      // Cleanup WebSocket connection on component unmount
      socket.close();
    };
  }, [dispatch]);

  return (
    <div>
      {/* Render dashboard components based on dashboardData */}
      {/* For example: */}
      {/* <DataTable data={dashboardData} /> */}
      {/* <Charts data={dashboardData} /> */}
    </div>
  );
};

export default DashboardComponent;
```

In this example:

- `DashboardActions.js` defines the action type and action creator for updating the dashboard data.
- `DashboardReducer.js` defines the reducer function to update the state based on the dispatched actions.
- `DashboardComponent.js` is the main dashboard component that fetches initial data asynchronously, establishes a WebSocket connection for real-time updates, and renders the dashboard components based on the data stored in the Redux store.

Make sure to replace `'https://api.example.com/dashboard-data'` and `'wss://api.example.com/socket'` with the actual URLs of your API endpoints and WebSocket server.

## **7. Context-based Multi-language Site**: Develop a website that uses the Context API to switch between multiple languages. The language preference should be saved in localStorage, and translations should be fetched asynchronously when switching languages.

**=>** To create a website that supports multiple languages using the Context API and asynchronous translation loading, follow these steps:

1. Set up your project with React and create the necessary folder structure.
2. Define the language context and provider using the Context API.
3. Implement a mechanism to save and retrieve the user's language preference from localStorage.
4. Create language files for each supported language, containing key-value pairs for translation strings.
5. Fetch translations asynchronously when switching languages.
6. Use the language context in your components to retrieve and display translated strings.

Here's an example implementation:

```jsx
// LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(null);

  useEffect(() => {
    // Retrieve language preference from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Fetch translations asynchronously
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/translations/${language}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Save language preference to localStorage
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
```

```jsx
// translations/en.json
{
  "welcome": "Welcome to our website!",
  "about": "About Us",
  "services": "Our Services",
  "contact": "Contact Us"
}
```

```jsx
// translations/es.json
{
  "welcome": "¡Bienvenido a nuestro sitio web!",
  "about": "Sobre Nosotros",
  "services": "Nuestros Servicios",
  "contact": "Contáctenos"
}
```

```jsx
// App.js
import React from 'react';
import { LanguageProvider } from './LanguageContext';
import Header from './Header';
import Content from './Content';

const App = () => {
  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        <Content />
      </div>
    </LanguageProvider>
  );
};

export default App;
```

```jsx
// Header.js
import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const Header = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="Header">
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('es')}>Spanish</button>
    </div>
  );
};

export default Header;
```

```jsx
// Content.js
import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const Content = () => {
  const { language, translations } = useContext(LanguageContext);

  return (
    <div className="Content">
      <h1>{translations && translations.welcome}</h1>
      <p>{translations && translations.about}</p>
      <p>{translations && translations.services}</p>
      <p>{translations && translations.contact}</p>
    </div>
  );
};

export default Content;
```

In this example:

- `LanguageContext.js` defines the language context and provider, and it handles fetching translations asynchronously and saving/retrieving the user's language preference from localStorage.
- Language files (`en.json`, `es.json`, etc.) contain translations for each supported language.
- `Header.js` contains buttons to switch between languages, and it calls the `changeLanguage` function provided by the language context.
- `Content.js` uses the language context to access translations and display them in the components.

## **8. Async Filterable Product Grid**: Create a product grid that displays items fetched from an API. Implement filters and sorting features, making sure each filter or sort action triggers a new asynchronous fetch to the server.

**=>** To create an Async Filterable Product Grid with React, you'll need to implement the following steps:

1. Set up your project with React and create the necessary folder structure.
2. Create components for the product grid, filters, and sorting options.
3. Implement asynchronous fetching of product data from an API.
4. Create state variables to manage the product data, filter criteria, and sorting options.
5. Implement functions to fetch product data asynchronously based on filter and sorting criteria.
6. Create UI components to display the product grid, filters, and sorting options.
7. Handle user interactions to apply filters and sorting options, triggering new asynchronous data fetching.
8. Render the product grid with filtered and sorted data.

Here's a basic example of how you can structure your code:

```jsx
// App.js
import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Filters from './components/Filters';
import SortingOptions from './components/SortingOptions';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortingOption, setSortingOption] = useState('');

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, display all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to filter products based on filter criteria
  const applyFilters = () => {
    let filtered = products;

    // Apply filter criteria
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => product.price >= filters.priceRange.min &&
                                             product.price <= filters.priceRange.max);
    }

    // Update filtered products state
    setFilteredProducts(filtered);
  };

  // Function to sort products based on sorting option
  const applySorting = () => {
    let sorted = [...filteredProducts];

    if (sortingOption === 'price-low-to-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortingOption === 'price-high-to-low') {
      sorted.sort((a, b) => b.price - a.price);
    }

    // Update filtered products state with sorted data
    setFilteredProducts(sorted);
  };

  useEffect(() => {
    // Apply filters whenever filter criteria changes
    applyFilters();
  }, [filters]);

  useEffect(() => {
    // Apply sorting whenever sorting option changes
    applySorting();
  }, [sortingOption]);

  return (
    <div className="App">
      <h1>Product Grid</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <SortingOptions sortingOption={sortingOption} setSortingOption={setSortingOption} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default App;
```

In this example:

- The `App` component manages the state of products, filter criteria, and sorting options.
- It fetches product data from an API asynchronously when the component mounts.
- The `applyFilters` function filters the products based on the filter criteria.
- The `applySorting` function sorts the products based on the selected sorting option.
- The `useEffect` hooks are used to apply filters and sorting whenever the filter criteria or sorting option changes.
- The `Filters` and `SortingOptions` components allow users to set filter criteria and sorting options.
- The `ProductGrid` component displays the filtered and sorted products.

## **9. Class-based Canvas Drawing Tool**: Design a drawing tool using the HTML5 Canvas API and JavaScript classes. Allow users to choose different brush types, colors, and sizes, each represented and managed through class instances.

**=>** Here's a basic implementation of a class-based Canvas Drawing Tool using HTML5 Canvas API and JavaScript classes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Canvas Drawing Tool</title>
<style>
  canvas {
    border: 1px solid #000;
  }
</style>
</head>
<body>
<canvas id="canvas" width="800" height="600"></canvas>

<script>
class DrawingTool {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.isDrawing = false;
    this.brushSize = 5;
    this.brushColor = '#000000';
  }

  startDrawing(event) {
    this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
  }

  draw(event) {
    if (this.isDrawing) {
      this.context.lineTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
      this.context.strokeStyle = this.brushColor;
      this.context.lineWidth = this.brushSize;
      this.context.stroke();
    }
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  setBrushSize(size) {
    this.brushSize = size;
  }

  setBrushColor(color) {
    this.brushColor = color;
  }
}

const canvas = document.getElementById('canvas');
const drawingTool = new DrawingTool(canvas);

canvas.addEventListener('mousedown', (event) => {
  drawingTool.startDrawing(event);
});

canvas.addEventListener('mousemove', (event) => {
  drawingTool.draw(event);
});

canvas.addEventListener('mouseup', () => {
  drawingTool.stopDrawing();
});

canvas.addEventListener('mouseleave', () => {
  drawingTool.stopDrawing();
});
</script>
</body>
</html>
```

In this implementation:

- The `DrawingTool` class encapsulates the functionality of the drawing tool, including methods to start drawing, draw, and stop drawing.
- It allows users to set the brush size and color dynamically.
- Event listeners are added to the canvas element to handle mouse events for drawing.
- When the mouse is pressed down on the canvas, drawing starts. As the mouse moves, the `draw` method is called to draw lines. When the mouse is released or leaves the canvas, drawing stops.

## **10. Redux Shopping Wishlist**: Build a wishlist feature for an e-commerce site using Redux. Users should be able to add items to their wishlist, remove them, or move them to the cart. Integrate with a backend using async/await for CRUD operations on the wishlist.

**=>** Below is a basic implementation of a Redux Shopping Wishlist feature:

First, let's define the Redux store, actions, and reducers:

```javascript
// actions.js
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const MOVE_TO_CART = 'MOVE_TO_CART';

export const addToWishlist = (item) => ({
  type: ADD_TO_WISHLIST,
  payload: item,
});

export const removeFromWishlist = (itemId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: itemId,
});

export const moveToCart = (itemId) => ({
  type: MOVE_TO_CART,
  payload: itemId,
});
```

```javascript
// reducers.js
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, MOVE_TO_CART } from './actions';

const initialState = {
  wishlistItems: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.id !== action.payload),
      };
    case MOVE_TO_CART:
      const updatedWishlist = state.wishlistItems.filter(item => item.id !== action.payload);
      return {
        ...state,
        wishlistItems: updatedWishlist,
        // Additional logic to move item to cart
      };
    default:
      return state;
  }
};

export default wishlistReducer;
```

Then, we integrate these reducers into the Redux store:

```javascript
// store.js
import { createStore, combineReducers } from 'redux';
import wishlistReducer from './reducers';

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
});

const store = createStore(rootReducer);

export default store;
```

Now, in your components, you can dispatch actions to add items to the wishlist, remove them, or move them to the cart:

```javascript
// WishlistComponent.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist, moveToCart } from './actions';

const WishlistComponent = () => {
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleAddToWishlist = (item) => {
    dispatch(addToWishlist(item));
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const handleMoveToCart = (itemId) => {
    dispatch(moveToCart(itemId));
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlistItems.map(item => (
          <li key={item.id}>
            {item.name} <button onClick={() => handleRemoveFromWishlist(item.id)}>Remove</button>
            <button onClick={() => handleMoveToCart(item.id)}>Move to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistComponent;
```

This is a basic setup for a Redux-powered shopping wishlist feature. You can further extend it by adding async operations for CRUD operations with a backend API and integrating it with your e-commerce application.
