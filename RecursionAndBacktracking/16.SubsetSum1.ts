/* Concept:

In an array of length n, number of subsets = number of subsequences = 2^n

There is just a conceptual difference between subsets and subsequences:
- Subsets: Order does not matter
- Subsequences: Order matters (relative order should be maintained)
--------------------------------------------------------------------------
--------------------------------------------------------------------------

Given an array of positive integers arr[] and a value sum, determine if there is 
a subset of arr[] with sum equal to given sum. 

Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 9
Output: true 
Explanation: Here there exists a subset with target sum = 9, 4+3+2 = 9.

Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 30
Output: false
Explanation: There is no subset with target sum 30.

Input: arr[] = [1, 2, 3], sum = 6
Output: true
Explanation: The entire array can be taken as a subset, giving 1 + 2 + 3 = 6.


Brute Force: Power set approach

Another approach is backtracking:
Code will be same as generating subsequence

TC: O(n * (2^n))
SC: O(n)
*/

function isSubsetSum(arr, sum) {
    let subsetsWithSumK = [];
    let n = arr.length;

    function backtrack(currComb, n, currIndex, sumTillNow) {
        // Base case: Return the array generated till now
        if (currIndex >= n) {
            if (sumTillNow === sum) {
                subsetsWithSumK.push([...currComb]); // send a copy, due to reference duplication
                sumTillNow = 0;
            }
            return;
        }

        // include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        const currentElement = arr[currIndex];
        currComb.push(currentElement);
        sumTillNow += currentElement;
        backtrack(currComb, n, currIndex + 1, sumTillNow);

        // exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations
        sumTillNow -= currentElement;
        currComb.pop();
        backtrack(currComb, n, currIndex + 1, sumTillNow);
    }

    backtrack([], n, 0, 0);

    return subsetsWithSumK;

}