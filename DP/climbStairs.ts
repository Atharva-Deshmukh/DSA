/* There are n stairs, a person standing at the bottom wants to climb stairs to reach the nth stair. 
The person can climb either 1 stair or 2 stairs at a time, the task is to count the number of ways 
that a person can reach at the top.

Input: n = 2 Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3 Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step  

LOGIC:
- nth stair can be reached from (n-1)th stair or (n-2)th stair
- similarly we can recur down further to get no. of ways to reach (n-1)th and (n-2)th stair.
- we get total ways by adding them up
- hence ways(n) = ways(n-1) + ways(n-2)

its series but there is one thing to notice, the value of ways(n) is equal to fibonacci(n+1). 

ways(1) = fib(2) = 1
ways(2) = fib(3) = 2
ways(3) = fib(4) = 3 

use memoisation to optimise it from TC of O(2^n) --> O(n) 
use a 1D dp[] 
TC = O(n)
SC = O(n)
*/

let dp: number[] = [];
function ways(stairs: number): number {

    if(dp[stairs]) return dp[stairs];

    // stairs = 0, no of ways = 0     no jump => no way
    // stairs =    1, no of ways = 1  [1]
    // stairs =    2, no of ways = 2  [1,1], [2]
    if(stairs <= 2) return stairs;

    let paths = ways(stairs-1) + ways(stairs-2);
    dp[stairs] = paths;
    return paths;
};

/*
4:
1,1,1,1
2,2
1,1,2
2,1,1
1,2,1
 */
let stairs: number = 4;
console.log(ways(stairs));

/*USING TABULATION

Time Complexity: O(n)
Auxiliary Space: O(n) */
function ways(stairs: number): number {
    let dp: number[] = [];

    for(let i = 0; i < dp.length; i++) {
        if(i < 3) dp[i] = i;
        else {
            dp[i] = dp[i-1] + dp[i-2];
        }
    }
    return dp[dp.length - 1];
};

console.log(ways(4));

/*using O(1) space: we need only two previous states, hence we can use variables to store them

Time Complexity: O(n)
Auxiliary Space: O(1) 

0 1 1 2 3 5
  |-|

*/
function ways(stairs: number): number {
    // since fib(n+1) =  ways(n) => no. of ways, hence 0 excluded
    let n_2: number = 1;
    let n_1: number = 1;

    if(stairs < 2) return stairs;

    for(let i = 2; i <= stairs; i++) {
        let curr: number = n_1 + n_2;
        n_2 = n_1;
        n_1 = curr;
    }

    return n_1;
};

console.log(ways(4));


  



