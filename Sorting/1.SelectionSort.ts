/* Algo: 
- Select the min and keep it leftmost side and shift that leftmost element to the original place of min element
- Now, we have one element sorted and the remaining array unsorted, repeat for the remaining array

DRY RUN:
-------
         0   1    2   3   4
arr[] = [64, 25, 12, 22, 11]

for arr[0...n]
min = 11, swap(11, 64)
         0   1    2   3   4
arr[] = [11, 25, 12, 22, 64]

for arr[1...n]
min = 12, swap(12, 25)
         0   1    2   3   4
arr[] = [11, 12, 25, 22, 64]

for arr[2...n]
min = 22, swap(22, 25)
         0   1    2   3   4
arr[] = [11, 12, 22, 25, 64]

for arr[3...n]
min = 22, swap(25, 25)
         0   1    2   3   4
arr[] = [11, 12, 22, 25, 64]


TC: O(N ^ 2)
SC: O(1) */

function findMinEleIndex(a: number[], start: number, end: number): number {
    let minIndex: number = -1;
    let minNum: number = Number.MAX_SAFE_INTEGER;

    for(let i = start; i <= end; i++) {
        if(a[i] <= minNum) {
            minNum = a[i];
            minIndex = i;
        }
    } 

    return minIndex;
}

function selectionSort(a: number[]): number[] {
    let n: number = a.length;

    // iterate till second last element
    for(let i = 0; i < n - 1; i++) {
        let minNumIndex: number = findMinEleIndex(a, i, n);
        [a[i], a[minNumIndex]] = [a[minNumIndex], a[i]];
    }

    return a;
}