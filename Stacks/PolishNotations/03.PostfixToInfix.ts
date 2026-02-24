/* Postfix to infix

Input: ab*c+ 
Output:  ((a*b)+c)
Explanation:  The above output is its valid infix form.

Approach:

s = AB-DE+F*/

/*

This time, push operands in stack

i = 0: A
    operand -> Push it in stack
    st = [ A

i = 1: B
    operand -> Push it in stack
    st = [ A B

i = 2: -
    whenever there is an operator, take out last two elements from the stack 
    and put the operator between them and wrap it around by brackets and put them back in the stack
    st = [ (A - B)

i = 3: D
    operand -> Push it in stack
    st = [ (A - B) D

i = 4: E
    operand -> Push it in stack
    st = [ (A - B) D E

i = 5: +
    whenever there is an operator, take out last two elements from the stack 
    and put the operator between them and wrap it around by brackets and put them back in the stack
    st = [ (A - B) (D + E)

i = 6: F
    operand -> Push it in stack
    st = [ (A - B) (D + E) F

i = 7: *
    whenever there is an operator, take out last two elements from the stack 
    and put the operator between them and wrap it around by brackets and put them back in the stack
    st = [ (A - B) ((D + E) * F)

i = 8: /
    whenever there is an operator, take out last two elements from the stack 
    and put the operator between them and wrap it around by brackets and put them back in the stack
    st = [ ((A - B) / ((D + E) * F))

Iteration Over, st has only one element -> That's the answer


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

function postToInfix(s) {
    const n = s.length;

    let st = new myStack();
    
    for(let i = 0; i < n; i++) {
        if(isOperand(s[i])) st.push(s[i]);
        else {
            const e1 = st.top(); st.pop();
            const e2 = st.top(); st.pop();

            /* concatenata in reverse order as stack has elements in reversed order */
            st.push('(' + e2 + s[i] + e1 + ')');
        }
    }

    return st.top();
}

/*
TC: O(n) for loop + O(n) while adding strings, if strings are of larger size

SC: O(n) stack
*/