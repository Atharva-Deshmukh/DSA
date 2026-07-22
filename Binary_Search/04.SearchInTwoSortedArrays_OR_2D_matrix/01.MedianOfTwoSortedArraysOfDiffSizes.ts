/* Leetcode 4: 

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

Input: nums1 = [1,3], nums2 = [2]                                       Output: 2.00000
merged array = [1,2,3] and median is 2.

Input: nums1 = [1,2], nums2 = [3,4]                                     Output: 2.50000
merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Input: nums1 = [-5, 3, 6, 12, 15], nums2 = [-12, -10, -6, -3, 4, 10]    Output: The median is 3.

Explanation: The merged array is: ar3[] = [-12, -10, -6, -5 , -3, 3, 4, 6, 10, 12, 15].
So the median of the merged array is 3

                                                Way-1: Brute force with extra space
                                                -----------------------------------

- Merge two arrays first using two pointers approach.
- Based on the odd or even size, calculate the median
    TC: O(l1 + l2)
    SC: O(l1 + l2)

- But note that, we are using extra space to store the whole merged array  */

function bruteForceSpace(a1: number[], a2: number[]): number {
    let l1: number = a1.length;
    let l2: number = a2.length;
    let merged: number[] = [];

    let i1: number = 0;
    let i2: number = 0;

    while((i1 < l1) && (i2 < l2)) {
        if(a1[i1] <= a2[i2]) {
            merged.push(a1[i1]);
            i1++;
        }
        else if(a1[i1] > a2[i2]){
            merged.push(a2[i2]);
            i2++;
        }
    }

    // if a1 is exhausted
    while(i1 < l1) {
        merged.push(a1[i1]);
        i1++;
    }

    // if a2 is exhausted
    while(i2 < l2) {
        merged.push(a2[i2]);
        i2++;
    }

    let len: number = merged.length;
    if(len % 2 === 1) return merged[Math.floor(len/2)];
    else return (merged[Math.floor(len/2)] + merged[Math.floor(len/2) + 1]) / 2;
}

/*                                               Way-2: Brute force with const space
                                                ------------------------------------

Thought process:
- Simulate the merged Sorted Array and medians using variables and two pointers approach
  mergedIndex -> will store the middle element's index
         ele1 ->  mid1
         ele2 ->  mid2

- we can figure out the final median based on whether merged array length = (m + n) is even or odd

DRY RUN - when (m + n) is odd
-----------------------------

keep index1 = 0, index 2 = 0
       ele1 = 0     ele2 = 0
mergedLength = 4 + 3 = 7 = odd, so index1 = 3

let mergedIndex = -1; this is our iterator, initially -1 which simulates mergedArray[] = []

 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
 |             |
ind1          ind2

(m + n)/2= (4 + 3)/2 = 7/2 = 3 = our medianIndex, iterate till here

    a1[index1] <= a2[index2] 
    a1[index1] would be added in mergedArray
    mergedArray would be [1]
    to simulate this, mergedIndex = 0
    ele1 = a1[index1] = 1
    ele2 = a2[index2] = 4


 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
    |          |
   ind1       ind2

    a1[index1] <= a2[index2] 
    a1[index1] would be added in mergedArray
    mergedArray would be [1, 2]
    to simulate this, mergedIndex = 1 
    ele1 = a1[index1] = 1
    ele2 = a2[index2] = 4

 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
       |       |
      ind1    ind2

    a1[index1] <= a2[index2] 
    a1[index1] would be added in mergedArray
    mergedArray would be [1, 2, 3]
    to simulate this, mergedIndex = 2
    ele1 = a1[index1] = 3
    ele2 = a2[index2] = 4

 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
          |    |
         ind1 ind2

    a1[index1] <= a2[index2] 
    a1[index1] would be added in mergedArray
    mergedArray would be [1, 2, 3, 4]
    to simulate this, mergedIndex = 3
    ele1 = a1[index1] = 4
    ele2 = a2[index2] = 4

 this is our required index,
 Now we have been storing ele1 and ele2 side by side, now use them
 medianEle = (ele1 + ele2) / 2 = (4 + 4) / 2 = 4


DRY RUN - when (m + n) is even
------------------------------

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]


mergedLength = 3 + 3 = 6 = even, so there will be two mergeIndices since two medians will be there, index1 = 2 & index2 = 3

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
 |          |
ind1       ind2

    a1[index1] <= a2[index2] 
    a1[index1] would be added in mergedArray
    mergedArray would be [1]
    to simulate this, mergedIndex = 0
    ele1 = a1[index1] = 1
    ele2 = a2[index2] = 4

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
    |       |
   ind1    ind2

    a1[index1] <= a2[index2] 
    a1[index1] would be added in mergedArray
    mergedArray would be [1, 2]
    to simulate this, mergedIndex = 1
    ele1 = a1[index1] = 2
    ele2 = a2[index2] = 4

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
       |    |
      ind1 ind2

    a1[index1] <= a2[index2] 
    a1[index1] would be added in mergedArray
    mergedArray would be [1, 2, 3]
    to simulate this, mergedIndex = 2 --> first mergedIndex
    ele1 = a1[index1] = 3
    ele2 = a2[index2] = 4

    From now on, calculate second mergedIndex only


 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
            |
           ind2

  mergedIndex = 3 (4 merged) this is second required index, so ele2 = 4

  return (ele1 + ele2) / 2

*/

