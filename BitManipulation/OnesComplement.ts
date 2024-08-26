/* 1’s complement of a binary number is another binary number obtained by toggling all bits in it, i.e., 
[0 -> 1] && [1 -> 0]

For positive numbers, the 1's complement is simply a bit-flipped version of the binary number.

Ex:

            +5 ->  0101
1's Complement ->  1010

For negative numbers, the 1's complement is used as a way to represent the negative value in binary systems.
We don't practically calculate 1s complement for a negative number.

Ex:

            +5 ->  0101
            -5 ->  1010  

SIGNIFICANCE OF 1s complement:
- To represent negative numbers
- Simplifying Subtraction Addition. When you subtract a number, you can add its 1's complement 
  instead of performing direct subtraction.

TC: O(len)
SC: O(1) */

let flipBit = (char: string): string => (char === '0')? '1': '0';

function OnesComplement(binary: string): string {
    let onesComp: string = '';

    binary.split('').forEach((bit) => {
        onesComp += flipBit(bit);
    });

    return onesComp;
}