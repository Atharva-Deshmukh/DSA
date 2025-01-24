/*

* * * * * * * * *   |   1 2 3 4 5 6 7 8 9   |   A B C D E F G H I
  *           *     |     1           7     |     A           G
    *       *       |       1       5       |       A       E
      *   *         |         1   3         |         A   C
        *           |           1           |           A

Pattern: (n = 5)
row-1 --> 0 spaces + 9 stars + 0 spaces   ((2 * (5 - (row - 1))) - 1 stars)
row-2 --> 1 spaces + 7 stars + 1 spaces   ((2 * (5 - (row - 1))) - 1 stars)
row-3 --> 2 spaces + 5 stars + 2 spaces   ((2 * (5 - (row - 1))) - 1 stars)
row-4 --> 3 spaces + 3 stars + 3 spaces   ((2 * (5 - (row - 1))) - 1 stars)
row-5 --> 4 spaces + 1 stars + 4 spaces   ((2 * (5 - (row - 1))) - 1 stars)

                                        OR

row-1 --> 0 spaces + 9 stars + 0 spaces   starsInRow => (maxStarsPossible - (2 * 0))
row-2 --> 1 spaces + 7 stars + 1 spaces   starsInRow => (maxStarsPossible - (2 * 1))
row-3 --> 2 spaces + 5 stars + 2 spaces   starsInRow => (maxStarsPossible - (2 * 2))
row-4 --> 3 spaces + 3 stars + 3 spaces   starsInRow => (maxStarsPossible - (2 * 3))
row-5 --> 4 spaces + 1 stars + 4 spaces   starsInRow => (maxStarsPossible - (2 * 4))
*/

function hollowInvertedPyramidStar(n: number) {
    let maxStars: number = ((2 * n) - 1);
    let patRow: string = '';
    
    for(let row = 1; row <= n; row++) {
       patRow = '';
       let starsInRow: number = (maxStars - (2 * (row - 1)));
       let spacesInRowEachSide: number = Math.floor((maxStars - starsInRow) / 2);
  
       if(row !== 1) {
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

function hollowInvertedPyramidNumber(n: number) {
    let maxNums: number = ((2 * n) - 1);
    let patRow: string = '';
    
    for(let row = 1; row <= n; row++) {
       patRow = '';
       let numsInRow: number = (maxNums - (2 * (row - 1)));
       let spacesInRowEachSide: number = Math.floor((maxNums - numsInRow) / 2);
  
       if(row !== 1) {
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

function hollowInvertedPyramidChar(n: number, startChar: string = 'A') {
    let maxChars: number = ((2 * n) - 1);
    let patRow: string = '';
    let startCharAsciiIndex: number = startChar.charCodeAt(0) - 1;
    
    for(let row = 1; row <= n; row++) {
       patRow = '';
       let charsInRow: number = (maxChars - (2 * (row - 1)));
       let spacesInRowEachSide: number = Math.floor((maxChars - charsInRow) / 2);
  
       if(row !== 1) {
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