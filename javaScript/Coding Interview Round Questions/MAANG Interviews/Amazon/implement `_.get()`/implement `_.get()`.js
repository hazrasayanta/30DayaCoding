
//  * @param {object} source
//  * @param {string | string[]} path
//  * @param {any} [defaultValue]
//  * @return {any}

function get(source, path, defaultValue = undefined) {
    if (typeof path === "string") {
      // Convert string path to array, supporting dot and bracket notations
      path = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    }
  
    let result = source;
  
    for (const key of path) {
      if (result === undefined || result === null) {
        return defaultValue;
      }
      result = result[key];
    }
  
    return result === undefined ? defaultValue : result;
  }
  
  // Example usage
  const obj = {
    a: {
      b: {
        c: [1, 2, 3],
      },
    },
  };
  
  console.log(get(obj, "a.b.c")); // [1, 2, 3]
  console.log(get(obj, "a.b.c.0")); // 1
  console.log(get(obj, "a.b.c[1]")); // 2
  console.log(get(obj, ["a", "b", "c", "2"])); // 3
  console.log(get(obj, "a.b.c[3]")); // undefined
  console.log(get(obj, "a.c", "bfe")); // 'bfe'
  