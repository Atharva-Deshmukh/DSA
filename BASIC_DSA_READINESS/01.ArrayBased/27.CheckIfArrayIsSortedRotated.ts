/* 1752. Check if Array Is Sorted and Rotated

Given an array nums, return true if the array was originally sorted in non-decreasing order, 
then rotated some number of positions (including zero). Otherwise, return false.

There may be duplicates in the original array.

Note: An array A rotated by k positions results in an array B of the same length such 
      that B[i] == A[(i+k) % n] for every valid index i.

Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array.
You can rotate the array by x = 2 positions to begin on the element of value 3: [3,4,5,1,2].

Input: nums = [2,1,3,4]
Output: false
Explanation: There is no sorted array once rotated that can make nums.

Input: nums = [1,2,3]
Output: true
Explanation: [1,2,3] is the original sorted array.
You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.

Constraints:
    1 <= nums.length <= 100
    1 <= nums[i] <= 100

Idea:
- A sorted array (like 1,2,3,4,5) goes only UP. Nowhere does a number drop to a smaller one.
- When we rotate it, we cut it at some point and move the front part to the back.
    1 2 3 4 5  --rotate-->  3 4 5 1 2
- Now look at 3 4 5 1 2. Going left to right it goes up (3,4,5), then DROPS once (5 -> 1), then goes up again (1,2).
- Also, the array is like a circle: after the last element (2) we come back to the first (3). 2 -> 3 is going up, so no drop there.
- So a sorted + rotated array has AT MOST ONE "drop" when we walk around the circle.
    - 0 drops -> array is already sorted (zero rotation)       e.g. [1,2,3]
    - 1 drop  -> sorted and rotated                            e.g. [3,4,5,1,2]
    - 2+ drops -> NOT possible                                 e.g. [2,1,3,4] -> drops: 2->1 and 4->2 (circle) = 2 drops

How to count drops:
- For every index i, compare nums[i] with the next element nums[(i + 1) % n].
- (i + 1) % n makes the last element compare with the first one (that is our "circle").
- If nums[i] > next, it is a drop, so count++.
- At the end, answer is count <= 1.

Dry run: [3,4,6,1,2,5]
    3 > 4 ? no
    4 > 6 ? no
    6 > 1 ? YES  count = 1
    1 > 2 ? no
    2 > 5 ? no
    5 > 3 ? YES  count = 2   (last -> first)
    count = 2 -> false

Why strict ">" and not ">="? Duplicates like [2,2,2] are fine (equal is not a drop).

Time: O(n) -> one pass.   Space: O(1) -> only a counter.

*/

function check(nums: number[]): boolean {
    const n = nums.length;
    let drops = 0;

    for (let i = 0; i < n; i++) {
        if (nums[i] > nums[(i + 1) % n]) drops++;
        if (drops > 1) return false; // early exit, no need to count further
    }

    return true;
}