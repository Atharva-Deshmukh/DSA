/* 209. Minimum Size Subarray Sum

Given an array of positive integers nums and a positive integer target, 
return the minimal length of a subarray whose sum is greater than or equal to target. 
If there is no such subarray, return 0 instead.

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Input: target = 4, nums = [1,4,4]
Output: 1

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
 

Constraints:
    1 <= target <= 10^9
    1 <= nums.length <= 10^5
    1 <= nums[i] <= 10^4
 

Approach: 
- Adapt code for longest substring with length <= k

*/

function minSizeSubarrayWhoseSumIsGreaterThanEqualToK(a, k) {
    const n = a.length

    let l = 0, r = 0, sum = 0, minLen = Number.MAX_SAFE_INTEGER;

    while (r < n) {
        sum += a[r];

        while ((l <= r) && (sum >= k)) {
            minLen = Math.min(minLen, (r - l + 1));
            sum -= a[l];
            l++;
        }

        r++;
    }

    return (minLen === Number.MAX_SAFE_INTEGER) ? 0 : minLen;
}