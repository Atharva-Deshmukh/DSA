/* Calculate square of a number without using *, / and pow()

Way 1: repeatedly add n to result. 

3^2 --> 9  --> 3 + 3 + 3
4^2 --> 16 --> 4 + 4 + 4 + 4

TC: O(n) SC: O(1)

Way 2: A number in binary can also be written in terms of powers of 2 

4^2 --> 4*4 --> 4*(0100) --> 4*(2^2)
5^2 --> 5*5 --> 5*(0101) --> 5*(2^2) + 5*(2^0)
9^2 --> 9*9 --> 9*(1001) --> 9*(2^3) + 9*(2^0)

we also know that n * 2^x --> n << x, so arithmetic multiplication nhi karna hoga yaha pe

Logic: check for the set position by right shifting n and whenever set bit is encountered, 
left shift n by that position and add to the result
*/

function squareOfN_BitManipulation(n: number): number {
    let ans = 0, temp, i = 0;

    // preserve the input number, its just for iteration purpose, we need to & with original n only
    temp = n;


    while(temp) {
        if((n & (1 << i)) !== 0) ans = ans + (n << i);  // ans = ans + (n * 2^i)
        
        i++;
        temp = temp >> 1;
    }
    return ans;
}

console.warn('Square using Bit Manipulation -> ', squareOfN_BitManipulation(5));
console.warn('Square using Bit Manipulation -> ', squareOfN_BitManipulation(6));

