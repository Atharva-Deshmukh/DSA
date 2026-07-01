/* Its the smallest index (say i), for which arr[i] >= key

ex: arr: [0, 1, 2, 3, 3, 5, 8, 8, 10, 10] & target = 9
   index  0  1  2  3  4  5  6  7  8  9   


Thought process:
- Sorted array -> use BS
- whenever elements are smaller than key -> move ahead
- whenever (elements >= key) -> update ans only if current index is smaller and move back
- iterate till low and high cross each other

TC: O(log2(n))
SC: O(1)   */

function lowerBound_BS(arr: number[], key: number): number {
    let n = arr.length;
    if(n === 0) return -1;
    if(n === 1 && arr[0] >= key) return 0; 

    let ans: number = n;
    let low: number = 0;
    let high: number = n-1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        if(arr[mid] >= key) {
            ans = (mid < ans)? mid: ans;      // replace answer only if new ans is smaller than it
            high = mid - 1;                    //explore further possibility of getting smallest index
        }
        else if(arr[mid] < key) low = mid + 1;
    }

    return ans;
}

/* Related Question -> Search Insert Position

You are given a sorted array of distinct integers and a target value, 
return the index if the target is found. If not, return the index where 
it would be if it were inserted in order.


Input: nums = [-1,0,2,4,6,8], target = 5
Output: 4

Input: nums = [-1,0,2,4,6,8], target = 10
Output: 6

Sorted array -> Binary search here.
Looks like We have to essentially find lower bound here.
*/

function searchInsert(a, key) {
        const n = a.length;

        let low = 0;
        let high = (n - 1);
        let ans = Number.MAX_SAFE_INTEGER;

        /* corner cases - when elements can go out of the array itself */

        /* If smallest element of the sorted array is greater than the key*/
        if(a[0] > key) return 0; 

        /* If largest element of the sorted array is less than the key*/
        if(a[n - 1] < key) return n;
        
        while(low <= high) {
            const mid = low + Math.floor((high - low) / 2);
            
            if(a[mid] >= key) {
                ans = (mid < ans)? mid: ans;
                high = mid - 1;
            }
            else low = mid + 1;
        }

        return ans;
    }