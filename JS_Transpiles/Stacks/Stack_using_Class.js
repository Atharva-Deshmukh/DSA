class Stack {
    size;
    currentSize;
    stack;
    constructor(size) {
        this.size = size;
        this.currentSize = 0;
        this.stack = [];
    }
    push(element) {
        if (this.currentSize === this.size)
            alert('STACK IS FULL');
        else {
            this.stack[this.currentSize] = element;
            this.currentSize++;
        }
    }
    pop() {
        if (this.currentSize === 0)
            alert('STACK IS EMPTY');
        else {
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }
    display() {
        console.warn(this.stack);
    }
}
;
let myStack = new Stack(5);
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.pop();
myStack.display();
