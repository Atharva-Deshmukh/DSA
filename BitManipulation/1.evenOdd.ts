// Checking Odd or Even

/* Logic:

either divide by 2 and check for remainder 
OR
check using the least significant bit(LSB)

LSB --> Least Significant Bit --> Righmost bit since any change in this causes very less significant change
MSB --> Most Significant Bit --> Leftmost bit since any change in this causes a very significant change

0 -->  0000
1 -->  0001
2 -->  0010
3 -->  0011
4 -->  0100
5 -->  0101
6 -->  0110
7 -->  0111

so (even) & (0001) -> 0   */

function checkEvenOdd(n: number): boolean {
    return Boolean(n&1);
}

console.warn(checkEvenOdd(12));
console.warn(checkEvenOdd(1));