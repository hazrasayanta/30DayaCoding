// Definition of a node in the linked list
class ListNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  // Function to detect cycle in a linked list using Floyd's Tortoise and Hare algorithm
  function detectCycle(head) {
    let tortoise = head;
    let hare = head;
  
    while (hare !== null && hare.next !== null) {
      tortoise = tortoise.next;
      hare = hare.next.next;
  
      // If tortoise and hare meet, there is a cycle
      if (tortoise === hare) {
        return true;
      }
    }
  
    // If hare reaches the end of the list, there is no cycle
    return false;
  }
  
  // Example usage
  // Create a linked list with a cycle
  let node1 = new ListNode(1);
  let node2 = new ListNode(2);
  let node3 = new ListNode(3);
  let node4 = new ListNode(4);
  
  node1.next = node2;
  node2.next = node3;
  node3.next = node4;
  node4.next = node2; // Cycle: 4 -> 2
  
  console.log(detectCycle(node1)); // Output: true
  