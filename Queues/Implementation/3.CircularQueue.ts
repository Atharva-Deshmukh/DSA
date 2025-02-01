/* 
A Circular Queue is another way of implementing a normal queue where the last element of the queue 
is connected to the first element of the queue forming a circle.

It is also called ring buffer.

REFER THE IMAGE TO KNOW WHY DO WE USE A CICRULAR QUEUE 
Since, in a normal queue, which is an array under the hood, we cannot add further elements
even though we have space at front, since our rear/tail pointer has reached the end,
we use circular queue here

We use array of specific size here since we can add a new element by first removing any 
existing one, so Its MEMORY EFFICIENT

                                 size = 3

                              frnt   rear
                                |      | 
                            <-- [1, 2, 3] <--

                                  frnt rear
                                    |  | 
                            <-- [ , 2, 3] <-- pop()

                                rear  frnt
                                 |     | 
                            <-- [4, 2, 3] <-- push(4) rather than shifting all elements to left by 1

                            So, whenever rear === size-1, rear = 0;

------------------------------------------------------------------------------------------------------------
                                    ANOTHER CONCEPT: circular indexes
                            We will do front++ and rear++ using circular indexing

           0  1  2
let arr = [1, 2, 3] n = 3

0 = (0 % 3)
1 = (1 % 3)
2 = (2 % 3)

now, i = 3 in circular array = index 0
3 = (3 % 3) = 0
4 = (4 % 3) = 1


So (rear + 1) % totalSize
   (front + 1) % totalSize



*/

class CircularQueue {
    private cqueue: number[];
    private totalSize: number;
    private currentSize: number;
    public dequeuedElement: number

    // we need these two pointers to track the rear and front so that we can simulate circular effect
    private front: number;
    private rear: number;

    constructor(size: number) {
        this.totalSize = size;

        this.cqueue = [];
        this.front = -1;   // denotes index here
        this.rear = -1;
        this.currentSize = 0;
    }

    enQueue(val: number): boolean {
        if (this.isFull()) return false; 
        
        // If queue is empty, initialize front
        if (this.front === -1) this.front = 0;

        // Move rear pointer circularly
        this.rear = (this.rear + 1) % this.totalSize;

        // insert val at updated rear pointer
        this.cqueue[this.rear] = val;

        // update the size
        this.currentSize++;

        return true;
    }

    deQueue(): boolean {
        if (this.isEmpty()) return false;
         
         // Remove the front element
         this.cqueue[this.front] = null;
 
         // move pointers
         // If only one element was present, reset front & rear
         if (this.front === this.rear) {
             this.front = -1;
             this.rear = -1;
         } else {
             this.front = (this.front + 1) % this.totalSize; // Move front circularly
         }
 
         this.currentSize--;
         return true;
         
     }

    display() {
        console.warn(this.cqueue);
    }

    private isFull() {
        return (this.totalSize === this.currentSize);
    }

    private isEmpty() {
        return (this.currentSize === 0);
    }
};

let cq = new CircularQueue(4);
cq.enqueue(1);
cq.enqueue(2);
cq.enqueue(3);
cq.display();
cq.dequeue();
cq.display();
cq.enqueue(4);
cq.enqueue(5);
cq.display();




