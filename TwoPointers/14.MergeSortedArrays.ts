/*                                          Type - 1 => Use the same two input arrays
                                            -----------------------------------------

Input: a[] = [2, 4, 7, 10], b[] = [2, 3]
Output: a[] = [2, 2, 3, 4], b[] = [7, 10] 

Input: a[] = [1, 5, 9, 10, 15, 20], b[] = [2, 3, 8, 13]
Output: a[] = [1, 2, 3, 5, 8, 9], b[] = [10, 13, 15, 20]

                                            BRUTE FORCE
                                            -----------

- We can use an extra array to store the merged array
- then copy merged.splice(0, a.length) into a[] and merged.splice(a.length, b.length) to b[]

But we are using an extra space here, we need to avoid this

                                           Better Approach
                                           ---------------
                                    
- We just need to swap the rightmost element in a[] with leftmost element in b[], 
  then second rightmost element in a[] with second leftmost element in b[] and so on. 
  This will continue until the selected element from a[] is larger than selected element from b[].
- Now sort both the arrays to maintain the order.

       0  1  2  3           0  1
a[] = [2, 4, 7, 10], b[] = [2, 3]
                 i          j

        a[i] > b[j] -> b[j] should be in a[] -> swap(a[i], b[j])

       0  1  2  3           0  1
a[] = [2, 4, 7, 2], b[] = [10, 3]
             i                 j

        a[i] > b[j] -> b[j] should be in a[] -> swap(a[i], b[j])

       0  1  2  3           0  1
a[] = [2, 4, 3, 2], b[] = [10, 7]
          i                        j -> j crosses n2

       sort a[] and b[]

    a = [2, 2, 3, 4]
    b = [7, 10] 
    
TC: O(min(n1, n2)) + O(n1 * log(n1)) + O(n2 + log(n2))
SC: O(1)  */

function mergeArrays(a, b) {
    let i = a.length - 1;
    let j = 0;

    // Swap smaller elements from b[] with larger elements from a[]
    while ((i >= 0) && (j < b.length)) {
        if (a[i] < b[j]) {
            i--;
        } else {
            [a[i], b[j]] = [b[j], a[i]];
            i--;
            j++;
        }
    }

    // Sort both arrays
    a.sort((x, y) => x - y);
    b.sort((x, y) => x - y);
}

/*                                             BEST APPROACH FOR TYPE-1
                                               ------------------------ 
                                       Gap Method to merge two sorted arrays

But There is a slight difference to note about how the gap is calculated in shell sort and here in this problem

                                                    Floor vs ceil for gap
                                                    ---------------------

Classical Shell Sort loop --> for(gap = Math.floor(n/2); gap >= 1; gap = Math.floor(gap/2)) 

But we won't use this floor() in our method because it skips some iterations.

Ex: m + n = 10:
    floor(gap/2)	5 → 2 → 1
    ceil(gap/2)	    5 → 3 → 2 → 1

Notice: floor skips gap = 3 entirely — it jumps straight from 5 to 2. 
        ceil never skips an intermediate value like that.

Algo:
- Treat a[] and b[] as one single virtual array of size (m + n).
- Start with gap = ceil((m + n) / 2).
- Repeat the following steps while gap > 0 (basically stop after gap = 1 iteration is processed):

  => left = 0, right = left + gap
  => Run a while loop while right < (m + n) and left++; right++
  => Inside the loop, there are 3 cases depending on where left/right fall:

     1. Both left and right are inside a[]
        if (a[left] > a[right]) -> swap(a[left], a[right])

     2. left is inside a[], right is inside b[]
        if (a[left] > b[right - m]) -> swap(a[left], b[right - m])

     3. Both left and right are inside b[]
        if (b[left - m] > b[right - m]) -> swap(b[left - m], b[right - m])

  => Once the inner while loop ends (right has reached m + n), recompute gap = ceil(gap / 2) and start the next pass.


                                How index conversion logic works
                                ---------------------------------

     0  1  2  3         0  1  2
a = [1, 4, 7, 8]   b = [2, 3, 9]

Virtual array (size = m + n = 7):

             0  1  2  3  4  5  6
virtual[] = [1, 4, 7, 8, 2, 3, 9]
            |----a----|  |--b--|

                                When right crosses into b[]:
                                ----------------------------

If right is at index 4 in the virtual array -> Its actually index 0 in b[]
If right is at index 5 in the virtual array -> Its actually index 1 in b[]
If right is at index 6 in the virtual array -> Its actually index 2 in b[]

Pattern => virtualArrIndex - a.length = bIndex
                    right  - m        = bIndex

                                When left crosses into b[]:
                                ---------------------------

If left is at index 4 in the virtual array -> Its actually index 0 in b[]
If left is at index 5 in the virtual array -> Its actually index 1 in b[]
If left is at index 6 in the virtual array -> Its actually index 2 in b[]

Pattern => left - m = bIndex

This is why case 3 (both pointers inside b[]) uses b[left - m] and b[right - m] —left and right are still virtual-array indices, 
so both need the same "- m" conversion to map them to actual positions inside b[].


*/

