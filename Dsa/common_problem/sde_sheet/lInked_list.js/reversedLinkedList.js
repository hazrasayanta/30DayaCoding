class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    while (current) {
        // Save the next node
        let next = current.next;
        // Reverse the link
        current.next = prev;
        // Move prev and current one step forward
        prev = current;
        current = next;
    }
    // After the loop, prev will be the new head of the reversed list
    return prev;
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert a linked list to an array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// Test case
const head = createLinkedList([1, 2, 3, 4, 5]);
const reversedHead = reverseLinkedList(head);
const reversedArray = linkedListToArray(reversedHead);
console.log(reversedArray); // Output: [5, 4, 3, 2, 1]
