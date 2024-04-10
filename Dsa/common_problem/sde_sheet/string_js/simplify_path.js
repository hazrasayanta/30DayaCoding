function simplifyPath(path) {
    // Split the path by slashes
    const components = path.split('/');
    const stack = []; // Initialize stack
    
    // Process each component of the path
    for (const component of components) {
        if (component === '..') {
            // If component is ".." and stack is not empty, go up one level
            if (stack.length > 0) {
                stack.pop();
            }
        } else if (component && component !== '.') {
            // If component is not empty, not equal to ".", and not equal to "..", push onto stack
            stack.push(component);
        }
    }
    
    // Join directories in stack with slashes and add leading slash
    return '/' + stack.join('/');
}

// Test the function
console.log(simplifyPath("/home/")); // Output: "/home"
