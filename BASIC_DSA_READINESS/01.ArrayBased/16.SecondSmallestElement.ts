/*
Input: arr[] = [12, 25, 8, 55, 10, 33, 17, 11]
Output: [8, 10]

Input: arr[] = [2, 4, 3, 5, 6]
Output: [2, 3]

Input: arr[] = [1, 1, 1]
Output: [-1]

Way-1: Brute Force
- Sort and return second element

TC: O(nlogn)
SC: O(n)

Way-2:  Two Pass Search
- In the first traversal, find the minimum element. 
- In the second traversal, find the minimum element ignoring the one we found in the first traversal. 

TC: O(n) + O(n)
SC: O(1)
*/

function getSecondSmallest_twoPass(arr) {
    let n = arr.length;

    let min1 = Number.MAX_SAFE_INTEGER, min2 = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        if (arr[i] < min1) min1 = arr[i];
    }

    for (let i = 0; i < n; i++) {
        if (arr[i] < min2 && arr[i] !== min1) {
            min2 = arr[i];
        }
    }
    // No distinct second smallest exists
    if (min2 === Number.MAX_SAFE_INTEGER) return [-1];

    return [min1, min2];
}