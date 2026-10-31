/* Check if Strings are Rotations of Each Other

Given two strings s1 and s2 of equal length, determine whether s2 is a rotation of s1.

Input: s1 = "abcd", s2 = "cdab"
Output: true

Input: s1 = "aab", s2 = "aba"
Output: true

Input: s1 = "abcd", s2 = "acbd"
Output: false

Way-1: Brute force
- Generate all rotations manually for any of the s1/s2 and verify if s1 === s2

TC: O(n^2)
SC: O(1)

Way-2: KMP Algo
- This algo is never asked in SDET-2 rounds

TC: O(n)
SC: O(n)

*/

function areRotations(s1, s2) {
    let n = s1.length;

    // generate and check all possible rotations of s1
    for (let i = 0; i < n; i++) {
        
        // if current rotation is equal to s2 return true
        if (s1 === s2) {
            return true;
        }

        // Right rotate s1
        let last = s1[s1.length - 1];
        s1 = last + s1.slice(0, s1.length - 1);
    }
    return false;
}
