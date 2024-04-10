// Define the polyfill for myReduce
if (!Array.prototype.myReduce) {
    Array.prototype.myReduce = function(callback, initialValue) {
        if (this == null) {
            throw new TypeError('Array.prototype.myReduce called on null or undefined');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        const obj = Object(this);
        const len = obj.length >>> 0;
        let accumulator = initialValue;

        for (let i = 0; i < len; i++) {
            if (i in obj) {
                if (accumulator === undefined) {
                    accumulator = obj[i];
                } else {
                    accumulator = callback.call(undefined, accumulator, obj[i], i, obj);
                }
            }
        }

        if (accumulator === undefined) {
            throw new TypeError('Reduce of empty array with no initial value');
        }

        return accumulator;
    };
}

// Example usage of myReduce polyfill
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.myReduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15 (1 + 2 + 3 + 4 + 5)