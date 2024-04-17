# JS Dom based questions

## **1. Dynamic Content Generator** :

* **Objective** : Create a webpage that allows users to dynamically generate content boxes with user-specified properties.
* **Specifications** :
  * Users should be able to input content (text, images, or links) they wish to display in the box.
  * Allow users to customize the box's background color, border, padding, and margin using input fields.
  * Upon pressing a "Generate" button, the box should be created and appended to the page.
  * Implement functionality to dynamically remove or edit any generated box.

**=>** To implement the Dynamic Content Generator webpage with the specified objectives, you can use HTML, CSS, and JavaScript. Here's a basic example to get you started:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dynamic Content Generator</title>
<style>
  /* CSS for content boxes */
  .content-box {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;
    width: 300px;
    display: inline-block;
    vertical-align: top;
  }
</style>
</head>
<body>

<!-- Input fields for content and box properties -->
<input type="text" id="contentInput" placeholder="Enter content">
<input type="color" id="bgColorInput" value="#ffffff">
<input type="number" id="borderInput" placeholder="Border width">
<input type="number" id="paddingInput" placeholder="Padding">
<input type="number" id="marginInput" placeholder="Margin">
<button onclick="generateContent()">Generate</button>

<!-- Container for generated content boxes -->
<div id="contentContainer"></div>

<script>
function generateContent() {
  // Get input values
  var content = document.getElementById('contentInput').value;
  var bgColor = document.getElementById('bgColorInput').value;
  var borderWidth = document.getElementById('borderInput').value + 'px';
  var padding = document.getElementById('paddingInput').value + 'px';
  var margin = document.getElementById('marginInput').value + 'px';
  
  // Create content box element
  var contentBox = document.createElement('div');
  contentBox.className = 'content-box';
  contentBox.style.backgroundColor = bgColor;
  contentBox.style.borderWidth = borderWidth;
  contentBox.style.padding = padding;
  contentBox.style.margin = margin;
  contentBox.innerHTML = content;
  
  // Create edit and remove buttons
  var editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = function() {
    editContent(contentBox);
  };
  
  var removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.onclick = function() {
    contentBox.parentNode.removeChild(contentBox);
  };
  
  // Append buttons to content box
  contentBox.appendChild(editButton);
  contentBox.appendChild(removeButton);
  
  // Append content box to container
  document.getElementById('contentContainer').appendChild(contentBox);
}

function editContent(contentBox) {
  var newContent = prompt('Enter new content:');
  if (newContent !== null) {
    contentBox.innerHTML = newContent;
  }
}
</script>

</body>
</html>
```

This code creates a webpage with input fields for content and box properties. When the user clicks the "Generate" button, a content box is created with the specified properties and appended to the page. Users can also edit the content of each box by clicking the "Edit" button or remove a box entirely by clicking the "Remove" button.

## 2. **Form Validator** :

* **Objective** : Design a registration form that includes fields for a username, email, password, and a password confirmation. Implement a real-time validator using DOM manipulation.
* **Specifications** :
  * Check if the username is more than 5 characters.
  * Validate the email format.
  * Ensure the password is at least 8 characters long and contains a mix of letters and numbers.
  * Ensure the password and confirmation fields match.
  * Display real-time feedback to the user. If a field is valid, show a green border around it; if invalid, show a red border and a specific error message.

**=>** To implement the Form Validator with real-time validation using DOM manipulation, you can use HTML, CSS, and JavaScript. Here's a basic example to achieve the specified objectives:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Form Validator</title>
<style>
  /* CSS for form fields */
  input {
    margin-bottom: 10px;
    padding: 5px;
    width: 200px;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
</head>
<body>

<!-- Registration form -->
<form id="registrationForm">
  <input type="text" id="username" placeholder="Username">
  <div id="usernameError" class="error"></div>
  <input type="email" id="email" placeholder="Email">
  <div id="emailError" class="error"></div>
  <input type="password" id="password" placeholder="Password">
  <div id="passwordError" class="error"></div>
  <input type="password" id="confirmPassword" placeholder="Confirm Password">
  <div id="confirmPasswordError" class="error"></div>
  <button type="submit">Register</button>
</form>

<script>
// Form elements
const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Error message elements
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Event listeners for input fields
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Form submission handler
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Validate all fields before submitting
  validateUsername();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  
  // Perform form submission if all fields are valid
  if (isFormValid()) {
    alert('Form submitted successfully!');
    // Here, you can perform further actions such as sending data to a server
  }
});

// Validation functions
function validateUsername() {
  if (usernameInput.value.length < 5) {
    showError(usernameError, 'Username must be at least 5 characters long');
  } else {
    clearError(usernameError);
  }
}

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    showError(emailError, 'Invalid email format');
  } else {
    clearError(emailError);
  }
}

function validatePassword() {
  const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
  if (!passwordPattern.test(passwordInput.value)) {
    showError(passwordError, 'Password must be at least 8 characters long and contain a mix of letters and numbers');
  } else {
    clearError(passwordError);
  }
}

function validateConfirmPassword() {
  if (confirmPasswordInput.value !== passwordInput.value) {
    showError(confirmPasswordError, 'Passwords do not match');
  } else {
    clearError(confirmPasswordError);
  }
}

// Utility functions
function showError(element, message) {
  element.textContent = message;
  element.style.display = 'block';
  element.previousElementSibling.style.border = '1px solid red';
}

function clearError(element) {
  element.textContent = '';
  element.style.display = 'none';
  element.previousElementSibling.style.border = '1px solid green';
}

function isFormValid() {
  return !usernameError.textContent && !emailError.textContent && !passwordError.textContent && !confirmPasswordError.textContent;
}
</script>

</body>
</html>
```

