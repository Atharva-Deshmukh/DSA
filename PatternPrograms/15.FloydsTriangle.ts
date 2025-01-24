/*
1          |   A
2 3        |   B C
4 5 6      |   D E F
7 8 9 10   |   G H I J

Pattern (n = 5)
- n = no of rows
- rowNum = no of chars/digits in that row
- counter = start from 1
  counter will be tracked automatically
*/

function floydsTriangleNumber(n: number) {
    let counter: number = 1;
    let patRow: string = '';

    for(let row = 1; row <= n; row++) {
        patRow = '';
        for(let num = 1; num <= row; num++) {
            patRow += ' ' + counter;
            counter++;
        }

        console.log(patRow);
    }
}

function floydsTriangleChars(n: number, starChar: string = 'A') {
    let counter: number = 1;
    let patRow: string = '';
    let startCharIndex: number = starChar.charCodeAt(0) - 1;

    for(let row = 1; row <= n; row++) {
        patRow = '';
        for(let charIndex = 1; charIndex <= row; charIndex++) {
            patRow += ' ' + String.fromCharCode(startCharIndex + counter);
            counter++;
        }

        console.log(patRow);
    }
}