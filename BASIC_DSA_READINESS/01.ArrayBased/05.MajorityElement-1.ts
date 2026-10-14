/* 169. Majority Element

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. 
You may assume that the majority element always exists in the array.

Input: nums = [3,2,3]
Output: 3

Input: nums = [2,2,1,1,1,2,2]
Output: 2
 

Constraints:
    n == nums.length
    1 <= n <= 5 * 10^4
    -10^9 <= nums[i] <= 10^9

The input is generated such that a majority element will exist in the array.
 

Follow-up: Could you solve the problem in linear time and in O(1) space?

WAY-1:
- Use hash map, update the map and as soon as map reaches majority element condition, return that key

TC: O(n)
SC: O(n)

WAY-2:
- Sort the array and run an iterator that counts current element, check condition

TC: O(nlogn)
SC: O(1)

WAY-3: Boye-Moore Voting algorithm

ALGO:
- Initialize a candidate = -1 and count = 0
- Traverse the array once:
    -> If count === 0,  
        candidate = current element
        count = 1
    -> If the current element === candidate --> count++.
    -> If the current element !== candidate --> count--.
- Traverse the array again to count the occurrences of the candidate.
- If the candidate's count is > (n / 2), return the candidate as the majority element.


*/

function majorityElement1(a: number[]): number {
    const n = a.length;

    let count = 0, candidate = -1;

    for(let i = 0; i < n; i++) {
        if(count === 0) {
            candidate = a[i];
            count = 1;
        }
        else if(a[i] === candidate) count++
        else count--;
    }

    /* Lets validate the candidate now. Reusing same count variable */
    count = 0;
    for(let ele of a) if(ele === candidate) count++;

    if(count > (n / 2)) return candidate;
    else return -1;
}