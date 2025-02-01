/* Since it is not desired to use Array.shift() and Array.pop(),
so push elements in the array from the end. 
While removing element, shift all elements from last to start by 1 and then decrease array
size by 1 to free up memory for the last element.


we have two choices to implement queue using an array

WAY 1:
                                 
                                 0  1  2  3
                  enqueue  -->  [1, 2, 3, 4] --> dequeue
                                 |        |
                            rear/tail  front/head

                    But, here to enqueue, u need to use add element to start of array using shift()
                    and to dequeue, u need to use pop(), both are not allowed

                    Else, here on pop(), shift all elements to right by 1, so, pop() is costly
                    Also, for push(), move all elements to right by 1, so push() is also costly

                    Hence, we will implement queue using another way:

WAY 2: 
                                  0  1  2  3
                   dequeue  <--  [1, 2, 3, 4] <-- enqueue
                                  |        |
                            front/head  rear/tail

                  we can easily dequeue from arr[0], and we can easily enqueue from arr[n - 1]
                  enqueue() = O(1)
                  dequeue() = O(n), since after popping arr[0], shift all elements to left by 1 and 
                              clear memory location arr[n - 1]


*/

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
        if(this.totalSize === this.currentSize) console.log('QUEUE IS FULL');
        else {
            this.queue[this.currentSize] = element;
            this.currentSize++;
        }
    }

    dequeue() {
        if(this.currentSize === 0) console.log('QUEUE IS EMPTY');
        else if(this.currentSize === 1) {
            this.dequeuedElement = this.queue[this.currentSize - 1];
            this.currentSize--;
            this.queue.length = this.currentSize;
        }
        else {
            // shift every element to left by 1
            for(let i = 1; i < this.currentSize; i++) {
                if((i - 1) >= 0) this.queue[i - 1] = this.queue[i];
            }

            // clear memory for arr[n - 1] to simulate dequeue operation
            this.dequeuedElement = this.queue[this.currentSize - 1];
            this.currentSize--;
            this.queue.length = this.currentSize;
        }
    }

    displayQueue() {
        console.log('QUEUE -> ', this.queue);
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