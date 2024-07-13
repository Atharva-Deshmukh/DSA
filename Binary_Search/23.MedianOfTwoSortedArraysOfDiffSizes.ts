/* Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
The overall run time complexity should be O(log (m+n)).

Input: nums1 = [1,3], nums2 = [2]                                       Output: 2.00000
merged array = [1,2,3] and median is 2.

Input: nums1 = [1,2], nums2 = [3,4]                                     Output: 2.50000
merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Input: nums1 = [-5, 3, 6, 12, 15], nums2 = [-12, -10, -6, -3, 4, 10]    Output: The median is 3.

Explanation: The merged array is: ar3[] = [-12, -10, -6, -5 , -3, 3, 4, 6, 10, 12, 15].
So the median of the merged array is 3

Logic: Brute force:
- Merge two arrays first and then based on the odd or even size, calculate the median

TC: O(l1 + l2)
SC: O(l1 + l2)

- But note that, we are using extra space to store the whole merged array and then calculate the 
  median after getting the merged array

- We can get the length of merged array before hand by adding the two array's length and based on this length
  we only need middle one or two elements, hardly two extra variables and hence a const space O(1)

TC: O(l1 + l2)
SC: O(1)  */

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

/* DRY RUN
keep index1 = 0, index 2 = 0
       ele1 = 0     ele2 = 0
mergedLength = 4 + 3 = 7 = odd, so index1 = 3

let mergedIndex = -1; this is our iterator, initially -1 since we need to merge the first element as well which is 0th index

 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
 |             |

 mergedIndex = 0 (1 merged)

 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
    |          |

 mergedIndex = 1 (2 merged)

 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
       |       |

 mergedIndex = 2 (3 merged)

 0  1  2  3    0  1  2
[1, 2, 3, 4]  [4, 5, 6]
          |    |

 mergedIndex = 3 (4 merged)

 this is our required index, so ele1 = 4, return this element and stop since mergedLength = odd

 -----------------------------------------
 What if mergedLength = even

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]


mergedLength = 3 + 3 = 6 = even, so index1 = 2 & index2 = 3

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
 |          |

  mergedIndex = 0 (1 merged)

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
    |       |

  mergedIndex = 1 (2 merged)

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
       |    |

  mergedIndex = 2 (3 merged) this is first required index, so ele1 = 3

 0  1  2    0  1  2
[1, 2, 3]  [4, 5, 6]
            |

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

        let ele1: number = 0;
        let ele2: number = 0;

        let i1: number = 0;
        let i2: number = 0;
        let mergedIndex: number = 0;  // to track current index of merged[]
    
        // whenever there is a merge, mergedIndex++
        while((i1 < l1) && (i2 < l2)) {
            if(a1[i1] <= a2[i2]) {
                if(mergedIndex === index1) ele1 = a1[i1];
                if(mergedIndex === index2) ele2 = a1[i1];
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

        if((mergedLen % 2) === 1) return ele2;
        else return ((ele1 + ele2) / 2);
}

/* We can Optimise this using BS

Lets understand BS approach for even merged[] length first, later we will extend it for odd one
let a1[] = [1, 3, 4, 7, 10, 12]
let a1[] = [2, 3, 6, 15]

merged[] looks like = 1 2 3 3 4 | 6 7 10 12 15
in left half there are 3 elements from a1[] and 2 elements from a2[]
in right half there are 2 elements from a1[] and 3 elements from a2[]

If we can somehow build first half, then we can calculate median easily

Our Binary Search is based on this symmetry. We will iterate on no. of elements we pick from the first array and then 
check if we can form a valid left and right half

elements picked from a1[]: 0
    right half must have 5 elements then, but has 4, so this is not possible

elements picked from a1[]: 1
                 1   | 3 4 7 10 12
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

     elements picked -> 0 1 2 3 4 5 6 
so our possibilities -> X X X Y X X X    --> there is only one possibility

-------------------------------------------------
HOW TO DETERMINE if the combination of halves is valid

 1 3 4 7 | 10 12
       2 | 3 6 15
not a valid combination since 7 > 3 

elements picked from a1[]: 3
                 1 3 4 | 7 10 12
                   2 3 | 6 15
        VALID COMBINATION since 4 < 6 && 3 < 7


----------------------------
HOW TO DETERMINE median

                 1 3 4 (left1) | 7 (right1) 10 12
                   2 3 (left2) | 6 (right2) 15

                median = (Max(left1, left2) + Min(right1, right2)) / 2

---------------------------
HOW TO apply BS now on this

considering the iteration on the number of elements we will take from ar1[], 
if we check for 0, 1, 2, 3, 4...., We will be doing this linearly,

if we apply BS, we cannot apply BS directly on pattern -> X X X Y X X X  where only one possibility is there

So, trick to elimination of halves using BS:

consider 3 examples with X Y X


               1 3 4 7 (l1) | (r1) 10 12
                     2 (l2) | (r2) 3 6 15             --> Took 4 from ar1[]

                 1 3 4 (l1) | (r1) 7 10 12            --> Took 3 from ar1[]
                   2 3 (l2) | (r2) 6 15

                   1 3 (l1) | (r1) 4 7 10 12          --> Took 2 from ar1[]
                 2 3 6 (l2) | (r2) 15


    when l2 > r1 --> low = mid + 1
    when l1 > r2 --> high = mid - 1

    when l1 < r2 && l2 < r1 --> return mid


    ALSO, Do BS on shorter array rather than longer one to reduce TC

    Lets dry run:

    a1[] = [7, 12, 14, 15]
    a2[] = [1, 2, 3, 4, 9, 11]                     merged[] size = 10, so we need 5 elements on left half

    we will iterate on a1(the smaller array)

    range = [0 elements picked ----- all elements picked]
            0                 4
           low              high

    mid1 = 2 (denotes 2 elements picked from a1[])
    mid2 = 3 (5 - 2 picked from a2[] then)

      0   1   2   3                0  1  2  3  4   5
     [7, 12, 14, 15]              [1, 2, 3, 4, 9, 11] 
             |                              |
            mid1                          mid2

                    7 12 (l1) | (r1) 14 15
                   1 2 3 (l2) | (r2) 4 9 10 

                   see, l1 = mid1 - 1
                        l2 = mid2 - 1
                        r1 = mid1
                        r2 = mid2

    here l1 > r2 --> high = mid - 1

    low = 0, high = 1  -> mid1 = 0

      0   1   2   3                0  1  2  3  4   5
     [7, 12, 14, 15]              [1, 2, 3, 4, 9, 11] 
      |                                            |
    mid1                                          mid2

            when no value, take INT_MIN for comparision (l1) | (r1) 7 12 14 15
                                              1 2 3 4 9 (l2) | (r2) 11 
                                              
            now l2 > r1 -> low = mid + 1

            low = 1 high = 1 mid1 = 1  mid2 = 4

      0   1   2   3                0  1  2  3  4   5
     [7, 12, 14, 15]              [1, 2, 3, 4, 9, 11] 
         |                                     |
        mid1                                  mid2


                    7 (l1) | (r1) 12 14 15
              1 2 3 4 (l2) | (r2) 9 11 

              l1 < r2 && l2 < r1  ==> valid combination -> median = (7 + 9)/2 => 9

--------------------------------------------
HOW to now deal with odd length of merged[]

a1[] = [2, 4]
a2[] = [1, 3, 4]

merged[] = 1 2 | 3 4 4  
merged[] = 1 2 3 | 4 4   we can have either of these two symmetries but go by this one preferrably

because this is actually generalised
if n1 = 5, n2 = 5 we need 5 on left --> (5 + 5 + 1) / 2  --> 5
if n1 = 4, n2 = 5 we need 5 on left --> (5 + 4 + 1) / 2  --> 5

(n1 + n2 + 1) / 2   --> we will go by first symmetry, so we will try to make 3 elements on the left half


                    2 (l1) | (r1) 4
                  1 3 (l2) | (r2) 4

                  here mid = max(l1, l2)

*/


function medianUsingBS(a1: number[], a2: number[]): number {
    let n1: number = a1.length;
    let n2: number = a2.length;
    let mergedLength: number = n1 + n2;

    // ensure to always perform BS on the smaller[]
    if(n1 > n2) return medianUsingBS(a2, a1);

    let low: number = 0;
    let high: number = n1;
    let elementsReqOnLeft: number = Math.floor((n1 + n2 + 1) / 2);

    while(low <= high) {
        let mid1: number = low + Math.floor((high - low) / 2);
        let mid2: number = elementsReqOnLeft - mid1;

        let l1: number = Number.MIN_SAFE_INTEGER;
        let l2: number = Number.MIN_SAFE_INTEGER;
        let r1: number = Number.MAX_SAFE_INTEGER;
        let r2: number = Number.MAX_SAFE_INTEGER;

        // ensure we pick up the left elements from valid indices
        if(mid1 < n1) r1 = a1[mid1]; 
        if(mid2 < n2) r2 = a2[mid2]; 

        // ensure to pick up right elements from valid indices
        if((mid1 - 1) >= 0) l1 = a1[mid1 - 1];
        if((mid2 - 1) >= 0) l2 = a2[mid2 - 1];

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