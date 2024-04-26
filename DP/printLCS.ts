/* Print the LCS now,

here I am printing any one of the possible LCS
let s1: string = "abc";
let s2: string = "adc";

             a b c
           0 0 0 0
         a 0 1 1 1
         d 0 1 1 1
         c 0 1 1 2



TC: O(len1 * len2)
SC: O(len1 * len2)

Approach:
- make the tabulation DP first of size dp[m][n]
- start BACKTRACKING from the bottom right element of the matrix
- create a string ans of length = dp[m][n] since, its the length of LCS
- on dp[i][j], check: 
- when s1[i-1] === s2[j-1], append it to ans so that ans remains in correct order, ans = s1[i-1] + ans;
- if there is no equality, just decide for the direction of iteration, either left or top
- when dp[i-1][j] > dp[i][j-1], iterate towards dp[i-1][j]
- when dp[i-1][j] < dp[i][j-1], iterate towards dp[i][j-1]  */

function printAnyLcs(s1: string, s2: string): string {
  let ans: string = "";
  let dp: number[][] = Array(s1.length + 1)
    .fill(null)
    .map(() => Array(s2.length + 1).fill(0));

  // fill the DP array first
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j];
      else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // backtrack the dp array to get the lcs string
  let i: number = s1.length;
  let j: number = s2.length;
  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      ans = s1[i-1] + ans;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return ans;
}

/* Print the LCS now,

if there are any two 


let s1: string = "abcde";
let s2: string = "adcbe";




        a b c d e
      0 0 0 0 0 0
    a 0 1 1 1 1 1
    d 0 1 1 1 2 2
    c 0 1 1 2 2 2
    b 0 1 2 2 2 2
    e 0 1 2 2 2 3 

    left -> e
    rigt -> e

*/

// UNDERSTAND THIS CODE

function printAllLCS(s1, s2, dpTable) {
    const allLCS = [];

    // Recursive function to backtrack and find all LCS
    function backtrack(i, j, lcs) {
        if (i === 0 || j === 0) {
            // If one of the strings is empty, add the current LCS to the list
            allLCS.push(lcs.reverse().join(''));
            return;
        }

        if (s1[i - 1] === s2[j - 1]) {
            // If characters match, add current character to LCS and move diagonally
            lcs.push(s1[i - 1]);
            backtrack(i - 1, j - 1, lcs);
            lcs.pop(); // Backtrack
        } else {
            // If characters don't match, explore left and up directions
            if (dpTable[i][j - 1] >= dpTable[i - 1][j]) {
                backtrack(i, j - 1, lcs.slice());
            }
            if (dpTable[i - 1][j] >= dpTable[i][j - 1]) {
                backtrack(i - 1, j, lcs.slice());
            }
        }
    }

    // Start backtracking from the bottom-right corner
    backtrack(s1.length, s2.length, []);

    // Print all found LCS
    allLCS.forEach(lcs => console.log(lcs));
}

// Input strings and DP table
const s1 = "abcde";
const s2 = "adcbe";
const dpTable = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 2, 2],
    [0, 1, 1, 2, 2, 2],
    [0, 1, 2, 2, 2, 2],
    [0, 1, 2, 2, 2, 3]
];

// Call function to print all LCS
printAllLCS(s1, s2, dpTable);
