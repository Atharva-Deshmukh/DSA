/* 
- divide-and-conquer algorithm where a pivot is selected
- the array is partitioned into two subarrays: one with elements smaller than the pivot 
  and one with elements greater than the pivot. 
- After partitioning, the algorithm recursively sorts each subarray.

The performance depends heavily on how the pivot is chosen.

ALGO:
- Idea is: all elements <= pivot => on left
           all elements > pivot => on right
- get the pivot, i = 0, j = (n - 1)
- i tracks elements < pivot
- j tracks elements > pivot
- if(a[i] > pivot) - stop
- if(a[j] < pivot) - stop
- swap(a[i], a[j])

- we now have array partitioned as smaller elements on left, larger elements on right
- we swap the pivot and j when (i > j) to bring pivot to its correct place
- now recurse on left partitoned subarray and right partitioned subarray

Dry run:
    pivot = first element

         0  1  2  3  4  5  6  7
let a = [4, 6, 2, 5, 7, 9, 1, 3]   pivot = 4
                                   i will track first element > pivot
                                   j will track first element <= pivot
                                   scanning starts after pivot => i = low + 1, j = high

         0  1  2  3  4  5  6  7
let a = [4, 6, 2, 5, 7, 9, 1, 3]
            i                 j       (6 > 4 && 3 <= 4) => swap

         0  1  2  3  4  5  6  7
let a = [4, 3, 2, 5, 7, 9, 1, 6]
                  i        j         (5 > 4 && 1 <= 4) => swap

         0  1  2  3  4  5  6  7
let a = [4, 3, 2, 1, 7, 9, 5, 6]
                  j  i                (i > j), now note that j is in all smaller side
                                      and i is in all greater side, swap(4, j) so 4 is in correct
                                      place

         0  1  2  3  4  5  6  7
let a = [1, 3, 2, 4, 7, 9, 5, 6]      partition index = j, because from that index
                  j  i                left partition = all elements <= 4
                                      right partition = all elements > 4

recurse for (0, 3) and (4, 7)

TC: It depends on choice of pivots

Case-1: Pivot = First element
-----------------------------

Array = [5, 4, 3, 2, 1], pivot = 5

Partitions -->  [4, 3, 2, 1] and []
Next, pivot 4: [3, 2, 1], [] -> [3, 2, 1] and []
Recursively continues with reduced size until each element is sorted.

Worst case: the pivot is always the smallest or largest element, 
so each partition is unbalanced (one side empty). 
The problem size shrinks by only 1 per step, giving a recursion depth of n.

Case-2: Pivot = Last element
----------------------------

Same logic is for pivot = last element
        Pivot = Last element: 1
        Partition into [] and [5, 4, 3, 2]
        Next, pivot 2: [] and [5, 4, 3]
        Continue the process similarly until the array is sorted.


Case 3: Pivot = Median element
------------------------------

NOTE: this is MEDIAN element, the actual middle value, not simply middle or mid element

Every level does about n total work. 
Halving the size each time means the depth is log₂n. So the total is O(n log n).
This is the optimal case for Quick Sort.

Space Complexity = Recursion depth:
- O(logn) in the best case
- O(n) space complexity in the worst case.

Summary of Time and Space Complexity:

Pivot Selection        | Worst-case Time Complexity | Average-case Time Complexity | Space Complexity
-----------------------|----------------------------|------------------------------|------------------
First Element          | O(n^2)                     | O(n log n)                   | O(n)
Last Element           | O(n^2)                     | O(n log n)                   | O(n)
Median (not middle)    | O(n log n)                 | O(n log n)                   | O(log n)
Random Element         | O(n^2)                     | O(n log n)                   | O(log n)  */

function doPartitionWithFirstPivot(a: number[], low: number, high: number): number {
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

    // Bring pivot at its correct place, i.e, j
    [a[low], a[j]] = [a[j], a[low]];

    return j; // return partition index
}

function doPartitionWithLastPivot(a: number[], low: number, high: number): number {
    let pivot = a[high]; // pivot = last element
    let i = low; // scan from the start, pivot is excluded on the right
    let j = high - 1;

    while (i <= j) {
        // find element greater than pivot from the left side
        while (i <= j && a[i] <= pivot) i++;

        // find element smaller than or equal to pivot from the right side
        while (i <= j && a[j] > pivot) j--;

        if (i < j) {
            [a[i], a[j]] = [a[j], a[i]];
        }
    }

    // Now i = j + 1: i is the first element > pivot, so bring pivot at its correct place, i.e, i
    [a[i], a[high]] = [a[high], a[i]];

    return i; // return partition index
}


function doPartitionWithMedianPivot(a: number[], low: number, high: number): number {

    let mid = low + Math.floor((high - low) / 2);

    /* find index of the median among a[low], a[mid], a[high]
            if a[low] <= a[mid] <= a[high] OR a[high] <= a[mid] <= a[low]  -> median is mid
            if a[mid] <= a[low] <= a[high] OR a[high] <= a[low] <= a[mid]  -> median is low
                                                                    else   -> median is high

       Ex: a = [9, 2, 5]
        mid = 2 but median = 5
    */
    let medianIndex: number;
    if ((a[low] <= a[mid] && a[mid] <= a[high]) || (a[high] <= a[mid] && a[mid] <= a[low])) medianIndex = mid;
    else if ((a[mid] <= a[low] && a[low] <= a[high]) || (a[high] <= a[low] && a[low] <= a[mid])) medianIndex = low;
    else medianIndex = high;

    // move the median to the front and reuse the first-element partition logic
    [a[low], a[medianIndex]] = [a[medianIndex], a[low]];

    /* 
    The partition function we already have only knows how to use the first element (a[low]) as the pivot. 
    Instead of writing a new partition for the median, we:
    - Swap the median to the front, so the chosen pivot now sits at a[low].
    - Call the first-element partition, which treats it as the pivot and does everything else as before.
    */
    return doPartitionWithFirstPivot(a, low, high);
}

// recursively sort every partition now
function quickSort(a: number[], low: number, high: number) {
    if(low < high) {
        let partitionIndex: number = doPartitionWithFirstPivot(a, low, high);
        quickSort(a, low, partitionIndex - 1); // partiton element is already sorted, don't include it
        quickSort(a, partitionIndex + 1, high);
    }
}

