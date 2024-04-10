function generate(numRows) {
    if (numRows === 0) return [];

    const triangle = [[1]]; // Initialize with the first row

    for (let i = 1; i < numRows; i++) {
        const prevRow = triangle[i - 1];
        const newRow = [1]; // First element of each row is always 1

        // Compute the values for the current row
        for (let j = 1; j < prevRow.length; j++) {
            newRow.push(prevRow[j - 1] + prevRow[j]);
        }

        newRow.push(1); // Last element of each row is always 1
        triangle.push(newRow); // Add the new row to the triangle
    }

    return triangle;
}

// Test case
const numRows = 5;
console.log(generate(numRows));
