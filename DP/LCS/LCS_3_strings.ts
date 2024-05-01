/* Input : str1 = "geeks"  
           str2 = "geeksfor"  
           str3 = "geeksforgeeks"                      Output: 5

           LCS is "geeks"                              length: 5

    Logic: modify the existing LCS for three strings
    - start from the last index in all the three strings.
    - if all chars strings are equal, counter++ and move backwards
    - else explore three possibilities, by one by one recursing backwards in the strings
    
    TC: O(3^n), where n is the maximum length among the three strings.
    SC: O(n)

*/

function LCS_3(s1: string, s2: string, s3: string): number {
    
    function LCS_Solve(i: number, j: number, k: number): number {
        if(i === 0 || j === 0 || k === 0) return 0;
    
        if((s1[i-1] === s2[j-1]) && (s2[j-1] === s3[k-1])) return 1 + LCS_Solve(i-1, j-1, k-1);
        else {
            return Math.max(LCS_Solve(i-1, j, k), LCS_Solve(i, j-1, k), LCS_Solve(i, j, k-1));
        }
    }

    return LCS_Solve(s1.length, s2.length, s3.length);
}

/* Use memoisation to avoid repeatitive computations

TC: O(N1 * N2 * N3), where N1, N2, and N3 are the lengths of strings s1, s2, and s3 respectively.
SC: O(N1 * N2 * N3)
*/
function LCS_3_Memoisation(s1: string, s2: string, s3: string): number {

    let dp: number[][][] = Array(s1.length+1).fill(null).map(() => Array(s2.length+1).fill(null).map(() => Array(s3.length+1).fill(-1)));
    
    function LCS_Solve(i: number, j: number, k: number): number {
        if(i === 0 || j === 0 || k === 0) return 0;

        if(dp[i][j][k] !== -1) return dp[i][j][k];
    
        if((s1[i-1] === s2[j-1]) && (s2[j-1] === s3[k-1])) {
            dp[i][j][k] = 1 + LCS_Solve(i-1, j-1, k-1);
            return dp[i][j][k];
        }
        else {
            dp[i][j][k] = Math.max(LCS_Solve(i-1, j, k), LCS_Solve(i, j-1, k), LCS_Solve(i, j, k-1));
            return dp[i][j][k];
        }
    }

    return LCS_Solve(s1.length, s2.length, s3.length);
}

console.log(LCS_3("geeks", "geeksfor", "geeksforgeeks"));

