/* 85. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing 
only 1's and return its area.

Input: matrix = [
                    ["1","0","1","0","0"],
                    ["1","0","1","1","1"],
                    ["1","1","1","1","1"],
                    ["1","0","0","1","0"]
                ]
Output: 6
Explanation: The maximal rectangle is 
[1, 1, 1]
[1, 1, 1]


Input: matrix = [["0"]]         Output: 0

Input: matrix = [["1"]]         Output: 1
 

Constraints:
    rows == matrix.length
    cols == matrix[i].length
    1 <= rows, cols <= 200
    matrix[i][j] is '0' or '1'.

Approach:
- Its actually a DP problem, we need to recurse every side of every cell to get max value.
  But this can be done using largest rectangle in histogram concept also

["1","0","1","0","0"]               1     1
["1","0","1","1","1"]        -->    1     1  1  1     1s -> see the histograms here with width 1
["1","1","1","1","1"]               1  1  1  1  1
["1","0","0","1","0"]    

We need to do this for each row.
But, if we get the height of histogram each time, this will lead to O(n) TC.

We can modify the same matrix from top to bottom using prefix[] concept,
whenever there is 0, just keep it 0, don't include it,
we need to know the number of 1s to keep track of height

prefix[] after modifying the same input matrix, in case if we have 0 or 1, since
we have string matrix, need a separate prefix[][]

[ 1 , 0 , 1 , 0 , 0 ] 
[ 2 , 0 , 2 , 1 , 1 ]  
[ 3 , 1 , 3 , 2 , 2 ]      
[ 4 , 0 , 0 , 3 , 0 ]   

Now for each row, we have the histogram like array that we can pass to calculate max area in histogram


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

function maximalRectangle(m: string[][]): number {
    let maxArea: number = Number.MIN_SAFE_INTEGER;
    const rows: number = m.length;
    const cols: number = m[0].length;

    if((rows === 1) && (cols === 1)) return Number(m[0][0]);

    let prefixMat: number[][] = Array(rows).fill(0).map(row => Array(cols).fill(0));

    for(let j = 0; j < cols; j++)  {
        for(let i = 0; i < rows; i++) {

            /* First row will be filled as it is, further rows will be prefixCalculated ones */
            if(i === 0) prefixMat[i][j] = (m[i][j] === '0')? 0: 1; 
            else prefixMat[i][j] = (m[i][j] === '1')? prefixMat[i - 1][j] + Number(m[i][j]): 0; 
        }
    }

    for(const rowArr of prefixMat) maxArea = Math.max(maxArea, largestRectangleArea(rowArr));

    return maxArea;
};

/* 
      prefix[]        i     largest histogram
TC: O(row * cols) + O(rows * (2 * Cols))

        prefix[]        stack
SC: O(rows * cols) + O(cols)

*/