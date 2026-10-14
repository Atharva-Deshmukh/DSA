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
                      
*/

function lengthOfLongestSubarrayWithSumK(arr: number[], k: number): number {
    const n = arr.length;
    const totalSum = arr.reduce((acc, ele) => ele + acc);

    let left = 0, sum = 0, maxLen = -1, target = (totalSum - k);

    if(target < 0) return -1;

    for (let right = 0; right < n; right++) {
        sum += arr[right];

        while (sum > target) {
            sum -= arr[left];
            left++;
        }

        if (sum === target) {
            maxLen = Math.max(maxLen, right - left + 1);
        }
    }

    return (maxLen === -1)? -1: (n - maxLen);
}