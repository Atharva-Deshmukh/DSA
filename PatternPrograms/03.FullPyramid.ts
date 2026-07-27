/*
         *           |           1           |           A
       * * *         |         1 2 3         |         A B C
     * * * * *       |       1 2 3 4 5       |       A B C D E
   * * * * * * *     |     1 2 3 4 5 6 7     |     A B C D E F G
 * * * * * * * * *   |   1 2 3 4 5 6 7 8 9   |   A B C D E F G H I


Pattern: (n = 5)

    - rows = 5, Maxcolumns = nth odd number => 9 (1, 3, 5, 7, 9)
                No of stars/row = (row)th odd number

    - row1 => 4 spaces + 1 stars + 4 spaces         stars = ((2 * 1) - 1)
    - row2 => 3 spaces + 3 stars + 3 spaces         stars = ((2 * 2) - 1)
    - row3 => 2 spaces + 5 stars + 2 spaces         stars = ((2 * 3) - 1)
    - row4 => 1 spaces + 7 stars + 1 spaces         stars = ((2 * 4) - 1)
    - row5 => 0 spaces + 9 stars + 0 spaces         stars = ((2 * 5) - 1)

    So, total columns/row = max odd nums till n = ((2 * n) - 1);

    No. of spaces both sides of stars = (n - no of stars) / 2
*/

    function fullPyramidStar(n: number) {
        let cols: number = ((2 * n) - 1);
        let oddNumStarting: number = 1;
    
        for(let i = 1; i <= n; i++) {
            let patRow: string = '';
            let oddNumbersInTheRow: number = ((2 * i) - 1);
            let spacesEachSide: number = Math.floor((cols - oddNumbersInTheRow) / 2);
            patRow += '  '.repeat(spacesEachSide); // on left
    
            for(let j = oddNumStarting; j <= oddNumbersInTheRow; j++) {
                patRow += ' *';
            }
    
            patRow += '  '.repeat(spacesEachSide); // on right
            
            console.log(patRow);
        }
    }

    function fullPyramidNumber(n: number) {
        let cols: number = ((2 * n) - 1);
        let oddNumStarting: number = 1;
    
        for(let i = 1; i <= n; i++) {
            let patRow: string = '';
            let oddNumbersInTheRow: number = ((2 * i) - 1);
            let spacesEachSide: number = Math.floor((cols - oddNumbersInTheRow) / 2);
            patRow += '  '.repeat(spacesEachSide); // on left
    
            for(let j = oddNumStarting; j <= oddNumbersInTheRow; j++) {
                patRow += ' ' + j;
            }
    
            patRow += '  '.repeat(spacesEachSide); // on right
            
            console.log(patRow);
        }
    }

    function fullPyramidAlphabet(n: number, startChar: string = 'A') {
        let cols: number = ((2 * n) - 1);
        let oddNumStarting: number = 1;
        let asciiStartChar: number = startChar.charCodeAt(0);
    
        for(let i = 1; i <= n; i++) {
            let patRow: string = '';
            let oddNumbersInTheRow: number = ((2 * i) - 1);
            let spacesEachSide: number = Math.floor((cols - oddNumbersInTheRow) / 2);
            patRow += '  '.repeat(spacesEachSide); // on left
    
            // treat (j - 1) as increment in ASCII of start character, since we need first increment = 0 for A
            for(let j = oddNumStarting; j <= oddNumbersInTheRow; j++) {
                patRow += ' ' + (String.fromCharCode(asciiStartChar + (j - 1)));
            }
    
            patRow += '  '.repeat(spacesEachSide); // on right
            
            console.log(patRow);
        }
    }
