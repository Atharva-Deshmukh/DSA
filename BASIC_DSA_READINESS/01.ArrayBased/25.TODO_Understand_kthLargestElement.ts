/* 215. Kth Largest Element in an Array

Given an integer array nums and an integer k, return the kth largest element in the array.
Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 
Constraints:
    1 <= k <= nums.length <= 10^5
    -104 <= nums[i] <= 10^4

Way-1: Sorting
- Sort in descending order 
- Return the element at the index K - 1 (zero-based indexing).

Way-2: QuickSelect
- In QuickSort, we pick a pivot element, then move the pivot element to its correct position and partition 
  the surrounding array. 
- The idea is, not to do complete quicksort, but stop at the point where pivot itself is k'th largest element. 
- Also, not to recur for both left and right sides of pivot, but recur for one of them according to the position of pivot. 

Step-by-step approach:
- k is the rank counted from the top (1-based)
- Pick a random pivot from the array.
- Partition the array into three parts:
    bigger[]: Has all Elements greater than the pivot.
    same[]: Has all Elements equal to the pivot.
    smaller[]: Has all Elements less than the pivot.

INTUITION: think of a leaderboard
- "k-th largest" means rank k from the top. Rank 1 is the biggest and rank 2 is the second biggest.
- After you split the array around a pivot, the three buckets are already in rank order. 
- Everything in bigger beats the pivot, and the pivot beats everything in smaller.

Rank:   1 ............ B  |  B+1 ....... B+S  |  B+S+1 ...... n
        [   bigger       ] [   same (pivot)  ] [   smaller     ]

        B = bigger.length
        S = same.length

- If bigger[] has 5 numbers, they take ranks 1 to 5
  If you want rank 3, then 3 <= 5, so rank 3 is somewhere inside bigger[]

- Condition-1 => Check if k <= bigger.length --> then search into bigger

- Say bigger[] has 2 numbers and same[] has 1, so ranks 1 to 3 are used up. 
  If you want rank 5, then 5 > 3, so it must be in smaller[]

- Condition-2 => If k > bigger.length + same.length --> then adjust k and search into smaller[]

- If(B < k < B + S), it is in the same[]. Same[] has all equal values and all are = pivot, so the answer is the pivot.

- Condition-3 => Otherwise, return the pivot (it’s the k-th largest element)

Time: O(n) average, O(n^2) worst | Space: O(n) because of the filtered arrays
(The in-place partition version uses O(1) space but is harder to read.)

*/

function findKthLargest(nums: number[], k: number): number {
    const pivot = nums[Math.floor(Math.random() * nums.length)];

    const bigger = nums.filter(x => x > pivot);
    const same = nums.filter(x => x === pivot);
    const smaller = nums.filter(x => x < pivot);

       // Recursive selection
    if (k <= bigger.length) return findKthLargest(bigger, k);
    if (k > bigger.length + same.length) return findKthLargest(smaller, k - bigger.length - same.length);

    /*
        1 ............ B  |  B+1 ....... B+S  |  B+S+1 ...... n
                                                        |
                                                        k
        Converting k to 0 based wrt smaller[] = k - (bigger.length + same.length)
    */

    // Return pivot as the k-th largest
    return pivot;
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4


/* Iterative approach: To avoid filter()

Why the "<= pivot | > pivot" partition gives TLE
- With many equal elements, all of them go to one side, so the range shrinks by only 1 each round -> O(n^2).

Fix: Hoare-style partition that STOPS on elements equal to the pivot (on both sides) and swaps them.
Equal elements get spread across both halves, so the split stays balanced even for all-equal arrays.
- left / right = the range we are still searching (only these two define the range)
- i / j        = scanners moving towards each other inside the range
- Ascending order, so the k-th largest is at index n - k.

After the scan ends (i > j), the array looks like:
    [left .. j] <= pivot  |  [j+1 .. i-1] == pivot (already in place)  |  [i .. right] >= pivot
    target <= j  -> answer in the left part   -> right = j
    target >= i  -> answer in the right part  -> left = i
    otherwise    -> target is in the middle, where every value equals the pivot -> done
*/
function findKthLargest(nums: number[], k: number): number {
    const target = nums.length - k;
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {

        /* The random pivot must be picked in EVERY iteration */
        const pivot = nums[left + Math.floor(Math.random() * (right - left + 1))];

        let i = left, j = right;
        while (i <= j) {
            while (nums[i] < pivot) i++;   /* stops at an element >= pivot */
            while (nums[j] > pivot) j--;   /* stops at an element <= pivot */

            if (i <= j) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
                j--;
            }
        }

        /* 
            When the scan stops, i and j have crossed (i > j). The array range looks like this:

            index:   left ........ j | (j+1 .. i-1) | i ........ right
            value:   all <= pivot    |  == pivot     |  all >= pivot
                     [ LEFT part ]     [ MIDDLE ]      [ RIGHT part ]

            target <= j → the target index is in the LEFT part. 
            The answer is in [left..j], so set right = j. Everything to the right is irrelevant.

            target >= i → the target index is in the RIGHT part. The answer is in [i..right], so set left = i. 
            Everything to the left is irrelevant.

            Otherwise (j < target < i) → the target is in the MIDDLE. 
            Those elements all equal the pivot, so nums[target] is already correct and we break.
        */

        if (target <= j) right = j;
        else if (target >= i) left = i;
        else break;
    }

    return nums[target];
}