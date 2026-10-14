export class Stack {
    public currentSize: number;   // exposing current size so that to be used in problems ahead
    private totalSize: number;
    private stack: string[];
    public poppedElement: string;

    constructor(size: number) {
        this.currentSize = 0;
        this.totalSize = size;
        this.stack = [];
        this.poppedElement = '';
    }

    push(element: string) {
        if(this.isFull()) return;
        else {
            this.stack[this.currentSize] = element;
            this.currentSize++;
        }
    }

    pop() {
        if(this.isEmpty()) return;
        else {
            this.poppedElement = this.stack[this.currentSize - 1];
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    private isFull() {
        return (this.currentSize === this.totalSize)
    }

    private isEmpty() {
        return (this.currentSize === 0)
    }

    // track top element of the stack so that it can be used in further problems
    top() {
        if(this.isEmpty()) return '';
        return this.stack[this.currentSize - 1];
    }
};