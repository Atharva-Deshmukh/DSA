/* Its the smallest index (say i), for which arr[i] > key, just like the lower bound but there is NO EQUALITY

ex: arr: [0, 1, 2, 3, 3, 5, 8, 8 10, 10] & target = 9
   index  0  1  2  3  4  5  6  7  8  9  
   ans => 8

TC: O(log2(n))
SC: O(1)
*/

function upperBound_BS(arr: number[], key: number): number {
    let n = arr.length;
    if(n === 0) return -1;
    if(n === 1 && arr[0] > key) return 0; 

    let low: number = 0;
    let high: number = n-1;
    let ans: number = n;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        if( key < arr[mid]) {
            ans = (mid < ans)? mid: ans;      // replace answer only if new ans is smaller than it
            high = mid - 1;                    //explore further possibility of getting smallest index
        }
        else if(key >= arr[mid]) low = mid + 1;
    }

    return ans;
}