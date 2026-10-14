/*
* * * * *   |   1 2 3 4 5   |   A B C D E 
* * * *     |   1 2 3 4     |   A B C D
* * *       |   1 2 3       |   A B C
* *         |   1 2         |   A B
*           |   1           |   A

Pattern: (n = 5)
    Row-1 => 5 stars + 0 spaces
    Row-2 => 4 stars + 1 spaces
    Row-3 => 3 stars + 2 spaces
    Row-4 => 2 stars + 3 spaces
    Row-5 => 1 stars + 4 spaces

*/

function invertedRightHalfStar(n: number) {
    for(let row = 1; row <= n; row++) {
        let patRow: string = '';
        patRow += '* '.repeat(n - (row - 1));
        patRow += ' '.repeat(row - 1);
        console.log(patRow);
    }
}

// no of stars per row = nos to be printed
function invertedRightHalfNumber(n: number) {
    for(let row = 1; row <= n; row++) {
        let no_of_stars: number = (n - (row - 1));
        let no_of_spaces: number = (row - 1);

        let patRow: string = '';

        for(let j = 1; j <= no_of_stars; j++) patRow += ' ' + j;
        patRow += ' '.repeat(no_of_spaces);
        console.log(patRow);
    }
}

function invertedRightHalfAlphabets(n: number, startChar: string = 'A') {
    for(let row = 1; row <= n; row++) {
        let no_of_chars: number = (n - (row - 1));
        let no_of_spaces: number = (row - 1);
        let startingCharNumber: number = startChar.charCodeAt(0) - 1; // - 1 since j starts from 1, so adjusts

        let patRow: string = '';

        for(let j = 1; j <= no_of_chars; j++) patRow += ' ' + String.fromCharCode(startingCharNumber + j);
        patRow += ' '.repeat(no_of_spaces);
        console.log(patRow);
    }
}

