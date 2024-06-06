/*
Input: nums = [1,3,5,4,7]       Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].

Input: nums = [2,2,2,2,2]       Output: 5
Explanation: The length of the longest increasing subsequence is 1, and there are 5 increasing subsequences of length 1, 
so output 5.

LOGIC: MEMORISE THIS
- Its almost the same as the 1D dp[] for LIS solution
- just maintain an additional count[]
- dp[i] stores length of LIS till ith index including ith element
  count[i] stores no. of LISs of length dp[i] till ith index including ith element
  Initialise both of them with 1

- Lets walk through an example

           0  1  2  3  4  5  6  7   8  9
ex: arr = [1, 5, 4, 3, 2, 6, 7, 10, 8, 9]
     dp = [1, 2, 2, 2, 2, 2, 3,  4, 4, 5]   --> Stores length of LIS till and including this element
  count = [1, 1, 1, 1, 1, 5, 9,  9, 9, 9]   --> Stores no. of LIS till and including this element of length dp[i]

ele = 1
    1 is itself a LIS so dp[0] = 1 and count[0] = 1
    as only one LIS is there of length 1 till index = 0

ele = 5
    [1,5] can be LIS so dp[1] = 1 + dp[0], same logic for LIS
    count[1] = 1 since there is only one LIS of length 2 till index 1

ele = 4
    [1, 4] can be LIS dp[2] = 1 + dp[0]
    count[2] = 1 since there is only one LIS of length 2 including 4 in the LIS

ele = 3
    [1, 3] can be LIS dp[3] = 1 + dp[0]
    count[3] = 1 since there is only one LIS of length 2 including 3 in the LIS

ele = 2
    [1, 2] can be LIS dp[4] = 1 + dp[0]
    count[4] = 1 since there is only one LIS of length 2 including 2 in the LIS

ele = 6, THIS IS INTERESTING NOW
    now, check for every element carefully
    [1, 6] can be LIS of length 2 dp[5] = 1 + dp[0]
    count[5] = 1 since there is only one LIS of length 2 

    [5, 6] can be LIS of length 2, so dp[5] = 2 ONLY  BUT
    count[5] = 2 since there are now 2 LIS of length 2 

    [4, 6] can be LIS of length 2, so dp[5] = 2 ONLY  BUT
    count[5] = 3 since there are now 3 LIS of length 2 

    [3, 6] can be LIS of length 2, so dp[5] = 2 ONLY  BUT
    count[5] = 4 since there are now 4 LIS of length 2 

    [2, 6] can be LIS of length 2, so dp[5] = 2 ONLY  BUT
    count[5] = 5 since there are now 5 LIS of length 2 

ele = 7 
    [1, 7] can be LIS of length 2, so dp[6] = 2.
    count[6] = 1 since there is only 1 LIS of length 2 till now

    [5, 7] can be LIS of length 3 since it can now be actually [1, 5, 7], at 5, 
    we have LIS of length 2 already possible, so dp[6] = 3
    count[6] = 1 since there is only 1 LIS of length 3 till now
    
    [4, 7] can be LIS of length 3 since its now actually [1, 4, 7], so dp[6] = 3
    count[6] = 2 since there are now 2 LIS of length 3
    
    [3, 7] can be LIS of length 3 since its now actually [1, 3, 7], so dp[6] = 3
    count[6] = 3 since there are now 3 LIS of length 3
    
    [2, 7] can be LIS of length 3 since its now actually [1, 2, 7], so dp[6] = 3
    count[6] = 4 since there are now 4 LIS of length 3
    
    till now, we have count[6] = 4 which was excluding 6
    now, after including 6, again at six max possible LIS length = 2, 
    But, 6 have 5 more length 2 possibilitues with it
    [6, 7] can be LIS of length 3 since its now actually [1, 6, 7],
                                                         [5, 6, 7] 
                                                         [4, 6, 7] 
                                                         [3, 6, 7] 
                                                         [2, 6, 7] 
    
    count[6] = 4 Earlier + 5 New = 9 since there are 9 possible LIS of length 3 till now
    
ele = 10
    [1, 10] can be LIS of length 2, so dp[7] = 2.
    count[7] = 1 since there is only 1 LIS of length 2 till now

    [5, 10] can be LIS of length 3 [1, 5, 10], so dp[7] = 3.
    count[7] = 1 since there is only 1 LIS of length 3 till now
    
    [4, 10] can be LIS of length 3 [1, 4, 10], so dp[7] = 3.
    count[7] = 2 since there are 2 LIS of length 3 till now
    
    [3, 10] can be LIS of length 3 [1, 3, 10], so dp[7] = 3.
    count[7] = 3 since there are 3 LIS of length 3 till now

    [2, 10] can be LIS of length 3 [1, 2, 10], so dp[7] = 3.
    count[7] = 4 since there are 4 LIS of length 3 till now

    [6, 10] can be LIS of length 3 [1, 6, 10], 
                                   [5, 6, 10] 
                                   [4, 6, 10] 
                                   [3, 6, 10] 
                                   [2, 6, 10] 
    
    so dp[7] = 3 && count[7] = 4 + 5 = 9 since there are 9 LIS of length 3 till now

    on [7, 10], at 7, max LIS length possible = 3,
    7 and 10 ko pakadke konse elements add karenge to 4 length ka LIS possible hai

    [1, 5, 7, 10] 
    [1, 4, 7, 10] 
    [1, 3, 7, 10] 
    [1, 2, 7, 10] 

    [1, 6, 7, 10]   --> 6 ke already 5 
    [5, 6, 7, 10]
    [4, 6, 7, 10]
    [3, 6, 7, 10]
    [2, 6, 7, 10]
    
    dp[7] already has 9 possible LIS of length 3 including and till 7
    so, after adding 10, LIS length will be 4 and no. of subsequences that can 
    make that length = no. of LIS of len 3 + 10 added = 9 only 
    so dp[10] = 4 && count[10] = 4 + 5 = 9 since there are 9 LIS of length 4 now

ele = 8
    [1,8] of length 2, so dp[8] = 2 and count[8] = 1

    [1, 5, 8]  dp[8] = 3 & count[8] = 1 
    [1, 4, 8]  dp[8] = 3 & count[8] = 2 
    [1, 3, 8]  dp[8] = 3 & count[8] = 3 
    [1, 2, 8]  dp[8] = 3 & count[8] = 4
    
    6 already has 5

    [1, 6, 8] dp[8] = 3 & count[8] = 5
    [5, 6, 8] dp[8] = 3 & count[8] = 6
    [4, 6, 8] dp[8] = 3 & count[8] = 7
    [3, 6, 8] dp[8] = 3 & count[8] = 9
    [2, 6, 8] dp[8] = 3 & count[8] = 9

    this could be directly count[6] + 4

    [7] has already a count = 9 of length 3
    so dp[8] = 4 now & count[8] = 9

    [10] cannot be added since 10 > 8

ele = 9

[1, 9] dp[9] = 2 & count[9] = 1


[1, 5, 9] dp[9] = 3 & count[9] = 1
[1, 4, 9] dp[9] = 3 & count[9] = 2
[1, 3, 9] dp[9] = 3 & count[9] = 3
[1, 2, 9] dp[9] = 3 & count[9] = 4

dp[6] = 5 already, so, 
dp[9] = 3 & count[9] = 5 + 4 = 9

now, dp[7] = 3 & coun[7] = 9
dp[9] = 4 & count[9] = 9

[10] is not included since 10 > 9

now, dp[8] = 4 & count[8] = 9, so,
dp[9] = 5 & count[9] = 9

TC: O(n^2)
SC: O(n)*/

function countLIS(arr: number[]): number {
    let n: number = arr.length;
    let dp: number[] = Array(n).fill(1);
    let count: number[] = Array(n).fill(1);
    let maxLen: number = -1;

    // keep the loop same as the LIS dp approach
    for(let currentIndex = 0; currentIndex < n; currentIndex++) {
        for(let prevIndex = 0; prevIndex < currentIndex; prevIndex++) {
            if(arr[currentIndex] > arr[prevIndex] && dp[currentIndex] < 1 + dp[prevIndex]) {
                dp[currentIndex] = 1 + dp[prevIndex];
                count[currentIndex] = count[prevIndex]; // simply carry forward the count if there is a unique count    
            }
            else if(arr[currentIndex] > arr[prevIndex] && dp[currentIndex] === 1 + dp[prevIndex]) {
                count[currentIndex] += count[prevIndex];
            }
        }

        // keep track of maximum value in the dp[]
        maxLen = Math.max(maxLen, dp[currentIndex]);
    }

    // Now, iterate the dp[] and add all count[i] values corresponding to dp[i]
    let ans: number = 0;
    dp.forEach((ele, index) => {
        if(ele === maxLen) ans += count[index];
    });

    return ans;
} 