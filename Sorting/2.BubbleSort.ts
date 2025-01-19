/* Algo: 
Push the largest element to the last by adjacent swapping
 
             0   1   2   3   4   5
let arr[] = 13, 46, 24, 52, 20, 09

Iteration 1: (ind 0 -- ind 5)
(13, 46) => 13 < 46, No change
(46, 24) => 24 < 46, swap, arr[] = 13, 24, 46, 52, 20, 09
(46, 52) => 46 < 52, No change
(52, 20) => 20 < 52, swap, arr[] = 13, 24, 46, 20, 52, 09
(52, 09) => 09 < 52, swap, arr[] = 13, 24, 46, 20, 09, 52  --> the largest element will be at last index

        0   1   2   3   4   5
arr[] = 13, 24, 46, 20, 09, 52

Iteration 2: (ind 0 -- ind 4)
(13, 24) => 13 < 24, No change
(24, 46) => 24 < 46, No change
(46, 20) => 20 < 46, swap, arr[] = 13, 24, 20, 46, 09, 52
(46, 09) => 09 < 46, swap, arr[] = 13, 24, 20, 09, 46, 52
                                                       --> the 2nd largest element will be at 2nd last index
        0   1   2   3   4   5
arr[] = 13, 24, 20, 09, 46, 52

Iteration 3: (ind 0 -- ind 3)
(13, 24) => 13 < 24, No change
(24, 20) => 20 < 24, swap, arr[] = 13, 20, 24, 09, 46, 52
(24, 09) => 09 < 24, swap, arr[] = 13, 20, 09, 24, 46, 52
                                                      --> the 3rd largest element will be at 3rd last index

        0   1   2   3   4   5
arr[] = 13, 20, 09, 24, 46, 52

Iteration 4: (ind 0 -- ind 2)
(13, 20) => 13 < 20, No change
(20, 09) => 09 < 20, swap, arr[] = 13, 09, 20, 24, 46, 52
                                                      --> the 4th largest element will be at 4th last index

        0   1   2   3   4   5
arr[] = 13, 09, 20, 24, 46, 52

Iteration 5: (ind 0 -- ind 1)
(13, 09) => 09 < 13, swap, arr[] = 09, 13, 20, 24, 46, 52
                                                      --> the 5th largest element will be at 5th last index

        0   1   2   3   4   5
arr[] = 09, 13, 20, 24, 46, 52

In code, a little optimisation condition:
- If there is already sorted array in increasing order, then no swaps are done, we should get O(n)

TC: O(n ^ 2) Worst case and O(n) for best case
SC: O(1) */

function bubbleSortIterative(a: number[]): number[] {
    let n: number = a.length;

    // corner case
    if(n <= 1) return a;

    for(let i = 0; i < n; i++) {
        let didSwappedAnything: boolean = false;

        for(let j = 0; j < (n - i); j++) {
            if(((j + 1) < n) && (a[j] > a[j + 1])) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                didSwappedAnything = true;
            }
        }

        // If after this loop, no swap occurred, it means the array is already sorted, hence break the outer loop to finish
        if(didSwappedAnything === false) break;
    }

    return a;
}

function bubbleSortRecursive(a: number[], n: number = a.length): number[] {

    // corner case and base case
    if(n <= 1) return a;

    // perform one pass of bubble sort and push the largest element to the end
    let didSwappedAnything: boolean = false;

    for(let i = 0; i < n; i++) {
        if(((i + 1) < n) && (a[i] > a[i + 1])) {
            [a[i], a[i + 1]] = [a[i + 1], a[i]];
            didSwappedAnything = true;
        }
    }

    // if no elements were swapped, the array is already sorted
    if (didSwappedAnything === false) return a;

    return bubbleSortRecursive(a, n - 1);
}

/* 
TC: 

Worst-Case Time Complexity:
- The first recursive call performs n comparisons.  
- The second recursive call performs n−1 comparisons.  
- The third performs n−2, and so on.  

    The total number of comparisons in the worst case can be expressed as:

    T(n) = n + (n−1) + (n−2) + ⋯ + 1  

    This is the sum of the first n natural numbers:

    T(n) = n(n+1)/2  

    Thus, the time complexity is O(n²).

SC = O(n) for recursive */
