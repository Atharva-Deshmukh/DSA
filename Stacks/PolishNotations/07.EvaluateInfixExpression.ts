/* 
Input: arr[] = ["100", "+", "200", "/", "2", "*", "5", "+", "7"] 
Output: 607

Explanation: The expression can be directly read as: (100 + 200 / 2 * 5 + 7). 

Now, evaluate step by step:
200 / 2 = 100
100 * 5 = 500
500 + 100 = 600
600 + 7 = 607
Final Answer: 607

Input: arr[] = ["2", "^", "3", "^", "2"]
Output: 512
Explanation: ^ is right-associative → 2 ^ (3 ^ 2) = 2 ^ 9 = 512.
Final Answer: 512

Approach: Memorise this approach
- To evaluate an infix expression, we must respect operator precedence and associativity.
    
- How Expression is Evaluated?
    Traverse the expression from left to right.
    If it’s an operand, push it onto the operand stack.
    If it’s an operator, compare its precedence (and associativity) with the operator on top of the stack:
    => If the new operator has higher precedence, or same precedence but is right-associative, push it.
    => Otherwise, apply the operator from the stack on the top two operands until the condition is satisfied, 
       then push the new operator.
    After scanning the whole expression, apply the remaining operators on the stack to the operands 
    stack to get the result.

*/

class operatorStack {
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

class operandStack {
    public currentSize: number;
    private stack: number[];

    constructor() {
        this.currentSize = 0;
        this.stack = [];
    }

    push(element: number) {
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

function getPriority(operator) {
    if(operator === '^') return 3;
    else if((operator === '/') || (operator === '*')) return 2;
    else if((operator === '+') || (operator === '-')) return 1;
    else return -1;
}

function isOperand(char) {
    if(
        (char >= 'a') && (char <= 'z') ||
        (char >= 'A') && (char <= 'Z') ||
        (char >= '0') && (char <= '9')
    ) return true;
    else return false;
}

function isRightAssociative(op) {
    return op === '^';
}

function applyOperation(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '^') return Math.pow(a, b);
    if (op === '/') return Math.floor(a / b);
    return 0;
}

function evaluateInfix(s) {
    const n = s.length;

    let opndStack = new operandStack();
    let oprtStack = new operatorStack();

    for (let i = 0; i < n; i++) {

        /* If operand, add to operand stack */
        if (isOperand(s[i])) opndStack.push(parseInt(s[i]));
        else {
            while (
                !oprtStack.isEmpty() &&
                (
                    getPriority(s[i]) < getPriority(oprtStack.top()) ||
                    (
                        getPriority(s[i]) === getPriority(oprtStack.top()) &&
                        !isRightAssociative(s[i])
                    )
                )
            ) {
                let val2 = opndStack.top();
                opndStack.pop();

                let val1 = opndStack.top();
                opndStack.pop();

                let op = oprtStack.top();
                oprtStack.pop();

                opndStack.push(applyOperation(val1, val2, op));
            }
            oprtStack.push(s[i]);
        }
    }

    // Process remaining operators
    while (!oprtStack.isEmpty()) {
        let val2 = opndStack.top();
        opndStack.pop();

        let val1 = opndStack.top();
        opndStack.pop();

        let op = oprtStack.top();
        oprtStack.pop()

        opndStack.push(applyOperation(val1, val2, op));
    }

    return opndStack.top();

}
