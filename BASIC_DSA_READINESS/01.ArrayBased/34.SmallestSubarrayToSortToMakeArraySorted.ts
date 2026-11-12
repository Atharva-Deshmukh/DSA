/* Given an unsorted array arr[]. 
   Find the subarray arr[s...e] such that sorting this subarray makes the whole array sorted.

Note: If the given array is already sorted then return [0, 0].

Input: arr[] = [10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60]
Output: [3, 8]
Explanation: Sorting subarray starting from index 3 and ending at index 8 results in sorted array. 
             Initial array: [10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60], 
             Final array:   [10, 12, 20, 25, 30, 31, 32, 35, 40, 50, 60]

Input: arr[] = [0, 1, 15, 25, 6, 7, 30, 40, 50]
Output: [2, 5]
Explanation: Sorting subarray starting from index 2 and ending at index 5 results in sorted array. 
             Initial array: [0, 1, 15, 25, 6, 7, 30, 40, 50], 
               Final array: [0, 1, 6, 7, 15, 25, 30, 40, 50]

Input: arr[] = [30, 20, 10]
Output: [0, 2]
Explanation: We need to sort the whole array to make it sorted

Way-1: Brute force
- Sort the array and compare sorted array and original array index by index
- ans = indices that are mismatched

TC: O(nlogn)
SC: O(n) + O(n) --> for sorting + for storing sorted array to compare

Way-2 (FINAL, EFFICIENT): Running max / min  --> TC: O(n), SC: O(1)

   Same logic as the stack, but we only need ONE number instead of a whole stack.

   Pass 1 (left -> right): keep the running MAX.
     - If arr[i] < max, arr[i] is smaller than something before it -> it's out of place.
     - The LAST such i is the right end (e).

   Pass 2 (right -> left): keep the running MIN.
     - If arr[i] > min, arr[i] is bigger than something after it -> it's out of place.
     - The LAST such i (smallest index) is the left end (s).

   Example: [10, 12, 20, 30, 25, 40, 32, 31, 35, 50, 60]

     Pass 1 (max so far): 10 12 20 30 30 40 40 40 40 50 60
       arr[i] < max at i = 4(25), 6(32), 7(31), 8(35)  -> e = 8

     Pass 2 (min so far from right): 10 12 20 25 25 31 31 31 35 50 60
       arr[i] > min at i = 3(30), 5(40), 6(32)         -> s = 3

     Answer = [3, 8]

   Example: [30, 20, 10]
     Pass 1: max = 30, 20<30 (i=1), 10<30 (i=2) -> e = 2
     Pass 2: min = 10, 20>10 (i=1), 30>10 (i=0) -> s = 0
     Answer = [0, 2]

   Example: [1, 2, 3] -> no element is out of place -> e stays -1 -> return [0, 0]
*/

function smallestSubarrayOptimal(arr: number[]): [number, number] {
    const n = arr.length;
    let start = -1, end = -1;

    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        if (arr[i] < max) end = i;
        else max = arr[i];
    }

    let min = Number.MAX_SAFE_INTEGER;
    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] > min) start = i;
        else min = arr[i];
    }

    return end === -1 ? [0, 0] : [start, end]; /* if end is never updated, then array was alread in increasing order */
}