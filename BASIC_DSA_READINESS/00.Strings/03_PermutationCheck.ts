/* Check if a string can be formed by rearranging another (Permutation / Valid Anagram, LC 242)

CONCEPT:
--------
Permutation: A permutation is any rearrangement of the characters of a string
Anagram: An anagram is a specific type of permutation where the rearranged 
         characters form a valid, meaningful word or phrase in a given language

Input: s1 = "listen", s2 = "silent"
Output: true

Input: s1 = "abc", s2 = "abd"
Output: false

242. Valid Anagram

Given two strings s and t, return true if t is an anagram of s, 
and false otherwise.

Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false

Constraints:
    1 <= s.length, t.length <= 5 * 10^4
    s and t consist of lowercase English letters.

Way-1: Brute force

- Sort both strings 
- Compare the sorted strings 

TC: O(nlogn)
SC: O(1)

Way-2: Map

TC: O(n)
SC: O(256)

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