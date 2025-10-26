/*

* * * * 
* * * 
* * 
* 
* * 
* * * 
* * * * 

n = 7

row1 => 4 stars + 0 spaces
row2 => 3 stars + 1 spaces
row3 => 2 stars + 2 spaces
row4 => 1 stars + 3 spaces

row5 => 2 stars + 2 spaces
row6 => 3 stars + 1 spaces
row7 => 4 stars + 0 spaces

Here, we don't even need to account for spaces
just account for stars, spaces will be automatically accounted

*/

function pattern(n: number): void {

    const maxChars: number = Math.floor(n / 2) + 1;
    
    for(let i = maxChars; i >= 1; i--) {
        let patRow: string = '';
        patRow = '* '.repeat(i);
        console.log(patRow);
    }

    for(let i = 2; i <= maxChars; i++) {
        let patRow: string = '';
        patRow = '* '.repeat(i);
        console.log(patRow);
    }
}

pattern(7);