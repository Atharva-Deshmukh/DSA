/* Given the sorted rotated array nums that may contain duplicates, return the minimum element of this array.
You must decrease the overall operation steps as much as possible.

Input: nums = [1,3,5]           Output: 1

Input: nums = [2,2,2,0,1]       Output: 0

Logic:
- Almost same as part 1's logic except the modification required for the condition where low === mid === high
- here we need to compare with mid as ususal and reduce the search space
- DONT FORGET TO CONTINUE, we MUST begin a new iteration after the search space is reduced

TC: O(log2(n))
SC: O(1) */

function minInSortedRotatedArray_2(arr: number[]): number {
    let n: number = arr.length;

    if(n === 0) return -1;
    if(n === 1) return arr[0];

    let ans: number = Number.MAX_SAFE_INTEGER;
    let low: number = 0;
    let high: number = n - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        if((arr[low] === arr[mid]) && (arr[mid] === arr[high])) {
            ans = (arr[low] < ans)? arr[low]: ans;
            low = low + 1;
            high = high - 1;
            continue;  // begin a new iteration after the search space is reduced
        }

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