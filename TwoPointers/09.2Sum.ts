/* 167. Two Sum II - Input Array Is Sorted

Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, 
find two numbers such that they add up to a specific target number. 
Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers index1 and index2, each incremented 
by one, as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. 
You may not use the same element twice.

Your solution must use only constant extra space.

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
 

Constraints:
    2 <= numbers.length <= 3 * 10^4
    -1000 <= numbers[i] <= 1000
    numbers is sorted in non-decreasing order.
    -1000 <= target <= 1000
    The tests are generated such that there is exactly one solution.


Approach: 
- Since the array is sorted, we can use 2 pointers
  left = 0 = smallest element
  right = (n - 1) = largest element

- if(sum === k) ans.push(i + 1, j + 1); break;
- if(sum < k) left++
- if(sum > k) right--

*/

function twoSum(a: number[], k: number): number[] {
    let l = 0, r = a.length - 1;

    while(l < r) {
        const sum = a[l] + a[r];
        if(sum === k) return [l + 1, r + 1];
        else if(sum < k) l++;
        else r--
    }
}

/* GFG Submission - when finding pair is not guaranteed, return [-1, -1] */
class Solution {
    twoSum(a, k) {
        let ans = [-1, -1], l = 0, r = a.length - 1;

        while(l < r) {
            const sum = a[l] + a[r];
            if(sum === k) {
                ans[0] = l + 1;
                ans[1] = r + 1;
                break;
            } 
            else if(sum < k) l++;
            else r--
        }
        
        return ans;
    }
}