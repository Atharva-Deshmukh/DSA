/*

* * * * * * * * *   |   1 2 3 4 5 6 7 8 9   |   A B C D E F G H I
  * * * * * * *     |     1 2 3 4 5 6 7     |     A B C D E F G
    * * * * *       |       1 2 3 4 5       |       A B C D E
      * * *         |         1 2 3         |         A B C 
        *           |           1           |           A
      * * *         |         1 2 3         |         A B C
    * * * * *       |       1 2 3 4 5       |       A B C D E
  * * * * * * *     |     1 2 3 4 5 6 7     |     A B C D E F G
* * * * * * * * *   |   1 2 3 4 5 6 7 8 9   |   A B C D E F G H I

Pattern: (n = 5)
- No of rows = (2n - 1)
- Thought process:

         for(row = 1; row <= (2n - 1); row++) {
            if(row <= 5) // inverted Pyramid printing -- already did full pyramid q.6
            if(row > 5)  // Pyramid printing
         }


(row <= n) 
    row-1 --> 0 spaces + 9 stars + 0 spaces   starsInRow => (maxStarsPossible - (2 * 0))
    row-2 --> 1 spaces + 7 stars + 1 spaces   starsInRow => (maxStarsPossible - (2 * 1))
    row-3 --> 2 spaces + 5 stars + 2 spaces   starsInRow => (maxStarsPossible - (2 * 2))
    row-4 --> 3 spaces + 3 stars + 3 spaces   starsInRow => (maxStarsPossible - (2 * 3))
    row-5 --> 4 spaces + 1 stars + 4 spaces   starsInRow => (maxStarsPossible - (2 * 4))

    This logic we already covered in inverted full pyramid code

(row > n) 
    row6 --> 3 spaces + 3 stars + 3 spaces
    row7 --> 2 spaces + 5 stars + 2 spaces
    row8 --> 1 spaces + 7 stars + 1 spaces
    row9 --> 0 spaces + 9 stars + 0 spaces

    Here, no of stars in rowNum = (2 * rowNum) - maxStarsPossible

*/

function hourGlassPatternStar(n: number) {
    let totalRows: number = (2 * n) - 1;
    let maxStarsPossible: number = (2 * n) - 1;
    let patRow: string = '';

    for(let row = 1; row <= totalRows; row++) {
        patRow = '';
        if(row <= n) {
            let starsInRow: number = (maxStarsPossible - (2 * (row - 1)));
            let spacesInRowEachSide: number = Math.floor((maxStarsPossible - starsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
            patRow += ' *'.repeat(starsInRow);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let starsInRow: number = ((2 * row) - maxStarsPossible);
            let spacesInRowEachSide: number = Math.floor((maxStarsPossible - starsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
            patRow += ' *'.repeat(starsInRow);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}

function hourGlassPatternNumber(n: number) {
    let totalRows: number = (2 * n) - 1;
    let maxNumsPossible: number = (2 * n) - 1;
    let patRow: string = '';

    for(let row = 1; row <= totalRows; row++) {
        patRow = '';
        if(row <= n) {
            let numsInRow: number = (maxNumsPossible - (2 * (row - 1)));
            let spacesInRowEachSide: number = Math.floor((maxNumsPossible - numsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
           for(let num = 1; num <= numsInRow; num++) patRow += ' ' + num;
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let numsInRow: number = ((2 * row) - maxNumsPossible);
            let spacesInRowEachSide: number = Math.floor((maxNumsPossible - numsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
           for(let num = 1; num <= numsInRow; num++) patRow += ' ' + num;
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}
function hourGlassPatternChar(n: number, startChar: string = 'A') {
    let totalRows: number = (2 * n) - 1;
    let maxCharsPossible: number = (2 * n) - 1;
    let patRow: string = '';
    let startCharIndex: number = startChar.charCodeAt(0) - 1;

    for(let row = 1; row <= totalRows; row++) {
        patRow = '';
        if(row <= n) {
            let charsInRow: number = (maxCharsPossible - (2 * (row - 1)));
            let spacesInRowEachSide: number = Math.floor((maxCharsPossible - charsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
           for(let charNum = 1; charNum <= charsInRow; charNum++) patRow += ' ' + String.fromCharCode(startCharIndex + charNum);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let charsInRow: number = ((2 * row) - maxCharsPossible);
            let spacesInRowEachSide: number = Math.floor((maxCharsPossible - charsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
           for(let charNum = 1; charNum <= charsInRow; charNum++) patRow += ' ' + String.fromCharCode(startCharIndex + charNum);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}