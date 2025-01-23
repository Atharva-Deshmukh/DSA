/*
        *           |           1           |           A
      * * *         |         1 2 3         |         A B C
    * * * * *       |       1 2 3 4 5       |       A B C D E
  * * * * * * *     |     1 2 3 4 5 6 7     |     A B C D E F G
* * * * * * * * *   |   1 2 3 4 5 6 7 8 9   |   A B C D E F G H I
  * * * * * * *     |     1 2 3 4 5 6 7     |     A B C D E F G
    * * * * *       |       1 2 3 4 5       |       A B C D E
      * * *         |         1 2 3         |         A B C
        *           |           1           |           A

Pattern: (n = 5)
- No of rows = (2n - 1)
- Thought process:

         for(row = 1; row <= (2n - 1); row++) {
            if(row <= 5) // sidha printing -- already did full pyramid q.3
            if(row > 5)  // ulta printing
         }


(row <= n) 
    row1 --> 4 spaces + 1 stars + 4 spaces
    row2 --> 3 spaces + 3 stars + 3 spaces
    row3 --> 2 spaces + 5 stars + 2 spaces
    row4 --> 1 spaces + 7 stars + 1 spaces
    row5 --> 0 spaces + 9 stars + 0 spaces

(row > n) 
    row6 --> 1 spaces + 7 stars + 1 spaces
    row7 --> 2 spaces + 5 stars + 2 spaces
    row8 --> 3 spaces + 3 stars + 3 spaces
    row9 --> 4 spaces + 1 stars + 4 spaces

    each row will have ((2*row) - 1) stars 
    Max stars = when row = n

    For inverted pyramid:
    row6: 
       (6 - 1) = 1 = (totalSpacesInRow/2), we can get stars from here

*/

function diamondPatternStars(n: number) {
    let totalRows: number = (2 * n) - 1;
    let maxStarsPossible: number = (2 * n) - 1;
    let patRow: string = '';

    for(let row = 1; row <= totalRows; row++) {
        patRow = '';
        if(row <= n) {
            let starsInRow: number = ((2 * row) - 1);
            let spacesInRowEachSide: number = Math.floor((maxStarsPossible - starsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
            patRow += ' *'.repeat(starsInRow);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let spacesInRowEachSide: number = (row - n);
            let starsInRow: number = (maxStarsPossible - (2 * spacesInRowEachSide));

            patRow += '  '.repeat(spacesInRowEachSide);
            patRow += ' *'.repeat(starsInRow);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}

function diamondPatternNumber(n: number) {
    let totalRows: number = (2 * n) - 1;
    let maxNumsPossible: number = (2 * n) - 1;
    let patRow: string = '';

    for(let row = 1; row <= totalRows; row++) {
        patRow = '';
        if(row <= n) {
            let numsInRow: number = ((2 * row) - 1);
            let spacesInRowEachSide: number = Math.floor((maxNumsPossible - numsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
            for(let num = 1; num <= numsInRow; num++) patRow += ' ' + num;
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let spacesInRowEachSide: number = (row - n);
            let numsInRow: number = (maxNumsPossible - (2 * spacesInRowEachSide));

            patRow += '  '.repeat(spacesInRowEachSide);
            for(let num = 1; num <= numsInRow; num++) patRow += ' ' + num;
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}

function diamondPatternChar(n: number, startChar: string = 'A') {
    let totalRows: number = (2 * n) - 1;
    let maxCharsPossible: number = (2 * n) - 1;
    let patRow: string = '';
    let startCharIndex: number = startChar.charCodeAt(0) - 1;

    for(let row = 1; row <= totalRows; row++) {
        patRow = '';
        if(row <= n) {
            let charsInRow: number = ((2 * row) - 1);
            let spacesInRowEachSide: number = Math.floor((maxCharsPossible - charsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);
            for(let charNum = 1; charNum <= charsInRow; charNum++) patRow += ' ' + String.fromCharCode(startCharIndex + charNum);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let spacesInRowEachSide: number = (row - n);
            let charsInRow: number = (maxCharsPossible - (2 * spacesInRowEachSide));

            patRow += '  '.repeat(spacesInRowEachSide);
            for(let charNum = 1; charNum <= charsInRow; charNum++) patRow += ' ' + String.fromCharCode(startCharIndex + charNum);
            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}