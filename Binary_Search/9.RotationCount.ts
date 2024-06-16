/* Given an array arr[] of size N having distinct numbers sorted in increasing order 
and the array has been right rotated (i.e, the last element will be cyclically shifted 
to the starting position of the array) k number of times, the task is to find the 
value of k.

Input: arr[] = {15, 18, 2, 3, 6, 12}        Output: 2
Explanation: Initial array must be {2, 3, 6, 12, 15, 18}. 
We get the given array after rotating the initial array twice.

Input: arr[] = {7, 9, 11, 12, 5}            Output: 4

FOR RIGHT ROTATED ARRAY
- let Pivot = smallest element in the array 
- no. of rotations (k) = pivotEle_index

 0  1  2  3  4
[1, 2, 3, 4, 5] k = 0 OR k = 5
[5, 1, 2, 3, 4] k = 1
[4, 5, 1, 2, 3] k = 2
[3, 4, 5, 1, 2] k = 3


FOR LEFT ROTATED ARRAY
- let Pivot = smallest element in the array 
- no. of rotations (k) = arr.len - pivotEle_index

 0  1  2  3  4
[1, 2, 3, 4, 5] k = 0 OR k = 5
[2, 3, 4, 5, 1] k = 1
[3, 4, 5, 1, 2] k = 2
[4, 5, 1, 2, 3] k = 3

LOGIC
- Building up further on the above pattern, we just need to keep the track of index of the min array element
- return that index directly since the array is right-rotated

TC: O(log2(n))
SC: O(1)  */

function countRotation_RightRotated(arr: number[]): number {
    let n: number = arr.length;
    if(n === 0 || n === 1) return 0;
    let minIndex: number = -1;
    let minNum: number = Number.MAX_SAFE_INTEGER;

    // get the index of min. element and return it
    let low: number = 0;
    let high: number = n - 1;
    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // if left half is sorted
        if(arr[low] <= arr[mid]) {
            let minBefore: number = minNum;
            minNum = (arr[low] < minNum)? arr[low]: minNum; // get the min element and its index
            if(minBefore !== minNum) minIndex = low;        // change index only if minNum is updated
            low = mid + 1;                                  // eliminate this half 
        }
        // if the left half is not sorted, its guaranteed that the right half is sorted since the array is 
        // sorted rotated, and the pivot element is somewhere in any one of the halves
        else {
            let minBefore: number = minNum;
            minNum = (arr[mid] < minNum)? arr[mid]: minNum; // get the min element and its index
            if(minBefore !== minNum) minIndex = mid;        // change index only if minNum is updated
            high = mid - 1;                                 // eliminate this half 
        }
    }

    return minIndex;
}