**DOM Manipulation Cheat Sheet**

---

## **🌳 Selecting Elements**

| Method                                       | Description                                | Returns        |
| -------------------------------------------- | ------------------------------------------ | -------------- |
| `document.getElementById("id")`            | Selects an element by its `id`           | Single Element |
| `document.getElementsByClassName("class")` | Selects elements by class name             | HTMLCollection |
| `document.getElementsByTagName("tag")`     | Selects elements by tag name               | HTMLCollection |
| `document.querySelector("selector")`       | Selects the**first**matching element | Single Element |
| `document.querySelectorAll("selector")`    | Selects**all**matching elements      | NodeList       |

---

## **📝 Modifying Elements**

| Method                                | Action                                                           |
| ------------------------------------- | ---------------------------------------------------------------- |
| `element.textContent = "New Text"`  | Changes text content (ignores HTML)                              |
| `element.innerText = "New Text"`    | Similar to `textContent`, but respects CSS (`display: none`) |
| `element.innerHTML = "<b>Bold</b>"` | Changes content (renders HTML)                                   |

---

## **🎨 Changing Styles**

| Method                                | Action                   |
| ------------------------------------- | ------------------------ |
| `element.style.property = "value"`  | Changes CSS styles       |
| `element.classList.add("class")`    | Adds a CSS class         |
| `element.classList.remove("class")` | Removes a CSS class      |
| `element.classList.toggle("class")` | Toggles a class (on/off) |

---

## **🔧 Modifying Attributes**

| Method                                    | Action                        |
| ----------------------------------------- | ----------------------------- |
| `element.setAttribute("attr", "value")` | Sets an attribute             |
| `element.getAttribute("attr")`          | Gets an attribute value       |
| `element.removeAttribute("attr")`       | Removes an attribute          |
| `element.hasAttribute("attr")`          | Checks if an attribute exists |

---

## **📌 Adding & Removing Elements**

| Method                                 | Action                    |
| -------------------------------------- | ------------------------- |
| `document.createElement("tag")`      | Creates a new element     |
| `parent.appendChild(child)`          | Appends an element        |
| `parent.insertBefore(new, existing)` | Inserts before an element |
| `parent.removeChild(child)`          | Removes an element        |

---

## **🖱️ Event Handling**

| Method                                             | Action                                        |
| -------------------------------------------------- | --------------------------------------------- |
| `element.addEventListener("event", function)`    | Adds an event listener                        |
| `element.removeEventListener("event", function)` | Removes an event listener                     |
| `event.preventDefault()`                         | Prevents default behavior (e.g., form submit) |
| `event.stopPropagation()`                        | Stops event bubbling                          |

---

## **🔄 Event Delegation**

| Scenario                                                      | Solution                       |
| ------------------------------------------------------------- | ------------------------------ |
| Want to handle events for**dynamically added elements** | Use event delegation on parent |

---

## **⏳ Timers & Delays**

| Method                           | Action                        |
| -------------------------------- | ----------------------------- |
| `setTimeout(function, delay)`  | Runs a function after a delay |
| `setInterval(function, delay)` | Runs a function repeatedly    |
| `clearTimeout(id)`             | Stops a timeout               |
| `clearInterval(id)`            | Stops an interval             |

---

## **🔄 Traversing the DOM**

| Property                           | Action               |
| ---------------------------------- | -------------------- |
| `element.parentElement`          | Get parent           |
| `element.children`               | Get children         |
| `element.firstElementChild`      | Get first child      |
| `element.lastElementChild`       | Get last child       |
| `element.nextElementSibling`     | Get next sibling     |
| `element.previousElementSibling` | Get previous sibling |

---

## **🎯 Cheat Sheet Summary**

| Task                               | Method                                                      |
| ---------------------------------- | ----------------------------------------------------------- |
| **Select an element**        | `getElementById()`,`querySelector()`                    |
| **Select multiple elements** | `getElementsByClassName()`,`querySelectorAll()`         |
| **Change text**              | `textContent`,`innerText`,`innerHTML`                 |
| **Change styles**            | `style.property`,`classList.add()`                      |
| **Modify attributes**        | `setAttribute()`,`getAttribute()`,`removeAttribute()` |
| **Add/remove elements**      | `createElement()`,`appendChild()`,`removeChild()`     |
| **Handle events**            | `addEventListener()`,`preventDefault()`                 |
| **Work with time**           | `setTimeout()`,`setInterval()`                          |

---
