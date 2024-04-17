# Project related questions - 1

## **1. E-Commerce Cart Context**: Create a shopping cart using React's Context API. Allow items to be added, removed, or adjusted in quantity. Ensure the cart persists across page reloads using localStorage.

**=>** To create an e-commerce cart using React's Context API and localStorage, you can follow these steps:

1. **Create Cart Context**: Define a context for managing the shopping cart state.
2. **Implement Cart Provider**: Create a CartProvider component to wrap your application and provide the cart state and functions to manage it.
3. **Add Items to Cart**: Implement functions to add items to the cart.
4. **Remove Items from Cart**: Implement functions to remove items from the cart.
5. **Adjust Quantity**: Implement functions to adjust the quantity of items in the cart.
6. **Persist Cart State**: Use localStorage to persist the cart state across page reloads.
7. **Use Cart Context**: Consume the CartContext in your components to access the cart state and functions.

Here's a simplified implementation:

```jsx
// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeItemFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const adjustItemQuantity = (itemId, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        adjustItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
```

Then, you can use this context in your components:

```jsx
// App.js
import React from 'react';
import { CartProvider } from './CartContext';
import ShoppingCart from './ShoppingCart';

const App = () => {
  return (
    <CartProvider>
      <div className="App">
        <h1>E-Commerce App</h1>
        <ShoppingCart />
      </div>
    </CartProvider>
  );
};

export default App;
```

```jsx
// ShoppingCart.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const ShoppingCart = () => {
  const { cart, addItemToCart, removeItemFromCart, adjustItemQuantity } =
    useContext(CartContext);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => adjustItemQuantity(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
```

This is a basic example to get you started. You can expand on this by adding more features such as calculating total price, displaying product details, etc.

## **2. Redux Task Manager**: Design a task manager using Redux to maintain the state. Users should be able to add, delete, and mark tasks as completed. Integrate asynchronous operations to fetch tasks from a mock API using async/await.

**=>** Here's how you can create a task manager using Redux to maintain the state, allowing users to add, delete, and mark tasks as completed. We'll also integrate asynchronous operations to fetch tasks from a mock API using async/await.

First, let's set up the Redux store, actions, reducers, and middleware for handling asynchronous operations:

```javascript
// actions.js
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const toggleTask = (taskId) => ({
  type: TOGGLE_TASK,
  payload: taskId,
});

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});
```

```javascript
// reducers.js
import { combineReducers } from 'redux';
import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from './actions';

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case TOGGLE_TASK:
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case FETCH_TASKS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return true;
    case FETCH_TASKS_SUCCESS:
    case FETCH_TASKS_FAILURE:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_TASKS_FAILURE:
      return action.payload;
    case FETCH_TASKS_REQUEST:
    case FETCH_TASKS_SUCCESS:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  tasks: tasksReducer,
  loading: loadingReducer,
  error: errorReducer,
});
```

```javascript
// middleware.js
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default applyMiddleware(thunk);
```

Next, let's create a component to display the task manager and handle user interactions:

```javascript
// TaskManager.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  deleteTask,
  toggleTask,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
} from './actions';

const TaskManager = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchTasksRequest());
    fetch('https://your-api-url/tasks')
      .then((response) => response.json())
      .then((data) => dispatch(fetchTasksSuccess(data)))
      .catch((error) => dispatch(fetchTasksFailure(error.message)));
  }, [dispatch]);

  const handleAddTask = () => {
    const newTask = { id: tasks.length + 1, text: 'New Task', completed: false };
    dispatch(addTask(newTask));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleTask = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
```

