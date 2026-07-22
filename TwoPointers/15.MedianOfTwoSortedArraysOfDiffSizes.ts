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

/*                                               Way-2: const space using 2 pointers
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

function twoPointersApproach(a1: number[], a2: number[]): number {
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