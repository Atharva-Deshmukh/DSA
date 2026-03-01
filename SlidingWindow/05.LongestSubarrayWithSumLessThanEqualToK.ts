/* SLIDING WINDOW PATTERN: Longest subarray/substring where <Condition>

Maximum sum of subarray less than or equal to x

Given an array arr[] of integers and a number x, the task is to find the sum of subarray 
having a maximum sum less than or equal to the given value of x.

Examples:

Input: arr[] = [1, 2, 3, 4, 5], x = 11 
Output: 10
Explanation: Subarray having maximum sum is [1, 2, 3, 4].

Input: arr[] = [2, 4, 6, 8, 10], x = 7 
Output: 6
Explanation: Subarray having maximum sum is [2, 4] or [6].

                                                    BRUTE FORCE
                                                    -----------

- Use two loops and find all the combinations of subarrays, check the max length subarray
  with sum <= k

                                        for(i = 0 ----- (n - 1))
                                           for(j = i ----(n - 1))
                                                sum = calcSubarrSum(a, i, j)

TC: Almost O(n ^ 3)
SC: O(1)


                                                BETTER APPROACH
                                                ---------------

- Use sliding window + two pointers
- initially window size = 1

let a = [2 5 1 7 10] and k = 14

l and r will be at i = 0, for window size 1

[2 5 1 7 10]                      l -> shrinking happens for this pointer
 l                                r -> expansion happens for this pointer
 r

 let sum = 0 initially

 add current window to the sum

 sum = 2
 maxLen = 1  // 2 <= 14 so this subarray is a candidate

 Expand the window to the right when it satisfies the condition (k <= 14)
 [2 5 1 7 10]
  l r
 sum = 2 + 5 = 7 (7 <= 14)
 maxLen = 2

 Expand the window to the right when it satisfies the condition (k <= 14)
 [2 5 1 7 10]
  l   r
 sum = 2 + 5 + 1 = 8 (8 <= 14)
 maxLen = 3

 SIMPLE MATHS: At any moment, length of the window = (r - l + 1)

 Expand the window to the right when it satisfies the condition (k <= 14)
 [2 5 1 7 10]
  l     r
 sum = 2 + 5 + 1 + 7 = 15 (15 > 14) --> FALSE CONDITION
 try to shrink the window until the condition becomes true again
  [2 5 1 7 10]
     l   r
 sum = 2 + 5 + 1 + 7 - 2 = 13 (13 <= 14)
 maxLen = 3 (we already had 3, so no update here)

 CODE TEMPLATE: (This pattern is followed Everywhere!)

 l = 0; r = 0; sum = 0; maxLen = 0

 while(r < n) {
    sum += arr[r];

    // if it was an invalid window, shrink until its valid
    while((l <= r) && (sum > k)) {
        sum -= arr[l];
        l++;
    }

    // when the window becomes valid, update maxLen
    if(sum <= k) maxLen = Max(maxLen, (r - l + 1));    // in case we are asked to print subarray, store l and r

    r++;
 }

 TC: O(n + n) -> shrinking + expanding (goes max till n)
 SC: O(1)


            OPTIMAL APPROACH (this is only when we are asked the length, and not the acutal subarray)
            -----------------------------------------------------------------------------------------

We need to only return the length, not actual subarray, so 
instead of shrinking when we have maxLen=3, we can explore the subarrays 
>= maxLen3 with condition satisfied, the inner loop gets optimised this way

In code, instead of while(sum > k), do if(sum > k)
so, this will just shrink once and then alway increase the window size

 l = 0; r = 0; sum = 0; maxLen = 0

 while(r < n) {
    sum += arr[r];

    // if it was an invalid window, shrink once
    if((l <= r) && (sum > k)) {
        sum -= arr[l];
        l++;
    }

    // when the window becomes valid, update maxLen
    if(sum <= k) maxLen = Max(maxLen, (r - l + 1));    // in case we are asked to print subarray, store l and r

    r++;
 }

 TC: O(n) ->  expanding (goes max till n)
 SC: O(1)

NOTE: the above approaches only work for subarrays with all positive elements
*/

function findMaxSubarrayLengthWithSumLessThanK(a, k) {
    const n = a.length

    let l = 0, r = 0, sum = 0, maxLen = 0;

    while (r < n) {
        sum += a[r];

        while ((l <= r) && (sum > k)) {
            sum -= a[l];
            l++;
        }

        if (sum <= k) maxLen = Math.max(maxLen, (r - l + 1));

        r++;
    }

    return maxLen;
}

/* When maximum sum is asked */
function findMaxSubarraySum(a, k) {
    const n = a.length

    let l = 0, r = 0, sum = 0, maxSum = 0;

    while (r < n) {
        sum += a[r];

        while ((l <= r) && (sum > k)) {
            sum -= a[l];
            l++;
        }

        if (sum <= k) maxSum = Math.max(maxSum, sum);

        r++;
    }

    return maxSum;
}

/* If, there are negative numbers in the array, then sliding window won't work
    
    Approach there: hashmap + prefixSum

    TODO problems
        Longest Subarray with 0 Sum
        Longest Subarray with sum equal to K
        Longest subarray with equal 0s and 1s

    But, they can also be solved using sliding window pattern 3
*/

