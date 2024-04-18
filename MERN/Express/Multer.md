# Multer

**=>** `Multer` is a middleware for handling `multipart/form-data`, which is primarily used for uploading files in Node.js and Express.js applications. It provides easy handling of file uploads by parsing and storing them in disk storage or memory. Here's a cheatsheet for `multer`:

### Installation:

```bash
npm install multer
```

### Basic Usage with Express:

```javascript
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();
```

### Single File Upload:

```javascript
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // Uploaded file details
});
```

### Multiple Files Upload:

```javascript
app.post('/uploads', upload.array('files', 5), (req, res) => {
  console.log(req.files); // Array of uploaded files
});
```

### File Size Limit:

```javascript
const maxSize = 10 * 1024 * 1024; // 10MB

const upload = multer({
  limits: { fileSize: maxSize },
});
```

### File Storage Location:

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
```

### Accessing Form Fields:

```javascript
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // Uploaded file details
  console.log(req.body); // Other form fields
});
```

### Custom File Filter:

```javascript
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed!'), false);
    }
  },
});
```

### Error Handling:

```javascript
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error handling
    res.status(400).send('File upload error: ' + err.message);
  } else {
    // Other errors
    res.status(500).send('Internal Server Error');
  }
});
```

`Multer` simplifies the process of handling file uploads in Node.js applications, providing various options for customization and error handling.

# Node And React SetUp

**=>** To use Multer in a Node.js backend and integrate it with a frontend built with React and Axios, follow these steps:

### Node.js Backend (Express with Multer):

1. Install necessary packages:

   ```bash
   npm install express multer cors
   ```
2. Set up your Express server with Multer middleware to handle file uploads:

   ```javascript
   const express = require('express');
   const multer = require('multer');
   const cors = require('cors');

   const app = express();
   const port = 3001;

   app.use(cors());

   // Define Multer storage settings
   const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, 'uploads/');
     },
     filename: (req, file, cb) => {
       cb(null, Date.now() + '-' + file.originalname);
     },
   });

   const upload = multer({ storage: storage });

   // Handle file upload endpoint
   app.post('/upload', upload.single('file'), (req, res) => {
     console.log(req.file); // Uploaded file details
     res.send('File uploaded successfully');
   });

   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });
   ```

### Frontend with React and Axios:

1. Install Axios in your React project:

   ```bash
   npm install axios
   ```
2. Create a file upload form component in your React app:

   ```javascript
   import React, { useState } from 'react';
   import axios from 'axios';

   const FileUploadForm = () => {
     const [file, setFile] = useState(null);

     const handleFileChange = (event) => {
       setFile(event.target.files[0]);
     };

     const handleFormSubmit = async (event) => {
       event.preventDefault();

       const formData = new FormData();
       formData.append('file', file);

       try {
         const response = await axios.post('http://localhost:3001/upload', formData, {
           headers: {
             'Content-Type': 'multipart/form-data'
           }
         });
         console.log(response.data);
       } catch (error) {
         console.error('Error uploading file:', error);
       }
     };

     return (
       <form onSubmit={handleFormSubmit}>
         <input type="file" onChange={handleFileChange} />
         <button type="submit">Upload File</button>
       </form>
     );
   };

   export default FileUploadForm;
   ```
3. Use the FileUploadForm component in your main App component or wherever needed:

   ```javascript
   import React from 'react';
   import FileUploadForm from './FileUploadForm';

   const App = () => {
     return (
       <div>
         <h1>File Upload</h1>
         <FileUploadForm />
       </div>
     );
   };

   export default App;
   ```

With these setups, your Node.js backend will be able to handle file uploads using Multer, while your React frontend will provide a form for users to select and upload files, and Axios will facilitate the HTTP requests to the backend.
