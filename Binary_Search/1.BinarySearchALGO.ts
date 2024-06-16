/* Used in a sorted search space ONLY.

TARGET OF BS:
- Search for the target element (done while comparing the mid with the target)
- Eliminate half of the search space (done while we decide to check left or right half)

- since the array is sorted, we divide the search space in half each time and check if the middle element is the 
  key we are looking for
- if arr[mid] === key return arr[mid] and stop
- if arr[mid] > key search from arr[0...mid-1]
- if arr[mid] < key search from arr[mid+1....n-1]

- So, at each search, we are caclulating middle index in order to compare 
  mid = (low + high)/2


if arr.length = 32
I will be keep dividing by 2 till I get the key

32/2 = 16
16/2 = 8
8/2 = 4          6 Iterations and 2^5 = 32 so approx log2(n) is the TC
4/2 = 2
2/2 = 1

TC: O(log2(n))
SC: O(1) in Iterative
    O(n) in Recursive

---------------------------------------------------------------
CORNER CASES
---------------------------------------------------------------
if the array space is between [0 ..... INT_MAX] and when the key = last element, we will have to compare 
a[mid] === key and mid === INT_MAX since only arr[INT_MAX] search space is left,
so here, low = INT_MAX && high = INT_MAX

but mid = (INT_MAX + INT_MAX) / 2  ==> OVERFLOW

-----------------
WAYS TO RESOLVE:
-----------------
Way 1: use BigInt() to store low, high and mid
Way 2: instead of using mid = (low + high)/2, use 
                        mid = low + (high-low)/2
*/

function binarySearchRecursive(arr: number[], key: number): number {
  let n: number = arr.length;
  if(n === 1 && key === arr[0]) return 0;
  if(n === 0) return -1;

  function searchRecursion(low: number, high: number): number {
    
    // Base case
    if(low > high) return -1;

    let mid: number = low + Math.floor((high - low)/2);

    if(arr[mid] ===  key) return mid;
    else if(arr[mid] > key) return searchRecursion(0, mid - 1);
    else  return searchRecursion(mid + 1, high);
  }

  return searchRecursion(0, n-1);
}

function binarySearchIterative(arr: number[], key: number): number {
  let n: number = arr.length;
  if(n === 1 && key === arr[0]) return 0;
  if(n === 0) return -1;

  let low: number = 0; 
  let high: number = n-1;

  while(low <= high) {
    let mid: number = low + Math.floor((high - low)/2);

    if(arr[mid] ===  key) return mid;
    else if(key < arr[mid]) high = mid - 1;
    else low = mid + 1;
  }

  return -1;
} 