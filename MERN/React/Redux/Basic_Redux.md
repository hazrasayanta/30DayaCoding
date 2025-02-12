I'll answer all **15 Redux questions** with detailed explanations and **diagrams** where applicable.

---

# **Basic Redux Questions with Answers & Diagrams**

## **1. What is Redux, and why is it used?**

### **Answer:**

Redux is a **state management library** used to manage the application state globally. It is commonly used with  **React** , but it can work with other frameworks as well.

### **Why use Redux?**

* Helps in managing **large-scale application state** efficiently.
* Provides a  **predictable state container** .
* Makes  **debugging and testing easier** .
* Useful for **state persistence and sharing** across components.

### **Redux Architecture Diagram**

```
React Component -> Dispatch(Action) -> Reducer -> Store -> Updated State -> React Component
```

![Redux Data Flow](https://redux.js.org/assets/images/redux-data-flow.png)

---

## **2. What are the core principles of Redux?**

### **Answer:**

1. **Single Source of Truth**
   * The entire application state is stored in a  **single object (store)** .
2. **State is Read-Only**
   * State can only be modified using  **actions** .
3. **Changes are Made with Pure Functions**
   * **Reducers** update the state in an immutable manner using  **pure functions** .

---

## **3. What are the main components of Redux?**

### **Answer:**

Redux consists of the following components:

1. **Store** – Holds the application state.
2. **Actions** – Describes what should happen.
3. **Reducers** – Updates the state based on actions.
4. **Dispatch** – Sends actions to the reducer.
5. **Selectors** – Extracts specific data from the state.

### **Redux Component Diagram**

```
Action -> Reducer -> Store -> React Component (via useSelector)
```

---

## **4. What is the difference between Redux and React Context API?**

| Feature               | Redux                     | Context API                      |
| --------------------- | ------------------------- | -------------------------------- |
| **Use Case**    | Large-scale applications  | Small-scale applications         |
| **Performance** | Optimized via reducers    | May cause unnecessary re-renders |
| **Middleware**  | Supports async operations | No middleware support            |
| **Boilerplate** | More setup required       | Easier to set up                 |

---

## **5. What is the Redux store, and how is it created?**

### **Answer:**

The **Redux store** is the central place where all application **state** is stored.

### **How to create a store?**

```javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
```

---

## **6. Explain the role of actions in Redux.**

### **Answer:**

An **action** is a JavaScript object that describes an event occurring in the app.

### **Example of an Action:**

```javascript
const ADD_TODO = "ADD_TODO";
const addTodo = (task) => ({
  type: ADD_TODO,
  payload: task
});
```

### **Action Flow Diagram**

```
React Component -> Dispatch(Action) -> Reducer -> Store
```

---

## **7. What are reducers, and how do they work?**

### **Answer:**

A **reducer** is a function that takes the **current state** and an **action** and returns a  **new state** .

### **Example Reducer:**

```javascript
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```

### **Reducer Flow Diagram**

```
State + Action -> Reducer -> New State
```

---

## **8. What is the dispatch() function in Redux?**

### **Answer:**

The `dispatch()` function is used to **send actions** to the Redux store.

### **Example:**

```javascript
store.dispatch({ type: "INCREMENT" });
```

---

## **9. What is the purpose of the Provider component in Redux?**

### **Answer:**

The `Provider` component is used to **pass the Redux store** to the entire React application.

### **Example Usage:**

```javascript
import { Provider } from 'react-redux';
import { store } from './store';

<Provider store={store}>
  <App />
</Provider>
```

---

## **10. How does useSelector work in React-Redux?**

### **Answer:**

`useSelector()` is a **React-Redux hook** used to access data from the Redux store.

### **Example:**

```javascript
import { useSelector } from 'react-redux';

const counter = useSelector((state) => state.count);
```

---

## **11. How does useDispatch work in React-Redux?**

### **Answer:**

`useDispatch()` is a React-Redux hook that allows components to  **dispatch actions** .

### **Example:**

```javascript
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
dispatch({ type: "INCREMENT" });
```

---

## **12. What is the difference between mapStateToProps and useSelector?**

| Feature         | mapStateToProps             | useSelector                   |
| --------------- | --------------------------- | ----------------------------- |
| **Type**  | Higher-Order Function (HOC) | Hook-based approach           |
| **Usage** | Used in class components    | Used in functional components |

### **Example (mapStateToProps)**

```javascript
const mapStateToProps = (state) => ({
  count: state.count
});
```

---

## **13. What is the difference between mapDispatchToProps and useDispatch?**

| Feature         | mapDispatchToProps       | useDispatch                   |
| --------------- | ------------------------ | ----------------------------- |
| **Type**  | Function                 | Hook                          |
| **Usage** | Used in class components | Used in functional components |

### **Example (mapDispatchToProps)**

```javascript
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" })
});
```

---

## **14. Can Redux be used with frameworks other than React?**

### **Answer:**

Yes, Redux can be used with:

* **Vue.js** (with Vuex)
* **Angular** (with ngrx)
* **Vanilla JavaScript**

---

## **15. What is the difference between Redux Toolkit (RTK) and traditional Redux?**

| Feature               | Traditional Redux     | Redux Toolkit (RTK)                     |
| --------------------- | --------------------- | --------------------------------------- |
| **Boilerplate** | More setup required   | Simplified setup                        |
| **Reducers**    | Requires switch-case  | Uses `createSlice`for easier handling |
| **Thunk Setup** | Requires manual setup | Built-in with `createAsyncThunk`      |

### **Example (RTK)**

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; }
  }
});

const store = configureStore({ reducer: counterSlice.reducer });
```

---

## **Final Thoughts**

* Redux **manages state globally** with a **predictable** pattern.
* Redux **Toolkit** simplifies Redux setup.
* Hooks like `useSelector` and `useDispatch` **replace HOCs** for state access.
