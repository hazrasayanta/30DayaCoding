
# MongoDB Basics

1. **What are the key differences between MongoDB and relational databases?**
   * **MongoDB** is a NoSQL database that stores data in flexible, JSON-like BSON documents, whereas **relational databases** store data in structured tables with predefined schemas.
   * **Schema-less** : MongoDB allows dynamic schemas, whereas relational databases require strict schemas.
   * **Scalability** : MongoDB is horizontally scalable using sharding, whereas relational databases scale vertically.
   * **Joins** : MongoDB does not support traditional SQL joins but provides `$lookup` for similar functionality.
   * **Transactions** : Relational databases support multi-row transactions easily, whereas MongoDB introduced multi-document ACID transactions in version 4.0.
2. **How do you create a new collection in MongoDB?**
   * MongoDB **automatically creates a collection** when you insert the first document:
     ```js
     db.myNewCollection.insertOne({ name: "Example" });
     ```
   * You can also create a collection explicitly with options:
     ```js
     db.createCollection("myNewCollection", { capped: true, size: 100000 });
     ```
3. **What is the difference between `find()` and `findOne()`?**
   * `find()`: Returns a **cursor** to iterate over multiple documents matching the query.
     ```js
     db.users.find({ age: { $gt: 25 } });
     ```
   * `findOne()`: Returns a **single document** (first match) from the collection.
     ```js
     db.users.findOne({ age: { $gt: 25 } });
     ```
4. **How can you check the size of a MongoDB collection?**
   * Use the `stats()` method:
     ```js
     db.collection.stats().size;
     ```
   * To count documents in a collection:
     ```js
     db.collection.countDocuments({});
     ```
5. **What are capped collections, and when would you use them?**
   * **Capped collections** are fixed-size collections that automatically **overwrite older documents** when full.
   * Used for  **logging, caching, real-time event storage** , etc.
   * Example of creating a capped collection:
     ```js
     db.createCollection("logs", { capped: true, size: 100000, max: 1000 });
     ```

# CRUD Operations


### **1. How do you insert multiple documents in a collection at once?**

Use the **`insertMany()`** method:

```js
db.users.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
]);
```

This inserts multiple documents into the `users` collection at once.

---

### **2. What is the difference between `updateOne()`, `updateMany()`, and `replaceOne()`?**

| Method                     | Description                                          | Example                                                                        |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| **`updateOne()`**  | Updates**only the first matching document**    | `db.users.updateOne({ age: 25 }, { $set: { age: 26 } })`                     |
| **`updateMany()`** | Updates**all matching documents**              | `db.users.updateMany({ age: { $gte: 30 } }, { $set: { status: "Active" } })` |
| **`replaceOne()`** | **Replaces the entire document**with a new one | `db.users.replaceOne({ name: "Alice" }, { fullName: "Alice Doe", age: 26 })` |

---

### **3. How do you delete all documents from a collection while keeping the collection itself?**

Use the **`deleteMany()`** method with an empty filter `{}`:

```js
db.users.deleteMany({});
```

This removes all documents but keeps the collection structure.

---

### **4. How can you increment a field’s value in MongoDB?**

Use the `$inc` operator:

```js
db.users.updateOne({ name: "Alice" }, { $inc: { age: 1 } });
```

This increases Alice's `age` by `1`. You can use negative values to decrement:

```js
db.users.updateOne({ name: "Alice" }, { $inc: { age: -1 } });
```

---

### **5. Write a query to find all documents where a field `age` is greater than 30.**

Use the `$gt` (greater than) operator:

```js
db.users.find({ age: { $gt: 30 } });
```

If you also want to include documents where `age` is  **30 or more** , use `$gte`:

```js
db.users.find({ age: { $gte: 30 } });
```

# Indexing & Performance



### **1. Explain the purpose of MongoDB’s aggregation framework.**

The **aggregation framework** is used to process and analyze large datasets by applying a sequence of transformations to documents in a collection. It allows for  **complex queries** , data manipulation, and reporting similar to SQL's `GROUP BY`, `JOIN`, and `HAVING`.

Key benefits:

✅ Perform advanced computations (e.g., grouping, summing, averaging).

✅ Filter and reshape data efficiently.

✅ Improve performance by leveraging indexes.

---

### **2. How do `$match` and `$project` stages work in aggregation pipelines?**

| Stage                                                                                                                                      | Description | Example |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------- |
| **`$match`**   | Filters documents based on conditions (similar to `find()`). | `{ $match: { status: "active" } }`             |             |         |
| **`$project`** | Includes/excludes specific fields in the output.                | `{ $project: { name: 1, email: 1, _id: 0 } }` |             |         |

🔹 Example Pipeline:

