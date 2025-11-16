/* Leetcode 216 Combination Sum III

Find all valid combinations of k numbers that sum up to n such that the 
following conditions are true:

Only numbers 1 through 9 are used.

Each number is used at most once.

Return a list of all possible valid combinations. 
The list must not contain the same combination twice, and the combinations 
may be returned in any order.

Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.
Example 2:

Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.
Example 3:

Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.

Logic is same, with just minor modification.
We just add current combination only when length = k

Time Complexity = O(2^9 × k) = O(k) (since 2⁹ is constant input space is fixed ([1–9]))
Space Complexity = O(k) (current combo + stack) + O(R × k) (final output)

1. Recursion Stack Depth:
At most 9 levels deep → O(9) = O(1) constant

2. Current Combination (currCombo):
Max size k → O(k)

3. Result Array (result):
Let R = number of valid combinations
Each of length k
→ Result storage = O(R × k)
*/

function combinationSum3(k: number, target: number): number[][] {
        let result: number[][] = [];
        let candidates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    function backtrack(currCombo: number[], currIndex: number, currSum: number): void {
        if(currIndex >= candidates.length) {
            if ((currSum === target) && (currCombo.length === k)) {
                result.push([...currCombo]);  
            }
            return;
        }

        // Include current element (move to next index)
        currCombo.push(candidates[currIndex]);
        currSum += candidates[currIndex];
        backtrack(currCombo, currIndex + 1, currSum);

        // Exclude current element (move to next index)
        currCombo.pop();
        currSum -= candidates[currIndex];
        backtrack(currCombo, currIndex + 1, currSum);
    }

    backtrack([], 0, 0);
    return result;
};