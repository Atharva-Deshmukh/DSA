/* assume that all the elements are NON-distinct and the array is sorted
   return true if key is in arr[] else return false, since if duplicate === key, if will be a problem to return index

Input: nums = [2,5,6,0,0,1,2], target = 0       Output: true
Input: nums = [2,5,6,0,0,1,2], target = 3       Output: false

in part-1, we were finding which array part is sorted by comparing, mid, low and high values 
they were all distince there, but this won't work in case the array has duplicates in it

ex: arr = [3, 1, 2, 3, 3, 3, 3], here, low === mid === high, so, we cannot determine which part to eliminate
So, we can't use part 1 's logic here

Niave way: Iterate in O(n) linearly

Logic:
- if(low === mid === high) is the ONLY condition stopping us from using part 1's logic over here,

       0  1  2  3  4  5  6
arr = [3, 1, 2, 3, 3, 3, 3]            low = 0, mid = 3, high = 6

WHENEVER if((low === mid === high) && arr[low] !== key), simply reduce the search space by low = low + 1 and high = high - 1
Bcoz, all 3 are equal and anyway, we first compare mid with key in part-1's logic
So, if arr[mid] !== key, its guranteed that arr[low] && arr[high] are not equal since all 3 are equal, so reduce this search space

TC: O(log2(n))
SC: O(1)  */

function searchInSortedRotated(arr: number[], key: number): boolean {
    let n: number = arr.length;
    if(n === 0) return false;
    if(n === 1 && arr[0] === key) return true;

    let low: number = 0;
    let high: number = n - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // reduce the search space
        if((arr[mid] !==  key) && ((arr[mid] === arr[low]) && (arr[mid] === arr[high]))) {
            low = low + 1;
            high = high - 1;
            continue;   //start a new iteration now, with a reduced search space
        }

        if(arr[mid] ===  key) return true

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

    return false;
}