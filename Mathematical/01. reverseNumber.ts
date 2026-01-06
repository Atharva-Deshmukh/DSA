/* Input : num = 12345   Output: 54321

   Input : num = 87600   Output: 678
   Trailing zeros should be handle like this

Logic:
- let res;
- ignore the trailing zeros first using a while loop since there can be many zeros
- separate out digits of num and keep doing res*10 + digit except for the first digit

TC: O(log10(N)) since no. of digits in a number are Math.floor(log10(N)) + 1
SC: O(1) */

function revNum(n: number): number {
    if(n === 0) return 0;
    let res: number = 0;

    // ignore trailing zero till the first non-zero digit is obtained
    while(n%10 === 0) {
        n = Math.floor(n/10);
    }

    // start reversing as soon as the first non-zero digit is obtained
    while(n) {
        let digit: number = n%10;
        res = res*10 + digit;
        n = Math.floor(n/10);
    }

    return res;
}

/* This can be asked with an added constraint also and with sign

Leetcode 7. Reverse Integer

Given a signed 32-bit integer x, return x with its digits reversed. 
If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], 
then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Input: x = 123             -->     Output: 321

Input: x = -123            -->     Output: -321

Input: x = 120             -->     Output: 21

Input: x = 1534236469      -->     Output: 0
 
Constraints  ==>  -2^31 <= x <= 2^31 - 1 

                        TEMPLATE TO REMEMBER IN SUCH CASES OF OVERFLOWS
                        -----------------------------------------------

Number limit in JS: [-(2^53 - 1), (2^53 - 1)]

In this problem, there is a rule -> res must never go outside the 32-bit signed integer range [-2^31, 2^31 - 1]

We hence need to check overflow here -> res = res * 10 + lastDigit
before it occurs

If we do directly:
res = 214748364 and lastDigit = 8

res = res * 10 + lastDigit
res = 2147483648 ❌ overflow
💥 Too late. We already broke the rule.

LIMIT = 2^31 - 1 = 2147483647

so check if our res after (res * 10) > LIMIT
Dividing both sides by 10        res > LIMIT / 10

This can also be said in another way:
"does multiplying by 10 (shifting number to left) crosses the limit"

Hence first check added --> if(res > (LIMIT / 10))

Now, another check, as we know

LIMIT = 2^31 - 1 = 2147483647

We can reach here after res * 10 ==> (214748364 * 10) --> 2147483640 --> still upto 7 can be added
hence check if the digit is greater than 7 OR the last digit of LIMIT
because then we will get 2147483648, 2147483649... ALL ARE OVERFLOWS

hence second condition added --> if((res > LIMIT / 10) || (lastDigit > (LIMIT/10)) && res === (LIMIT/10))
*/

function reverse(n: number): number {
        if(n === 0) return 0;

        const isNegative: boolean = (n < 0)? true: false;

        // convert the number to positive else while(n > 0) won't run
        n = Math.abs(n);
        
        let res: number = 0;
        const LIMIT = 2 ** 31 - 1;
        const limitDiv10 = Math.floor(LIMIT / 10);

        while (n > 0) {
            const lastDigit = n % 10;

            if (res > limitDiv10 || (res === limitDiv10 && lastDigit > LIMIT % 10)) {
                return 0;
            }

            res = res * 10 + lastDigit;
            n = Math.floor(n / 10);
        }

        return (isNegative === true)? -res: res;
};