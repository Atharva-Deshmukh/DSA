/* Count Inversions

Given an array of integers arr[]. You have to find the Inversion Count of the array. 
Note : Inversion count is the number of pairs of elements (i, j) such that i < j and arr[i] > arr[j].

Examples:

Input: arr[] = [2, 4, 1, 3, 5]
Output: 3
Explanation: The sequence 2, 4, 1, 3, 5 has three inversions (2, 1), (4, 1), (4, 3).

Input: arr[] = [2, 3, 4, 5, 6]
Output: 0
Explanation: As the sequence is already sorted so there is no inversion count.

Input: arr[] = [10, 10, 10]
Output: 0
Explanation: As all the elements of array are same, so there is no inversion count.

                                                    Brute Force:
                                                    -----------

For each i, do j = i -- (n-1),
and check if(i < j) and a[i] > a[j], then increment count.

TC: O(n^2)
SC: O(1)

                                                    Optimal Approach:
                                                    ----------------
                        
We need to know a concept being used in merge sort.

Lets say, we have two sorted arrays:

                            size = n1       size = n2
                            [4, 5, 6]  and  [1, 2, 3] 
                             i               j

                            We can take advantage of both arrays being sorted

                            if(4 > 1), all elements after 4 will also be greater than 1,
                            pairs = (4, 1), (5, 1), (6, 1) = 3 pairs

                            count = all elements from 4 to end afterwards.
                            for index 0 = n1 - 0 => (4, 1), (5, 1), (6, 1)
                            for index 1 = n1 - 1 => (5, 2), (5, 3)
                            for index 2 = n1 - 2 => (6, 1)

                            count += (n1 - i)  // n is size of array

                            IN MERGE SORT --> we encounter this situation when we are merging two sorted arrays in Merge()
                                                when a[i] < a[j] don't do anything,
                                                when a[i] > a[j], count += (n - i)


TC: O(nlogn)
SC: O(n)
*/

function merge(a: number[], low: number, mid: number, high: number): number {
    let inversionCount: number = 0;

    const n1: number = mid - low + 1;
    const n2: number = high - mid;

    let leftArr: number[] = a.slice(low, mid + 1);
    let rightArr: number[] = a.slice(mid + 1, high + 1);

    let i: number = 0;
    let j: number = 0;
    let k: number = low;

    while((i < n1) && (j < n2)) {
        if(leftArr[i] <= rightArr[j]) {
            a[k] = leftArr[i];
            i++;
        }
        else {
            /* On left subarray because, array will be sorted as [...left, ...right] */
            a[k] = rightArr[j];
            inversionCount += (n1 - i); // our logic to count inversions
            j++;                        // j++ is happening, so we automatically move to next element in right array
        }                               // and in doing so, we counted all elements for previous j and leftArray
        k++;
    }
    while(i < n1) {
        a[k] = leftArr[i];
        i++;
        k++;
    }
    while(j < n2) {
        a[k] = rightArr[j];
        j++;
        k++;
    }
    return inversionCount;
}

function mergeSort(a: number[], low: number, high: number): number {

    let inversionCount: number = 0;

    if(low >= high) return 0;

    const mid: number = low + Math.floor((high - low)/2);

    inversionCount += mergeSort(a, low, mid);
    inversionCount += mergeSort(a, mid + 1, high);
    return inversionCount += merge(a, low, mid, high);
}