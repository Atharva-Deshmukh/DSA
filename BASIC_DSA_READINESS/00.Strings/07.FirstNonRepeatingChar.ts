/* 387. First Unique Character in a String

Given a string s, find the first non-repeating character in it and return its index. 
If it does not exist, return -1.

Input: s = "leetcode"
Output: 0
The character 'l' at index 0 is the first character that does not occur at any other index.

Input: s = "loveleetcode"
Output: 2

Input: s = "aabb"
Output: -1

Constraints:
    1 <= s.length <= 10^5
    s consists of only lowercase English letters.


Way-1: 
- First pass --> Store the map with frequencies
- Second pass --> return i if map.get(s[i]) === 1
                                 else return -1 as there is no unique char

TC: O(n) + O(n)
SC: O(uniqueChars)

Way-2: Follow-up --> Do it without using extra Data structure
- We will use Array(256) to store freq instead of map above
- Rest everything is same
- STILL THIS IS TWO PASS

TC: O(n) + O(n)
SC: O(uniqueChars)

Way-3: Input array can be traversed only once

    - The idea is to maintain a visited[MAX_CHAR]=[-1, -1...] indicating no characters have been seen yet. 
    
    Now, we iterate through the string:
    - If a character is seen for the first time, its INDEX is stored in the visited[]. 
    - If the character is found again then its array value is set to -2 to represent this character is now repeating. 

    After the string traversal of the input array, traverse the visited[] and check if value in the array is not equal to -1 or -2 (means, this character is not repeating). 
    return the smallest positive index from visited[] that denotes first non-repeating character

    s = "leetcode"
    visited[] starts all -1 (showing only touched letters below):

    i=0 'l' -> visited['l'] is -1 (unseen)        -> visited['l'] = 0
    i=1 'e' -> visited['e'] is -1 (unseen)        -> visited['e'] = 1
    i=2 'e' -> visited['e'] is 1 (seen already)   -> visited['e'] = -2 (repeating)
    i=3 't' -> visited['t'] is -1 (unseen)        -> visited['t'] = 3
    i=4 'c' -> visited['c'] is -1 (unseen)        -> visited['c'] = 4
    i=5 'o' -> visited['o'] is -1 (unseen)        -> visited['o'] = 5
    i=6 'd' -> visited['d'] is -1 (unseen)        -> visited['d'] = 6
    i=7 'e' -> visited['e'] is -2 (already -2)    -> visited['e'] = -2 (no-op)

    After the string pass
    Iterate visited[] and return the smallest positive number --> 0 in this case

    TC: O(n) + O(256)  -->  second O(n) is now brought to constant, hence it remains same even if n increases
    SC: O(256)
*/

function firstNonRepeatingChar(s: string): number {
    const n: number = s.length;
    const MAX_CHARS: number = 256;

    if(n === 0) return -1;

    let visited: number[] = new Array(MAX_CHARS).fill(-1);

    for(let i = 0; i < n; i++) {
        const currentChar: string = s[i];
        const currentCharCode: number = currentChar.charCodeAt(0);

        if(visited[currentCharCode] === -1) visited[currentCharCode] = i;    /* Store the index as its not occurred before */
        else if(visited[currentCharCode] >= 0) visited[currentCharCode] = -2 /* Character repeated - put -2 at this index */
    }

    let smallestPositiveIndex: number = Number.MAX_SAFE_INTEGER;
    visited.forEach((ele) => {
        if((ele < smallestPositiveIndex) && (ele >= 0)) smallestPositiveIndex = ele;
    });

    return (smallestPositiveIndex === Number.MAX_SAFE_INTEGER)? -1: smallestPositiveIndex;

    /* GFG Variant: Return that character */
    return (smallestPositiveIndex === Number.MAX_SAFE_INTEGER) ? -1 : s[smallestPositiveIndex];
}