Here's a **basic example of form validation in React** using controlled components and state management.

---

### Complete Code:

```jsx
import React, { useState } from "react";

const FormWithValidation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">React Form Validation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default FormWithValidation;
```

---

### Key Features:

1. **Validation Logic:**
   * The `validate` function checks:
     * If fields are empty.
     * If the email format is valid using a regular expression.
     * If the password length is at least 6 characters.
2. **Error State:**
   * Errors are stored in the `errors` state as an object. If a field has validation errors, they are displayed below the field.
3. **Controlled Components:**
   * The form uses controlled components (`value` and `onChange` props), ensuring React has full control of the input elements.
4. **Submit Handling:**
   * On submission, the `handleSubmit` function validates the form. If no errors exist, the form is considered successfully submitted.
5. **Dynamic Feedback:**
   * Error messages are shown in real time based on the validation results.
   * A success message appears after the form is submitted without errors.

---

### Example Output:

* **Valid Input:**

  Name: John Doe

  Email: [john@example.com](mailto:john@example.com)

  Password: password123

  → "Form submitted successfully!" message appears.
* **Invalid Input:**

  Leaving fields empty or entering an invalid email/password will display the appropriate error messages under each field.

---

### Improvements:

* Add **debounced validation** for real-time error checking while typing.
* Use a library like **Formik** or **React Hook Form** for larger projects to simplify form handling and validation.

Would you like to see a form using one of those libraries? 😊
