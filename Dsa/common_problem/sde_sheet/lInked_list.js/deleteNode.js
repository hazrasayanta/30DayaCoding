function deleteNode(node) {
    // Copy the value of the next node to the current node
    node.val = node.next.val;
    // Skip the next node by changing the next pointer
    node.next = node.next.next;
}

// Test case
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// Create the linked list: 4 -> 5 -> 1 -> 9
const head = new ListNode(4);
head.next = new ListNode(5);
head.next.next = new ListNode(1);
head.next.next.next = new ListNode(9);

// Delete node with value 5
const nodeToDelete = head.next; // Node with value 5
deleteNode(nodeToDelete);

// Output the modified linked list
let result = [];
let current = head;
while (current) {
    result.push(current.val);
    current = current.next;
}
console.log(result); // Output: [4, 1, 9]
