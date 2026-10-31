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


Way-1: Optimal approach instead of simple sorting
- Iterate the string[] and for each word
  iterate that full word and get its hash value in a string format
  hash = "0#0#0#0....0#0#0" - denoting values corresponding to each char between a-z
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

        // "eat" -> "1#0#0#0#1#0#...#1#0#0#0#0#0" (counts for a..z, '#'-separated)
        const stringifiedHash: string = hashSet.join('#');

        if(!map.has(stringifiedHash)) map.set(stringifiedHash, [s[i]]);
        else map.get(stringifiedHash)!.push(s[i]);
    }

    for(const [key, value] of map) ans.push(value);

    return ans;
};