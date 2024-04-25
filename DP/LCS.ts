/* Input: s1 = "abc", s2 = "adc"
   Output: 2
The longest common subsequence is "ac" and its length is 2.

Thinking while writing recurrence relation:
- make the function in terms of index
- explore all possibilities at this index
- choose the best possibility

iterate both the strings from last, since we have two strings, the recursion function will have two params f(i1, i2)

check the last element in both of the strings
if(s1[2] === s2[2])
    since one character matches, there is possibility of further matches in follwing iteration, so add one and recurse
    return 1 + f(1, 1)

if (s1[2] !== s2[2])
    here there are two more possibilites, we now have strings ab and ad
    since s1[1] !== s2[1],
    possibility 1: let s1 = db, s2 = ad, s1[0] === s2[1]
    possibility 2: let s1 = db, s2 = dc, s1[1] === s2[0]

    return 0 + max(f(i1-1, i2), f(i1, i2-1));

base case -> if any one of index becomes negative while iterating, return 0

f(i,j) --> lcs(s1(0 to i), s2(0 to j))

Recursion tree (in order to find the scope of memoisation)
                    s1 = abc, 
                    s2 = adc

                           f(2,2)
                               \
                             1 + f(1,1)                        {1 + 1 = 2}
                           /            \
                Max[f(0,1)                f(1,0)]              {1}
                       \                    /   \ 
            Max[f(-1,1)    f(0,0)] {1}       Max[f(0,0), f(0, -1)] {1}

TC: O(2^length of longer string)
SC: O(length of longer string)

Here, f(0,0) is being recalculated, memoisation can be used
*/

function LCS_Recursion(i1: number, i2: number): number {

    // base case
    if(i1 < 0 || i2 < 0) return 0;

    if(s1[i1] === s2[i2]) return 1 + LCS_Recursion(i1-1, i2-1);

    // there are two possibilities of no match
    return 0 + Math.max(LCS_Recursion(i1-1, i2), LCS_Recursion(i1, i2-1));
}

let s1: string = "abc";
let s2: string = "adc";

console.log(LCS_Recursion(s1.length - 1, s2.length -1));

////////////////////////////////// MEMOISATION /////////////////

/* use a 2d array for memoisation, fill with initial value -1, and then memoise

TC: O(len1 * len2)
SC: O(Max(len1,len2)) recursive stack + O(len1 + len2) for DP
 */
let dp: number[][] = Array(s1.length).fill(null).map(() => Array(s2.length).fill(-1));

function LCS_Recursion_Memoisation(i1: number, i2: number): number {

    
    if(i1 < 0 || i2 < 0) return 0;
    
    if(dp[i1][i2] !== -1) return dp[i1][i2];

    // keep it below above if to handle negative indices directly 
    if(s1[i1] === s2[i2]) {
        dp[i1][i2] = 1 + LCS_Recursion_Memoisation(i1-1, i2-1);
        return dp[i1][i2];
    }

    dp[i1][i2] = 0 + Math.max(LCS_Recursion_Memoisation(i1-1, i2), LCS_Recursion_Memoisation(i1, i2-1));
    return dp[i1][i2];
}

console.log(LCS_Recursion_Memoisation(s1.length - 1, s2.length -1));

////////////////////////////////// TABULATION /////////////////
/* in memoisation, we used negative index as base case, but its not possible to represent that index in matrix of tabulation
so, shift index, i.e now let index i represent index i-1


             a b c
           0 0 0 0
         a 0 1 1 1
         d 0 1 1 1
         c 0 1 1 2



TC: O(len1 * len2)
SC: O(len1 * len2) 
 */


function LCS_Recursion_Tabulation(s1: string, s2: string): number {
    let dp: number[][] = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(0));

    for(let i = 1; i <= s1.length; i++) {
        for(let j = 1; j <= s2.length; j++) {
            if(s1[i-1] === s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
            else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    return dp[s1.length][s2.length];
}

console.log(LCS_Recursion_Tabulation("abc", "adc"));



