/* Array is sorted with duplicates possible

arr[] = {1, 3, 5, 5, 5, 5, 67, 123, 125}, x = 5
First Occurrence = 2   Last Occurrence = 5

Niave way: Iterate in O(n) linearly

Logic:
- Sorted array hai to BS lagao 
- Using lower bound, we can directly get the smallest index
- For getting largest occurrence Index, we need to modify the code in another while loop


TC: O(log2(n)) + O(log2(n)) = O(log2(n))
SC: O(1)  */

function firstAndLastOccurrence(arr: number[], key: number): number[] {
    let firstOcc: number = Number.MAX_SAFE_INTEGER;
    let lastOcc: number = Number.MIN_SAFE_INTEGER;;
    let n: number = arr.length;

    // some corner cases
    if(n === 0) return [];
    if(n === 1 && arr[0] === key) return [0, 0];

    let low: number = 0;        
    let high: number = n-1;

    // first Occurrence using Lower bound
    while(low <= high) {
        let mid: number = low + Math.floor((high - low)/2);
        if(arr[mid] === key) {
            firstOcc = (mid < firstOcc)? mid: firstOcc; // update index only if it is smaller than the one already there
            high = mid - 1;                             // explore possibilities for further smaller indices before this
        }
        else if(arr[mid] > key) high = mid - 1;
        else if(arr[mid] < key) low = mid + 1;
    }

    // last Occurrence
    low = 0;        
    high = n-1;
    while(low <= high) {
        let mid: number = low + Math.floor((high - low)/2);
        if(arr[mid] === key) {
            lastOcc = (mid > lastOcc)? mid: lastOcc; // update index only if it is larger than the one already there
            low = mid + 1;                           // explore possibilities for further smaller indices before after this
        }
        else if(arr[mid] > key) high = mid - 1;
        else if(arr[mid] < key) low = mid + 1;
    }

    // when no match is found
    if(firstOcc === Number.MAX_SAFE_INTEGER && lastOcc === Number.MIN_SAFE_INTEGER) return [-1, -1]
    
    return [firstOcc, lastOcc];
};

console.log(firstAndLastOccurrence([1, 3, 5, 5, 5, 5, 7, 123, 125], 7));