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


In place algo only works for square matrix */

function transpose(matrix: number[][]): number[][] {
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