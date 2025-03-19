# 1. What is the DOM, and how does JavaScript interact with it?

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

---

# 2. What are different ways to select elements in the DOM?

* `getElementById`
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

# 3. How do you change the text content of an element using JavaScript?

=> **Changing the Text Content of an Element in JavaScript**

You can change the text inside an HTML element using  **three main properties** :

1. **`textContent`** (Recommended ✅)
2. **`innerText`**
3. **`innerHTML`** (Use with caution ⚠️)

---

## **1️⃣ Using `textContent` (Best Practice ✅)**

* Modifies the text content of an element.
* **Ignores HTML tags** and treats everything as plain text.
* **More performant** than `innerText`.

✅ **Example:**

```html
<p id="myPara">Hello, World!</p>

<script>
  let para = document.getElementById("myPara");
  para.textContent = "Hello, JavaScript!";
</script>
```

🔹 If the `<p>` contained `<strong>Bold</strong>`, `textContent` would render it as `"<strong>Bold</strong>"`, displaying the HTML tags as plain text.

---

## **2️⃣ Using `innerText` (Respects CSS)**

* Similar to `textContent`, but it **respects CSS styles** (e.g., it won’t retrieve text inside `display: none;` elements).
* Slightly **slower** than `textContent`.

✅ **Example:**

```js
document.getElementById("myPara").innerText = "Updated Text!";
```

🔹  **Difference from `textContent`** :

If an element is hidden (`display: none`), `innerText`  **won't retrieve its text** , but `textContent` will.

---

## **3️⃣ Using `innerHTML` (Use with Caution ⚠️)**

* Allows setting **both text and HTML** inside an element.
* **Can inject HTML** , making it vulnerable to **XSS (Cross-Site Scripting) attacks** if user input is not sanitized.

✅ **Example:**

```js
document.getElementById("myPara").innerHTML = "<strong>Bold Text</strong>";
```

🔹 Now the paragraph will  **render bold text** , instead of showing `<strong>Bold Text</strong>` as plain text.

---

## **🔎 Comparison Table**

| Method          | Changes Text? | Supports HTML? | Respects CSS (`display: none`)? | Security Risk? |
| --------------- | ------------- | -------------- | --------------------------------- | -------------- |
| `textContent` | ✅ Yes        | ❌ No          | ❌ No                             | ✅ Safe        |
| `innerText`   | ✅ Yes        | ❌ No          | ✅ Yes                            | ✅ Safe        |
| `innerHTML`   | ✅ Yes        | ✅ Yes         | ❌ No                             | ⚠️ Risky     |

---

## **🎯 Best Practices**

* **Use `textContent`** for general text updates (best for performance & security).
* **Use `innerText`** if you need to respect CSS visibility.
* **Use `innerHTML` carefully** only when you need to insert HTML (avoid for user-generated content).

---

# 4.How do you modify the attributes of an element?

=> **Modifying Attributes of an Element in JavaScript**

You can modify an element’s attributes using the following methods:

---

## **1️⃣ Using `setAttribute()` (Recommended ✅)**

This method **adds or updates** an attribute on an element.

✅ **Example: Changing an image source (`src`) and `alt` text**

```html
<img id="myImage" src="old.jpg" alt="Old Image">

<script>
  let img = document.getElementById("myImage");
  img.setAttribute("src", "new.jpg");  // Change image source
  img.setAttribute("alt", "New Image"); // Update alt text
</script>
```

---

## **2️⃣ Using `getAttribute()` (To Read an Attribute)**

To get the **current value** of an attribute, use `getAttribute()`.

✅ **Example: Get the `href` of a Link**

```html
<a id="myLink" href="https://example.com">Visit</a>

<script>
  let link = document.getElementById("myLink").getAttribute("href");
  console.log(link); // Output: "https://example.com"
</script>
```

---

## **3️⃣ Using Direct Property Modification (Faster ⚡)**

For standard attributes like `src`, `href`, `value`, `checked`, etc., you can modify them  **directly** .

✅ **Example: Changing `value`, `id`, and `href`**

```html
<input id="myInput" type="text" value="Old Value">

<script>
  let input = document.getElementById("myInput");
  input.value = "New Value";  // Modify input value
  input.id = "newID";  // Change ID
</script>
```

👉 **Note:** This method  **does not work for custom attributes** .

---

## **4️⃣ Removing an Attribute (`removeAttribute()`)**

To  **remove an attribute** , use `removeAttribute()`.

✅ **Example: Remove `disabled` from a button**

```html
<button id="myBtn" disabled>Click Me</button>

<script>
  let btn = document.getElementById("myBtn");
  btn.removeAttribute("disabled"); // Now button is enabled
</script>
```

---

