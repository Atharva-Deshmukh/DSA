/* 201. Bitwise AND of Numbers Range

Given two integers left and right that represent the range [left, right], 
return the bitwise AND of all numbers in this range, inclusive.

Input: left = 5, right = 7
Output: 4
5 - 0101
6 - 0110
7 - 0111
--------
4 - 0100

Input: left = 0, right = 0
Output: 0

Input: left = 1, right = 2147483647
Output: 0

Brute force:
- simply loop from left-right and get AND

TC: O(right - left + 1)
SC: O(1)

but if we see ex 2, when right = 2 ^ 31 something, it will take lot of time although it is linear, 
hence, some O(1) or O(logn) needs to be thought of

Observation:
5 - 0101
6 - 0110
7 - 0111             In the AND, if ith bit = 1, it means ith bit of every number is 1
--------             Also, range diya hai means numbers are in sorted order
4 - 0100             Notice, in AND, the equal part in all three bits is the answer, since tabhi all 1s bits same honge

5 - 01 | 01
6 - 01 | 10         
7 - 01 | 11
-----------
4 - 01 | 00

Approach: 
- take left and right only
- right shift left and right untill both become equal, and keep count of number of shifts say x
- after shifting, we get 01 (as per above ex), but that is not the answer, it needs to be left shifted again by x
  
TC: O(log(n)) = O(32)
SC: O(1)  */

function rangeBitwiseAnd(left: number, right: number): number {

    // corner case
    if(left === right) return left;  // if left = right, return the number itself Since & same hoga

    let shifts: number = 0;
    while(left != right) {
        left >>= 1;
        right >>= 1;
        shifts++;
    }

    return (left << shifts);
}

/* Most efficient way:
- Instead of shifting every bit in both numbers, recall that we have right >= left always since all nums 
  are sorted in range
- so, keep eliminating the rightmost set bit of right untill it becomes <= left

TC: O(log(n)) = O(32)
SC: O(1) */

function rangeBitwiseAnd(left: number, right: number): number {
    // corner case
    if(left === right) return left;  // if left = right, return the number itself

    while(right > left) {
        right &= (right - 1);
    }

    return right;
}