/* It is also the same problem as leetcode 410. Split Array Largest Sum

Dilpreet wants to paint his dog's home that has n boards with different lengths. The length of ith board is given by 
arr[i] where arr[] is an array of n integers. He hired k painters for this work and each painter takes 1 unit time to 
paint 1 unit of the board. The problem is to find the minimum time to get this job done if all painters start together 
with the constraint that any painter will only paint continuous boards, say boards numbered {2,3,4} or only board {1} 
or nothing but not boards {2,4,5}.


n = 5
k = 3
arr[] = {5,10,30,20,15}                     Output: 35
The most optimal way will be:
Painter 1 allocation : {5,10}
Painter 2 allocation : {30}
Painter 3 allocation : {20,15}
Job will be done when all painters finish
i.e. at time = max(5+10, 30, 20+15) = 35
Example 2:

Input:
n = 4
k = 2
arr[] = {10,20,30,40}
Output: 60
Explanation: The most optimal way to paint:
Painter 1 allocation : {10,20,30}
Painter 2 allocation : {40}
Job will be complete at time = 60

Expected Time Complexity: O(n log m) , m = sum of all boards' length
Expected Auxiliary Space: O(1)
-----------------------------------------------------------------------------
LEETCODE Problem statement:

Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any 
subarray is minimized. Return the minimized largest sum of the split.
A subarray is a contiguous part of the array.

Input: nums = [7,2,5,10,8], k = 2           Output: 18
There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.

Input: nums = [1,2,3,4,5], k = 2            Output: 9
There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.

LOGIC:
- It is Same as the book allocation problem

k = 3  arr[] = {5, 10, 30, 20, 15} 

Iterate for Maximum Sum Possible (MSP)

low = 30     high = 80

for 30:
    1 - 5, 10
    2 - 30
    3 - 20
    4 - 15
.
.
for 35:
    1 - 5, 10   --> THIS IS ANSWER
    2 - 30
    3 - 20, 15
.
.

for 45:
    1 - 5, 10, 30
    2 - 20, 15


Scenario 1: If there are 3 boards [10, 20, 30] and 4 painters (k = 4):
Since we have more painters than boards, each painter can paint at most one board. The time taken will be the time 
taken to paint the longest board, which is 30.

Scenario 2: If there are 3 boards [10, 20, 30] and 3 painters (k = 3):
Each painter can paint exactly one board. Therefore, the maximum time will still be the time taken to paint the 
longest board, which is 30. Thus, the condition if (k >= n) return Math.max(...arr); ensures that we handle cases 
where the number of painters is sufficient to paint each board individually, leading to the optimal solution for 
those cases.
    
*/

function isMSP_Possible(arr: number[], k: number, MSP: number): boolean {
    let index: number = 0;
    let n: number = arr.length;

    // checking if this MAP is possible within given k
    while(k > 0) {
        let sum: number = 0;
        while((index < n) && ((arr[index] + sum) <= MSP)) {
            sum = sum + arr[index];
            index++;
        }
        k--;
    }

    // if I reached last index, then all arr have been allocated within m students
    return (index === n);
}


function paintersProblemBruteForce(arr: number[], k: number): number {
    let n: number = arr.length;

    if (k >= n) return Math.max(...arr);
    if(k === 1) return arr.reduce((acc, ele) => {
        return acc + ele;
    });

    let low: number = Number.MIN_SAFE_INTEGER;
    let high: number = 0;  //sum

    // getting start and end in one iteration itself
    arr.forEach((ele) => {
        high = high + ele;
        if(ele >= low) low = ele;
    });

     // MSP ->Maximum Sum Possible 
     for(let MSP = low; MSP < Number.MAX_SAFE_INTEGER; MSP++) {
        if(isMSP_Possible(arr, k, MSP) === true) return MSP;
    }

    return -1;
}

// Binary search Optimisation
function paintersProblemBS(arr: number[], k: number): number {
    let n: number = arr.length;

    if (k >= n) return Math.max(...arr);
    if(k === 1) return arr.reduce((acc, ele) => {
        return acc + ele;
    });

    let low: number = Number.MIN_SAFE_INTEGER;
    let high: number = 0;  //sum
    let ans: number = Number.MAX_SAFE_INTEGER;

    // getting start and end in one iteration itself
    arr.forEach((ele) => {
        high = high + ele;
        if(ele >= low) low = ele;
    });

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        
        if(isMSP_Possible(arr, k, mid) === false) low = mid + 1;
        else {
            high = mid - 1;  //explore smaller possiblities
            ans = (mid < ans)? mid: ans;
        }
    }

    return (ans !== Number.MAX_SAFE_INTEGER)? ans: -1;
}
