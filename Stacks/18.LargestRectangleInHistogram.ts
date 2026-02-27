/* 84. Largest Rectangle in Histogram 

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, 
return the area of the largest rectangle in the histogram.

Input: heights = [2,1,5,6,2,3]      -->     Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the marked area, which has an area = 10 units.

          |
      |   |
      |   |
      |   |       |
|     |   |   |   |
|  |  |   |   |   |
--------------------

          |
    ---------
      |   |
      |   |
      |   |       |         -> (5 * 2) = 10 since two pillars are involved each of length 5
|     |   |   |   |
|  |  |   |   |   |
--------------------

Input: heights = [2,4]      Output: 4

    |
    |
|   |
|   |
--------

    |
    |
-----
|   |       --> 2 * 2 = 4
|   |
--------

Constraints:
    1 <= heights.length <= 10 ^ 5
    0 <= heights[i] <= 10 ^ 4

Approach: Brute Force
- Iterate each element from 0 -- (n - 1) and for each element, iterate left and right, and get the area.
  Keep track of max area till now.
  U can go left and right only until left and right elements are CONSEQUTIVELY 
  greater than or equal to the current element, since its a histogram, which is continous

                                            i = 0: a[i] = 2

2 don't have greater element in left and right so area = (2 * 1) = 2
MAX_AREA = 2

          |
      |   |
      |   |
      |   |       |
|     |   |   |   |
|  |  |   |   |   |
--------------------
2  1  5   6   2   3

                                            i = 1: a[i] = 1

1 have greater elements on left and right 
area = (1 * 1) + (1 * 5) = 6
MAX_AREA = 6

          |
      |   |
      |   |
      |   |       |
|     |   |   |   |
-------------------
|  |  |   |   |   |
--------------------
2  1  5   6   2   3

                                            i = 2: a[i] = 5

5 have only 1 element greater on right consequtively
area = (5 * 2) = 10
MAX_AREA = 10

          |
      -----
      |   |
      |   |
      |   |       |
|     |   |   |   |
|  |  |   |   |   |
--------------------
2  1  5   6   2   3


                                            i = 3: a[i] = 6

No greater elements consequtively on left and right
area = (6 * 1) = 6
MAX_AREA = 10

          |
          -
      |   |
      |   |
      |   |       |
|     |   |   |   |
|  |  |   |   |   |
--------------------
2  1  5   6   2   3

                                            i = 4: a[i] = 2

2 have greater elements in left and right 
so area = (2 * 2) + (2 * 2) = 8
MAX_AREA = 10

          |
      |   |
      |   |
      |   |       |
      -------------
|     |   |   |   |
|  |  |   |   |   |
--------------------
2  1  5   6   2   3


                                            i = 5: a[i] = 3

3 don't have greater element in left and right so area = (3 * 1) = 3
MAX_AREA = 10

          |
      |   |
      |   |
      |   |       |
|     |   |   |   |
|  |  |   |   |   |
--------------------
2  1  5   6   2   3

TC: O(n^2)
    outer loop 0 --- (n - 1)
    inner loop traverses left (i - 0) + (n - i) = total n each time for each i when all elements 
    are of equal heights.

SC: O(1)

Better Approach: 
- We need to keep track of previous and later greater elements, we can think of using stack here

- Keep the track of next smaller element index and previous smaller element index
  Note: if no pse exists, push -1, and if no nse exists push n (Array size)

  nse and pse because, until we find a smaller element on either side, we will compute the area

- say for a[4] = 2
  nse index = n (index do not exists, push n)
  pse index = 1

  area = a[i] * (nse - pse - 1)


TC: O(2N + N) = O(3N) -> this is a double pass/traversal solution, we need to optimise this
SC: O(2N)

Basically, we are not allowed to precompute and store nse[] and pse[]

We need to visit every element, hence we need a[i] from 0 - n no doubt
But, instead of precomputing pse earlier and then again traversing the whole array is costly in time, 
we can calculate pse on the fly when we traverse array 0 - n
we will just precompute nse

*/

class myStack {
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
        if (!this.isEmpty()) {
            this.poppedElement = this.stack[this.currentSize - 1];
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if (this.currentSize > 0) return this.stack[this.currentSize - 1];
        else return NaN;
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function nextSmallerElement(a: number[]): number[] {
    let n: number = a.length;

    if(n === 0) return [];
    if(n === 1) return [-1];

    let stack = new myStack();
    let ans: number[] = Array(n);

    for(let i = (n - 1); i >= 0; i--) {
        while((!stack.isEmpty()) && (a[stack.top()] >= a[i])) stack.pop();

        ans[i] = (!stack.isEmpty())? stack.top(): n;

        stack.push(i);
    }

    return ans;
}

function largestRectangleArea(a: number[]): number {
        const n: number = a.length;

    if(n === 0) return 0;
    if(n === 1) return a[0]; // area = element * 1, its height is 1

    const nseIndexArr: number[] = nextSmallerElement(a);  // Precomputed nse
    let pseIndexArr: number[] = Array(n).fill(-1);        // we will compute this on the go
    let res: number = Number.MIN_SAFE_INTEGER;
    let pseStack = new myStack();

    for(let i = 0; i < n; i++) {

        /* pse index computation on the go */
        while((!pseStack.isEmpty()) && (a[pseStack.top()] >= a[i])) pseStack.pop();
        pseIndexArr[i] = (!pseStack.isEmpty())? pseStack.top(): -1;
        pseStack.push(i);

        res = Math.max(res, (a[i] * (nseIndexArr[i] - pseIndexArr[i] - 1)));
    }

    return res;
};