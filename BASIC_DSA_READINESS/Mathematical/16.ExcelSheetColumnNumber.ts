/* 171. Excel Sheet Column Number

Given a string columnTitle that represents the column title as appears in an Excel sheet, 
return its corresponding column number.

For example:

A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...

Input: columnTitle = "A"                Output: 1

Input: columnTitle = "AB"               Output: 28

Input: columnTitle = "ZY"               Output: 701
 
Constraints:

1 <= columnTitle.length <= 7
columnTitle consists only of uppercase English letters.
columnTitle is in the range ["A", "FXSHRXW"].

Numbers in columns of excel are as per base 26
AB -> (1 * (26 ^ 1)) + (2 * (26 * 0)) = 28
*/

function columnNumber(title: string): number {
    let res: number = 0;
    const n: number = title.length;
    
    /* Create a map to store Char mappings, A->1, B->2, C->3...Z->26 */
    const charMap = new Map<string, number>(
     Array.from({ length: 26 }, (_, i) => [
        String.fromCharCode(65 + i), // 'A' = 65
        i + 1,
      ])
    );
    
    for(let i = n - 1; i >= 0; i--) {
        res += ((26 ** (n - 1 - i)) * charMap.get(title[i])!);
    }
    
    return res;
}