function bruteForceConstSpace(a1: number[], a2: number[]): number {
        let l1: number = a1.length;
        let l2: number = a2.length;
        let mergedLen: number = l1 + l2;

        // median indices  (n/2) and (n/2 - 1)
        let index2: number = Math.floor(mergedLen / 2);  // to handle 0 based indexing
        /*
            [1,2,3,4]     -> 4/2 gives 2 and its proper index of index2
             0 1 2 3

            [1,2,3]     -> 3/2 gives 1 and its proper index of index2
             0 1 2
        */

        let index1: number = index2 - 1;  
        /* Ideally, index1 and index2 should be these */                 

        let ele1: number = 0;
        let ele2: number = 0;

        let i1: number = 0; /* i1 and i2 are the iterators that will iterate till ideal indices */
        let i2: number = 0;
        let mergedIndex: number = 0;  // to track current index of merged[]
    
        while((i1 < l1) && (i2 < l2)) {
            if(a1[i1] <= a2[i2]) {
                if(mergedIndex === index1) ele1 = a1[i1];  /* If mergedIndex reaches index1 due to a1[i], update ele1 = a1[i] */
                if(mergedIndex === index2) ele2 = a1[i1];  /* If mergedIndex reaches index2 due to a2[i], update ele2 = a2[i] */
                mergedIndex++;
                i1++;
            }
            else if(a1[i1] > a2[i2]){
                if(mergedIndex === index1) ele1 = a2[i2];
                if(mergedIndex === index2) ele2 = a2[i2];
                mergedIndex++;
                i2++;
            }
        }
    
        // if a1 is exhausted
        while(i1 < l1) {
            if(mergedIndex === index1) ele1 = a1[i1];
            if(mergedIndex === index2) ele2 = a1[i1];
            mergedIndex++;
            i1++;
        }
    
        // if a2 is exhausted
        while(i2 < l2) {
            if(mergedIndex === index1) ele1 = a2[i2];
            if(mergedIndex === index2) ele2 = a2[i2];
            mergedIndex++;
            i2++;
        }

        if((mergedLen % 2) === 1) return ele2; /* Because index2 is the median for odd length mergedArray */
        else return ((ele1 + ele2) / 2);
}

