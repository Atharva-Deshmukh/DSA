/* 658. Find K Closest Elements

Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. 
The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:
    |a - x| < |b - x|, or
    |a - x| == |b - x| and a < b
 
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]

Input: arr = [1,1,2,3,4,5], k = 4, x = -1
Output: [1,1,2,3]

Constraints:
    1 <= k <= arr.length
    1 <= arr.length <= 10^4
    arr is sorted in ascending order.
    -10^4 <= arr[i], x <= 10^4


GFG Variant:
------------

An element a is closer to x than b if:
    |a - x| < |b - x|, or
    |a - x| == |b - x| and a > b (i.e., prefer the larger element if tied)


Way-1: Custom Sorting
- Let's understand sort() first

    let a = [4, 5, 2, 3, 6];

    console.log(a.sort((a, b) => a - b)); // [2, 3, 4, 5, 6] --> a - b is standard way for ascending order sorting
    console.log(a.sort((a, b) => b - a)); // [6, 5, 4, 3, 2] 

    When a < b ==> a - b < 0, The smaller number stays first. 
    When a > b ==> a - b > 0, The bigger number gets pushed back.

- The idea is to use the math.abs(val - target) to measure how close they are. 
- Then, we apply custom sorting: elements with smaller differences come first, and in case of a tie, the larger element is preferred. 
- We take the k elements from custom sorted array then return it.

function findKClosest(arr, k, x) {

    // Custom sort using absolute difference and tie-breaking
    arr.sort((a, b) => {
        let diffA = Math.abs(a - x);
        let diffB = Math.abs(b - x);

        if (diffA === diffB) return b - a; // prefer larger element
        return diffA - diffB;              // otherwise: smaller distance first
    });

    let result = [];
    let count = 0;

    // Pick first k elements not equal to x
    for (let num of arr) {
        if (num === x) continue;
        result.push(num);
        count++;
        if (count === k) break;
    }

    return result;
}

TC: O(nlogn)
SC: O(n)

Way-2: Binary search approach since array is sorted
- The idea is to first use binary search to quickly find the last element < target.
- Then, we use a two-pointer approach to select the k closest elements, following the tie-breaking rules.

TC:  O(logn)    +    O(k)     = O(logn + k)
    BinSearch      2-pointer

SC: O(k) for res[]
*/

function findKClosest_GfgVersion(arr, k, x) {
    let n = arr.length;
    let low = 0, high = n - 1, pos = -1;

    // Binary search to find last element less than x
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] < x) {
            pos = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    let left = pos, right = pos + 1;
    
    // If value at right index is x, increment 
    if (right < n && arr[right] === x) right++;
    
    let res = [];
    
    // Use two-pointer technique to pick k closest elements
    while (left >= 0 && right < n && res.length < k) {
        let leftDiff = Math.abs(arr[left] - x);
        let rightDiff = Math.abs(arr[right] - x);
        
        if (leftDiff < rightDiff) {
            res.push(arr[left]);
            left--; /* explore further smaller diffs */
        }
        else {
            res.push(arr[right]);
            right++; /* explore further smaller diffs */
        }
    }
    
    // If k elements are not filled right is exhausted
    while (left >= 0 && res.length < k) {
        res.push(arr[left]);
        left--;
    }
    
    // If k elements are not filled left is exhausted
    while (right < n && res.length < k) {
        res.push(arr[right]);
        right++;
    }
    
    return res;
}

function findKClosest_LcVersion(arr, k, x) {
    let n = arr.length;
    let low = 0, high = n - 1, pos = -1;

    // Binary search to find last element less than x
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] < x) {
            pos = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    let left = pos, right = pos + 1;
    
    // GFG excludes x from the answer. LeetCode includes it, since x is the closest element (distance 0).
    // if (right < n && arr[right] === x) right++;
    
    let res = [];
    
    // Use two-pointer technique to pick k closest elements
    while (left >= 0 && right < n && res.length < k) {
        let leftDiff = Math.abs(arr[left] - x);
        let rightDiff = Math.abs(arr[right] - x);
        
        /* LeetCode wants the smaller element on a tie, so use <= */
        if (leftDiff <= rightDiff) {
            res.push(arr[left]);
            left--; /* explore further smaller diffs */
        }
        else {
            res.push(arr[right]);
            right++; /* explore further smaller diffs */
        }
    }
    
    // If k elements are not filled right is exhausted
    while (left >= 0 && res.length < k) {
        res.push(arr[left]);
        left--;
    }
    
    // If k elements are not filled left is exhausted
    while (right < n && res.length < k) {
        res.push(arr[right]);
        right++;
    }
    
    /* sort the result */
    return res.sort((a, b) => a - b);
}

