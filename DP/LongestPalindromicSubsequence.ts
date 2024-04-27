/* Input: s = "bbbab"
Output: 4
Possibilities: bb, bbb, bab, bbbb

longest palindromic subsequence is "bbbb"

Logic:
- write the input string in reverse order -> babbb
- now get LCS of s and s_rev -> thats the longest palindromic subsequence.
- bbbab  
  babbb
  ans => bbbb

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

function LPS_Tabualation(s1: string): number {
    let s2: string = s1.split("").reverse().join("");
    let dp: number[][] = fillDpTable(s1,s2);
    return dp[s1.length][s2.length];
}

console.log(LPS_Tabualation("abbc"));

