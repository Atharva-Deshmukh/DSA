/* 125. Valid Palindrome

A phrase is a palindrome if, after converting all uppercase letters 
into lowercase letters and removing all non-alphanumeric characters, 
it reads the same forward and backward. Alphanumeric characters include 
letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
 
Constraints:
    1 <= s.length <= 2 * 10^5
    s consists only of printable ASCII characters.

Way-1:
- Use regexp to sanitise the string first and then use two pointers

TC: O(n) + O(n) (regexp + two pointers)
SC: O(1)

Way-2:
- Directly use two pointers and skip the non-alphanumeric chars

TC: O(n)
SC: O(1)

*/

function isPalinSent(s) {
    let i = 0, j = s.length - 1;

    // Compares character until they are equal
    while (i < j) {

        if (s[i].toLowerCase() === s[j].toLowerCase()) {
            i++;
            j--;
        }

        // Skip non alphabet character from left side
        else if (!s[i].match(/[a-zA-Z0-9]/))  /* Can also use this function const isAlphaNumeric = (c: string) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'); */
            i++;

        // Skip non alphabet character from right side
        else if (!s[j].match(/[a-zA-Z0-9]/))
            j--;

        // If characters are not equal then sentence is not palindrome
        else return false;
    }

    return true;
}
