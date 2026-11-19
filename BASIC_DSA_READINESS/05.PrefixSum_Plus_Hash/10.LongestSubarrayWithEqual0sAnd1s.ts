/* Longest Subarray With Equal Number of 0s and 1s

Given an array arr[] containing only 0s and 1s, find the longest subarray 
which contains equal no of 0s and 1s.

Input: arr[] = [1, 0, 1, 1, 1, 0, 0]
Output: 6
Explanation: arr[1 ... 6] is the longest subarray with three 0s and three 1s.

Input: arr[] = [0, 0, 1, 1, 0]
Output: 4
Explanation: arr[0 ... 3] or  arr[1 ... 4] is the longest subarray with two 0s and two 1s.

Input: arr[] = [0]
Output: 0
Explanation: There is no subarray with an equal number of 0s and 1s.

                                            BRUTE FORCE
                                            -----------

- Generate all subarrays, keep counting 0s and 1s via hash and if they are equal, update the maxLength

TC: O(n^3) -> two loops + 1 more iteration to store frequency
SC: O(n) max

                                          PREFIX SUM + HASH
                                          -----------------

If we consider every 0 as -1, then this problem become same as the longest subarray with 0 sum problem.
And since -1 is involved, we cannot use sliding window, we will use prefix sum
*/

function longestSubarrayWithEqual0sAnd1s(a) {
    const n = a.length;
    const k = 0;

    let map = new Map();
    let ans = [];
    let currSum = 0;
    let maxLen = Number.MIN_SAFE_INTEGER;

    map.set(0, [-1]); // special case when targetSubarray starts from 0th index - we add imaginary index -1

    for (let i = 0; i < n; i++) {
        currSum += (a[i] === 0)? -1: a[i];  /* add -1 when there is a 0 */

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
        else map.get(currSum).push(i);
    }

    return (maxLen === Number.MIN_SAFE_INTEGER) ? 0 : maxLen;
}

/* But this solution will give TLE because we are calculating all the subarray lengths by storing 
   all the indices of occurrences of sum, but for problem subarray sum 0, we need only 1st occurrence

Why store the first occurrence?

Suppose prefix sum repeats

Let’s say:
Index:      0   1   2   3   4   5
Array:      1  -1   3  -3   2  -2
Prefix:     1   0   3   0   2   0

Focus on prefix sum = 0

It appears at:

index 1, 3, 5

Possible subarrays with sum = 0
    (0 → 1) → length = 2
    (0 → 3) → length = 4
    (0 → 5) → length = 6 ✅ (maximum)

Key Observation

To maximize length:
    length = currentIndex - earliestIndex

So for index 5:
    Using index 1 → length = 4
    Using index 3 → length = 2
    Using index -1 → length = 6 ✅

👉 The earliest occurrence always gives longest length
*/

function findMaxLength(a: number[]): number {
        const map = new Map(); // <prefixSum, firstIndex>
        let currSum = 0;
        let maxLen = 0;

        map.set(0, -1); // base case

        for (let i = 0; i < a.length; i++) {
            currSum += (a[i] === 0 ? -1 : 1);

            if (map.has(currSum)) {
                maxLen = Math.max(maxLen, i - map.get(currSum));
            } else {
                // store only first occurrence
                map.set(currSum, i);
            }
        }

        return maxLen;
};