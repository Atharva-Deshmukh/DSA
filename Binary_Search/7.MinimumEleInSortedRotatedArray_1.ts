/* Given the sorted rotated array nums of UNIQUE elements, return the minimum element of this array.
You must write an algorithm that runs in O(log n) time.

Logic: 
- O(nlogn) = sort it and return arr[0]
- O(n) = Linear search
- But since the array is sorted in some parts, we can use BS
- In BS, we eliminate one of the halves, so, get a sorted half and extract min ele from it and eliminate it
- repeat the same in the right half 

ex: arr = [4, 5, 6, 7, 0, 1, 2]
           0  1  2  3  4  5  6
           
    let ans = INT_MAX
    l = 0, h = 6, m = 3
    left half is sorted, so ans = 4, ELIMINATE this half
    l = mid + 1

    l = 4, h = 6, m = 5
    here, both halves are sorted, but will take the left half only
    ans = 0, ELIMINATE this half
    l = mid + 1

    l = 6, h = 6, m = 6
    here, only one element remains, so check it with ans, if its smaller than ans, replace ans
    else return ans

TC: O(log2(n))
SC: O(1) */

function minInSortedRotatedArray_1(arr: number[]): number {
    let n: number = arr.length;

    if(n === 0) return -1;
    if(n === 1) return arr[0];

    let ans: number = Number.MAX_SAFE_INTEGER;
    let low: number = 0;
    let high: number = n - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // if left half is sorted, get the minimum and eliminate it, else 
        if(arr[low] <= arr[mid]) {
            ans = (arr[low] < ans)? arr[low]: ans;
            low = mid + 1;                            //eliminate this half
        }
         // if left half is not sorted, it means right half is definitely sorted
        else {
            ans = (arr[mid] < ans)? arr[mid]: ans;
            high = mid - 1;                          //eliminate this half
        }
    }

    return ans;
}