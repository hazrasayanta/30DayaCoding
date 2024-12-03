**My Interview Experience for an SDE-2 Frontend Position at Zepto and Advanced JavaScript Coding Challenges**

[](https://medium.com/@javaScriptwithvinay?source=post_page---byline--cd6792e74516--------------------------------)

[](https://medium.com/@javaScriptwithvinay?source=post_page---byline--cd6792e74516--------------------------------)

[](https://blog.stackademic.com/?source=post_page---byline--cd6792e74516--------------------------------)

[](https://blog.stackademic.com/?source=post_page---byline--cd6792e74516--------------------------------)

[**JavaScript With Vinay**](https://medium.com/@javaScriptwithvinay?source=post_page---byline--cd6792e74516--------------------------------)

·

**Follow**

Published in

[Stackademic](https://blog.stackademic.com/?source=post_page---byline--cd6792e74516--------------------------------)

·

5 min read

·

Oct 4, 2024

124

2

[](https://medium.com/plans?dimension=post_audio_button&postId=cd6792e74516&source=upgrade_membership---post_audio_button----------------------------------)

**Recently, I had the opportunity to interview for an SDE-2 Frontend position at Zepto. The interview process was a thrilling challenge, focusing on core JavaScript concepts, problem-solving, UI design, and discussions around scalability and maintainability in frontend development. In this article, I will break down my interview experience and provide coding problems related to the topics I encountered during the interview. These advanced coding problems are designed to enhance your understanding of key JavaScript concepts and frontend development techniques.**

**1. JavaScript Round**

**The first round was heavily focused on JavaScript fundamentals. Here are the key concepts I was tested on:**

**Event Loop**

**The interviewer asked me to explain how the event loop manages asynchronous tasks and the execution order of different tasks such as Promises and setTimeout. This concept is crucial for understanding how JavaScript handles concurrency.**

**Promises and Async/Await**

**We discussed how to handle asynchronous operations using Promises and async/await, and their differences. I had to explain how async/await makes asynchronous code look synchronous, enhancing readability and maintainability.**

**Hoisting**

**I was quizzed on how variables and functions are hoisted in JavaScript, including the peculiar behavior of var, let, and const. This impacts how variables are initialized and their execution context.**

**Closures**

**The interviewer presented use cases for closures and asked me to explain how they work under the hood, particularly with regards to function scopes and retaining access to variables even after a function has returned.**

**Prototypes and Inheritance**

**A deep dive into JavaScript’s prototype chain and the Object.create() method allowed me to demonstrate my knowledge of object-oriented programming in JavaScript.**

**The “this” Keyword**

**Understanding how this works in different contexts, especially when used inside event handlers or in different object methods, is key for writing clean and bug-free JavaScript.**

**Flattening Objects**

**Finally, I had to showcase techniques for flattening deeply nested objects, a common requirement when dealing with complex data structures in modern web applications.**

**2. Machine Coding Round**

**The second round transitioned into a practical coding challenge, where I was asked to design a form-based UI using React.js in CodeSandbox. The problem statement included three tabs: Profile, Interest, and Settings, with specific field requirements like:**

* **	**	**Age Field** : Only numeric values allowed.
* **	**	**Email Field** : Validation to ensure the correct format.

**I had to incorporate dropdowns, radio buttons, checkboxes, and implement:**

* **	**	Validation for mandatory fields.
* **	**	Data persistence across tabs.
* **	**	A **Submit** button that submitted the entire form only on the last tab.

**This coding challenge not only tested my React knowledge but also led to a discussion on scalability and maintainability. The interviewer suggested creating a form configuration object to dynamically generate the form, sparking a discussion about:**

* **	**	**Scalability** : How easily the form could be extended or modified without rewriting significant portions of the code.
* **	**	**Maintainability** : How modular, readable, and organized code is crucial for large teams and long-term projects.

**3. Hiring Manager Round**

**The final round with the Hiring Manager was more focused on my past projects and real-world experiences. We covered topics such as:**

* **	**	**Project Walkthrough** : I explained the tech stack and my specific contributions to my live projects.
* **	**	**Challenges & Solutions** : I shared insights into performance challenges in frontend applications and the strategies I used to overcome them.
* **	**	**Design Patterns** : We explored different design patterns like  **Singleton** ,  **Factory** , and **Observer** that I had applied in my projects to solve complex problems.
* **	**	**Code Organization** : We discussed best practices for organizing code, particularly in large-scale applications where collaboration is essential.
* **	**	**Performance Optimization** : I detailed techniques like lazy loading, code splitting, and caching strategies for optimizing frontend performance.
* **	**	**Collaboration** : We talked about my experience working closely with backend developers and designers to deliver cohesive products.

**Key Takeaways**

**Reflecting on this interview process, I realized that technical expertise is only one aspect of success in senior frontend roles. Here are my top takeaways:**

* **	**	**Master the Fundamentals** : Strong JavaScript knowledge is critical for progressing to more senior positions.
* **	**	**Think About Scalability** : Always design solutions that can grow and evolve, keeping code modular and maintainable.
* **	**	**Be Ready to Discuss Real-World Experience** : Being able to explain your past projects, the decisions you made, and the challenges you overcame is vital.
* **	**	**Collaboration is Critical** : Modern development requires teamwork, so your ability to collaborate with backend engineers and designers is essential.

**Advanced Coding Problems Based on My Interview Experience**

**Now that I’ve shared my interview experience, let’s dive into some advanced coding problems that mirror the challenges I faced.**

**1. Event Loop & Promises**

**Write a function that prints “Hello” after 1 second and “World” after 2 seconds, without using setTimeout directly.**

function delay(ms) {

**  **return new Promise((resolve) => setTimeout(resolve, ms));

}

async function printHelloWorld() {

**  **await delay(1000);

**  **console.log('Hello');

**  **await delay(1000);

**  **console.log('World');

}

printHelloWorld();

**2. Deep Object Flattening**

**Write a function flattenObject(obj) that takes a deeply nested object and flattens it into a single-level object.**

function flattenObject(obj, parentKey = '', result = {}) {

**  **for (let key in obj) {

**    **const newKey = parentKey ? `${parentKey}.${key}` : key;

**    **if (typeof obj[key] === 'object' && obj[key] !== null) {

**      **flattenObject(obj[key], newKey, result);

**    **} else {

**      **result[newKey] = obj[key];

**    **}

**  **}

**  **return result;

}

const obj = { a: { b: { c: 1 } }, d: 2 };

console.log(flattenObject(obj)); // { 'a.b.c': 1, 'd': 2 }

**3. Form Validation in React**

**Create a simple React form component that validates email and age, and ensures the form can’t be submitted with invalid inputs.**

import React, { useState } from 'react';

const Form = () => {

**  **const [email, setEmail] = useState('');

**  **const [age, setAge] = useState('');

**  **const [errors, setErrors] = useState({ email: '', age: '' });

const validateEmail = (email) => {

**    **return /^\S+@\S+\.\S+$/.test(email);

**  **};

**  **const handleSubmit = (e) => {

**    **e.preventDefault();

**    **let valid = true;

**    **let tempErrors = { email: '', age: '' };

**    **if (!validateEmail(email)) {

**      **tempErrors.email = 'Invalid email format';

**      **valid = false;

**    **}

**    **if (!/^\d+$/.test(age)) {

**      **tempErrors.age = 'Age must be a number';

**      **valid = false;

**    **}

**    **setErrors(tempErrors);

**    **if (valid) {

**      **alert('Form submitted successfully');

**    **}

**  **};

**  **return (

**    **`<form onSubmit={handleSubmit}>`

**      **`<div>`

**        **`<label>`Email:`</label>`

**        **<input

**          **type="text"

**          **value={email}

**          **onChange={(e) => setEmail(e.target.value)}

**        **/>

**        **{errors.email && `<p>`{errors.email}`</p>`}

**      **`</div>`

**      **`<div>`

**        **`<label>`Age:`</label>`

**        **<input

**          **type="text"

**          **value={age}

**          **onChange={(e) => setAge(e.target.value)}

**        **/>

**        **{errors.age && `<p>`{errors.age}`</p>`}

**      **`</div>`

**      **`<button type="submit">`Submit`</button>`

**    **`</form>`

**  **);

};

export default Form;

**4. Throttle Function Implementation**

**Write a throttle function that ensures a given function is called at most once every n milliseconds.**

function throttle(func, limit) {

**  **let lastFunc;

**  **let lastRan;

**  **return function(...args) {

**    **if (!lastRan) {

**      **func.apply(this, args);

**      **lastRan = Date.now();

**    **} else {

**      **clearTimeout(lastFunc);

**      **lastFunc = setTimeout(() => {

**        **if (Date.now() - lastRan >= limit) {

**          **func.apply(this, args);

**          **lastRan = Date.now();

**        **}

**      **}, limit - (Date.now() - lastRan));

**    **}

**  **};

}

**5. Lazy Loading in React**

**Implement a simple React component that lazy-loads another component using React.lazy() and Suspense.**

import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {

**  **return (

**    **`<div>`

**      **`<h1>`Lazy Loading Example`</h1>`

**      **<Suspense fallback={`<div>`Loading...`</div>`}>

**        **`<LazyComponent />`

**      **`</Suspense>`

**    **`</div>`

**  **);

}

export default App;

**These advanced coding problems are aligned with the kinds of technical challenges you may encounter during senior-level interviews. Mastering them will not only help you in interviews but also improve your practical skills in real-world frontend development.**
