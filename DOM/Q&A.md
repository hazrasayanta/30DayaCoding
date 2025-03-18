
### **Basic DOM Manipulation Questions**

1. What is the DOM, and how does JavaScript interact with it?
2. What are different ways to select elements in the DOM?
   * `getElementById`
   * `getElementsByClassName`
   * `getElementsByTagName`
   * `querySelector`
   * `querySelectorAll`
3. How do you change the text content of an element using JavaScript?
4. How do you modify the attributes of an element?
5. How do you create, append, and remove elements dynamically?
6. How do you handle events in JavaScript (inline vs. `addEventListener`)?
7. What is event delegation, and why is it useful?
8. What is the difference between `innerHTML`, `textContent`, and `innerText`?
9. How do you traverse the DOM (parent, children, siblings)?

### **Scenario-Based Questions**

1. **Modify a Specific Element**

   You have four `<p>` tags inside a `<div>` with the same class name. How would you change the text of the second `<p>` without modifying the HTML?
2. **Remove an Element**

   Given a button inside a `<div>`, how do you remove the button from the DOM when clicked?
3. **Change CSS Dynamically**

   How do you change the background color of a `<div>` when hovering over it using JavaScript (without CSS `:hover`)?
4. **Toggle Visibility**

   How do you show/hide a `<div>` when clicking a button?
5. **Dynamic List Handling**

   How do you add new list items (`<li>`) dynamically to an unordered list when clicking an "Add" button?
6. **Event Delegation Use Case**

   If you have a list (`<ul>`) and you want to handle clicks on dynamically added `<li>` elements, what approach should you take?
7. **Prevent Default Behavior**

   If you have a link (`<a>`), how do you prevent it from navigating to another page?
8. **Drag and Drop Functionality**

   How would you implement a basic drag-and-drop feature using the DOM?
9. **Form Handling**

   How do you validate a form input before submission and prevent form submission if the validation fails?
10. **Countdown Timer**

    How do you create a countdown timer that updates the UI every second?

## ---------------------------------------------------------------------------------------------------------------------------------------

### 1. What is the DOM, and how does JavaScript interact with it?

=> **What is the DOM?**

The **Document Object Model (DOM)** is a **tree-like representation** of a web page, allowing programming languages (like JavaScript) to interact with and manipulate its structure, content, and styles dynamically.

When a browser loads an HTML page:

1. It parses the **HTML** and converts it into a structured  **DOM tree** .
2. The **DOM tree** consists of  **nodes** , where each element (`<div>`, `<p>`, `<button>`, etc.) is a node.
3. JavaScript can then **access, modify, and manipulate** this DOM structure.

### **How Does JavaScript Interact with the DOM?**

JavaScript interacts with the DOM using the `document` object, which represents the entire web page.

#### **1. Selecting Elements**

JavaScript can **find** and **access** elements using various methods:

```js
let element = document.getElementById("myId"); // Selects element by ID
let elements = document.getElementsByClassName("myClass"); // Selects elements by class
let paragraphs = document.getElementsByTagName("p"); // Selects elements by tag name
let firstParagraph = document.querySelector("p"); // Selects the first <p> element
let allParagraphs = document.querySelectorAll("p"); // Selects all <p> elements
```

#### **2. Modifying Elements**

JavaScript can **change content, attributes, and styles** of elements:

```js
document.querySelector("h1").textContent = "Hello, JavaScript!"; // Change text
document.querySelector("p").style.color = "blue"; // Change text color
document.querySelector("img").setAttribute("src", "new-image.jpg"); // Change image source
```

#### **3. Handling Events**

JavaScript can listen for and respond to user interactions:

```js
document.querySelector("button").addEventListener("click", function() {
    alert("Button Clicked!");
});
```

#### **4. Creating and Removing Elements**

JavaScript can  **add or remove elements dynamically** :

```js
let newDiv = document.createElement("div"); // Create new <div>
newDiv.textContent = "I am a new div!";
document.body.appendChild(newDiv); // Append to body

document.querySelector("button").remove(); // Remove a button
```

