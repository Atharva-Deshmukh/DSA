/* 560. Subarray Sum Equals K

You are given an array of integers nums and an integer k, return the total number of 
subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Input: nums = [2,-1,1,2], k = 2
Output: 4
Explanation: [2], [2,-1,1], [-1,1,2], [2] are the subarrays whose sum is equals to k.

Input: nums = [4,4,4,4,4,4], k = 4
Output: 6

Constraints:
    1 <= nums.length <= 20,000
    -1,000 <= nums[i] <= 1,000
    -10,000,000 <= k <= 10,000,000


BRUTE FORCE:
- Generate all subarrays and see which are having sum = k, return the count

                                    for(let i = 0; i < n; i++) {
                                        
                                        let sum = 0;
                                        for(let j = i; i < n; j++) {
                                            sum += a[j];
                                            if(sum === k) count++;
                                        }
                                    }

TC: O(n^2)
SC: O(1) */

function subarraySumBrute(a: number[], k: number): number {
    const n = a.length;
    let count = 0;
        
    for (let i = 0; i < n; i++) {

        let sum = 0;
        for (let j = i; j < n; j++) {
            sum += a[j];
            if (sum === k) count++;
        }
    }
        
    return count;
};

/* Optimal approach:

Since its a subarray problem, we can think of sliding window BUT
Sliding window works only when all numbers are non-negative because we need to be sure about:
- When we shrink the window, sum should decrease, but this is not guaranteed when a[i] < 0
- Like wise for increasing the window

So, most optimal solution for this problem is the prefix sum approach

     0  1  2   3  4  5  6  7  8   9
a = [1, 2, 3, -3, 1, 1, 1, 4, 2, -3],    k = 3
     i                  j

p = [1  3  6   3  4  5  6  10 12  9]
     
    Now, for j = 6 currSum[j] = 6
    No of times there appeared currentSum - k = 6 - 3 = 3 --> 2 times,
    So, there exists two subarrays whose sum was x - k
    So, there are two subarrays whose sum is k

    [1, 3] Sum was 6 - 3        --> [3, -3, 1, 1, 1] has sum 3
    [1, 2, 3, -3] Sum was 6 - 3 --> [1, 1, 1] has sum 3

    We think reverse, in terms of no of (x - k)s rather than ks because its easy to store prefix sums
    rather than just sums in somewhere middle

    In map, we also store (0 -> 1) to handle a special case when subarray starts from 0th index itself
    ex: nums = [2,3], k = 5
    i = 0:
        2 - 5 does not exists in map so move ahead

    i = 1:
        5 - 5 = 0 SHOULD exist in map to count this also
*/

function subArraySum(a, k) {
    const n = a.length;

    let map = new Map();
    let count = 0;
    let currSum = 0;

    map.set(0, 1); // special case when targetSubarray starts from 0th index

    for (let i = 0; i < n; i++) {
        currSum += a[i];
        
        if (map.has(currSum - k)) count += map.get(currSum - k);

        /* The prefix sum must be stored every iteration, regardless of whether we found a subarray. */
        if (map.has(currSum)) map.set(currSum, map.get(currSum) + 1); 
        else map.set(currSum, 1);
    }

    return count;
}

/* Now, since we have figured out how to find the counts, 
Lets try to find the actual subarrays, we can do that by the below observation

     0   1  2  3
a = [2, -1, 1, 2], k = 2
p = [2   1  2  4]

We store the array of indices of the frequencies in the map
Since we have to get all the subarrays with sum k, we will store the indices of all (sum - k)s

                                Sum  |  Index
                                ------------
                                0   |   [-1]     -> that special case of map.set(0, 1)
                                2   |   [0, 2]
                                1   |   [1]         
                                4   |   [3]

i = 0: 
    currSum[0] - k = 2 - 2 = 0 exists at -1
    i.e. (x - k) exists till mapIndex, so k will exist from (mapIndex + 1, k) = [2]

    Add current sum also in map -> map.set(2, 1)

i = 1: 
    currSum[1] - k = 1 - 2 = -1 NOT IN MAP
    Add current sum in map -> map.set(1, 1)

i = 2: 
    currSum[2] - k = 2 - 2 = 0 exists at -1
    so (x - k) exists till -1, hence k will exist from (-1 + 1, i) = (0, 2) = [2, -1, 1]

i = 3: 
    currSum[3] - k = 4 - 2 = 2 exits at 0 and 2
    (x - k) exists till 0, hence k will exist from (0 + 1, i) = (1, 3) = [-1, 1, 2]
    (x - k) exists till 2, hence k will exist from (2 + 1, i) = (3, 3) = [2]

So, final subarrays = [2], [2, -1, 1], [-1, 1, 2], [2]


In the below code, since we are not calculating count now, so map = <sum, arr[indices]>
*/

function subArraySumActualSubarrays(a, k) {
    const n: number = a.length;

    let map = new Map<number, number[]>();
    let ans: number[][] = [];
    let currSum: number = 0;

    map.set(0, [-1]); // special case when targetSubarray starts from 0th index - we add imaginary index -1

    for (let i = 0; i < n; i++) {
        currSum += a[i];
        
        if (map.has(currSum - k)) {
            const indexArr: number[] = map.get(currSum - k)!;
            indexArr.forEach((mapIndex) => ans.push([mapIndex + 1, i]));
        }

        /* map = <sum, arr[indices] */
        if(!map.has(currSum)) map.set(currSum, [i]);
        else map.set(currSum, [...map.get(currSum)!, i]); 
    }

    return ans;
}

/* 
TC: O(n ^ 2)
    If prefix sums repeat many times, we may iterate over many stored indices.
    Worst-case array: [0,0,0,0,0], k = 0
    Prefix sums: 0,0,0,0,0
    Number of subarrays: n(n+1)/2
    So the algorithm must generate: -> O(n²) subarrays
*/