```js
db.users.aggregate([
  { $match: { age: { $gte: 30 } } },   // Filter users with age >= 30
  { $project: { name: 1, email: 1, _id: 0 } }  // Show only name & email
]);
```

---

### **3. Write an aggregation query to group users by country and count the number of users in each.**

```js
db.users.aggregate([
  { $group: { _id: "$country", userCount: { $sum: 1 } } },
  { $sort: { userCount: -1 } }  // Sort in descending order
]);
```

🔹 This groups users by `country` and counts how many users exist in each country.

---

### **4. What is the difference between `$lookup` and `$unwind` in aggregation?**

| Stage                                                                                                                                                                                  | Description | Example |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| **`$lookup`** | Performs a**left outer join**with another collection.  | `{ $lookup: { from: "orders", localField: "userId", foreignField: "userId", as: "orders" } }` |             |         |
| **`$unwind`** | Deconstructs an**array field**into multiple documents. | `{ $unwind: "$orders" }`                                                                      |             |         |

🔹 Example combining both:

```js
db.users.aggregate([
  { $lookup: { from: "orders", localField: "userId", foreignField: "userId", as: "orders" } },
  { $unwind: "$orders" } // Expands orders array into multiple documents
]);
```

---

### **5. How do you use `$facet` in an aggregation pipeline?**

The `$facet` stage **runs multiple aggregation pipelines in parallel** and returns separate results for each.

🔹 Example:

```js
db.users.aggregate([
  {
    $facet: {
      "Older Users": [{ $match: { age: { $gte: 40 } } }, { $count: "count" }],
      "Younger Users": [{ $match: { age: { $lt: 40 } } }, { $count: "count" }]
    }
  }
]);
```

📌 **Output:**

```json
{
  "Older Users": [{ "count": 20 }],
  "Younger Users": [{ "count": 80 }]
}
```

This helps in multi-faceted analysis without multiple queries.

---

# Replication & Sharding


### **1. What is a replica set in MongoDB, and why is it used?**

A **replica set** is a group of MongoDB servers that maintain the same data for  **high availability and redundancy** .

✅ **Why use it?**

* Provides **automatic failover** if the primary server goes down.
* Enables **read scaling** by directing reads to secondary nodes.
* Ensures **data durability** by maintaining multiple copies.

🔹 **Example: Initiating a replica set**

```js
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "node1:27017" },
    { _id: 1, host: "node2:27017" },
    { _id: 2, host: "node3:27017" }
  ]
});
```

---

### **2. How do you add a new node to an existing replica set?**

🔹 **Step 1:** Connect to the primary node

```sh
mongo --host primaryNode:27017
```

🔹 **Step 2:** Add a new member

```js
rs.add("newNode:27017");
```

🔹 **Step 3:** Verify the replica set

```js
rs.status();
```

This adds a new **secondary node** to the replica set.

---

### **3. What is an arbiter node, and what role does it play in replication?**

An **arbiter node** is a special replica set member that **does not store data** but participates in **voting** during failover.

✅ **Why use it?**

* Helps **elect a new primary** when the current primary goes down.
* Used when an **even number of nodes** need an additional vote for a majority.
* **Reduces hardware costs** since it does not require storage.

🔹 **Example: Adding an arbiter node**

```js
rs.addArb("arbiterNode:27017");
```

---

### **4. How does MongoDB distribute data in a sharded cluster?**

MongoDB **divides large datasets** across multiple servers using  **sharding** , which improves performance and horizontal scaling.

✅ **Key components of a sharded cluster:**

1. **Shards** – Store data (each shard is a replica set).
2. **Config servers** – Manage metadata and cluster configuration.
3. **Mongos router** – Routes queries to the appropriate shard.

🔹 **Example: Enabling sharding for a database**

```js
sh.enableSharding("myDatabase");
sh.shardCollection("myDatabase.users", { userId: "hashed" });
```

This distributes the `users` collection based on the `userId` field.

---

### **5. What is a shard key, and how does it affect query performance?**

A **shard key** is the field used to distribute data across shards. It  **determines how documents are split and stored** .

✅ **Choosing a good shard key:**

* **Should be frequently used in queries** to avoid scatter-gather operations.
* **Should have high cardinality** (many unique values) for even distribution.
* **Avoid monotonically increasing keys** like timestamps, as they can cause data skew.

🔹 **Example: Choosing a shard key**

```js
sh.shardCollection("myDatabase.orders", { orderId: "hashed" });
```

A **hashed shard key** ensures even distribution of data across shards.

---

# Security & Backup


### **1. How do you enable authentication in MongoDB?**

To enable authentication, you must **create a user** and start MongoDB with authentication enabled.

🔹 **Step 1: Start MongoDB with authentication**

```sh
mongod --auth --dbpath /data/db
```