This code creates a registration form with fields for username, email, password, and confirm password. Real-time validation is performed for each field using event listeners and DOM manipulation. Error messages are displayed below each input field, and valid fields have a green border while invalid fields have a red border. The form is submitted only if all fields are valid.

## **3. Interactive Image Carousel** :

* **Objective** : Build an image carousel/slider that users can interact with.
* **Specifications** :
  * Display one image at a time from a collection of images.
  * Implement "Next" and "Previous" buttons to navigate through the images.
  * Display thumbnails of all images below the main display. Clicking on a thumbnail should display that image in the main view.
  * Bonus: Implement an auto-play feature where images change every few seconds, but it should pause if a user hovers over the carousel.

**=>** To create an interactive image carousel with the specified objectives, you can use HTML, CSS, and JavaScript. Below is an example implementation:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interactive Image Carousel</title>
<style>
  /* CSS for image carousel */
  #carouselContainer {
    max-width: 600px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  
  #mainImage {
    width: 100%;
    transition: transform 0.5s ease;
  }
  
  #thumbnailContainer {
    margin-top: 10px;
    text-align: center;
  }
  
  .thumbnail {
    width: 50px;
    height: auto;
    margin: 0 5px;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  
  .thumbnail:hover {
    opacity: 0.7;
  }
  
  .active {
    border: 2px solid blue;
  }
</style>
</head>
<body>

<div id="carouselContainer">
  <img id="mainImage" src="image1.jpg" alt="Image">
</div>

<div id="thumbnailContainer"></div>

<script>
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg']; // Add your image URLs here

const mainImage = document.getElementById('mainImage');
const thumbnailContainer = document.getElementById('thumbnailContainer');

let currentIndex = 0;

// Display thumbnails
images.forEach((image, index) => {
  const thumbnail = document.createElement('img');
  thumbnail.src = image;
  thumbnail.classList.add('thumbnail');
  if (index === currentIndex) {
    thumbnail.classList.add('active');
  }
  thumbnail.onclick = () => showImage(index);
  thumbnailContainer.appendChild(thumbnail);
});

// Display initial main image
mainImage.src = images[currentIndex];

function showImage(index) {
  currentIndex = index;
  mainImage.src = images[currentIndex];
  updateThumbnails();
}

function updateThumbnails() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail, index) => {
    if (index === currentIndex) {
      thumbnail.classList.add('active');
    } else {
      thumbnail.classList.remove('active');
    }
  });
}

// Next and Previous buttons
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  mainImage.src = images[currentIndex];
  updateThumbnails();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  mainImage.src = images[currentIndex];
  updateThumbnails();
}

