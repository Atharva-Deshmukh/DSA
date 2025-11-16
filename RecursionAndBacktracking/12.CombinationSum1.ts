/* 39. Combination Sum

Given an array of distinct integers candidates and a target integer target, 
return a list of all unique combinations of candidates where the chosen numbers
sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. 

Two combinations are unique if the frequency of at least one of the chosen 
numbers is different.

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []

Worst case:
----------

candidates = [1] and target = 30
This is allowed. And this is truly the worst-case valid input.

Why?

You can use 1 as many times as you want.
So you generate combinations like:
[1,1,1,...1] (30 times)
But recursion tree will explore all paths, including combinations that go over 30 and must be backtracked.

Recursion Tree:
             []
            /  
          [1]
         /  
      [1,1]
     /
   ...
[1,1,...1]  ← depth = 30


Depth = target

Branching = only 1 (just one candidate)

→ Still O(2^T) recursive paths (because of include + exclude at each level)
→ Each valid result takes O(T) time to copy
→ Total time: O(2^T · T)


TC: O(2^target * target)

Why is there a 2^T part?
------------------------
Think of each recursive call as a decision point: "include or not?"
But here, you can reuse a number many times.
In worst case (e.g. all candidates are 1), how many distinct combinations sum to T?
Huge number! In fact, the number of combinations can grow exponentially with T, not N (number of candidates).
Thus:The number of recursive paths explored ≈ 2^T in worst case (loose upper bound).
So: 2^T paths (branches) explored.

Where does the · T factor come from?
------------------------------------
For each valid combination that hits target == T, you do:
result.push([...currCombo]);
Creating a copy of the current combination takes:
O(k) time, where k = currCombo.length
Worst case: combo has up to T elements (e.g. [1, 1, 1, ..., 1])
So the cost to copy and store one result is O(T)
If there are up to R such combinations (R ≈ 2^T in worst case), then:
Total cost of copying all results = R × T = O(2^T · T)

SC: O(R * T + T)

🔹 1. Recursion Stack

Depth = up to T (in case all candidates are 1)
So: O(T)

🔹 2. Result Array

Let R = total number of valid combinations
Each combination may have up to T elements
So total space for result: O(R * T)

Where:
R = number of valid combinations (can be exponential)
T = max length of one combination

*/

/* TREE DIAGRAM
candidates = [1, 2], target = 2, 

backtrack([], 0, 0)
    include 1
    ---------
    backtrack([1], 0, 1)  
    index = 0
    sum = 1
    sum < target
        
        include 1
        ---------
        backtrack([1, 1], 0, 2)
        sum = 2 = target
        RETURN → result = [[1,1]]

        exclude 1
        ---------
        backtrack([1], 1, 1)  
        index = 1
        sum = 1 
        sum < target

                include 2
                ---------
                backtrack([1, 2], 1, 3)
                sum = 3 > target
                RETURN

                exclude 2
                ---------
                backtrack([1], 2, 1)
                sum = 1 < target
                index >= 2 
                RETURN

`
    exclude 1
    ---------
    backtrack([], 1, 0)
    index = 1
    sum = 0 < target

        include 2
        ---------
            backtrack([2], 1, 2)
            sum = 2 = target
            result = [[1,1], [2]]

            exclude 2
            ---------
            backtrack([], 2, 0)
            sum = 0 < target
            index >= 2 
            RETURN
*/

function combinationSum(candidates: number[], target: number): number[][] {
    let result: number[][] = [];

    function backtrack(currCombo: number[], currIndex: number, currSum: number): void {
        if (currSum === target) {
            result.push([...currCombo]);  /* Pass copied array, since array is stored as reference object */
            currSum = 0;                  /* Reset the currSum */
            return;
        }

        /* Sometimes, when we keep including the same elememt, it may exceed the target */
        if (currSum > target || currIndex >= candidates.length) return;

        // Include current element (can reuse same index)
        currCombo.push(candidates[currIndex]);
        currSum += candidates[currIndex];
        backtrack(currCombo, currIndex, currSum);

        // Exclude current element (move to next index)
        currCombo.pop();
        currSum -= candidates[currIndex];
        backtrack(currCombo, currIndex + 1, currSum);
    }

    backtrack([], 0, 0);
    return result;
};
