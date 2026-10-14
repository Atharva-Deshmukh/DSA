/* Algo:

Keep Inserting the current element in its correct index

DRY RUN:

              0   1   2   3   4
let arr[] = [11, 10, 09, 12, 04]

i = 0: [11]
[11] is itself a sorted subarray, so no need to insert 11 in any position.

i = 1: [11, 10]
[11, 10] is not sorted, insert 10 in its correct index
Iterate backwards and see where it can be placed, swap it then
[10, 11]

i = 2: [10, 11, 09]
[10, 11, 09] is not sorted, insert 09 in its correct index.
Iterate Backwards
11 > 09 =>  swap(11, 09) [10, 09, 11]
10 > 09 =>  swap(10, 09) [09, 10, 11]

i = 3: [09, 10, 11, 12]
[09, 10, 11, 12] is already sorted, no change

i = 4: [09, 10, 11, 12, 04]
[09, 10, 11, 12, 04] is not sorted, insert 04 in its correct index.
Iterate Backwards
12 > 04 =>  swap(12, 04) [09, 10, 11, 04, 12]
11 > 04 =>  swap(11, 04) [09, 10, 04, 11, 12]
10 > 04 =>  swap(10, 04) [09, 04, 10, 11, 12]
09 > 04 =>  swap(09, 04) [04, 09, 10, 11, 12]

TC: O(n ^ 2) worst case and best case = O(n) when array is already sorted, inner whle loop won't be executed
SC: O(1) */

function insertionSortIterative(a: number[]): number[] {
    let n: number = a.length;

    // corner case
    if(n <= 1) return a;

    for(let i = 1; i < n; i++) {
        let j: number = i;

        while(((j - 1) >= 0) && (j >= 0) && (a[j] < a[j - 1])) {
            [a[j], a[j - 1]] = [a[j - 1], a[j]];
            j--;
        }
    }

    return a;
}

// we can just recurse over outer loop
function insertionSortRecursive(a: number[], start: number = 1, n: number = a.length): number[] {

    // corner case and base case
    // start >= n since processing of a[n - 1] is also necessary 
    if((n <= 1) || (start >= n)) return a;

    let j: number = start;
    while(((j - 1) >= 0) && (j >= 0) && (a[j] < a[j - 1])) {
        [a[j], a[j - 1]] = [a[j - 1], a[j]];
        j--;
    }

    return insertionSortRecursive(a, start + 1);
}