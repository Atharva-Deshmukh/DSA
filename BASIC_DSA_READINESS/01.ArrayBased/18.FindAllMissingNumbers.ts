/* 448. Find All Numbers Disappeared in an Array

Given an array nums of n integers where nums[i] is in the range [1, n], 
return an array of all the integers in the range [1, n] that do not appear in nums.

Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Input: nums = [1,1]
Output: [2]
 

Constraints:
    n == nums.length
    1 <= n <= 10^5
    1 <= nums[i] <= n
 

Follow up: Could you do it without extra space and in O(n) runtime? 
           You may assume the returned list does not count as extra space.

Way-1: Brute force
- for each [1, n], loop the array and if its missing, push it in answer

TC: O(n ^ 2)
SC: O(1)

Way-2: Set
- Since this array has duplicates, its not possible to simply sort and iterate
- put full array in a set
- Increase counter from 1 to n and check if anything is missing in the set

TC: O(n)
SC: O(n)

    function findDisappearedNumbers(a: number[]): number[] {
        const n = a.length;
        let set = new Set(a);
        let ans = []

        for(let counter = 1; counter <= n; counter++) {
            if(!set.has(counter)) ans.push(counter);
        }

        return ans;
    };

Way-3: Index marking Approach  [EXPECTED]
Idea: value v "visits" index v-1 and turns it negative. Indices left positive were never visited.
(Read with Math.abs, since the value may already be negated. Skip if already negative.)

Dry run: 

i = 0:
            0  1  2   3  4  5  6  7
    nums = [4, 3, 2,  7, 8, 2, 3, 1]
    a[0] = 4
    mark a[4 - 1] = a[3] = -7 (make that value negative OR multiply by -1 simply)

i = 1:
            0  1  2   3  4  5  6  7
    nums = [4, 3, 2, -7, 8, 2, 3, 1]
    a[1] = 3
    mark a[3 - 1] = a[2] = -2

i = 2:
            0  1   2   3  4  5  6  7
    nums = [4, 3, -2, -7, 8, 2, 3, 1]
    a[2] = -2 --> abs = 2
    mark a[2 - 1] = a[1] = -3

i = 3:
            0   1   2   3  4  5  6  7
    nums = [4, -3, -2, -7, 8, 2, 3, 1]
    a[3] = -7 --> abs = 7
    mark a[7 - 1] = a[6] = -3

i = 4:
            0   1   2   3  4  5   6  7
    nums = [4, -3, -2, -7, 8, 2, -3, 1]
    a[4] = 8
    mark a[8 - 1] = a[7] = -1

i = 5:
            0   1   2   3  4  5   6   7
    nums = [4, -3, -2, -7, 8, 2, -3, -1]
    a[5] = 2
    a[2 - 1] = a[1] is already negative --> skip, don't flip back

i = 6:
    a[6] = -3 --> abs = 3
    a[3 - 1] = a[2] is already negative --> skip

i = 7:
            0   1   2   3  4  5   6   7
    nums = [4, -3, -2, -7, 8, 2, -3, -1]
    a[7] = -1 --> abs = 1
    mark a[1 - 1] = a[0] = -4

Final:
            0   1   2   3  4  5   6   7
    nums = [-4, -3, -2, -7, 8, 2, -3, -1]
    positive values still remain at index 4, 5 --> missing = [5, 6]

TC: O(n)
SC: O(1)
*/

function findDisappearedNumbers(nums: number[]): number[] {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        const val = nums[i];
        const idx = Math.abs(val) - 1;
        if (nums[idx] > 0) nums[idx] = -nums[idx];
    }

    const ans: number[] = [];
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) ans.push(i + 1);
    }

    return ans;
};