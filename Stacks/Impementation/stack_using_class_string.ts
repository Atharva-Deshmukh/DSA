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
        if(this.isFull()) console.log('STACK FULL');
        else {
            this.stack[this.currentSize] = element;
            this.currentSize++;
        }
    }

    pop() {
        if(this.isEmpty()) console.log('STACK EMPTY');
        else {
            this.poppedElement = this.stack[this.currentSize - 1];
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    isFull() {
        return (this.currentSize === this.totalSize)
    }

    isEmpty() {
        return (this.currentSize === 0)
    }
} 