/*
    * * * * *   |       1 2 3 4 5   |       A B C D E
   * * * * *    |      1 2 3 4 5    |      A B C D E
  * * * * *     |     1 2 3 4 5     |     A B C D E
 * * * * *      |    1 2 3 4 5      |    A B C D E
* * * * *       |   1 2 3 4 5       |   A B C D E

Pattern: (n = 5)
- row1 --> 4 spaces + 5 stars
- row2 --> 3 spaces + 5 stars
- row3 --> 2 spaces + 5 stars
- row4 --> 1 spaces + 5 stars
- row5 --> 0 spaces + 5 stars

*/

function rhombusPatternStar(n: number) {
    let patRow: string = '';

    for(let row = 1; row <= n; row++) {
        patRow = '';

        patRow += ' '.repeat(n - row);
        patRow += ' *'.repeat(n);

        console.log(patRow);
    }
}

function rhombusPatternNumber(n: number) {
    let patRow: string = '';

    for(let row = 1; row <= n; row++) {
        patRow = '';

        patRow += ' '.repeat(n - row);
        for(let num = 1; num <= n; num++) patRow += ' ' + num;

        console.log(patRow);
    }
}

function rhombusPatternChars(n: number, startChar: string = 'A') {
    let patRow: string = '';
    let startCharIndex: number = startChar.charCodeAt(0) - 1;

    for(let row = 1; row <= n; row++) {
        patRow = '';

        patRow += ' '.repeat(n - row);
        for(let charNum = 1; charNum <= n; charNum++) patRow += ' ' + String.fromCharCode(startCharIndex + charNum);

        console.log(patRow);
    }
}