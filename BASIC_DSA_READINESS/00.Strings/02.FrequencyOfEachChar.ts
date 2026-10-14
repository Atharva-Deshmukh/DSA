/* Find frequency of each character in the order of occurrence

Input: s = "geeksforgeeks"
Output: g2 e4 k2 s2 f1 o1 r1

Input: str = "elephant"
Output: e2 l1 p1 h1 a1 n1 t1


WAY-1:
- Iterate the string and store char wise frequency in map.
  (in a map, order of occurrence is preserved)
- Iterate the map now and print char-freq pair

TC: O(n) + O(n)
SC: O(n)

WAY-2: (follow-up: Can u do it without any extra Data structure?)  ---  Much expected ans
- Declare one const array of all ASCII Chars with fixed size of 256 - This will store count of char
- Fill this in first iteration
- Declare another const array of size 256 that just stores true, false -> denoting, if this element is seen before
- Iterate string for second time, and if the current element is not seen, then only fill its char-count

TC: O(n) + O(k), k = unique chars in set
SC: O(MAX_CHARS) + O(MAX_CHARS), MAX_CHARS = 256

*/

function way1(s: string): void {
    const n: number = s.length;
    let map: Map<string, number> = new Map<string, number>();
    let ans: string = "";

    for(let i = 0; i < n; i++) {
        const currentChar: string = s[i];
        if(!map.has(s[i])) map.set(currentChar, 1);
        else map.set(currentChar, map.get(currentChar)! + 1);
    }

    for(const [key, value] of map) {
        ans += (key + value + ' ');
    }

    console.log(ans)
}

function way2(s: string): void {
    const MAX_CHARS = 256;
    const count = new Array(MAX_CHARS).fill(0);
    const seen = new Array(MAX_CHARS).fill(false);

    for (let i = 0; i < s.length; i++) count[s.charCodeAt(i)]++;

    let ans = "";
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        if (!seen[code]) {
            ans += s[i] + count[code] + ' ';
            seen[code] = true;
        }
    }
    console.log(ans.trim());
}

