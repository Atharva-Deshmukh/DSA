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

/* VARIATION ON LEETCODE ---------------------------------------------
2997. Minimum Number of Operations to Make Array XOR Equal to K

You are given a 0-indexed integer array nums and a positive integer k.

You can apply the following operation on the array any number of times:
Choose any element of the array and flip a bit in its binary representation. 
Return the minimum number of operations required to make the bitwise XOR of all elements of the final array equal to k.

Note that you can flip leading zero bits in the binary representation of elements. 
For example, for the number 101 you can flip the fourth bit and obtain 1101.


Input: nums = [2,1,3,4], k = 1              Output: 2

Explanation: We can do the following operations:
- Choose arr[2] which is 3 == 011, we flip the first bit and we obtain 010 == 2. nums becomes [2,1,2,4].
- Choose arr[0] which is 2 == 010, we flip the third bit and we obtain 110 = 6. nums becomes [6,1,2,4].
The XOR of elements of the final array is (6 ^ 1 ^ 2 ^ 4) == 1 == k.
It can be shown that we cannot make the XOR equal to k in less than 2 operations.


Input: nums = [2,0,2,0], k = 0              Output: 0

Explanation: The XOR of elements of the array is (2 ^ 0 ^ 2 ^ 0) == 0 == k. So no operation is needed.

BRUTE FORCE
- try every combination and then get the answer
- It is very time taking and complex.

Approach: note an observation regarding xor here
- Observations, when we xor many nos, even number of bits cancel out and odd bits remains.
          2 - 0010
          1 - 0001
          3 - 0011
          4 - 0100
          ---------
final XOR     0100  -> see, indices with odd number of bits will give 1 in xor and indices with even bits gives 0 in xor
our target k  0001

now take ((FINAL XOR) ^ k) and get bit count, thats our answer

TC: O(n)
SC: O(1) */

function minOperations(a: number[], k: number): number {
    let xor: number = a.reduce((acc, value) => acc ^ value);
    
    return countSetBits_BK_Algo(xor ^ k);
};
