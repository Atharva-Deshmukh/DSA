/*
* * * * *    |    1 2 3 4 5    |    A B C D E
  * * * *    |      1 2 3 4    |      A B C D
    * * *    |        1 2 3    |        A B C
      * *    |          1 2    |          A B
        *    |            1    |            A

Pattern: (n = 5)
    row-1 --> 0 spaces + 5 stars
    row-2 --> 1 spaces + 4 stars
    row-3 --> 2 spaces + 3 stars
    row-4 --> 3 spaces + 2 stars
    row-5 --> 4 spaces + 1 stars

*/

function invertedRightPyramidStar(n: number) {
    for(let row = 1; row <= n; row++) {
        let patRow: string = '';

        patRow += '  '.repeat(row - 1);
        patRow += '* '.repeat(n - (row - 1));

        console.log(patRow);
    }
}

function invertedRightPyramidNumber(n: number) {
    for(let row = 1; row <= n; row++) {
        let patRow: string = '';
        let maxNumInRow: number = (n - (row - 1));
        let numStart: number = 1;

        patRow += '  '.repeat(row - 1);
        for(let num = numStart; num <= maxNumInRow; num++) patRow += num + ' ';

        console.log(patRow);
    }
}

function invertedRightPyramidCharacter(n: number, startChar: string = 'A') {
    for(let row = 1; row <= n; row++) {
        let patRow: string = '';
        let noOfCharcters: number = (n - (row - 1));
        // char starts from 1, hence we will add 1 in this start code to get 'A' 
        // +2 to get 'B'
        let charStartCode: number = startChar.charCodeAt(0) - 1;

        patRow += '  '.repeat(row - 1);
        for(let char = 1; char <= noOfCharcters; char++) patRow += String.fromCharCode(charStartCode + char) + ' ';

        console.log(patRow);
    }
}