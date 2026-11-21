/* 974. Subarray Sums Divisible by K

Given an integer array nums and an integer k, return the number of non-empty 
subarrays that have a sum divisible by k.

A subarray is a contiguous part of an array.


Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

Input: nums = [5], k = 9
Output: 0
 
Constraints:
    1 <= nums.length <= 3 * 10^4
    -10^4 <= nums[i] <= 10^4
    2 <= k <= 10^4


                                                BRUTE FORCE:
                                                -----------

- Generate all subarrays, calculate sums and check if(abs(sum) % k === 0)

TC: O(n^2)
SC: O(1)

                                                PREFIX SUM TRICK:
                                                -----------------

prefix[i] = sum of elements from 0 → i

sum(i → j) = prefix[j] - prefix[i-1]

We want this to be divisible by k: (prefix[j] - prefix[i-1]) % k === 0

(prefix[j] - prefix[i-1]) % k == 0      ==>      (prefix[j] % k) === (prefix[i-1] % k)

So instead of checking sums, we just compare remainders

Now the problem becomes:
    Count pairs (i, j) such that -> (prefix[i] % k) == (prefix[j] % k)

    Same remainder = subarray between them is divisible by k

TRICK THEN:
----------

When you see the same remainder again It means --> prefix[j] % k == prefix[i] % k

So the subarray: (i+1 → j) is divisible by k.

       0  1  2   3   4  5
arr = [4, 5, 0, -2, -3, 1], k = 5

To handle negatives → ((sum % k) + k) % k
                OR -> r = sum % k; if (r < 0) r += k;

Derivation:
    a % b gives result in (-b, b), both excluded
    sum % k gives result in (-k, k), both excluded
            inclusive range [(-k - 1), (k + 1)]
            +k to both      [1, 2k - 1]
            A negative remainder becomes positive. 
            Positive remainder is now too big by k, hence %k
            which folds everything back into [0, k-1]

NOTE: we again need to seed map.set(0, 1);
      
     a = [3, 2], k = 5

     j=0: sum = 3, remainder 3. Not in the map, so count stays 0. We store remainder 3.
    
     j=1: sum = 5, remainder 0. We look up remainder 0.
          With the seed, it's found once, so count = 1 ([3, 2]). ✓
          Without the seed, count = 0. ✗
*/

function countSubarraysDivByK(a: number[], k: number): number {
    const n = a.length;
    let count = 0;
    let map = new Map();

    map.set(0, 1); /* corner case when target subarray starts from 0th index, i.e, if remainder is 0 */

    let sum = 0;
    for(let i = 0; i < n; i++) {
        sum += a[i];

        const remainder = (((sum % k) + k) % k); /* Handles negatives */

        /* Update count */
        if(map.has(remainder)) count += map.get(remainder);

        /* Update remainder count in map always */
        if(!map.has(remainder)) map.set(remainder, 1);
        else map.set(remainder, map.get(remainder) + 1);
    }

    return count;
}

/* Lets find out actual subarrays */
function exactSubarraysDivByK(a: number[], k: number): number[][] {
    const n = a.length;
    let ans: number[][] = [];
    let map = new Map();

    map.set(0, [-1]); /* we store index of occurrence now in the map */

    let sum = 0;
    for(let i = 0; i < n; i++) {
        sum += a[i];

        const remainder = (((sum % k) + k) % k);

        /* push the subarrays */
        if(map.has(remainder)) {
            const indices: number[] = map.get(remainder)!;
            indices.forEach((index) => { ans.push([(index + 1), i]); });
        }

        /* Regardless of we have remainder in map or not, we update the map always */
        if(!map.has(remainder)) map.set(remainder, [i]);
        else map.get(remainder)!.push(i); 
    }

    return ans;
}