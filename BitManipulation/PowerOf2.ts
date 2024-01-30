/*
Check if a number is power of 2

/* Logic: A power of two in binary has only one '1' bit. 

2 -->  0010
4 -->  0100
8 -->  1000

If you subtract 1 from a power of two, you get a binary number with all '1' bits.
1 -->  0001
3 -->  0011
7 -->  0111

so n & (n-1) -> 0
Hence power of two
*/

function powOfTwo(n: number): boolean {
    return ((n & (n-1)) === 0);
}

console.warn(powOfTwo(2));
console.warn(powOfTwo(3));
console.warn(powOfTwo(128));