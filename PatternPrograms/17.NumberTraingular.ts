/*
    1 
   2 2 
  3 3 3 
 4 4 4 4 

n = 4
row1 -> 3 spaces + 1 nums + 3 spaces
row2 -> 2 spaces + 2 nums + 2 spaces
row3 -> 1 spaces + 3 nums + 1 spaces
row4 -> 0 spaces + 4 nums + 0 spaces

Pattern

rown -> (n - rowNum) spaces + rowNum times rowNum + (n - rowNum) spaces

 */

function pattern(n: number): void {

    for(let i = 1; i <= n; i++) {
        let patRow: string = '';

        patRow += ' '.repeat(n - i);
        for(let j = 1; j <= i; j++) {
            patRow += i + ' ';
        }
        patRow += ' '.repeat(n - i);
        console.log(patRow);
    }

}