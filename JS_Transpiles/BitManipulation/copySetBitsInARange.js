/* Copy set bits in a range

Given two numbers x and y, and a range [l, r] where 1 <= l, r <= 32.
The task is consider set bits of y in range [l, r] and set these bits in x also.
Examples :

Input  : x = 10, y = 13, l = 2, r = 3
Output : x = 14
10 --> 1010
13 --> 1101.
There is one set bit in y at 3'rd position (in given range).
After we copy this bit to x, x becomes 1110 --> 14

Input  : x = 8, y = 7, l = 1, r = 2
Output : x = 11

8 --> 1000
7 --> 0111  ans --> 1011 --> 11

Way 1: Traverse both nums at a time from LSB to MSB and set the required bits in range [l, r]
TC: O(logN) SC: O(1)

Way 2: Make a mask and AND it with first number to get the set bits in that range
and then OR it with the second number to set the bits that were unset and keep set ones as it is.

IMPORTANT CONCEPT ->
The bit mask that has set bits in the range [L, R] can be generated using:
[(1 << (L-1)) - 1) ^ ((1 << R) - 1)]

                           L    R
A mask is created -->  0000111111000

TC: O(R) // just to create mask
SC: O(1)
*/
function createMaskInRange(L, R) {
    return (((1 << (L - 1)) - 1) ^ ((1 << R) - 1));
}
function copySetBitsInARange(A, B, L, R) {
    // corner case
    if ((L < 1) || (R > 32))
        return NaN;
    let mask = createMaskInRange(L, R);
    // get all set bits from B in range [L-R]
    mask = mask & B;
    // OR the mask with A to set the unset bits and keep set bits as it is
    A = A | mask;
    return A;
}
console.warn('A after flipping -> ', copySetBitsInARange(10, 13, 2, 3));
console.warn('A after flipping -> ', copySetBitsInARange(8, 7, 1, 2));
console.warn('A after flipping -> ', copySetBitsInARange(16, 2, 1, 3));
console.warn('A after flipping -> ', copySetBitsInARange(44, 3, 1, 5));
