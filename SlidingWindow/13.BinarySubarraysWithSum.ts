/* 930. Binary Subarrays With Sum

Given a binary array nums and an integer goal, return the number 
of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.

Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: 
                [1,0,1,_,_]
                [1,0,1,0,_]
                [_,0,1,0,1]
                [_,_,1,0,1]

Input: nums = [0,0,0,0,0], goal = 0
Output: 15
 
Constraints:
    1 <= nums.length <= 3 * 10^4
    nums[i] is either 0 or 1.
    0 <= goal <= nums.length


                                            BRUTE FORCE
                                            -----------

                                        for(i = 0 --- (n - 1)) {

                                            sum = 0;
                                            for(j = i --- (n - 1)) {
                                                 sum += a[j];

                                                 if(sum === goal) ans++;

                                                 if(sum > goal) break;
                                            }
                                        }

TC: O(n^2)
SC: O(1)

Since we need subarrays and we need TC of around O(n), we can think of sliding window + 2 pointers like algo

This problem can be viewed as -> count subarrays with sum k (its hashing based question)

But in problem count subarrays with sum k using hashing + prefixSum technique
TC: O(n) -> Array iteration
SC: O(n) -> Hash map

We can optimise SC since its a binary array using sliding window techique

BUT, simply by using standard two pointer technique, we may miss out many subarrays

We will use Pattern-3

     no of subarrays with sum = k -> Condition is constant here

     In such problems:
        1 = Calculate no of subarrays with sum <= k
        2 = Calculate no of subaarays with sum <= (k - 1)
        Do 1 - 2


NOTE: 
- this pattern works only for arrays with elements >= 0
  Because sliding window works only for 0 or positive elements

  Why?
  Sliding window techique works only when 
  - Moving right pointer increases the sum 
  - Moving left pointer decreases the sum for sure

  But, for negative integers in an array, moving left pointer doesn't always guarantee the decrease of sum
  This makes us unsure if the sum inside the window is <= k or not

How to calculate number of subarrays with sum <= k
- Follow the common sliding window template pattern, with just one change


                            function findMaxSubarrayLengthWithSumLessThanK(a, k) {
                                const n = a.length
                                let count = 0;

                                let l = 0, r = 0, sum = 0, maxLen = 0;

                                while (r < n) {
                                    sum += a[r];

                                    while ((l <= r) && (sum > k)) {
                                        sum -= a[l];
                                        l++;
                                    }

                                    if (sum <= k) count += (r - l + 1); // CHANGE

                                    r++;
                                }

                                return count;
                            }

    Ex: a = [1, 1, 0, 0, 1]   k = 2
             i        j
             
    adding two zeros also kept the sum <= 2, so [0] and [0, 0] are also the subarrays with sum <= k
    So number of subarrays with sum <= k are all those ending with j here
    [1, 1, 0, 0], [1, 1, 0], [0, 0], [0] === length of this subarray
    hence count += (r - l + 1) */

function findMaxSubarrayLengthWithSumLessThanK(a, k) {
    const n = a.length
    let count = 0;

    let l = 0, r = 0, sum = 0, maxLen = 0;

    while (r < n) {
        sum += a[r];

        while ((l <= r) && (sum > k)) {
            sum -= a[l];
            l++;
        }

        if (sum <= k) count += (r - l + 1);

        r++;
    }

    return count;
}

function numSubarraysWithSum(a: number[], k: number): number {
    const lessThanEqualK = findMaxSubarrayLengthWithSumLessThanK(a, k);
    const lessThanEqualKMinus1 = findMaxSubarrayLengthWithSumLessThanK(a, k-1);

    return lessThanEqualK - lessThanEqualKMinus1;
};