Finally, set up your Redux store and wrap your application with it:

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import middleware from './middleware';
import TaskManager from './TaskManager';

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <TaskManager />
  </Provider>,
  document.getElementById('root')
);
```

This implementation provides a basic task manager with Redux state management and asynchronous operations for fetching tasks. Adjust it according to your specific requirements and API structure.

## **3. Chat Application with Hooks**: Develop a simple chat application where users can send and receive messages in real-time. Use React hooks for state management and Socket.io for real-time communication.

**=>** To create a simple chat application using React hooks for state management and Socket.io for real-time communication, follow these steps:

1. Set up your project:

   - Create a new React project using Create React App or any other method you prefer.
   - Install Socket.io client library using npm or yarn: `npm install socket.io-client` or `yarn add socket.io-client`.
2. Create a socket instance and handle real-time communication:

   ```javascript
   // socket.js
   import io from 'socket.io-client';

   const socket = io('http://localhost:3001'); // Replace with your server URL

   export default socket;
   ```
3. Create a Chat component to manage the chat interface and handle user input:

   ```javascript
   // Chat.js
   import React, { useState, useEffect } from 'react';
   import socket from './socket';

   const Chat = () => {
     const [message, setMessage] = useState('');
     const [messages, setMessages] = useState([]);

     useEffect(() => {
       socket.on('message', (message) => {
         setMessages((prevMessages) => [...prevMessages, message]);
       });

       return () => {
         socket.off('message');
       };
     }, []);

     const handleMessageChange = (e) => {
       setMessage(e.target.value);
     };

     const sendMessage = () => {
       if (message.trim() !== '') {
         socket.emit('sendMessage', message);
         setMessage('');
       }
     };

     return (
       <div>
         <div>
           {messages.map((msg, index) => (
             <div key={index}>{msg}</div>
           ))}
         </div>
         <input type="text" value={message} onChange={handleMessageChange} />
         <button onClick={sendMessage}>Send</button>
       </div>
     );
   };

   export default Chat;
   ```
4. Set up the server-side code to handle socket connections and messages:

   ```javascript
   // server.js
   const express = require('express');
   const http = require('http');
   const socketIo = require('socket.io');

   const app = express();
   const server = http.createServer(app);
   const io = socketIo(server);

   io.on('connection', (socket) => {
     console.log('New client connected');

     socket.on('disconnect', () => {
       console.log('Client disconnected');
     });

     socket.on('sendMessage', (message) => {
       console.log('Received message:', message);
       io.emit('message', message);
     });
   });

   const PORT = process.env.PORT || 3001;
   server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```
5. Run your server using `node server.js`.
6. Use the Chat component in your main App component:

   ```javascript
   // App.js
   import React from 'react';
   import Chat from './Chat';

   const App = () => {
     return (
       <div>
         <h1>Real-time Chat Application</h1>
         <Chat />
       </div>
     );
   };

   export default App;
   ```
7. Start your React app using `npm start` or `yarn start`.

Now you have a simple chat application where users can send and receive messages in real-time using React hooks and Socket.io. Customize and style it according to your requirements.

## **4. Object-Oriented Game**: Design a small game, maybe a tic-tac-toe or a card game, using JavaScript classes. Ensure each game component, like a card or game board, is an instance of a class.

**=>** Sure, let's create a simple tic-tac-toe game using JavaScript classes. We'll have classes for the game board, players, and the game itself.

```javascript
class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

class GameBoard {
  constructor() {
    this.cells = Array(9).fill(null);
  }

  display() {
    console.log('-------------');
    for (let i = 0; i < 9; i += 3) {
      console.log(`| ${this.cells[i] || ' '} | ${this.cells[i + 1] || ' '} | ${this.cells[i + 2] || ' '} |`);
      console.log('-------------');
    }
  }

  isCellEmpty(index) {
    return this.cells[index] === null;
  }

  isBoardFull() {
    return this.cells.every(cell => cell !== null);
  }

  markCell(index, symbol) {
    if (this.isCellEmpty(index)) {
      this.cells[index] = symbol;
      return true;
    }
    return false;
  }

  checkWinner(symbol) {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination => combination.every(index => this.cells[index] === symbol));
  }
}

class TicTacToeGame {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.board = new GameBoard();
    this.winner = null;
  }

  switchPlayer() {
    this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
  }

  playTurn(index) {
    if (!this.board.isBoardFull() && !this.winner) {
      if (this.board.markCell(index, this.currentPlayer.symbol)) {
        this.board.display();
        if (this.board.checkWinner(this.currentPlayer.symbol)) {
          this.winner = this.currentPlayer;
          console.log(`${this.winner.name} wins!`);
        } else if (this.board.isBoardFull()) {
          console.log('It\'s a draw!');
        } else {
          this.switchPlayer();
          console.log(`Next turn: ${this.currentPlayer.name}`);
        }
      } else {
        console.log('Invalid move. Try again.');
      }
    }
  }
}

// Example usage:
const player1 = new Player('Player 1', 'X');
const player2 = new Player('Player 2', 'O');

const game = new TicTacToeGame(player1, player2);
game.playTurn(0); // Player 1's turn
game.playTurn(4); // Player 2's turn
game.playTurn(1); // Player 1's turn
game.playTurn(5); // Player 2's turn
game.playTurn(2); // Player 1 wins!
```

This implementation provides a basic structure for a tic-tac-toe game using JavaScript classes. You can extend and modify it as needed, adding features like a graphical interface or additional game modes.

## **5. Promise-based Image Loader**: Create an image gallery that loads images via promises. Images should be fetched asynchronously, and the gallery should display a loading spinner until all images are fully loaded.

**=>** Sure, here's an example of how you can create an image gallery that loads images via promises and displays a loading spinner until all images are fully loaded:

```javascript
import React, { useState, useEffect } from 'react';

