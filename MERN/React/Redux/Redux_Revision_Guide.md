Here’s a **structured revision guide** covering all key Redux concepts, divided into **Basic, Intermediate, and Advanced Topics** with clear explanations and diagrams.

---

# **📌 Redux Revision Guide**

## **1️⃣ Basics of Redux**

### **1.1 What is Redux and Why Use It?**

Redux is a **state management library** used to manage global application state. It helps:

✅ Centralize state in a **single store**

✅ Make state **predictable & debuggable**

✅ Enable **time-travel debugging**

**🔹 Diagram: Redux Data Flow**

```
Component → Dispatch(Action) → Reducer → Store → Component
```

![Redux Data Flow](https://redux.js.org/img/redux-data-flow.png)

---

### **1.2 Core Principles of Redux**

1️⃣ **Single Source of Truth** → Entire state is stored in **one** central store

2️⃣ **State is Read-Only** → Can only be modified via **actions**

3️⃣ **Changes are Made with Pure Functions** → Reducers must be **pure functions**

---

### **1.3 Redux Components**

🟢 **Store** → Central storage of app state

🟢 **Actions** → Objects describing what happened (`{ type: "ADD_TODO", payload: "Learn Redux" }`)

🟢 **Reducers** → Pure functions that modify state based on actions

🟢 **Dispatch()** → Sends actions to reducers

🟢 **Selectors** → Functions to read specific state slices

---

### **1.4 Redux vs React Context API**

| Feature          | Redux                                 | Context API                   |
| ---------------- | ------------------------------------- | ----------------------------- |
| State Management | **Centralized**store            | **Scoped**per provider  |
| Performance      | Optimized with**selectors**     | Can cause**re-renders** |
| Middleware       | Supports async middleware             | No built-in middleware        |
| Debugging        | Powerful with**Redux DevTools** | Limited debugging options     |

---

### **1.5 Creating a Redux Store**

```js
import { createStore } from "redux";  
import rootReducer from "./reducers";  

const store = createStore(rootReducer);  
```

---

## **2️⃣ Intermediate Redux Concepts**

### **2.1 Actions in Redux**

**Actions** describe **what happened** in the app. Example:

```js
const addTodo = (text) => ({
  type: "ADD_TODO",
  payload: text,
});
```

---

### **2.2 Reducers in Redux**

**Reducers** specify **how the state changes** based on actions.

```js
const initialState = { todos: [] };

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
}
```

---

### **2.3 Dispatching Actions**

The **dispatch()** method sends actions to reducers.

```js
store.dispatch({ type: "ADD_TODO", payload: "Learn Redux" });
```

---

### **2.4 Connecting Redux to React**

✅ Use **Provider** to wrap the app

✅ Use **useSelector** to read state

✅ Use **useDispatch** to trigger actions

```js
import { Provider, useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div>
      {todos.map((todo) => <p key={todo}>{todo}</p>)}
      <button onClick={() => dispatch({ type: "ADD_TODO", payload: "New Task" })}>
        Add Todo
      </button>
    </div>
  );
};

// Wrap App with Provider
<Provider store={store}>
  <TodoList />
</Provider>;
```

---

### **2.5 Redux Middleware**

Middleware allows **async operations & logging** between action dispatch and reducer execution.

**Example Middleware: Redux Thunk**

```js
const fetchUser = () => async (dispatch) => {
  const response = await fetch("/user");
  const data = await response.json();
  dispatch({ type: "SET_USER", payload: data });
};
```

---

## **3️⃣ Advanced Redux Topics**

### **3.1 Redux Toolkit (RTK) vs Traditional Redux**

✅ **RTK Features**

🔹 `createSlice()` → Combines actions & reducers

🔹 `configureStore()` → Simplifies store setup

🔹 `createAsyncThunk()` → Built-in async handling

**Example Using RTK**

```js
import { createSlice, configureStore } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => { state.push(action.payload); },
  },
});

export const { addTodo } = todoSlice.actions;
export const store = configureStore({ reducer: todoSlice.reducer });
```

---

### **3.2 Redux DevTools**

✅ Allows **time-travel debugging**

✅ Shows **state changes in real-time**

✅ Works with both **Redux & RTK**

---

### **3.3 Redux Persist (Local Storage)**

**Persist Redux state across page reloads**

```js
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
```

---

### **3.4 Code Splitting in Redux (Lazy Loading Reducers)**

✅ Load reducers **dynamically**

✅ Reduces **initial bundle size**

**Example: Lazy Loading a Reducer**

```js
store.injectReducer("user", userReducer);
```

---

## **🔹 Quick Summary Table**

| Concept        | Description                    |
| -------------- | ------------------------------ |
| Redux Store    | Centralized state container    |
| Actions        | Objects describing events      |
| Reducers       | Pure functions modifying state |
| Dispatch       | Sends actions to reducers      |
| useSelector    | Reads state in React           |
| useDispatch    | Dispatches actions in React    |
| Middleware     | Handles async operations       |
| Redux Toolkit  | Simplified Redux setup         |
| Redux Persist  | Saves state in local storage   |
| Code Splitting | Loads reducers dynamically     |

---

## **📌 Next Steps for Mock Interview Prep**

1️⃣ **Practice coding** Redux-based components.

2️⃣ **Solve scenario-based Redux questions** (e.g., managing cart state).

3️⃣ **Explain Redux architecture in 2-3 minutes** using diagrams.

4️⃣ **Write and debug Redux middleware** in real projects.
