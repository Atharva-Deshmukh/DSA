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
6 -->  0110   Total No of Set Bits till 2^3 =>  3*(2^(3-1)) -> 12  --> x*(2^(x-1))
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
010  --> 2                        SUBPROBLEM NOW ->  Solve(N - 2^x)
011  --> 3
100  --> 4  highest power now
101  --> 5

before 2's power                --> 4/2 + 4/2 --> 2*(2^(2-1));
after 2's power                 --> (5-4)+1
            
subproblem now:

00  --> 0
01  --> 1  --> this is highest power of 2, --> 2^0  BASE CASE HAI YE

so overall solution using recursion: 
for N , if highest power of 2 is x, then
total set bits from 1 to N = [ x*(2^(x-1)) + (N-2*x)+1 ] keep recursing till u get 1 as highest power of 2 

--------------------Time and space complexity----------------------

highestPow2TillN():
     TC = O(logN) 
     SC = O(1)

totalSetBits():
    TC: each recursive call reduces N by 2^x, since n is subtracted by 2^x
        if N = 10, x = 3 since (2^3 => 8 <= 10)
        if N = 20, x = 4 since (2^4 => 16 <= 20)
        So x = Math.floor(log2(N))

        At each recursive step, N = N - 2^x, this is roughly half of less than it

        ex: 
            totalSetBits(20)
            N = 20, so x = 4
            new N = N - 2^4 = 4

            totalSetBits(4)
            N = 4, so x = 2
            new N = N - 2^2 = 0

            totalSetBits(0)
            return 0 // base case

            In each recursive call, you reduce N by a large factor (approximately half), 
            so the number of recursive calls is proportional to the logarithm of 𝑁.

    For Each recursion call, we have O(logN) to get highest power of 2
    and depth = O(logN), So, TC = O(logN) * O(logN) --> O((logN) ^ 2)
   
    SC: the number of recursive calls is proportional to the logarithm of 𝑁.
        So, SC becomes = O(logN)



TC: O((logN) ^ 2)
SC: O(logN)

Since log is in decimal, its powers will be in decimals, hence even though we have log square, its
TC is lower than previous one

O(N * logN)  > O((log𝑁) ^ 2) */

/*  3 2 1 0
9 - 1 0 0 1         pos of MSB = 4, highest power of 2 = 3 = pos - 1

    3 2 1 0
5 - 0 1 0 1         pos of MSB = 3, highest power of 2 = 2 = pos - 1

    3 2 1 0
3 - 0 0 1 1         pos of MSB = 2, highest power of 2 = 1 = pos - 1  */

function highestPow2TillN(n: number): number {

    //corner cases
    if (n <= 1) return 0;
    if (n === 2) return 1;

    let pos = 0;
    let temp = n; // preserve n

    while (temp) {
        temp = temp >> 1;
        pos++;
    }

    return pos - 1;
}

function totalSetBits(N: number): number {

    // base case: stop when N reduces to 0 or 1
    if (N <= 1) return N;

    let x = highestPow2TillN(N);
                                                                 // recurse for new N
    return (x * Math.pow(2, x - 1)) + (N - Math.pow(2, x) + 1) + totalSetBits(N - Math.pow(2, x));
}



