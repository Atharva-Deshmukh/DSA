/* Prefix to Postfix Conversion

You are given a string that represents the prefix form of a valid mathematical expression. 
Convert it to its postfix form.

Input: *-A/BC-/AKL
Output: ABC/-AK/L-*
Explanation: The above output is its valid postfix form.

Approach:

s = /-AB*+DEF

Since it is prefix to postfix, start from the back

i=8: F
    Operand -> push into stack
    st = [ F

i=7: E
    Operand -> push into stack
    st = [ F E

i=6: D
    Operand -> push into stack
    st = [ F E D

i=5: +
    Operator
    push (top1 + top2 + operator)
    st = [ F DE+

i=4: *
    Operator
    push (top1 + top2 + operator)
    st = [ DE+F*

i=3: B
    Operand -> push into stack
    st = [ DE+F* B

i=2: A
    Operand -> push into stack
    st = [ DE+F* B A

i=1: -
    Operator
    push (top1 + top2 + operator)
    st = [ DE+F* AB-

i=0: /
    Operator
    push (top1 + top2 + operator)
    st = [ AB-DE+F*/

/* return st.top() after iteration gets over
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
    if(
        (char >= 'a') && (char <= 'z') ||
        (char >= 'A') && (char <= 'Z') ||
        (char >= '0') && (char <= '9')
    ) return true;
    else return false;
}

function preToPost(s) {
    const n = s.length;

    let st = new myStack();
    
    for(let i = (n - 1); i >= 0; i--) {
        if(isOperand(s[i])) st.push(s[i]);
        else {
            const top1 = st.top(); st.pop();
            const top2 = st.top(); st.pop();
            st.push(top1 + top2 + s[i]);
        }
    }
    
    return st.top();
}