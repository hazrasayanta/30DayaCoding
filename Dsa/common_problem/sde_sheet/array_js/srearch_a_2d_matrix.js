function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    let left = 0;
    let right = rows * cols - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / cols);
        const col = mid % cols;

        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

// Test case
const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60]
];
const target = 3;
console.log(searchMatrix(matrix, target)); // Output: true
