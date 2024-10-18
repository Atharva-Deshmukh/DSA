/* Divide two integers without using *, / and % operator

                        dividend = divisor * quotient + remainder

Way 1: Keep subtracting the divisor from the dividend until the dividend <= divisor. 
       remainder = dividend
       quotient  = the number of times subtraction is done

ex: 25/5 --> 25-5
             20-5
             15-5
             10-5
              5-5
            ________________
             0 = dividend = remainder 
             5 = no. of subtraction occurred = quotient

TC : O(a/b)  bcoz loop continues till we get the quotient itself
SC : O(1)

---------------------------------------------------------------------------
Way 2: Using Bit Manipulation

- Write in terms of (divisor * something), something = quotient which we have to find
- Every number can be written in terms of 2's powers since every number can be represented in binary
- With the help of 2's power, we will try making the quotient
- Also, (num * 2^3) === (num << 3)
- from 31st to 0th bit posn, try (divisor * 2's power), and accept this 2s power if (divisor * 2's power) <= dividend

ex: 25 = 5 * (2^2) + 5
ex: 25 = 5 * 4 + 5

ex: 43 = 8 * 5 + 3
ex: 43 = 8 * (2^2 + 2^0) + 3

BE CAREFULL!!
The maximum positive integer that can be represented with a 32-bit signed integer is 2^31 - 1, 
When the result of b << i exceeds this maximum positive value, 
it wraps around to the minimum value of a 32-bit signed integer, which is -2^31. */

function divideUsingBitManipulation(a: number, b: number): number {
    // Handle division by zero
    if (b === 0) {
      return Infinity;
    }

    let a1: number = a;
    let b1: number = b;
  
    a = Math.abs(a); // to handle negative numbers
    b = Math.abs(b);
    let temp = 0;
    let ans = 0;
  
    for (let i = 31; i >= 0; i--) {
      if ((temp + (b << i) <= a) && ((b << i) > 0)) {
        temp = temp + (b << i);
        ans = ans + (1 << i);
      }
    }
  
    // dono positive nahi, dono negative nahi, only atleast one of them is negative
    // could do that by checking if(a/b) < 0, but '/' is not allowed.
    let sign = (a1 < 0) !== (b1 < 0) ? -1 : 1;
    return ans * sign;
  }
