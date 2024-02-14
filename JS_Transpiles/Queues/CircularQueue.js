/* REFER THE IMAGE TO KNOW WHY DO WE USE A CICRULAR QUEUE
Since, in a normal queue, which is an array under the hood, we cannot add further elements
even though we have space at front, since our pointer has reached the end,
we use circular queue here

We use array of specific size here since we can add a new element by first removing any
existing one, so Its MEMORY EFFICIENT
*/
class CircularQueue {
    cqueue;
    size;
    currentSize;
    front;
    rear;
    constructor(size) {
        this.size = size;
        this.cqueue = [];
        this.front = -1; // denotes index here
        this.rear = -1;
        this.currentSize = 0;
    }
    enqueue(val) {
        // agar cqueue full nhi hai to
        if (this.currentSize !== this.size) {
            // agar queue ka size max tak pohoch gya, to rear ko 0th index, uski khudki jagah 
            // pe leke aajao, rear jab yaha aayga to now, hum circular way se handle kar sakte
            //Note that rear is an index, hence size-1
            // LAST WALE KO 0 PE LAANE SE CIRCULAR EFFECT AATA HAI
            if (this.rear === this.size - 1)
                this.rear = 0;
            else
                this.rear++;
            this.cqueue[this.rear] = val;
            this.currentSize++;
            // if first element hai, to front ko bhi 0 pe leke aao jaha tab rear hoga
            if (this.front === -1)
                this.front = this.rear;
        }
        else {
            alert('QUEUE IS FULL');
        }
    }
    dequeue() {
        if (this.currentSize !== 0) {
            // delete current element at front (front = 0) at start when we did this.front = this.rear
            this.cqueue[this.front] = null;
            // element remove honey ke baad front jo hai vo array me aage aage aata hai, 
            // but if uska index max size barabar hai, to usko 0 pe laao in order to reuse the space
            // LAST WALE KO 0 PE LAANE SE CIRCULAR EFFECT AATA HAI
            if (this.front === this.size - 1)
                this.front = 0;
            else
                this.front++;
            this.currentSize--;
        }
        else {
            // reset everything for an empty queue
            this.front = -1;
            this.rear = -1;
            alert('QUEUE IS EMPTY');
        }
    }
    display() {
        console.warn(this.cqueue);
    }
}
;
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
