/* Given a 0-indexed integer array nums, find a peak element, and return its index. 

If the array contains multiple peaks, return the index to any of the peaks.
Consider nums[-1] = nums[n] = -∞. 
In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
It means we can consider the first and the last elements as peak if they are greater than the second and the second last
array elements

You must write an algorithm that runs in O(log n) time.

Input: nums = [1,2,3,1]             Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.

Input: nums = [1,2,1,3,5,6,4]       Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 
where the peak element is 6.

LOGIC: 
- O(n) time if we traverse linearly and compare arr[i - 1] and arr[i + 1] everytime
- There can be a O(logn) solution for this, we can think of BS here, WHY?
- First, we are "Searching" for something
- Second, we can notice that some part of the array is sorted either in asc or desc order

- start BS from low = 1 & high = n - 2, since we have already checked for 0th and n-1th indices manually in corner cases
- while Searching phase, check for neighbouring elements of the mid element


CORNER CASES:
- Since we are allowed to consider that the arr[0] & arr[n - 1] are greater than arr[-1] & arr[n] (they are -infinity)
  check for these two elements individually and return, no need to check further, since we are asked for any one peak
 */

// Now, this code works only when there is a single peak in the array, we can modify it to get multiple peaks as well 
function findSinglePeak(arr: number[]) {
    let n: number = arr.length;

    // -infinity, arr[0], - infinity so arr of size 1 has its first element as a peak always. So, return 0
    if(n === 1) return 0;

    // CORNER CASE: first and last element
    if(arr[0] > arr[1]) return 0;
    if(arr[n - 1] > arr[n - 2]) return n - 1;

    // remaining search space is now searched by BS
    let low: number = 1;
    let high: number = n - 2;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // Searching phase: search the neighbouring elements of mid element
        if((arr[mid] > arr[mid - 1]) && (arr[mid] > arr[mid + 1])) return mid;

        // Elimination phase: Eliminate the half where the peak element is not there
        // If we are on the increasing part, eliminate this part since peak will be on right part now   
        else if(arr[mid] > arr[mid - 1]) low = mid + 1;

        // if we are on a decreasing part, then peak will be on left part of this decreasing slope, 
        // eliminate this right part since peak is on the left part
        else if(arr[mid] > arr[mid + 1])  high = mid - 1;
    }

    // we will never reach here, but needed this line since the function demands return of an integer
    return -1;
}

/* The Above went to infinite loop when the mid was in a valley, 
  ex: [1, 5, 1, 2, 1]  low = 5, high = 2 mid = 1, here none of the conditions are getting executed


  Solution:
  - NOTE that we need only 
  - see Binary search algo will eventually reach any one of the search space having peak and on its way,
    it will keep eliminating the other search spaces with peaks (anyway, we are concerned with anyone peak)
  - We will keep all the three cases intact and just add one more else block, which will be executed when a 
    valley condition arrives, in that case we can move anywhere, either left or right half since we need 
    anyone peak

*/
function findMultiplePeaks(arr: number[]) {
    let n: number = arr.length;

    // -infinity, arr[0], - infinity so arr of size 1 has its first element as a peak always. So, return 0
    if(n === 1) return 0;

    // CORNER CASE: first and last element
    if(arr[0] > arr[1]) return 0;
    if(arr[n - 1] > arr[n - 2]) return n - 1;

    // remaining search space is now searched by BS
    let low: number = 1;
    let high: number = n - 2;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // Searching phase: search the neighbouring elements of mid element
        if((arr[mid] > arr[mid - 1]) && (arr[mid] > arr[mid + 1])) return mid;

        // Elimination phase: Eliminate the half where the peak element is not there
        // If we are on the increasing part, eliminate this part since peak will be on right part now   
        else if(arr[mid] > arr[mid - 1]) low = mid + 1;

        // if we are on a decreasing part, then peak will be on left part of this decreasing slope, 
        // eliminate this right part since peak is on the left part
        else if(arr[mid] > arr[mid + 1])  high = mid - 1;

        else low = mid + 1;
    }

    // we will never reach here, but needed this line since the function demands return of an integer
    return -1;
}