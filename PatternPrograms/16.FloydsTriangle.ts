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

row1 => 1 number 3 spaces
row2 => 2 number 2 spaces
row3 => 3 number 1 spaces
row4 => 4 number 1 spaces

Actually, we don't even need to account the spaces, directly print the numbers
spaces will be adjusted automatically
*/

function pattern(n: number): void {

    let counter: number = 1;

    for(let i = 1; i <= n; i++) {
        let patRow: string = '';

        for(let j = 1; j <= i; j++) {
            patRow += counter + ' ';
            counter++;
        }
        console.log(patRow);
    }
}

pattern(4);