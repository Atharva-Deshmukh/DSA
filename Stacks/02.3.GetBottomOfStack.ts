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

function getBottom(st: myStack): number {

    if (st.currentSize === 1) {
        return st.top()!;
    }

    const top = st.top()!;
    st.pop();

    const bottom = getBottom(st);

    st.push(top);

    return bottom;
};
