/* Minimum Removals for Target Sum

Given an array of positive integers arr[] and an integer k, you can remove either the 
leftmost or rightmost element from the array in one operation. After each operation, 
the size of arr[] is reduced by one. find the minimum number of operations required 
to make the total sum of the removed elements exactly equal to k. If it is impossible 
to achieve the sum k, return -1.

Input: arr[] = [3, 4, 1, 3, 2], k = 5
Output: 2
Explanation: Removing 3 from left and 2 from right gives a sum of 5 in 2 operations.

Input: arr[] = [5, 3, 4, 6, 2], k = 6
Output: -1
Explanation: It is impossible to achieve the sum of removed elements as 6.

Input: arr[] = [1, 1, 3, 1, 2], k = 4
Output: 3
Explanation: Removing 1, 1 from left and 2 from right gives a sum of 4 in 3 operations.

Its a type of sliding window problem: 06 --> 1423. Maximum Points You Can Obtain from Cards

                                                    OBSERVATION
                                                    -----------

 totalSum = sum(arr)
 If removed sum = k, then remaining subarray sum = (totalSum - k)

So problem becomes: Find the longest subarray with sum = (totalSum - k)
                    Because minimum removals are needed to remove some elements,
                    we try to keep as many elements as possible

                    longestLen = length of longest subarray with sum = (totalSum - k)
                             n = length of original array

                      our ans => number of removals => (n - longestLen)  

We will modify the logic of length of longest subarray with sum k function
We will use that optimal approach, where we put index in map only once
                      
*/

function minRemovals(arr: number[], k: number): number {
    const n = arr.length;
    const target = arr.reduce((acc, ele) => acc + ele, 0) - k;  /* totalSum - k */

    const map = new Map<number, number>();                      /* <prefixSum, first index > */
    map.set(0, -1);

    let currSum = 0;
    let maxLen = target === 0 ? 0 : -1; // keeping nothing is valid when target = 0

    for (let i = 0; i < n; i++) {

        currSum += arr[i];

        if (map.has(currSum - target)) {
            maxLen = Math.max(maxLen, i - (map.get(currSum - target)! + 1) + 1);
        }

        if (!map.has(currSum)) map.set(currSum, i);
    }

    return maxLen === -1 ? -1 : n - maxLen; /* Minimum removals = n - maxLen */
}