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

/* VARIATION ON LEETCODE ---------------------------------------------
1318. Minimum Flips to Make a OR b Equal to c, flip a and b such that ((a | b) = c)

ex: 
    a -- 0010     a -- 0001
    b -- 0110     b -- 0100           ANS => 3

    c -- 0101     c -- 0101

TRUTH TABLE OF OR

     A    B
    --------
1  | 1    1
1  | 1    0
1  | 0    1
0  | 0    0


Approach:
- keep comparing the rightmost/last bits of a, b and c.
  (n & 1) => for last bit
      >>  => keep shifting right to iterate every bit pos

- if last bit of c === 1, atleast one of a's and b's last bits need to be 1
  if last bit of a === 0 &&  last bit of b === 0, flip any of them, so flip++

- if last bit of c === 0, both of a's and b's last bits need to be 0
  if last bit of a === 1, flip++
  if last bit of b === 1, flip++, if 0 hoga to automatically hi no flip needed 

TC: O(log2(Max(a, b, c)))
SC: O(1) */

function minFlips(a: number, b: number, c: number): number {
    let flip: number = 0;

   // loop untill we exhaust all three
   while(a || b || c) {

     if((c & 1) === 1) {
        if(((a & 1) === 0) && ((b & 1) === 0)) flip++;
    } else {
        if((a & 1) === 1) flip++;
        if((b & 1) === 1) flip++;
    }

    a >>= 1;
    b >>= 1;
    c >>= 1;
   }

    return flip;
};
