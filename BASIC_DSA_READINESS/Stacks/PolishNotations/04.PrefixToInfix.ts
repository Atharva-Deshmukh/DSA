/* Prefix to Infix conversion

Input: *-A/BC-/AKL
Output:  ((A-(B/C))*((A/K)-L))
Explanation:  The above output is its valid infix form.

Approach:
- Iterate from the back this time

s = *+PQ-MN

i = 6: N
    Operand -> push into stack
    st = [ N

i = 5: M
    Operand -> push into stack
    st = [ N M

i = 4: -
    Operator -> take first top, then second top, directly wrap around brackets and push the result into
                the stack
    st = [ (M-N)

i = 3: Q
    Operand -> push into stack
    st = [ (M-N) Q

i = 2: P
    Operand -> push into stack
    st = [ (M-N) Q P

i = 1: +
    Operator -> take first top, then second top, directly wrap around brackets and push the result into
                the stack
    st = [ (M-N) (P + Q)

i = 0: *
    Operator -> take first top, then second top, directly wrap around brackets and push the result into
                the stack
    st = [ ((M-N) * (P + Q))

return st.top() */

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

function preToInfix(s) {
    const n = s.length;

    let st = new myStack();
    
    for(let i = (n - 1); i >= 0; i--) {
        if(isOperand(s[i])) st.push(s[i]);
        else {
            const e1 = st.top(); st.pop();
            const e2 = st.top(); st.pop();

            /* concatenata in reverse order as stack has elements in reversed order */
            st.push('(' + e1 + s[i] + e2 + ')');
        }
    }

    return st.top();
}