/* De-queue: Doubly-ended queue 

                    Insertion Removal is possible at both ends

                        Front                  Rear
                            ____________________
                            ____________________

                           < ----see-like-this---     
*/

class Dequeue {
    private dequeue: number[];
    private size: number;

    constructor(size: number) {
        this.dequeue = [];
        this.size = size;
    }

    insertAtFront(element: number) {
        if (this.isFull()) {
            console.error("Deque is full. Cannot insert element at front.");
            return;
        }
        this.dequeue.unshift(element);
    }

    removeAtFront() {
        if (this.isEmpty()) {
            console.error("Deque is empty. Cannot remove element from front.");
            return;
        }
        return this.dequeue.shift();
    }

    insertAtRear(element: number) {
        if (this.isFull()) {
            console.error("Deque is full. Cannot insert element at rear.");
            return;
        }
        this.dequeue.push(element);
    }

    removeAtRear() {
        if (this.isEmpty()) {
            console.error("Deque is empty. Cannot remove element from rear.");
            return;
        }
        return this.dequeue.pop();
    }

    display() {
        console.log(this.dequeue);
    }

    private isFull(): boolean {
        return this.dequeue.length === this.size;
    }

    private isEmpty(): boolean {
        return this.dequeue.length === 0;
    }
}

// Example usage:
const deque = new Dequeue(5);
deque.insertAtFront(1);
deque.insertAtFront(2);
deque.insertAtRear(3);
deque.display(); // Output: [2, 1, 3]
console.log(deque.removeAtFront()); // Output: 2
console.log(deque.removeAtRear()); // Output: 3
deque.display(); // Output: [1]

