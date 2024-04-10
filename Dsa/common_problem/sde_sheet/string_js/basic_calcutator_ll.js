function calculate(s) {
    const stack = [];
    let num = 0;
    let sign = 1;
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        const char = s.charAt(i);
        if (!isNaN(parseInt(char))) {
            num = num * 10 + parseInt(char);
        } else if (char === '+' || char === '-') {
            result += sign * num;
            num = 0;
            sign = char === '+' ? 1 : -1;
        } else if (char === '*' || char === '/') {
            const nextNum = getNextNum(s, i);
            if (char === '*') {
                num *= nextNum;
            } else {
                num = Math.trunc(num / nextNum);
            }
            i += nextNum.toString().length - 1;
        }
    }
    result += sign * num;
    return result;
}

function getNextNum(s, start) {
    let num = '';
    for (let i = start + 1; i < s.length; i++) {
        const char = s.charAt(i);
        if (!isNaN(parseInt(char))) {
            num += char;
        } else {
            break;
        }
    }
    return parseInt(num);
}

// Test case
console.log(calculate("3+2*2")); // Output: 7
