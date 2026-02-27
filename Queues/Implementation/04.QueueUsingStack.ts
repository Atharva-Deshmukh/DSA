class myStack {
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

/* Here also, we have 3 ways like for the implementation of stack using queue

Way-1: Making enqueue costly

maintain two stacks s1 and s2

Enqueue(x):
- While s1 is not empty, move all elements from s1 to s2.
- Push x into s1.
- Move everything back from s2 to s1.
- This guarantees that the front of the queue is always on top of s1.

Dequeue():
- If s1 is empty → queue is empty (underflow).
- Otherwise, pop from s1.

Front(): 
- If s1 is empty → return -1.
- Otherwise, return the top element of s1 (since it always represents the front of the queue).

Size(): Return the current size of s1 (both stacks together always hold exactly n elements).

*/

class queueUsingStacksEnqueCostly {
    private s1: myStack;
    private s2: myStack;

    constructor() {
        this.s1 = new myStack();
        this.s2 = new myStack();
    }

    enqueue(x: number) {

        /* Move all elements from s1 to s2 */
        while(!this.s1.isEmpty()) {
            const top = this.s1.top()!;
            this.s1.pop();
            this.s2.push(top);
        }

        /* Push x in s1 */
        this.s1.push(x);

        /* move everything back from s2 to s1 */
        while(!this.s2.isEmpty()) {
            const top = this.s2.top()!;
            this.s2.pop();
            this.s1.push(top);
        }
    }

    dequeue() {
        if(!this.s1.isEmpty()) this.s1.pop();
    }

    front() {
        if(!this.s1.isEmpty()) return this.s1.top();
    }

    size() {
        return this.s1.currentSize;
    }
};

/* Way-2: Using dequeue costly

enqueue(q, x) -> Push x onto s1.

dequeue(q)
- If both s1 and s2 are empty → queue underflow.
- If s2 is empty while s1 is not empty, pop elements from s1 and push them to s2.
- Pop the element from s2 and return it.

front()
- If s2 is not empty → top of s2 is the front.
- Else, if s1 is not empty → bottom of s1 is the front (can be accessed indirectly via transfer).
- If both empty → queue is empty.

size() -> Total size = s1.size() + s2.size()
*/

class queueUsingStacksDequeCostly {
    private s1: myStack;
    private s2: myStack;

    constructor() {
        this.s1 = new myStack();
        this.s2 = new myStack();
    }

    enqueue(x: number) {
        this.s1.push(x);
    }

    dequeue() {
        // if(this.s1.isEmpty() && this.s2.isEmpty()) return -1;
        if((this.s2.isEmpty()) && (!this.s1.isEmpty())) {
            while(!this.s1.isEmpty()) {
                const top = this.s1.top();
                this.s1.pop();
                this.s2.push(top);
            }
        }

        this.s2.pop();
    }

    front() {
        if(!this.s2.isEmpty()) return this.s2.top();

        /* push all elements of s1 to s2 and the last element pushed will be the bottom of s1 */
        else if(!this.s1.isEmpty()) {
            while(!this.s1.isEmpty()) {
                const top = this.s1.top();
                this.s1.pop();
                this.s2.push(top);
            }

            return this.s2.top();
        }
    }

    size() {
        return this.s1.currentSize + this.s2.currentSize;
    }
};

/* Way-3: Single stack and recursion 

Idea: 
st.top() -> queue.rear()
st.bottom() -> queue.front() */

class queueUsingSingleStack {
    private s1: myStack;

    constructor() {
        this.s1 = new myStack();
    }

    enqueue(x: number) {
        this.s1.push(x);
    }

    dequeue(): number | undefined {
        if (this.s1.currentSize === 0) return undefined;

        const removeBottom = (st: myStack): number => {

            // If this is the bottom element
            if (st.currentSize === 1) {
                const bottom = st.top()!;
                st.pop();
                return bottom;
            }

            const top = st.top()!;
            st.pop();

            const bottom = removeBottom(st);

            st.push(top);

            return bottom;
        };

        return removeBottom(this.s1);
    }

    front(): number | undefined {
        if (this.s1.currentSize === 0) return undefined;

        const getBottom = (st: myStack): number => {

            if (st.currentSize === 1) {
                return st.top()!;
            }

            const top = st.top()!;
            st.pop();

            const bottom = getBottom(st);

            st.push(top);

            return bottom;
        };

        return getBottom(this.s1);
    }

    size() {
        return this.s1.currentSize;
    }

    isEmpty(): boolean {
        return this.s1.currentSize === 0;
    }
};

