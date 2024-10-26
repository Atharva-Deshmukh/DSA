/* 1611 HARD - Minimum One Bit Operations to Make Integers Zero 

Given an integer n, you must transform it into 0 using the following operations any number of times:

- Flip the rightmost bit
- Change the ith bit in the binary representation of n if the (i-1)th bit is set to 1 and 
  the (i-2)th through 0th bits are set to 0.
  It means, (i-1)th bit ke baad agar koi bit hai to sab 0 hone chaiye.

Return the minimum number of operations to transform n into 0.

Input: n = 3                Output: 2
Explanation: The binary representation of 3 is "11".
"11" -> "01" with the 2nd operation since the 0th bit is 1. (Assume, all the bits after rightmost are all 0)
"01" -> "00" with the 1st operation.

Input: n = 6                Output: 4
Explanation: The binary representation of 6 is "110".
"110" -> "010" with the 2nd operation since the 1st bit is 1 and 0th through 0th bits are 0.
"010" -> "011" with the 1st operation.
"011" -> "001" with the 2nd operation since the 0th bit is 1.
"001" -> "000" with the 1st operation.

Hints in LC:

Hint 1
The fastest way to convert n to zero is to remove all set bits starting from the leftmost one. 
Try some simple examples to learn the rule of how many steps are needed to remove one set bit.

Hint 2
consider n=2^k case first (where there is only one 1 bit), then solve for all n.

let n = 2 - 10
            10 = 11 --> o1      2^1 --> 3
            11 = 01 --> o2
            01 = 00 --> o1 

let n = 4 - 100
            100 = 101 --> o1
            101 = 111 --> o2, for index = 1, 0th index = 1 and after 0th index, no bits so can be assumed = 0
            111 = 110 --> o1
            110 = 010 --> o2   2^2 --> 7
            010 = 011 --> o1
            011 = 001 --> o2
            001 = 000 --> o1

Thought process:
- Decide the direction of solving first.
  ex: n = 010000, so, if we solve from right to left, we need to make sure that to turn ith bit = 0, (i - 1)th bit 
  should be 1, so better to solve from left to right, since fastest way for n -> 0 = eliminate all leftmost bits

  Go by hint: Solve from left -> right

- now, break this problem into sub-problems as per the hint of the question.

  Subproblem: Take only powers of 2 first

  ex: n = 0100 --> 0010 --> 0000  to convert ith bit -> 0, (i - 1)th bit = 1 in some x steps
      0000 --> 0010  see, if this takes some x steps
      0010 --> 0000  Obviously, vice-versa will also take x steps

  so, 0100 -> 0000, we need: 
    x (0000 -> 0010, to make (i-1) = 1) + 1 (ith bit = 0) + x (0010 --> 0000) = 2x + 1
    x = no of steps to unset ith bit when n has only 1 bit = F(i)

    F(i) = no of steps to convert a number to 0 if that number has only ith set bit

    so F(i) = 2 * F(i - 1) + 1 for n = pow(2);

    It goes something like DP and recursion, we can get the base case here itself
    we know, if n = 0010 (2), ans = 3, (1st bit in n is set)
    using our equation: F(1) = 2 * F(0) + 1
                        F(0) means such number whose 0th bit is set, it is 1 itself, ops for 1 --> 0 = 1 only,
                        Hence, F(0) = 1

    Now, what if n = 10010, where multiple bits are set.

    10010 --------------- 01010 ------------ 00000, intermediate steps me vo beech ka number ek baar to aaya hoga
          |------a---------|---------b-----|  
          |--------------total-------------|        b = total - a

    So, F(01010-00000) = F(10010-00000) - F(10010-01010)   left most set bit gaya ab
             F(4)      =       F(4)     -   now, focus on i = 3 only, ignore other set bits, we made i = 3 [0 -> 1], its equivalent to [1 -> 0]
                                           (F(0000) - F(1000)) 
                                           (F(0) - F(3))
                                           (F(3) - F(0))   since 0001 -> 0000 === 0000 -> 0001 steps

                                here, we ignored remaining set bits after i, so, we took F(0), its actually F(i-1)
            hence F(4) = F(4) - F(3) + F(1) - F()... whichever positions are set, in alternate + and - signs,

            so F(110010) = F(100000) - F(10010) + F(10), so, alternate + and - signs for all set bit postions,

            these F(i)s will be precalculated and stored in dp[] using tabulation method using our F(i) = 2 * F(i-1) + 1
                                                                                                        formula

TC: O(32) = constant
SC: O(32) = constant */

function minimumOneBitOperations(n: number): number {
  // corner cases
 if(n === 0) return 0;
 if(n === 1) return 1;

 let F: number[] = [];  // F(i) = no of steps to make n -> 0 if n has only ith bit set

 F[0] = 1; // 01 -> 00 = 1
 F[1] = 3  // 10 -> 11 -> 01 -> 00 = 3

 // tabulation (consering, a number has 32 bits)
 for(let i = 2; i < 32; i++) F[i] = 2 * F[i - 1] + 1;

 // solve problem from left to right
 let sign: number = 1;
 let count: number = 0;
 for(let i = 31; i >= 0; i--) {
   if(n & (1 << i)) {
     count += (sign * F[i]);
     sign = (-1 * sign); // reverse the sign
   }
 }

 return count;
}