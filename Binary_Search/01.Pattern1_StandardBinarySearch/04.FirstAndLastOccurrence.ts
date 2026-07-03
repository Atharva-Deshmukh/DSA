/* Leetcode 34: Array is sorted with duplicates possible

Input: nums = [1, 3, 5, 5, 5, 5, 67, 123, 125], target = 5
Output: [2, 5]

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Input: nums = [], target = 0
Output: [-1,-1]

Way-1: Iterate in O(n) linearly

Way-2:
- Sorted array --> BS
- Its simply two times binary search logic


TC: O(log2(n)) + O(log2(n)) = O(log2(n))
SC: O(1)  */

function firstAndLastOccurrence(a: number[], key: number): number[] {
    const n: number = a.length;

    if(n === 0) return [-1, -1];
    
    let firstOcc: number = Number.MAX_SAFE_INTEGER;
    let lastOcc: number = Number.MIN_SAFE_INTEGER;

    let low: number = 0;
    let high: number = (n - 1);

    /* First occurrence - Simple BS + If element found, explore previous lower possibilites */
    while(low <= high) {
        const mid: number = low + Math.floor((high - low) / 2);

        if(a[mid] === key) {
            firstOcc = (mid < firstOcc)? mid: firstOcc;
            high = mid - 1;
        }
        else if(a[mid] < key) low = mid + 1;
        else if(a[mid] > key) high = mid - 1;
    }

    /* Last occurrence - Simple BS + If element found, explore next higher possibilites*/
    low = 0, high = (n - 1);

    while(low <= high) {
        const mid: number = low + Math.floor((high - low) / 2);

        if(a[mid] === key) {
            lastOcc = (mid > lastOcc)? mid: lastOcc;
            low = mid + 1;
        }
        else if(a[mid] < key) low = mid + 1;
        else if(a[mid] > key) high = mid - 1;
    }

    return [(firstOcc === Number.MAX_SAFE_INTEGER)? -1: firstOcc, (lastOcc === Number.MIN_SAFE_INTEGER)? -1: lastOcc];
};

console.log(firstAndLastOccurrence([1, 3, 5, 5, 5, 5, 7, 123, 125], 7));