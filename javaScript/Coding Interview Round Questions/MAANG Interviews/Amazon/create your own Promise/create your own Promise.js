class MyPromise {
    constructor(executor) {
      this.state = "pending"; // Initial state: "pending", can change to "fulfilled" or "rejected"
      this.value = undefined; // The resolved value
      this.reason = undefined; // The rejection reason
      this.onFulfilledCallbacks = []; // Callbacks for `then` when promise is fulfilled
      this.onRejectedCallbacks = []; // Callbacks for `then` when promise is rejected
  
      const resolve = (value) => {
        if (this.state === "pending") {
          this.state = "fulfilled";
          this.value = value;
          this.onFulfilledCallbacks.forEach((callback) => callback());
        }
      };
  
      const reject = (reason) => {
        if (this.state === "pending") {
          this.state = "rejected";
          this.reason = reason;
          this.onRejectedCallbacks.forEach((callback) => callback());
        }
      };
  
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
  
    then(onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
              throw reason;
            };
  
      return new MyPromise((resolve, reject) => {
        if (this.state === "fulfilled") {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        } else if (this.state === "rejected") {
          setTimeout(() => {
            try {
              const result = onRejected(this.reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        } else {
          // If the promise is still pending
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                const result = onFulfilled(this.value);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            });
          });
  
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                const result = onRejected(this.reason);
                resolve(result);
              } catch (error) {
                reject(error);
              }
            });
          });
        }
      });
    }
  
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  
    static resolve(value) {
      return new MyPromise((resolve) => resolve(value));
    }
  
    static reject(reason) {
      return new MyPromise((_, reject) => reject(reason));
    }
  }
  
  // Example usage
  const asyncTask = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("Task completed!"), 1000);
  });
  
  asyncTask
    .then((result) => {
      console.log(result); // Task completed!
      return "Next step";
    })
    .then((result) => {
      console.log(result); // Next step
      throw new Error("Something went wrong!");
    })
    .catch((error) => {
      console.error(error.message); // Something went wrong!
    });
  