/* input n = 2, x = 5   output  2^5 = 32

Way 1: 
- do normal power calculation by multiplying the base power times (2*2*2*2*2)

TC: O(x)  OR O(power)
SC: O(1)

Way 2: Optimised

Logic:
- let ans = 1;
- Iterate till currentPower = 0

- if(currentPower === odd) 
  ans = ans * currentBase
  currentPower = currentPower - 1

- if(currentPower === even) 
  currentPower = currentPower / 2
  currentBase = currentBase * currentBase
  

Dry run:
- let ans = 1, n = 2, x = 21

- when power is ODD, separate only one number and do power-1 
  pow(2,21) = 2 *  pow(2,20)
  multiply this to ans, ans = ans * 2

- when power is EVEN, do n = n*n and power = power/2
  pow(2,20) =  pow(2^2,20/2) = pow(4,10)  

- now, x is EVEN, 
  pow(4,10) = pow(4^2,10/2) = pow(16,5)

- now, x is ODD
  pow(16,5) = 16 * pow(16,4)
  ans = ans * 16

- now, x is EVEN
  pow(16,4) = pow(16^2,4/2) = pow(256,2)

- now, x is EVEN
  pow(256,2) = pow(256^2,2/2) = pow(65536,1)

- now, x is ODD
  pow(65536,1) = 65536 * pow(65536,0) = 65536 * 1 = 65536
  ans = ans * 65536

  return ans          
  
TC: O(log(2) power) since we are continuously dividing by 2
SC: O(1) */

// used bit manipulation to optimise wherever possible
function power(n: number, x: number): BigInt {
    if(x === 0) return 1n; 
    if(n === 0) return 0n;

    let res: BigInt = 1n;
    let base: BigInt = BigInt(n);

    while(x > 0) {

        // if x is odd
        if(x & 1) {  // (x % 2 === 1)
            res *= base;
            x = x - 1;
        } else {
            base *= base;
            x = x >> 1 // Equal to x = x/2;
        }
    }

    return res;
}

// WITH MOD  (GFG AND LC Submissions)
function power(a, b) {
    const mod = 1e7;  // same as 1e+7
    let result = 1;
    while (b > 0) {
        // If the current bit of b is set, multiply the result by a and take modulo mod
        if (b & 1)
            result = (result * a) % mod;

        // Square the value of a and reduce it modulo mod
        a = (a * a) % mod;

        // Right shift b to move to the next bit
        b >>= 1;
    }
    return result;
}