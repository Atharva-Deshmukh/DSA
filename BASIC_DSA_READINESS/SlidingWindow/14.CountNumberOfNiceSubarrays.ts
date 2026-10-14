/* 1248. Count Number of Nice Subarrays

Given an array of integers nums and an integer k. A continuous subarray is called nice 
if there are k odd numbers on it.

Return the number of nice sub-arrays.


Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There are no odd numbers in the array.

Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16
 

Constraints:
    1 <= nums.length <= 50000
    1 <= nums[i] <= 10^5
    1 <= k <= nums.length


                                            BRUTE FORCE
                                            -----------
                            
- One by one generate subarrays that start from ith index, and then keep track of odd elements in it
  Once odd elements meet condition, increment the count

                                        for(i = 0 --- (n - 1)) {

                                            oddCount = 0;

                                            for(j = i --- (n - 1)) {
                                                if((a[j] % 2) === 1) oddCount++;
                                                if(oddCount === k) ans++;
                                            }
                                        }

TC: O(n ^ 2)
SC: O(1)

Approach:
- Use Binary subarrays logic.
    Number of subarrays with k odd numbers = 
    Number of subarrays with <= k odd numbers - Number of subarrays with <= (k - 1) odd numbers
*/

function findCountOfSubarraysWithKOddNumbers(a, k) {
    const n = a.length

    let l = 0, r = 0, oddCount = 0, ans = 0;

    while (r < n) {
        if ((a[r] % 2) === 1) oddCount++;

        while ((l <= r) && (oddCount > k)) {
            if ((a[l] % 2) === 1) oddCount--;
            l++;
        }

        if (oddCount <= k) ans += (r - l + 1);

        r++;
    }

    return ans;
}

function numberOfSubarrays(a: number[], k: number): number {
    const lessThanEqualK = findCountOfSubarraysWithKOddNumbers(a, k);
    const lessThanEqualKMinus1 = findCountOfSubarraysWithKOddNumbers(a, k - 1);

    return lessThanEqualK - lessThanEqualKMinus1;
};