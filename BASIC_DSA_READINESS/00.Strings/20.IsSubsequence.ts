/* 392. Is Subsequence

Given two strings s and t, return true if s is a subsequence of t, or false otherwise.
A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) 
of the characters without disturbing the relative positions of the remaining characters. 
(i.e., "ace" is a subsequence of "abcde" while "aec" is not).

Input: s = "abc", t = "ahbgdc"
Output: true

Input: s = "axc", t = "ahbgdc"
Output: false
 
Constraints:
    0 <= s.length <= 100
    0 <= t.length <= 10^4
    s and t consist only of lowercase English letters.
 
Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k >= 10^9, 
           and you want to check one by one to see if t has its subsequence. 
           In this scenario, how would you change your code?

Approach:
- Use two pointers to traverse both strings simultaneously
- Initialize the pointers i and j with zero, where i is the pointer to s1 and j is the pointer to s2.
- If s1[i] = s2[j] then increment both i and j by 1.
- Otherwise, increment only j by 1.
- If i reaches the end of s1 then return true else return false.

TC: O(n1 + n2)
SC: O(1)

*/

function isSubsequence(s1: string, s2: string): boolean {
        let m = s1.length, n = s2.length;

    // For s1 to be a subsequence, its length must be smaller than s2
    if (m > n)
        return false;

    let i = 0, j = 0;
    while (i < m && j < n) {
        if (s1[i] === s2[j]) {
            i++;
            j++;
        }
        else j++;
    }

    return i === m;
}