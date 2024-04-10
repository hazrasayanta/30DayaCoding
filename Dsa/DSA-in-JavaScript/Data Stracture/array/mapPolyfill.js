// Define the polyfill for myMap
if (!Array.prototype.myMap) {
    Array.prototype.myMap = function(callback, thisArg) {
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
                newArray[i] = callback.call(thisArg, obj[i], i, obj);
            }
        }

        return newArray;
    };
}

// Example usage of myMap polyfill
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.myMap(function(number) {
  return number * number;
});

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]