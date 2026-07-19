/* Same problem as Leetcode 410 --> Split Array Largest Sum

                                Painters Partition Problem statement:
                                -------------------------------------

Dilpreet wants to paint his dog's home that has n boards with different lengths. 
The length of ith board is given by arr[i] where arr[] is an array of n integers. 
He hired k painters for this work and each painter takes 1 unit time to 
paint 1 unit of the board. 
The problem is to find the minimum time to get this job done if all painters start together 
with the constraint that any painter will only paint continuous boards

n = 5
k = 3
arr[] = {5,10,30,20,15}                     Output: 35
The most optimal way will be:
Painter 1 allocation : {5,10}
Painter 2 allocation : {30}
Painter 3 allocation : {20,15}
Job will be done when all painters finish at time = max(5+10, 30, 20+15) = 35

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
-------------------------------------------------------------------------------------------------------

                                        LEETCODE Problem statement:
                                        ---------------------------

Given an integer array nums and an integer k, split nums into k non-empty subarrays 
such that the largest sum of any 
subarray is minimized. Return the minimized largest sum of the split.
A subarray is a contiguous part of the array.

Input: nums = [7,2,5,10,8], k = 2           Output: 18
There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.

Input: nums = [1,2,3,4,5], k = 2            Output: 9
There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.

LOGIC: Exact same logic as Book Allocation problem     
*/

function isMSP_Possible(arr: number[], k: number, MSP: number): boolean {
    let index: number = 0;
    let n: number = arr.length;

    // checking if this Max Sum is possible within given k
    while(k > 0) {
        let sum: number = 0;
        while((index < n) && ((arr[index] + sum) <= MSP)) {
            sum = sum + arr[index];
            index++;
        }
        k--;
    }

    // if I reached last index, then all subarrays have been created
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
        
        if(isMSP_Possible(arr, k, mid) === true) {
            ans = (mid < ans)? mid: ans;
            high = mid - 1;             //explore smaller possiblities
        }
        else low = mid + 1;
    }

    return (ans !== Number.MAX_SAFE_INTEGER)? ans: -1;
}
