/* Leetcode 1283: 
Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, 
divide all the array by it, and sum the division's result. Find the smallest divisor such that the result 
mentioned above is less than or equal to threshold.

Each result of the division is rounded to the nearest integer greater than or equal to that element. 
(For example: 7/3 = 3 and 10/2 = 5).
Math.ceil() basically

The test cases are generated so that there will be an answer.

Input: nums = [1,2,5,9], threshold = 6          Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1. 
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2). 

Input: nums = [44,22,33,11,1], threshold = 5    Output: 44


                                                    Way-1: BRUTE FORCE
                                                    ------------------

- we will use Math.ceil() since we have to get nearest greater integer >= element
- iterate for divisor = 1 to INT_MAX
- For every iteration, calculate the sum, and check if it is < threshold, return true;
  
- Since we are iterating from divisor = 1 to max in a sorted order, the first ans we will get will be minimum
  when divisor = 1, we will get max possible sum
  as divisor increases --> sum decreases
                [X, X, X, X, ✓, ✓, ✓, ✓]
                             |
                      min sum possible

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

/*                                       Way-2: Binary search optimisation
                                         ---------------------------------
        
Thought Process:
- In brute force, we start to get answer after a limit and we require a min value, we can think of BS
  as the search space will be sorted

                  [X, X, X, X, ✓, ✓, ✓, ✓]
                             |
                      min sum possible

- Instead of iterating over every divisor from [1---INT_MAX], we just search and eliminate the larger parts

TC: O(log2(INT_MAX) * nums.length)
SC: O(1) */

function calculateSum(nums: number[], currentDivisor: number): number {
    let sum: number = 0;
    nums.forEach((num) => {
        sum += Math.ceil(num / currentDivisor);
    });
    return sum;
} 

function BS_Solution(nums: number[], threshold: number): number {
    let low: number = 1;
    let high: number = Number.MAX_SAFE_INTEGER;
    
    let ans: number = Number.MAX_SAFE_INTEGER;

    while(low <= high) {
        
        const mid: number = low + Math.floor((high - low) / 2);
        const currSum = calculateSum(nums, mid);

        if(currSum <= threshold) {
            ans = mid;
            high = mid - 1;  /* explore smaller possiblities */
        }
        else low = mid + 1;
    }

    return ans;
}