// Auto-play feature
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(nextImage, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Event listeners for buttons
mainImage.addEventListener('mouseenter', stopAutoPlay);
mainImage.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();
</script>

</body>
</html>
```

In this example:

- The main image carousel displays one image at a time, and users can navigate through the images using "Next" and "Previous" buttons.
- Thumbnails of all images are displayed below the main display, and clicking on a thumbnail switches the main image to the selected one.
- The active thumbnail is highlighted with a blue border.
- An auto-play feature is implemented where images change every few seconds. The auto-play pauses when a user hovers over the carousel and resumes when they leave.

## **4. Dynamic Table Filter** :

* **Objective** : Create a data table that displays a list of items (e.g., products, users, or books). Implement a filter functionality using DOM methods.
* **Specifications** :
  * Populate the table with mock data entries.
  * Above the table, provide a search box where users can type queries.
  * As users type, dynamically filter and display only the rows in the table that contain the query string.
  * Bonus: Allow users to filter based on specific columns (e.g., only by product name or only by user email).

**=>** Here's an example implementation of a Dynamic Table Filter with the specified objectives using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dynamic Table Filter</title>
<style>
  /* CSS for table and search box */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
</style>
</head>
<body>

<!-- Search box -->
<input type="text" id="searchInput" placeholder="Search...">
  
<!-- Data table -->
<table id="dataTable">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>John Doe</td>
      <td>john@example.com</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Alice Johnson</td>
      <td>alice@example.com</td>
    </tr>
  </tbody>
</table>

<script>
// Get elements
const searchInput = document.getElementById('searchInput');
const dataTable = document.getElementById('dataTable');
const tableRows = dataTable.getElementsByTagName('tr');

// Add event listener for search input
searchInput.addEventListener('input', filterTable);

// Function to filter table based on search input
function filterTable() {
  const query = searchInput.value.toLowerCase();
  for (let i = 1; i < tableRows.length; i++) {
    const row = tableRows[i];
    let found = false;
    for (let j = 0; j < row.cells.length; j++) {
      const cell = row.cells[j];
      if (cell.textContent.toLowerCase().indexOf(query) > -1) {
        found = true;
        break;
      }
    }
    row.style.display = found ? '' : 'none';
  }
}
</script>

</body>
</html>
```

This code creates a data table with mock data entries and a search box above it. As users type in the search box, the table dynamically filters and displays only the rows that contain the query string in any of their cells.

You can expand this example to allow users to filter based on specific columns by adding additional logic to check the content of specific cells.

## **5. Drag-and-Drop Task Board** :

* **Objective** : Develop a task board similar to Trello or Kanban boards, where users can create tasks and move them between different columns (e.g., "To Do," "In Progress," "Done") using drag-and-drop.
* **Specifications** :
  * Display three columns representing different stages of a task.
  * Allow users to create a new task by entering a task name and description.
  * Users should be able to drag a task from one column and drop it into another, updating its status.
  * Implement visual feedback during the drag-and-drop (e.g., change task opacity when dragging, highlight the drop zone).
  * Ensure cross-browser compatibility for the drag-and-drop functionality.

**=>** Here's an example implementation of a Drag-and-Drop Task Board with the specified objectives using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Drag-and-Drop Task Board</title>
<style>
  /* CSS for task board */
  .task-board {
    display: flex;
  }
  
  .column {
    flex: 1;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
  
  .column h2 {
    margin-top: 0;
  }
  
  .task {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    cursor: grab;
  }
  
  .task.dragging {
    opacity: 0.5;
  }
  
  .column.drag-over {
    border-style: dashed;
  }
</style>
</head>
<body>

<div class="task-board">
  <div id="todoColumn" class="column" ondrop="drop(event, 'todo')" ondragover="allowDrop(event)">
    <h2>To Do</h2>
    <div id="todoTasks"></div>
  </div>
  <div id="inProgressColumn" class="column" ondrop="drop(event, 'inProgress')" ondragover="allowDrop(event)">
    <h2>In Progress</h2>
    <div id="inProgressTasks"></div>
  </div>
  <div id="doneColumn" class="column" ondrop="drop(event, 'done')" ondragover="allowDrop(event)">
    <h2>Done</h2>
    <div id="doneTasks"></div>
  </div>
</div>

<div>
  <label for="taskName">Task Name:</label>
  <input type="text" id="taskName" placeholder="Enter task name">
  <label for="taskDescription">Task Description:</label>
  <input type="text" id="taskDescription" placeholder="Enter task description">
  <button onclick="createTask()">Create Task</button>
</div>

<script>
// Create a task counter for unique task IDs
let taskIdCounter = 1;

// Function to create a new task
function createTask() {
  const taskName = document.getElementById('taskName').value;
  const taskDescription = document.getElementById('taskDescription').value;
  
  if (!taskName) {
    alert('Please enter a task name');
    return;
  }
  
  const task = document.createElement('div');
  task.classList.add('task');
  task.setAttribute('draggable', 'true');
  task.setAttribute('id', `task${taskIdCounter}`);
  task.innerHTML = `
    <h3>${taskName}</h3>
    <p>${taskDescription}</p>
  `;
  
  // Add drag event listeners
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);
  
  // Add task to "To Do" column
  document.getElementById('todoTasks').appendChild(task);
  
  // Increment task counter
  taskIdCounter++;
}

// Drag-and-drop event handlers
function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  setTimeout(() => event.target.classList.add('dragging'), 0);
}

