/* 217. Contains Duplicate

Given an integer array nums, return true if any value appears at 
least twice in the array, and return false if every element is distinct.

Input: nums = [1,2,3,1]
Output: true
Explanation: The element 1 occurs at the indices 0 and 3.

Input: nums = [1,2,3,4]
Output: false
Explanation: All elements are distinct.


Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

Constraints:
    1 <= nums.length <= 10^5
    -10^9 <= nums[i] <= 10^9


Approach: 
- Simply iterate and keep putting the elements in a set, 
  If the element repeats, return true, else return false when iteration ends

*/

function containsDuplicate(nums: number[]): boolean {
    const set = new Set<number>();

    for (const num of nums) {
        if (set.has(num)) return true; // stop immediately when the duplicate is found
        set.add(num);
    }

    return false;
};