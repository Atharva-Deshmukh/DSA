/*
        *           |           1           |           A
      *   *         |         1   3         |         A   C
    *       *       |       1       5       |       A       E
  *           *     |     1           7     |     A           G
*               *   |   1               9   |   A               I
  *           *     |     1           7     |     A           G
    *       *       |       1       5       |       A       E
      *   *         |         1   3         |         A   C
        *           |           1           |           A

Pattern: (n = 5)
- No of rows = (2n - 1)
- Thought process:

         for(row = 1; row <= (2n - 1); row++) {
            if(row <= 5) // sidha printing -- already did full pyramid q.11
            if(row > 5)  // ulta printing -- q.12
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

    For inverted pyramid:
    row6: 
       (6 - 1) = 1 = (totalSpacesInRow/2), we can get stars from here
       (rowNum - 1) = (totalSpacesInRow/2)

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

            for(let starIndex = 1; starIndex <= starsInRow; starIndex++) {
                if((starIndex === 1) || (starIndex === starsInRow)) patRow += ' *';
                else patRow += '  ';
            }

            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let spacesInRowEachSide: number = (row - n);
            let starsInRow: number = (maxStarsPossible - (2 * spacesInRowEachSide));

            patRow += '  '.repeat(spacesInRowEachSide);
            
            for(let starIndex = 1; starIndex <= starsInRow; starIndex++) {
                if((starIndex === 1) || (starIndex === starsInRow)) patRow += ' *';
                else patRow += '  ';
            }

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

            for(let num = 1; num <= numsInRow; num++) {
                if((num === 1) || (num === numsInRow)) patRow += ' ' + num;
                else patRow += '  ';
            }

            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let spacesInRowEachSide: number = (row - n);
            let numsInRow: number = (maxNumsPossible - (2 * spacesInRowEachSide));

            patRow += '  '.repeat(spacesInRowEachSide);
            
            for(let num = 1; num <= numsInRow; num++) {
                if((num === 1) || (num === numsInRow)) patRow += ' ' + num;
                else patRow += '  ';
            }

            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}

function diamondPatternChar(n: number, startChar: string = 'A') {
    let totalRows: number = (2 * n) - 1;
    let maxCharsPossible: number = (2 * n) - 1;
    let patRow: string = '';
    let startCharAsciiPos: number = startChar.charCodeAt(0) - 1;

    for(let row = 1; row <= totalRows; row++) {
        patRow = '';
        if(row <= n) {
            let charsInRow: number = ((2 * row) - 1);
            let spacesInRowEachSide: number = Math.floor((maxCharsPossible - charsInRow) / 2);

            patRow += '  '.repeat(spacesInRowEachSide);

            for(let charIndex = 1; charIndex <= charsInRow; charIndex++) {
                if((charIndex === 1) || (charIndex === charsInRow)) patRow += ' ' + String.fromCharCode(startCharAsciiPos + charIndex);
                else patRow += '  ';
            }

            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        } else {
            let spacesInRowEachSide: number = (row - n);
            let charsInRow: number = (maxCharsPossible - (2 * spacesInRowEachSide));

            patRow += '  '.repeat(spacesInRowEachSide);
            
            for(let charIndex = 1; charIndex <= charsInRow; charIndex++) {
                if((charIndex === 1) || (charIndex === charsInRow)) patRow += ' ' + String.fromCharCode(startCharAsciiPos + charIndex);
                else patRow += '  ';
            }

            patRow += '  '.repeat(spacesInRowEachSide);

            console.log(patRow);
        }
    }
}
