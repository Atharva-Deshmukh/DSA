/* 628. Maximum Product of Three Numbers

You are given an integer array nums.
Find three numbers whose product is maximum and return the maximum product.

Input: nums = [1,2,-3]
Output: -6
Explanation:
The only three numbers are 1, 2, and -3, so the maximum product is 1 * 2 * -3 = -6.

Input: nums = [1,2,3,4]
Output: 24
Explanation:
The largest product comes from the three greatest numbers: 2 * 3 * 4 = 24.

Input: nums = [-1,-2,-3]
Output: -6
Explanation:
The only three numbers are -1, -2, and -3, so the maximum product is (-1) * (-2) * (-3) = -6.

Way-1: Brute force
- 3 loops

TC: O(n^3)
SC: O(1)

Way-2: Memorise approach
- Sort the array
- Max((a[n - 1] * a[n - 2] * a[n - 3]), (a[0] * a[1] * a[n - 1]));

function maxProduct(arr) {
    let n = arr.length;
    
    // Sort the array in ascending order
    arr.sort((a, b) => a - b);

    //  maximum of product of last three elements and product of first two elements and last element
    return Math.max((arr[0] * arr[1] * arr[n - 1]), (arr[n - 1] * arr[n - 2] * arr[n - 3]));
}

TC: O(nlogn)
SC: O(n)

Way-3: Single traversal
- We can get firstMax, secondMax, thirdMax, firstMin and secondMin in single traversal using approach used in third largest number problem

TC: O(n)
SC: O(1)
*/

function maxProduct(arr) {
    let n = arr.length;

    let firstMax = Number.MIN_SAFE_INTEGER;
    let secondMax = Number.MIN_SAFE_INTEGER;
    let thirdMax = Number.MIN_SAFE_INTEGER;

    let firstMin = Number.MAX_SAFE_INTEGER;
    let secondMin = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        
        /* Before updating firstMax, move value in secondMax in thirdMax, and firstMax in secondMax */
        if (arr[i] > firstMax) {
            thirdMax = secondMax;
            secondMax = firstMax;
            firstMax = arr[i];
        } else if (arr[i] > secondMax) {
            thirdMax = secondMax;
            secondMax = arr[i];
        } else if (arr[i] > thirdMax) {
            thirdMax = arr[i];
        }

        if (arr[i] < firstMin) {
            secondMin = firstMin;
            firstMin = arr[i];
        } else if (arr[i] < secondMin) {
            secondMin = arr[i];
        }
    }

    return Math.max(firstMin * secondMin * firstMax, firstMax * secondMax * thirdMax);
}

