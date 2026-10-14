/*

*           |   1           |   A
* *         |   1 2         |   A B
* * *       |   1 2 3       |   A B C
* * * *     |   1 2 3 4     |   A B C D
* * * * *   |   1 2 3 4 5   |   A B C D E

Pattern:

row no i --> no of stars
row no i --> [1---i] nos.

Also note that we need to print space also in between

No need to care for spaces at the end

TC: O(n * n), here n = 5
SC: O(1)

*/

function rightHalfStarPattern(n: number): void {
    for(let i = 1; i <= n; i++) {

        // construct individual row and then print it
        let patRow: string = '';
        for(let j = 1; j <= i; j++) {
            patRow += ' * '
        }
        console.log(patRow)
    }
}

function rightHalfNumberPattern(n: number): void {
    for(let i = 1; i <= n; i++) {
        
        let patRow: string = "";
        
        for(let j = 1; j <= i; j++) patRow += " " + j;
        
        console.log(patRow);
    }
}

function rightHalfAlphaPattern(n: number, startChar: string = 'A'): void {
    const startCharCode = startChar.charCodeAt(0);
    
    for(let i = 1; i <= n; i++) {
        
        let patRow: string = "";
        
        for(let j = 1; j <= i; j++) {
            patRow += " " + (String.fromCharCode(startCharCode + (j - 1)));
        }
        
        console.log(patRow);
    }
}