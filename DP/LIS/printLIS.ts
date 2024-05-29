/* We need to use tabulation to print LIS

STEPS FOR MEMOISATION TO TABULATION
- declare the DP of size we did in memoisation and initialise it = 0
- write the base case, now since we already return 0 in the base case and we 
  are initialising also with the same, don't need to write the base case
- Now, write the changing parameters in the opposite fashion
  currIndex = n-1 to 0
  prevIndex = currIndex-1 to -1 as current index cannot be exceeded by the prevIndex
- copy the recurrence and follow the coordinates shift (shifting)
 
TC: O(n ^ 2) due to matrix
SC: O(n ^ 2) matrix + O(n) for recursion
    
         0 1 2 3 4 5   n = 6
        [0,1,0,3,2,3] 


         0  0  1  0  3  2  3
         -------------------
    0  | 4  3  3  2  2  1  0  
    0  | 0  3  2  2  2  1  0  
    1  | 0  0  2  2  2  1  0  
    0  | 0  0  0  2  2  1  0  
    3  | 0  0  0  0  0  0  0  
    2  | 0  0  0  0  0  1  0  
    3  | 0  0  0  0  0  0  0  
         
*/

function LIS_Tabulation(arr: number[]): number {
    let n: number = arr.length;
    let dp: number[][] = Array(n+1).fill(null).map(() => Array(n+1).fill(0));

    for(let currIndex = n - 1; currIndex >= 0; currIndex--) {
        for(let prevIndex = currIndex - 1; prevIndex >= -1; prevIndex--) {

            let take: number = 0;
            if(prevIndex === -1 || arr[currIndex] > arr[prevIndex]) {
                // take = 1 + solveRec(currIndex, currIndex+1);
                take = 1 + dp[currIndex + 1][currIndex + 1];
            }
    
            let notTake: number = dp[prevIndex + 1][currIndex + 1];
            
            // Storing happens Exactly like memoisation, shift prevIndex by +1 in dp[][]
            dp[prevIndex + 1][currIndex] = Math.max(take, notTake);

        }
    }

    return dp[0][0]; //instead of dp[-1][0], we did -1+1 
}