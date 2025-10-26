/*

*               *
* *           * *
* * *       * * *
* * * *   * * * *
* * * * * * * * *
* * * *   * * * *
* * *       * * *
* *           * *
*               *

n = 9

row1 -> 1 chars + 7 spaces + 1 chars
row2 -> 2 chars + 5 spaces + 2 chars
row3 -> 3 chars + 3 spaces + 3 chars
row4 -> 4 chars + 1 spaces + 4 chars

row5 = row(mid + 1) -> 9 chars

row6 -> 4 chars + 1 spaces + 4 chars
row7 -> 3 chars + 3 spaces + 3 chars
row8 -> 2 chars + 5 spaces + 2 chars
row9 -> 1 chars + 7 spaces + 1 chars

first 4 rows OR rows before mid:
- chars = rowNum, get spaces from this number 

last 4 rows OR rows after mid:
- spaces = series of odd numbers 1, 3, 5, 7 => get chars from this number now

*/

function pattern(n: number): void {

    const maxChars: number = n;
    const mid: number = Math.floor(n / 2) + 1;

    let oddNumberStarter: number = 1;

    for (let i = 1; i <= n; i++) {

        let patRow: string = '';

        if (i < mid) {
            const charsAtOneSide: number = i;
            const spaces: number = (maxChars - (2 * charsAtOneSide));
            patRow = '* '.repeat(charsAtOneSide) + '  '.repeat(spaces) + '* '.repeat(charsAtOneSide);
        }

        if (i === mid) patRow = patRow + '* '.repeat(maxChars);

        if (i > mid) {
            const spaces: number = oddNumberStarter;
            oddNumberStarter += 2; // update the current odd number
            const charsAtOneSide: number = Math.floor((maxChars - spaces) / 2);
            patRow = '* '.repeat(charsAtOneSide) + '  '.repeat(spaces) + '* '.repeat(charsAtOneSide);
        }

        console.log(patRow);
    }
}

pattern(9);