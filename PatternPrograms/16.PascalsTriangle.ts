/*
    1 
   1 1 
  1 2 1 
 1 3 3 1 
1 4 6 4 1 

Pattern (n = 5)

VERY NAIVE WAY:
- rows = n
- elementsPerRow = rowNum
- Each row starts and ends with 1, so row 1 = [1] row 2 = [1, 1]
- for each row, we need to calculate middle elements
- for row 3 => row3[1] = row2[0] + 1
- row4[1] = row3[0] + row3[1]
  row4[2] = row3[1] + row3[2]

- row5[1] = row4[0] + row4[1]
  row5[2] = row4[1] + row4[2]
  row5[3] = row4[2] + row4[3] 

LITTLE MATHS
    - The pascal's triangle can be constructed from the binomial coefficients itself

                                        1                  1
                                       1 1              1c0 1c1
                                      1 2 1            2c0 2c1 2c2
                                     1 3 3 1         3c0 3c1 3c2 3c3
                                    1 4 6 4 1      4c0 4c1 4c2 4c3 4c4
*/

function ncr(n, r) {
  const mod = 1e9 + 7;

  // Corner case
  if (n < r) return 0;

  // Optimize by calculating the smaller value
  if ((n - r) < r) r = n - r;

  const dpLen = r + 1;
  const dp = Array(dpLen).fill(0);
  dp[0] = 1; // First element of each row in Pascal's triangle = 1

  for (let row = 2; row <= (n + 1); row++) {
      // Iterate backwards and fill dp[]
      for (let i = dpLen - 1; i >= 0; i--) {
          if (i - 1 >= 0) {
              dp[i] = (dp[i] + dp[i - 1]) % mod;
          }
      }
  }

  return dp[dpLen - 1];
}

function pascalsTriangle(n: number) {
  let patRow: string = '';

  for(let row = 1; row <= n; row++) {
      patRow = '';

      if(row === 1) patRow += ' 1';
      else {
        let N: number = (row - 1);
        for(let r = 0; r < row; r++) patRow += ' ' + ncr(N, r);
      }

      console.log(patRow);
  }
}

/* VARIATIONS:
Input: n = 5
Output: [1, 4, 6, 4, 1]
Explanation: 5th row of pascal's triangle is {1, 4, 6, 4, 1}.

                                          1 
                                          1 1 
                                          1 2 1 
                                          1 3 3 1 
                                          1 4 6 4 1 

- We can use same dp[], just with some minor changes
- dp[] = [1] // to simulate row1
- for new row, we will push 0 to prev row dp[] and use dp[i] = dp[i] + dp[i - 1]

DRY RUN
dp[] = [1];  // row1 covered here itself

row2
  dp.push(0) = [1, 0]
  dp[1] of row2 = (dp[1] + dp[0]) of row1 = [1, 1]

row3
  dp.push(0) = [1, 1, 0]
  loop dp[i] = dp[i] + dp[i - 1] = [1, 2, 1]
.
.
.
row (n + 1)

*/

function nthRowPascalTriangle(n: number): number[] {
  if(n <= 0) return [0];
  if(n === 1) return [1];

  let nthRow: number[] = [1];

  for(let row = 2; row <= n; row++) {
    // push 0 in previous row
    nthRow.push(0);

    // get new length
    let len: number = nthRow.length;

    for(let i = (len - 1); i >= 1; i--) {
      if((i - 1) >= 0) nthRow[i] = nthRow[i] + nthRow[i - 1];
    }

  }

  return nthRow;
}