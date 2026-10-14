/* Input: Array1 = [2, 3, 6, 7, 9], Array2 = [1, 4, 8, 10], k=5
Output: 6
The final sorted array is [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element is 6.

Input: Array1 = [100, 112, 256, 349, 770], Array2 = [72, 86, 113, 119, 265, 445, 892], k=7
Output: 256
The final sorted array is [72, 86, 100, 112, 113, 119, 256, 265, 349, 445, 770, 892]. The 7th element is 256.

LOGIC:
- Literally merge two sorted arrays and store that in a third array and then get kth element from it
  TC: O(l1 + l2)
  SC: O(l1 + l2)

- As seen in question of median two sorted arrays, instead of actually storing merged[], use some counter to keep
  track of kth element in the merged array 
  TC: O(l1 + l2)
  SC: O(l)

*/

function kthEleTwoPointersApproachConstSpace(a1: number[], a2: number[], k: number): number{
    let n1: number = a1.length;
    let n2: number = a2.length;

    // corner cases
    if((n1 === 0) && (k < n2)) return a2[k-1];
    if((n2 === 0) && (k < n1)) return a1[k-1];
    if(k > (n1 + n2)) return -1;

    let i1: number = 0;
    let i2: number = 0;
    let mergedLength: number = 0; //tracks the len of merged array

    while((i1 < n1) && (i2 < n2)) {
        if(a1[i1] <= a2[i2]) {
            mergedLength++;
            if(mergedLength === k) return a1[i1];
            i1++;
        }
        else if(a1[i1] > a2[i2]) {
            mergedLength++;
            if(mergedLength === k) return a2[i2];
            i2++;
        }
    }

    while(i1 < n1) {
        mergedLength++;
        if(mergedLength === k) return a1[i1];
        i1++;
    }

    while(i2 < n2) {
        mergedLength++;
        if(mergedLength === k) return a2[i2];
        i2++;
    }

    // we will not reach here
    return -1;
}

/* BS APPROCACH


- This time, our partitions will be
    left      right
     k       (n - k)


In median of two sorted arrays problem, we iterated from [0 --- n1] elements to determine the correct half

But in this problem, we know that the left half already has k elements, only unknown is how many of these
k elements will be from a1[]

                                    In median problem:

    Left size = 5, we iterated in the following way

    0 from a1 + 5 from a2
    1 from a1 + 4 from a2
    2 from a1 + 3 from a2
    3 from a1 + 2 from a2

                                    In kth element problem:
        
    Left size = k, we will iterate

    0 from a1 + k from a2
    1 from a1 + (k-1) from a2
    2 from a1 + (k-2) from a2

    We are searching for the correct cut in a1[]


Need of Binary search is to check if we created the correct partitioning of elements,

Because if picked too few from a1 -->  l2 > r1 --> move right
        if picked too many from a1 --> l1 > r --> move left


In median of two sorted arrays problem, every partition combination was worth trying
since we ensured a1.length always <= a2.length, negative values were never picked

In this problem now, 

let 
a1 = 6 elements
a2 = 5 elements         and k = 7

mid1 = elements from a1
mid2 = 7 - mid1

if mid1 = elements picked from a1 = 0, means mid2 = elements picked from a2 = 7
but a2 only has 5 elements

                                    MODIFICATION IN RANGES:
                                    -----------------------

Lets derive low and high:

we can pick total k elements from both the arrays

mid1 + mid2 = k
       mid2 = k - mid1  

no of elements picked from a2 = mid2 = always lies between 0 and a2.length
0 <= mid2 <= n2

0 <= k - mid1 <= n2

Here, we can split this into two inequalities

Equality-1:
    0 <= k - mid1
    mid1 <= k

    mid1 has to satisfy two conditions at a time
    mid1 ≤ n1
    mid1 ≤ k

    hence largest value possible for mid1 = min(n1, k)

    our high = largest of mid1 = min(n1, k)


Equality-2:
    k - mid1 <= n2
    k - n2  <= mid1

    this means, we MUST take atleast (k - n2) elements from a1[]

    Also, mid1 >= 0

    hence low = max(0, (k - n2))


                                NOTICE SOMETHING:
                                ----------------

a1[] = [2, 3, 6, 7, 9]  a2[] = [1, 4, 8, 10] k = 4
mergedLen = 9 (ODD)

                    2 3 (l1) | (r1) 6 7 9
                    1 4 (l2) | (r2) 8 10

a1[] = [2, 3, 6, 7]  a2[] = [1, 4, 8, 10] k = 4
mergedLen = 8 (EVEN)

                    2 3 (l1) | (r1) 6 7 
                    1 4 (l2) | (r2) 8 10

            In both the cases, the kth element = max(l1,l2)


TC: O(log(min(n1, n2))) because we at max try to take all elements from the smaller array
SC: O(1), We are using constant space. */

function kthEle_BS(a1: number[], a2: number[], k: number): number{
    let n1: number = a1.length;
    let n2: number = a2.length;

    // corner cases
    if((n1 === 0) && (k < n2)) return a2[k-1];
    if((n2 === 0) && (k < n1)) return a1[k-1];
    if(k > (n1 + n2)) return -1;

    // ensure to always perform BS on the smaller[]
    if(n1 > n2) return kthEle_BS(a2, a1, k);

    let low: number = Math.max(0, (k - n2));
    let high: number = Math.min(k, n1);
    let elementsReqOnLeft: number = k;

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
        if((l1 <= r2) && (l2 <= r1)) return Math.max(l1, l2);

        else if(l2 > r1) low = mid1 + 1;
        else if(l1 > r2) high = mid1 - 1;
    }

    return 0;
}