/* Since it is not desired to use Array.shift() abd Array.pop(),
so push elements in the array from the end.
While removing element, shift all elements from last to start by 1 and then decrease array
size by 1 to free up memory for the last element.
*/
class Queue {
    queue;
    currentSize;
    size;
    constructor(size) {
        this.queue = [];
        this.currentSize = 0;
        this.size = size;
    }
    // push elements in the array form end 
    enqueue(element) {
        if (this.currentSize === this.size)
            alert('Queue Full');
        else {
            this.queue[this.currentSize] = element;
            this.currentSize++;
        }
    }
    // shift all elements to left by 1, and free up space of the last element
    dequeue() {
        if (this.currentSize === 0)
            alert('Queue EMPTY');
        else {
            for (let i = 0; i < this.currentSize; i++) {
                this.queue[i] = this.queue[i + 1];
            }
            this.currentSize--;
            this.queue.length = this.currentSize;
        }
    }
    display() {
        console.warn(this.queue);
    }
}
;
let q = new Queue(5);
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
q.display();
q.dequeue();
q.display();
q.dequeue();
q.display();
