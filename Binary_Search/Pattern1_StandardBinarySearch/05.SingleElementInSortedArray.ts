/* Leetcode 540
   You are given a sorted array consisting of only integers where every element appears exactly 
   twice, except for one element which appears exactly once. Return the single element 
   that appears only once. Your solution must run in O(log n) time and O(1) space.

Input: nums = [1,1,2,3,3,4,4,8,8]           Output: 2
Input: nums = [3,3,7,7,10,11,11]            Output: 10

                                                    Way-1: Bit manipulation XOR Concept 
                                                    -----------------------------------

- Either iterate linearly or use Array.reduce((ele, acc) => acc ^ arr[i], 0)
  TC = O(n)

                                                      Way-2: Sorted --> BS possibility
                                                      --------------------------------

- whenever a[mid] === target, we have a[mid-1] < a[mid] < a[mid + 1]

  corner cases here:   for ele = a[0] --> mid - 1 is not there
                       for ele = a[n-1] --> mid + 1 is not there
                       there will be many if cases, hence we reduce the search space to [index 1 ... index (n - 2)] 
                                                                             instead of [index 0 ... index (n - 1)

for a.length === 0 --> return -1;
for a.length === 1 --> return a[0]; as this is the unique element
for a.length === 2 --> if(a[0] !== a[1]) return any of them, say a[0];
for a.length === 3 --> if(a[0] === a[1])
                            return a[2]
                       if(a[1] === a[2])
                            return a[0]

- But on what basis we can eliminate the left and right search space?
  Let us see if we can get some pattern in the index

  0  1  2  3  4  5  6  7  8  9  10
 [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]
                    |
                  unique
 

if((mid === odd) && (a[mid] === a[mid-1]) --> we are on the left half
    low = mid + 1;

if((mid === even) && (a[mid] !== a[mid-1]) --> we are on the left half
    low = mid + 1;

if((mid === odd) && (a[mid] !== a[mid-1]) --> we are on the right half
    high = mid - 1

if((mid === even) && (a[mid] === a[mid-1]) --> we are on the right half
    high = mid - 1

Combining these conditions into one

if(mid === odd) {
  if(a[mid] === a[mid - 1]) low = mid + 1;
  else high = mid - 1;
}
else {
  if(a[mid] === a[mid - 1]) high = mid - 1;
  else low = mid + 1;
}

*/

function singleEleInSortedArray(a: number[]): number {
    let n: number = a.length;
    
    /* Corner cases */
    if(n === 0) return -1;
    if(n === 1) return a[0];
    if((n === 2) && (a[0] !== a[1])) return a[0];
    if(n === 3) {
        if(a[0] === a[1]) return a[2];
        if(a[1] === a[2]) return a[0];
    }
    if(n > 3) {
        if(a[0] !== a[1]) return a[0];             /* Unique element is at the beginning */
        if(a[n - 2] !== a[n - 1]) return a[n - 1]; /* Unique element is at the end */
    }
    
    /* New limits */
    let low: number = 1;
    let high: number = (n - 2);
    
    while(low <= high) {
        
        const mid: number = low + Math.floor((high - low) / 2);
        
        if((a[mid - 1] < a[mid]) && (a[mid] < a[mid + 1])) return a[mid];
        
        if(mid % 2 === 1) {
            if(a[mid] === a[mid - 1]) low = mid + 1;
            else high = mid - 1;
        }
        else if(mid % 2 === 0) {
            if(a[mid] === a[mid - 1]) high = mid - 1;
            else low = mid + 1;
        }
    }
}