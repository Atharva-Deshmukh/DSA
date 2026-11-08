/* Move Negative Numbers to One Side (order of elements does NOT matter)

Given an array of integers, rearrange it in-place so that all negative numbers
come before all non-negative numbers.

Input:  [-12, 11, -13, -5, 6, -7, 5, -3, -6]
Output: [-12, -6, -13, -5, -3, -7, 5, 6, 11]   (any arrangement with negatives first is valid)

Note: 0 is treated as non-negative.
      If the question asks for negatives at the END, just flip the condition.

Way-1: 
    Brute force => Sort the array
    negatives automatically come first.
    TC: O(n log n), SC: O(1)

Way-2: 
       Extra array => collect negatives, then non-negatives
       TC: O(n), SC: O(n)

Way-3: Quick Sort partitions (Lomuto)

       both pointers are on left
       j = boundary, everything before j is negative
       i = scanner, if a[i] < 0 => swap(a[i], a[j]) and j++
       TC: O(n), SC: O(1)
       Does a swap for every negative, even when i === j (useless swap)

Way-4: Quick Sort partitions (Hoare) <-- Interview expected

       both pointers are on opposite ends
       l stops at a positive element, r stops at a negative element, swap them.
       TC: O(n), SC: O(1)
       Swaps only misplaced pairs, so fewer swaps than Lomuto.

       (this is exactly the partition step of quick sort, with "< 0" as the pivot condition,
        same idea as Segregate 0s and 1s / Even and Odd numbers)

Dry run of Way-4:
         0    1   2    3   4   5   6   7
a = [  -12,  11, -13, -5,  6, -7,  5, -3 ]
              l                         r      l skips -12, stops at 11 (non-negative)
                                               r is already at -3 (negative) => swap

         0    1   2    3   4   5   6   7
a = [  -12,  -3, -13, -5,  6, -7,  5,  11 ]
                  l                r           l = l + 1, r = r - 1 after the swap

         0    1   2    3   4   5   6   7
a = [  -12,  -3, -13, -5,  6, -7,  5,  11 ]
                          l   r                l skips -13, -5 and stops at 6 (non-negative)
                                               r skips 5 and stops at -7 (negative) => swap

         0    1   2    3   4   5   6   7
a = [  -12,  -3, -13, -5, -7,  6,  5,  11 ]
                          r   l                l > r (crossed) => done, all negatives are on the left

*/

// Way-3: Lomuto style
function moveNegatives_Lomuto(a: number[]): void {
    let j = 0; // a[0...j-1] are all negative

    for (let i = 0; i < a.length; i++) {
        if (a[i] < 0) {
            [a[i], a[j]] = [a[j], a[i]];
            j++;
        }
    }
}

// Way-4: Hoare style two pointers (optimal)
function moveNegatives_TwoPointers(a: number[]): void {
    let l = 0, r = a.length - 1;

    while (l < r) {
        while (l < r && a[l] < 0) l++;   // stop at first non-negative from left
        while (l < r && a[r] >= 0) r--;  // stop at first negative from right

        if (l < r) {
            [a[l], a[r]] = [a[r], a[l]];
            l++;
            r--;
        }
    }
}