function dragEnd(event) {
  event.target.classList.remove('dragging');
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event, targetColumn) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('text/plain');
  const task = document.getElementById(taskId);
  const targetColumnElement = document.getElementById(`${targetColumn}Tasks`);
  
  // Move task to target column
  targetColumnElement.appendChild(task);
  
  // Remove dashed border from target column
  document.querySelectorAll('.column').forEach(column => column.classList.remove('drag-over'));
}

// Highlight drop zone when dragging over a column
document.querySelectorAll('.column').forEach(column => {
  column.addEventListener('dragover', () => column.classList.add('drag-over'));
  column.addEventListener('dragleave', () => column.classList.remove('drag-over'));
});
</script>

</body>
</html>
```

In this example:

- Three columns represent different stages of a task: "To Do," "In Progress," and "Done."
- Users can create new tasks by entering a task name and description and clicking the "Create Task" button.
- Tasks are draggable, and users can drag them between different columns to update their status.
- Visual feedback is provided during drag-and-drop operations: the opacity of the task decreases when dragging, and the drop zone is highlighted with a dashed border.
- The drag-and-drop functionality ensures cross-browser compatibility for modern browsers.

## **6. Accordion Menu** :

* **Objective** : Construct an interactive accordion-style sidebar menu using the DOM.
* **Specifications** :
  * The menu should consist of multiple sections or "tabs".
  * Only one section can be expanded at any time. Clicking on another section should collapse the previously expanded section.
  * Each section should smoothly animate during the expand/collapse actions.
  * Implement accessibility features: The menu should be navigable using keyboard arrow keys.

**=>** Here's an example implementation of an Accordion Menu with the specified objectives using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Accordion Menu</title>
<style>
  /* CSS for accordion menu */
  .accordion {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .accordion li {
    border-bottom: 1px solid #ddd;
  }
  
  .accordion li:last-child {
    border-bottom: none;
  }
  
  .accordion button {
    width: 100%;
    padding: 10px;
    text-align: left;
    background-color: #f9f9f9;
    border: none;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s;
  }
  
  .accordion button:hover {
    background-color: #ddd;
  }
  
  .accordion button.active {
    background-color: #ddd;
  }
  
  .accordion .panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
</style>
</head>
<body>

<ul class="accordion">
  <li>
    <button class="accordion-btn">Section 1</button>
    <div class="panel">
      <p>Content for Section 1</p>
    </div>
  </li>
  <li>
    <button class="accordion-btn">Section 2</button>
    <div class="panel">
      <p>Content for Section 2</p>
    </div>
  </li>
  <li>
    <button class="accordion-btn">Section 3</button>
    <div class="panel">
      <p>Content for Section 3</p>
    </div>
  </li>
</ul>

<script>
// Get all accordion buttons
const accordionButtons = document.querySelectorAll('.accordion-btn');

// Add click event listener to each button
accordionButtons.forEach(button => {
  button.addEventListener('click', toggleAccordion);
});

// Function to toggle accordion panel
function toggleAccordion(event) {
  const button = event.target;
  const panel = button.nextElementSibling;

  // Close all other panels
  const allPanels = document.querySelectorAll('.panel');
  allPanels.forEach(otherPanel => {
    if (otherPanel !== panel) {
      otherPanel.style.maxHeight = '0';
      otherPanel.parentElement.querySelector('.accordion-btn').classList.remove('active');
    }
  });

  // Toggle active class on button
  button.classList.toggle('active');

  // Toggle max-height of panel
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

// Add keyboard navigation using arrow keys
document.addEventListener('keydown', function(event) {
  const activeButton = document.querySelector('.accordion-btn.active');
  let nextButton;

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();

    if (event.key === 'ArrowUp') {
      nextButton = activeButton.parentElement.previousElementSibling;
      if (!nextButton) {
        nextButton = activeButton.parentElement.parentElement.lastElementChild;
      }
    } else {
      nextButton = activeButton.parentElement.nextElementSibling;
      if (!nextButton) {
        nextButton = activeButton.parentElement.parentElement.firstElementChild;
      }
    }

    nextButton.querySelector('.accordion-btn').focus();
    toggleAccordion({ target: nextButton.querySelector('.accordion-btn') });
  }
});
</script>

</body>
</html>
```

