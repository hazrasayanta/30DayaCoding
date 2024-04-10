function setZeroes(matrix) {
    const m = matrix.length; // Number of rows
    const n = matrix[0].length; // Number of columns

    // Arrays to keep track of rows and columns that need to be set to zero
    const rowsToZero = new Array(m).fill(false);
    const colsToZero = new Array(n).fill(false);

    // Iterate through the matrix to mark rows and columns with zeroes
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rowsToZero[i] = true;
                colsToZero[j] = true;
            }
        }
    }

    // Set rows to zero
    for (let i = 0; i < m; i++) {
        if (rowsToZero[i]) {
            matrix[i].fill(0);
        }
    }

    // Set columns to zero
    for (let j = 0; j < n; j++) {
        if (colsToZero[j]) {
            for (let i = 0; i < m; i++) {
                matrix[i][j] = 0;
            }
        }
    }
}

// Test case
const matrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
];
setZeroes(matrix);
console.log(matrix);
