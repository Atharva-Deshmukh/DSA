/* 918.Maximum Circular Subarray Sum

Given a circular array arr[], find the maximum sum of any non-empty subarray. 
A circular array allows wrapping from the end back to the beginning.

Input: arr[] = [8, -8, 9, -9, 10, -11, 12]
Output: 22
Explanation: The circular subarray [12, 8, -8, 9, -9, 10] gives the maximum sum, which is 22.

Input: arr[] = [4, -1, -2, 3]
Output: 7
Explanation: The circular subarray [3, 4] gives the maximum sum of 7.

Input: arr[] = [5, -2, 3, 4]
Output: 12
Explanation: The circular subarray [3, 4, 5] gives the maximum sum of 12.

                                        BRUTE FORCE
                                        -----------

                            // Subarray that starts with index i
                            for(let i = 0; i < n; i++) {
                                let currSum = 0;
                                
                                // Considering all possible endpoints of the 
                                // Subarray that begins with index i
                                for(let j = 0; j < n; j++) {
                                    
                                    // Circular index
                                    const idx = (i + j) % n;
                                    currSum += arr[idx];            
                                    res = Math.max(res, currSum);
                                }
                            }


                                    KADANE'S ALGO
                                    -------------

Intuition: Use Kadane's algo to get max of normal sum or the rotated/wrapped sum

Case 1 (normal):    [ . . [ X X X X ] . . ]      the best part is in the middle
Case 2 (wrapping):  [ X X ] . . . . [ X X X ]    it uses the ends and wraps around
                    It takes a suffix and a prefix, and it skips a contiguous chunk in the middle.

wrapping sum = totalSum − (sum of the skipped middle chunk)

To make the wrapping sum as large as possible, make the skipped chunk as small as possible. 
The smallest-sum contiguous chunk is the minimum subarray sum. 
You find it with Flipped Kadane's algo for min sum subarray.

Answer = max( normalMaxSubarray , totalSum − minSubarray ).
*/

function maxCircularSubarraySum(arr) {
    let currentMax = arr[0], maxSum = arr[0];
    let currentMin = arr[0], minSum = arr[0];
    let totalSum = arr[0];

    for (let i = 1; i < arr.length; i++) {

        // Max Kadane: negative prefix hurts, so drop it
        if (currentMax < 0) currentMax = arr[i];
        else currentMax += arr[i];
        if (currentMax > maxSum) maxSum = currentMax;

        // Min Kadane: positive prefix hurts, so drop it
        if (currentMin > 0) currentMin = arr[i];
        else currentMin += arr[i];
        if (currentMin < minSum) minSum = currentMin;

        totalSum += arr[i];
    }

    // Edge case: all negative
    if (maxSum < 0) return maxSum;

    return Math.max(maxSum, totalSum - minSum);
}