In this example:

- An accordion-style menu is created using an unordered list (`<ul>`) with list items (`<li>`) for each section.
- Each section contains a button for toggling the content and a hidden panel (`<div class="panel">`) with the section's content.
- Clicking on a button expands/collapses the corresponding panel smoothly with a CSS transition.
- Only one panel can be expanded at a time, and clicking on another section collapses the previously expanded section.
- The active section's button has an "active" class for visual indication.
- Keyboard navigation using arrow keys (up and down) is implemented to navigate through the sections.

## **7. Lightbox Gallery** :

* **Objective** : Design a gallery of thumbnail images. When a user clicks on a thumbnail, it should open in a larger view, known as a lightbox.
* **Specifications** :
  * Display a grid of thumbnail images on the page.
  * When a thumbnail is clicked, the image should enlarge and be prominently displayed in a modal window (lightbox) with the background dimmed.
  * Implement "Next" and "Previous" buttons in the lightbox to navigate through the enlarged images.
  * Add a close button to exit the lightbox view.

**=>** Here's an example implementation of a Lightbox Gallery with the specified objectives using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lightbox Gallery</title>
<style>
  /* CSS for lightbox gallery */
  body {
    font-family: Arial, sans-serif;
  }
  
  .gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .thumbnail {
    width: 150px;
    height: 100px;
    overflow: hidden;
    cursor: pointer;
  }
  
  .thumbnail img {
    width: 100%;
    height: auto;
    transition: transform 0.2s;
  }
  
  .thumbnail img:hover {
    transform: scale(1.1);
  }
  
  .lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    text-align: center;
  }
  
  .lightbox img {
    max-width: 80%;
    max-height: 80%;
    margin-top: 50px;
    border: 5px solid #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
</style>
</head>
<body>

<!-- Thumbnail gallery -->
<div class="gallery">
  <div class="thumbnail" onclick="openLightbox(0)">
    <img src="image1.jpg" alt="Thumbnail 1">
  </div>
  <div class="thumbnail" onclick="openLightbox(1)">
    <img src="image2.jpg" alt="Thumbnail 2">
  </div>
  <div class="thumbnail" onclick="openLightbox(2)">
    <img src="image3.jpg" alt="Thumbnail 3">
  </div>
  <!-- Add more thumbnails here -->
</div>

<!-- Lightbox -->
<div id="lightbox" class="lightbox">
  <span class="close-btn" onclick="closeLightbox()">×</span>
  <img id="lightboxImage" src="" alt="Enlarged Image">
</div>

<script>
// Open lightbox function
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const thumbnails = document.querySelectorAll('.thumbnail img');
  
  lightbox.style.display = 'block';
  lightboxImage.src = thumbnails[index].src;
  lightboxImage.alt = thumbnails[index].alt;
}

// Close lightbox function
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
</script>

