
## **📌 Node.js Interview Revision Guide with Code Examples & Diagrams**

---

## **1. What is Node.js?**

Node.js is an open-source, cross-platform runtime environment that allows JavaScript to run outside the browser using the  **V8 engine** .

### **🔹 Key Features of Node.js**

✅ Asynchronous & Non-blocking I/O

✅ Single-threaded Event Loop

✅ Fast Execution (V8 Engine)

✅ Scalable & Lightweight

---

## **2. Node.js Architecture**

Node.js is **single-threaded** but uses **libuv** to handle asynchronous operations efficiently via an  **Event Loop** .

### **🔹 Node.js Architecture Diagram**

```
            ┌───────────────────────────┐
            │          V8 Engine        │
            └───────────┬───────────────┘
                        │
        ┌───────────────▼───────────────┐
        │        Event Loop (libuv)      │
        ├───────────────┬───────────────┤
        │   Callbacks   │    Timers      │
        │   Promises    │   Streams      │
        └───────────────┴───────────────┘
```

### **🔹 Example: Event Loop**

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

console.log("End");
```

**Output:**

```
Start
End
Inside setTimeout
```

🔸 The `setTimeout` is executed **after the synchronous code** due to the event loop.

---

## **3. Modules in Node.js**

Node.js has built-in modules such as  **fs, http, path, os, events, crypto** .

### **🔹 Example: File System (fs)**

```js
const fs = require('fs');

// Write to a file
fs.writeFileSync("test.txt", "Hello, Node.js!");

// Read from a file
const data = fs.readFileSync("test.txt", "utf8");
console.log(data);
```

---

## **4. HTTP Server in Node.js**

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

server.listen(3000, () => console.log("Server running on port 3000"));
```

🔸 Run the server using `node server.js`, then visit `http://localhost:3000`.

---

## **5. Asynchronous Programming**

Node.js follows a **non-blocking, async model** using  **Callbacks, Promises, and async/await** .

### **🔹 Example: Callback Hell**

```js
fs.readFile("file1.txt", "utf8", (err, data1) => {
  fs.readFile("file2.txt", "utf8", (err, data2) => {
    fs.readFile("file3.txt", "utf8", (err, data3) => {
      console.log(data1, data2, data3);
    });
  });
});
```

### **🔹 Example: Promises**

```js
fs.promises.readFile("file1.txt", "utf8")
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### **🔹 Example: Async/Await**

```js
async function readFileData() {
  try {
    const data = await fs.promises.readFile("file1.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
readFileData();
```

---

## **6. Express.js - Fast API Framework**

Express is the most popular web framework for Node.js.

### **🔹 Example: Express Server**

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### **🔹 Example: Express Middleware**

```js
app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});
```

### **🔹 Example: Express Router**

```js
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Users List");
});

app.use("/api", router);
```

---

## **7. Database Connectivity in Node.js**

### **🔹 MongoDB with Mongoose**

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("DB connection error", err));

const UserSchema = new mongoose.Schema({ name: String, age: Number });
const User = mongoose.model("User", UserSchema);

const newUser = new User({ name: "John", age: 25 });
newUser.save();
```

### **🔹 MySQL with Sequelize**

```js
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

sequelize.sync();
```

---

## **8. Authentication in Node.js**

### **🔹 JSON Web Token (JWT) Authentication**

```js
const jwt = require("jsonwebtoken");

const user = { id: 1, username: "JohnDoe" };
const token = jwt.sign(user, "secretKey", { expiresIn: "1h" });

console.log(token);
```

---

## **9. Performance Optimization**

### **🔹 Clustering in Node.js**

```js
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork());
} else {
  require("./server"); // Start server
}
```

### **🔹 Redis Caching**

```js
const redis = require("redis");
const client = redis.createClient();

client.set("key", "value");
client.get("key", (err, data) => console.log(data));
```

---

## **10. Unit Testing in Node.js**

### **🔹 Jest Example**

```js
const sum = (a, b) => a + b;

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

### **🔹 Supertest for API Testing**

```js
const request = require("supertest");
const app = require("./app");

test("GET / should return Hello", async () => {
  const res = await request(app).get("/");
  expect(res.text).toBe("Hello, Express!");
});
```

---

## **11. Dockerizing Node.js Application**

### **🔹 Dockerfile**

```
FROM node:16
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . .
CMD ["node", "server.js"]
```

**Run the app:**

```
docker build -t my-node-app .
docker run -p 3000:3000 my-node-app
```

---

## **12. Debugging & Logging**

### **🔹 Debugging with Chrome DevTools**

Run:

```
node --inspect server.js
```

Then open `chrome://inspect` in Chrome.

### **🔹 Logging with Winston**

```js
const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

logger.info("This is an info log");
```

---

## **🚀 Final Tips for Interview**

✅ Understand Node.js **Event Loop** and Async Model.

✅ Be comfortable with  **Express.js, MongoDB, MySQL, JWT** .

✅ Revise  **clustering, caching (Redis), Docker, testing (Jest, Supertest)** .

✅ Practice **coding challenges** and  **real-world scenarios** .
