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