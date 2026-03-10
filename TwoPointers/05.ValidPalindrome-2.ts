/* 680. Valid Palindrome II

Given a string s, return true if the s can be palindrome after deleting at most one character from it.

Input: s = "aba"
Output: true

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.

Input: s = "abc"
Output: false

Input: s = "abbda"
Output: true

Logic:

- Use two pointers approach
- Move inward while characters match.
- If a mismatch occurs, we have one chance to delete a character, so we check:
    Skip the left character → check if remaining is palindrome
    Skip the right character → check if remaining is palindrome
    If either works → return true.

Basically, we are checking two possibilites, its better done with the help of recursion

*/

function isPalindrome(s: string, l: number, r: number): boolean {
    while(l < r) {
        if(s[l] !== s[r]) return false;

        l++;
        r--;
    }
    return true;
}

function validPalindrome(s: string): boolean {
    let l = 0, r = (s.length - 1);

    while(l < r) {

        if(s[l] !== s[r]) {

            /* Return OR of both possibilities */
            return (isPalindrome(s, (l + 1), r) || isPalindrome(s, l, (r - 1)));
        }

        l++;
        r--;
    }

    return true;
};