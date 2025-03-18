### **Introduction to DOM (Document Object Model)**

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the structure of a web page as a  **tree of objects** , where each element (like `<div>`, `<p>`, `<button>`, etc.) is a **node** in the tree.

#### **Why is the DOM important?**

The DOM allows JavaScript to:

* **Access HTML elements** dynamically.
* **Modify content** (change text, images, styles, and attributes).
* **Handle events** (clicks, keypresses, form submissions).
* **Create and remove elements** dynamically.

#### **Structure of the DOM**

The DOM is structured as a tree where:

* The **root node** is the `document` object.
* HTML elements (`<html>`, `<body>`, `<div>`, etc.) are child nodes.
* Text inside elements is also a node.

Example:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Example</title>
  </head>
  <body>
    <h1>Hello, DOM!</h1>
    <p>This is a paragraph.</p>
    <button>Click Me</button>
  </body>
</html>
```

This structure is represented in the DOM as:

```
document
 ├── html
 │   ├── head
 │   │   └── title ("DOM Example")
 │   ├── body
 │       ├── h1 ("Hello, DOM!")
 │       ├── p ("This is a paragraph.")
 │       ├── button ("Click Me")
```

#### **Interacting with the DOM in JavaScript**

1. **Selecting Elements**
   ```js
   let heading = document.querySelector("h1"); // Selects the <h1> element
   ```
2. **Modifying Content**
   ```js
   heading.textContent = "Welcome to the DOM!";
   ```
3. **Changing Styles**
   ```js
   heading.style.color = "blue";
   ```
4. **Handling Events**
   ```js
   let button = document.querySelector("button");
   button.addEventListener("click", () => {
       alert("Button Clicked!");
   });
   ```

#### **Types of Nodes in the DOM**

1. **Element Nodes** – Represent HTML tags like `<div>`, `<p>`, `<button>`.
2. **Text Nodes** – Contain the text inside an element.
3. **Attribute Nodes** – Represent attributes like `class`, `id`, `href`.
4. **Comment Nodes** – Represent HTML comments (`<!-- Comment -->`).
