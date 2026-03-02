/* 1004. Max Consecutive Ones III

Given a binary array nums and an integer k, return the maximum number of consecutive 1's 
in the array if you can flip at most k 0's.


Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]


Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]

 

Constraints:
    1 <= nums.length <= 10^5
    nums[i] is either 0 or 1.
    0 <= k <= nums.length


We can convert this problem to -> Longest subarray with k 0s

                                            BRUTE FORCE
                                            -----------

- Generate all the subarrays and calculate no of zeros, 
  Update maxLen when 0s exceeds k
  If we exceed k, break the loop and move ahead, because no point in accumulating 0s as we have exceeded k

                                for(i = 0 --- (n-1)) {

                                    noOfZeros = 0;
                                    for(j = i --- (n - 1)) {
                                        if(a[i] === 0) noOfZeros++;

                                        // We can flip at most k zeros, so include at most k zeros
                                        if(noOfZeros <= k) {
                                            maxLen = max(maxLen, (j - i + 1))
                                        }

                                        // we exceeded K, no point in moving further with this i,j combo
                                        if(noOfZeros > k) break;
                                    }
                                }

TC: O(n ^ 2)
SC: O(1)

We need to optimise this, since we have to get subarray and we need O(n) TC, we can think of 
sliding window and two pointers approach

Same variable sized sliding window technique is used here also, with little variation

TC: O(n + n) = O(2n)
SC: O(1) */

function longestOnes(a: number[], k: number): number {
    const n = a.length;
    let l = 0, r = 0, maxLen = 0, zeroCount = 0;

    while(r < n) {

        if(a[r] === 0) zeroCount++;

        while(( l <= r) && (zeroCount > k)) {
            if(a[l] === 0) zeroCount--;
            l++;
        }

        if(zeroCount <= k) maxLen = Math.max(maxLen, (r - l + 1));

        r++;
    }

    return maxLen;
};

/* But there is still internal while loop which is causing a bit extra iteration, we can optimise this 

    NOTE: This optimisation is only when max length is asked, if we are asked exact subarrays, it fails

    [1,1,1,0,0,0,1,1,1,1,0], k = 2
     l
     r

    [1,1,1,0,0,0,1,1,1,1,0]  zeros = 0
     l r                     maxLen = 2

    [1,1,1,0,0,0,1,1,1,1,0]  zeros = 0
     l   r                   maxLen = 3

    [1,1,1,0,0,0,1,1,1,1,0]  zeros = 1
     l     r                 maxLen = 4

    [1,1,1,0,0,0,1,1,1,1,0]  zeros = 2
     l       r               maxLen = 5

    [1,1,1,0,0,0,1,1,1,1,0]  zeros = 3 > k
     l         r
     
     Instead of a while loop, we just do l++ once, why?
     we want to preserve the maxLen, we won't go below the maxLen that we have accumulated till now
     so l++ only once preserves maxLen accumulated till now
     [1,1,1,0,0,0,1,1,1,1,0]  zeros = 3 > k
        l       r

TC: O(n)
SC: O(1) */

class Solution {
    maxOnes(a, k) {
                const n = a.length;
    let l = 0, r = 0, maxLen = 0, zeroCount = 0;

    while(r < n) {

        if(a[r] === 0) zeroCount++;

        if(( l <= r) && (zeroCount > k)) {
            if(a[l] === 0) zeroCount--;
            l++;
        }

        if(zeroCount <= k) maxLen = Math.max(maxLen, (r - l + 1));

        r++;
    }

    return maxLen;
        
    }
}