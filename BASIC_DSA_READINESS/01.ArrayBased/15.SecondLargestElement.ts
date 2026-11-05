/* 
Input: arr[] = [12, 35, 1, 10, 34, 1]
Output: 34

Input: arr[] = [10, 5, 10]
Output: 5

Input: arr[] = [10, 10, 10]
Output: -1

Way-1: Brute Force
- Sort and return last second element

TC: O(nlogn)
SC: O(n)

Way-2:  Two Pass Search
- In the first traversal, find the maximum element. 
- In the second traversal, find the maximum element ignoring the one we found in the first traversal. 

TC: O(n) + O(n)
SC: O(1)
*/

function getSecondLargest_twoPass(arr) {
    let n = arr.length;

    let max1 = -1, max2 = -1;

    for (let i = 0; i < n; i++) {
        if (arr[i] > max1) max1 = arr[i];
    }

    for (let i = 0; i < n; i++) {
        if (arr[i] > max2 && arr[i] < max1) {
            max2 = arr[i];
        }
    }
    return max2;
}

/* Way-3: Single Pass [Expected Approach]

- If arr[i] > largest, update secondLargest with largest and largest with arr[i].
- Else If arr[i] < largest and arr[i] > secondLargest, update secondLargest with arr[i].

TC: O(n)
SC: O(1)
*/

function getSecondLargest_OnePass(arr) {
    const n = arr.length;

    let max1 = -1, max2 = -1;

    for (let i = 0; i < n; i++) {

        if (arr[i] > max1) {
            max2 = max1;
            max1 = arr[i];
        }
        else if (arr[i] < max1 && arr[i] > max2) {
            max2 = arr[i];
        }
    }
    return max2;
}


