/*
Input: s = "MCMXCIV"    -->         Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

Create a map for these Fundamental Roman number conversions :

Symbol       Value
-----------------
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

                                        Patterns to Observe:
                                        --------------------

When str[i] > str[i + 1], res = res + romanMap(str[i]); i++

But for some patterns:
IV -> 4
IX -> 9
XL -> 50
XC -> 90
CD -> 400
CM -> 900

When str[i] < str[i + 1], res = res + (romanMap(str[i + 1]) - romanMap(stri[i])); i += 2

M C M X C I V

*/

function romanToInt(s: string): number {
    const n = s.length;
    const romanToIntegerMap = new Map();
    romanToIntegerMap.set('I', 1);
    romanToIntegerMap.set('V', 5);
    romanToIntegerMap.set('X', 10);
    romanToIntegerMap.set('L', 50);
    romanToIntegerMap.set('C', 100);
    romanToIntegerMap.set('D', 500);
    romanToIntegerMap.set('M', 1000);

    let res = 0;
    let i;

    if (n === 1) return romanToIntegerMap.get(s[0]);

    for (i = 0; i < (n - 1);) {
        const current = romanToIntegerMap.get(s[i]);
        const next = romanToIntegerMap.get(s[i + 1]);
        if (current >= next) {
            res += current;
            i++;
        }
        if (current < next) {
            res += (next - current);
            i += 2;
        }
    }

    if(i === (n - 1)) res += romanToIntegerMap.get(s[i]);

    return res;

};

/* Maps.get() are generally inefficient, use object directly */

class Solution {
    romanToDecimal(s) {
        const n = s.length;
        const value = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000
        };

        let res = 0;
        let i;

        if (n === 1) return value[(s[0])];

        for (i = 0; i < (n - 1);) {
            const current = value[(s[i])];
            const next = value[(s[i + 1])];
            if (current >= next) {
                res += current;
                i++;
            }
            if (current < next) {
                res += (next - current);
                i += 2;
            }
        }

        if (i === (n - 1)) res += value[(s[i])];

        return res;

    }
}