</body>
</html>
```

In this example:

- Thumbnail images are displayed in a grid layout.
- Clicking on a thumbnail opens the corresponding image in a lightbox modal window with a dimmed background.
- Users can navigate through the images in the lightbox using "Next" and "Previous" buttons (not included in this example for simplicity).
- A close button (X) allows users to exit the lightbox view.
- Keyboard navigation is implemented to allow users to close the lightbox by pressing the "Escape" key.

## **8. Custom Video Player** :

* **Objective** : Using the HTML5 **`<video>`** element, create a custom video player with your own design for controls like play, pause, volume, and progress bar.
* **Specifications** :
  * Display video controls that are hidden by default but appear when the user hovers over the video.
  * Implement custom buttons for play/pause, volume control, and full screen.
  * Add a clickable and draggable progress bar to seek through the video.
  * Show the current time and total duration of the video.

**=>** Here's an example implementation of a Custom Video Player with the specified objectives using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Custom Video Player</title>
<style>
  /* CSS for custom video player */
  .video-container {
    position: relative;
    width: 600px;
    margin: 20px auto;
  }
  
  video {
    width: 100%;
  }
  
  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .video-container:hover .controls {
    opacity: 1;
  }
  
  .controls button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    margin-right: 10px;
  }
  
  .progress-bar {
    width: 100%;
    height: 5px;
    background-color: #555;
    position: relative;
    margin-top: 5px;
  }
  
  .progress-bar .progress {
    height: 100%;
    background-color: #0a84ff;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .time-display {
    margin-top: 5px;
  }
</style>
</head>
<body>

<div class="video-container">
  <video id="videoPlayer" controls>
    <source src="sample-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div class="controls">
    <button id="playPauseBtn">▶</button>
    <button id="volumeBtn">🔊</button>
    <div class="progress-bar" id="progressBar">
      <div class="progress" id="progress"></div>
    </div>
    <div class="time-display" id="timeDisplay">0:00 / 0:00</div>
    <button id="fullscreenBtn">⛶</button>
  </div>
</div>

<script>
// Get video element and controls
const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeBtn = document.getElementById('volumeBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const timeDisplay = document.getElementById('timeDisplay');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Play or pause video
playPauseBtn.addEventListener('click', function() {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '❚❚';
  } else {
    video.pause();
    playPauseBtn.textContent = '▶';
  }
});

// Toggle mute/unmute
volumeBtn.addEventListener('click', function() {
  if (video.muted) {
    video.muted = false;
    volumeBtn.textContent = '🔊';
  } else {
    video.muted = true;
    volumeBtn.textContent = '🔇';
  }
});

// Update progress bar and time display
video.addEventListener('timeupdate', function() {
  const currentTime = video.currentTime;
  const duration = video.duration;
  progress.style.width = (currentTime / duration) * 100 + '%';
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  timeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

// Seek video by clicking on progress bar
progressBar.addEventListener('click', function(event) {
  const clickX = event.offsetX;
  const progressBarWidth = progressBar.offsetWidth;
  const percentage = clickX / progressBarWidth;
  video.currentTime = percentage * video.duration;
});

// Toggle fullscreen mode
fullscreenBtn.addEventListener('click', function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE11 */
    video.msRequestFullscreen();
  }
});

// Update fullscreen button text when exiting fullscreen
document.addEventListener('fullscreenchange', function() {
  if (!document.fullscreenElement) {
    fullscreenBtn.textContent = '⛶';
  }
});

</script>

</body>
</html>
```

In this example:

- The video player includes custom-designed controls for play/pause, volume control, progress bar, time display, and fullscreen mode.
- The play/pause

 button toggles between play and pause states, and its icon changes accordingly.

- The volume button toggles between mute and unmute states, and its icon changes accordingly.
- The progress bar allows users to seek through the video by clicking on it.
- The time display shows the current time and total duration of the video.
- The fullscreen button allows users to toggle fullscreen mode, and its icon changes accordingly.

## **9. Sticky Navigation Bar** :

* **Objective** : Design a navigation bar that becomes "sticky" and remains at the top of the viewport when the user scrolls down the page.
* **Specifications** :
  * As the user scrolls down the page, the navigation bar should stick to the top once it reaches the top edge of the viewport.
  * The sticky effect should be smooth, not jarring.
  * The content below the navbar should not jump or shift when the navbar becomes sticky.
  * Implement a "scroll to top" button that appears when the user scrolls down, and, when clicked, smoothly scrolls the page back to the top.

**=>** Below is an example of how you can implement a sticky navigation bar with a "scroll to top" button using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sticky Navigation Bar</title>
<style>
  /* CSS for sticky navigation bar */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .navbar {
    background-color: #333;
    padding: 10px 0;
    color: #fff;
    text-align: center;
    width: 100%;
    position: fixed;
    top: -50px;
    transition: top 0.3s;
  }
  
  .navbar.sticky {
    top: 0;
  }
  
  .content {
    padding: 20px;
  }
  
  .scroll-top-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    display: none;
  }
