/* Count number of bits to be flipped to convert A to B (1st no to second number)

10 --> 00001010        ans --> 4
20 --> 00010100

7 --> 0111             ans --> 3
9 --> 1001 

Way 1: Iteration start karo from LSB. Take & of every bit with 1 in both and compare
       If (A & 1) !== (B & 1), this bit needs to be flipped

TC: O(logN) SC: O(1)
       
Way 2: Just take XOR and count set bits in XOR, u will get unequal bits that needs to be flipped */

function countSetBits_BK_Algo(n: number): number {
    let count = 0;
    while(n > 0) {
        n = n & (n-1);
        count++;
    }
    return count;
}

function bitsToBeFlipped(A: number, B: number): number {
    return countSetBits_BK_Algo(A ^ B);
}
