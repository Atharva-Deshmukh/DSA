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

Time Complexity = O(2^N)

Explanation:
- In the worst case (when no pruning or duplicate skipping helps), each element can either be picked or not → 2^N combinations.
- Each recursive call does constant work (push, pop, add), and copying the array (res.push([...curr])) takes O(K), where K is the current combination size.
- But since we're only adding **valid combinations summing to target**, actual branching is heavily reduced by:
  1. Sorting
  2. Skipping duplicates: (i > start && candidates[i] === candidates[i - 1])
  3. Pruning: (sum + candidates[i] > target) ⇒ breaks further exploration.

So:
👉 Worst case (loose upper bound): **O(2^N × K)**  
👉 Average case (with pruning + skip): **Much better**

---

Space Complexity = O(N) [stack + path] + O(M × K) [output]

Where:
- N = number of input elements
- M = number of valid combinations in output
- K = average size of each combination

1. **Recursive Call Stack**: O(N) in worst case (depth of tree)
2. **Current Path (`curr`)**: O(N) at most
3. **Output `res[][]`**:
   - Can store up to M combinations
   - Each of up to K length (≤ N)
   - ⇒ O(M × K)

So:
👉 Total space: **O(N + M × K)**

                    []
              /     |       \
          [1]      [1]❌   [2]
         /   \                 \
     [1,1]  [1,2]*             [2,X]
     /
[1,1,2] (sum=4 ❌)

✅ = Valid combination (sum == target)
X  = End of array
*  = Result added

[]
├── 1 (index 0) → [1], sum = 1
│   ├── 1 (index 1) → [1,1], sum = 2
│   │   └── 2 (index 2) → [1,1,2], sum = 4 ❌ skip (sum > target)
│   └── 2 (index 2) → [1,2], sum = 3 ✅ valid → push [1,2]
├── 1 (index 1) ❌ skipped (duplicate at same level)
└── 2 (index 2) → [2], sum = 2
    └── (no more elements) → end


*/


function combinationSum2(candidates: number[], target: number): number[][] {
    const res: number[][] = [];

    /* Sort to bring duplicates together */
    candidates.sort((a, b) => a - b);

    function backtrack(start: number, currCombo: number[], sum: number) {
        if (sum === target) {
            res.push([...currCombo]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {

            /* “If I already included this number at this level (i.e., arr[i] == arr[i-1]), 
            don’t pick it again from the same level.”
            This is level-based pruning — it skips over duplicate decisions at the same depth.
            So:
            - Only one path per duplicate is allowed.
            - No need for Set — duplicates never get generated at all.
            */
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            if (sum + candidates[i] > target) break;

            currCombo.push(candidates[i]);
            backtrack(i + 1, currCombo, sum + candidates[i]);
            currCombo.pop();
        }
    }

    backtrack(0, [], 0);
    return res;
}