/* Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, 
divide all the array by it, and sum the division's result. Find the smallest divisor such that the result 
mentioned above is less than or equal to threshold.

Each result of the division is rounded to the nearest integer greater than or equal to that element. 
(For example: 7/3 = 3 and 10/2 = 5).

The test cases are generated so that there will be an answer.

Input: nums = [1,2,5,9], threshold = 6          Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1. 
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2). 

Input: nums = [44,22,33,11,1], threshold = 5    Output: 44


Brute force Logic: 
- we will use Math.ceil() since we have to get nearest greater integer >= element
- iterate for divisor = 1 to INT_MAX
- For every iteration, calculate the sum, and check if it is < threshold, return true;
  It will be just like min. bouquets problem

TC: O((INT_MAX) * nums.length)
SC: O(1) */

function isSumPossibleForThisDivisor(nums: number[], threshold: number, currentDivisor: number): boolean {
    let sum: number = 0;
    nums.forEach((num) => {
        sum += Math.ceil(num / currentDivisor);
    });
    return (sum <= threshold);
} 

function bruteForceSolution(nums: number[], threshold: number): number {
    for(let divisor = 1; divisor <= Number.MAX_SAFE_INTEGER; divisor++) {

        // since we are iterating from 1 to max in a sorted order, the ans will be minimum here
        if(isSumPossibleForThisDivisor(nums, threshold, divisor)) {
            return divisor;
        }
    }
    return -1;
}

/* Binary search optimisation
- Modify isSumPossibleForThisDivisor() to return the sum itself, but its TC will be same
- instead of iterating every divisor, we can use BS since we are anyways looping in a sorted manner
- Range will be [1...Math.max(...arr)]

TC: O(log2(INT_MAX) * nums.length)
SC: O(1) */

function calculateSum(nums: number[], threshold: number, currentDivisor: number): number {
    let sum: number = 0;
    nums.forEach((num) => {
        sum += Math.ceil(num / currentDivisor);
    });
    return sum;
} 

function BS_Solution(nums: number[], threshold: number): number {
    let low: number = 1;
    let high: number = Math.max(...nums);
    let ans: number = Number.MAX_SAFE_INTEGER;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        if(calculateSum(nums, threshold, mid) <= threshold) {
            ans = mid;
            high = mid - 1;  //explore smaller possiblities
        }
        else if(calculateSum(nums, threshold, mid) > threshold) low = mid + 1;
    }

    return ans;
}