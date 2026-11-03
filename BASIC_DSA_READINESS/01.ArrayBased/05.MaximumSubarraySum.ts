/* 53.Maximum Subarray

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

Kadane’s insight: "max subarray ending here = either just current element, or current element + max subarray ending at the previous index."

- If the running sum is positive or zero, it helps, so keep it and add the next element.
- If the running sum is negative, it only drags the next element down, so throw it away and start fresh at that element.

That is the whole algorithm. The line currentSum = max(x, currentSum + x) is just a compact way of writing it.

Trace on [2, -3, 4, -2, 2, 1, -1, 4]

i	x	currentSum before	action	currentSum	maxSum
0	2	        –	         init	   2	      2
1	-3	        2 (≥0)	     extend	  -1	      2
2	4	       -1 (<0)	     restart   4	      4
3	-2	        4	         extend	   2	      4
4	2	        2	         extend	   4	      4
5	1	        4	         extend	   5	      5
6	-1	        5	         extend	   4	      5
7	4	        4	         extend	   8	      8

At i=2 the running sum was -1, so it was dropped and a new subarray started at 4. The answer is [4,-2,2,1,-1,4] = 8.

TC: O(n)
SC: O(1) */

function maxSubarraySum(arr) {
    let currentSum = arr[0]; /* sum till current index */
    let maxSum = arr[0];     /* max sum found so far */

    for (let i = 1; i < arr.length; i++) {

        /* If previous sums are negative, drop it and start new subarray */
        if (currentSum < 0) currentSum = arr[i];
        else currentSum += arr[i]; /* current element + previous sum */

        /* Update maxSum */
        if (currentSum > maxSum) maxSum = currentSum;
    }

    return maxSum;
}


function maxSubarraySumActualSubarray(arr) {
    let currentSum = arr[0]; /* sum till current index */
    let maxSum = arr[0];     /* max sum found so far */

    /* tempStart is where the current running subarray began. It changes on every restart.
       start is where the best subarray began. It should only change when maxSum improves.
       A restart does not mean the new subarray is the best. 
       So start must only copy tempStart at the moment maxSum improves.
    */
    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < arr.length; i++) {

        /* If previous sums are negative, drop it and start new subarray */
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStart = i;          // new subarray starts here
        }
        else currentSum += arr[i];  /* current element + previous sum */

        /* Update maxSum */
        if (currentSum > maxSum) { 
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }

    console.log(arr.slice(start, end + 1));
    return maxSum;
}