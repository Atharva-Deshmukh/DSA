/* 49. Group Anagrams

Given an array of strings strs, group the anagrams together. 
You can return the answer in any order.

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Input: strs = [""]
Output: [[""]]

Input: strs = ["a"]
Output: [["a"]]

 
Constraints:
    1 <= strs.length <= 10^4
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.

Way-1: Brute force
- Iterate the string[] and for each word
  iterate that full word and get its hash value in a string format
  hash = "0000....000" - denoting values corresponding to each char between a-z
- Populate a map --> <hashValue - [strings]>
- After string[] iteration, iterate the map and simply return the strings stored there - they will be there as per occurrence also

*/

function groupAnagrams(s: string[]): string[][] {
    const n: number = s.length;

    let map = new Map<string, string[]>();
    let ans: string[][] = [];

    for(let i = 0; i < n; i++) {
        let hashSet = new Array(26).fill(0);
        const currStr: string = s[i];
        
        for(const char of currStr) {
            hashSet[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        const stringifiedHash: string = JSON.stringify(hashSet);

        if(!map.has(stringifiedHash)) map.set(stringifiedHash, [s[i]]);

        /* This won't work:

          map.set(stringifiedHash, map.get(stringifiedHash)!.push(s[i]));
          push() returns the new length of the array, not the array itself, 
          so that would try to store a number where string[] is expected.
        */

        else map.get(stringifiedHash)!.push(s[i]);  /* Imp to revise - map.set won't work */
    }

    for(const [key, value] of map) ans.push(value);

    return ans;
};