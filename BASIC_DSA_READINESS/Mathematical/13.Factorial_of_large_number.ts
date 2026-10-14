/* First, normal factorial calculation.
TODO: 1006. Clumsy Factorial */

function factorialIterative(n: number): number {

    // corner case
    if(n === 0) return 1;

    let res = 1;
    for(let i = 2; i <= n; i++) res *= i;

    return res;
}

function factorialRecursive(n: number): number {
    
    // base case
    if(n === 0) return 1;

    return n * factorialRecursive(n - 1);
}


/*   Program for factorial of a large number

A factorial of 100 has 158 digits. It is not possible to store these many digits even if we use long int. 

Way 1: using BigInt

JavaScript's BigInt type can store very large integers, including numbers with 158 or more digits.
JavaScript's BigInt is designed to represent arbitrarily large integers, meaning there's effectively 
no upper limit to the number of digits it can hold, as long as memory is available. 
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

/* Output is sometimes expected in array format (like in GFG)

Input: n = 5            Output: [1,2,0]

                                                    APPROACH:  
let n = 5

let us have an array res = [];  size = 0

Now, fill with 1 initially since 1 will be there in every factorial and make size = 1
res = [1] 
size = 1
carry = 0

multiply all elements of array with 2 (school mathematics). 
since array needs to be modified now.
res = [2]  // 2 * 1
size = 1
carry = 0 

multiply all elements of array with 3 (school mathematics). 
since array needs to be modified now.
res = [6]  // 3 * 2
size = 1
carry = 0 

Note that above, we multiply all array elements (equal to size)
multiply all elements of array with 4 (school mathematics). 
6 * 4 = 24, arr[0] = 4 and carry = 2, push carry in array and now size = 2
res = [4, 2] 
size = 2
carry = 2 

multiply all elements of array with 5 (school mathematics). 5 will be multiplied with 2 elements (size = 2) 
5 * [4] + 0 (carry) = [0] => carry = 2 now
5 * [2] + 2 (carry) = [0, 2] => carry = 1 now

res = [0, 2, 1] 
size = 3

Implementation of this is quite tricky

TC: O(n ^ 2)
SC: O(1) */

function factorialOfLargeNumber(n: number): number[] {
    let res: number[] = [1];

    let carry: number = 0;

    if(n <= 1) return res; // [1] as 0! = 1 && 1! == 1

    /* Outer loop iterates n */
    for(let i = 2; i <= n; i++) {
        
        // reset the carry
        carry = 0;

        /* Inner loop iterates the res[] and modifies it */
        for(let j = 0; j < res.length; j++) {
            const currentProduct: number = (i * res[j]);
            const digitToPlace: number = (currentProduct + carry) % 10;
            carry = Math.floor((currentProduct + carry) / 10);

            // place the digit at jth index
            res[j] = digitToPlace;
        }

        // if the carry is remaining, push it at the end
        while(carry > 0) {
            res.push(carry % 10);
            carry = Math.floor(carry / 10);
        }
        
    }

    return res.reverse();
}
