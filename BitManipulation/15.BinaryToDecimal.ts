/* Input: 1010          Output: n = 10

- Iterate from [(binary.length - 1 )... 0]
- if the char is 1, multiply with respective Math.pow(2,curr_index)


TC: O(logn) since approx bits in a number is logn
SC: O(1) */

// A little niave way
function binaryToDecimal(binary: string): number {
    let decimal: number = 0;

    for(let i = binary.length - 1; i >= 0; i--) {
        if(binary[i] === '1') decimal += Math.pow(2,i);
    }

    return decimal;
}

// this can be made faster
function binaryToDecimalFaster(binary: string): number {
    let decimal: number = 0;
    let pow_2 = 1; // since 1 to sabhi me add hoga, 2 ^ 0 to hoga hi sab me

    for(let i = binary.length - 1; i >= 0; i--) {
        if(binary[i] === '1') decimal += pow_2;
        pow_2 = pow_2 << 1 ; //n = n * 2, left me iterate karte time double hote jaygega
                             // keep left shifting 1 by 1, it becomes power of 2 
    }

    return decimal;
}