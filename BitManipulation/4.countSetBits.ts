/* Count Total Bits Set i.e bits with 1 value

Way 1: Normal Bitwise iteration 
right shift the bits and & with 1 till the number is 0
For a number n, the number of bits in its binary representation is roughly log₂(n). 

TC = O(log₂n)
SC = O(1)

But, here we traverse each and every bit, this can be further optimised, there is a way where 
we can iterate on set bits only.


Way 2: Brian Kernighan’s (BK) Algorithm:
Subtracting 1 from a decimal number flips all the bits after the rightmost set bit(which is 1) 
including the rightmost set bit. 
for example : 
10 in binary is 00001010 
9 in binary is 00001001 
8 in binary is 00001000 
7 in binary is 00000111 
So if we subtract a number by 1 and do it bitwise & with itself (n & (n-1)), 
we unset the rightmost set bit. If we do n & (n-1) in a loop and count the number 
of times the loop executes, we get the set bit count. 
The beauty of this solution is the number of times it loops is equal to the number 
of set bits in a given integer. 

Time Complexity: O(log n)
Auxiliary Space: O(1)  */

function countSetBits1_Iterative(n: number) {
    let count = 0;
    while(n) {
        if((n & 1) === 1) count++;
        n = n>>1;
    }

    return count;
}

/* Recursion tree

    f(101)       --> 1 + f(10) --> 2
        \
        f(10)     --> 0 + f(1) --> 1 
          \
          f(1)    --> 1 + f(0) --> 1
            \
            f(0)    --> return 0
         

    */
function countSetBits1_Recursive(n: number) {
    if(n === 0) return 0;
    else {
        // if last bit set add 1 else add 0
        return (n & 1) + countSetBits1_Recursive(n>>1);
    }
}

function countSetBits2(n: number) {
    var count = 0;
    while (n > 0)
    {
        n &= (n - 1);
        count++;
    }
    return count;
}

console.warn('way 1 Iterative-->', countSetBits1_Iterative(3));
console.warn('way 1 Recursive-->', countSetBits1_Recursive(3));
console.warn('way 2 -->', countSetBits2(3));


/* LEETCODE QUESTION: 
338. Counting Bits

Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), 
ans[i] is the number of 1's in the binary representation of i.

Example 1: => Input: n = 2     Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10

Example 2: => Input: n = 5     Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
 
It is very easy to come up with a solution with a runtime of O(n log n). 
Can you do it in linear time O(n) and possibly in a single pass?

Approach 1: Naive

- Corner cases for 0 and 1,
- Iterate every num and count set bits using BK Algo

TC: O(n * log(num))
SC: O(1)

Approach 2: Observe a pattern

0 --> 0000          6 --> 0110                
1 --> 0001          7 --> 0111
2 --> 0010          8 --> 1000
3 --> 0011          9 --> 1001
4 --> 0100         10 --> 1010
5 --> 0101         11 --> 1011

When n is even, no of bits in n === no of bits in n/2
ex: 6 - 2 | 8 - 1
    3 - 2 | 4 - 1

When n is odd, no of bits in n === (no of bits in n/2 + 1)
ex: 7 - 3 | 9 - 2
    3 - 2 | 4 - 1

- we can keep storing the halves in a dp[]
- store basic counts like 0, 1 and 2 in dp[0, 1, 1], index = number itself
- start from 3 now, 
   3 === odd, 3/2 == 1 => dp[1] + 1 =>  dp[0, 1, 1, 2], store this as well in the array

- since this dp[] is count[] itself, return it lastly

TC: O(n)
SC: O(n) */

function countBits(n: number): number[] {
    // corner cases
    if(n === 0) return [0];
    if(n === 1) return [0, 1];
    if(n === 2) return [0, 1, 1];
    
    let ans: number[] = [0, 1, 1];

    for(let num = 3; num <= n; num++) {
        if((num % 2) === 0) {
            let count: number = ans[Math.floor(num / 2)];
            ans.push(count);
        } else {
            let count: number = ans[Math.floor(num / 2)] + 1;
            ans.push(count);
        }
    }

    return ans;
}