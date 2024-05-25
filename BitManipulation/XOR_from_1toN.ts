/* given n, get XOR from 1 to N

Way 1: 
- Iterate from 1 to n and keep taking XORs

TC: O(n)
SC: O(1) 

Way 2:  MUST MEMORISE way, Not possible to derive in interveiws
- Observe a pattern

XOR TILL N          XOR
-----------------------
1         -->        1              --> if(n % 4 === 1) XOR till n = 1
2         -->        3              --> if(n % 4 === 2) XOR till n = n + 1
3         -->        0              --> if(n % 4 === 3) XOR till n = 0
4         -->        4              --> if(n % 4 === 0) XOR till n = n itself

5         -->        1
6         -->        7
7         -->        0
8         -->        8

9         -->        1
10        -->        11
11        -->        0
12        -->        12

13        -->        1
14        -->        15
15        -->        0
16        -->        16

17        -->        1

TC: O(1)
SC: O(1)  */

function XOR_1ton(n: number): number {
    let ans: number = 0;

    if(n % 4 === 0) return n;
    if(n % 4 === 1) return 1;
    if(n % 4 === 2) return n + 1;
    if(n % 4 === 3) return 0;

    return ans;
}

