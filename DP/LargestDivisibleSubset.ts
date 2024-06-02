/* Given an array with DISTINCE positive integers, the task is to largest divisible subset in array. A subset is called divisible if 
  for every pair (x, y) in subset, either x divides y or y divides x.


  NOTE: a subset is collection of any elements from an array with/without maintaining an order

    Input  : arr[] = {1, 16, 7, 8, 4}     Output : 16 8 4 1
    In the output subset, for every pair, either the first element divides second or second divides first.

    Input  : arr[] = {2, 4, 3, 8}        Output : 8 4 2

    Input: nums = [1,2,3]                Output: [1,2]
    Explanation: [1,3] is also accepted.

    Input: nums = [1,2,4,8]              Output: [1,2,4,8]

 LOGIC:
 - Try to relate this problem to the LIS problem
 - Since the order of the answer doesn't matter, try to sort this array
 - OBSERVATION: if a is divisible by b && b is divisible by c, so a is divisible c,
   but they must be sorted in ascending order => a < b < c
 - we can simply modify LIS code's if condition and use that single dimension dp[]
 - we can use prevIndex[] similarly to backtrack the Longest Divisible Subset

TC:
SC:
*/

function largestDivisibleSubset(arr: number[]): number[] {
    let n: number = arr.length;

    if(n <= 1) return arr;

    // sort the array
    arr = arr.sort((a,b) => a-b);  // simply using arr.sort() is not sorting all testcases in leetcode

    let dp: number[] = Array(n).fill(1);
    let prevInd: number[] = Array.from({length: n}, (_, index) => index);  //array initilaised with corresponding indices

    for(let currIndex = 0; currIndex < n; currIndex++) {
        for(let prevIndex = 0; prevIndex < currIndex; prevIndex++) {
            if((arr[currIndex] % arr[prevIndex]) === 0 || (arr[prevIndex] % arr[currIndex]) === 0) {
                let originalElement: number = dp[currIndex];
                dp[currIndex] = Math.max(dp[currIndex], (1 + dp[prevIndex]));

                if(dp[currIndex] !== originalElement) prevInd[currIndex] = prevIndex;
            }
        }
    }

    let mx: number = Number.MIN_SAFE_INTEGER;
    let lastIndex: number = -1;
    dp.forEach((ele, index) => {
        if(ele > mx) {
            mx = ele;
            lastIndex = index;
        }
    });

    // Backtracking the LDS
    let LDS: number[] = [];
    let currentLastIndex: number = Number.MIN_SAFE_INTEGER;
    while(currentLastIndex !== lastIndex) {
        currentLastIndex = lastIndex;
        LDS.unshift(arr[lastIndex]);
        lastIndex = prevInd[lastIndex];
    }

    return LDS;
}