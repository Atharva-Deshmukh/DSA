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
nth stair can be reached from (n-1)th stair or (n-2)th stair
similarly we can recur down further to get no. of ways to reach (n-1)th and (n-2)th stair.
we get total ways by adding them up

hence ways(n) = ways(n-1) + ways(n-2)

its series but there is one thing to notice, the value of ways(n) is equal to fibonacci(n+1).

ways(1) = fib(2) = 1
ways(2) = fib(3) = 2
ways(3) = fib(4) = 3

use memoisation to optimise it from TC of O(2^n) --> O(n)
use a 1D dp[] */
function ways(stairs, dp) {
    if (dp[stairs])
        return dp[stairs];
    // stairs = 0, no of ways = 0     no jump => no way
    // stairs =    1, no of ways = 1  [1]
    // stairs =    2, no of ways = 2  [1,1], [2]
    if (stairs <= 2)
        return stairs;
    var Paths = ways(stairs - 1, dp) + ways(stairs - 2, dp);
    dp[stairs] = Paths;
    return Paths;
}
var stairs = 4;
console.log(ways(stairs, []));
