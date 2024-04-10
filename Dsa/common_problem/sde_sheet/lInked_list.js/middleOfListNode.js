class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function findMiddleNode(head) {
    let slow = head;
    let fast = head;

    // Move slow pointer one step and fast pointer two steps
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
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

// Test case
const head = createLinkedList([1, 2, 3, 4, 5]);
const middleNode = findMiddleNode(head);
let result = [];
let current = middleNode;
while (current) {
    result.push(current.val);
    current = current.next;
}
console.log(result); // Output: [3, 4, 5]
