/* 125. Valid Palindrome

A phrase is a palindrome if, after converting all uppercase letters into lowercase 
letters and removing all non-alphanumeric characters, it reads the same forward and backward. 
Alphanumeric characters include letters and numbers.

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

*/

function removeNonAlphaNumericChars(s: string): string {

    /* Remove non-alphanumeric character and remove spaces, convert uppercase to lowercase*/
    return s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function isPalindrome(s: string): boolean {
    const s_sanitised = removeNonAlphaNumericChars(s);
    
    console.log('s -> ', s_sanitised);

    let l = 0, r = (s_sanitised.length - 1);

    while(l < r) {
        if(s_sanitised[l] !== s_sanitised[r]) return false;

        l++;
        r--;
    }

    return true;
};