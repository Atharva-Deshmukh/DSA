/* Leetcode 74

You are given an m x n integer matrix matrix with the following two properties:
- Each row is sorted in non-decreasing order
- The first integer of each row is greater than the last integer of the previous row.
  -> means all the next row elements are larger than previous row elements

if target found in matrix -> return true
                     else -> return false

 There are two variations:

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

 - If the first integer of each row is greater than the last integer of the previous row. (leetcode)

    Input: matrix = [
                      [1,3,5,7],
                      [10,11,16,20],
                      [23,30,34,60]
                    ], 
                    target = 3    
    Output: true

    Input: matrix = [
                      [1,3,5,7],
                      [10,11,16,20],
                      [23,30,34,60]
                    ], 
                    target = 13   
    Output: false


-------------------------------------------------------------------------------------------------------------------
NOTE: For problems like LC 240 - seach in 2D matrix-2, the input matrix is row-wise and column-wise sorted,
      There we cannot flatten the matrix into an array, hence there we have something called "Staircase Search"

      This is on low priority as of now, will cover this if asked anytime in any interview
-------------------------------------------------------------------------------------------------------------------

                                                    Way-1: Brute force
                                                    ------------------

- Iterate every row and calculate the no of 1s and update the max 

  TC: O(rows * cols)
  SC: O(1)

                                                  Way-2: GFG Variation Solution
                                                  -----------------------------

- Check the row where the key is supposed to be present: a[row][0] <= key <= a[row][col-1]
- Then apply BS on that row only                       

  TC: O(rows) + O(log2(cols)) = O(rows)  --> '+' because we will do inner BS only once when we get the 
                                                 suitable row
  SC: O(1)

                                                  Way-3: LC Variation Solution
                                                  ----------------------------

- Here first element of the next row is always greater than the last element of the previous row
- It means, if we flatten the matrix into a single array, then that array will be sorted

matrix = [
           [1,3,5,7],
           [10,11,16,20],                     --> [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60]
           [23,30,34,60]
         ],         

- So we can think of flattening this whole matrix so that the entire rows and columns are converted to 
  a single flattened[]
  And then we can directly apply BS over this flattened[]

- But, if we actually flatten[] this matrx, we require space to store it (SC = O(m*n)) and in doing so, 
  we will take
  TC = O(m * n) = Brute force

- So, we have to simulate the flattening of the matrix into 1D array, 
  by converting the 2D coordinates --> 1D indices

  OBSERVATION HERE:
  -----------------

  matrix = [
            [1,3,5,7],
            [10,11,16,20],                                     16 = mat[1][2]
            [23,30,34,60]
          ], 
                 0  1  2  3  4   5   6    7   8  9   10  11
  flattened[] = [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60]    16 = 6

  cols = 4,

  FORMULA => x-coordinate = 1D_Index / no_of_cols   => 6 / 4 = 1
             y-coordinate = 1D_Index % no_of_cols   => 6 % 4 = 2

  We will be applying BS on input matrix assuming it to be a flattened array -> 
  hence we try to find x and y coordinates in our code

TC: O(log2(m*n))
SC: O(1) */

function standardBinarySearch(arr: number[], key: number): boolean {
  let low: number = 0;
  let high: number = arr.length - 1;

  while (low <= high) {
      let mid: number = low + Math.floor((high - low) / 2);

      if (arr[mid] === key) {
          return true;
      } else if (arr[mid] < key) {
          low = mid + 1;
      } else {
          high = mid - 1;
      }
  }

  return false;
}

function searchMatrix_GFG_Variation(mat: number[][], key: number): boolean {
  let rows: number = mat.length;

  if (rows === 0) return false;  // empty matrix

  let cols: number = mat[0].length;

  if (rows === 1 && cols === 1 && mat[0][0] === key) return true;

  for (let i = 0; i < rows; i++) {

    /* Do BS only if key may lie in that row, dont do BS for all rows */
    if((key >= mat[i][0]) && (key <= mat[i][cols - 1])) {
      if(standardBinarySearch(mat[i], key)) return true;
    }
  }

  return false;
};

function matCoord(index: number, cols: number): number[] {
    return [Math.floor(index / cols), Math.floor(index % cols)];
}

function searchIn2DMat_LC_Variation(mat: number[][], key: number): boolean {
  let rows: number = mat.length;

  if(rows === 0) return false;  // empty matrix

  let cols: number = mat[0].length;

  /* If matrix has only one element */
  if((rows === 1 && cols === 1) && (mat[0][0] === key)) return true;

  /* If the key lies entirely out of the matrix */
  if((key < mat[0][0]) || (key > mat[rows - 1][cols - 1])) return false;

  /* BS on an IMAGINED flattened[] */
  let low: number = 0;
  let high: number = (rows * cols) - 1;

  while(low <= high) {
    let mid: number = low + Math.floor((high - low) / 2);
    let [x, y] = matCoord(mid, cols);

    if(mat[x][y] === key) return true;
    else if(mat[x][y] < key) low = mid + 1;
    else if(mat[x][y] > key) high = mid - 1;
  }

  return false;
}