🔹 **Step 2: Switch to the admin database and create an admin user**

```js
use admin;
db.createUser({
  user: "admin",
  pwd: "securePassword",
  roles: ["root"]
});
```

🔹 **Step 3: Restart MongoDB and connect with authentication**

```sh
mongo -u admin -p securePassword --authenticationDatabase admin
```

✅ Now, authentication is enabled, and only authorized users can access the database.

---

### **2. What is the purpose of role-based access control (RBAC)?**

Role-Based Access Control ( **RBAC** ) is used to **restrict user access** based on roles.

✅ **Why use RBAC?**

* **Enhances security** by granting minimal required privileges.
* **Prevents unauthorized modifications** to sensitive data.
* **Reduces attack surface** by restricting admin privileges.

🔹 **Common MongoDB Roles:**

| Role          | Permissions                   |
| ------------- | ----------------------------- |
| `read`      | Read-only access              |
| `readWrite` | Read & write access           |
| `dbAdmin`   | Database administrative tasks |
| `userAdmin` | Manage users & roles          |
| `root`      | Full access to all databases  |

🔹 **Example: Assigning a read-only role to a user**

```js
use myDatabase;
db.createUser({
  user: "readonlyUser",
  pwd: "password123",
  roles: [{ role: "read", db: "myDatabase" }]
});
```

---

### **3. How do you back up a MongoDB database, and how can you restore it?**

**Backup:** Use `mongodump` to create a backup.

```sh
mongodump --db=myDatabase --out=/backup/
```

This creates a backup in the `/backup/` directory.

**Restore:** Use `mongorestore` to restore the database.

```sh
mongorestore --db=myDatabase /backup/myDatabase/
```

This restores the `myDatabase` backup.

✅ **Alternative:** If using MongoDB Atlas, backups can be automated through the Atlas UI.

---

### **4. What are the best practices for securing MongoDB against unauthorized access?**

🔹 **Use authentication and RBAC**

* Always create users with  **minimal privileges** .

🔹 **Enable TLS/SSL for encrypted communication**

* Start MongoDB with TLS:
  ```sh
  mongod --sslMode requireSSL --sslPEMKeyFile /path/to/cert.pem
  ```

🔹 **Disable open network access**

* Bind MongoDB to localhost or a specific IP:
  ```sh
  mongod --bind_ip 127.0.0.1
  ```

🔹 **Enable IP Whitelisting**

* In  **MongoDB Atlas** , allow access only from trusted IPs.

🔹 **Use strong passwords** and **avoid storing credentials in code**

* Use **environment variables** or  **MongoDB authentication mechanisms** .

🔹 **Regularly update MongoDB**

* Security patches fix vulnerabilities in older versions.

---

### **5. How do you audit user activities in a MongoDB database?**

MongoDB provides **database auditing** to track user actions.

🔹 **Enable auditing in MongoDB Enterprise Edition:**

Start MongoDB with auditing enabled:

```sh
mongod --auth --auditDestination=file --auditFormat=json --auditPath=/var/log/mongo_audit.log
```

This logs all database operations to `/var/log/mongo_audit.log`.

🔹 **Example: Checking user actions in logs**

```sh
cat /var/log/mongo_audit.log | grep "admin"
```

✅ This helps in **tracking unauthorized access** and  **detecting anomalies** .

# MongoDB with Node.js



### **1. How do you connect a Node.js application to a MongoDB database using Mongoose?**

Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js.

🔹 **Install Mongoose:**

```sh
npm install mongoose
```

🔹 **Connect to MongoDB:**

```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});
```

✅ This establishes a connection to `myDatabase`.

---

### **2. What is the purpose of a Mongoose schema?**

A **Mongoose schema** defines the structure, types, and validations for documents in a MongoDB collection.

✅ **Why use schemas?**

* Enforces  **data consistency** .
* Allows **validation** before saving data.
* Enables  **predefined methods and hooks** .

🔹 **Example: Defining a User schema**

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, min: 18 }
});

const User = mongoose.model("User", userSchema);
```

---

### **3. How can you use Mongoose middleware for pre-save hooks?**

Mongoose **middleware (hooks)** allows executing logic before or after specific events (e.g., saving a document).

🔹 **Example: Hashing a password before saving a user**

```javascript
const bcrypt = require("bcrypt");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
```

✅ This hashes the password before saving a new user.

---

### **4. Write a Mongoose query to find all users with a name starting with "A".**

Use the **`$regex`** operator for pattern matching.

🔹 **Example:**

```javascript
User.find({ name: { $regex: /^A/, $options: "i" } })
  .then(users => console.log(users))
  .catch(err => console.error(err));
