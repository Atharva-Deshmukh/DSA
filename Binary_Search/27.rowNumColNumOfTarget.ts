/* Just like the previous question with modification in output:

- The matrix is sorted row-wise and col-wise
- The last element of previous row may or may not be greater than the first element of the next row
- Return the row and column number if key is found, else return [-1, -1]

Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: [1, 1]

LOGIC: Brute force
- Iterate every row and calculate the no of 1s and update the max 

TC: O(rows * cols)
SC: O(1)

LOGIC: BS
- Iterate every row and use BS to get target element (check the ranges just like previous problem)

TC: O(rows * log2(cols))
SC: O(1)

MORE OPTIMISATION (OTHER THAN BS):
- We can try by eliminating the regions itself
- denoting (ele) -> standing at ele, let row = 0, col = 4, I can see that the elements below it are increasing (12, 16..)
  and the elements to the left of it are decreasing (7, 4, 1..), I can judge on which side does element 5 lies
  eliminating the below part, i.e, traversing left side since there is the possibility of finding target. 

Lets Dry run
currEle = 11   (rowIndex = 0, colIndex = 3)
    5 is not towards bottom side
    rowIndex = 0, colIndex = 2 (eliminate the right most column itself coz no chance to get target there)

[
  [1, 4, 7, (11)],
  [2, 5, 8, 12],                    --> target = 5
  [3, 6, 9, 16],
]

currEle = 7   (rowIndex = 0, colIndex = 2)
    5 is not towards bottom side
    rowIndex = 0, colIndex = 1 (eliminate the right most column itself coz no chance to get target there)

[
  [1, 4, (7), 11],
  [2, 5, 8, 12],    
  [3, 6, 9, 16],
]

currEle = 4   (rowIndex = 0, colIndex = 1)
    5 is not towards leftside
    rowIndex = 1, colIndex = 1 (eliminate the topmost itself coz no chance to get target there)

[
  [1, (4), 7, 11],
  [2, 5, 8, 12],    
  [3, 6, 9, 16],
]

currEle = 5   (rowIndex = 1, colIndex = 1)
    5 FOUND at  rowIndex = 1, colIndex = 1

[
  [1, 4, 7, 11],
  [2, (5), 8, 12],    
  [3, 6, 9, 16],
]

--------------------------------------
WORST CASE: If target lies at bottom left position, we need to travel from top right to bottom left
In doing so, we are traversing all the rows down and every column left

[
  [, , , X],
  [, , , ],    
  [X, , ,],
]

TC: O(rows + cols)
SC: O(1)  */

function coordinatesOfTarget(mat: number[][], target: number): number[] {
    let rows: number = mat.length;
    if(rows === 0) return [-1, -1];

    let cols: number = mat[0].length;
    if (cols === 0) return [-1, -1];

    // If element lies at the bottom left position, directly return it
    if(target === mat[rows - 1][0]) return [(rows - 1), cols];

    let [x, y] = [(0), (cols - 1)];
    while((x < rows) && (y >= 0)) {
        if(mat[x][y] === target) return [x, y];

        // for matrix with all 1s and target = 2, we will not be able to move anywhere in this case
        if(((rows >= 2) && (cols >=2)) && ((mat[x + 1][y] < target) && (mat[x][y - 1] < target))) return [-1, -1]

        // If current element is smaller than key, it means that col elements behind that are also smaller
        // eliminate this row, move down
        else if(mat[x][y] < target) x = x + 1;

        // If current element is greater than the key, it means the whole cols below it are greater, so 
        // eliminate this whole col, and move left, since there is some possibility of getting target
        else if(mat[x][y] > target) y = y - 1;
    }

    // we will never reach here
    return [-1, -1];
}