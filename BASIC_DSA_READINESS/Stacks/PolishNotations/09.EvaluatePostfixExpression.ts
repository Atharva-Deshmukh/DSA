/* Its also called reversed polish notation

Input: arr[] = ["2", "3", "1", "*", "+", "9", "-"]
Output: -4
Explanation: If the expression is converted into an infix expression, 
             it will be 2 + (3 * 1) – 9 = 5 – 9 = -4.

Input: arr[] = ["2", "3", "^", "1", "+"]
Output: 9
Explanation: If the expression is converted into an infix expression, it will be 2 ^ 3 + 1 = 8 + 1 = 9.

Approach:
- Iterate from left to right
- If its an operand -> push into the stack
- If its an operator -> evaluate(top1, top2, operator) and push this into the stack
- return st.top() after the iteration is complete

*/

class myStack {
    public currentSize: number;
    private stack: string[];

    constructor() {
        this.currentSize = 0;
        this.stack = [];
    }

    push(element: string) {
        this.stack[this.currentSize] = element;
        this.currentSize++;
    }

    /* Just free the memory of the last element stored in the array */
    pop() {
        if (!this.isEmpty()) {
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if (this.currentSize > 0) return this.stack[this.currentSize - 1];
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function applyOperation(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '^') return Math.pow(a, b);
    if (op === '/') return Math.floor(a / b);
    return 0;
}

function preToPost(s) {
    const n = s.length;

    let st = new myStack();
    
    for(let i = 0; i < n; i++) {
        if (!isNaN(s[i])) st.push(parseInt(s[i]));
        else {
            /* Operands will be in reversed order in stack */
            const operand2 = st.top(); st.pop();
            const operand1 = st.top(); st.pop();

            st.push(applyOperation(operand1, operand2, s[i]));
        }
    }
    
    return st.top();
}