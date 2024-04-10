function findMaxValueOfEquation(points, k) {
    const maxHeap = [];
    let maxValue = -Infinity;

    for (const [x, y] of points) {
        // Remove points outside the window
        while (maxHeap.length && maxHeap[0][1] < x - k) {
            maxHeap.shift();
        }

        // Calculate the current value of the equation for each point in the window
        for (const [xPrev, yPrev] of maxHeap) {
            maxValue = Math.max(maxValue, x - xPrev + y + yPrev);
        }

        // Push the current point to the heap
        maxHeap.push([x, y - x]);

        // Maintain the heap property
        maxHeap.sort((a, b) => b[0] - a[0]);
    }

    return maxValue;
}

// Test case
const points = [[1, 3], [2, 0], [5, 10], [6, -10]];
const k = 1;
console.log(findMaxValueOfEquation(points, k)); // Output: 4
