function findPeakElement(mat) {
  const m = mat.length;
  const n = mat[0].length;

  let left = 0;
  let right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let maxRow = 0;
    let maxVal = -Infinity;

    // Find maximum value in column mid
    for (let i = 0; i < m; i++) {
      if (mat[i][mid] > maxVal) {
        maxVal = mat[i][mid];
        maxRow = i;
      }
    }

    // Check if maxVal is a peak element
    if (
      (mid === 0 || mat[maxRow][mid] > mat[maxRow][mid - 1]) &&
      (mid === n - 1 || mat[maxRow][mid] > mat[maxRow][mid + 1]) &&
      (maxRow === 0 || mat[maxRow][mid] > mat[maxRow - 1][mid]) &&
      (maxRow === m - 1 || mat[maxRow][mid] > mat[maxRow + 1][mid])
    ) {
      return [maxRow, mid];
    } else if (mid > 0 && mat[maxRow][mid - 1] > mat[maxRow][mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return [-1, -1]; // No peak element found
}

// Test case
const mat = [
  [1, 4],
  [3, 2],
];
console.log(findPeakElement(mat)); // Output: [0, 1]
