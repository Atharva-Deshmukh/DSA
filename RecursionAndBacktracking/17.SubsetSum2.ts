/*
Given an integer array nums that may contain duplicates, return all possible 
subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in 
any order.

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]

Note: this is a subset, not a subsequence problem, so order does not matter
Ex: [4, 4, 1, 4]
    here, [1, 4], [4, 1] are same subsets so duplicates

Hence we sort to bring duplicates together and use a set to avoid duplicate subsets

*/

/*
This works correctly by generating all 2^n possible combinations (include/exclude each element),
but it is inefficient because it does not prevent duplicate subsets from being created.

Even after sorting, this approach still explores duplicate branches like:
  [1,2] and [1,2] again if duplicate 2s are present.

To remove duplicates, we use a Set to store stringified versions of subsets, but this adds extra overhead.

A better approach is to sort the array and use pruning during backtracking:
  - Skip elements that are equal to the previous one at the same recursion depth.
  - This prevents duplicate subsets from being generated in the first place.
*/

function subsetsWithDup(arr: number[]): number[][] {
    let subsets: number[][] = [];
    let mySet: Set<string> = new Set<string>();
    let n = arr.length;

    // to bring duplicates together
    arr = arr.sort();

    function backtrack(currComb: number[], n: number, currIndex: number): void {
        if (currIndex >= n) {
            const stringifiedArr: string = currComb.join(",");
            if (!mySet.has(stringifiedArr)) {
                subsets.push([...currComb]);
                mySet.add(stringifiedArr);
            }
            return;
        }

        const currentElement = arr[currIndex];
        currComb.push(currentElement);
        backtrack(currComb, n, currIndex + 1);

        currComb.pop();
        backtrack(currComb, n, currIndex + 1);
    }

    backtrack([], n, 0);

    return subsets;
};

/* Pruning approach */
function subsetsWithDup(arr: number[]): number[][] {
    let subsets: number[][] = [];
    let n = arr.length;

    // to bring duplicates together
    arr = arr.sort();

    function backtrack(currComb: number[], n: number, currIndex: number): void {
        
        // pick every combination
        subsets.push([...currComb]);

        for (let i = currIndex; i < n; i++) {
            if (i > currIndex && arr[i] === arr[i - 1]) continue;

            currComb.push(arr[i]);
            backtrack(currComb, n, i + 1);
            currComb.pop();
        }
    }

    backtrack([], n, 0);

    return subsets;
};

/*
 * Time Complexity: O(2^N × N)
 *
 * - In the worst case (no pruning is triggered), there are 2^N possible subsets.
 * - For each subset, we may spend up to O(N) time to copy it using [...currComb].
 * - Pruning (i > currIndex && arr[i] === arr[i - 1]) helps reduce unnecessary duplicate branches,
 *   so the actual number of recursive calls is much less when duplicates are present.
 *
 * Space Complexity: O(N) [recursion stack + current path] + O(M × N) [result]
 *
 * - Recursion stack depth is O(N) in the worst case.
 * - At any point, currComb can hold up to N elements → O(N).
 * - Let M be the number of unique subsets added to the result.
 *   Each is copied into the result array with up to N elements → O(M × N).
*/
