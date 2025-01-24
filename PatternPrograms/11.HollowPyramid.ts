/*

        *           |           1           |           A
      *   *         |         1   3         |         A   C
    *       *       |       1       5       |       A       E
  *           *     |     1           7     |     A           G
* * * * * * * * *   |   1 2 3 4 5 6 7 8 9   |   A B C D E F G H I

Pattern: (n = 5)

    - rows = 5, Maxcolumns = nth odd number => 9 (1, 3, 5, 7, 9)
                No of stars/row = (row)th odd number

    - row1 => 4 spaces + 1 stars + 4 spaces         stars = ((2 * 1) - 1)
    - row2 => 3 spaces + 3 stars + 3 spaces         stars = ((2 * 2) - 1)
    - row3 => 2 spaces + 5 stars + 2 spaces         stars = ((2 * 3) - 1)
    - row4 => 1 spaces + 7 stars + 1 spaces         stars = ((2 * 4) - 1)
    - row5 => 0 spaces + 9 stars + 0 spaces         stars = ((2 * 5) - 1)

    - maxStars = ((2 * n) - 1)
    - starsPerRow = ((2 * rowNum) - 1)
*/

function hollowPyramidStar(n: number) {
  let maxStars: number = ((2 * n) - 1);
  let patRow: string = '';
  
  for(let row = 1; row <= n; row++) {
     patRow = '';
     let starsInRow: number = ((2 * row) - 1);
     let spacesInRowEachSide: number = Math.floor((maxStars - starsInRow) / 2);

     if(row !== n) {
           patRow += '  '.repeat(spacesInRowEachSide);

           for(let starIndex = 1; starIndex <= starsInRow; starIndex++) {
               if((starIndex === 1) || (starIndex === starsInRow)) patRow += ' *';
               else patRow += '  ';
           }

           patRow += '  '.repeat(spacesInRowEachSide);
     } 
     else {
          for(let starIndex = 1; starIndex <= starsInRow; starIndex++) patRow += ' *';
     }     
     console.log(patRow);
  }
}

function hollowPyramidNumber(n: number) {
  let maxNum: number = ((2 * n) - 1);
  let patRow: string = '';
  
  for(let row = 1; row <= n; row++) {
     patRow = '';
     let numsInRow: number = ((2 * row) - 1);
     let spacesInRowEachSide: number = Math.floor((maxNum - numsInRow) / 2);

     if(row !== n) {
           patRow += '  '.repeat(spacesInRowEachSide);

           for(let num = 1; num <= numsInRow; num++) {
               if((num === 1) || (num === numsInRow)) patRow += ' ' + num;
               else patRow += '  ';
           }

           patRow += '  '.repeat(spacesInRowEachSide);
     } 
     else {
          for(let num = 1; num <= numsInRow; num++) patRow += ' ' + num;
     }     
     console.log(patRow);
  }
}
function hollowPyramidChar(n: number, startChar: string = 'A') {
  let maxChars: number = ((2 * n) - 1);
  let patRow: string = '';
  let startCharAsciiIndex: number = startChar.charCodeAt(0) - 1;
  
  for(let row = 1; row <= n; row++) {
     patRow = '';
     let charsInRow: number = ((2 * row) - 1);
     let spacesInRowEachSide: number = Math.floor((maxChars - charsInRow) / 2);

     if(row !== n) {
           patRow += '  '.repeat(spacesInRowEachSide);

           for(let charIndex = 1; charIndex <= charsInRow; charIndex++) {
               if((charIndex === 1) || (charIndex === charsInRow)) patRow += ' ' + String.fromCharCode(startCharAsciiIndex + charIndex);
               else patRow += '  ';
           }

           patRow += '  '.repeat(spacesInRowEachSide);
     } 
     else {
          for(let charIndex = 1; charIndex <= charsInRow; charIndex++) patRow += ' ' + String.fromCharCode(startCharAsciiIndex + charIndex);
     }     
     console.log(patRow);
  }
}