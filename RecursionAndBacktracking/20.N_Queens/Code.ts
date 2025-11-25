/* Leetcode 51. N-Queens

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two 
queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer 
in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' 
both indicate a queen and an empty space, respectively.

Ex: 

Input: n = 4
Output: 
[
    [., Q, ., .],
    [., ., ., Q],
    [Q, ., ., .],
    [., ., Q, .]
]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

Input: n = 1
Output: [
            ["Q"]
        ]

Logic:

- Think in terms of columns.
- Place one queen in each column, and try taking it down below - Refer Image.
- Use backtracking to explore all possible placements of queens row by row.
- Bactracking means, when recursion moves upwards after completion of path, we revert the changes made
  while going upwards.

  TC: O(N! * N), 

  At most, in:

    Column 0: you try up to n rows
    Column 1: for each valid queen in column 0, you try up to n - 1 rows
    Column 2: up to n - 2 rows
    Column n - 1: 1 choice

    T(n) = n * (n - 1) * (n - 2) * ... * 1 = O(n!)

    isSafe function takes O(N) time to check whether a queen can be placed at a given position or not.

  Hence total TC = O(N! * N)

  SC: O(N ^ 2) due to the board + call stack is O(n)

  Optimisation: We can use hashing to reduce the isSafe function to O(1) time.
                we mark if col[i] is occupied or not

  TC: O(N!), 
  SC: O(N ^ 2)
*/

function isSafe(mat: string[][], row: number, col: number): boolean {
    let n: number = mat.length;

    /* Check this col from upper side - There should not be any queen in this column already */
    for (let i = 0; i < row; i++)
        if (mat[i][col] === 'Q') return false;

    /* Check left side */
    for (let j = 0; j < col; j++) 
        if (mat[row][j] === 'Q') return false;

    /* Check upper diagonal on left side don't start from (row, col) since this is where we are placing, check 
       from before it

       *
        *
         *
          *
           Q   
    */
    for (let i = row - 1, j = col - 1; (i >= 0 && j >= 0); (i--, j--))
        if (mat[i][j] === 'Q') return false;

    /* Check lower-left diagonal

                Q
               *
              *
             *
            *
    */
    for (let i = row + 1, j = col - 1; (i < n && j >= 0); (i++, j--))
        if (mat[i][j] === 'Q') return false;

    /* All No's are eliminated now, its safe to place */
    return true;
}

function placeQueens( mat: string[][], col: number, result: string[][]): void {
    let n: number = mat.length;

    /* base case: If all queens are placed, store and return the solution */
    if (col === n) {

        /* Convert current board to string[] like [".Q..", "...Q", "Q...", "..Q."] */
        let board: string[] = mat.map(row => row.join(''));
        result.push(board);

        return;
    }

    /* For each column passed as input to this function, try placing queen at each row one by one */
    for (let i = 0; i < n; i++) {

        // Check if the queen can be placed, place it and move to next column, since only 1 queen can be placed per column
        if (isSafe(mat, i, col) === true) {

            mat[i][col] = 'Q';
            placeQueens(mat, col + 1, result);

            // backtrack - Revert our changes for exploring other paths
            mat[i][col] = '.';
        }
    }
}

function nQueens(n: number): string[][] {
    let mat: string[][] = Array.from({length: n}, () => Array(n).fill('.'));
    let result: string[][] = [];

    placeQueens(mat, 0, result);

    return result;
}

/* Modified Problem: N-Queens II
Given an integer n, return the number of distinct solutions to the n-queens puzzle.

Ex: 

Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.

Input: n = 1
Output: 1

*/

function placeQueens(mat: string[][], col: number, result: { count: number }): void {
    let n: number = mat.length;

    if (col === n) {
        result.count++;
        return;
    }

    for (let i = 0; i < n; i++) {
        if (isSafe(mat, i, col)) {
            mat[i][col] = 'Q';
            placeQueens(mat, col + 1, result);
            mat[i][col] = '.';
        }
    }
}

function totalNQueens(n: number): number {
        let mat: string[][] = Array.from({ length: n }, () => Array(n).fill('.'));
    let result = { count: 0 };

    placeQueens(mat, 0, result);

    return result.count;
};