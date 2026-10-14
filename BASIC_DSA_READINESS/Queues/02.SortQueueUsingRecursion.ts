/* Sort a queue using recursion

Its the same logic as that of sort stack using recursion */

class myQueue {
    private queue: number[];
    private currentSize: number;

    constructor() {
        this.currentSize = 0;
        this.queue = [];
    }

    enqueue(element: number) {
        this.queue[this.currentSize] = element;
        this.currentSize++;
    }
    
    front() {
       if(!this.isEmpty()) return this.queue[0];
    }
    
    rear() {
       if(!this.isEmpty()) return this.queue[this.currentSize - 1];
    }

    /* We need to shift elements to front side*/
    dequeue() {
        if ((!this.isEmpty()) && (this.currentSize === 1)) {
            this.currentSize--;
            this.queue.length = this.currentSize;
        }
        else if((!this.isEmpty()) && (this.currentSize > 1)) {

            // shift every element to left by 1
            for (let i = 1; i < this.currentSize; i++) {
                if ((i - 1) >= 0) this.queue[i - 1] = this.queue[i];
            }

            this.currentSize--;
            this.queue.length = this.currentSize;
        }
    }

    isEmpty() {
        return (this.currentSize === 0)? true: false;
    }
};

function sortedInsert(qu: myQueue, x: number) {
    
    if((qu.isEmpty()) || (qu.rear()! <= x)) {
        qu.enqueue(x);
        return;
    }
    
    
    const front = qu.front()!;
    qu.dequeue();
    sortedInsert(qu, x)
    qu.enqueue(front);
}

function sortQueueRecursively(qu: myQueue) {
    
    if(qu.isEmpty()) return;
    
    const front = qu.front()!;
    qu.dequeue();
    
    sortQueueRecursively(qu);
    sortedInsert(qu, front);
}

let qu = new myQueue();
qu.enqueue(5);
qu.enqueue(4);
qu.enqueue(3);
qu.enqueue(2);
sortQueueRecursively(qu);
console.log(qu);