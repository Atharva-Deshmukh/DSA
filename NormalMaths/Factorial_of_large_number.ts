/*   Program for factorial of a large number

A factorial of 100 has 158 digits. It is not possible to store these many digits even if we use long int. 

Way 1: using BigInt

JavaScript BigInt variables are used to store big integer values that are too big to be represented by a normal JavaScript Number.

To create a BigInt, append n to the end of an integer or call BigInt()

let x = 9999999999999999;            let y = 9999999999999999n;
let x = 1234567890123456789012345n;  let y = BigInt(1234567890123456789012345)

The JavaScript typeof a BigInt is "bigint"

TC: O(n)
SC: O(1)  */

function FactorialOfLargeNumber_it(n: bigint): bigint {
    if(n === BigInt(0)) return BigInt(1);

    let fact: bigint = BigInt(1);
    while(n > 1) {
        fact = fact * n;
        n--;
    }
    return fact;
}
