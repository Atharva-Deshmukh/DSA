/* 861. Score After Flipping Matrix

You are given an m x n binary matrix grid.

A move consists of choosing any row or column and toggling each value in that row
or column ( all 0's -->  1's, and all 1's -->  0's).
Every row of the matrix is interpreted as a binary number, and the score of the 
matrix is the sum of these numbers.
Return the highest possible score after making any number of moves (including zero moves).


Input: grid = [
                [0,0,1,1],
                [1,0,1,0],       Output: 39
                [1,1,0,0]
              ]      
                
Explanation:  [
                [0,0,1,1],
                [1,0,1,0],        
                [1,1,0,0]
              ] 

              [
                [1,1,0,0],
                [1,0,1,0],   
                [1,1,0,0]
              ] 

              [
                [1,1,1,0],
                [1,0,0,0],   
                [1,1,1,0]
              ] 

              [
                [1,1,1,1],
                [1,0,0,1],   
                [1,1,1,1]
              ] 


1111 + 1001 + 1111 = 15 + 9 + 15 = 39

Input: grid = [[0]]              Output: 1
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 20

Thought Process + BruteForce:
- In any number, say 7 (0111), we need to flip if MSB contains 0, since we need to maximise,
  hence flip to row if MSB contains 0
- Similary, flip the column if it has more 0s than 1s
- Now, how to convert a row to decimal:
   3  2  1  0   <- 2's powers
  [1, 1, 1, 0]  <- rows

  So, if(row[0][j] === 1) num += Math.pow(2, (cols - k - 1));

This solution actually modifies the original matrix

TC: O(r * c) + O(r * c)
SC: O(1) */

function matrixScoreBruteForce(mat: number[][]): number {
    let r: number = mat.length;
    let c: number = mat[0].length;

    // corner case
    if((r === 1) && (c === 1)) return 1;

    let score: number = 0;

    // flip the whole row if MSB is 0
    for(let i = 0; i < r; i++) {
        if(mat[i][0] === 0) for(let j = 0; j < c; j++) mat[i][j] = 1 - mat[i][j];
    }

    // flip the column if 0s > 1s
    if (r > 1) {

      let ones: number = 0; // zeros will be (r - ones) automatically
      for (let j = 0; j < c; j++) {

        ones = 0;
        for (let i = 0; i < r; i++) if(mat[i][j] === 1) ones++;

        if ((r - ones) > ones) {
          for (let i = 0; i < r; i++)
            mat[i][j] === 1 ? (mat[i][j] = 0) : (mat[i][j] = 1);
        }
      }
    }

    // get the final score
    mat.forEach((row) => {
        let rowScore: number = 0;
        row.forEach((ele, index) => {
            if(ele === 1) rowScore += Math.pow(2, (c - index - 1));
        }); 
        score += rowScore;
    });


    return score; 
}

/* WITHOUT CHANGING THE ORIGINAL MATRIX

- First, we were converting all MSBs to 1, so after this operation, col[0] will have all 1s for sure
  directly add the value in score instead of actually flipping.

- Now, after this simulation, the other bits in the row may also have been flipped.
    
                [0,0,1,1],   assumming col[0] are all 1s, so mat[0][1] will be 1 instead of 0, if flip happened
                [1,0,1,0],   mat[1][0] = 1, means no flip happened here, so mat[1][1] = 0 itself
                [1,1,0,0]    So, by taking reference of col[0], we can here itself get no of 0s and 1s

                Once, we have zeroCount & oneCount
                and if zeroCount > oneCount,
                directly interchange the zeroCount and oneCount, since, after flip, they will be swapped, 
                and add this to the score
               


TC: O(r * c)
SC: O(1) */

function matrixScoreOptimised(mat: number[][]): number {
    let r: number = mat.length;
    let c: number = mat[0].length;

    // corner case
    if((r === 1) && (c === 1)) return 1;

    let score: number = 0;

    // Simulate MSB flip to 1 for col[0], all bits are 1 in col[0]
    score += (r * (Math.pow(2, (c - 0 - 1))));

      for (let j = 1; j < c; j++) { // start from col[1] now
        let ones: number = 0; // zeros will be (r - ones) automatically
        for (let i = 0; i < r; i++) {

            // if first col has 0 in this row index, means there must have been a flip, so treat 0 as 1 and 1 as 0
            if((mat[i][0] === 0) && (mat[i][j] === 0)) ones++;
            // else treat the values as they are since there is no flip of row
            else if((mat[i][0] === 1) && (mat[i][j] === 1)) ones++; 
        }

        // instead of flipping columns, swap counts and get score here itself
        let zeros: number = (r - ones);
        if (zeros > ones) {
            [zeros, ones] = [ones, zeros];  // swap to simulate flip of column
        }

        // get the score for every column since we are not changing the original matrix
        score += (Math.pow(2, (c - j - 1)) * ones);

      }

    return score; 
}