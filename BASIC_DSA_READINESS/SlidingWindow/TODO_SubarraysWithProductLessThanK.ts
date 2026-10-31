/* 713. Subarray Product Less Than K

Given an array of positive integers nums and an integer k, return the number of contiguous
subarrays where the product of all the elements is strictly less than k.

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]

Hint: variable window. Multiply a[right] into product; while product >= k, divide by a[left++].
      Add (right - left + 1) to the count. (Handle k <= 1 -> 0.)
*/

function numSubarrayProductLessThanK(a: number[], k: number): number {
    // TODO
    return 0;
}