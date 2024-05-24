/* Input: nums = [2,2,1]     Output: 1
   Input: nums = [4,1,2,1,2] Output: 4

   basically, one number is not repeating, get that number

Logic: 
- just keep doing XOR of all numbers of the array
- reduce() can be used in order to use the power of TS language


TC: O(logn)
SC: O(1) */

function singleNumber(nums: number[]): number {
    return nums.reduce((accumulator, currentValue) => accumulator ^ currentValue, 0)
}