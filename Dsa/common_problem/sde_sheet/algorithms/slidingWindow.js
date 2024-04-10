function slidingWindow(arr, k) {
    let maxSum = 0;
    let windowSum = 0;

    // Calculate the sum of the first window of size k
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    // Update maxSum with the sum of the first window
    maxSum = windowSum;

    // Slide the window and update maxSum
    for (let i = k; i < arr.length; i++) {
        // Add the next element to the window sum and subtract the first element of the previous window
        windowSum += arr[i] - arr[i - k];
        // Update maxSum if necessary
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

// Example usage
const arr = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0];
const k = 3; // Window size
console.log("Maximum sum of a subarray of size", k, ":", slidingWindow(arr, k));
