/*  2939. Maximum Xor Product: NEW THINGS TO LEARN here
WHENEVER MAX XOR, AND OR IS ASKED, think to build solution bit by bit

Given three integers a, b, and n, return the maximum value of (a XOR x) * (b XOR x) where 0 <= x < 2^n.
Since the answer may be too large, return it modulo 10^9 + 7.

Input: a = 12, b = 5, n = 4                             Output: 98
Explanation: For x = 2, (a XOR x) = 14 and (b XOR x) = 7. Hence, (a XOR x) * (b XOR x) = 98. 
It can be shown that 98 is the maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2^n.

Input: a = 6, b = 7 , n = 5                             Output: 930
Explanation: For x = 25, (a XOR x) = 31 and (b XOR x) = 30. Hence, (a XOR x) * (b XOR x) = 930.
It can be shown that 930 is the maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2^n.

Input: a = 1, b = 6, n = 3                              Output: 12
Explanation: For x = 5, (a XOR x) = 4 and (b XOR x) = 3. Hence, (a XOR x) * (b XOR x) = 12.
It can be shown that 12 is the maximum value of (a XOR x) * (b XOR x) for all 0 <= x < 2^n.

Constraints:
0 <= x < 2^n
0 <= a, b < 2^50
0 <= n <= 50

-------------------------------------------------------------
Brure Force:
- iterate for x from 0--2^n and get maximum value for (a XOR x) * (b XOR x).

Lets try to find some pattern in this:

Input: a = 1, b = 6, n = 3 
x = 0 = 0000 = (0001 ^ 0000) * (0110 ^ 0000) = 6
x = 1 = 0001 = (0001 ^ 0001) * (0110 ^ 0001) = 0
x = 2 = 0010 = (0001 ^ 0010) * (0110 ^ 0010) = 12
x = 3 = 0011 = (0001 ^ 0011) * (0110 ^ 0011) = 10
x = 4 = 0100 = (0001 ^ 0100) * (0110 ^ 0100) = 10
x = 5 = 0101 = (0001 ^ 0101) * (0110 ^ 0101) = 12
x = 6 = 0110 = (0001 ^ 0110) * (0110 ^ 0110) = 0
x = 7 = 0111 = (0001 ^ 0111) * (0110 ^ 0111) = 6

Input: a = 12, b = 5, n = 4  
x = 0  = 0000 = (1100 ^ 0000) * (0101 ^ 0000) = 60
x = 1  = 0001 = (1100 ^ 0001) * (0101 ^ 0001) = 52
x = 2  = 0010 = (1100 ^ 0010) * (0101 ^ 0010) = 98
x = 3  = 0011 = (1100 ^ 0011) * (0101 ^ 0011) = 90
x = 4  = 0100 = (1100 ^ 0100) * (0101 ^ 0100) = 8
x = 5  = 0101 = (1100 ^ 0101) * (0101 ^ 0101) = 0
x = 6  = 0110 = (1100 ^ 0110) * (0101 ^ 0110) = 30
x = 7  = 0111 = (1100 ^ 0111) * (0101 ^ 0111) = 22
x = 8  = 1000 = (1100 ^ 1000) * (0101 ^ 1000) = 52
x = 9  = 1001 = (1100 ^ 1001) * (0101 ^ 1001) = 60
x = 10 = 1010 = (1100 ^ 1010) * (0101 ^ 1010) = 90
x = 11 = 1011 = (1100 ^ 1011) * (0101 ^ 1011) = 98
x = 12 = 1100 = (1100 ^ 1100) * (0101 ^ 1100) = 0
x = 13 = 1101 = (1100 ^ 1101) * (0101 ^ 1101) = 8
x = 14 = 1110 = (1100 ^ 1110) * (0101 ^ 1110) = 22
x = 15 = 1111 = (1100 ^ 1111) * (0101 ^ 1111) = 30

But, here we see no pattern of any sort.

Recall that this kind of problems can be solved using bit by bit approach.

Fact 1: No of bits to represent 2^n. 

We have 0 <= x < 2^n

      7 6 5 4 3 2 1 0
2^2 = 0 0 0 0 0 1 0 0
2^5 = 0 0 1 0 0 0 0 0   
2^7 = 1 0 0 0 0 0 0 0         so 2^n === nth index in bit representation 

We have constraint: 0 <= a, b < 2^50
means, if n < say 2 ^ 3, it will have 3 bits atmost, not above that,
Hence, a & b will have 50 bits each max.

Fact 2: Xor of two numbers when one is not fully known, partial xor calculation is possible assumming unknown bits = 0

let a = 0 1 1 1
let b = ? 1 ? ?
 ---------------
        ? 0 ? ?       --> We can still keep the half xor for the remaining bits, and when we know other bits later, 
 ---------------          we will (b ^ earlier xor)

 Fact 3: For this question only
 
 for (a ^ x) * (b ^ x) to be max, both of them should be as max as possible.

 Approach:
 - Instead of iterating from 0 -- 2^n and calculating product, we will use bitwise xor approach
   Since, we have constraint of 2 ^ 50 which is huge
- we will bit by bit build the axorx & bxorx, Lets understand it through dry run.

                                            DRY RUN
                                                    
        ex: Input: a = 12, b = 5, n = 4                             Output: 98
        
     a   1 1 0 0            b   0 1 0 1
     x   ? ? ? ?            x   ? ? ? ?
         --------               --------
a xor x  0 0 0 0       b xor x  0 0 0 0     Both 0 initially,

Iterate from any direction, I will choose right to left, since that is simple.
Goal: To Maximise our product, try to keep max 1s in both xors

i = 0: we have unequal bit in a and b at this pos, Whenever bits are unequal,
       try to maximise the smaller of the two xors to increase the overall product
       if(axorx >= bxorx) set ith bit in bxorx, since axorx is already larger
       else set ith bit in axorx

     a   1 1 0 0            b   0 1 0 1
     x   ? ? ? 0            x   ? ? ? 0  -->    bit is set in xor means here it will have 0 bit
         --------               --------
a xor x  0 0 0 0       b xor x  0 0 0 1

i = 1: When bits are equal in both a and b at ith position, try to add set bit in the xor

     a   1 1 0 0            b   0 1 0 1
     x   ? ? 1 0            x   ? ? 1 0  --> x changes accordingly then
         --------               --------
a xor x  0 0 1 0       b xor x  0 0 1 1

i = 2: When bits are equal in both a and b at ith position, try to add set bit in the xor

     a   1 1 0 0            b   0 1 0 1
     x   ? 0 1 0            x   ? 0 1 0  --> x changes accordingly then
         --------               --------
a xor x  0 1 1 0       b xor x  0 1 1 1

i = 3: we have unequal bit in a and b at this pos, Whenever bits are unequal,
       try to maximise the smaller of the two xors,

     a   1 1 0 0            b   0 1 0 1
     x   0 0 1 0            x   0 0 1 0  --> x changes accordingly then
         --------               --------
a xor x  1 1 1 0       b xor x  0 1 1 1

a xor x = 14 and b xor x = 7, prod = 98 = MAX.

I have written a sample code for this but it won't work, since nowhere, we considered n

-----------------------------------------------------
One Improvement:

In SAMPLE_CODE, we are calculating xors, indirectly x, for all bit postitions, but 0 <= x < 2^n
But both 0 <= a, b < 2^50,

       49                         n     0
if  a = 1 0 1 1 0 1 1 0 1 0 1 0 1 0 1 0 1    n = 3
    x = 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ? ? ? 
    -------------------------------------
axorx   0 0 0 0 0 0 0 0 0 0 0 0 0 0 ? ? ?,

Instead of calculating for every bit like SAMPLE_CODE, we need to initialise all bits before (n - 1)
say if n = 3, so our x < 2^3, so x should be calculated from (n - 1)th to 0th bit only in our logic,
from bit 49 (since a and b < 2^50, so start with 49) to bit n, we need to prefill x, 
we simulate prefilling x by prefilling axorx and bxorx if a and b have those bits set.

TC: 
SC: O(1) */
function maximumXorProductSAMPLE_CODE(a: number, b: number, n: number): number {
    let mod: number = 1e9+7;
    let axorx: number = 0;
    let bxorx: number = 0;

    // prefill axorx and bxorx from 49th bit to nth bit
    for(let i = 49; i>=n; i--) {
        let a_ith_bit: boolean = (((a >> i) & 1) > 0);
        let b_ith_bit: boolean = (((b >> i) & 1) > 0);

        if(a_ith_bit === true) axorx = axorx ^ (1 << i);
        if(b_ith_bit === true) bxorx = bxorx ^ (1 << i);

        // if((a & (1 << i)) === 1) axorx = axorx ^ (1 << i); 
        // if((b & (1 << i)) === 1) bxorx = bxorx ^ (1 << i); 
    }

    for(let i = n - 1; i >= 0; i--) {
        // if current bit in a and b are equal, set this bit in axorx and bxorx
        let a_ith_bit: boolean = (((a >> i) & 1) > 0);
        let b_ith_bit: boolean = (((b >> i) & 1) > 0);

        if(a_ith_bit === b_ith_bit) {
            axorx = axorx ^ (1 << i);
            bxorx = bxorx ^ (1 << i);
        }
        // if current bit is not equal in a or b, then increase the smaller xor to maximise product
        else {
            if(axorx > bxorx) bxorx = bxorx ^ (1 << i);
            else axorx = axorx ^ (1 << i);
        }
    }

    return (axorx * bxorx);
}

