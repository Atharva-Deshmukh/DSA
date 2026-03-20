/* 27. Remove Element

You are given an integer array nums and an integer val. 
Your task is to remove all occurrences of val from nums in-place.

After removing all occurrences of val, return the number of remaining 
elements, say k, such that the first k elements of nums do not contain val.

Note:
The order of the elements which are not equal to val does not matter.
It is not necessary to consider elements beyond the first k positions of the array.
To be accepted, the first k elements of nums must contain only elements not equal to val.
Return k as the final result.

Input: nums = [1,1,2,3,4], val = 1
Output: [2,3,4]
Explanation: You should return k = 3 as we have 3 elements which are not equal to val = 1.

Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: [0,1,3,0,4]
Explanation: You should return k = 5 as we have 5 elements which are not equal to val = 2.

Constraints:
    0 <= nums.length <= 100
    0 <= nums[i] <= 50
    0 <= val <= 100


Approach:
- Since we require in-place solution, we can think of swapping the non-val elements

SWAP-RIGHT (basically bring vals to right side)
- Initialise a pointer to right = n - 1
- if(a[left] === val) swap(a[left], a[right])
  left++, right--
- But, order of non-vals is disturbed this way

SWAP-LEFT (bring all non-vals to left side)
- Initialise left = 0
- if(a[left] !== val) swap(a[left], a[i])
  i++
  left++

return left finally

DRY RUN:

a = [1,1,2,3,4], val = 1

i = 0
l = 0

    0  1  2  3  4
    [1, 1, 2, 3, 4]
    i
    l

    a[i] === val --> i++

i = 1
l = 0

    0  1  2  3  4
    [1, 1, 2, 3, 4]
     l  i

    a[i] === val --> i++

i = 2
l = 0

    0  1  2  3  4
    [1, 1, 2, 3, 4]
     l     i

    a[i] !== val
        swap(a[l], a[i])
        l++
        i++

i = 3
l = 1

     0  1  2  3  4
    [2, 1, 1, 3, 4]
        l     i

    a[i] !== val
        swap(a[l], a[i])
        l++
        i++

i = 4
l = 1

     0  1  2  3  4
    [2, 3, 1, 1, 4]
           l     i

    a[i] !== val
        swap(a[l], a[i])
        l++
        i++

i = 5 -> STOP!
l = 1

     0  1  2  3  4
    [2, 3, 4, 1, 1]
              l      i

    a[i] !== val
        swap(a[l], a[i])
        l++
        i++

TC: O(n)
SC: O(1) */

function removeOccurrence(a: number[], val: number): number {
    let l = 0;
    const n = a.length;

    for(let i = 0; i < n; i++) {
        if(a[i] !== val) {
            [a[l], a[i]] = [a[i], a[l]];
            l++;
        }
    }

    return l;
}