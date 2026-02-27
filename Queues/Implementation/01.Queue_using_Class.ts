/* Since it is not desired to use Array.shift() and Array.pop(),
so push elements in the array from the end. 
While removing element, shift all elements from last to start by 1 and then decrease array
size by 1 to free up memory for the last element.

we have two choices to implement queue using an array

WAY 1: Using array as it is -> Both enqueue and dequeue operations become costly
                                 
                                 0  1  2  3
                  enqueue  -->  [1, 2, 3, 4] --> dequeue
                                 |        |
                            rear/tail  front/head

                    dequeue -> just shift (i-1) -> i
                    enqueue -> shift (i+1) -> (i+2) to add i

                  enqueue() = O(n)
                  dequeue() = O(n),

                    Hence, we will implement queue using another way:

WAY 2: Using array from reverse side -> dequeue becomes costly

                                  0  1  2  3
                   dequeue  <--  [1, 2, 3, 4] <-- enqueue
                                  |        |
                            front/head  rear/tail

                  we can easily dequeue from arr[0], and we can easily enqueue from arr[n - 1]
                  enqueue() = O(1)
                  dequeue() = O(n), since after popping arr[0], shift all elements to left by 1 and 
                              clear memory location arr[n - 1]




SPACE WASTAGE in above approach:
if size === 3
queue =   <-- [1, 2, 3] <--
pop()
queue =   <-- [ , 2, 3] <--

now, in enqueue, we shift elements to left, to avoid this shift, we use circular queues */

class Queue {
    private queue: number[];
    private currentSize: number;
    private totalSize: number;
    public dequeuedElement: number;

    constructor(size: number) {
        this.totalSize = size;
        this.currentSize = 0;
        this.queue = [];
    }

    enqueue(element: number) {
        if(this.isQueueFull()) console.log('QUEUE IS FULL');
        else {
            this.queue[this.currentSize] = element;
            this.currentSize++;
        }
    }

    dequeue() {
        if (this.isQueueEmpty()) console.log('QUEUE IS EMPTY');
        else if (this.currentSize === 1) {
            this.dequeuedElement = this.queue[this.currentSize - 1];
            this.currentSize--;
            this.queue.length = this.currentSize;
        }
        else {

            // store the element being dequeued
            this.dequeuedElement = this.queue[0];

            // shift every element to left by 1
            for (let i = 1; i < this.currentSize; i++) {
                if ((i - 1) >= 0) this.queue[i - 1] = this.queue[i];
            }

            this.currentSize--;
            this.queue.length = this.currentSize;
        }
    }

    displayQueue() {
        console.log('QUEUE -> ', this.queue);
    }

    getDequeuedElement() {
        console.log('Dequeued Element -> ', this.dequeuedElement);
    }

    private isQueueFull() {
        return (this.currentSize === this.totalSize)? true: false;
    }

    private isQueueEmpty() {
        return (this.currentSize === 0)? true: false;
    }
};

let q = new Queue(5);
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
q.displayQueue();
q.dequeue();
q.displayQueue();
q.dequeue();
q.displayQueue();