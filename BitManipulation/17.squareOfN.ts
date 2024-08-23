/* Calculate square of a number without using *, / and pow()

Way 1: Repeatedly add n to result. 

3^2 --> 9  --> 3 + 3 + 3
4^2 --> 16 --> 4 + 4 + 4 + 4

TC: O(n) 
SC: O(1)

Way 2: Bit manipulation

A number can also be COMPLETELY written in terms of powers of 2 

4^2 --> 4*4 --> 4*(0100) --> 4*(2^2)
5^2 --> 5*5 --> 5*(0101) --> 5*(2^2) + 5*(2^0)
9^2 --> 9*9 --> 9*(1001) --> 9*(2^3) + 9*(2^0)

Since (n * 2^x) --> n << x, we don't actually need to '*'.

Logic: check for the set position by right shifting n and whenever set bit is encountered, 
left shift n by that position and add to the result */

function squareByDirectAdding(n: number) {
    let ans: number = 0;
    let count: number = n;

    while(count) {
        ans += n;
        count--;
    }

    return ans;
}

function squareOfN_BitManipulation(n: number): number {
    let ans: number = 0;
    let pos: number = 0;
    let n1: number = n;  // preserve n

    while(n) {
        if((n & 1) === 1) ans += (n1 << pos);
        n >>= 1;
        pos++;
    }


    return ans;
}

console.warn('Square using Bit Manipulation -> ', squareOfN_BitManipulation(5));
console.warn('Square using Bit Manipulation -> ', squareOfN_BitManipulation(6));

