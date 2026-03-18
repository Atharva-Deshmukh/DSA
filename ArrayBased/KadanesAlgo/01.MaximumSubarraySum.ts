/* Maximum Subarray

Given an array of integers nums, find the subarray with the largest sum 
and return the sum.

Input: nums = [2,-3,4,-2,2,1,-1,4]
Output: 8
Explanation: The subarray [4,-2,2,1,-1,4] has the largest sum 8.

Input: nums = [-1]
Output: -1

Constraints:
    1 <= nums.length <= 1000
    -1000 <= nums[i] <= 1000


                                                BRUTE FORCE:
                                                ------------

- Generate all subarrays, calculate sum side by side, return maxSum

TC: O(n^2)
SC: O(1)

                                                Kadane's Algo:
                                                --------------

Kadane’s insight: At every index, decide whether to continue the current subarray or start fresh.

We maintain two variables:
- current_sum → max subarray sum ending at current index
- max_sum → best answer so far

At each element x, we decide: current_sum = max(x, current_sum + x)

Either:
- Start new subarray from x
- Or extend previous one

Then: max_sum = max(max_sum, current_sum)

If the running sum becomes negative, it will only reduce future sums, so restart.


TC: O(n^2)
SC: O(1) */

function maxSubarraySum(arr) {
    let currentSum = arr[0]; // sum ending at current index
    let maxSum = arr[0];     // best sum found so far

    for (let i = 1; i < arr.length; i++) {

        // If previous sum is negative, drop it
        if (currentSum < 0) currentSum = arr[i];
         else currentSum += arr[i]; /* Extend previous sum */

        // Track best result
        if (currentSum > maxSum) maxSum = currentSum;
    }

    return maxSum;
}


function maxSubarraySumActualSubarray(arr) {
    let currentSum = arr[0]; // sum ending at current index
    let maxSum = arr[0];     // best sum found so far

    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < arr.length; i++) {

        // If previous sum is negative, drop it
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStart = i; // new subarray starts here
        }
         else currentSum += arr[i]; /* Extend previous sum */

        // Track best result
        if (currentSum > maxSum) { 
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }

    console.log(arr.slice(start, end + 1));
    return maxSum;
}