function mergeArrays(a, b) {
    let m = a.length; 
    let n = b.length;
    let gap = Math.ceil((m + n) / 2);

    while (gap > 0) {
        let left = 0, right = left + gap;

        while (right < (m + n)) {

            // both pointers inside a[]
            if ((left < m) && (right < m) && (a[left] > a[right])) {
                [a[left], a[right]] = [a[right], a[left]];
            }

            // left inside a[], right inside b[]
            else if ((left < m) && (right >= m) && (a[left] > b[right - m])) {
                [a[left], b[right - m]] = [b[right - m], a[left]];
            }

            // both pointers inside b[]
            else if ((left >= m) && (b[left - m] > b[right - m])) {
                [b[left - m], b[right - m]] = [b[right - m], b[left - m]];
            }

            left++;
            right++;
        }

        // the gap = 1 pass just ran above; stop here, otherwise ceil(1/2) keeps giving 1 forever
        if (gap === 1) break;

        // shrink gap for the next pass
        gap = Math.ceil(gap / 2);
    }
}

/*
TC: O(log(m + n) * (m + n)) — inner while loop covers close to all elements each pass, not always exactly
SC: O(1)
*/

/*                                         Type - 2: first array has extra space for second array
                                            -----------------------------------------------------
                                                   88. Merge Sorted Array

Change: nums1 has a length of m + n, 
nums1 has first m elements + space to store n elements (0 initially)

Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].

Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure 
the merge result can fit in nums1.
 
Constraints:
    nums1.length == m + n
    nums2.length == n
    0 <= m, n <= 200
    1 <= m + n <= 200
    -10^9 <= nums1[i], nums2[j] <= 10^9


BEST APPROACH: 3-Pointer technique (not the gap method)

- a[] has trailing empty slots (all zeros) reserved exactly for n elements from b[],
  so we fill a[] starting from the back — this avoids ever overwriting existing values of a[]

- p1 -> last valid element in a[] (index m - 1)
- p2 -> last element in b[] (index n - 1)
- p  -> last index of the merged array (index m + n - 1)

- At each step, place the larger of a[p1] and b[p2] at a[p], then move that pointer and p back by 1.

- Once p2 < 0, a[] is already fully in order (its own elements never needed moving),
  so we can stop. If p1 < 0 first, the remaining b[] elements are copied as-is.

TC: O(m + n) — single backward pass, each element placed exactly once
SC: O(1) — merges in-place within a[]

*/

function merge(a: number[], m: number, b: number[], n: number): void {
    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;

    while (p2 >= 0) {
        if ((p1 >= 0) && (a[p1] > b[p2])) {
            a[p] = a[p1];
            p1--;
        } else {
            a[p] = b[p2];
            p2--;
        }
        p--;
    }
};