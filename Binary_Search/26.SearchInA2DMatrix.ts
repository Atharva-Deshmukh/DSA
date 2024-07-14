/* You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

 There are two variations:
 - If the first integer of each row is greater than the last integer of the previous row. (leetcode)

   Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3    Output: true

   Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13   Output: false

- If the matrix is row-wise column-wise sorted, where the above condition may and may not hold (GFG)

Input: mat[4][4] = { {10, 20, 30, 40},  X = 29
                     {15, 25, 35, 45},
                     {27, 29, 37, 48},
                     {32, 33, 39, 50}
                    }
                     
Output: Found at (2, 1)
Explanation: Element at (2,1) is 29

Input : mat[4][4] = { {10, 20, 30, 40},   X = 100
                      {15, 25, 35, 45},
                      {27, 29, 37, 48},
                      {32, 33, 39, 50}
                    };
     
Output: Element not found
Explanation: Element 100 does not exist in the matrix

LOGIC: Brute force
- Iterate every row and calculate the no of 1s and update the max 

TC: O(rows * cols)
SC: O(1)

BS Approach for GFG scenario, where the next row first element may or may not be greater than previous row element
- We will have to iterate every row, and for each row, check a[row][0] <= key <= a[row][col-1]
- if it lies in this row, then use BS to search in this row itself

TC: O(rows) + O(log2(cols)) = O(rows)  --> '+' because we will do inner BS only once when we get the suitable row
SC: O(1)

BS Approach for LEETCODE scenario, where the next row first element IS greater than previous row element

matrix = [
           [1,3,5,7],
           [10,11,16,20],
           [23,30,34,60]
         ],                           target = 3    Output: true

- We can think of flattening this whole matrix so that the entire rows and columns are converted to a single flattened[]
  And then we can directly apply BS over this flattened[]

- But, if we actually flatten[] this matrx, we require space to store it (SC = O(m*n)) and in doing so, we will take
  TC = O(m * n)

- So, we have to simulate the flattening of the matrix into 1D array, but for that we need to convert 2D coordinates to
  1D indices

- Let's observe something

matrix = [
           [1,3,5,7],
           [10,11,16,20],                                     16 = mat[1][2]
           [23,30,34,60]
         ], 
               0  1  2  3  4   5   6    7   8  9   10  11
flattened[] = [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60]    16 = 6

cols = 4,

FORMULA => rowIndex / cols = x-coordinate      => 6 / 4 = 1
           rowIndex % cols = y-coordinate      => 6 % 4 = 2
 
TC: O(log2(m*n))
SC: O(1)

*/

function matCoord(index: number, cols: number): number[] {
    return [(index / cols), (index % cols)];
}

function searchIn2DMat(mat: number[][], key: number): boolean {
  let rows: number = mat.length;

  if(rows === 0) return false;  // empty matrix

  let cols: number = mat[0].length;

  if((rows === 1 && cols === 1) && (mat[0][0] === key)) return true;
  if((key < mat[0][0]) || (key > mat[rows - 1][cols - 1])) return false;

  // BS on an IMAGINED flattened[]
  let low: number = 0;
  let high: number = (rows * cols);

  while(low <= high) {
    let mid: number = low + Math.floor((high - low) / 2);
    let [x, y] = matCoord(mid, cols);

    if(mat[x][y] === key) return true;
    else if(mat[x][y] < key) low = mid + 1;
    else if(mat[x][y] > key) high = mid - 1;
  }

  // we will never reach here
  return false;
}