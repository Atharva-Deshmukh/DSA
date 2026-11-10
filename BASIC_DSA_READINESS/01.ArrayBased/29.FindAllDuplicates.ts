/* 442. Find All Duplicates in an Array

Given an integer array nums of length n where all the integers of nums are in the range [1, n] 
and each integer appears at most twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, 
excluding the space needed to store the output

Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Input: nums = [1,1,2]
Output: [1]

Input: nums = [1]
Output: []
 
Constraints:
    n == nums.length
    1 <= n <= 10^5
    1 <= nums[i] <= n
    Each element in nums appears once or twice.

Way-1: Hash
- First iteration - store frequencies in map
- Second iteration - print those elements with freq > 1

TC: O(n)
SC: O(n)

Way-2: Negative marking approach
- All numbers are between 1 and n, and the array has n slots (index 0 to n-1).
  So every number v has its own "home slot" -> index v-1.
      number 1 -> index 0,  number 2 -> index 1,  ...,  number n -> index n-1
- When we see a number v:
      go to its home slot  idx = v - 1
      - if arr[idx] is positive -> first time we see v. Mark it: arr[idx] = -arr[idx]
      - if arr[idx] is negative -> home is already marked, so we have seen v before -> v is a DUPLICATE.

Important: 
- A number we read may already be negative (because some earlier number marked it), 
  so always use Math.abs() to get its real value.
- Marking only flips the sign, the real value is still there (abs), so we don't lose any information.
- Since every number appears at most twice, each duplicate is reported exactly once 
  (first time: mark, second time: report, no third time).

Dry run: nums = [4, 3, 2, 7, 8, 2, 3, 1]    (n = 8)

    i=0: v=4, home idx=3, arr[3]=7 (positive)   -> mark   [4, 3, 2,-7, 8, 2, 3, 1]
    i=1: v=3, home idx=2, arr[2]=2 (positive)   -> mark   [4, 3,-2,-7, 8, 2, 3, 1]
    i=2: arr[2] is -2 now, real value v=2, home idx=1, arr[1]=3 (positive) -> mark   [4,-3,-2,-7, 8, 2, 3, 1]
    i=3: v=7, home idx=6, arr[6]=3 (positive)   -> mark   [4,-3,-2,-7, 8, 2,-3, 1]
    i=4: v=8, home idx=7, arr[7]=1 (positive)   -> mark   [4,-3,-2,-7, 8, 2,-3,-1]
    i=5: v=2, home idx=1, arr[1]=-3 (NEGATIVE)  -> 2 is a DUPLICATE  (answer = [2])
    i=6: arr[6] is -3, real value v=3, home idx=2, arr[2]=-2 (NEGATIVE) -> 3 is a DUPLICATE  (answer = [2, 3])
    i=7: arr[7] is -1, real value v=1, home idx=0, arr[0]=4 (positive)  -> mark   [-4,-3,-2,-7, 8, 2,-3,-1]

    Answer = [2, 3]

    Look at final array: index 0,1,2,3,6,7 are negative -> numbers 1,2,3,4,7,8 are present.
    Index 4 and 5 are positive -> numbers 5 and 6 are missing (bonus: same trick finds missing numbers!).

TC: O(n) -> one pass
SC: O(1) -> no extra space (output array not counted)

Note: This changes the input array. If you need the original back, 
      do one more loop at the end: arr[i] = Math.abs(arr[i])

*/

function findDuplicates(nums: number[]): number[] {
    const ans: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        const v = Math.abs(nums[i]); // real value (may have been made negative earlier)
        const idx = v - 1;           // home slot of v

        if (nums[idx] < 0) ans.push(v); // already visited -> duplicate
        else nums[idx] = -nums[idx];    // first visit -> mark
    }

    return ans;
}