/* Sum Pair closest to target

Given an array arr[] and a number target, find a pair of elements (a, b) in arr[], 
where a ≤ b whose sum is closest to target.

Note: Return the pair in sorted order and if there are multiple such pairs 
      return the pair with maximum absolute difference. If no such pair exists return an empty array.

Input: arr[] = [10, 30, 20, 5], target = 25
Output: [5, 20]
Explanation: As 5 + 20 = 25 is closest to 25.

Input: arr[] = [5, 2, 7, 1, 4], target = 10
Output: [2, 7]
Explanation: As (4, 5), (2, 7) and (4, 7) both are closest to 10, 
             but absolute difference of (4, 5) is 1, (2, 7) is 5 and (4, 7) is 3. 
             Hence, [2, 7] has maximum absolute difference and closest to target. 

Input: arr[] = [10], target = 10
Output: []
Explanation: As the input array has only 1 element, return an empty array.

Way-1: Brute force
- The idea is to Check every possible pair in the array. 
- For each pair, compute its sum and compare its distance from the target with the best pair found so far. 
- If multiple pairs are equally close, keep the one with the maximum absolute difference.

TC: O(n^2)
SC: O(1)

Way-2: Sorting + Two Pointers

- The idea is to first sort the array and use two pointers: left = 0 and right = n - 1. 
- currSum = arr[left] + arr[right]
- If currSum < target, left++
- If currSum > target, right--
- If currSum == target, return the current pair immediately, as no pair can have a smaller difference than 0.

- Since the search starts with the smallest and largest elements, whenever multiple pairs are equally close to the target, 
  the pair with the maximum absolute difference is encountered first during the traversal. 
  Therefore, no explicit tie-breaking is required.

Ex: Input: arr[] = [5, 2, 7, 1, 4], target = 10
    Sort the array and initialize two pointers: left = 0 and right = n - 1. Initially, res = [] and minDiff = ∞.
    [1, 2, 4, 5, 7]
    Compare the pair (1, 7). Its sum is 8, so update res = [1, 7] and increment left since 8 < 10.
    Compare (2, 7). Its sum is 9, which is closer to the target, so update res = [2, 7] and increment left.
    Compare (4, 7) and then (4, 5). Both are equally close to the target. 
    Since the pair with the maximum absolute difference is encountered first during the traversal, 
    the current answer remains unchanged.
    The pointers eventually meet, ending the traversal. The final answer is [2, 7].

*/

function sumClosest(arr, target)
{
    arr.sort((a, b) => a - b);

    const n = arr.length;
    let res = [];
    let minDiff = Number.MAX_SAFE_INTEGER;

    let left = 0, right = n - 1;

    while (left < right) {

        const currSum = arr[left] + arr[right];

        // Check if this pair is closer than the closest pair so far
        if (Math.abs(target - currSum) < minDiff) {
            minDiff = Math.abs(target - currSum);
            res = [ arr[left], arr[right] ];
        }

        if (currSum < target) left++;
        else if (currSum > target) right--;
        else return res;
    }

    return res;
}