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

n = 9

row1 -> 4 spaces + 1 char + 4 spaces
row2 -> 3 spaces + 3 char + 3 spaces
row3 -> 2 spaces + 5 char + 2 spaces
row4 -> 1 spaces + 7 char + 1 spaces
row5 -> 0 spaces + 9 char + 0 spaces

row6 -> 1 spaces + 7 char + 1 spaces
row7 -> 2 spaces + 5 char + 2 spaces
row8 -> 3 spaces + 3 char + 3 spaces
row9 -> 4 spaces + 1 char + 4 spaces

NOTE: in such questions where there are increasing decreasing combinations
like upper and lower pyramid
And, if we are given n = 5

automatically understand that we need to iterate till (2 * n) - 1 => 9
based on maxChar count

*/

function diamondPatternNumber(n: number): void {

    const maxChars: number = n;  // here maxChars = n only
    const mid: number = Math.floor(n / 2) + 1;  // for n = 9, mid = 5

    for (let i = 1; i <= n; i++) {
        let patRow: string = '';

        if (i <= mid) {
            const charsInThisRow: number = (2 * i) - 1;
            const spacesEachSide: number = Math.floor((maxChars - charsInThisRow) / 2);
            patRow = '  '.repeat(spacesEachSide) + '* '.repeat(charsInThisRow) + '  '.repeat(spacesEachSide);
        }
        else {
            const differenceOfiFromMid = i - mid;  // since i > mid
            const spacesEachSide: number = differenceOfiFromMid;
            const charsInThisRow: number = maxChars - (2 * spacesEachSide);
            patRow = '  '.repeat(spacesEachSide) + '* '.repeat(charsInThisRow) + '  '.repeat(spacesEachSide);
        }
        console.log(patRow);
    }

}

function diamondPatternNumber(n: number) {
    const maxChars: number = n;  // here maxChars = n only
    const mid: number = Math.floor(n / 2) + 1;  // for n = 9, mid = 5

    for (let i = 1; i <= n; i++) {
        let patRow: string = '';

        if (i <= mid) {
            const charsInThisRow: number = (2 * i) - 1;
            const spacesEachSide: number = Math.floor((maxChars - charsInThisRow) / 2);

            // numbers
            for (let j = 1; j <= charsInThisRow; j++) {
                patRow += j + ' ';
            }

            // now add spaces
            patRow = '  '.repeat(spacesEachSide) + patRow + '  '.repeat(spacesEachSide);
        }
        else {
            const differenceOfiFromMid = i - mid;  // since i > mid
            const spacesEachSide: number = differenceOfiFromMid;
            const charsInThisRow: number = maxChars - (2 * spacesEachSide);

            // numbers
            for (let j = 1; j <= charsInThisRow; j++) {
                patRow += j + ' ';
            }

            // now add spaces
            patRow = '  '.repeat(spacesEachSide) + patRow + '  '.repeat(spacesEachSide);
        }
        console.log(patRow);
    }
}

function diamondPatternChar(n: number, startChar: string = 'A') {
    const maxChars: number = n;  // here maxChars = n only
    const mid: number = Math.floor(n / 2) + 1;  // for n = 9, mid = 5

    for (let i = 1; i <= n; i++) {
        let patRow: string = '';

        if (i <= mid) {
            const charsInThisRow: number = (2 * i) - 1;
            const spacesEachSide: number = Math.floor((maxChars - charsInThisRow) / 2);

            const startingChar: string = 'A';

            // characters
            for (let j = 1; j <= charsInThisRow; j++) {
                patRow += String.fromCharCode(startingChar.charCodeAt(0) + (j - 1)) + ' ';
            }

            // now add spaces
            patRow = '  '.repeat(spacesEachSide) + patRow + '  '.repeat(spacesEachSide);
        }
        else {
            const differenceOfiFromMid = i - mid;  // since i > mid
            const spacesEachSide: number = differenceOfiFromMid;
            const charsInThisRow: number = maxChars - (2 * spacesEachSide);

            const startingChar: string = 'A';

            // numbers
            for (let j = 1; j <= charsInThisRow; j++) {
                patRow += String.fromCharCode(startingChar.charCodeAt(0) + (j - 1)) + ' ';
            }

            // now add spaces
            patRow = '  '.repeat(spacesEachSide) + patRow + '  '.repeat(spacesEachSide);
        }
        console.log(patRow);
    }

}