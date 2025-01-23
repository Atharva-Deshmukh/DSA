/* 

* * * * * * * * *   |   1 2 3 4 5 6 7 8 9   |   A B C D E F G H I
  * * * * * * *     |     1 2 3 4 5 6 7     |     A B C D E F G
    * * * * *       |       1 2 3 4 5       |       A B C D E
      * * *         |         1 2 3         |         A B C
        *           |           1           |           A
        

Pattern: (n = 5)
row-1 --> 0 spaces + 9 stars + 0 spaces   ((2 * 5) - 1 stars) ((2 * (5 - (row - 1))) - 1 stars)
row-2 --> 1 spaces + 7 stars + 1 spaces   ((2 * 4) - 1 stars) ((2 * (5 - (row - 1))) - 1 stars)
row-3 --> 2 spaces + 5 stars + 2 spaces   ((2 * 3) - 1 stars) ((2 * (5 - (row - 1))) - 1 stars)
row-4 --> 3 spaces + 3 stars + 3 spaces   ((2 * 2) - 1 stars) ((2 * (5 - (row - 1))) - 1 stars)
row-5 --> 4 spaces + 1 stars + 4 spaces   ((2 * 1) - 1 stars) ((2 * (5 - (row - 1))) - 1 stars)

                                        OR

row-1 --> 0 spaces + 9 stars + 0 spaces   starsInRow => (maxStarsPossible - (2 * 0))
row-2 --> 1 spaces + 7 stars + 1 spaces   starsInRow => (maxStarsPossible - (2 * 1))
row-3 --> 2 spaces + 5 stars + 2 spaces   starsInRow => (maxStarsPossible - (2 * 2))
row-4 --> 3 spaces + 3 stars + 3 spaces   starsInRow => (maxStarsPossible - (2 * 3))
row-5 --> 4 spaces + 1 stars + 4 spaces   starsInRow => (maxStarsPossible - (2 * 4))

*/

function invertedFullPyramidStar(n: number) {
    let patRow: string = '';
    let maxOfStarsInRow: number = (2 * (n - (1 - 1))) - 1;

    for(let row = 1; row <= n; row++) {
        patRow= '';
        let noOfStarsInRow: number = (2 * (n - (row - 1))) - 1;
        let noOfSpacesEachSide: number = Math.floor((maxOfStarsInRow - noOfStarsInRow)/2);

        patRow += '  '.repeat(noOfSpacesEachSide);
        patRow += ' *'.repeat(noOfStarsInRow);
        patRow += '  '.repeat(noOfSpacesEachSide);
        console.log(patRow);
    }
} 

function invertedFullPyramidNumber(n: number) {
    let patRow: string = '';
    let maxNumInRow: number = (2 * (n - (1 - 1))) - 1;

    for(let row = 1; row <= n; row++) {
        patRow= '';
        let totalNumsInRow: number = (2 * (n - (row - 1))) - 1;
        let noOfSpacesEachSide: number = Math.floor((maxNumInRow - totalNumsInRow)/2);

        patRow += '  '.repeat(noOfSpacesEachSide);
        for(let num = 1; num <= totalNumsInRow; num++) patRow += ' ' + num;
        patRow += '  '.repeat(noOfSpacesEachSide);
        console.log(patRow);
    }
} 

function invertedFullPyramidAlphabets(n: number, startChar: string = 'A') {
    let patRow: string = '';
    let maxCharsInRow: number = (2 * (n - (1 - 1))) - 1;

    // -1 is adjusted since we start inner loop from 1
    let startCharIndex: number = startChar.charCodeAt(0) - 1; 

    for(let row = 1; row <= n; row++) {
        patRow= '';
        let totalCharsInRow: number = (2 * (n - (row - 1))) - 1;
        let noOfSpacesEachSide: number = Math.floor((maxCharsInRow - totalCharsInRow)/2);

        patRow += '  '.repeat(noOfSpacesEachSide);
        for(let asciiPos = 1; asciiPos <= totalCharsInRow; asciiPos++) patRow += ' ' + (String.fromCharCode(startCharIndex + asciiPos));
        patRow += '  '.repeat(noOfSpacesEachSide);
        console.log(patRow);
    }
} 