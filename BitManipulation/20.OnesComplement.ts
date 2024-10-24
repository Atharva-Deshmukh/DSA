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

//Solution When a binary string is passed: 
let flipBit = (char: string): string => (char === '0')? '1': '0';

function OnesComplementStringInput(binary: string): string {
    let onesComp: string = '';

    binary.split('').forEach((bit) => {
        onesComp += flipBit(bit);
    });

    return onesComp;
}

// Solution when a number is passed in the input
function OnesComplementNumInput(n: number): number {

  // Edge case: 1's complement of 0 is 1
  if(n === 0) return 1;

  let mask: number = 0;
  let nPreserved: number = n;

  // create a mask of all 1s in the bit range of n
  while(n) {
      mask = (mask << 1) | 1; 
      n = n >> 1;
  }

  // xor flips 1s to 0s since they are same with mask bits and 0s to 1s since they
  // are different
  return (nPreserved ^ mask);
}