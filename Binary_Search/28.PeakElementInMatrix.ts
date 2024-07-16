/* A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors to the left, 
right, top, and bottom. (NOT DIAGONAL)
Given a 0-indexed m x n matrix mat where no two adjacent cells are equal, find any peak element mat[i][j] 
and return the length 2 array [i,j].
You may assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell.
You must write an algorithm that runs in O(m log(n)) or O(n log(m)) time.

Input: mat = [[1,4],[3,2]]          Output: [0,1]

--> Assuming matrix surrounded by -1s
             -1 -1 -1  -1 
             -1  1  4  -1
             -1  3  2  -1
             -1 -1 -1  -1  

Explanation: Both 3 and 4 are peak elements so [1,0] and [0,1] are both acceptable answers.

Input: mat = [[10,20,15],
              [21,30,14],
              [7, 16,32]]
Output: [1,1]
Explanation: Both 30 and 32 are peak elements so [1,1] and [2,2] are both acceptable answers.

LOGIC: (BRUTE FORCE)
- Iterate full matrix.
- For 4 corner elements, there will be separate 4 if()s to check if it is a peak, and return it there itself
- For other elements, iterations continue and based on their positions (first/last row or col), there will be if()s

TC: O(rows * cols)
SC: O(1)

OPTIMISATION: BINARY SEARCH

let mat = [  0  1  2  3  4  5   --> col Index
            [4, 2, 5, 1, 4, 5],
            [2, 9, 2, 2, 3, 2],
            [1, 7, 6, 0, 1, 3],
            [3, 6, 2, 3, 7, 2],
          ]

- We need to avoid traversing every element in order to optimise this.

APPROACH:
- consider traversing column-wise (we can also do this row-wise, either of them is correct)
- use BS low and high for column index --> low = 0, high = 5, mid = 2
- now, from mid row, get the max element 5
                                         2
                                         6  --> (max)
                                         2
   
    See, if 6 is max, its greater than its top and bottom elements in its column, out of left, right, top and bottom,
    we eliminated top and bottom, now left and right remains

    here, if(max > left && max > right) -> return this
    else if(max < right) -> max was largest element in mid col, someone at right of max is even greater than this
    this means our peak may be at right, we can eliminate whole of this current column and move right
    else if(max < left) -> max was largest element in mid col, someone at left of max is even greater than this
    this means our peak may be at left, we can eliminate whole of this current column and move left
   

TC: O(rows * log2(cols)) -> we need to iterate whole rows to get max
SC: O(1) */

function maxInCol(mat: number[][], colIndex: number): number[] {
    let max: number = Number.MIN_SAFE_INTEGER;
    let maxIndex: number = -1;

    for(let rowIndex = 0; rowIndex < mat.length; rowIndex++) {
        if(mat[rowIndex][colIndex] > max) {
            max = mat[rowIndex][colIndex];
            maxIndex = rowIndex;
        }
    }

    return [maxIndex, colIndex];
}

function peakIn2D(mat: number[][]): number[] {
    let rows: number = mat.length;
    if(rows === 0) return [-1, -1];
    let cols: number = mat[0].length;

    // only element is always peak
    if((rows === 1) && (cols === 1)) return [0, 0];

    // if first element is the peak, return it
    if((mat[0][0] > mat[0][1]) && (mat[0][0] > mat[1][0])) return [0, 0];

    // BS on columns
    let low: number = 0;
    let high: number = cols - 1;
    
    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        
        //store coordinates of maxEle of this column
        let [x, y] = maxInCol(mat, mid);
        let maxColEle: number = mat[x][y]; 

        // when we compare left and right values of the mid, we may face overflow if we have <= 2 rows and cols
        // better way is to make left and right as -1 then 
        let left: number = (mid > 0)? mat[x][y - 1]: -1;  // something should be there on left of mid
        let right: number = (mid < cols - 1)? mat[x][y + 1]: -1;  // something should be there on right of mid

        if((maxColEle > left) && (maxColEle > right)) return [x, y];
        else if(maxColEle < left) high = mid - 1;
        else if(maxColEle < right) low = mid + 1;
    }

    // we will never reach here
    return [-1, -1];
}