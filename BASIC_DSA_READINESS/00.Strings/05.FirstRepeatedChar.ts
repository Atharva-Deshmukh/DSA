/* Examples:

Input: s ="geeksforgeeks"
Output: "e"
Explanation: 'e' repeats at third position.

Input: s ="hellogeeks"
Output: "l"
Explanation: 'l' repeats at fourth position.

Input: s ="abc"
Output: "-1"
Explanation: There is no repeated character.

Way-1:
- Use two loops and check if each char occurs any time earlier or later of current index

TC: O(n^2)
SC: O(1)

Way-2:
- Iterate the string and side by side keep storing chars in hash
- If there is any repeatition, immediately return that char
- else if string is fully traversed, return -1

TC: O(n)
SC: O(26) = O(k) = if we use an array of 26 chars instead of map */

function firstRepeatedChar(s: string): string {
    const n: number = s.length;

    let map: number[] = new Array(256).fill(-1);

    for (let i = 0; i < n; i++) {
        if (map[s[i].charCodeAt(0)] !== -1) return s[i]
        else map[s[i].charCodeAt(0)] = i;
    }

    return '-1';
}