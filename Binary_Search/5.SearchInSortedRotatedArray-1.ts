/* assume that all the elements are distinct and the array is sorted

Input  : arr[] = {5, 6, 7, 8, 9, 10, 1, 2, 3}, key = 3      Output : Found at index 8
Input  : arr[] = {5, 6, 7, 8, 9, 10, 1, 2, 3}, key = 30     Output : Not found
Input  : arr[] = {30, 40, 50, 10, 20},         key = 10     Output : Found at index 3

Niave way: Iterate in O(n) linearly

Logic:
- Sorted array hai to BS ke baare me soch sakte
- But here, array is rotated too, we cannot directly apply BS over full array
- we will need to identify the sorted half of the array and check there. Lets dry run this way

           0  1  2  3  4  5  6  7  8
let arr = [7, 8, 9, 1, 2, 3, 4, 5, 6]    key = 1

low = 0     high = 8    mid = 4(ele = 2)
check which part of array is sorted by comparing low, mid and high
arr[low] > arr[mid]  && arr[mid] < arr[high], so right half is sorted

now check if the key lies in the sorted half or not
if(arr[mid] <= key <= arr[high]) === false
So, right half is eliminated, to eliminate right half, high = mid - 1

           0  1  2  3
new arr = [7, 8, 9, 1]
now, search in the left half with new high and low
again check if left half is sorted
low = 0     high = 3    mid = 1(ele = 8)
arr[low] < arr[mid] && arr[mid] > arr[high]
In this new array, the left half is sorted and right is not sorted

check if key lies in the left sorted part, 
if(arr[mid] <= key <= arr[high]) === false, eliminating this sorted part, low = mid + 1

           2  3
new arr = [9, 1]
low = 2     high = 3    mid = 2(ele = 9)
left part is sorted, hence checking left part,
NOT found in left part, hence eliminating to left half, low = mid + 1 

           3
new arr = [1]
low = 3     high = 3    mid = 3(ele = 1)
element FOUND, return its index, return mid

ALGO THAT CAN BE THINKED OF
- identify the sorted half, only after identifying the sorted half, we can eliminate one of the halves
- check if the element is present in this sorted half bcoz we can only check the element's presence in sorted half only 
  by comparing low, mid and high values
- if it is present there then, we can directly apply BS there
- if it is not present, eliminate that half and search in the remaining one

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

        // if any one half is not sorted, its guaranteed that the other half is sorted since the array is sorted rotated and pivot element lies in 
        // one of the halves, So, in code, we can check with any one of the half and simply add the other half in the else condition

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