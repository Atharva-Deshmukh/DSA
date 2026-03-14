/* Original Array from given Prefix Sums

You are given a prefix sum array presum[] of an array arr[]. 
The task is to find the original array arr[] whose prefix sum is presum[].

Input:  presum[] = {5, 7, 10, 11, 18}
Output: [5, 2, 3, 1, 7]
Explanation: Original array {5, 2, 3, 1, 7} 

Prefix sum array = {5, 5+2, 5+2+3, 5+2+3+1, 5+2+3+1+7} = {5, 7, 10, 11, 18}
Each element of original array is replaced by the sum of the prefix of current index.

Input: presum[] = {45, 57, 63, 78, 89, 97}
Output: [45, 12, 6, 15, 11, 8] 

Pattern observed is very straightforeward, just subtract previous number

*/

function decodeArray(presum) {
    const n = presum.length;
    let arr = new Array(n);

    // Calculating elements of the original array
    arr[0] = presum[0];
    for (let i = 1; i < n; i++) {
        arr[i] = presum[i] - presum[i - 1];
    }

    return arr;
}