### **Conclusion**

The **DOM acts as a bridge** between JavaScript and the webpage, enabling dynamic content updates, event handling, and interactive features. JavaScript manipulates the DOM in real-time, creating rich and interactive web applications.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### 2. What are different ways to select elements in the DOM?* `getElementById`

* `getElementsByClassName`
* `getElementsByTagName`
* `querySelector`
* `querySelectorAll`

=> **Different Ways to Select Elements in the DOM**

JavaScript provides multiple methods to select elements from the  **Document Object Model (DOM)** . Here’s a breakdown of each:

---

### **1. `getElementById()`**

* Selects a single element based on its `id`.
* Returns an **element** (`null` if not found).
* **Best when selecting unique elements** (like a single button or section).

✅ **Example:**

```html
<p id="myPara">Hello, World!</p>
<script>
  let para = document.getElementById("myPara");
  para.style.color = "blue"; // Changes text color to blue
</script>
```

---

### **2. `getElementsByClassName()`**

* Selects multiple elements with the same `class`.
* Returns an **HTMLCollection** (live collection, updates when DOM changes).
* Use indexing `[0]` to access a specific element.
* Needs to be converted to an array for `forEach()`.

✅ **Example:**

```html
<p class="text">First Paragraph</p>
<p class="text">Second Paragraph</p>
<script>
  let elements = document.getElementsByClassName("text");
  elements[0].style.color = "red"; // Changes first paragraph to red
</script>
```

✅ **Convert to an array and loop:**

```js
Array.from(elements).forEach(el => el.style.color = "green");
```

---

### **3. `getElementsByTagName()`**

* Selects elements by their **tag name** (`p`, `div`, `button`, etc.).
* Returns an **HTMLCollection** (live).
* Similar to `getElementsByClassName()`.

✅ **Example:**

```html
<p>First</p>
<p>Second</p>
<script>
  let paras = document.getElementsByTagName("p");
  paras[1].style.fontSize = "20px"; // Changes the second <p>
</script>
```

---

### **4. `querySelector()`**

* Selects the **first matching element** (uses  **CSS selectors** ).
* Returns **a single element** (or `null` if not found).
* **More flexible than `getElementById()`** since it can select by ID, class, or tag.

✅ **Example:**

```html
<p class="text">Hello</p>
<p class="text">World</p>
<script>
  let firstPara = document.querySelector(".text"); // Selects first <p> with class "text"
  firstPara.style.color = "purple";
</script>
```

✅ **Selecting by ID:**

```js
document.querySelector("#myId");
```

✅ **Selecting nested elements:**

```js
document.querySelector("div p"); // Selects the first <p> inside a <div>
```

---

### **5. `querySelectorAll()`**

* Selects **all matching elements** (uses  **CSS selectors** ).
* Returns a **NodeList** (static, does not update when DOM changes).
* Can use `forEach()` to loop through elements.

✅ **Example:**

```html
<p class="text">Para 1</p>
<p class="text">Para 2</p>
<script>
  let paras = document.querySelectorAll(".text"); // Selects all <p> with class "text"
  paras.forEach(p => p.style.backgroundColor = "yellow");
</script>
```

---

### **Comparison Table**

| Method                              | Returns        | Live?  | Multiple Elements? | Use Case                                                                            |
| ----------------------------------- | -------------- | ------ | ------------------ | ----------------------------------------------------------------------------------- |
| `getElementById("id")`            | Element        | ❌ No  | ❌ No              | Best for unique elements (single ID)                                                |
| `getElementsByClassName("class")` | HTMLCollection | ✅ Yes | ✅ Yes             | Selects all elements with a class (needs indexing or loop)                          |
| `getElementsByTagName("tag")`     | HTMLCollection | ✅ Yes | ✅ Yes             | Selects all elements with a tag name                                                |
| `querySelector("selector")`       | Element        | ❌ No  | ❌ No              | Selects the**first**matching element (supports CSS selectors)                 |
| `querySelectorAll("selector")`    | NodeList       | ❌ No  | ✅ Yes             | Selects**all**matching elements (supports CSS selectors, can use `forEach`) |

