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

(row <= n) 
    row-1 --> 0 spaces + 9 stars + 0 spaces  
    row-2 --> 1 spaces + 7 stars + 1 spaces 
    row-3 --> 2 spaces + 5 stars + 2 spaces 
    row-4 --> 3 spaces + 3 stars + 3 spaces 
    row-5 --> 4 spaces + 1 stars + 4 spaces 

(row > n) 
    row6 --> 3 spaces + 3 stars + 3 spaces
    row7 --> 2 spaces + 5 stars + 2 spaces
    row8 --> 1 spaces + 7 stars + 1 spaces
    row9 --> 0 spaces + 9 stars + 0 spaces

*/

function hourGlassPatternStar(n: number) {
    const maxChars: number = (2 * n) - 1;
    const mid: number = Math.floor(maxChars / 2) + 1;

    let oddNumStarter: number = 3;

    for (let i = 1; i <= maxChars; i++) {
        let patRow: string = '';

        if (i <= mid) {
            const spacesOnEachSide: number = (i - 1);
            const charsInTheRow: number = maxChars - (2 * spacesOnEachSide);

            patRow = '  '.repeat(spacesOnEachSide) + '* '.repeat(charsInTheRow) + '  '.repeat(spacesOnEachSide);
        }
        else {
            const charsInTheRow: number = oddNumStarter;
            oddNumStarter += 2; // update the current odd number

            const spacesOnEachSide: number = Math.floor((maxChars - charsInTheRow) / 2);

            patRow = '  '.repeat(spacesOnEachSide) + '* '.repeat(charsInTheRow) + '  '.repeat(spacesOnEachSide);
        }

        console.log(patRow);
    }
}

function hourGlassPatternNumber(n: number) {
    const maxChars: number = (2 * n) - 1;
    const mid: number = Math.floor(maxChars / 2) + 1;

    let oddNumStarter: number = 3;

    for (let i = 1; i <= maxChars; i++) {
        let patRow: string = '';

        if (i <= mid) {
            const spacesOnEachSide: number = (i - 1);
            const charsInTheRow: number = maxChars - (2 * spacesOnEachSide);

            // add numbers
            for (let j = 1; j <= charsInTheRow; j++) {
                patRow += j + ' ';
            }

            // add spaces now
            patRow = '  '.repeat(spacesOnEachSide) + patRow + '  '.repeat(spacesOnEachSide);
        }
        else {
            const charsInTheRow: number = oddNumStarter;
            oddNumStarter += 2; // update the current odd number

            const spacesOnEachSide: number = Math.floor((maxChars - charsInTheRow) / 2);

            // add numbers
            for (let j = 1; j <= charsInTheRow; j++) {
                patRow += j + ' ';
            }

            // add spaces now
            patRow = '  '.repeat(spacesOnEachSide) + patRow + '  '.repeat(spacesOnEachSide);
        }

        console.log(patRow);
    }
}

function hourGlassPatternChar(n: number) {
    const maxChars: number = (2 * n) - 1;
    const mid: number = Math.floor(maxChars / 2) + 1;
    const startChar: string = 'A';

    let oddNumStarter: number = 3;

    for (let i = 1; i <= maxChars; i++) {
        let patRow: string = '';

        if (i <= mid) {
            const spacesOnEachSide: number = (i - 1);
            const charsInTheRow: number = maxChars - (2 * spacesOnEachSide);

            // add characters
            for (let j = 1; j <= charsInTheRow; j++) {
                patRow += String.fromCharCode(startChar.charCodeAt(0) + (j - 1)) + ' ';
            }

            // add spaces now
            patRow = '  '.repeat(spacesOnEachSide) + patRow + '  '.repeat(spacesOnEachSide);
        }
        else {
            const charsInTheRow: number = oddNumStarter;
            oddNumStarter += 2; // update the current odd number

            const spacesOnEachSide: number = Math.floor((maxChars - charsInTheRow) / 2);

            // add characters
            for (let j = 1; j <= charsInTheRow; j++) {
                patRow += String.fromCharCode(startChar.charCodeAt(0) + (j - 1)) + ' ';
            }

            // add spaces now
            patRow = '  '.repeat(spacesOnEachSide) + patRow + '  '.repeat(spacesOnEachSide);
        }

        console.log(patRow);
    }
}