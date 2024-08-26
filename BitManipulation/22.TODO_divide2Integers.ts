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

Way 2: Using Bit Manipulation

write in terms of 5 * since quotient nikaalna hai
25 = 5 * (2^2) + 5

Other ex: 43/8
43 = 8*(2^2 + 2^0) + 3

BE CAREFULL!!
The maximum positive integer that can be represented with a 32-bit signed integer is 2^31 - 1, 
When the result of b << i exceeds this maximum positive value, 
it wraps around to the minimum value of a 32-bit signed integer, which is -2^31. */

function divideBitManipulation(a: number, b: number): number {
    // Handle division by zero
    if (b === 0) {
      return Infinity;
    }
  
    a = Math.abs(a); // to handle negative numbers
    b = Math.abs(b);
    let temp = 0;
    let ans = 0;
  
    for (let i = 31; i >= 0; i--) {
  
      if ((temp + (b << i) <= a) && (b << i > 0)) {
        temp = temp + (b << i);
        ans = ans + (1 << i);
      }
    }
  
    return ans;
  }
  
console.warn('8/5 -> ', divideBitManipulation(8,5));
console.warn('80/12 -> ', divideBitManipulation(80,12));
console.warn("43/8 -> ", divideBitManipulation(43, 8));
