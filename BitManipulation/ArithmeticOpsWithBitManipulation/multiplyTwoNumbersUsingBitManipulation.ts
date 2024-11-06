/* Russian peasant algorithm:

First look at some results:

If b is even:

    b = 2 * (b / 2)   --> Solve brackets first

    a * b = a * 2 * (b / 2)

    a * b = (a * 2 ) * (b / 2)  -- 1

Also, we know, 1,2,3,4,5,6,7...
One number is even, other is odd, if we have an odd number n, n + 1 = even!

if b is Odd:
                                                                                      
    b = 2 * (b / 2) + 1   --> Solve brackets first and do floor in division, ex: let b = 5, [2 * (5/2) + 1] => [2 * 2 + 1]

    a * b = a * (2 * (b / 2) + 1)

    a * b = (2 * a) * (b / 2) + a  -- 2

It may seem that we can directly use if else and get (a * b) based on (b & 1),
but if we use 1 and 2, see that we are also using '*' which is forbidden.

Hence, we are partially calculating product by iterating on every bit of b and
keep adding to the result

for '+', we can use addition using bit manipulation

-------------------------------------------------------------------------------------

Russian peasant algo:

Let the two given numbers be 'a' and 'b'
1) Initialize result 'res' as 0.
2) Do following while 'b' is greater than 0
   a) If 'b' is odd, add 'a' to 'res'
   b) Double 'a' and halve 'b'
3) Return 'res'.

      for addition         for *
TC: O(max(log2(a, b))) * O(log2(b))
SC: O(1) 

If we use '+' directly, O(max(log2(a, b))) = O(1) since JS adds in constant time, so TC = O(log2(b)) */

function addUsingBitManipulation(a: number, b: number): number {

    while(b !== 0) {
        let carry: number = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }

    return a;
}

function multiplyUsingBitManipulation(a: number, b: number): number {
    if((a === 0) || (b === 0)) return 0;

    let product: number = 0;

    while(b > 0) {
        if(b & 1) product = addUsingBitManipulation(product, a);

        a <<= 1;
        b >>= 1;
    }

    return product;
}
