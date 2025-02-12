## **Redux System Design Questions for Interviews**

These **system design** questions test your ability to  **architect Redux for large-scale applications** . Let’s go through  **detailed answers with examples** .

---

### **1️⃣ How would you design a Redux store for a social media platform?**

✅ **Requirements:**

* Users, Posts, Comments, Likes, and Notifications
* Efficient retrieval & minimal re-renders

### **Solution: Use Normalized State**

```javascript
const initialState = {
  users: {
    "user1": { id: "user1", name: "Alice" },
    "user2": { id: "user2", name: "Bob" },
  },
  posts: {
    "post1": { id: "post1", userId: "user1", content: "Hello World!", likes: ["user2"], comments: ["comment1"] },
  },
  comments: {
    "comment1": { id: "comment1", postId: "post1", userId: "user2", content: "Nice post!" },
  },
  notifications: [
    { id: "notif1", userId: "user1", type: "like", postId: "post1", seen: false }
  ],
};
```

✅ **Why?** **Fast lookup, optimized re-renders, and structured relationships.**

✅ **Use Reselect for Derived Data:**

```javascript
const selectUserPosts = createSelector(
  [state => state.posts, (_, userId) => userId],
  (posts, userId) => Object.values(posts).filter(post => post.userId === userId)
);
```

---

### **2️⃣ How would you implement infinite scrolling with Redux?**

✅ **Requirements:**

* Load more data when the user scrolls down
* Avoid fetching duplicate data

### **Solution: Store Paged Data**

```javascript
const initialState = {
  posts: [],
  page: 1,
  hasMore: true,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadMorePosts(state, action) {
      state.posts = [...state.posts, ...action.payload.posts];
      state.page += 1;
      state.hasMore = action.payload.hasMore;
    },
  },
});
```

✅ Fetch More Data When Near Bottom:

```javascript
const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    dispatch(fetchMorePosts(currentPage));
  }
};
window.addEventListener("scroll", handleScroll);
```

✅ **Why?** **Efficient API requests & smooth scrolling experience.**

---

### **3️⃣ How would you handle real-time chat messages in Redux?**

✅ **Requirements:**

* Messages should update instantly
* Must work with WebSockets

### **Solution: WebSocket Middleware**

```javascript
const websocketMiddleware = store => next => action => {
  if (action.type === "CONNECT_WEBSOCKET") {
    const socket = new WebSocket("wss://chat.example.com");
    socket.onmessage = event => {
      store.dispatch({ type: "NEW_MESSAGE", payload: JSON.parse(event.data) });
    };
  }
  return next(action);
};
```

✅ Store Messages in Redux:

```javascript
const chatSlice = createSlice({
  name: "chat",
  initialState: { messages: [] },
  reducers: {
    newMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});
```

✅ **Why?** **Real-time updates without polling the server.**

---

### **4️⃣ How would you optimize Redux for a dashboard with frequent updates?**

✅ **Problem:** Redux  **re-renders frequently** , slowing down performance.

✅ **Solution:**

* Use **reselect** for memoization
* **Throttle API calls** to avoid excessive updates

#### **Optimized Selector Using Reselect**

```javascript
const selectDashboardData = createSelector(
  state => state.dashboard.data,
  data => data.filter(item => item.isActive)
);
```

✅ **Throttle API calls with lodash debounce**

```javascript
const fetchDashboardData = _.debounce(async () => {
  dispatch(loadDashboardData());
}, 1000);
```

✅ **Why?** **Prevents unnecessary re-renders, making the UI smooth.**

---

### **5️⃣ How would you handle user authentication with JWT tokens in Redux?**

✅ **Requirements:**

* Store JWT tokens securely
* Persist auth state after page refresh

### **Solution: Use redux-persist**

```javascript
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});
```

✅ **Persist with redux-persist**

```javascript
import storage from "redux-persist/lib/storage";
const persistConfig = { key: "auth", storage };
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);
```

✅ **Why?** **User stays logged in even after refresh.**

---

### **6️⃣ How would you implement optimistic UI updates in Redux?**

✅ **Problem:** If API is slow, the UI feels laggy.

✅ **Solution:** **Update Redux first, then sync with the API.**

#### **Example: Optimistic Like Button**

```javascript
const postSlice = createSlice({
  name: "post",
  initialState: { posts: {} },
  reducers: {
    likePostOptimistic(state, action) {
      state.posts[action.payload.postId].likes++;
    },
    rollbackLike(state, action) {
      state.posts[action.payload.postId].likes--;
    },
  },
});
```

✅ **Trigger API Request & Rollback on Failure**

```javascript
dispatch(likePostOptimistic({ postId }));
try {
  await api.likePost(postId);
} catch (error) {
  dispatch(rollbackLike({ postId }));
}
```

✅ **Why?** **Instant UI feedback, fewer perceived delays.**

---

### **7️⃣ How would you structure Redux for a multi-tenant SaaS platform?**

✅ **Problem:** Users have different companies, requiring **tenant-based state.**

✅ **Solution:** Store **tenantId** in Redux & Fetch Only Relevant Data

```javascript
const initialState = {
  tenantId: null,
  data: {},
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    switchTenant(state, action) {
      state.tenantId = action.payload;
      state.data = {}; // Clear old tenant data
    },
  },
});
```

✅ **Why?** **Each tenant gets isolated state for better performance.**

---

### **8️⃣ How would you implement role-based access control (RBAC) with Redux?**

✅ **Requirements:**

* Users have different roles (Admin, Editor, Viewer)
* Restrict UI access based on role

#### **Solution: Store User Roles in Redux**

```javascript
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, role: null },
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});
```

✅ **Use Role-Based UI Rendering**

```javascript
const AdminDashboard = () => {
  const role = useSelector(state => state.auth.role);
  return role === "admin" ? <Dashboard /> : <Unauthorized />;
};
```

✅ **Why?** **Secure UI based on permissions.**

---

### **Summary:**

| System Design Problem              | Solution                                   |
| ---------------------------------- | ------------------------------------------ |
| **Social Media State**       | **Normalized State**for fast lookups |
| **Infinite Scrolling**       | **Paginate & Load More Button**      |
| **Real-time Chat**           | **WebSocket Middleware**             |
| **Performance Optimization** | **Reselect + Throttling**            |
| **Auth with JWT**            | **Redux Persist**                    |
| **Optimistic Updates**       | **Update UI before API**             |
| **Multi-Tenant SaaS**        | **Store `tenantId`& Fetch Data**   |
| **Role-Based Access**        | **Restrict UI via Redux role state** |
