/* Shortest common supersequence: get the length of scs and also print it
    Input:   str1 = "geek",  str2 = "eke"        Output: 5
    Explanation: String "geeke" has both string "geek" and "eke" as subsequences.

Logic: (Length of SCS)

    geek and eke has lcs as ek
    geek.length() = 4
    eke.length() = 3
    lcs.length() = 2

    include longest common subsequence in the ans just once since it is commom to both the strings

    supersequence length = 4 + 3 - 2 = 5 = geeke.length()

Logic: (print the SCS)

    - get the LCS tabulation dp table  (m*n matrix), so row = s1, column = s2
    - backtrack from dp[m][n] and initialise the ans string, choose any direction to backtrack if we have dp[i-1][j] = dp[i][j-1]
      I choose top direction here
    - whenever chars are equal, include any one and prepend to the start of the ans string
    - whenever chars are unequal, we need to observe a little, we know that while making dp[][], s1 = row and s2 = column
    - now, if(dp[top] >= dp[left]), we backtrack top, hence the row char will be left out, since row is represented
      via s1, so prepend s1[i-1] to ans
    - if(dp[left] > dp[top]), we backtrack left, hence column char will be left out, column is represented via s2,
      so prepend s2[j-1]
    - if any one of the string gets exhausted, keep adding the other strings character since this time its not about
      finding the common subsequence, its about getting supersequence


        g e e k
      0 1 2 3 4
    0 0 0 0 0 0
  e 1 1 0 1 1 1
  k 2 0 0 1 1 2
  e 3 0 0 1 2 2


*/

function fillDpTable(s1: string, s2: string): number[][] {
    let dp: number[][] = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(0));

    for(let i = 1; i <= s1.length; i++) {
        for(let j = 1; j<= s2.length; j++) {
            if(s1[i-1] === s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
            else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    return dp;
}

function findSCSlength(s1: string, s2: string): number {
    let dp: number[][] = fillDpTable(s1,s2);
    return (s1.length + s2.length - dp[s1.length][s2.length]);
}

function getSCS(s1: string, s2: string): string {
  let ans: string = "";

  let dp: number[][] = fillDpTable(s1, s2);

  let i: number = s1.length;
  let j: number = s2.length;
  while (i > 0 && j > 0) {
    // if equal, add any one of both to ans
    if (s1[i - 1] === s2[j - 1]) {
      ans = s1[i - 1] + ans;
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      ans = s1[i - 1] + ans;
      i--;
    } else {
      ans = s2[j - 1] + ans;
      j--;
    }
  }

  while (j > 0) {
    ans = s2[j - 1] + ans;
    j--;
  }

  while (i > 0) {
    ans = s1[i - 1] + ans;
    i--;
  }

  return ans;
}