/*                                                Way-3: Binary Search Approach
                                                  -----------------------------

Since both arrays are sorted, we could think of BS

The entire algorithm boils down to this:
- Take some elements from the first array.
- Take the remaining required elements from the second array.
- check if the picked combination is valid or not
- Look only at the four boundary values (l1, r1, l2, r2).
    If:
        l1 <= r2 and l2 <= r1 → partition found.
        l1 > r2 → took too many from A → move left.
        l2 > r1 → took too few from A → move right.

Lets start with even lengthed merged array to understand, then we will extend to odd length

let a1[] = [1, 3, 4, 7, 10, 12]
let a2[] = [2, 3, 6, 15]

Merged array
    1 2 3 3 4 | 6 7 10 12 15

The median is between 4 and 6

NOTICE THAT the merged array has left and right halves

    Left Half   Right Half
    1 2 3 3 4 | 6 7 10 12 15

Instead of finding the median directly, we ask:
Can I split both arrays so that together they produce this left half?

We will simply take some elements from a1[] in sorted order, remaining from a2[] in sorted
and check if the total left half formed is a valid one

elements picked from a1[]: 0
    right half / a2[] must have 5 elements then, but has 4, so this is not possible

elements picked from a1[]: 1
hence elements picked from a2[]: = (ideal_left_half_length - 1)
                   1 | 3 4 7 10 12
            2 3 6 15 | 
        not a valid combination since 15 > 3

elements picked from a1[]: 2
                 1 3 | 4 7 10 12
               2 3 6 | 15
        not a valid combination since 6 > 4

elements picked from a1[]: 3
                 1 3 4 | 7 10 12
                   2 3 | 6 15
        VALID COMBINATION

elements picked from a1[]: 4
                 1 3 4 7 | 10 12
                       2 | 3 6 15
        not a valid combination since 7 > 3

elements picked from a1[]: 5
                 1 3 4 7 10 | 12
                            | 2 3 6 15
        not a valid combination since 10 > 2

elements picked from a1[]: 6
                 we cannot pick 6 from left since 6 > (merged[].length) / 2


NOTICE THAT:
     elements picked -> 0 1 2 3 4 5 6 
so our possibilities -> X X X Y X X X
                              |
                             ans

        There is only one possibility because there is only one merged[]

elements picked will be in sorted order, we have to eliminate the halves to reach a single target

----------------------------------------------------------------------
So, HOW TO DETERMINE if the selected combination of halves is valid

 1 3 4 7 | 10 12
       2 | 3 6 15
not a valid combination since 7 > 3 

elements picked from a1[]: 3
                 1 3 4 | 7 10 12
                   2 3 | 6 15
        VALID COMBINATION since 4 < 6 && 3 < 7

        let l1 = 4 and r1 = 7
        let l2 = 3 and r2 = 6

        combination is valid when (l1 <= r2) && (l2 <= r1)


-------------------------------
HOW TO DETERMINE median then

                 1 3 4 (left1) | 7 (right1) 10 12
                   2 3 (left2) | 6 (right2) 15

                median = (Max(left1, left2) + Min(right1, right2)) / 2

----------------------------------------------------------------------
HOW TO MOVE LEFT OR RIGHT

LEFT:

 1 3 4 7 | 10 12
       2 | 3 6 15

       l1 = 7 r1 = 10
       l2 = 2 r2 = 3

       (l1 > r2) && (l2 <= r1)
           |
      we have picked more elements from a1[] -> move back -> high = mid - 1

RIGHT:

      1 3 | 4 7 10 12
    2 3 6 | 15

       l1 = 3 r1 = 4
       l2 = 6 r2 = 15

       (l1 <= r2) && (l2 > r1)
                         |
                We have picked up more elements from a2[], means we did't take enough elements from a1[] 
                             -> move right --> low = mid + 1
        
--------------------------------------------
HOW to now deal with odd length of merged[]

a1[] = [2, 4]
a2[] = [1, 3, 4]

merged[] = 1 2 | 3 4 4  
merged[] = 1 2 3 | 4 4   

Our halves don't contain equal elements, so we add one intentionally

hence elementsOnLeft = (n1 + n2 + 1) / 2

After finding the correct partition, the median is simply: max(l1, l2)
because that extra element on the left is the middle element.


                                            NOTE:
                                            -----
                                    
Always do the BS on smaller[]

Suppose a1 = [1,2,3,4,5,6,7,8]     (8 elements)
        a2 = [10,11]               (2 elements)

        elements on left half should be = 5

        But if we pick 7 elements from a1 = [1, 2 .... 7]
        from a2, we would then pick 5 - 7 = -2 = INVALID


We binary search over how many elements to take from one array.

If that array is the larger one, we can end up asking the other array to contribute a negative 
number of elements or more elements than it contains.

Searching on the smaller array prevents these impossible partition counts
*/


function medianUsingBS(a1: number[], a2: number[]): number {
    let n1: number = a1.length;
    let n2: number = a2.length;
    let mergedLength: number = n1 + n2;

    // ensure to always perform BS on the smaller[]
    if(n1 > n2) return medianUsingBS(a2, a1);

    let low: number = 0;      /* at min, we pick up 0 elements */
    let high: number = n1;    /* at max, we pick up n1 elements */

    /* We can take 0 --- n1 elements from a1[] */

    let elementsReqOnLeft: number = Math.floor((n1 + n2 + 1) / 2); /* Accomodates both even and odd merged[].length */

    while(low <= high) {
        let mid1: number = low + Math.floor((high - low) / 2);   /* Elements picked from a1[] */
        let mid2: number = elementsReqOnLeft - mid1;             /* Elements picked from a2[] */

        /*  Lets pick 3 elements from a1[], mid1 = 3, hence mid2 = 2
            
            now l1 = a1[mid1 - 1] r1 = a1[mid]
                l2 = a2[mid2 - 1] r1 = a2[mid]

                 1 3 4 | 7 10 12
                   2 3 | 6 15

            sometimes one of the halves can be empty, so check the bounds also
        */

        let l1: number = Number.MIN_SAFE_INTEGER;
        let l2: number = Number.MIN_SAFE_INTEGER;
        let r1: number = Number.MAX_SAFE_INTEGER;
        let r2: number = Number.MAX_SAFE_INTEGER;

        /* We assigned max possible boundary values here, why?

           Suppose mid = 0, mid - 1 >= 0 won't let l1 be assigned, l1 will be undefined then
           if((l1 <= r2)) will be wrong here, hence we keep minimum boundary value
        */

        if((mid1 - 1) >= 0) l1 = a1[mid1 - 1];
        if((mid2 - 1) >= 0) l2 = a2[mid2 - 1];
        if(mid1 < n1) r1 = a1[mid1]; 
        if(mid2 < n2) r2 = a2[mid2]; 


        // return condition
        if((l1 <= r2) && (l2 <= r1)) {
            if((mergedLength % 2) === 1) return Math.max(l1, l2);    // for odd merged[] length
            else return (Math.max(l1, l2) + Math.min(r1, r2)) / 2; // we need floating answer, hence no floor
        }

        else if(l2 > r1) low = mid1 + 1;
        else if(l1 > r2) high = mid1 - 1;
    }

    return 0;
}