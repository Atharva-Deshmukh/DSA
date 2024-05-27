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
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
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

/* Print ALL possible LCS,

let s1: string = "abcde";
let s2: string = "adcbe";

here there are 3 LCS: 
"abe"
"ace"
"ade"

        a b c d e
      0 0 0 0 0 0
    a 0 1 1 1 1 1
    d 0 1 1 1 2 2
    c 0 1 1 2 2 2
    b 0 1 2 2 2 2
    e 0 1 2 2 2 3 

  Use recursion to explore all possibilities

TC: O(len1 * len2)
SC: O(len1 * len2)

To print in lexicographical order, use Array.from(set),
sort this array
clear the set
add all elements of the array in the set

*/

function fillDpArray(s1: string, s2: string): number[][] {
  let dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(0));

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp;
}

function printAllLCS(s1: string, s2: string) {
  let dp: number[][] = fillDpArray(s1, s2);
  const allLCS = new Set<string>()

  function backtrack(i: number, j: number, lcs: string) {
    if (i === 0 || j === 0) {
      allLCS.add(lcs);
      return;
    }

    // if there is a match, add the char & traverse diagonally left
    if (s1[i - 1] === s2[j - 1]) {
      lcs = s1[i - 1] + lcs;
      backtrack(i - 1, j - 1, lcs.slice());
    } else {
      // if top and left matches, consider both possibilites and find for more LCS
      // By using lcs.slice(), we create a new copy of the lcs string for each recursive call, 
      // ensuring that modifications made in one call do not affect the other calls.
      if (dp[i][j - 1] === dp[i - 1][j]) {
        backtrack(i, j - 1, lcs.slice());
        backtrack(i - 1, j, lcs.slice());
      }
      // if left > top, just traverse left
      if (dp[i][j - 1] > dp[i - 1][j]) {
        backtrack(i, j - 1, lcs.slice());
      }
      // if top > left, just traverse top
      if (dp[i - 1][j] > dp[i][j - 1]) {
        backtrack(i - 1, j, lcs.slice());
      }
    }
  }

  backtrack(s1.length, s2.length, "");

  allLCS.forEach((lcs) => console.log(lcs));
}


const s1 = "abcde";
const s2 = "adcbe";

printAllLCS(s1, s2);
