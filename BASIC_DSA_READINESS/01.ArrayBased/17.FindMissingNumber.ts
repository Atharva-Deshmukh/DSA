/* GFG Variant

Given an array arr[] of size n-1 with distinct integers in the range of [1, n]. 
This array represents a permutation of the integers from 1 to n with one element missing. 
Find the missing element in the array.

Input: arr[] = [8, 2, 4, 5, 3, 7, 1]
Output: 6
Explanation: All the numbers from 1 to 8 are present except 6.

Input: arr[] = [1, 2, 3, 5]
Output: 4
Explanation: Here the size of the array is 4, so the range will be [1, 5]. The missing number between 1 to 5 is 4

Way-1: Brute force
- we can see that max number in array = arr.length + 1 --> range = [1, (arr.length + 1)]
- For each element [1---n] -> scan the whole array and check if its missing

TC: O(n^2)
SC: O(1)

Way-2: Sort
- Sort and initialise counter = 1
- do i++ and counter++ and whenever a[i] !== counter --> return a[i]

TC: O(nlogn)
SC: O(n)

Way-3: Sum Formula

    IdealArr = [1, 2, 3, 4, 5]; idealSum = 15
   actualArr = [1, 2, 3, 5]    actualSum = 11

   missing = idealSum - actualSum = 15 - 11 = 4

   	missingNum(nums) {
		const n = nums.length;
		let idealSum = 0;
		let actualSum = 0;
		
		for (let i = 1; i <= n + 1; i++) {
			idealSum += i
		}
		
		for (let i = 0; i < n; i++) {
			actualSum += nums[i];
		}
		
		return idealSum - actualSum;
	}

TC: O(n)
SC: O(1)

Way-4: XOR
- a ^ a = 0 --> we can use this

function missingNum(arr) {
    const n = arr.length + 1;
    let xor1 = 0, xor2 = 0;

    // XOR all array elements
    for (let i = 0; i < n - 1; i++) {
        xor2 ^= arr[i];
    }

    // XOR all numbers from 1 to n
    for (let i = 1; i <= n; i++) {
        xor1 ^= i;
    }

    // Missing number is the XOR of xor1 and xor2
    return xor1 ^ xor2;
}

TC: O(n)
SC: O(1)
*/


/* 268. Missing Number
Given an array nums containing n distinct numbers in the range [0, n], 
return the only number in the range that is missing from the array.

Input: nums = [3,0,1]
Output: 2

Input: nums = [0,1]
Output: 2

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8

function missingNumber(nums: number[]): number {
    const n = nums.length;
    let idealSum = 0;
    let actualSum = 0;

    for (let i = 0; i <= n; i++) {
        idealSum += i
    }

    for (let i = 0; i < n; i++) {
        actualSum += nums[i];
    }

    return idealSum - actualSum;
};
 

*/