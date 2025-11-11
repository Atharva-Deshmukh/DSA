/*  
Input : 12345 Output : 15                  Input : 45632 Output :20

Iterative: 
get remainder by n/10 and u get a digit, now calculate the sum then

12345/10 --> 5 
1234/10 -->  4 
123/10 -->   3 
12/10 -->    2
1/10 -->     1

TC: O(d) d = number of digits
SC: O(1) */

function sumOfDigits_it(n: number): number {
    let sum = 0;
    if(n < 10) return n;

    while(n > 0) {
    sum += (n%10);
     n = Math.floor(n/10);   // since direct n/10 returns float in JS
    }

    return sum;
 }
 
 /* Recursive
    f(123)          --> 3 + 3 -> 6
        \
        f(12)       --> 2 + 1 --> 3    
          \
          f(1)      --> 1

    TC: O(d) d = number of digits
    SC: O(d) d = number of digits
 */
 function sumOfDigits_rec(n: number): number {
   if(n < 10) return n;
   
   if(n > 0) return (n%10) + sumOfDigits_rec(Math.floor(n/10));
 }
 
 let n: number = 45632;
 console.warn(sumOfDigits_it(n));