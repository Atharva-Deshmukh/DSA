/* Leetcode 162 and Leetcode 852
Given a 0-indexed integer array nums, find a peak element, and return its index. 

If the array contains multiple peaks, return the index to any of the peaks.
Consider nums[-1] = nums[n] = -∞. 
In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
It means we can consider the first and the last elements as peak if they are greater than the second and the second last
array elements

Input: nums = [1,2,3,1]             Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.

Input: nums = [1,2,1,3,5,6,4]       Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 
where the peak element is 6.

                                                            Way-1: Brute Force

- Simply return the index of the largest element

    for(let i = 0; i < a.length; i++) {
        if(a[i] > max) {
            max = a[i];
            maxIndex = i;
        }
    }

                                                        Way-2: Binary search - Why?
                                                        
- First, we are "Searching" for something
- Second, we can notice that some part of the array is sorted either in asc or desc order

- Search part:
    when a[mid] is peak ==> a[mid - 1] < a[mid] > a[mid + 1]

    Again there are corner cases like when i = 0, mid - 1 don't exist
                                           i = n - 1, mid + 1 don't exist

    Instead of many if conditions, just reduce the search space to [1 .... (n - 2)]

    when first element itself is the peak, a[0] > a[1] -> return 0
    when last element itself is the peak, a[n - 2] < a[n - 1] -> return n - 1

- Eliminate part:
    if(a[mid - 1] < a[mid] < a[mid + 1]) --> we are on left slope of the peak --> low = mid + 1
    if(a[mid - 1] > a[mid] > a[mid + 1]) --> we are on right slope of the peak --> high = mid - 1


CORNER CASES:
- Since we are allowed to consider that the arr[0] & arr[n - 1] are greater than arr[-1] & arr[n] (they are -infinity)
  check for these two elements individually and return, no need to check further, since we are asked for any one peak */

// Now, this code works only when there is a single peak in the array, we can modify it to get multiple peaks as well 
function findSingleOrMultiplePeaks(a: number[]) {
    let n: number = a.length;
    
    if(n === 1) return 0;
    if(n === 2) return (a[0] > a[1]) ? 0: 1;
    if(n > 2) {
        if(a[0] > a[1]) return 0;           /* First element is the peak */
        if(a[n-2] < a[n-1]) return n-1;     /* Last element is the peak */
    } 
    
    /* Updated search space */
    let low: number = 1;
    let high: number = (n - 2);
    
    while(low <= high) {
        const mid: number = low + Math.floor((high - low) / 2);
        
        if((a[mid - 1] < a[mid]) && (a[mid] > a[mid + 1])) return mid;
        
        else if((a[mid - 1] < a[mid]) && (a[mid] < a[mid + 1])) low = mid + 1;
        else if((a[mid - 1] > a[mid]) && (a[mid] > a[mid + 1])) high = mid - 1;

        /* In case of multiple peaks, we will have one valley at least
           Valley case, when a[mid - 1] > a[mid] < a[mid + 1] -> Move anywhere left or right
        */
        else low = mid + 1;
    }
}
