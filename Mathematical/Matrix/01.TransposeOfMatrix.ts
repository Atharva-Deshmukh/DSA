/* 
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]

Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]


Logic: indexwise visualisation

00 01 02
10 11 12
20 21 22

00 10 20
01 11 21
02 12 22

Way-1:
- Use extra space to store Answer. 
  NOTE: Create answer matrix of n * m instead of m * n, otherwise there will be overflow
- Iterate whole input matrix, and keep putting transposeMat[j][i] = input[i][j];

TC: O(m * n)
SC: O(m * n)

Way-2: In-place
- NOTE: In place algo only works for square matrix (n * n)
- Notice that diagonals are in-place unaffected, only elements around diagonals are swapped
- We have a trick here -> i = 0, j = (i + 1) - MEMORISE this trick

*/

function transposeExtraSpace(matrix: number[][]): number[][] {
    const m: number = matrix.length;
    const n: number = matrix[0].length;

    // transpose result matrix = n * m not m * n
    let res: number[][] = new Array(n).fill(0).map((ele) => new Array(m).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res[j][i] = matrix[i][j];
        }
    }

    return res;
}

/* Memorise this index trick */
function transposeInPlace(matrix: number[][]): number[][] {
    const m: number = matrix.length;
    const n: number = matrix[0].length;

    for(let i = 0; i < n; i++) {
        for(let j = (i + 1); j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    return matrix;
}