/* Quick Sort is a divide-and-conquer algorithm where a pivot is selected, and the array is partitioned into 
two subarrays: one with elements smaller than the pivot and one with elements greater than the pivot. 
After partitioning, the algorithm recursively sorts each subarray.

The performance of Quick Sort depends heavily on how the pivot is chosen.

ALGO:
- get the pivot
- iterate the array from start (low) and end (high), both sides while (i <= j)
- i will stop when a[i] > pivot element, the first element greater than pivot, i++
- j will stop when a[j] < pivot element, the first element smaller than pivot, j--
- swap a[i] and a[j],
- Idea is: all elements <= pivot => on left
           all elements > pivot => on right

- we now have array partitioned as smaller elements on left, larger elements on right
- we swap the pivot and j when (i > j) to bring pivot to its correct place
- now recurse on left partitoned subarray and right partitioned subarray

Dry run when pivot = first element to understand the algo

         0  1  2  3  4  5  6  7
let a = [4, 6, 2, 5, 7, 9, 1, 3]   pivot = 4
                                   i will track first element > pivot
                                   j will track first element <= pivot

         0  1  2  3  4  5  6  7
let a = [4, 6, 2, 5, 7, 9, 1, 3]
         i                    j

         0  1  2  3  4  5  6  7
let a = [4, 6, 2, 5, 7, 9, 1, 3]
            i                 j       (6 > 4 && 3 <= 4) => swap

         0  1  2  3  4  5  6  7
let a = [4, 3, 2, 5, 7, 9, 1, 6]
                  i        j         (5 > 4 && 1 <= 4) => swap

         0  1  2  3  4  5  6  7
let a = [4, 3, 2, 1, 7, 9, 5, 6]
                  j  i                (i > j), now note that j is in all smaller smaller side
                                      and i is in all greater side, swap(4, j) so 4 is in correct
                                      place

         0  1  2  3  4  5  6  7
let a = [1, 3, 2, 4, 7, 9, 5, 6]      partition index = j, because from that index
                  j  i                left partition = all elements <= 4
                                      right partition = all elements > 4

recurse for (0, 3) and (4, 7)

TC: It depends on choice of pivots

Array = [5, 4, 3, 2, 1]

                        Pivot = First element: 5
Partition into [4, 3, 2, 1] and []
Next, pivot 4: [3, 2, 1], [] -> [3, 2, 1] and []
Recursively continues with reduced size until each element is sorted.

Worst-case scenario occurs when the pivot chosen is either the smallest or largest element of 
the array, causing the partitioning step to be unbalanced (i.e., one subarray is empty or nearly 
empty). In this case, each partition only reduces the problem size by 1, leading to 
a recursion depth of n

doPartitionAndReturnPartitionIndex() anyways traverse whole array, so it takes O(n)
quickSort() will here take O(n)
So, overall TC = O(n ^ 2)

SC: O(n) here since recursive calls go through each element, so tree height = O(n)

Same logic is for pivot = last element
        Pivot = Last element: 1
        Partition into [] and [5, 4, 3, 2]
        Next, pivot 2: [] and [5, 4, 3]
        Continue the process similarly until the array is sorted.


Case 3: Pivot = Median

Time Complexity:
The best-case scenario occurs when the pivot divides the array into two roughly equal halves.
If the pivot is the median, the partitions are evenly balanced in each recursion step, 
resulting in a recursion depth of 
O(logn).This balanced partitioning leads to a time complexity of
O(nlogn), which is the optimal case for Quick Sort.

Space Complexity:
Since the recursion depth is O(logn) in the best case, the space complexity is 
O(logn), which is significantly better than the O(n) space complexity in the worst case.

Example (Array = [5, 4, 3, 2, 1]):
Pivot = Median: 3
Partition into [2, 1] and [5, 4]
Recursively sort both subarrays, each of size 2.

Summary of Time and Space Complexity:

Pivot Selection        | Worst-case Time Complexity | Average-case Time Complexity | Space Complexity
-----------------------|----------------------------|------------------------------|------------------
First Element          | O(n^2)                     | O(n log n)                   | O(n)
Last Element           | O(n^2)                     | O(n log n)                   | O(n)
Median                 | O(n log n)                 | O(n log n)                   | O(log n)
Random Element         | O(n^2)                     | O(n log n)                   | O(log n)  */

function doPartitionAndReturnPartitionIndex(a: number[], low: number, high: number): number {
    let pivot = a[low]; // assuming pivot = first element
    let i = low + 1; // start scanning from the element right after pivot
    let j = high;

    while (i <= j) {
        // find element greater than pivot from the left side
        while ((i <= high) && a[i] <= pivot) i++;

        // find element smaller than or equal to pivot from the right side
        while (a[j] > pivot && (j >= low)) j--;

        if (i < j) {
            // Swap elements if i is smaller than j
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    // Swap pivot element with a[j] so the pivot is at its correct position
    // and also bring pivot element to its correct position in sorted array
    [a[low], a[j]] = [a[j], a[low]];

    return j; // return partition index
}

// recursively sort every partition now
function quickSort(a: number[], low: number, high: number) {
    if(low < high) {
        let partitionIndex: number = doPartitionAndReturnPartitionIndex(a, low, high);
        quickSort(a, low, partitionIndex - 1); // partiton element is already sorted, don't include it
        quickSort(a, partitionIndex + 1, high);
    }
}

