/*

        *    |            1    |            A
      * *    |          1 2    |          A B
    * * *    |        1 2 3    |        A B C
  * * * *    |      1 2 3 4    |      A B C D
* * * * *    |    1 2 3 4 5    |    A B C D E

Pattern:  (n === 5)
    row1 --> 4 spaces + 1 char     
    row2 --> 3 spaces + 2 char
    row3 --> 2 spaces + 3 char
    row4 --> 1 spaces + 4 char
    row5 --> 0 spaces + 5 char    --> (n - rowNum) spaces + (rowNum) chars

*/

function leftHalfPyramidStarPattern(n: number): void {
  for(let i = 1; i <= n; i++) {
    let patRow: string = '';
      // 2 spaces + space and *
    patRow += (('  ').repeat(n - i) + (' *').repeat(i));
    console.log(patRow);
  }
}

function leftHalfPyramidNumberPattern(n: number): void {
  for(let i = 1; i <= n; i++) {
    let patRow: string = '';
    let counter: number = 1;
    for(let j = 1; j <= n;) {
      while(j <= (n - i)) {patRow += '  '; j++;}
      while(j <= n) {patRow += ' ' + counter; counter++; j++;}
    }
    console.log(patRow);
  }
}

function leftHalfPyramidAlphabetPattern(n: number, startChar: string = 'A'): void {
  for(let i = 1; i <= n; i++) {
    let patRow: string = '';
    let counter: number = 1;
    let startCharAsciiCode: number = startChar.charCodeAt(0);
    for(let j = 1; j <= n;) {
      while(j <= (n - i)) {patRow += '  '; j++;}
      while(j <= n) {patRow += ' ' + String.fromCharCode(startCharAsciiCode + (counter - 1)); counter++; j++;}
    }
    console.log(patRow);
  }
}

