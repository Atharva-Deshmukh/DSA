/* First negative in every window of size k

Given an array arr[]  and a positive integer k, find the first negative 
integer for each and every window(contiguous subarray) of size k.

Note: If a window does not contain a negative integer, then return 0 for that window.

Examples:

Input: arr[] = [-8, 2, 3, -6, 10] , k = 2
Output: [-8, 0, -6, -6]
Explanation:
Window [-8, 2] First negative integer is -8.
Window [2, 3] No negative integers, output is 0.
Window [3, -6] First negative integer is -6.
Window [-6, 10] First negative integer is -6.

Input: arr[] = [12, -1, -7, 8, -15, 30, 16, 28] , k = 3
Output: [-1, -1, -7, -15, -15, 0] 
Explanation:
Window [12, -1, -7] First negative integer is -1.
Window [-1, -7, 8] First negative integer is -1.
Window [-7, 8, -15] First negative integer is -7.
Window [8, -15, 30] First negative integer is -15.
Window [-15, 30, 16] First negative integer is -15.
Window [30, 16, 28] No negative integers, output is 0.

Input: arr[] = [12, 1, 3, 5] , k = 3
Output: [0, 0] 
Explanation:
Window [12, 1, 3] No negative integers, output is 0.
Window [1, 3, 5] No negative integers, output is 0.

                                                    Brute Force
                                                    -----------

- Do a simple sliding window, and for each window, get first negative number

TC: O(n * k)
SC: O(1)

                                                Optimial Approach
                                                -----------------

- Maintain a normal queue which only stores negative numbers in a sequence they stream
- Here also, store indices in the queue as its easy to track then the current window index

TC: O(n)
SC: O(k) for queue */

class myQueue {
    qu;
    currentSize;
    totalSize;

    constructor(inputSize) {
        this.qu = [];
        this.currentSize = 0;
        this.totalSize = inputSize;
    }

    enqueue(x) {
        if(this.currentSize < this.totalSize) {
            this.qu.push(x);
            this.currentSize++;
        }
    }

    dequeue() {
        if(!this.isEmpty()) {
            if(this.currentSize === 1) {
                this.qu.pop();
                this.currentSize--;
                this.qu.length = this.currentSize;
            } 
            else {
                for(let i = 1; i <= (this.currentSize - 1); i++) {
                    this.qu[i - 1] = this.qu[i];
                }

                this.currentSize--;
                this.qu.length = this.currentSize;
            }
        }
    }

    getFront() {
        if(!this.isEmpty()) return this.qu[0];
    }

    isEmpty() {
        return (this.currentSize === 0)? true: false;
    }
}

function firstNegInt(a, k) {
    const n = a.length;

    let qu = new myQueue(k);
    let ans = [];

    for(let i = 0; i < n; i++) {

        /* Remove previous window indices */
        while((!qu.isEmpty()) && (qu.getFront() <= (i - k))) qu.dequeue();

        if(a[i] < 0) qu.enqueue(i);

        /* If we pass the first window end, then start pushing into the output array */
        if(i >= (k - 1)) {
            if(qu.isEmpty()) ans.push(0);
            else ans.push(a[qu.getFront()]);
        }
    }

    return ans;
}