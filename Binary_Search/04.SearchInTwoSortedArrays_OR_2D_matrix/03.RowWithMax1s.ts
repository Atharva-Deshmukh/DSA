/* Leetcode 2643 does not mention that rows are sorted in ascending order, but GFG does

Hence we will use both brute force and Binary search

Given a m x n binary matrix mat, find the 0-indexed position of the row that contains the maximum count of ones, 
and the number of ones in that row. Every row in the matrix will be sorted.
In case there are multiple rows that have the maximum count of ones, the row with the smallest row number 
should be selected.
Return an array containing the index of the row, and the number of ones in it.

Input: mat = [[0,1],[1,0]]                              Output: [0,1]
Both rows have the same number of 1's. So we return the index of the smaller row, 0, 
and the maximum count of ones (1). So, the answer is [0,1]. 

Input: mat = [[0,0,0],[0,1,1]]                          Output: [1,2]
The row indexed 1 has the maximum count of ones (2). So we return its index, 1, and the count. 
So, the answer is [1,2].

Input: mat = [[0,0],[1,1],[0,0]]                        Output: [1,2]
The row indexed 1 has the maximum count of ones (2). So the answer is [1,2].

                                        Way-1: BRUTE FORCE
                                        ------------------

- Iterate every row and calculate the no of 1s and update the max 

TC: O(rows * cols)
SC: O(1)    */

function rowWithMax1sBruteForce(a: number[][]): number[] {

    const rows: number = a.length;
    const cols: number = a[0].length;
    let max1s: number = Number.MIN_SAFE_INTEGER;
    let rowNum: number = Number.MAX_SAFE_INTEGER;
    let countOf1ForRow: number = 0;

    for(let i = 0; i < rows; i++) {

        countOf1ForRow = 0;

        for(let j = 0; j < cols; j++) {
            if(a[i][j] === 1) countOf1ForRow++;
        }

        /* If count is STRICTLY greater, only then update the max1s and rowNums - this will ensure 
           first value is returned in case of equal counts
        */
        if(countOf1ForRow > max1s) {
            max1s = countOf1ForRow;
            rowNum = i;
        }
    }

    return [rowNum, max1s];
}

/* In case the rows are sorted, we can think of binary search in the function that counts 1s 

            0  1  2  3  4
   let a = [0, 0, 1, 1, 1]   -->  count of 1s = 3

   Its simple, if mid === 1, explore smaller possible index
               else move ahead

   at last return (a.length - smallestPossibleIndex)

TC: O(rows * log(cols))
SC: O(1)
  
*/
function count1sBS(row: number[]): number {
    let rowLen: number = row.length;
    let first1sIndex: number = Number.MAX_SAFE_INTEGER;

    let low: number = 0;
    let high: number = rowLen - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        if (row[mid] === 1) {
            first1sIndex = mid;   /* Explore smaller possibilities */
            high = mid - 1;
        }
        else low = mid + 1;
    }

    return (rowLen - first1sIndex);
}


