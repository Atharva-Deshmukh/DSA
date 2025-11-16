/* Leetcode 40 Combination Sum II

Given a collection of candidate numbers (candidates) and a target number (target), 
find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.
      The order of candidates does not matter.

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]

There are basically two patterns for backtracking:

Two Backtracking Styles

| Style                    | Description                                                                 | Example Problem                                   |
|--------------------------|-----------------------------------------------------------------------------|--------------------------------------------------|
| 1. Take / Not-Take       | You explicitly call backtrack twice: once for include, once for exclude     | Subset Sum, Generate Subsequences                |
| 2. For-loop recursion    | You loop through choices and only recurse on “take”.                        |                                                  |
|                          | “Not-take” happens naturally by skipping in the loop                        | Combination Sum II (Leetcode 40), Permutations   |

Time Complexity = O(2^N × K)

Where:
- 2^N is the number of subsets (worst case)
- K is the average length of each combination (for .join(','), output.push([...]), etc.)

The number of recursive calls is bounded by 2^N in worst case (subset-style).

But due to:
Sorting
Duplicate skipping (if (i > start && arr[i] == arr[i-1]) continue)
Early pruning (if (sum > target) break)

… the actual number of valid paths is far fewer.

Space Complexity = O(N) (stack + path) + O(M × N) (output size)

1. Recursive Call Stack:
Max recursion depth = O(N) (you go from index 0 to N)

2. Current Combination Storage (currCombo):
At any point, currCombo holds up to O(N) elements

3. Result Storage:
Let M be number of valid combinations
Each is up to O(N) in size
So, Space = O(N) (stack + path) + O(M × N) (output size)
*/

function combinationSum2(candidates: number[], target: number): number[][] {
    let result: Set<string> = new Set<string>();
    let output: number[][] = [];

    /* Sort to bring duplicates together */
    candidates.sort((a, b) => a - b);

    function backtrack(currCombo: number[], currIndex: number, currSum: number) {
        if (currSum === target) {

            /* Stingify the array and then check if it there in set or not\
               Set compares references, not actual value, hence stingify is needed */

            const key = currCombo.join(',');
            if (!result.has(key)) {
                result.add(key);
                output.push([...currCombo]);
            }
            return;
        }

        for (let i = currIndex; i < candidates.length; i++) {
            if ((i > currIndex) && (candidates[i] === candidates[i - 1])) continue; // skip dup

            // whenever there is a break in the loop, don't mutate before checking, it will pass incorrect inputs for next iterations
            // currSum += candidates[i];
            if ((currSum + candidates[i]) > target) break;

            currCombo.push(candidates[i]);
            backtrack(currCombo, i + 1, currSum + candidates[i]);

            /* The loop automatically handles not-take scneario, so we basically take only when needed */
            currCombo.pop();
        }
    }

    backtrack([], 0, 0);
    return output;
}