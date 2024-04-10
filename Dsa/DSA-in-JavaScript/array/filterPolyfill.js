// Define the polyfill for myFilter
if (!Array.prototype.myFilter) {
    Array.prototype.myFilter = function(callback, thisArg) {
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        const newArray = [];
        const obj = Object(this);
        const len = obj.length >>> 0;

        for (let i = 0; i < len; i++) {
            if (i in obj) {
                if (callback.call(thisArg, obj[i], i, obj)) {
                    newArray.push(obj[i]);
                }
            }
        }

        return newArray;
    };
}

// Example usage of myFilter polyfill
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.myFilter(function(number) {
  return number % 2 === 0;
});

console.log(evenNumbers); // Output: [2, 4, 6]