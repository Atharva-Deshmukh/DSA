/* Max Sum Subarray of size K

Given an array of integers arr[]  and a number k. 
Return the maximum sum of a subarray of size k.


Input: arr[] = [100, 200, 300, 400], k = 2
Output: 700
Explanation: arr2 + arr3 = 700, which is maximum.

Input: arr[] = [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4
Output: 39
Explanation: arr1 + arr2 + arr3 + arr4 = 39, which is maximum.

Input: arr[] = [100, 200, 300, 400], k = 1
Output: 400
Explanation: arr3 = 400, which is maximum.

Constraints:
    1 ≤ arr.size() ≤ 10^6
    1 ≤ arr[i] ≤ 10^6
    1 ≤ k ≤ arr.size()


Problem Pattern: Constant size sliding window

Approach:
- Calculate the sum of the first window
- window will be denoted by two pointers l and r

           0  1  2  3  4
  let a = [1, 2, 3, 4, 5] k = 2

  r = i
  l = (i - k + 1)

  We can see that the outgoing index of the window = (i - k)

- While sliding the window to right by 1,
  remove outgoing element a[i - k] from the sum
  add incoming element to the sum a[i]

  TC: O(n)
  SC: O(1) */

function maxSubarraySum(a, k) {
    const n = a.length;

    let maxSum = Number.MIN_SAFE_INTEGER;

    if(k === n) return a.reduce((accumulator, element) => accumulator + element, 0);

    /* Calculate sum of first window 
       this is the initial sum, for subsequent windows, we can simply modify this sum
    */
    let currentSum = 0;
    for(let i = 0; i <= (k - 1); i++) {
        currentSum += a[i];
    }

    maxSum = (currentSum > maxSum)? currentSum: maxSum;

    /* Now slide the window to right by one element */
    let r = k;
    while (r < n) {
        currentSum -= (r - k);
        currentSum += a[r];
        maxSum = (currentSum > maxSum)? currentSum: maxSum;

        r++;
    }

     return maxSum; 
}

/* Slight variation: 2461. Maximum Sum of Distinct Subarrays With Length K

You are given an integer array nums and an integer k. Find the maximum subarray sum of all 
the subarrays of nums that meet the following conditions:

The length of the subarray is k, and all the elements of the subarray are distinct.
Return the maximum subarray sum of all the subarrays that meet the conditions. 
If no subarray meets the conditions, return 0.

Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions

Input: nums = [4,4,4], k = 3
Output: 0
Explanation: The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.
 

Constraints:

1 <= k <= nums.length <= 10^5
1 <= nums[i] <= 10^5

Approach: 
- Here we will maintain a hashmap and if any element duplicates in the current window, we add 0 to the sum
*/

function maximumSubarraySumUniqueElements(a: number[], k: number): number {
    const n = a.length;

    let maxSum = Number.MIN_SAFE_INTEGER;
    let hash = new Map();
    let currentSum = 0;

    /* First window */
    for(let i = 0; i < k; i++) {

        /* Maintain hash */
        if(!hash.get(a[i])) hash.set(a[i], 1);
        else hash.set(a[i], hash.get(a[i]) + 1);

        /* Maintain the currentSum regardless of element's uniqueness */
        currentSum += a[i];
    }

    /* Update maxSum only if we have unique elements in this window */
    if(hash.size === k) maxSum = (currentSum > maxSum)? currentSum: maxSum;

    /* Move the window forward now */
    let r = k;
    while(r < n) {
        currentSum -= a[r - k];

        /* Update hash for element being removed from the window */
        if(hash.get(a[r - k]) > 1) hash.set(a[r-k], hash.get(a[r - k]) - 1);
        else hash.delete(a[r - k]);

        currentSum += a[r];

        /* Update has for the element being added to the window */
        if (!hash.get(a[r])) hash.set(a[r], 1);
        else hash.set(a[r], hash.get(a[r]) + 1);

        /* Update maxSum only if we have unique elements in this window */
        if(hash.size === k) maxSum = (currentSum > maxSum)? currentSum: maxSum;
        r++;
    }

    /* If everything was duplicate, maxSum would have been never updated, so return 0 */
    return (maxSum === Number.MIN_SAFE_INTEGER)? 0 : maxSum;
};