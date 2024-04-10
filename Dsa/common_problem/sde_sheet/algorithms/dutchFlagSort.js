function dutchFlagSort(arr) {
    let low = 0;
    let mid = 0;
    let high = arr.length - 1;

    while (mid <= high) {
        switch (arr[mid]) {
            case 0:
                // Swap arr[low] and arr[mid], increment both pointers
                [arr[low], arr[mid]] = [arr[mid], arr[low]];
                low++;
                mid++;
                break;
            case 1:
                // No swapping needed, just move mid pointer forward
                mid++;
                break;
            case 2:
                // Swap arr[mid] and arr[high], decrement high pointer
                [arr[mid], arr[high]] = [arr[high], arr[mid]];
                high--;
                break;
        }
    }
}

// Example usage
let arr = [2, 0, 1, 2, 1, 0];
console.log("Original array:", arr);
dutchFlagSort(arr);
console.log("Sorted array:", arr);
