/* Input: 1010          Output: n = 10

- Iterate from [(binary.length - 1 )... 0]
- if the char is 1, multiply with respective Math.pow(2,curr_index)


TC: O(logn) since approx bits in a number is logn
SC: O(1) */

/* Way-1: Iterate from last -> 0
          if bit === 1, then Math.pow(2, reversed_index)

          reversed_index = (n - 1) - i

    3 2 1 0
    -------
    1 0 1 0     --> (n-1) -> 3
    -------
    0 1 2 3



    (n - 1) - i

*/
function binaryToDecimal(b: string): number {
        let num = 0;
        const n = b.length;
        
        for(let i = (n - 1); i >= 0; i--) {
            if(b[i] == '1') num += Math.pow(2, ((n - 1) - i));
        }
        
        return num;
}

// this can be made faster by using (1 << x) to simulate (2 ^ x)
function binaryToDecimalFaster(binary: string): number {
    let decimal: number = 0;
    let pow_2 = 1; // initialise 1

    // keep left shifting pow_2 (1 here) and whenever we have current bit = 1, just add it in the decimal
    for(let i = binary.length - 1; i >= 0; i--) {
        if(binary[i] === '1') decimal += pow_2;
        pow_2 = pow_2 << 1 ; //n = n * 2, left me iterate karte time double hote jaygega
                             // keep left shifting 1 by 1, it becomes power of 2 
    }

    return decimal;
}