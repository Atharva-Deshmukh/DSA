/* 242. Valid Anagram

Given two strings s and t, return true if t is an anagram of s, 
and false otherwise.

Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false

Constraints:
    1 <= s.length, t.length <= 5 * 10^4
    s and t consist of lowercase English letters.

*/

function isAnagram(s: string, t: string): boolean {
    const n1 = s.length;
    const n2 = t.length;

    /* Anagrams should be of same length */
    if(n1 !== n2) return false;

    let map1 = Array(256).fill(0);
    let map2 = Array(256).fill(0);

    for(let i = 0; i < n1; i++) {
        map1[s.charCodeAt(i)]++;
        map2[t.charCodeAt(i)]++;
    }

    return (JSON.stringify(map1) === JSON.stringify(map2));
}