---

### **When to Use What?**

* **For unique elements:** Use `getElementById()` or `querySelector()`.
* **For multiple elements:** Use `getElementsByClassName()`, `getElementsByTagName()`, or `querySelectorAll()`.
* **For better performance:** `getElementById()` is the fastest.
* **For modern development:** Prefer `querySelector()` and `querySelectorAll()` due to CSS selector flexibility.

---

### 3. How do you modify the attributes of an element?

=> **Modifying Attributes of an Element in JavaScript**

You can modify an element’s attributes using  **three main methods** :

1. `setAttribute()`
2. `getAttribute()`
3. Direct property modification

---

## **1. Using `setAttribute()` (Recommended ✅)**

This method allows you to **set or update** an attribute on an element.

✅ **Example: Changing an Image Source (`src`)**

```html
<img id="myImage" src="old.jpg" alt="Old Image">
<script>
  document.getElementById("myImage").setAttribute("src", "new.jpg");
  document.getElementById("myImage").setAttribute("alt", "New Image");
</script>
```

---

## **2. Using `getAttribute()` (To Read an Attribute)**

To get the current value of an attribute, use `getAttribute()`.

✅ **Example: Get the `href` of a Link**

```html
<a id="myLink" href="https://example.com">Visit</a>
<script>
  let link = document.getElementById("myLink").getAttribute("href");
  console.log(link); // Output: "https://example.com"
</script>
```

---

## **3. Using Direct Property Modification (Faster ⚡)**

Instead of `setAttribute()`, you can **directly modify attributes** using JavaScript properties.

✅ **Example: Changing `id`, `href`, `value`, etc.**

```html
<input id="myInput" type="text" value="Old Value">
<script>
  let input = document.getElementById("myInput");
  input.value = "New Value";  // Modifies the value directly
  input.id = "newID";  // Changes ID
</script>
```

👉 **Note:** This works for common attributes like `id`, `value`, `src`, `href`, `checked`, etc., but  **not for custom attributes** .

---

## **4. Removing an Attribute (`removeAttribute()`)**

To remove an attribute, use `removeAttribute()`.

✅ **Example: Remove the `disabled` attribute from a button**

```html
<button id="myBtn" disabled>Click Me</button>
<script>
  document.getElementById("myBtn").removeAttribute("disabled");
</script>
```

🔹 Now the button becomes clickable.

---

## **5. Checking If an Attribute Exists (`hasAttribute()`)**

This method checks whether an element has a specific attribute.

✅ **Example: Check if a link has a `target` attribute**

```js
let link = document.getElementById("myLink");
if (link.hasAttribute("target")) {
  console.log("Target attribute exists!");
} else {
  console.log("No target attribute.");
}
```

---

## **Comparison Table**

| Method                                    | Purpose                           | Works for Common Attributes? | Works for Custom Attributes? |
| ----------------------------------------- | --------------------------------- | ---------------------------- | ---------------------------- |
| `setAttribute("attr", "value")`         | Add/Modify attributes             | ✅ Yes                       | ✅ Yes                       |
| `getAttribute("attr")`                  | Get attribute value               | ✅ Yes                       | ✅ Yes                       |
| Direct Property (`element.src = "..."`) | Modify standard attributes faster | ✅ Yes                       | ❌ No                        |
| `removeAttribute("attr")`               | Remove an attribute               | ✅ Yes                       | ✅ Yes                       |
| `hasAttribute("attr")`                  | Check if an attribute exists      | ✅ Yes                       | ✅ Yes                       |

---

### **Which One Should You Use?**

* **Use `setAttribute()` and `getAttribute()`** for **custom attributes** (`data-*` attributes, ARIA attributes, etc.).
* **Use direct property modification** when working with standard attributes (`src`, `href`, `value`) for better performance.
* **Use `removeAttribute()`** to completely remove an attribute.
