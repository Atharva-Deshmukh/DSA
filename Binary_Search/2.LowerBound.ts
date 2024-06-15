/* Its the smallest index (say i), for which arr[i] >= key

ex: arr: [0, 1, 2, 3, 3, 5, 8, 8, 10, 10] & target = 9
   index  0  1  2  3  4  5  6  7  8  9   

- Now there are two instances of 10, but we need the smallest index for our lower bound
- instead of simply doing linear search O(n), we can use Binary Search O(logn) over here since array is sorted
- let low = 0, high = 9  and ans = some hypothetical index = arr.length + 1 (say)
  mid = (0 + 9)/2 => 4
  arr[mid] NOT >= 9, so low = mid + 1 => low = 5

- let low = 5, high = 9 
  mid = (5 + 9)/2 => 7
  arr[mid] NOT >= 9, so low = mid + 1 => low = 8 

- let low = 8, high = 9 
  mid = (8 + 9)/2 => 8
  arr[mid] >= 9, so, its our POSSIBLE answer, replace the ans only if index is smaller than ans , ans = 8
                 there is possibility for getting more similar indices ahead, so low = low - 1
                 
- LOOP ENDS when low > high

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