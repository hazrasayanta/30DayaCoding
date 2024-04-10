class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function removeElements(head, val) {
    // Create a dummy node to handle cases where the first node needs to be removed
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let current = head;
    
    while (current) {
        if (current.val === val) {
            prev.next = current.next; // Skip the current node
        } else {
            prev = current; // Move the prev pointer forward
        }
        current = current.next; // Move the current pointer forward
    }
    
    return dummy.next; // Return the updated head
}

// Test case
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(6);
head.next.next.next = new ListNode(3);
head.next.next.next.next = new ListNode(4);
head.next.next.next.next.next = new ListNode(5);
head.next.next.next.next.next.next = new ListNode(6);

const val = 6;
const newHead = removeElements(head, val);

// Print the linked list after removal
let current = newHead;
const result = [];
while (current) {
    result.push(current.val);
    current = current.next;
}
console.log(result); // Output: [1, 2, 3, 4, 5]
