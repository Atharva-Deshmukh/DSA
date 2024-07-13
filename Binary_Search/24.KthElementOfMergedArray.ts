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

function kthEleConstSpace(a1: number[], a2: number[], k: number): number{
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

- We can implement the BS approach just as we did in the question to find median of two sorted arrays using BS
- There, we were trying to formulate left half and right half, here our left and right halves will be of 
  k elements           and          (n - k) elements

DRY run:

a1[] = [2, 3, 6, 7, 9]  a2[] = [1, 4, 8, 10] k = 4
mergedLen = 9 (ODD)

                    2 3 (l1) | (r1) 6 7 9
                    1 4 (l2) | (r2) 8 10

a1[] = [2, 3, 6, 7]  a2[] = [1, 4, 8, 10] k = 4
mergedLen = 8 (EVEN)

                    2 3 (l1) | (r1) 6 7 
                    1 4 (l2) | (r2) 8 10

            In both the cases, the kth element = max(l1,l2)

MODIFICATION IN RANGES:

we cannot pick 0 from a1 when k > n2 because when k exceeds n2, we need some minimum contribution from n1 also
low = max(0, (k - n2));
let k = 7, a1 contain 6 elements
           a2 contain 5 elements

           now we need    7 | 4       combination

           even if we pick all 5 from a2, we still need 2 elements from a1 to make 7 on left

high cannot be simply n1 since left has total size of k and we need only that much elements from a1 that make upto k
high = min(n1, k) 
 if a1[] = [1,2,3,4,5]  k = 3
 we need only 3 elements not all the n1 elements



TC: O(log(l1) + log(l2))
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