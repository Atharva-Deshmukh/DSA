/*

                1
              2 1 2
            3 2 1 2 3
          4 3 2 1 2 3 4

rows = 4, max nums = 7  => ((2 * rows) - 1)

row1 => 3 spaces + 1 numbers + 3 spaces
row2 => 2 spaces + 3 numbers + 2 spaces
row3 => 1 spaces + 5 numbers + 1 spaces
row4 => 0 spaces + 7 numbers + 0 spaces 

LOGIC:
- first, figure out the numbers
- each row, we have numbers till i only, ex row2 => we have max 2, row3 => we have max 3
- so we initialise string = '1' and keep prepending and appending, since its a palindrome
- prepend and append spaces in end */

function pattern(n: number): void {
    const maxNums = (2 * n) - 1;

    for(let i = 1; i <= n; i++) {

        const numsInThisRow: number = (2 * i) - 1;
        const spacesEachSide: number = Math.floor((maxNums - numsInThisRow) / 2);
 
        let patRow: string = '';
        

        // numbers
        for(let j = 1; j <= i; j++) {
            if(j === 1) patRow += j + ' ';
            else patRow = j + ' ' + patRow + j + ' ';
        }


        // left spaces
        patRow = '  '.repeat(spacesEachSide) + patRow;;

        // right spaces
        patRow += '  '.repeat(spacesEachSide);
        
        console.log(patRow);
    }
}