## **5️⃣ Checking If an Attribute Exists (`hasAttribute()`)**

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

### **Comparison Table**

| Method                                    | Purpose                           | Works for Common Attributes? | Works for Custom Attributes? |
| ----------------------------------------- | --------------------------------- | ---------------------------- | ---------------------------- |
| `setAttribute("attr", "value")`         | Add/Modify attributes             | ✅ Yes                       | ✅ Yes                       |
| `getAttribute("attr")`                  | Get attribute value               | ✅ Yes                       | ✅ Yes                       |
| Direct Property (`element.src = "..."`) | Modify standard attributes faster | ✅ Yes                       | ❌ No                        |
| `removeAttribute("attr")`               | Remove an attribute               | ✅ Yes                       | ✅ Yes                       |
| `hasAttribute("attr")`                  | Check if an attribute exists      | ✅ Yes                       | ✅ Yes                       |

---

### **Best Practices**

* **Use `setAttribute()` and `getAttribute()`** for **custom attributes** (e.g., `data-*` attributes).
* **Use direct property modification** (`element.src`, `element.href`) for **standard attributes** for better performance.
* **Use `removeAttribute()`** when you need to completely remove an attribute.

# 5. How do you create, append, and remove elements dynamically?

=> **Creating, Appending, and Removing Elements Dynamically in JavaScript**

JavaScript allows you to create and manipulate elements dynamically in the DOM. Here’s how you can **create, append, and remove elements** effectively:

---

## **1️⃣ Creating an Element (`document.createElement()`)**

To create an element dynamically, use `document.createElement("tagName")`.

✅ **Example: Creating a `<div>`**

```js
let newDiv = document.createElement("div"); // Create a <div> element
newDiv.textContent = "Hello, this is a new div!"; // Add text content
newDiv.style.color = "blue"; // Add some styling
```

---

## **2️⃣ Appending an Element (`appendChild()` and `append()`)**

Once an element is created, you can **add it to the DOM** using:

* `appendChild()` (Older, works with a single node)
* `append()` (Newer, works with multiple nodes or text)

✅ **Example: Append a new `<p>` inside a `<div>`**

```html
<div id="container"></div>

<script>
  let newPara = document.createElement("p");
  newPara.textContent = "This is a dynamically added paragraph.";

  let container = document.getElementById("container");
  container.appendChild(newPara); // Adds the <p> to the <div>
</script>
```

✅ **Using `append()` (Supports multiple items)**

```js
container.append("Another paragraph", newPara);
```

---

## **3️⃣ Inserting an Element at a Specific Position (`insertBefore()`)**

If you need to insert an element **before** an existing element, use `insertBefore()`.

✅ **Example: Insert a `<p>` before another `<p>`**

```html
<div id="container">
  <p id="existingPara">Existing Paragraph</p>
</div>

<script>
  let newPara = document.createElement("p");
  newPara.textContent = "Inserted before the existing paragraph!";

  let container = document.getElementById("container");
  let existingPara = document.getElementById("existingPara");

  container.insertBefore(newPara, existingPara);
</script>
```

---

## **4️⃣ Removing an Element (`removeChild()` and `remove()`)**

To **delete** an element from the DOM, use:

* `removeChild()` (Works with parent-child relation)
* `remove()` (Newer, removes directly)

✅ **Example: Remove a `<p>` from a `<div>`**

```html
<div id="container">
  <p id="removePara">I will be removed</p>
</div>

<script>
  let container = document.getElementById("container");
  let paraToRemove = document.getElementById("removePara");

  container.removeChild(paraToRemove); // Removes the paragraph
</script>
```

✅ **Using `remove()` (Simpler)**

```js
paraToRemove.remove();
```

---

## **5️⃣ Replacing an Element (`replaceChild()`)**

If you need to  **replace an existing element** , use `replaceChild()`.

✅ **Example: Replace an old `<p>` with a new one**

```html
<div id="container">
  <p id="oldPara">This is an old paragraph.</p>
</div>

<script>
  let newPara = document.createElement("p");
  newPara.textContent = "This is a new paragraph!";

  let container = document.getElementById("container");
  let oldPara = document.getElementById("oldPara");

  container.replaceChild(newPara, oldPara); // Replaces old with new
</script>
```

---

## **🎯 Summary Table**

| Action                                  | Method                                             |
| --------------------------------------- | -------------------------------------------------- |
| **Create an element**             | `document.createElement("tag")`                  |
| **Add an element at the end**     | `appendChild(newElement)`,`append(newElement)` |
| **Insert before another element** | `insertBefore(newElement, existingElement)`      |
| **Remove an element**             | `removeChild(element)`,`element.remove()`      |
| **Replace an element**            | `replaceChild(newElement, oldElement)`           |