const ImageGallery = ({ imageUrls }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(imageUrls.map(url => loadImage(url)))
      .then(() => setLoading(false))
      .catch(error => console.error('Error loading images:', error));
  }, [imageUrls]);

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = (error) => reject(error);
      image.src = url;
    });
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="image-grid">
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
```

In this component:

- We initialize the `loading` state to `true` to indicate that images are still loading.
- We use the `useEffect` hook to trigger the image loading process when the `imageUrls` prop changes.
- Inside the `useEffect`, we use `Promise.all` to load all images asynchronously. Each image is loaded using the `loadImage` function, which returns a promise.
- The `loadImage` function creates a new `Image` object, sets its `src` attribute to the provided URL, and resolves the promise when the image is loaded successfully.
- If any image fails to load, an error is caught and logged to the console.
- Once all images are loaded successfully, the `loading` state is set to `false`, and the image gallery is rendered with the loaded images.
- While the images are loading, a simple "Loading..." message is displayed. You can replace this with a loading spinner or any other loading indicator of your choice.

You can use this `ImageGallery` component by passing an array of image URLs as the `imageUrls` prop. For example:

```javascript
const App = () => {
  const imageUrls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    // Add more image URLs as needed
  ];

  return (
    <div>
      <h1>Image Gallery</h1>
      <ImageGallery imageUrls={imageUrls} />
    </div>
  );
};

export default App;
```

This will create an image gallery that loads images asynchronously and displays a loading spinner until all images are fully loaded.

## **6. Redux-powered Blog**: Build a blog application where users can post articles. Use Redux for state management and integrate with a backend API to perform CRUD operations using async/await.

**=>** Sure, here's a basic example of how you can implement a Redux-powered blog application with CRUD operations using async/await for integration with a backend API.

Let's start with the Redux setup:

1. **Setup Redux Store**:

```javascript
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

2. **Define Actions**:

```javascript
// actionTypes.js
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

// Define other action types for update and delete operations
```

3. **Create Reducers**:

```javascript
// articlesReducer.js
import * as actionTypes from '../actionTypes';

const initialState = {
  articles: [],
  loading: false,
  error: null
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLES_REQUEST:
    case actionTypes.CREATE_ARTICLE_REQUEST:
      return { ...state, loading: true };
    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return { ...state, loading: false, articles: action.payload };
    case actionTypes.CREATE_ARTICLE_SUCCESS:
      return { ...state, loading: false, articles: [...state.articles, action.payload] };
    case actionTypes.FETCH_ARTICLES_FAILURE:
    case actionTypes.CREATE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default articlesReducer;
```

4. **Async Action Creators**:

```javascript
// articleActions.js
import * as actionTypes from '../actionTypes';
import axios from 'axios';

const apiUrl = 'https://your-backend-api.com/articles';

export const fetchArticles = () => {
  return async dispatch => {
    dispatch({ type: actionTypes.FETCH_ARTICLES_REQUEST });
    try {
      const response = await axios.get(apiUrl);
      dispatch({ type: actionTypes.FETCH_ARTICLES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ARTICLES_FAILURE, payload: error.message });
    }
  };
};

export const createArticle = (articleData) => {
  return async dispatch => {
    dispatch({ type: actionTypes.CREATE_ARTICLE_REQUEST });
    try {
      const response = await axios.post(apiUrl, articleData);
      dispatch({ type: actionTypes.CREATE_ARTICLE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_ARTICLE_FAILURE, payload: error.message });
    }
  };
};

// Define other async action creators for update and delete operations
```

5. **Connect Components**:

```javascript
// ArticleList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/articleActions';

const ArticleList = ({ articles, loading, error, fetchArticles }) => {
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  loading: state.articles.loading,
  error: state.articles.error
});

export default connect(mapStateToProps, { fetchArticles })(ArticleList);
```

6. **Create UI Components**: Design UI components for creating, updating, and deleting articles.
7. **Backend API Integration**: Implement backend API endpoints for CRUD operations on articles.
8. **Form Validation**: Implement form validation to ensure that required fields are filled before submitting new articles or updating existing articles.
9. **Error Handling**: Implement error handling to display error messages when API requests fail or validation errors occur.
10. **Routing**: Set up routing using React Router to navigate between different pages of the blog application (e.g., homepage, article detail page, article creation page).
11. **Styling**: Apply styles to the components using CSS or a CSS framework to create a visually appealing and user-friendly blog interface.

This is a basic example to get you started. Depending on your specific requirements and backend API structure, you may need to adjust the implementation accordingly.

## **7. Context-based Theme Switcher**: Design a website with the ability to switch between light and dark themes using the Context API. Additionally, add user preferences to localStorage so the chosen theme persists across sessions.

**=>** Here's a basic implementation of a context-based theme switcher in React using the Context API and localStorage:

1. **Create Theme Context**:

```javascript
// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
```

2. **Use Theme Context in App**:

