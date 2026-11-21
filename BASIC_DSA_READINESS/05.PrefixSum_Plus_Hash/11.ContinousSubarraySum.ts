/* 523. Continuous Subarray Sum

Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

A good subarray is a subarray where:
    its length is at least two, and
    the sum of the elements of the subarray is a multiple of k.

Note that:
    A subarray is a contiguous part of the array.
    An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.

Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.

Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.

Input: nums = [23,2,6,4,7], k = 13
Output: false

Idea: if two numbers leave the same remainder when divided by k, their difference is a multiple of k.

prefixSum[j] = a·k + r
prefixSum[i] = b·k + r      (same remainder r)

prefixSum[j] - prefixSum[i] = (a - b)·k + (r - r) => (a - b)·k

So prefixSum[j] % k == prefixSum[i] % k  --> same remainder means the subarray (i+1 .. j) is a multiple of k

map.set(0, -1) -> empty prefix, handles subarrays starting at index 0 (e.g. whole array in example 2)
We return as soon as one good subarray is found, no counting needed.
Time: O(n)  Space: O(min(n, k))
*/

function checkSubarraySum(nums: number[], k: number): boolean {
    const map = new Map<number, number>(); // <remainder, firstIndex>
    map.set(0, -1);

    let currSum = 0;

    for (let i = 0; i < nums.length; i++) {
        currSum += nums[i];
        const remainder = currSum % k; 
        /* If negative nos are there in array => const remainder = ((currSum % k) + k) % k; */

        if (map.has(remainder)) {
            if (i - (map.get(remainder)! + 1) + 1 >= 2) return true;
        } else {
            map.set(remainder, i); // keep only the first occurrence, don't overwrite
        }
    }

    return false;
}