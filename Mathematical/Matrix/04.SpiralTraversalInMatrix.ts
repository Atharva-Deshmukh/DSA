/* 54. Spiral Matrix
Given an m x n matrix, return all elements of the matrix in spiral order.


Input: matrix = [
                 [1,2,3],
                 [4,5,6],
                 [7,8,9]
                ]

Output: [1,2,3,6,9,8,7,4,5]


Input: matrix = [
                  [1,2,3,4],
                  [5,6,7,8],
                  [9,10,11,12]
                ]

Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 

Constraints:
    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 10
    -100 <= matrix[i][j] <= 100

Logic: 
- There is only one logic for this problem and that is optimal one, this question is asked to test implementation

Pattern observed => right -> bottom -> left -> top

       matrix = [
                 [1,2,3],
                 [4,5,6],
                 [7,8,9]
                ]

        mark 4 points
        top = 0   right = m-1
        left = 0  bottom = n-1 

        right -> (left -> right) -> print a[top][j]
        top++ ;
        since next spiral will be tracked from row2, 
        and for bottom traversal a[0][m-1] should not be repeated

        bottom -> (top -> bottom) -> print a[i][right]
        right--; same logic as top++

*/

function spiralTraversal(matrix: number[][]): number[] {
    let res: number[] = [];

    const m: number = matrix.length;
    const n: number = matrix[0].length;

    let top: number = 0;
    let left: number = 0;
    let right: number = (m - 1);
    let bottom: number = (n - 1);

    while ((top <= bottom) && (left <= right)) {

        /* Right, here, left and right are already checked in while, so no if */
        for (let j = left; j <= right; j++) res.push(matrix[top][j]);
        top++;

        /* bottom */
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
        right--;

        /* left */
        /* Top and bottom changes by this time, hence need to check */
        if (top <= bottom) {
            for (let j = right; j >= left; j--) res.push(matrix[bottom][j]);
            bottom--;
        }

        /* up */
        if (left <= right) {
            for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
            left++;
        }

    }

    return res;
}