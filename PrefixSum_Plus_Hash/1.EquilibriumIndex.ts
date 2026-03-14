/* 724. Find Pivot Index

Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the 
index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there 
are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.


Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11

Input: arr[] = [1, 2, 0, 3]
Output: 2 
Explanation: The sum of left of index 2 is 1 + 2 = 3 and sum on right of index 2 is 3.

Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.

Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0

                                        BRUTE FORCE
                                        -----------

- For each index, get sum before it and after it and check if its equal
  for 0th index: consider leftSum = 0
  for (n-1)th index: consider rightSum = 0

TC: O(n^2)
SC: O(1)
*/

function getSum(a, startIndex, endIndex) {
    let sum = 0;

    for(let i = startIndex; i <= endIndex; i++) sum += a[i];

    return sum;
}

function pivotIndexBrute(a: number[]): number {
    const n = a.length;

    if(n === 1) return 0;

    for(let i = 0; i < n; i++) {
        if(i === 0) {
            let leftSum = 0;
            let rightSum = getSum(a, 1, (n - 1));
            if(leftSum === rightSum) return i;
        }
        else if(i === (n - 1)) {
            let leftSum = getSum(a, 0, (n - 2));;
            let rightSum = 0
            if(leftSum === rightSum) return i;
        }
        else {
            let leftSum = getSum(a, 0, (i - 1));
            let rightSum = getSum(a, (i + 1), (n - 1));
            if(leftSum === rightSum) return i;
        }
    }

    return -1;
};

/* Better Approach:

We need a linear time complexity
We can precompute sums till ith index from left in leftSum[]  and from right in rightSum[]
wherever they are equal, return that index, else return -1
 
            0  1  2   3   4   5
   nums =  [1, 7, 3,  6,  5,  6 ]
leftSum =  [0, 1, 8,  11, 17, 22]
rightSum = [21, 20, 17,  11, 6, 0]
                       |
                     Pivot

*/

function pivotIndex(a: number[]): number {
    const n = a.length;

    if(n === 1) return 0;

    let leftSum = Array(n).fill(0), rightSum = Array(n).fill(0);

    /* Calculate leftSum[] */
    for(let i = 1; i < n; i++) leftSum[i] = (leftSum[i - 1] + a[i - 1]);

    /* Calculate rightSum[] */
    for(let i = (n - 2); i >= 0; i--) rightSum[i] = (rightSum[i + 1] + a[i + 1]);

    for(let i = 0; i < n; i++) if(leftSum[i] === rightSum[i]) return i;

    return -1;
};

/* This is a 3 pass solution, it takes TC: O(3n) 

We can optimise it by avoiding precomputation of leftSum[]

It can be calculated at the run time and stored in a variable

TC: O(2n)
SC: O(1) */

function pivotIndex(a: number[]): number {
    const n = a.length;

    if(n === 1) return 0;

    let leftSum = 0, rightSum = Array(n).fill(0);

    /* Precompute rightSum[] */
    for(let i = (n - 2); i >= 0; i--) rightSum[i] = (rightSum[i + 1] + a[i + 1]);

    for (let i = 0; i < n; i++) {

        /* Calculate leftSum Variable at the runtime */
        leftSum = (leftSum + a[i - 1]);

        if (leftSum === rightSum[i]) return i;
    }

    return -1;
};