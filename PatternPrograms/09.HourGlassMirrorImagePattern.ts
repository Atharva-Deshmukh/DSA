/*

1 2 3 4
 2 3 4
  3 4
   4
  3 4
 2 3 4
1 2 3 4
      

Pattern: (n = 4)
- No of rows = (2n - 1) = 7

Note, here, we don't need right side spaces, since numbers are not exactly below one another,
they are midway between one another

(row <= n) 
    row-1 --> 0 spaces + 4 chars
    row-2 --> 1 spaces + 3 chars
    row-3 --> 2 spaces + 2 chars 
    row-4 --> 3 spaces + 1 chars 

(row > n) 
    row5  --> 2 spaces + 2 chars   2 spaces required and numbers started from 3 (spaces + 1)
    row6  --> 1 spaces + 3 chars   1 spaces required and numbers started from 2 (spaces + 1)
    row7  --> 0 spaces + 4 chars   0 spaces required and numbers started from 1 (spaces + 1)

Simply iterate from 0 -> 3 spaces. Keep incrementing spaces, then decrement spaces till 0 after 0
*/

function pattern(n: number) {
    const maxChars: number = n;
    const rows: number = (2 * maxChars) - 1;
    const mid: number = Math.floor(rows / 2) + 1;

    let spacesCount: number = 0;

    for (let i = 1; i <= rows; i++) {
        let patRow: string = '';

        if (i <= mid) {
            const spacesOnLeftSide: number = (i - 1);
            spacesCount = spacesOnLeftSide;  // this count will be used while reverse pyramid


            // numbers
            for(let j = i ; j <= maxChars; j++) patRow += j + ' ';

            // spaces
            patRow = ' '.repeat(spacesOnLeftSide) + patRow;
        }
        else {
            const spacesOnLeftSide: number = (spacesCount - 1);
            spacesCount--;

            // numbers
            for(let j = (spacesOnLeftSide + 1) ; j <= maxChars; j++) patRow += j + ' ';

            // spaces
            patRow = ' '.repeat(spacesOnLeftSide) + patRow;
        }

        console.log(patRow);
    }
}

pattern(4);