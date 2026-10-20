/* 1832. Check if the Sentence Is Pangram

 A "Panagram" is a sentence containing every letter in the English Alphabet either in lowercase or Uppercase.
Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.

Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
Output: true
Explanation: sentence contains at least one of every letter of the English alphabet.

Input: sentence = "leetcode"
Output: false

Constraints:
    1 <= sentence.length <= 1000
    sentence consists of lowercase English letters.

Way-1:
- Iterate the string and store count in map
- in the end, iterate the map and if map.size = 26, return true else false

TC: O(n) + O(k)
SC: O(k)

Way-2: Instead of map data structure, use array data strucure - Array(26)

TC: O(n) + O(k)
SC: O(26)

*/

function pangramCheck(s: string): boolean {
    const n = s.length;

    let map = new Array(26).fill(false);

    for(let i = 0; i < n; i++) {
        map[s.toLowerCase().charCodeAt(i) - 'a'.charCodeAt(0)] = true;
    }

    for(let i = 0; i < 26; i++) {
        if(map[i] === false) return false;
    }

    return true;
}