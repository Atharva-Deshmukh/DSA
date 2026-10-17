/* 151. Reverse Words in a String

Given an input string s, reverse the order of the words. 
A word is defined as a sequence of non-space characters. 
The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. 
The returned string should only have a single space separating the words. 
Do not include any extra spaces.

Input: s = "the sky is blue"
Output: "blue is sky the"

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
 

Constraints:
    1 <= s.length <= 10^4
    s contains English letters (upper-case and lower-case), digits, and spaces ' '.
    There is at least one word in s.
 

Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?

Way-1:
- Trim the input string first to remove trailing and leading spaces
- Split the string around one or more whitespace chars - use regexp /\s+/
- reverse and join with space ' ' in between

TC: O(n)
SC: O(n)

Way-2:
- We can also directly extract words using regexp and reverse and join
- this skips  s = s.trim();

TC: O(n)
SC: O(n)

*/

function reverseWordsInString(s: string): string {
    const n: number = s.length;

    s = s.trim();

    const reversedString = s.split(/\s+/).reverse().join(' ');

    return reversedString;
};

function reverseWordsInString_Way2(s: string): string {
    const n: number = s.length;

    /*                       match all words from the strings - ["word-1", "word-2"] */
    const reversedString = s.match(/\S+/g)!.reverse().join(' ')

    return reversedString;
};
