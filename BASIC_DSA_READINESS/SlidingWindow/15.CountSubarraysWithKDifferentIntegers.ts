/* 992. Subarrays with K Different Integers

Given an integer array nums and an integer k, return the number of good subarrays of nums.
A good array is an array where the number of different integers in that array is exactly k.

For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: 
[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]

Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
 
Constraints:
    1 <= nums.length <= 2 * 10^4
    1 <= nums[i], k <= nums.length



*/


function subarraysWithAtMostKDistinctChars(a, k) {
    const n = a.length

    let l = 0, r = 0, count = 0;
    let map = new Map();

    while (r < n) {
        
        /* Add the character to the map */
        if(!map.has(a[r])) map.set(a[r], 1);
        else map.set(a[r], map.get(a[r]) + 1);

        /* shrink the window if map size exceeds k */
        while ((l <= r) && (map.size > k)) {
            if(map.get(a[l]) === 1) map.delete(a[l]);
            else map.set(a[l], map.get(a[l]) - 1);

            l++;
        }

        if (map.size <= k) count += (r - l + 1);

        r++;
    }

    return count;  
}

function subarraysWithKDistinct(a: number[], k: number): number {
    const lessThanEqualK = subarraysWithAtMostKDistinctChars(a, k);
    const lessThanEqualKMinus1 = subarraysWithAtMostKDistinctChars(a, k - 1);

    return lessThanEqualK - lessThanEqualKMinus1;
}