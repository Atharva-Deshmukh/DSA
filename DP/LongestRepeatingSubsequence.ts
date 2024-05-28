/* Given a string, find the length of the longest repeating subsequence, such that the two subsequences don’t have same 
string character at the same position, i.e. any ith character in the two subsequences shouldn’t have the same index 
in the original string. 

Input: str = "abacbc"
Output: 3
The two subsequence are 'a0b1c3'(string with indices) and 'a2b4c5'(second). 
so no character share same index in the string

Logic:
- it is the LCS problem only with s1 and s2 being the same
- just that the char is considered equal only if their indices are different


             a b a c b c 
           0 0 0 0 0 0 0
         a 0 0 0 1 1 1 1
         b 0 0 0 1 1 2 2
         a 0 1 1 1 1 2 2
         c 0 1 1 1 1 1 3
         b 0 1 2 2 2 2 3
         c 0 1 2 2 3 3 3

TC: O(n^2)
SC: O(n^2)
*/

function LRS_Tabulation(s1: string, s2: string): number {
    let dp: number[][] = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(0));

    for(let i = 1; i <= s1.length; i++) {
        for(let j = 1; j <= s2.length; j++) {
            if((s1[i-1] === s2[j-1]) && (i!==j)) dp[i][j] = dp[i-1][j-1] + 1;
            else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    return dp[s1.length][s2.length];
}

let s: string = "abacbc";
console.log(LRS_Tabulation(s,s));

/* This can be space optimised, since we are using two rows only at a time

TC: O(n^2)
SC: O(n^2)  
*/

function LRS_Tabulation_SpaceOptimised(s1: string, s2: string): number {
    let prevRow: number[] = Array(s1.length + 1).fill(0);
    let currRow: number[] = Array(s2.length + 1).fill(0);

    for(let i = 1; i <= s1.length; i++) {
        for(let j = 1; j <= s2.length; j++) {
            if((s1[i-1] === s2[j-1]) && (i!==j)) currRow[j] = 1 + prevRow[j-1];
            else {
                currRow[j] = Math.max(currRow[j-1], prevRow[j]);
            }
        }

        prevRow = [...currRow];
    }

    return currRow[currRow.length-1];
}

/*
TC: O(n^2)
SC: O(n)  */