/*

* * * * *   |   1 2 3 4 5   |   A B C D E
*       *   |   1       5   |   A       E
*       *   |   1       5   |   A       E
*       *   |   1       5   |   A       E
* * * * *   |   1 2 3 4 5   |   A B C D E

Pattern (n = 5):
     row1 -->  n stars 
     row2 -->  1 star + 4 spaces + 1 star 
     row3 -->  1 star + 4 spaces + 1 star 
     row4 -->  1 star + 4 spaces + 1 star 
     row1 -->  n stars 
*/

function hollowSquareStar(n: number) {
    let patRow: string = '';

    for(let row = 1; row <= n; row++) {
        patRow = '';
        if((row === 1) || (row === (n))) patRow += ' *'.repeat(n);
        else patRow += ' *' + '  '.repeat(n - 2) + ' *';

        console.log(patRow);
    }
}

function hollowSquareNumber(n: number) {
    let patRow: string = '';

    for(let row = 1; row <= n; row++) {
        patRow = '';
        if((row === 1) || (row === (n))) for(let num = 1; num <= n; num++) patRow += ' ' + num;
        else patRow += ' ' + 1 + '  '.repeat(n - 2) + ' ' + n;

        console.log(patRow);
    }
}

function hollowSquareChar(n: number, startChar: string = 'A') {
    let patRow: string = '';
    let startCharIndex: number = startChar.charCodeAt(0) - 1;

    for(let row = 1; row <= n; row++) {
        patRow = '';
        if((row === 1) || (row === (n))) for(let charNum = 1; charNum <= n; charNum++) patRow += ' ' + String.fromCharCode(startCharIndex + charNum);
        else patRow += ' ' + String.fromCharCode(startCharIndex + 1) + '  '.repeat(n - 2) + ' ' + String.fromCharCode(startCharIndex + n);

        console.log(patRow);
    }
}