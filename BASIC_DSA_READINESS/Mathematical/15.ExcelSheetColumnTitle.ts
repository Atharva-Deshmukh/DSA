/* 168. Excel Sheet Column Title
Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

For example:

A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
 
Input: columnNumber = 1                 Output: "A"

Input: columnNumber = 28                Output: "AB"

Input: columnNumber = 701               Output: "ZY"

A-Z     -> 01-26
AA-AZ   -> 27-52

To directly jump on the target, we use modulo (%)

                                            PATTERN HERE:
                                            -------------

27 -> AA

    diff = ((27-1) % 26) = 0
    'A'.charCodeAt(0) + diff = 'A' + 0 = 'A'

    n = ((n - 1) / 26) = ((27 - 1) / 26) = 1

    diff = ((1 - 1) % 26) = 0
    'A'.charCodeAt(0) + diff = 'A' + 0 = 'A'

    Total = AA

28 -> AB

    diff = ((28-1) % 26) = 1
    'A'.charCodeAt(0) + diff = 'A' + 1 = 'B'

    n = ((n - 1) / 26) = ((28 - 1) / 26) = 1

    diff = ((1 - 1) % 26) = 0
    'A'.charCodeAt(0) + diff = 'A' + 0 = 'A'

    Total = AB (after reverse)

*/


function columnTitle(n: number): string {
    let res: string = "";
    
    while(n > 0) {
        const diff: number = Math.floor((n - 1) % 26);
        res = (String.fromCharCode('A'.charCodeAt(0) + diff)) + res;
        n = Math.floor((n - 1) / 26);
    }
    
    return res;
}