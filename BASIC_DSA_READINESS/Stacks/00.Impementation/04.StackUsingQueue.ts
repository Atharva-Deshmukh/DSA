/* Implement a stack using queue

These are standard ways, need to remember them for interview

                                Way-1: Not expected in an interview
                                -----------------------------------
- Directly use a doubly ended queue

                        Way-2: Use 2 queues (make push costly, or make pop costly)
                        ----------------------------------------------------------

2.1: Make push() costly:
---------------------
Main idea: 
- always keep the newly inserted element at the front of q1, so that both pop() and top() can directly access it. 
- Queue q2 acts as a helper to rearrange elements during push().

Steps:

push(x):

- Enqueue the new element x into q2.
- Move all elements from q1 into q2, one by one. (this brings the latest inserted element at the front to pop())
- Swap the names of q1 and q2. After the swap, q1 contains the updated stack order with 
  the newest element at the front.

pop():

- If q1 is empty, the stack is empty (underflow condition).
- Otherwise, dequeue from the front of q1, which represents the top of the stack.

top():
- If q1 is empty, return -1.
- Otherwise, return the front element of q1, since it represents the current top of the stack.

size():
- Simply return the number of elements in q1, which tracks the current stack size.


2.2: Make pop() costly:
---------------------
Main idea: 
- The idea is to make the push(x) operation simple, and adjust the order during pop() and top().

Steps:

push(x) -> The element x is simply enqueued into q1. This keeps push() efficient.

pop():
- If q1 is empty, the stack is empty (underflow condition).
- Otherwise, move elements from q1 to q2 until only one element is left in q1.
- Remove this last element from q1 (which represents the top of the stack).
- Swap the names of q1 and q2 so that q1 again holds the current stack elements.

top():
- If q1 is empty, return -1. Otherwise, move elements from q1 to q2 until only one element is left.
- Store this last element (the top of the stack), then move it to q2 instead of discarding it.
- Swap q1 and q2 to restore order.
- Return the stored element.

size(): return q1.length

Way-3: Use a single queue
--------------------------

Main Idea:
- Always keep the most recently pushed element at the front of the queue, so that top() and pop() work 
  in O(1) time.

push(x):
- Insert the new element at the back of the queue.
- Rotate the queue by repeatedly removing the front element and pushing it back until the 
  new element comes to the front.
- After rotation, the newest element will be at the front, acting as the stack top.

size(): return q.length

top(): Return the element at the front of the queue, since it represents the top of the stack.

pop(): Simply dequeue the front element of the queue.

*/

class stackUsing2QueuesPushCostly {
    public q1: number[];
    public q2: number[];
    
    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    push(x: number): void {
        this.q2.push(x);

        while (this.q1.length > 0) {
            this.q2.push(this.q1[0]);
            this.q1.shift();
        }

        [this.q1, this.q2] = [this.q2, this.q1];
    }

    pop(): number {
        if(this.empty()) return -1;
        else return this.q1.shift()!; 
    }

    top(): number {
        if(!this.empty()) return this.q1[0];
    }

    empty(): boolean {
        return !(this.q1.length > 0);
    }
};

class stackUsing2QueuesPopCostly {
    public q1: number[];
    public q2: number[];

    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    push(x: number): void {
        this.q1.push(x);
    }

    pop(): number {
        while (this.q1.length > 1) {
            this.q2.push(this.q1[0]);
            this.q1.shift();
        }

        const poppedElement = this.q1.shift();

        [this.q1, this.q2] = [this.q2, this.q1];

        return poppedElement;
    }

    top(): number {
        if (!this.empty()) {

            while (this.q1.length > 1) {
                this.q2.push(this.q1[0]);
                this.q1.shift();
            }

            const top = this.q1[0];

            this.q2.push(this.q1[0]);
            this.q1.shift();

            [this.q1, this.q2] = [this.q2, this.q1];

            return top;
        } else return -1;
    }

    empty(): boolean {
        return !(this.q1.length > 0);
    }
};

class stackUsingSingleQueue {
    public q: number[];

    constructor() {
        this.q = [];
    }

    push(x: number): void {
        this.q.push(x);

        /* If 3 elements are there, 2 needs to be shifted back and 3rd need to be brought up at front */
        let loopCount = this.q.length - 1;
        while (loopCount > 0) {
            const elementBeingPushedBack = this.q[0];
            this.q.shift();
            this.q.push(elementBeingPushedBack);
            loopCount--;
        }
    }

    pop(): number {
        if (this.empty()) return -1;
        else return this.q.shift();
    }

    top(): number {
        if (this.empty()) return -1;
        else return this.q[0];
    }

    empty(): boolean {
        return !(this.q.length > 0);
    }
};