/* 239. Sliding Window Maximum

You are given an array of integers nums, there is a sliding window of size k which is moving from 
the very left of the array to the very right. You can only see the k numbers in the window. 
Each time the sliding window moves right by one position.

Return the max sliding window.


Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

Explanation: 
Window position                Max
---------------               -----
 0  1   2   3  4  5  6  7
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7


Input: nums = [1], k = 1
Output: [1]
 

Constraints:
    1 <= nums.length <= 10^5
    -104 <= nums[i] <= 10^4
    1 <= k <= nums.length


                                            Brute Force:
                                            ------------

Simply have 2 loops

for(i = 0 --- (n - k)) {
    j = (i + k)

    maxWindow = maxFn(a.slice(i, (j + 1)))
    ans.push(maxWindow)
}

TC: get max value for each window = (O(n - k) * k)
SC: no of windows = O(n - k)

                                            OPTIMISATION
                                            ------------

- We anyways need to traverse whole array, so (n - k) is required, but we can optimise the k part
  we can calculate and store the maxWindow in a single pass/iteration
- We can solve this using a monotonic queue
- Note: the queue will only have elements for the current window, so q.size <= k only
- Also, store the indices only in queue, because we need to know the position of the element
  to determine if its in the window or not

Logic:

    For i from 0 to n-1:

        1. Remove indices that are out of window:
            while deque not empty AND deque.front() <= i - k:
                pop_front()

        2. Maintain decreasing order in the deque:
            while deque not empty AND nums[deque.rear()] <= nums[i]:
                pop_rear()

        3. Push current index i

        First window starts at (k - 1)th index, and after that, every iteration, the window updates
        4. If i >= k-1:
            answer.push(nums[deque.front()])

*/

class myDeQueue {
    public queue: number[];
    private currentSize: number;

    constructor() {
        this.currentSize = 0;
        this.queue = [];
    }

    public enqueueFront(element: number) {
       this.queue.unshift(element);
       this.currentSize++;
    }

    public enqueueRear(element: number) {
        this.queue[this.currentSize] = element;
        this.currentSize++;
    }

    public dequeueFront() {
        if(this.currentSize === 1) {
            this.currentSize--;
            this.queue.length = this.currentSize;
        }
        else if((!this.isEmpty()) && (this.currentSize > 1)) {

            /* shift every element to left by 1 */
            for (let i = 1; i < this.currentSize; i++) {
                if ((i - 1) >= 0) this.queue[i - 1] = this.queue[i];
            }

            this.currentSize--;
            this.queue.length = this.currentSize;
        }
    }

    public dequeueRear() {
        if (!this.isEmpty()) { this.queue.pop(); this.currentSize--; }
    }

    public displayQueue() {
        return this.queue;
    }

    public getFront() {
        if(!this.isEmpty()) return this.queue[0];
    }
    
    public getRear() {
        if(!this.isEmpty()) return this.queue[this.currentSize - 1];
    }

    public isEmpty() {
        return (this.currentSize === 0)? true: false;
    }
};

function maxSlidingWindow(a: number[], k: number): number[] {
    const n: number = a.length;

    if((n === 1) && (k === 1)) return a;
    if(n === k) return [Math.max(...a)];

    let dq = new myDeQueue();
    let ans: number[] = [];

    for(let i = 0; i < n; i++) {

        /* Remove those indices from the queue that are not the part of the current window */
        if((!dq.isEmpty()) && (dq.getFront()! <= (i - k))) dq.dequeueFront();

        /* Keep the queue monotonic */
        while((!dq.isEmpty()) && (a[dq.getRear()!] <= a[i])) dq.dequeueRear();

        /* Push the current element index in the dequeue */
        dq.enqueueRear(i);

        /* Check if we reached the first window, then start popping, 
           After the first window is reached each iteration will modify the current window and hence deque
        */
        if((!dq.isEmpty()) && (i >= (k - 1))) ans.push(a[dq.getFront()!]);
    }

    return ans;
};