export class Stack {
    private size: number;
    public currentSize: number;
    public poppedElement: number;
    private stack: number[];

    constructor(size: number) {
        this.size = size;
        this.currentSize = 0;
        this.stack = [];
    }

    /*
    - push ele in []     i.e length 0 -> pushed at index 0;
    - push ele in [1] i.e    length 1 -> pushed at index 1;
    - push ele in [1, 2] i.e length 2 -> pushed at index 2;

    So, element is being pushed at arr[currentSize]


    Direction of stack filling in array

      origin
        |
        [1, 2, 3, 4]  <-- push/pop happens here for last element of array
 
     */

    push(element: number) {

        if(this.isStackFull()) alert('STACK IS FULL');
        else {
            this.stack[this.currentSize] = element;
            this.currentSize++;
        }
    }

    /* Just free the memory of the last element stored in the array */
    pop() {
        if(this.isStackEmpty()) alert('STACK IS EMPTY');
        else  {
            this.poppedElement = this.stack[this.currentSize-1];
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    private isStackFull() {
        return (this.currentSize === this.size)? true: false;
    }

    private isStackEmpty() {
        return (this.currentSize === 0)? true: false;
    }
};

let myStack = new Stack(5);
myStack.push(1); 
myStack.push(2); 
myStack.push(3); 
myStack.push(4); 
myStack.pop(); 
myStack.display(); 