/* We need to use tabulation to print LIS

STEPS FOR MEMOISATION TO TABULATION  [NO NEED TO MEMORISE THIS because TC = O(n^2) only]
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

/* MUST KNOW BETTER way for tabulation

- declare a dp[arr.length] where dp[i] => length of LIS that ends at index i, means including arr[i] in that LIS

let arr = [5,4,11,1,16,8]
   index   0 1  2 3 4  5 
    LIS = [1 1  2 1 3 2]

   At index 0 -> 1 since possible LIS = [5] ONLY
   At index 1 -> 1 since possible LIS = [5] OR [4]
   At index 2 -> 2 since possible LIS = [5,11] OR [4,11]
   At index 3 -> 1 since possible LIS = [1] ONLY
   At index 4 -> 3 since possible LIS = [5,11,16] OR [4,11,16]
   At index 5 -> 2 since possible LIS = [4,8], [1,8], [5,8]

- dp[n] = [1,1,1...n] initially since if nothing works, LIS will be anyways include the current element itself atleast
- Now, maintain prevIndex and currIndex and iterate the array
- for currIndex = 0, prevIndex = currIndex since there is a possibility for first element only to be LIS of length 1
- currIndex = 1 now, 4 < 5, so prevIndex = 0, currIndex = 2 now
- currIndex = 2, 11 > 5 so dp[currIndex] = 1 + dp[prevIndex]
  prevIndex++ till arr[prevIndex] < arr[currentIndex] to explore all possible lengths and take max of them
  prevIndex = 1 & currIndex = 2, arr[prevIndex] < arr[currentIndex] so dp[currIndex] = Max(1 + dp[prevIndex], peviously calculated values)

TC: O(n^2)
SC: O(N)
*/

function LIS_MemoisationNEW_Way(arr: number[]): number {
    let n: number =  arr.length;
    let dp: number[] = Array(n).fill(1);
    let ans: number = -1;

    for(let currIndex = 0; currIndex < n; currIndex++) {
        for(let prevIndex = 0; prevIndex < currIndex; prevIndex++) {
            if(arr[prevIndex] < arr[currIndex]) {
                dp[currIndex] = Math.max((1 + dp[prevIndex]), dp[currIndex]);
            }
        }
    }

    dp.forEach((num) => {
        ans = Math.max(num, ans);
    });

    return ans;
}

/* PRINTING LIS
LOGIC:
- maintain a 2nd array prevInd[n] where prevInd[i] => Immediate previous index of LIS when current index is there in LIS
  Initially, the prevInd[n] = [that corresponding index since that is the possible prevIndex initially]   

   index   0  1   2  3  4   5 
-   arr = [5, 4, 11, 1, 16, 8]
    LIS = [1  1   2  1  3  2]
prevInd = [0  1   2  3  4  5]

currIndex = 0 prevIndex = 0
    arr = [5, 4, 11, 1, 16, 8]
    LIS = [1  1   1  1  1  1]
prevInd = [0  1   2  3  4  5]

currIndex = 1 prevIndex = 0
    arr = [5, 4, 11, 1, 16, 8]
    LIS = [1  1   2  1  1  1]
prevInd = [0  1   2  3  4  5]

currIndex = 2 prevIndex = 0
    arr = [5, 4, 11, 1, 16, 8]
    LIS = [1  1   2  1  1  1]
prevInd = [0  1   0  3  4  5]  since  11 > 5 so LIS[2] = 1 + LIS[0]

        currIndex = 2 prevIndex = 1
            arr = [5, 4, 11, 1, 16, 8]
            LIS = [1  1   2  1  1  1]
        prevInd = [0  1   0  3  4  5]  since  11 > 4 and still we get length 2, so no need to update the prevInd[]

currIndex = 3 prevIndex = 0         all prev elements are small so this element is the ONLY LIS
    arr = [5, 4, 11, 1, 16, 8]
    LIS = [1  1   2  1  11  1]
prevInd = [0  1   0  3  4  5]  

currIndex = 4 prevIndex = 0        
    arr = [5, 4, 11, 1, 16, 8]  16 > 5
    LIS = [1  1   2  1  2  1]
prevInd = [0  1   0  3  0  5] 

            currIndex = 4 prevIndex = 1        
                arr = [5, 4, 11, 1, 16, 8]  16 > 4 but 2 = max(1+1, 2) so no change in prevInd
                LIS = [1  1   2  1  2  1]
            prevInd = [0  1   0  3  0  5] 

            currIndex = 4 prevIndex = 2       
                arr = [5, 4, 11, 1, 16, 8]  16 > 11 but max(2+1, 3) = 3 so there is change in prevInd
                LIS = [1  1   2  1  3  1]
            prevInd = [0  1   0  3  2  5] 

currIndex = 5 prevIndex = 0        
    arr = [5, 4, 11, 1, 16, 8]  8 > 5
    LIS = [1  1   2  1  3  2]
prevInd = [0  1   0  3  2  0]

        currIndex = 5 prevIndex = 1        
            arr = [5, 4, 11, 1, 16, 8]  8 > 4 but no change in LIS[5]
            LIS = [1  1   2  1  3  2]
        prevInd = [0  1   0  3  2  0]

        currIndex = 5 prevIndex = 2        
            arr = [5, 4, 11, 1, 16, 8]  8 < 11
            LIS = [1  1   2  1  3  2]
        prevInd = [0  1   0  3  2  0]

        currIndex = 5 prevIndex = 3        
            arr = [5, 4, 11, 1, 16, 8]  8 > 1 but no change in LIS[5]
            LIS = [1  1   2  1  3  2]
        prevInd = [0  1   0  3  2  0]

        similarly for prevIndex 4 and 5

- NOW, we will backtrack to get the LIS

now max = length 3 in LIS[] and its index in prevInd = 4 (ele = 16), prevInd[4th index] = 2 ele(11) 
and prevInd(2) = 0 ele(5) so LIS = 5,11,16

*/

function printLIS(arr: number[]): number[] {
    let LIS: number[] = [];
    let n: number =  arr.length;
    let dp: number[] = Array(n).fill(1);  //dp[] initialised with 1
    let prevInd: number[] = Array.from({length: n}, (_, index) => index); // prevInd[] initialised with indices
    // let prevInd: number[] = Array.from({ length: n }, (value, index) => index); can also be used

    for(let currIndex = 0; currIndex < n; currIndex++) {
        for(let prevIndex = 0; prevIndex < currIndex; prevIndex++) {
            if(arr[prevIndex] < arr[currIndex]) {
                let originalDP_element: number = dp[currIndex];
                dp[currIndex] = Math.max((1 + dp[prevIndex]), dp[currIndex]);
                
                // if there is a change in this dp[currIndex], only then modify the prevIndex
                // with the prevIndex in the current elements place
                if(dp[currIndex] !== originalDP_element) prevInd[currIndex] = prevIndex;
            }
        }
    }

    // now backtrack
    let lastIndex: number = -1;  // the index of the last element of the LIS
    let max = Number.MIN_SAFE_INTEGER;
    dp.forEach((num, index) => {
        if(num > max) {
            max = num;
            lastIndex = index;
        }
    });

    // loop untill we don't encounter a repeating index in the prevInd[]
    let currentLastIndex: number = Number.MIN_SAFE_INTEGER;
    while(lastIndex !== currentLastIndex) {
        currentLastIndex = lastIndex;
        LIS.unshift(arr[lastIndex]);
        lastIndex = prevInd[lastIndex];
    }

    return LIS;
}