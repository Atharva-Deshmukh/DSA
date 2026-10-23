/* Extract Numbers from String

s = "The values are 4,-5, 6.5 and -3.25"
Output: [4, -5, 6.5, -3.25]

*/

/* Way-1: regex pass.
   -? is an optional minus sign.
    \d+ is the integer digits.
    \.? is an optional dot.
    \d* is zero or more digits after the dot.

   Time: O(n), Space: O(k) for k numbers found
*/
function extractNumbers(s: string): number[] {
    const matches: RegExpMatchArray | null = s.match(/-?\d+\.?\d*/g);
    return matches ? matches.map(Number) : [];
}

function extractNumbers_IfNoDecimalsAreInvolved(s: string): string[] {
    return s.match(/\d+/g) ?? [];
}

console.log(extractNumbers("The values are 4,-5, 6.5 and -3.25")); // [4, -5, 6.5, -3.25]
console.log(extractNumbers("no numbers here"));                    // []