/* 
TODO: STRICT BITONIC SUBSEQUENCE KARO, here I have done longest of possible LIS,LDS OF LBS

Given an array arr[0 … n-1] containing n positive integers, a subsequence of arr[] is called Bitonic if it is 
first increasing, then decreasing.

A sequence, sorted in increasing order is considered Bitonic with the decreasing part as empty. Similarly, 
decreasing order sequence is considered Bitonic with the increasing part as empty.

Input arr[] = {1, 11, 2, 10, 4, 5, 2, 1};   Output: 6 
Explanation : A Longest Bitonic Subsequence of length 6 is 1, 2, 10, 4, 2, 1

Input arr[] = {12, 11, 40, 5, 3, 1}         Output: 5 
Explanation : A Longest Bitonic Subsequence of length 5 is 12, 11, 5, 3, 1)

Input arr[] = {80, 60, 30, 40, 20, 10}      Output: 5 
Explanation : A Longest Bitonic Subsequence of length 5 is 80, 60, 30, 20, 10)

Logic: (Using LIS)
- let arr = [1, 11, 2, 10, 4, 5, 2, 1]

the bitonic = 1, 2, 10, 4, 2, 1 => len = 6
- get longest increasing subsequence from the start and Longest increasing subsequence from the end
  LIS and LDS (from start, it will be called longest decreasing subsequence)
- Since we are for now concerned only with length of LBS, we will use dp approach of LIS where dp[i] = LIS till i 
  including ith element in the LIS, 
- similarly, LDS[i] = LDS till i including ith element
- now LBS[i] = LIS[i] + LDS[i] - 1 since the peak element is being taken twice 

TC: O(n^2) + O(n^2) since we are using dp approach for getting LIS and LDS dp
SC: O(n) + O(n) = O(n)
*/

function LBS(arr: number[]): number {
    let n: number = arr.length;

    if(n >= 0 && n <= 1) return n; 

    let LIS: number[] = Array(n).fill(1);  // stores LIS from the start
    let LDS: number[] = Array(n).fill(1);  // stores LIS from the end

    // fill LIS[]
    for(let currIndex = 0; currIndex < n; currIndex++) {
        for(let prevIndex = 0; prevIndex < currIndex; prevIndex++) {
            if(arr[currIndex] > arr[prevIndex]) {
                LIS[currIndex] = Math.max((1 + LIS[prevIndex]), LIS[currIndex])
            }
        }
    }

    // fill LDS[]
    for(let currIndex = n-1; currIndex >= 0; currIndex--) {
        for(let prevIndex = n-1; prevIndex > currIndex; prevIndex--) {
            if(arr[currIndex] > arr[prevIndex]) {
                LDS[currIndex] = Math.max((1 + LDS[prevIndex]), LDS[currIndex])
            }
        }
    }

    let ans: number = 0;
    for (let i = 0; i < n; i++) {
        ans = Math.max(LIS[i] + LDS[i] - 1, ans);
    }

    return ans;
}