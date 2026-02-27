/* 907. Sum of Subarray Minimums

Given an array of integers arr, find the sum of min(b), 
where b ranges over every (contiguous) subarray of arr. 
Since the answer may be large, return the answer modulo 109 + 7.



Input: arr = [3,1,2,4]          -->         Output: 17

Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.
 

Constraints:

1 <= arr.length <= 3 * 10^4
1 <= arr[i] <= 3 * 10^4

WAY-1: BRUTE FORCE
- Genrate all the subarrays and for each subarray count minimum element and simply add it to the result

for(i = 0 ---- (n - 1)) {
    for(j = 0 ---- (n - 1)) {
        res = (res + calculateMin(subarr)) % mod
    }
}

TC: O(n ^ 3)
SC: O(1)

We need to optimise this.

One observation is there. For arr = [3, 1, 2, 4]
Subarrays with their minimum elements
3 -> [3]                                       -> 3 is min in 1 subArrs -> 3's contribution = 3 * 1 = 3
1 -> [1], [1, 2], [1, 2, 4], [3, 1, 2, 4]      -> 1 is min in 3 subArrs -> 1's contribution = 1 * 6 = 6
     [3, 1], [3, 1, 2]
2 -> [2], [2, 4]                               -> 2 is min in 2 subArrs -> 2's contribution = 2 * 2 = 4
4 -> [4]                                       -> 4 is min in 1 subArrs -> 4's contribution = 4 * 1 = 4

                                                                                                --------
                                                                                                Total-17


We just need to in how many subarrays the a[i] is minimum element.
then contribution = (count * a[i])

[1, 4, 6, 7, 3, 7, 8, 1]
 0  1  2  3  4  5  6  7
 
 Now, here, to get subarrays where 3 is min, we need to avoid next smaller elements from 3
 and previous smaller elements from 3

 a[4] = 3
 a[7] = 1

 elements Greater than or equal to 3 on right side -> 7 - 4 = 3         (3, 7, 7)
 similarly, elements greater than or equal to 3 on left -> 4 - 0 = 4    (3, 7, 6, 4)

 Total subarrays with 3 as minimum combining both sides = (3 * 4) = 12

 Better to store the next smaller element indices and the previous smaller element indices

                                                Edge cases:
                                                -----------

- if no smaller element on right, 
  [1, 2, 3, 4] for 2 
   0  1  2  3

   push index as n, minus adjusts accordingly -> 4 - 1 = 3

- if no smaller element on left
  [4, 3, 2, 1] for 2
   0  1  2  3
   
   push index as -1, minus adjusts accordingly -> 2 - (-1) = 3
        

- One little edge case to keep in mind
    
         0  1
arr[] = [1, 1]
nse   =  2  2      -> n because we didn't find one on the right
pse   =  -1 -1     -> -1 because we didn't find one on the left

but, for arr[0], subarrays where 1st 1 is minimum = [1], [1, 1]
and, for arr[1], subarrays where 2nd 1 is minimum = [1], [1, 1] 
[1, 1] is twice!!

so, either include this once in any of the two,
hence in pse[] we store indices of the elements less than or EQUAL TO

*/

class myStack {
    private currentSize: number;
    private stack: number[];
    private minElement: number;

    constructor() {
        this.currentSize = 0;
        this.stack = [];
        this.minElement = Number.MAX_SAFE_INTEGER;
    }

    /* if stack is empty, simply push the current element without modifing and update minimumEle*/
    push(element: number): void {
        if (this.isEmpty()) {
            this.stack[this.currentSize] = element;
            this.minElement = element;
        } else {
            if (element < this.minElement) {
                this.stack[this.currentSize] = 2 * element - this.minElement;
                this.minElement = element;
            } else {
                this.stack[this.currentSize] = element;
            }
        }
        this.currentSize++;
    }

    pop(): void {
        if (this.isEmpty()) return;

        let topElement = this.stack[this.currentSize - 1];

        if (topElement < this.minElement) {
            this.minElement = 2 * this.minElement - topElement;
        }

        this.currentSize--;
        this.stack.length = this.currentSize;

        // if after poppint, stack becomes empty, reset the minimum element
        if (this.isEmpty()) {
            this.minElement = Number.MAX_SAFE_INTEGER;
        }
    }

    top(): number {
        if (this.isEmpty()) return -1;

        let topElement = this.stack[this.currentSize - 1];

        // If the stored value is less than minElement, the actual value is minElement.
        return topElement < this.minElement ? this.minElement : topElement;
    }

    getMin(): number {
        return this.isEmpty() ? -1 : this.minElement;
    }

    isEmpty(): boolean {
        return this.currentSize === 0;
    }
}

function sumSubarrayMins(a: number[]): number {
    const n: number = a.length;

    if (n === 0) return 0;
    if (n === 1) return a[0];

    let minSum: number = 0;
    const mod: number = 1e9 + 7;

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

        minSum = (minSum + totalContribution) % mod;
    }

    return minSum;
};

////////////////////////////////////// SUM OF SUBARRAY MAXIMUM //////////////////////////////////

class myStack {
    private currentSize: number;
    private stack: number[];
    private minElement: number;

    constructor() {
        this.currentSize = 0;
        this.stack = [];
        this.minElement = Number.MAX_SAFE_INTEGER;
    }

    /* if stack is empty, simply push the current element without modifing and update minimumEle*/
    push(element: number): void {
        if (this.isEmpty()) {
            this.stack[this.currentSize] = element;
            this.minElement = element;
        } else {
            if (element < this.minElement) {
                this.stack[this.currentSize] = 2 * element - this.minElement;
                this.minElement = element;
            } else {
                this.stack[this.currentSize] = element;
            }
        }
        this.currentSize++;
    }

    pop(): void {
        if (this.isEmpty()) return;

        let topElement = this.stack[this.currentSize - 1];

        if (topElement < this.minElement) {
            this.minElement = 2 * this.minElement - topElement;
        }

        this.currentSize--;
        this.stack.length = this.currentSize;

        // if after poppint, stack becomes empty, reset the minimum element
        if (this.isEmpty()) {
            this.minElement = Number.MAX_SAFE_INTEGER;
        }
    }

    top(): number {
        if (this.isEmpty()) return -1;

        let topElement = this.stack[this.currentSize - 1];

        // If the stored value is less than minElement, the actual value is minElement.
        return topElement < this.minElement ? this.minElement : topElement;
    }

    getMin(): number {
        return this.isEmpty() ? -1 : this.minElement;
    }

    isEmpty(): boolean {
        return this.currentSize === 0;
    }
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
};