/* ACCEPTED ON LEETCODE using bitint: 

In the for loop, operations like (1 << i) will fail for i >= 31 because JavaScript/TypeScript treats numbers 
as 32-bit signed integers when performing bitwise operations. As a result, values like 1 << 49 will produce 
incorrect results.

function maximumXorProduct(a: number, b: number, n: number): number {
    const mod: bigint = BigInt(1e9 + 7);
    let axorx: bigint = BigInt(0);
    let bxorx: bigint = BigInt(0);
    const bigA = BigInt(a);
    const bigB = BigInt(b);

    // Prefill axorx and bxorx from 49th bit to nth bit
    for (let i = 49; i >= n; i--) {
        const a_ith_bit = ((bigA >> BigInt(i)) & BigInt(1)) > BigInt(0);
        const b_ith_bit = ((bigB >> BigInt(i)) & BigInt(1)) > BigInt(0);

        if (a_ith_bit) axorx ^= BigInt(1) << BigInt(i);
        if (b_ith_bit) bxorx ^= BigInt(1) << BigInt(i);
    }

    for (let i = n - 1; i >= 0; i--) {
        const a_ith_bit = ((bigA >> BigInt(i)) & BigInt(1)) > BigInt(0);
        const b_ith_bit = ((bigB >> BigInt(i)) & BigInt(1)) > BigInt(0);

        if (a_ith_bit === b_ith_bit) {
            axorx ^= BigInt(1) << BigInt(i);
            bxorx ^= BigInt(1) << BigInt(i);
        } else {
            if (axorx > bxorx) {
                bxorx ^= BigInt(1) << BigInt(i);
            } else {
                axorx ^= BigInt(1) << BigInt(i);
            }
        }
    }

    return Number(((axorx % mod) * (bxorx % mod)) % mod);
};
*/