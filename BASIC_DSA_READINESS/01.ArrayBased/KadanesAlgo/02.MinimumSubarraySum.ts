/* Smallest sum contiguous subarray

Given an array arr[] of N integers. Find the contiguous sub-array(containing at least one number) 
which has the minimum sum and return its sum.

Input: arr[] = {3,-4, 2,-3,-1, 7,-5}
Output: -6
Explanation: sub-array which has smallest  sum among all the sub-array is {-4,2,-3,-1} = -6

Input: arr[] = {2, 6, 8, 1, 4}
Output: 1
Explanation: sub-array which has smallest sum among all the sub-array is {1} = 1

Constraints:
    1 ≤ N ≤ 10^6
    -10^7 ≤ A[i] ≤ 10^7

APPROACH: Minimum subarray sum = Kadane with reversed logic

*/

function minSubarraySum(arr) {
    let currentSum = arr[0]; // sum ending at current index
    let minSum = arr[0];     // best (minimum) sum found so far

    for (let i = 1; i < arr.length; i++) {

        // This time, If previous sum is positive, drop it, because we need minimum
        if (currentSum > 0) currentSum = arr[i];
        else currentSum += arr[i]; // else extend this

        // Track minimum result
        if (currentSum < minSum) minSum = currentSum;
    }

    return minSum;
}

function minSubarraySumActualSubarray(arr) {
    let currentSum = arr[0];
    let minSum = arr[0];

    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < arr.length; i++) {

        // Restart if current sum is positive
        if (currentSum > 0) {
            currentSum = arr[i];
            tempStart = i;
        } else {
            currentSum += arr[i];
        }

        // Update minimum
        if (currentSum < minSum) {
            minSum = currentSum;
            start = tempStart;
            end = i;
        }
    }

    console.log(arr.slice(start, end + 1));
    return minSum;
}