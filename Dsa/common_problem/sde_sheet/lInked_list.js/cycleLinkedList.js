class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function hasCycle(head) {
    if (!head || !head.next) {
        return false; // If the list is empty or has only one node, there can't be a cycle
    }

    let slow = head;
    let fast = head.next;

    while (slow !== fast) {
        if (!fast || !fast.next) {
            return false; // If fast reaches the end of the list (null), there is no cycle
        }
        slow = slow.next; // Move slow one step forward
        fast = fast.next.next; // Move fast two steps forward
    }

    return true; // If slow and fast pointers meet, there is a cycle
}

// Test case
const head = new ListNode(3);
const node1 = new ListNode(2);
const node2 = new ListNode(0);
const node3 = new ListNode(-4);
head.next = node1;
node1.next = node2;
node2.next = node3;
node3.next = node1; // Creating a cycle

console.log(hasCycle(head)); // Output: true
