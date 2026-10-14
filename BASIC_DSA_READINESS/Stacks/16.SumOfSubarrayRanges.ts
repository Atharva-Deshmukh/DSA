/* 2104. Sum of Subarray Ranges

You are given an integer array nums. The range of a subarray of nums is the difference between the 
largest and smallest element in the subarray.
Return the sum of all subarray ranges of nums.
A subarray is a contiguous non-empty sequence of elements within an array.

Input: nums = [1,2,3]       Output: 4

Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0 
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.

Input: nums = [1,3,3]       Output: 4

Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[3], range = 3 - 3 = 0
[3], range = 3 - 3 = 0
[1,3], range = 3 - 1 = 2
[3,3], range = 3 - 3 = 0
[1,3,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.

Constraints:
    1 <= nums.length <= 1000
    -10^9 <= nums[i] <= 10^9

                                                Way-1: Brute Force

- Generate all subarrays, and for each subarray calculate range and add to res

for(i-0 -- (n-1)) {
    for(j-0 -- (n-1)) {
        res += getRange(i, j)
    }
}

TC: O(n^2)
SC: O(1)

                                            Way-2: O(n) Stack Approach:

range of each subarray = MaxElement of Subarray - MinElement of Subarray

sum(range of subarray) = sum(MaxElement of Subarray) - sum(MinElement of Subarray)
                          sum of subarray maximum    -  sum of subarray minimum --> our problem 11

*/

export class myStack {
    public currentSize: number;
    public poppedElement: number;
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
        if(!this.isEmpty()) {
            this.poppedElement = this.stack[this.currentSize-1];
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if(this.currentSize > 0) return this.stack[this.currentSize - 1];
        else return NaN;
    }

    isEmpty() {
        return (this.currentSize === 0)? true: false;
    }
};

function sumSubarrayMins(a: number[]): number {
    const n: number = a.length;

    if (n === 0) return 0;
    if (n === 1) return a[0];

    let minSum: number = 0;

    let prevSmallerElementIndex: number[] = Array(n);
    let nextSmallerElementIndex: number[] = Array(n);

    /* Filling previous smaller element indices. Note, if no element exists, fill n, not -1 
       push the indices in the stack, not the element, we need indices
    */
    let nextMinStack = new myStack();
    for (let i = (n - 1); i >= 0; i--) {
        while ((!nextMinStack.isEmpty()) && (a[nextMinStack.top()] >= a[i])) nextMinStack.pop();

        nextSmallerElementIndex[i] = (nextMinStack.isEmpty()) ? n : nextMinStack.top();

        nextMinStack.push(i);
    }

    /* Filling next smaller element indices. Note, if no element exists, fill -1 
       greater than is used, since we are looking for elements LESS THAN OR EQUAL TO for pse[]
    */
    let prevMinStack = new myStack();
    for (let i = 0; i < n; i++) {
        while ((!prevMinStack.isEmpty()) && (a[prevMinStack.top()] > a[i])) prevMinStack.pop();

        prevSmallerElementIndex[i] = (prevMinStack.isEmpty()) ? -1 : prevMinStack.top();

        prevMinStack.push(i);
    }

    for (let i = 0; i < n; i++) {
        const contributionsFromLeft: number = (i - prevSmallerElementIndex[i]);
        const contributionsFromRight: number = (nextSmallerElementIndex[i] - i);
        const totalContribution: number = (contributionsFromLeft * contributionsFromRight) * a[i];

        minSum = (minSum + totalContribution);
    }

    return minSum;
}

function sumSubarrayMaxs(a: number[]): number {
    const n: number = a.length;

    if (n === 0) return 0;
    if (n === 1) return a[0];

    let maxSum: number = 0;

    let prevGreaterElementIndex: number[] = Array(n);
    let nextGreaterElementIndex: number[] = Array(n);

    let nextGreaterStack = new myStack();
    for (let i = (n - 1); i >= 0; i--) {
        while ((!nextGreaterStack.isEmpty()) && (a[nextGreaterStack.top()] <= a[i])) nextGreaterStack.pop();

        nextGreaterElementIndex[i] = (nextGreaterStack.isEmpty()) ? n : nextGreaterStack.top();

        nextGreaterStack.push(i);
    }


    let prevGreaterStack = new myStack();
    for (let i = 0; i < n; i++) {
        
                                                   // same corner case applied
        while ((!prevGreaterStack.isEmpty()) && (a[prevGreaterStack.top()] < a[i])) prevGreaterStack.pop();

        prevGreaterElementIndex[i] = (prevGreaterStack.isEmpty()) ? -1 : prevGreaterStack.top();

        prevGreaterStack.push(i);
    }

    for (let i = 0; i < n; i++) {
        const contributionsFromLeft: number = (i - prevGreaterElementIndex[i]);
        const contributionsFromRight: number = (nextGreaterElementIndex[i] - i);
        const totalContribution: number = (contributionsFromLeft * contributionsFromRight) * a[i];

        maxSum = maxSum + totalContribution;
    }

    return maxSum;
}

function subArrayRanges(a: number[]): number {
    const n: number = a.length;

    if (n === 0) return 0;
    if (n === 1) return 0;  // single element is max and min both so ele - ele = 0

    const rangeSum: number = sumSubarrayMaxs(a) - sumSubarrayMins(a);

    return rangeSum;
};