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

    // if a1[] not yet exhausted
    while(i1 < l1) {
        merged.push(a1[i1]);
        i1++;
    }

    // if a2[] not yet exhausted
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

SIMULATE the merged array

- mergedLen = l1 + l2
- index2 = floor(mergedLen / 2)       -> position of the 2nd median element (0-based)
- index1 = index2 - 1                 -> position of the 1st median element (only matters when mergedLen is even)
- i1, i2  -> actual pointers into a1[] and a2[]
- mergedIndex -> position we'd be at in the VIRTUAL merged array

                                    EVEN LENGTH EXAMPLE
                                    --------------------
a1 = [1, 2, 3], a2 = [4, 5, 6]  -> mergedLen = 6, index1 = 2, index2 = 3

step   compare            picks   i1  i2  mergedIndex   capture?
1      a1[0]=1 <= a2[0]=4   a1     1   0      0
2      a1[1]=2 <= a2[0]=4   a1     2   0      1
3      a1[2]=3 <= a2[0]=4   a1     3   0      2          mergedIndex==index1 -> ele1 = 3
4      i1 exhausted, take a2[0]=4 ->  -   1      3          mergedIndex==index2 -> ele2 = 4

median = (ele1 + ele2) / 2 = (3 + 4) / 2 = 3.5

                                    ODD LENGTH EXAMPLE
                                    -------------------
a1 = [1, 2, 3, 4], a2 = [4, 5, 6]  -> mergedLen = 7, index1 = 2, index2 = 3   (index1 unused here)

step   compare            picks   i1  i2  mergedIndex   capture?
1      a1[0]=1 <= a2[0]=4   a1     1   0      0
2      a1[1]=2 <= a2[0]=4   a1     2   0      1
3      a1[2]=3 <= a2[0]=4   a1     3   0      2          mergedIndex==index1 -> ele1 = 3 (ignored, length is odd)
4      a1[3]=4 <= a2[0]=4   a1     4   0      3          mergedIndex==index2 -> ele2 = 4

mergedLen is odd -> answer is just ele2 = 4 (ele1 never gets used)

TC: O(l1 + l2) — single merge-style pass, no extra array built
SC: O(1) — only the space consumed by variables

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
                if(mergedIndex === index2) ele2 = a1[i1];  /* If mergedIndex reaches index2 due to a1[i], update ele2 = a1[i] */
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
    
        // if a1 is not exhausted
        while(i1 < l1) {
            if(mergedIndex === index1) ele1 = a1[i1];
            if(mergedIndex === index2) ele2 = a1[i1];
            mergedIndex++;
            i1++;
        }
    
        // if a2 is not exhausted
        while(i2 < l2) {
            if(mergedIndex === index1) ele1 = a2[i2];
            if(mergedIndex === index2) ele2 = a2[i2];
            mergedIndex++;
            i2++;
        }

        if((mergedLen % 2) === 1) return ele2; /* Because index2 is the median for odd length mergedArray */
        else return ((ele1 + ele2) / 2);
}