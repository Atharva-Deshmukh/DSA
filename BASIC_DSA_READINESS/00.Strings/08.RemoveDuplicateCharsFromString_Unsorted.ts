/* String Duplicates Removal - Order is also preserved

Input: s = "geEksforGEeks"
Output: "geEksforG"
Explanation: After removing duplicate characters such as E, e, k, s, we have string as "geEksforG".

Input: s = "HaPpyNewYear"
Output: "HaPpyNewYr"
Explanation: After removing duplicate characters such as e, a, we have string as "HaPpyNewYr".

Constraints:
    1 ≤ s.size() ≤ 10^6
    s consists only of English alphabets

Way-1: Map
- Iterate the array
- store in map if its not in map already and also ans += s[i]
- if its in map, do nothing, i++
- return ans

TC: O(n)
SC: O(uniqueChars)

Way-2: Use array(256) as map when another data structure is not allowed

TC: O(n)
SC: O(1) - always constant irrespective of the n's size
*/

function removeDuplicateFromString(s: string): string{
    const n = s.length;
    let ans = '';
    let map = new Array(256).fill(0);

    for(let i = 0; i < n; i++) {
        const charCode = s[i].charCodeAt(0);
        if(map[charCode] === 0) {
            ans += s[i];
            map[charCode] = 1;
        }
    }

    return ans;
}