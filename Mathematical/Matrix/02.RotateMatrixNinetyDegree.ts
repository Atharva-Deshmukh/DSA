/* 
Leetcode: 48. Rotate Image (Rotate clockwise  90 Degrees)

00 01 02
10 11 12
20 21 22

20 10 00
21 11 01
22 12 02

Shifts Index-wise
00 -> 02
01 -> 12
02 -> 22

10 -> 01
11 -> 11
12 -> 21

20 -> 00
21 -> 10
22 -> 20

Pattern -> 

new i = j
new j = ((n - 1) - i)

Way-1: 
- Create a new matrix to store answer and iterate original matrix
  newMatrix[j][((n - 1) - i)] = inputMatrix[i][j]

Way-2: In-place. Memorise this trick
- There are some observations

1 2 3        7 4 1
4 5 6   -->  8 5 2
7 8 9        9 6 3

1st column of old matrix = 1st row and reverse of new matrix

Trick -> Transpose original matrix and then reverse each row

1 2 3        1 4 7         7 4 1 
4 5 6   -->  2 5 8   -->   8 5 2
7 8 9        3 6 9         9 6 3

Original    Transpose    Rev each row 

TC: O(m * n)
SC: O(1)
*/

function rotateClockWise(matrix: number[][]): void {
    
    const n: number = matrix.length; // we know its a square matrix
    
    // transpose of matrix in-place
    for(let i = 0; i < n; i++) {
        for(let j = (i + 1); j < n; j++) {
            [matrix[j][i], matrix[i][j]] = [matrix[i][j], matrix[j][i]];
        } 
    }
    
    // reverse each row now
    for(let i = 0; i < n; i++) {
        matrix[i] = matrix[i].reverse();
    }
} 

/*  Rotate anti-clockwise 90 Degrees

TRICK TO MEMORISE: reverse each row and then take transpose

1 2 3        3 6 9
4 5 6   -->  2 5 8
7 8 9        1 4 7

1 2 3        3 2 1       3 6 9
4 5 6   -->  6 5 4  -->  2 5 8  
7 8 9        9 8 7       1 4 7 */

function rotateAntiClockWise(matrix: number[][]): void {
    
    const n: number = matrix.length; // we know its a square matrix

    // reverse each row now
    for(let i = 0; i < n; i++) {
        matrix[i] = matrix[i].reverse();
    }
    
    // transpose of matrix in-place
    for(let i = 0; i < n; i++) {
        for(let j = (i + 1); j < n; j++) {
            [matrix[j][i], matrix[i][j]] = [matrix[i][j], matrix[j][i]];
        } 
    }
} 