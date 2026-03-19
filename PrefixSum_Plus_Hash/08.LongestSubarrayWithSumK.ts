/* Longest Subarray With Sum K

Given an array arr[] of size n containing integers, the task is to find the 
length of the longest subarray having sum equal to the given value k.
Note: If there is no subarray with sum equal to k, return 0.

Input: arr[] = [10, 5, 2, 7, 1, -10], k = 15
Output: 6
Explanation: Subarrays with sum = 15 are [5, 2, 7, 1], [10, 5] and [10, 5, 2, 7, 1, -10]. 
The length of the longest subarray with a sum of 15 is 6.

Input: arr[] = [-5, 8, -14, 2, 4, 12], k = -5
Output: 5
Explanation: Only subarray with sum = 15 is [-5, 8, -14, 2, 4] of length 5.

Input: arr[] = [10, -10, 20, 30], k = 5
Output: 0
Explanation: No subarray with sum = 5 is present in arr[].

                                                BRUTE FORCE:
                                                -----------

- Generate all subarrays, whenver sum is k, update the longest length


                                                PREFIX SUM
                                                ----------

- We cannot use sliding window technique here since negative numbers don't gurantee that
  sum decrease when we shrink the window from left
- Use to logic of Subarray with sum k with a slight change that the length of every subarray of sum k is stored
  and maxLen is updated */

function longestSubarrayWithSumK(a, k) {
    const n = a.length;

    let map = new Map();
    let ans = [];
    let currSum = 0;
    let maxLen = Number.MIN_SAFE_INTEGER;

    map.set(0, [-1]); // special case when targetSubarray starts from 0th index - we add imaginary index -1

    for (let i = 0; i < n; i++) {
        currSum += a[i];

        if (map.has(currSum - k)) {
            const indexArr = map.get(currSum - k);
            indexArr.forEach((mapIndex) => {

                /* Update the subarray length  */
                maxLen = Math.max(maxLen, (i - (mapIndex + 1) + 1)); // (right - left + 1)
                
                ans.push([mapIndex + 1, i]);
            });
        }

        /* map = <sum, arr[indices] */
        if (!map.has(currSum)) map.set(currSum, [i]);
        else map.set(currSum, [...map.get(currSum), i]);
    }

    return (maxLen === Number.MIN_SAFE_INTEGER) ? 0 : maxLen;
}