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

Way-1: Brute Force:
-------------------

- At most one character can be removed.
- Remove each char one by one and check if its palindrome

function validPalindromeBruteForce(s: string): boolean {
    if (isWholePalindrome(s)) return true;

    for (let i = 0; i < s.length; i++) {
        const candidate = s.slice(0, i) + s.slice(i + 1); --> O(n1 + n2) -> adds upto O(n) always
        if (isWholePalindrome(candidate)) return true;
    }

    return false;
}

Way-2: Two pointers approach:
-----------------------------

Two pointers: left = 0 | right = (n - 1)

Check for possibilites Whenever there is a mismatch:
    Skip the left character → check if remaining is palindrome
    Skip the right character → check if remaining is palindrome
    If either works → return true.

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

/*

TC: O(n^2) -> But actually it will be O(n)
              inner iterations runs only for mismatches
SC: O(1)

*/