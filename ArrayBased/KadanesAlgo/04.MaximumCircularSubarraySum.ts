/* Maximum Circular Subarray Sum

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

🧠 Intuition in One Line -> “Either take the best normal subarray OR take everything except the worst part.”

[8, -8, 9, -9, 10, -11, 12]
Remove worst: [-11]
Remaining (circular): [12, 8, -8, 9, -9, 10]

Key Trick: Circular max = Total Sum − Minimum Subarray Sum

Why?
Wrapping subarray = “everything except a middle bad part”
That “bad part” is the minimum subarray

Important Edge Case

If all elements are negative: totalSum - minSubarray = 0 ❌ (invalid)
So return normalMax


*/

function maxCircularSubarraySum(arr) {

    // 1. Normal Kadane (max subarray)
    let currentMax = arr[0], maxSum = arr[0];

    // 2. Min Kadane (min subarray)
    let currentMin = arr[0], minSum = arr[0];

    // 3. Total sum
    let totalSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let x = arr[i];

        // Standard Kadane (max)
        currentMax = Math.max(x, currentMax + x);
        maxSum = Math.max(maxSum, currentMax);

        // Reverse Kadane (min)
        currentMin = Math.min(x, currentMin + x);
        minSum = Math.min(minSum, currentMin);

        // Total sum
        totalSum += x;
    }

    // Edge case: all negative
    if (maxSum < 0) return maxSum;

    // Circular case
    return Math.max(maxSum, totalSum - minSum);
}