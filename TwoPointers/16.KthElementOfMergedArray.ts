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

function kthEleConstSpaceUsingTwoPointers(a1: number[], a2: number[], k: number): number{
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