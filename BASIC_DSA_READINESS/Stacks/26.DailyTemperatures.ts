/* 739. Daily Temperatures

Given an array of integers temperatures represents the daily temperatures, 
return an array answer such that answer[i] is the number of days you have to wait after the ith day 
to get a warmer temperature. If there is no future day for which this is 
possible, keep answer[i] == 0 instead.

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Input: temperatures = [30,60,90]
Output: [1,1,0]
 
Constraints:
    1 <= temperatures.length <= 10^5
    30 <= temperatures[i] <= 100

Approach:
- Here, we need to find, after how many indices, we have next greater element (to the right)

           0  1  2  3  4  5  6  7
Input:   [73,74,75,71,69,72,76,73]
Output:  [1, 1, 4, 2, 1, 1, 0, 0]
ngeIndex [1, 2  6  5  5  6  -1  -1]

We can see that for index a[3] = 71, nge 76
Difference of days = ngeIndex - currentIndex = 5 - 3 = 2

*/

class myStack {
    public currentSize: number;
    private stack: number[];

    constructor() {
        this.currentSize = 0;
        this.stack = [];
    }

    push(element: number) {
        this.stack[this.currentSize] = element;
        this.currentSize++;
    }

    /* Just free the memory of the last element stored in the array */
    pop() {
        if (!this.isEmpty()) {
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if (this.currentSize > 0) return this.stack[this.currentSize - 1];
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function dailyTemperatures(a: number[]): number[] {
    const n: number = a.length;

    /* For single day, no next day exists */
    if(n === 1) return [0];

    let st = new myStack();
    let ngeIndex: number[] = [];
    let res: number[] = [];

    for(let i = n-1; i >= 0; i--) {
        while((!st.isEmpty()) && (a[st.top()!] <= a[i])) st.pop();
        ngeIndex[i] = (st.isEmpty())? -1: st.top()!;
        st.push(i);
    }

    for(let i = 0; i < n; i++) res[i] = (ngeIndex[i] === -1)? 0: (ngeIndex[i] - i);

    return res; 
}