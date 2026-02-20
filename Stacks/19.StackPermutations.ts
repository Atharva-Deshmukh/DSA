/*
You have an empty stack and can perform push and pop operations in it. 
You are given two arrays a[] and b[] of unique elements and both having the same length.

a[] represents the order in which elements are pushed into a stack.
b[] represents the order in which elements are expected to be popped from the stack.

Determine whether the given push and pop sequences are valid.
Note: The stack is empty initially and must also be empty after performing all the operations.

Examples:

Input: a[] = [1, 2, 3], b[] = [2, 1, 3]
Output: true
Explanation:
Take 1 from a and push it into the stack,
Take 2 from a and push it into the stack,
Take 2 from b and pop it from the stack,
Take 1 from b and pop it from the stack,
Take 3 from a and push it into the stack,
Take 3 from b and pop it from the stack
So, all the push and pop sequences are valid.

Input: a[] = [1, 2, 3], b[] = [3, 1, 2]
Output: false
Explanation: After pushing 1, 2, and 3, we can pop 3 as required. But the next element in b[] is 1, 
while the stack top is 2. Since 1 is blocked under 2, this order cannot be achieved.

Constraints:
    1 ≤ a.size()=b.size() ≤ 10^5
    0 ≤ a[i], b[i] ≤ 2*10^5

Approach:

       i                j
a[] = [1, 2, 3], b[] = [2, 1, 3]

st = [1                     --> i++
st = [1 2                   --> i++
st.top() = b[0] -> pop();   --> j++
st.top() = b[1] -> pop();   --> j++
st = [3                     --> i++
st.top() = b[2] -> pop();   --> j++

If stack is empty in the last return true
*/

class myStack {
    public currentSize: number;
    public poppedElement: number;
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
            this.poppedElement = this.stack[this.currentSize - 1];
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if (this.currentSize > 0) return this.stack[this.currentSize - 1];
        else return NaN;
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function validateOp(a, b) {
    const n1 = a.length;
    const n2 = b.length;

    let i = 0, j = 0;
    let st = new myStack();

    while((i < n1) && (j < n2)) {

        while((i < n1) && (st.top() !== b[j])) {
            st.push(a[i]);
            i++;
        }

        while((!st.isEmpty()) && (st.top() === b[j])) {
            st.pop();
            j++;
        }
    }

    return (st.currentSize === 0);
}