```javascript
// App.js
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import MainContent from './MainContent';

const App = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemeSwitcher />
        <MainContent />
      </div>
    </ThemeProvider>
  );
};

export default App;
```

3. **Theme Switcher Component**:

```javascript
// ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
```

4. **Main Content Component**:

```javascript
// MainContent.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const MainContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`main-content ${theme}`}>
      <h1>Welcome to the {theme === 'light' ? 'Light' : 'Dark'} Theme!</h1>
      <p>This is the main content area.</p>
    </div>
  );
};

export default MainContent;
```

5. **CSS Styles**:

```css
/* styles.css */
body {
  font-family: Arial, sans-serif;
}

.light {
  background-color: #f0f0f0;
  color: #333;
}

.dark {
  background-color: #333;
  color: #fff;
}

.App {
  padding: 20px;
}

.main-content {
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}
```

This setup allows users to toggle between light and dark themes, and their chosen theme will persist across sessions thanks to localStorage.

## **8. Async Data Table**: Create a data table component that fetches data asynchronously. Implement pagination, sorting, and filtering features, ensuring that each of these operations triggers a new asynchronous request.

**=>** Here's a basic implementation of an asynchronous data table component in React:

1. **DataTable Component**:

```javascript
// DataTable.js
import React, { useState, useEffect } from 'react';
import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              {/* Render more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
```

2. **DataTable CSS**:

```css
/* DataTable.css */
.data-table {
  width: 100%;
}

.data-table table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 8px;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
```

This implementation fetches data asynchronously when the component mounts using `useEffect`. It displays a loading message while fetching data and renders a table with the fetched data once available. You can expand upon this by adding pagination, sorting, and filtering features.

## **9. Class-based Animation Library**: Develop a small animation library using JavaScript classes. Users should be able to create animations, chain them, or run them in parallel, all managed through class methods.

**=>** Here's a basic implementation of a class-based animation library in JavaScript:

```javascript
// Animation.js
class Animation {
  constructor(element) {
    this.element = element;
    this.animations = [];
  }

  fadeIn(duration) {
    this.animations.push({ property: 'opacity', from: 0, to: 1, duration });
    return this;
  }

  fadeOut(duration) {
    this.animations.push({ property: 'opacity', from: 1, to: 0, duration });
    return this;
  }

  moveX(distance, duration) {
    this.animations.push({ property: 'translateX', from: 0, to: distance, duration });
    return this;
  }

  moveY(distance, duration) {
    this.animations.push({ property: 'translateY', from: 0, to: distance, duration });
    return this;
  }

  async play() {
    for (const animation of this.animations) {
      await this.animate(animation);
    }
  }

  async animate(animation) {
    const { property, from, to, duration } = animation;
    return new Promise(resolve => {
      const startTime = performance.now();
      const animateStep = (timestamp) => {
        const progress = (timestamp - startTime) / duration;
        if (progress < 1) {
          if (property === 'opacity') {
            this.element.style.opacity = from + (to - from) * progress;
          } else if (property === 'translateX') {
            this.element.style.transform = `translateX(${from + (to - from) * progress}px)`;
          } else if (property === 'translateY') {
            this.element.style.transform = `translateY(${from + (to - from) * progress}px)`;
          }
          requestAnimationFrame(animateStep);
        } else {
          if (property === 'opacity') {
            this.element.style.opacity = to;
          } else if (property === 'translateX' || property === 'translateY') {
            this.element.style.transform = `translate${property.substring(9)}(${to}px)`;
          }
          resolve();
        }
      };
      requestAnimationFrame(animateStep);
    });
  }
}

// Usage:
const box = document.getElementById('box');
const animation = new Animation(box);
animation.fadeIn(1000).moveX(200, 2000).fadeOut(1000).play();
```

This animation library allows you to create animations such as fading in/out and moving along the X or Y axis. You can chain multiple animations together and play them sequentially using the `play()` method.

## **10. Redux Middleware Logger**: Design a custom middleware for Redux that logs every action dispatched and the state changes it causes. Bonus: add features to throttle actions or debounce rapid successive calls.

**=>** Here's an example of a custom Redux middleware that logs every action dispatched and the state changes it causes:

```javascript
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching action:', action);
  
  // Get the current state before dispatching the action
  const currentState = store.getState();

  // Call the next middleware or the reducer to process the action
  const result = next(action);

  // Get the new state after the action has been processed
  const newState = store.getState();

  // Log the state changes caused by the action
  console.log('State before action:', currentState);
  console.log('State after action:', newState);

  return result;
};

export default loggerMiddleware;
```

To use this middleware in your Redux application, you would include it when creating the Redux store:

```javascript
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import loggerMiddleware from './middleware/loggerMiddleware';

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware)
);

export default store;
```

This middleware intercepts every action dispatched to the Redux store, logs the action, and logs the state changes caused by the action.
