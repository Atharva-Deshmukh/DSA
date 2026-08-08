/* Leetcode 1095

(This problem is an interactive problem.)

arr is a mountain array if and only if:
- arr.length >= 3
- There exists some i with 0 < i < arr.length - 1 such that:
    arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
    arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Given a mountain array mountainArr, return the minimum index such that mountainArr.get(index) == target. 
If such an index does not exist, return -1.

You cannot access the mountain array directly. You may only access the array using a MountainArray interface:
    MountainArray.get(k) returns the element of the array at index k (0-indexed).
    MountainArray.length() returns the length of the array.
    Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer. 
    Also, any solutions that attempt to circumvent the judge will result in disqualification.


Input: mountainArr = [1,2,3,4,5,3,1], target = 3
Output: 2 (index of target)

Input: mountainArr = [0,1,2,4,2,1], target = 3
Output: -1
 
Constraints:

    3 <= mountainArr.length() <= 10^4
    0 <= target <= 109
    0 <= mountainArr.get(index) <= 10^9


                                            Way-1: BRUTE FORCE:
                                            -------------------
- Simple linear search

                                            Way-2: Binary Search:
                                            ---------------------

- Its guaranteed that there will be one peak since its a mountain array
- Hence get the index of peak element using BS
- Then we know that elements before peak are sorted in ascending order and after peak are in descending order.
- Apply binary search accordingly before and after the index

Find peak: O(log n)
Search left: O(log n)
Search right: O(log n)

*/

/* Just Figure out this function to solve this problem */
function binarySearch(
    arr: number[],
    low: number,
    high: number,
    target: number,
    isAscending: boolean
): number {

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (arr[mid] === target)
            return mid;

        if (isAscending === true) {
            if (arr[mid] < target)
                low = mid + 1;
            else
                high = mid - 1;
        } else {
            if (arr[mid] < target)
                high = mid - 1;
            else
                low = mid + 1;
        }
    }

    return -1;
}