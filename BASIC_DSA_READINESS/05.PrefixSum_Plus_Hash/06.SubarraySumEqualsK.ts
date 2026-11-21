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

/* Optimal approach: Prefix sum

- No sliding window use since sliding window works only for positive numbers
- Prefix sum approach remains

     0  1  2   3  4  5  6  7  8   9
a = [1, 2, 3, -3, 1, 1, 1, 4, 2, -3],    k = 3
     i                  j

p = [1  3  6   3  4  5  6  10 12  9]
     
    KEY IDEA
    --------
    prefixSum[j] = sum(0, j)
    A subarray (i+1 .. j) has sum = prefixSum[j] - prefixSum[i]
                      we want sum = k 
                                k = (prefixSum[j] - prefixSum[i])
                     prefixSum[i] = prefixSum[j] - k

    So at every j we ask --> "How many earlier prefix sums were equal to (prefixSum[j] - k)?"

    We look for currSum - k

    ----------------------------------------------------------------------------------
    Corner Case: a[0..j] that sums to k, i.e, required subarray starts from 0th index --> map.set(0, 1)
    ----------------------------------------------------------------------------------
    
    At index j, if currSum == k, we look up currSum - k = 0. 
    The map must already contain 0 for that prefix to be counted.

    a = [0, 5], k = 5

    pre-seed map = {0: 1}

    j=0: currSum = 0. We look up 0 - 5 = -5, which isn't there. 
         Then we store 0
         map = {0: 2}

    j=1: currSum = 5. We look up 5 - 5 = 0 and find its count = 2
         because answers = [0, 5] and [5]

        IF WE HADN't pre-seed map = {0: 1}

        then count would be 1 and one subarray would be missing
*/

function subArraySum(a, k) {
    const n = a.length;

    let map = new Map();
    let count = 0;
    let currSum = 0;

    map.set(0, 1); // seed map = {0: 1}

    for (let i = 0; i < n; i++) {
        currSum += a[i];
        
        if (map.has(currSum - k)) count += map.get(currSum - k);

        /* store currSum in any case */
        if (map.has(currSum)) map.set(currSum, map.get(currSum) + 1); 
        else map.set(currSum, 1);
    }

    return count;
}

/* Now, Lets try to find the actual subarrays

     0   1  2  3
a = [2, -1, 1, 2], k = 2
p = [2   1  2  4]

Technique: Store the indices of all (sum - k)s

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

    map.set(0, [-1]); // seed for {0: 1}

    for (let i = 0; i < n; i++) {
        currSum += a[i];
        
        if (map.has(currSum - k)) {
            const indexArr: number[] = map.get(currSum - k)!;
            indexArr.forEach((mapIndex) => ans.push([mapIndex + 1, i]));
        }

        if (!map.has(currSum)) map.set(currSum, [i]);
        else map.get(currSum)!.push(i);
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