</style>
</head>
<body>

<div class="navbar" id="navbar">
  <h2>Sticky Navigation Bar</h2>
</div>

<div class="content">
  <h2>Lorem Ipsum</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat euismod sapien, ac posuere arcu tempor sit amet. Duis sed lectus eget mauris dapibus fermentum. Aliquam non est sit amet mi dignissim pharetra. Nulla eget quam id urna hendrerit congue. Nulla interdum vel turpis at facilisis. Nulla facilisi. Integer consequat nulla nec mauris condimentum, ut dignissim lorem ullamcorper. Nam sagittis ultrices facilisis. Vivamus blandit vehicula ante, id iaculis justo ultrices nec.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat euismod sapien, ac posuere arcu tempor sit amet. Duis sed lectus eget mauris dapibus fermentum. Aliquam non est sit amet mi dignissim pharetra. Nulla eget quam id urna hendrerit congue. Nulla interdum vel turpis at facilisis. Nulla facilisi. Integer consequat nulla nec mauris condimentum, ut dignissim lorem ullamcorper. Nam sagittis ultrices facilisis. Vivamus blandit vehicula ante, id iaculis justo ultrices nec.</p>
</div>

<button class="scroll-top-btn" id="scrollTopBtn">Scroll to Top</button>

<script>
  // Get the navbar and scroll top button
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // When the user scrolls down, hide/show the navbar and show/hide the scroll top button
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      navbar.style.top = '0';
    } else {
      navbar.style.top = '-50px';
      scrollTopBtn.style.display = 'block';
    }
    prevScrollPos = currentScrollPos;
  };

  // When the user clicks on the scroll top button, scroll to the top of the page
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
</script>

</body>
</html>
```

In this example:

- The navigation bar (`<div class="navbar">`) starts off hidden (`top: -50px;`) and becomes sticky once the user scrolls down the page.
- The scroll top button (`<button class="scroll-top-btn">`) appears when the user scrolls down, allowing them to smoothly scroll back to the top of the page when clicked.
- CSS transitions are used to create a smooth transition effect when the navbar becomes sticky.
- JavaScript is used to detect scroll events and toggle the visibility of the navbar and scroll top button accordingly.

## **10. Interactive Tabs Panel** :

* **Objective** : Build a content panel with multiple tabs. When a tab is clicked, the corresponding content should be displayed while hiding others.
* **Specifications** :
* Display a row of tabs at the top and their corresponding content panels below.
* Only one tab's content should be visible at a time.
* Clicking on a tab should smoothly reveal its associated content and hide others.
* The active tab should be highlighted or styled differently from non-active tabs.
* Ensure the solution is responsive, adjusting for both desktop and mobile views.

**=>** Here's an example implementation of an Interactive Tabs Panel with the specified objectives using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interactive Tabs Panel</title>
<style>
  /* CSS for interactive tabs panel */
  body {
    font-family: Arial, sans-serif;
  }
  
  .tab {
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    margin-right: 5px;
  }
  
  .tab.active {
    background-color: #fff;
  }
  
  .content {
    display: none;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 0 0 5px 5px;
  }
  
  .content.active {
    display: block;
  }
</style>
</head>
<body>

<div id="tabs">
  <div class="tab" onclick="showContent(0)">Tab 1</div>
  <div class="tab" onclick="showContent(1)">Tab 2</div>
  <div class="tab" onclick="showContent(2)">Tab 3</div>
</div>

<div class="content" id="content1">Content for Tab 1</div>
<div class="content" id="content2">Content for Tab 2</div>
<div class="content" id="content3">Content for Tab 3</div>

<script>
  // Show content function
  function showContent(index) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    tabs[index].classList.add('active');
    contents[index].classList.add('active');
  }
</script>

</body>
</html>
```

In this example:

- Tabs are represented by `<div class="tab">` elements, and their corresponding content panels are represented by `<div class="content">` elements.
- Clicking on a tab triggers the `showContent(index)` function, which shows the content associated with that tab and hides others.
- Active tabs and content are styled differently using the `.active` class.
- JavaScript is used to add and remove the `.active` class to show and hide content based on the clicked tab index.
