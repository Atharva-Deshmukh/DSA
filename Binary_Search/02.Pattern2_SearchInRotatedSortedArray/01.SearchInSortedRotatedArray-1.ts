/* Leetcode 33: assume that all the elements are distinct and the array is sorted

Input  : arr[] = {5, 6, 7, 8, 9, 10, 1, 2, 3}, key = 3      Output : Found at index 8
Input  : arr[] = {5, 6, 7, 8, 9, 10, 1, 2, 3}, key = 30     Output : Not found
Input  : arr[] = {30, 40, 50, 10, 20},         key = 10     Output : Found at index 3

Way-1: Iterate in O(n) linearly

Way-2: sorted array, so we can think of BS
- We cannot directly apply BS over full array since the array is rotated
- Identify the sorted half, only after identifying the sorted half
- check if the element is present in this sorted half as we can check the element's 
  presence in the sorted half only by straightly comparing a[low], a[mid], a[high]
- if it is present there --> directly apply BS there
- if it is not present   --> eliminate that half and search in the remaining one
- Note: There is only one pivot element - hence if one part is not sorted, the other one definitely is!

TC: O(log2(n))
SC: O(1)  */

function searchInSortedRotated(arr: number[], key: number): number {
    let n: number = arr.length;
    if(n === 0) return -1;
    if(n === 1 && arr[0] === key) return 0;

    let low: number = 0;
    let high: number = n - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        if(arr[mid] ===  key) return mid;

        // if any one half is not sorted, its guaranteed that the other half is sorted since the array is sorted rotated and pivot 
        // element lies in one of the halves, So, in code, we can check with any one of the half and simply add the other half 
        // in the else condition

        // check if left half is sorted 
        if(arr[low] <= arr[mid]) {  
            if((arr[low] <= key) && (key <= arr[mid])) high = mid - 1; // if element lies here, eliminate the other half
            else low = mid + 1;                                        // if the element is not here, eliminate this half itself
        }
        else {  // automatically, we are checking the right half
            if((arr[mid] <= key) && (key <= arr[high])) low = mid + 1; // if element lies here, eliminate the other half
            else high = mid - 1;                                       // if the element is not here, eliminate this half itself
        }
    }

    return -1;
}