/* Algo: Divide & Merge


                                        [5, 4, 3, 2, 1]
                                        /             \
                                   [5, 4, 3]         [2, 1]    --------- KEEP DIVIDING
                                   /       \          /  \
                                [5, 4]     [3]       [2] [1]
                                 /  \       |          \ /     --------- NOW, MERGE in a sorted order
                                [5] [4]     |         [1, 2]
                                  \ /       |           |
                                 [4, 5]     |           |
                                     \      |           |
                                     [3, 4, 5]          |
                                             \          |
                                              \         |
                                               \        |
                                                \       |
                                                 \      |
                                              [1, 2, 3, 4, 5]


                                            mergeSort(a, 0, 4)
                                             /              \
                            mergeSort(a, 0, 2)              mergeSort(a, 3, 4)
                                /        \                            /      \
                mergeSort(a, 0, 1)   mergeSort(a, 2, 2)   mergeSort(a, 3, 3) mergeSort(a, 4, 4)
                   /        \
   mergeSort(a, 0, 0)   mergeSort(a, 1, 1)



TC: O(nlogn)

When we keep dividing a number n into half, we get 1 exaclty after log2(n) iterations, hence height of recursion tree
is log2(n).
                            16 = 32 / 2
                            08 = 16 / 2
                            04 = 08 / 2
                            02 = 04 / 2
                            01 = 02 / 2

                                                    16              ---- 1
                                                /       \
                                               8         8          ---- 2
                                              / \       / \
                                             4   4     4   4        ---- 3  exactly log2(16) levels
                                            / \ / \   / \ / \
                                            2 2 2 2   2 2 2 2       ---- 4
                                           /\ /\ /\
                                           11 11 11                 ---- 5

            log2(n) iterations and for all log2(n) iterations, we are merging two sorted arrays of worst case O(n)
            hence O(n * log2(n))


SC: O(log2(n)) depth and at each level, we create O(n), so SC = O(nlog(2)n) 
   
    Since each recursive call creates its own set of subarrays using slice(), 
    and there are O(log n) levels of recursion, the total extra space can accumulate to O(n log n).

*/

function merge(a1: number[], a2: number[]): number[] {
    let n1: number = a1.length;
    let n2: number = a2.length;
    let ans: number[] = [];

    let i: number = 0;
    let j: number = 0;
    while((i < n1) && (j < n2)) {
        if(a1[i] <= a2[j]) {
            ans.push(a1[i]);
            i++;
        }
        else if(a1[i] > a2[j]) {
            ans.push(a2[j]);
            j++;
        }
    }

    while(i < n1) {
        ans.push(a1[i]);
        i++;
    }

    while(j < n2) {
        ans.push(a2[j]);
        j++;
    }

    return ans;
}

function mergeSort(a: number[]): number[] {

    if(a.length <= 1) return a;

    let mid: number = Math.floor(a.length/2);
    let leftSubArr: number[] = mergeSort(a.slice(0, mid));
    let rightSubArr: number[] = mergeSort(a.slice(mid));  
    return merge(leftSubArr, rightSubArr);  
}

/* Other apporach: We can save extra space while slice() by using indices, low and high,
                   and modifing the merge() itself to create two separate arrays at the time of merging,
                   after the merge() is over, the spaces are garbage collected and cleared
                   so max space can go to O(n/2) left + O(n/2) right so total of O(n)

  TC: O(nlogn)
  SC: O(n) */

  // create new arrays left and right based on indices itself and using these two, modify the original array
  function mergeOpt(a: number[], low: number, mid: number, high: number): void {
    let n1: number = (mid - low) + 1;  // [0 --- mid]
    let n2: number = (high - mid);     // [(mid + 1) --- high]

    /* Once a merge call completes, its temporary arrays can be discarded or garbage collected, 
    meaning that the temporary space is not cumulative across different levels of recursion. */

    // create and fill these subarrays
    let a1: number[] = a.slice(low, mid + 1);       // low --- mid
    let a2: number[] = a.slice(mid + 1, high + 1);  // mid --- high

    let i: number = 0;
    let j: number = 0;
    let k: number = low; // iterates original array

    while((i < n1) && (j < n2)) {
        if(a1[i] <= a2[j]) {
            a[k] = a1[i];
            i++;
        }
        else if(a1[i] > a2[j]) {
            a[k] = a2[j];
            j++;
        }
        k++;
    }

    while(i < n1) {
        a[k] = a1[i];
        i++;
        k++;
    }

    while(j < n2) {
        a[k] = a2[j];
        j++;
        k++;
    }

   }

  function mergeSortOpt(a: number[], low: number, high: number): void {

    // base case
    if(low >= high) return;

    let mid: number = low + Math.floor((high - low) / 2);
    mergeSortOpt(a, low, mid);
    mergeSortOpt(a, mid + 1, high);

    mergeOpt(a, low, mid, high);
  }

  

