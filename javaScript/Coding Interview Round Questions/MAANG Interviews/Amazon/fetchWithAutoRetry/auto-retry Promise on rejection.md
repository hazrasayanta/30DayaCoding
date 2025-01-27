Here is the complete code with an example to demonstrate how to use `fetchWithAutoRetry`:

```javascript
/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const attemptFetch = () => {
      fetcher()
        .then(resolve) // If the fetch succeeds, resolve the promise
        .catch((error) => {
          attempts++;
          if (attempts < maximumRetryCount) {
            console.log(`Retrying... (${attempts})`);
            attemptFetch(); // Retry fetch
          } else {
            console.log("Maximum retry attempts reached.");
            reject(error); // Reject after maximum retries
          }
        });
    };

    attemptFetch(); // Start the first fetch attempt
  });
}

// Example usage
const fetcher = () =>
  new Promise((resolve, reject) => {
    // Simulate an API request with a 30% success rate
    const success = Math.random() > 0.7;
    setTimeout(() => (success ? resolve("Data fetched!") : reject("Network error")), 1000);
  });

fetchWithAutoRetry(fetcher, 3)
  .then((data) => console.log(data)) // Output on success
  .catch((error) => console.error(error)); // Output on failure after retries
```

### How It Works:

1. The `fetchWithAutoRetry` function retries the `fetcher` until the maximum retry count is met or the fetch succeeds.
2. If the fetch fails, it logs a retry attempt and retries the `fetcher` function.
3. If all retries are exhausted, it logs that the maximum attempts have been reached and rejects the promise.

### Example Output:

* **Success after retries** :

```plaintext
  Retrying... (1)
  Retrying... (2)
  Data fetched!
```

* **Failure after all retries** :

```plaintext
  Retrying... (1)
  Retrying... (2)
  Retrying... (3)
  Maximum retry attempts reached.
  Network error
```
