/* 128. Longest Consecutive Sequence

Given an unsorted array of integers nums, return the length of the longest 
consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Meaning: Find the longest run of integers like x, x+1, x+2, … that all exist somewhere in the array. 
         The numbers can be in any order and don't need to be adjacent in the array. This is not a subarray problem.

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Input: nums = [1,0,1,2]
Output: 3
 
Constraints:
    0 <= nums.length <= 10^5
    -10^9 <= nums[i] <= 10^9

Way-1: Brute force
- For each element, check x+1, x+2...

TC: O(n^2) -> +1, +2....n, for all n elements
SC: O(1)

Way-2: Sort and counter
- Sorted order puts consecutive numbers next to each other. 
- now [i = 1 --- (n - 1)] 
  check a[i] === a[i - 1] --> Equal neighbours don't change the run.

    function longestConsecutive(nums: number[]): number {

        if (nums.length === 0) return 0;

        nums.sort((a, b) => a - b);

        let maxRun = 1, run = 1;
        for (let i = 1; i < nums.length; i++) {

            if (nums[i] === nums[i - 1]) continue;
            if (nums[i] === nums[i - 1] + 1) run++;
            else run = 1;

            maxRun = Math.max(maxRun, run);
        }
        return maxRun;
    }

TC: O(nlogn)
SC: O(n)

Way-3: Set
- Key idea: only start counting from a number x when x − 1 is not in the set. 
            That means x is the beginning of a chain.

let a = [100, 4, 200, 1, 3, 2]
  set = {100, 4, 200, 1, 3, 2}


    x	    Is x − 1 in the set?	                What to do
    --------------------------------------------------------------------
    100	        99? No	               Start counting. 101? no. Length 1
    4	         3? Yes	                            Skip
    200	       199? No	                Start counting. 201? no. Length 1
    1	         0? No	                Start counting. 2 ✔, 3 ✔, 4 ✔, 5 ✘. Length 4
    3	         2? Yes	                            Skip
    2	         1? Yes	                            Skip


TC: O(n)
SC: O(1)
*/

function solve(nums) {
    const set = new Set(nums);
    let best = 0;

    for (const x of set) {
        if (set.has(x - 1)) continue;   // x - 1 exists, so x is not the smallest in its run

        let length = 1;
        while (set.has(x + length)) {   // count upward
            length++;
        }
        best = Math.max(best, length);
    }
    return best;
}
