# Tree Cheat Sheet in JavaScript:

#### Node Structure:

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

#### Basic Tree Operations:

- **Insertion:**

  - Recursively or iteratively traverse the tree to find the appropriate position to insert the new node.
- **Deletion:**

  - Find the node to delete and handle cases based on the number of children it has.
  - For nodes with one child, replace the node with its child.
  - For nodes with two children, find the minimum (or maximum) value in the right (or left) subtree, replace the node's value with it, and delete that node.
- **Traversal:**

  - **Inorder:** Left -> Root -> Right
  - **Preorder:** Root -> Left -> Right
  - **Postorder:** Left -> Right -> Root
  - **Level Order (BFS):** Traverse level by level, starting from the root.

#### Tree Traversal Algorithms:

- **Depth-First Search (DFS):**

  - Inorder, Preorder, Postorder
- **Breadth-First Search (BFS):**

  - Level Order Traversal

#### Common Tree Problems:

1. **Binary Tree Diameter:** Find the length of the longest path between any two nodes in a tree.
2. **Binary Tree Maximum Path Sum:** Find the maximum path sum between any two nodes in a tree.
3. **Lowest Common Ancestor (LCA):** Find the lowest common ancestor of two nodes in a binary tree.
4. **Validate Binary Search Tree (BST):** Check if a binary tree is a valid BST.
5. **Serialize and Deserialize Binary Tree:** Convert a binary tree to a string and vice versa.
6. **Binary Tree Zigzag Level Order Traversal:** Traverse a binary tree in a zigzag pattern.
7. **Invert Binary Tree:** Invert a binary tree (swap left and right subtrees).
8. **Binary Tree Level Averages:** Calculate the average value of each level in a binary tree.
9. **Count Complete Tree Nodes:** Count the number of nodes in a complete binary tree.
10. **Balanced Binary Tree:** Check if a binary tree is height-balanced.

# Tree Data Stracture In js

In JavaScript, you can implement a tree data structure using objects and/or classes. Here's a basic example of how you can create a tree structure:

```javascript
// Define a Node class for the tree
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}

// Create a tree with some nodes
const rootNode = new TreeNode(1);
const childNode1 = new TreeNode(2);
const childNode2 = new TreeNode(3);
const childNode3 = new TreeNode(4);

// Connect nodes together
rootNode.addChild(childNode1);
rootNode.addChild(childNode2);
childNode1.addChild(childNode3);

// Visualize the tree
console.log(rootNode);
```

In this example, each `TreeNode` object has a `value` property to store the node's value and a `children` property, which is an array to hold its child nodes. The `addChild` method allows adding child nodes to a parent node.

You can continue building on this structure by adding methods for traversing the tree (e.g., depth-first search or breadth-first search), searching for specific values, removing nodes, or any other operations you might need.

### List of DSA problems related to trees:

1. Maximum Depth of Binary Tree
2. Symmetric Tree
3. Path Sum
4. Subtree of Another Tree
5. Construct Binary Tree from Preorder and Inorder Traversal
6. Find Duplicate Subtrees
7. Populating Next Right Pointers in Each Node
8. Binary Tree Right Side View
9. Serialize and Deserialize N-ary Tree
10. Validate Binary Search Tree

These are just a few examples, but there are many more tree-related problems out there. Practicing these problems and understanding various tree algorithms and concepts will greatly help in interviews.
