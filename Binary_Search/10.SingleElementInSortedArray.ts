/* You are given a sorted array consisting of only integers where every element appears exactly twice, except 
   for one element which appears exactly once. Return the single element that appears only once. 
   Your solution must run in O(log n) time and O(1) space.

Input: nums = [1,1,2,3,3,4,4,8,8]           Output: 2
Input: nums = [3,3,7,7,10,11,11]            Output: 10

Logic: 
- Either iterate linearly or use Math.reduce((ele) acc ^ arr[i]), TC = O(n)
- Sorted hai to BS kaa soch sakte hai
- Note that the element which is unique, uske aage piche dono elements different hai. For the other elements that occur
  twice, unke atleast ek element equal hai aage piche walo se
  We can check this condition during searching (when we compare mid with the target)

  One more thing here, since abhi mid ke aage and piche ke element ko compare karna hai, there will be corner cases
  if ele = a[0] --> mid - 1 is not there
  if ele = a[n-1] --> mid + 1 is not there

  So, instead of writing if statements for these corner cases, we try to eliminate these corner cases itself!
  How? By initialising (low = 1 and high = n - 2) instead of regular (low = 0 and high = n - 1)

- Other thing is we can note the index of the elements on the left and right of the unique element

  0  1  2  3  4  5  6  7  8  9  10
 [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]            low = 1 && high = 9

 ele = 1: indexes: (0, 1) = (even, odd)
 ele = 2: indexes: (2, 3) = (even, odd)    --> for elements on the left of the unique elements
 ele = 3: indexes: (4, 5) = (even, odd)

 ele = 4: index = 6

 ele = 5: indexes: (7, 8) = (odd, even)    --> for elements on the rith of the unique elements
 ele = 6: indexes: (9, 10)= (odd, even)

 Lets dry run now,
 low = 1  high = 9 mid = 5, an odd index, 
 check the index before it, it is even and equal to mid element
 it means, we are on the left half every element on the left half is twice, since even, odd sequence is 
 maintained till now gurantees that the unique element is not on this half

 low = 6  high = 9 mid = 7, an odd index,
 check element before it, 4 !== 5, it means left half is not OK, It means, unique index must be present there
 eliminate the right half, 

 low = 6  high = 6 mid = 7, an even index and the condition of the unique element (left !== mid !== right) applies
 this is the answer

 Basically, observe this (even, odd) & (odd, even)
 if mid === odd and piche wala element === current element, we are on the left half
 if mid === even and piche wala element ==== curr element, we are on the right half

 CORNER CASE:
 if the array is of size <=3, then this code doesn't works since we keep low at 1 and high at n - 1,
 here arr = [1, 1, 2]
             0  1  2

             low = 1 and high = n - 2 = 3 - 2 = 1, while loop finishes and it returns -1;
             here, Note that if any of the two elements is repeating, the middle element is one of them only
             so if arr[0] !== arr[1], return arr[0]
             else if arr[n - 2] !== arr[n - 1] return arr[n - 1]

*/

function singleEleInSortedArray(arr: number[]): number {
    let n: number = arr.length;
    if(n === 0) return -1;
    if(n === 1) return arr[0]; //in an array of size 1, that single element is the ans

    // for 1 <= size <= 3
    if(arr[0] !== arr[1]) return arr[0];
    if((n >= 2) && (arr[n - 2] !== arr[n - 1])) return arr[n - 1];

    let low: number = 1;
    let high: number = n - 2;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // Search part of BS: condition for being a unique element
        if((arr[mid] !== arr[mid - 1]) && (arr[mid] !== arr[mid + 1])) return arr[mid];

        // Elimination part of BS: eliminate one of the useless halves
        /* if mid is odd and mid - 1 === mid, means everything is OK and WE ARE on the left part, eliminate left part
                             mid - 1 !== mid, NOT OK on left part, eliminate right part since, we are on left part 
                             and the unique element MUST be on the left part */
       if((mid % 2) === 1) {
        if(arr[mid] === arr[mid - 1]) low = mid + 1;
        else high = mid - 1;
       }

       /* if mid is even and mid - 1 === mid, means everything is OK and WE ARE on the right part, eliminate right part
                             mid - 1 !== mid, NOT OK on right part, eliminate left part since, we are on right part 
                             and the unique element MUST be on the left part */
       else {
        if(arr[mid] === arr[mid - 1]) high = mid - 1;
        else low = mid + 1;
       }

    }

    return -1;
}