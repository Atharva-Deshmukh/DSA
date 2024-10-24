/* 
2’s complement =  1 + 1’s complement

Significance: It is also used to store negative numbers

2's complement of "0111" is  "1001"        ||         2's complement of "1100" is  "0100"


Way 1: Obvious
- get ones complement and add 1 to it

Way 2: an OBSERVATION
- Start from the Least Significant Bit and traverse left until you find a 1.  
  Until you find 1, the bits stay the same
- Once you have found 1, let the 1 as it is, and now
- Flip all the bits left into the 1.

EXAMPLE => FIND 2s Complement of 100100

Step 1      =>  1 0 0 1 0 0
                      |
                   One Found

Step 2 and 3 =>  0 1 1 1 0 0
                       
Hence, the 2s complement of 100100 is 011100.

TC: O(len)
SC: O(1)

Logic is straight forward.
We could use bit manipulation to get rightmost set bit but for that, we need n in number form, we have a string input. */

let rightMostSetBitPositionIndex = (binary: string): number => {
    for(let i = binary.length-1; i >= 0; i--) {
        if(binary[i] === '1') return i;
    }
    return -1;
}

function TwosComplement(binary: string): string {
    let twosComp: string = '';

    // get rightmost set bit index and keep it as it is
    let rightMostSetBitIndex: number = rightMostSetBitPositionIndex(binary);

    // add number of 0s after rightMost set bit in 2s complement
    twosComp = '1' + '0'.repeat(binary.length - rightMostSetBitIndex - 1);

    // now invert all bits after this
    for(let i = rightMostSetBitIndex-1; i >= 0; i--) {
        twosComp = ((binary[i] === '1')? '0': '1') + twosComp;
    }

    return twosComp;
}