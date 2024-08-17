/* 1’s complement of a binary number is another binary number obtained by toggling all bits in it, i.e., 
transforming the 0 bit to 1 and the 1 bit to 0.In the 1’s complement format , the positive numbers remain unchanged. 
The negative numbers are obtained by taking the 1’s complement of positive counterparts.

for example +9 will be represented as 00001001 in eight-bit notation and -9 will be represented as 11110110, 
which is the 1’s complement of 00001001. 

TC: O(len)
SC: O(1)
*/

let flipBit = (char: string): string => (char === '0')? '1': '0';

function OnesComplement(binary: string): string {
    let onesComp: string = '';

    binary.split('').forEach((bit) => {
        onesComp += flipBit(bit);
    });

    return onesComp;
}