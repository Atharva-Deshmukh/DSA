/* Wave Array (GFG)

Given a sorted (ascending) array, rearrange it in-place such that
arr[0] >= arr[1] <= arr[2] >= arr[3] <= arr[4] >= ...
If multiple answers exist, return the lexicographically smallest one.

Input: arr[] = [1, 2, 3, 4, 5]
Output: [2, 1, 4, 3, 5]

Input: arr[] = [2, 4, 7, 8, 9, 10]
Output: [4, 2, 8, 7, 10, 9]

Input: arr[] = [1]
Output: [1]

Approach: Swap adjacent pairs (0,1), (2,3), (4,5), ...

    [1, 2, 3, 4, 5]
     ^--^  ^--^        swap -> [2, 1, 4, 3, 5]    (last element 5 has no partner, stays)

TC: O(n)
SC: O(1)
*/

function convertToWave(arr: number[]): void {
    const n = arr.length;

    for (let i = 0; i + 1 < n; i += 2) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
}
