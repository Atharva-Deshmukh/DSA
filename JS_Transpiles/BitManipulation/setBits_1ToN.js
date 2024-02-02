/*  Count total set bits in first N Natural Numbers (all numbers from 1 to N)

Way 1: iterate from 1 - N and count set bits for every number

TC: O(N*log(N)) where N is the given integer and log(N) time is used for the binary conversion of the number.
Auxiliary Space: O(1).

**********************************************************************************************

Way 2: Observe the pattern over here

0 -->  0000
1 -->  0001
2 -->  0010
3 -->  0011
4 -->  0100
5 -->  0101
6 -->  0110
7 -->  0111
8 -->  1000
9 -->  1001
10 --> 1010
11 --> 1011
12 --> 1100
13 --> 1101
14 --> 1110
15 --> 1111
16 --> 10000
17 --> 10001

Find the highest power of 2 before N. You will observe that the numbers before that highest power
appear in the form of a complete set in binary

if N = 13 say

0  -->  0000
1  -->  0001
2  -->  0010
3  -->  0011
4  -->  0100
5  -->  0101
6  -->  0110
7  -->  0111
8  -->  1000
9  -->  1001
10 -->  1010
11 -->  1011
12 -->  1100
13 -->  1101

highest power of 2 --> 8 --> 2^3
before 8 (0-7) set of 1 is complete for first 3 bits
0 -->  0000
1 -->  0001
2 -->  0010  in last row, we have (8/2) set bits,        --> 4
3 -->  0011  in second last row, we have (8/2) set bits, --> 4
4 -->  0100  in third last row, we have (8/2) set bits,  --> 4
5 -->  0101
6 -->  0110   Total No of Set Bits till 2^3 =>  3*(2^(3-1)) -> 12
7 -->  0111

Now after the highest power of 2,

8  -->  1000  after every encounter of power of 2, set bits pattern changes for MSB.
9  -->  1001  Here MSBs become 1 i.e. after 2's power, series of additional bits start
10 -->  1010  So, some bits till N (13-8)+1  --> (N-2^x) + 1 --> 6
11 -->  1011
12 -->  1100
13 -->  1101

for remaining bits, see the bits other than MSB, it becomes a subproblem now:
000  --> 0
001  --> 1
010  --> 2                        SUBPROBLEM NOW ->   subproblem(N - 2^x)
011  --> 3
100  --> 4  highest power now
101  --> 5

before 2's power                --> 4/2 + 4/2 --> 2^(2-1)*2;
after 2's power                 --> (5-4)+1
            
subproblem now:

00  --> 0
01  --> 1  --> this is highest power of 2, --> 2^0  BASE CASE HAI YE

so overall solution using recursion: for N , if highest power of 2 is x, then

total set bits from 1 to N = [ (2^(x-1)*x) + (N-2*x+1) ] keep recursing till u get 1 as highest power of 2
*/
function highestPow2TillN(n) {
    // get position of MSB of n
    if (n < 0)
        return -1;
    if (n >= 0 && n <= 2)
        return n;
    let pos = 0;
    let temp = n; //preserving n
    while (temp) {
        temp = temp >> 1;
        pos++;
    }
    return pos - 1;
}
// console.warn('highest power of 2 before 3-> ', highestPow2TillN(3));
function totalSetBits(N) {
    console.warn('N -> ', N);
    if (N === 0 || N === 1)
        return N;
    //highest power till before N
    let x = highestPow2TillN(N);
    console.warn('Math.pow(2,x) -> ', Math.pow(2, x));
    return ((x * Math.pow(2, x - 1)) + (N - Math.pow(2, x) + 1)) + totalSetBits(N - Math.pow(2, x));
}
console.warn('Total set bits -> ', totalSetBits(7));
