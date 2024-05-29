/* Longest Increasing Subsequence Problem
we need STRICTLY increasing subsequence

Input: nums = [10,9,2,5,3,7,101,18]   Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Input: nums = [0,1,0,3,2,3]           Output: 4
Input: nums = [7,7,7,7,7,7,7]         Output: 1

Logic:
- lets try to write a recurrence relation for this first followed by memoisation and tabulation

--------------------------------
STEPS FOR RECURSION:
=> express everything in terms of index and decide what the function returns
=> explore all possibilities at the current index
=> write the base case now
--------------------------------

- let arr = [10,9,12]
    index     0 1 2

- at every step, we have two choices, take or not take the current element index
- now, while deciding whether to take the element, we need to compare it with the previous LIS element
  so, we need to keep track of previous index as well
- Lets decide the function for step-1:
  f(prev_index, curr_index) -> returns length of LIS till now
  ex: f(0,2) -> returns length of LIS from index[0,2] which is [10,12]

  now, lets try to recurse for the example array, initially, prev_index = -1 since curr_index is the first element

                                        f(-1, 0)
                                    take 10   NOT take 10
                                     /                      \
                                 f(0, 1)                    f(-1, 1)
                             cannot take 9              /             \
                       since a[curr] <= a[prev]        take 9       NOT take 9
                                /                        f(1, 2)        f(-1, 2)
                           f(0, 2)                               
                    take 12   NOT take 12
                        /             \
                 f(2, 3)            f(0, 3)
                    /                   \
            return 0 since          return 0 since
            length exceeded         length exceeded

- So, at each step
   TAKE     => 1 + Max(TAKE, NOT TAKE)  take only when (curr === -1 i.e first element hai agar OR arr[curr] > arr[prev])
               prevIndex = currIndex and curr_index++           
    
   NOT TAKE => 0 + Max(TAKE, NOT TAKE)
               prevIndex as it is and curr_index++ 

- Base case: return 0 when curr_index >= length fo array
                       
TC: O(2^n) since we have two choices at every step
SC: O(n) for recursion     */

function LIS_rec(arr: number[]): number {
    let n: number = arr.length;

    function solveRec(prevIndex: number, currIndex: number): number {
        if(currIndex >= n) return 0;
        
        // take element based on condition
        // if currentIndex = -1, take it since it is the first element of the array
        let take: number = 0;
        if(prevIndex === -1 || arr[currIndex] > arr[prevIndex]) {
            take = 1 + solveRec(currIndex, currIndex+1)
        }

        // not take
        let notTake: number = solveRec(prevIndex, currIndex+1);

        return Math.max(take, notTake);
    }

    return solveRec(-1, 0);
}

/* Lets try to memoise this

Logic:
- see the ranges of currIndex and prevIndex, since we have negative indices, shift the index in dp[][]
- currIndex = [0, n-1]    = row (say) = size = arr.length
  prevIndex = [-1, n-1]   = col (say) = size = arr.length + 1

  instead, take both dimensions as n+1 * n+1

TC: O(n ^ 2) due to matrix
SC: O(n ^ 2) matrix + O(n) for recursion
*/

function LIS_Memoisation(arr: number[]): number {
    let n: number = arr.length;
    let dp: number[][] = Array(n+1).fill(null).map(() => Array(n+1).fill(-1));

    function solveRec(prevIndex: number, currIndex: number): number {
        if(currIndex >= n) return 0;

        if(dp[prevIndex+1][currIndex] !== -1) return dp[prevIndex+1][currIndex]; 
        
        // take element based on condition
        // if currentIndex = -1, take it since it is the first element of the array
        let take: number = 0;
        if(prevIndex === -1 || arr[currIndex] > arr[prevIndex]) {
            take = 1 + solveRec(currIndex, currIndex+1);
        }

        // not take
        let notTake: number = solveRec(prevIndex, currIndex+1);

        dp[prevIndex+1][currIndex] = Math.max(take, notTake);
        return dp[prevIndex+1][currIndex];
    }

    return solveRec(-1, 0);
}

