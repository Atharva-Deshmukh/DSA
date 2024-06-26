/* Given a non-negative integer x, return the square root of x rounded down to the nearest integer. 
   The returned integer should be non-negative as well.
   You must not use any built-in exponent function or operator.

   For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
 
Input: x = 4            Output: 2
Explanation: The square root of 4 is 2, so we return 2.

Input: x = 8            Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.

Logic (Linear):
- lets first think linearly, say x = 28
   1 * 1 = 1
   2 * 2 = 4
   3 * 3 = 9
   4 * 4 = 16
   5 * 5 = 25
   6 * 6 = 36
*/

function linearSqrt(x: number): number {
    let ans: number = 1;

    if((x > 0) && (x <= 1)) return x;

    for(let i = 1; i <= Number.MAX_SAFE_INTEGER; i++) {
        if(i * i <= x) {
         ans = i;    // update i to largest possible value and continue
         continue;
        }
        else break;
    }
    return ans;
}

/* Logic: (Binary Search)
- How can we think of binary search over here?
  Whenever we see such cases where till certain point, the answers are possible and we need maximum possible,
  and after certain point, the answer is not possible, we can use BS

  ex: n = 28

  1  ✓
  2  ✓
  3  ✓
  4  ✓
  5  ✓
  6  X
  7  X
  8  X
  9  X
  .
  .
  .
  28 X       --> We can think max of 28 instead of INT_MAX

  See that the search space is also sorted

TC: O(log2(n))
SC: O(1) 
__________________________________________________________________________________________________
A GREAT OBSERVATION:
__________________________________________________________________________________________________

our BS array would be like this -> X, X, X, X, X, ✓, ✓, ✓, ✓, ✓, ✓
                                   |                               |
                                  low                            high

IT IS OBSERVED THAT when while loop ends, high > low,  low is the minimum possible ans, we can directly return low
                                    X, X, X, X, X, ✓, ✓, ✓, ✓, ✓, ✓
                                                |  |
                                              high low
            



*/

function sqrtUsingBinarySearch(x: number): number {
    let ans: number = -1;

    if(x < 0) return -1;
    if((x >= 0) && (x <= 1)) return x;  

    let low: number = 1;
    let high: number = x;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // Search part and Elimination part
        if((mid * mid) <= x) {
            ans = mid;               // can be a possible ans
            low = mid + 1;           // explore for a larger possible answer
        }
        else if((mid * mid) > ans) high = mid - 1;  
    }

    return ans;
}

/* EXTRA Sqrt upto a given precision can also be calculated after modifying the above code

Logic:
- let ans = 0.0
- calculate the integer part using the BS as it is

Follow this Algo to get the decimal precision
- Initialize the increment variable by 0.1 and iteratively compute the fractional part up to P places. 
- For each iteration, the increment changes to 1/10th of its previous value. 
- Finally return the answer computed.

*/

function sqrtUsingBinarySearchWithPrecision(x: number, precision: number): number {
    let ans: number = 0.0;

    if(x < 0) return -1;
    if((x >= 0) && (x <= 1)) return x;  

    let low: number = 1;
    let high: number = x;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // Search part and Elimination part
        if((mid * mid) <= x) {
            ans = mid;               // can be a possible ans
            low = mid + 1;           // explore for a larger possible answer
        }
        else if((mid * mid) > ans) high = mid - 1;  
    }

    // Decimal calculation
    let increment: number = 0.1;
    for(let i = 1; i <= precision; i++) {
        // keep on verifying if the ans is less than x by adding it the decimal part
        while((ans * ans) <= x) {
            ans = ans + increment;
        }

        ans = ans - increment; // if we get out of while loop, ans * ans > x, revert this
        increment = increment / 10;  // dont use Math.floor() here since we need decimal
                                     // now check for this decimal part
    }

    return ans;
}