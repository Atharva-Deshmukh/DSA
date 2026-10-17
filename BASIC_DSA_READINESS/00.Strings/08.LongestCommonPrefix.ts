/* 14. Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Input: strs = ["flower","flow","flight"]
Output: "fl"

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 
    1 <= strs.length <= 200
    0 <= strs[i].length <= 200
    strs[i] consists of only lowercase English letters if it is non-empty.

Way-1: Sort the array of strings and compare first and last strings only
- When we sort the strings, the first and last strings in the sorted list will be the most different from each other 
  in terms of their characters. 
- So, the longest common prefix for all the strings must be a prefix of both the first and the last strings in the sorted list.

Ex: 

[“geeksforgeeks”, “geeks”, “geek”, “geezer”] -- Initial
[“geek” ,”geeks” ,”geeksforgeeks” ,”geezer”] -- After sorting
we only need to compare the first and last strings (“geek” and “geezer“) 
because any common prefix between these two will also be a prefix for all the strings in between.

TC: O(n*m*log n)

    Standard sorting TC when we have single element - O(nlogn)
    But here elements of arrays are strings not single primitive elements
    O(n log n) comparisons × O(m) per comparison = O(n * m * log n)

SC: O(m)

Way-2: 
- Iterate each string in array and compare each character
- Outer loop will only iterate till minimum length element

    0 1 2 3 4 5 6 7 8 9 .....
    g e e k s f o r g e e k s
    g e e k s
    g e e k 
    g e e z e r

TC: O(n * m) - Kind of matrix like traversal
SC: O(m)

*/

function longestCommonPrefix(s: string[]) {
    const n: number = s.length;

    let ans: string = '';
    let minLen: number = Number.MAX_SAFE_INTEGER;

    for (const str of s) minLen = (str.length < minLen) ? str.length : minLen;

    for (let i = 0; i < minLen; i++) {
        const ch: string = s[0][i]; // reference char from the first string at column i

        for (let j = 1; j < n; j++) {
            if (s[j][i] !== ch) {
                return ans; // mismatch found at this column - stop immediately
            }
        }

        ans += ch; // column i matched across all strings - add to the prefix
    }

    return ans;
}