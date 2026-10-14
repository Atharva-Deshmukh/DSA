/* Postfix to Prefix Conversion

You are given a string that represents the postfix form of a valid mathematical expression. 
Convert it to its prefix form.

Input: ABC/-AK/L-*
Output: *-A/BC-/AKL
Explanation: The above output is its valid prefix form.

Input: ab+
Output: +ab
Explanation: The above output is its valid prefix form.

Approach:

s = AB-DE+F*/

/* 

i=0: A
    operand -> push into stack
    st = [ A

i=1: B
    operand -> push into stack
    st = [ A B

i=2: -
    operator, 
    push(operator + top2 + top1)
    st = [ -AB

i=3: D
    operand -> push into stack
    st = [ -AB D

i=4: E
    operand -> push into stack
    st = [ -AB D E

i=5: +
    operator, 
    push(operator + top2 + top1)
    st = [ -AB +DE

i=6: F
    operand -> push into stack
    st = [ -AB +DE F

i=7: *
    operator, 
    push(operator + top2 + top1)
    st = [ -AB *+DEF

i=8: /
    operator, 
    push(operator + top2 + top1)
    st = [ /-AB*+DEF

Iteration over -> return st.top()

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

function isOperand(char) {
    if (
        (char >= 'a') && (char <= 'z') ||
        (char >= 'A') && (char <= 'Z') ||
        (char >= '0') && (char <= '9')
    ) return true;
    else return false;
}

function postToPre(s) {
    const n = s.length;

    let st = new myStack();

    for(let i = 0; i < n; i++) {
        if(isOperand(s[i])) st.push(s[i]);
        else {
            let top1;
            let top2;
            if(!st.isEmpty()) {
                top1 = st.top();
                st.pop();
            }
            if(!st.isEmpty()) {
                top2 = st.top();
                st.pop();
            }

            st.push(s[i] + top2 + top1);
        }
    }

    return st.top();
}