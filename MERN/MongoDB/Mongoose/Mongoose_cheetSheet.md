# Moongose.js

**=> [Node.js CRUD Operations](https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/?ref=lbp "CURD")**

**=>** Mongoose.js is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model application data and interact with MongoDB databases. Here's a basic cheatsheet for Mongoose:

### Installation:

```bash
npm install mongoose
```

### Basic Usage:

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true, useUnifiedTopology: true });
```

### Defining a Schema:

```javascript
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);
```

### Creating and Saving Documents:

```javascript
const user = new User({ name: 'John', age: 30, email: 'john@example.com' });
user.save((err, savedUser) => {
  if (err) return console.error(err);
  console.log('User saved:', savedUser);
});
```

### Querying Documents:

```javascript
User.find({ age: { $gte: 18 } }, (err, users) => {
  if (err) return console.error(err);
  console.log('Users:', users);
});
```

### Updating Documents:

```javascript
User.updateOne({ name: 'John' }, { age: 31 }, (err, result) => {
  if (err) return console.error(err);
  console.log('Update result:', result);
});
```

### Deleting Documents:

```javascript
User.deleteOne({ name: 'John' }, (err) => {
  if (err) return console.error(err);
  console.log('User deleted successfully');
});
```

### Middleware:

```javascript
userSchema.pre('save', function(next) {
  // Do something before saving
  next();
});
```

### Validation:

```javascript
const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18, max: 100 },
  email: { type: String, required: true, unique: true, validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
});
```

This cheatsheet covers the basic functionalities of Mongoose. There are many more features and methods available for advanced use cases, such as population, aggregation, and more.
