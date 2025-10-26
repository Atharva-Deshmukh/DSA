/*

1
0 1
1 0 1
0 1 0 1

row1 => 1 number (starts with 1)
row2 => 2 number (starts with 0)
row3 => 3 number (starts with 1)
row4 => 4 number (starts with 0)

Logic:
based on even/odd row, determine starter
flip the bit of the starter while iterating the row
Way to flip => XOR

*/

function pattern(n: number): void {

    for(let i = 1; i <= n; i++) {

        let patRow: string = '';
        let starter: number = ((i % 2) === 0)? 0: 1;

        for(let j = 1; j <= i; j++) {
            patRow += starter + ' ';
            starter = starter ^ 1
        } 

        console.log(patRow);
    }
}
