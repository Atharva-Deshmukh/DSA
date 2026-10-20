/* 205. Isomorphic Strings

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.
All occurrences of a character must be replaced with another character while preserving the order of characters. 
No two characters may map to the same character, but a character may map to itself.


Input: s = "egg", t = "add"
Output: true
The strings s and t can be made identical by:
Mapping 'e' to 'a'.
Mapping 'g' to 'd'.

Input: s = "f11", t = "b23"
Output: false
The strings s and t can not be made identical as '1' needs to be mapped to both '2' and '3'.

Input: s = "paper", t = "title"
Output: true

Constraints:
    1 <= s.length <= 5 * 10^4
    t.length == s.length
    s and t consist of any valid ascii character.


Way-1: Brute Force:
- s1.length === s2.length is the first condition
- Iterate char by char simultaneously in both strings and check if corresponding chars are at same indices

TC: O(n^2)
SC: O(1) */

function areIsomorphic_BruteForce(s1: string, s2: string) {
    let n = s1.length;

    for (let i = 0; i < n; i++) {

        /* Extract current char of both strings */
        let c1 = s1[i];
        let c2 = s2[i];

        // Check all occurrences of c1 in s1 and corresponding occurrences of c2 in s2
        for (let j = 0; j < n; j++) {

            // If we find another occurrence of c1 in s1, it must match the corresponding character in s2
            if (s1[j] === c1 && s2[j] !== c2) {
                return false;
            }

            // If we find another occurrence of c2 in s2, it must match the corresponding character in s1
            if (s1[j] !== c1 && s2[j] === c2) {
                return false;
            }
        }
    }

    return true;
}

/* Way-2: Use two maps
- We mainly store the first index of every character and for remaining occurrences, we check if they appear at same first index too.

ex: 
  0 1 2 3       0 1 2 3
  a b a b       c d c d

i = 0:
    both occur first time
    map1 = {a:0}
    map2 = {c:0}

i = 1:
    both occur first time
    map1 = {a:0, b:1}
    map2 = {c:0, d:1}

i = 2:
    both chars repeat - we check their first occurrence in the map
    first occ of a = first occ of c = 0th index

i = 3:
    both chars repeat - we check their first occurrence in the map
    first occ of b = first occ of d = 1st index

TC: O(n)
SC: O(1) - If we use map of fixed size
*/

function areIsomorphic(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const m1 = new Array(256).fill(0);
    const m2 = new Array(256).fill(0);

    for (let i = 0; i < s.length; i++) {
        const a = s.charCodeAt(i), b = t.charCodeAt(i);
        if (m1[a] !== m2[b]) return false;  // they were last seen at different positions
        m1[a] = m2[b] = i + 1;              // +1 so that 0 means "not seen yet"
    }
    return true;
}