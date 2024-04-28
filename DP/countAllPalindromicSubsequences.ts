/* TODO: count all distinct subsequences now!!


Given a string s, return the number of different non-empty palindromic subsequences in s. 
Since the answer may be very large, return it modulo 10^9 + 7.

Input: s = "bccb"    Output: 6
Explanation: The 6 different non-empty palindromic subsequences are 'b', 'c', 'bb', 'cc', 'bcb', 
'bccb'. Note that 'bcb' is counted only once, even though it occurs twice.

Logic: Brute force
- generate all subsequenes -> O(2 ^ n) and check if each one is a palindrome -> O(n). Total TC -> O((2^n) * n)

Logic: Using Recursion
- since we are checking for palindrome, keep one pointer at start and the other at end
- our rec(str, i, j) will return count of palindromic subsequences between [i,j] 
- think of base cases, we recurse till we encounter a single character, hence if i === j, return 1
- if(i > j) return 0 since pointers now cross each other and iteration must be stopped
- if s[i] === s[j], then count++ and recurse for two possibilities, rec(i+1, j) and rec(i, j-1),
- ex: bbcb, if i = 0 and j = 3, b === b so recurse for (i+1, j) since there we get another palindrome
- similarly ex: bcbb, if i = 0 and j = 3, b === b so recurse for (i, j-1) since there we get another palindrome
- if (s[i] !== s[j]) and lets say s = "abc", now we recurse for "ab" & "bc" and further recurse to "a", "b", "b", "c"
- middle part is counted twice, hence subtract its count from the total count
- in a nutshell, recurse for two possibilites and subtract the repeatition


TC: O(3^n)  n = s.length()
SC: O(n)
*/

function countPalindSubseq(s: string, i: number, j: number): number {
    if(i > j) return 0;
    if (i === j) return 1;

    if(s[i] === s[j]) return 1 + (countPalindSubseq(s, i+1, j) + countPalindSubseq(s, i, j-1));
    else return (countPalindSubseq(s, i+1, j) + countPalindSubseq(s, i, j-1) - countPalindSubseq(s, i+1, j-1));
}

/* Since there are overlapping subproblems, computations are repeating leading to exponential time complexity
if they are memoised, a string will be iterated recursively only twice since once from (i+1,j) and other from (i,j-1),
recomputations are done in O(1) now due to memoisation which reduces TC

TC: O(n^2)  n = s.length()
SC: O(n^2) matrx is used for memoisation since we need to keep count of ith and jth index at once

*/

let s = "abcd";
let dp: number[][] = Array(s.length).fill(null).map(() => Array(s.length).fill(-1));

function countPalindSubseqMemoised(s: string, i: number, j: number): number {
    if(i > j) return 0;
    if(dp[i][j] !== -1) return dp[i][j];
    if (i === j) return 1;


    if(s[i] === s[j]) {
        dp[i][j] = 1 + (countPalindSubseqMemoised(s, i+1, j) + countPalindSubseqMemoised(s, i, j-1));
        return dp[i][j];
    }
    else {
        dp[i][j] = (countPalindSubseqMemoised(s, i+1, j) + countPalindSubseqMemoised(s, i, j-1) - countPalindSubseqMemoised(s, i+1, j-1));
        return dp[i][j];
    }
}