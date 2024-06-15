/* Given the sorted rotated array nums of UNIQUE elements, return the minimum element of this array.
You must write an algorithm that runs in O(log n) time.

Logic: 
- O(nlogn) = sort it and return arr[0]
- O(n) = Linear search
- But since the array is sorted in some parts, we can use BS


TC: O(log2(n))
SC: O(1)
*/