/* 73. Set Matrix Zeroes

Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
You must do it in place.


1 1 1        1 0 1
1 0 1   -->  0 0 0
1 1 1        1 0 1

0 1 2 0         0 0 0 0
3 4 5 2   -->   0 4 5 0
1 3 1 5         0 3 1 0

Constraints:

m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-2^31 <= matrix[i][j] <= 2^31 - 1

Way-1: Brute
- Iterate whole matrix element by element
- If mat[i][j] == 0, convertRowToZero(rowNum), convertColToZero(colNum)

TC: O(m * n) * (m + n) --> n^3
SC: O(1)

Way-2: Better
- We were repeatedly marking mat[i][j] = 0, we can optimise it using two separate hashes
- Maintain separate hashes isRowMarked[m] and isColMarked[n]
 
TC: O(m * n) + O(m + n) --> n^2
SC: O(m + n)  --> hash will store full row and full column

Way-3: Most Optimal. 
- We need to traverse full matrix anyways, so TC cannot be better than O(m * n)
  But we can reduce SC -> O(1) by maintaining hash in the same matrix

  1 1 1 1   --> colHash
  1 0 1 1
  1 1 0 1
  0 1 1 1
  |
  rowHash

  First row = colHash
  First col = rowHash

  NOTE: mat[0][0] = overlapping, single element representing two states
        So, colHash starts from mat[0][1] - mat[0][m-1]
        the mat[0][0] = col1 variable (a single element is being handled now by a variable)

  col0 = 1
  1 ] [1 1 1]   --> colHash
  1 ] 0 1 1
  1 ] 1 0 1
  0 ] 1 1 1
  |
  rowHash

  
  Now, First iteration: Iterate whole matrix, including hashed row and cols, 
  whenever We find a 0 element, mark the 1st element of that row and column = 0 -> to 
  mark that we have zero here

  Now, iterate from a[m-1][n-1] to row = 1 and col = 1. Do not start from hash row and col since
  changing them will impact other transformations, change them in last

  Once all rows and cols other than hashes done, first solve the rowHash and then colHash 
  as rowHash is dependent on colHash */

function setZeroes(matrix: number[][]): void {
    const m: number = matrix.length;
    const n: number = matrix[0].length;

    /* Represents a[0][0] colHash */
    let col0: number = 1;

    /* Iterate all the elements and mark the hashes if found any 0 */
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if(matrix[i][j] === 0) {
                matrix[i][0] = 0;                       // colHash

                if(j === 0) col0 = 0;
                else if(j !== 0) matrix[0][j] = 0;      // rowHash
            }
        }
    }

    /* Iterate without hash elements - we can iterate in any order (straight or reverse) */
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            
            /* Mark the elements if rowHash or colHash any one of them is 0 marked. */
            if((matrix[i][0] === 0) || (matrix[0][j] === 0)) matrix[i][j] = 0;
        }
    }

    /* Now mark the hash col and row, starting with rowHash 

        1 ] [1 1 1]   --> colHash
        1 ] 0 1 1
        1 ] 1 0 1
        0 ] 1 1 1
        |
        rowHash

        firstRow = rowHash whole row is 0 if a[0][0] = 0 since we are maintaining rowHash in vertical

        Similarly, whole first column is 0 if col0 = 0, since we store colHash horizontally, and we used 
        col0 for 1st element
    
    */

    if(matrix[0][0] === 0) for(let j = 1; j < n; j++) matrix[0][j] = 0;
    if(col0 === 0) for(let i = 1; i < m; i++) matrix[i][0] = 0;
}