```

✅ This query finds all users whose names start with  **"A"** , case-insensitive.

---

### **5. How do transactions work in MongoDB with Mongoose?**

Transactions in MongoDB ensure **atomic operations** across multiple documents.

🔹 **Example: Mongoose transaction using `session`**

```javascript
async function transferFunds(senderId, receiverId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Deduct amount from sender
    await User.updateOne({ _id: senderId }, { $inc: { balance: -amount } }, { session });

    // Add amount to receiver
    await User.updateOne({ _id: receiverId }, { $inc: { balance: amount } }, { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    console.log("Transaction successful!");
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", error);
  }
}
```

✅ This ensures  **both updates happen together** , or neither happens if an error occurs.

---

# Advanced Topics



### **1. What is GridFS, and when should you use it?**

**GridFS** is a built-in MongoDB feature for storing and retrieving **large files (e.g., images, videos, PDFs)** by splitting them into smaller chunks.

✅ **When to use GridFS?**

* When files are **larger than 16MB** (MongoDB document size limit).
* When you need **partial file retrieval** (e.g., streaming videos).
* When you want **metadata storage** alongside the file.

🔹 **Example: Uploading a file using GridFS in Node.js**

```javascript
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const conn = mongoose.createConnection("mongodb://localhost:27017/myDB");
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
```

✅ This allows storing large files in  **MongoDB instead of a filesystem** .

---

### **2. How does MongoDB handle multi-document ACID transactions?**

Starting from  **MongoDB 4.0** , **multi-document transactions** provide **ACID (Atomicity, Consistency, Isolation, Durability)** guarantees.

✅ **Key features of MongoDB transactions:**

* Supports  **multiple document updates across collections** .
* Ensures **all operations succeed or none are applied** (rollback).
* Uses **sessions** to maintain transaction state.

🔹 **Example: Using transactions in Node.js**

```javascript
async function runTransaction() {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    await Order.create([{ userId: "123", amount: 500 }], { session });
    await User.updateOne({ _id: "123" }, { $inc: { balance: -500 } }, { session });

    await session.commitTransaction();
    session.endSession();
    console.log("Transaction successful!");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", error);
  }
}
```

✅ Ensures  **atomic updates across multiple collections** .

---

### **3. What is the difference between MongoDB Atlas and self-hosted MongoDB?**

| Feature               | **MongoDB Atlas**     | **Self-Hosted MongoDB** |
| --------------------- | --------------------------- | ----------------------------- |
| **Hosting**     | Managed by MongoDB          | Managed by user               |
| **Scalability** | Auto-scaling available      | Manual scaling                |
| **Security**    | Built-in security & backups | Must configure manually       |
| **Maintenance** | No setup required           | Requires manual updates       |
| **Cost**        | Subscription-based          | Infrastructure costs          |

✅ **MongoDB Atlas** is best for  **cloud-based, managed solutions** , while **self-hosted MongoDB** is ideal for  **on-premise control & customization** .

---

### **4. How can you use MongoDB change streams to track real-time updates?**

Change Streams allow **real-time tracking** of changes (inserts, updates, deletes) in a MongoDB collection.

✅ **Use cases:**

* **Real-time analytics** (e.g., tracking orders in an e-commerce app).
* **Event-driven architectures** (e.g., triggering notifications).
* **Data synchronization** (e.g., keeping two databases in sync).

🔹 **Example: Watching for changes in a collection**

```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myDB");

const orderSchema = new mongoose.Schema({ status: String });
const Order = mongoose.model("Order", orderSchema);

const changeStream = Order.watch();

changeStream.on("change", (change) => {
  console.log("Change detected:", change);
});
```

✅ This listens for changes and logs them in  **real-time** .

---

### **5. What are some common performance tuning strategies for large-scale MongoDB applications?**

✅ **Indexing**

* Use **compound indexes** for queries involving multiple fields.
* Avoid **too many indexes** (increases write overhead).
* Use **`explain()`** to analyze query execution.

✅ **Sharding & Replication**

* Use **sharding** for horizontal scaling (distribute data across nodes).
* Use **replication** for high availability and failover.

✅ **Query Optimization**

* Use **projection** (`find({ field: value }, { _id: 0, name: 1 })`) to return only required fields.
* Use **pagination** (`skip()` and `limit()`) instead of large queries.

✅ **Connection Pooling**

* Optimize database connections using **connection pooling** in Node.js:
  ```javascript
  mongoose.connect("mongodb://localhost:27017/myDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10  // Maintain 10 connections in pool
  });
  ```

✅ **Storage Optimization**

* Use **capped collections** for logs to limit storage size.
* Use **GridFS** for large files instead of embedding them in documents.

✅ **Monitoring & Profiling**

* Use **`mongostat`** and **`mongotop`** to check database performance.
* Enable  **slow query logging** :
  ```sh
  db.setProfilingLevel(2);
  ```

---
