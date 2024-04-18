# body-parser

**=>** `body-parser` is a middleware for handling incoming request bodies in Node.js and Express.js applications. It parses the request body and makes it available under `req.body` property in your request handlers. Here's a cheatsheet for `body-parser`:

### Installation:

```bash
npm install body-parser
```

### Basic Usage with Express:

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
```

### Parsing Form Data:

```javascript
app.post('/form', (req, res) => {
  console.log(req.body); // Form data will be available here
});
```

### Parsing JSON Data:

```javascript
app.post('/json', (req, res) => {
  console.log(req.body); // JSON data will be available here
});
```

### Limiting Request Body Size:

```javascript
// Limit request body size to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
```

### Handling Other Content Types:

```javascript
// Parse XML data
app.use(bodyParser.text({ type: 'application/xml' }));
```

### Handling Raw Body:

```javascript
// Parse raw data
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
```

### Custom Parsing Logic:

```javascript
// Custom parsing logic
app.use(bodyParser.json({ verify: (req, res, buf) => {
  req.rawBody = buf;
}}));
```

### Accessing Raw Body:

```javascript
app.post('/raw', (req, res) => {
  console.log(req.rawBody); // Raw body will be available here
});
```

### Handling Error:

```javascript
// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

`body-parser` simplifies the process of handling request bodies in Node.js applications, allowing you to focus on building your application logic.
