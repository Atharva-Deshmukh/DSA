/* Type - 1 => Shuffle the same two input arrays

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
SC: O(1) 

Here, we need to again sort both the arrays, this can be avoided using gap method, which is 
taken from the shell sort */

function mergeArrays(a, b) {
    let i = a.length - 1;
    let j = 0;

    // Swap smaller elements from b[] with larger elements from a[]
    while (i >= 0 && j < b.length) {
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

/* Gap Method to merge two sorted arrays

But There is a slight difference to note about how the gap is calculated in shell sort and here in this problem

                                        Why Shell Sort Often Uses floor?
                                        --------------------------------

In classical Shell Sort, the loop is usually: for (gap = n/2; gap > 0; gap = Math.floor(gap/2))

Since the condition is gap > 0, even if we reach 1 via floor -> 5 → 2 → 1 → 0

The gap = 1 iteration still runs. So Shell sort does not miss the final pass when gap = 1

                                        Why Gap Merge Prefers ceil ?
                                        ----------------------------

In merge-gap implementations:
The algorithm typically stops once gap = 1 is processed.
Using ceil ensures the sequence always includes 1 before termination.

Example for n+m = 10:

Step	Gap (ceil)
1	     5
2	     3
3	     2
4	     1

This ensures progressive shrinking without skipping important comparisons.

Algo:
- Assume that two arrays are virtually single array, gap = ceil((n + m)/2 )
- Until the gap > 1, perform the following operations:
  => left = 0, right = left + gap
  => Run a while loop until right is less than len (n + m).
  => Their are 3 different cases inside this while loop:

     1. When both the left and right pointers are in the a[]. 
        if (a[left] > a[right]) -> swap(a[left], a[right])

     2. When the left pointer is in a[] and right pointer is in b[]
        if (a[left] > a[right]) -> swap(a[left], b[right - m])

     3. When both the left and right pointers are in the b[]
        if (b[left - m] > b[right - m]) -> swap (b[left - m], b[right - m])

- If the right pointer reaches the end i.e. m + n, decrement the gap value by ceil(gap/2).


                                    How index conversion logic works?
                                    ---------------------------------

     0  1  2  3         0  1  2
a = [1, 4, 7, 8]   b = [2, 3, 9]

Virtual array (size = n + m = 7):
 
             0  1  2  3  4  5  6
virtual[] = [1, 4, 7, 8, 2, 3, 9]
            |----a----|  |--b--|


If right pointer is at index 4 in combined array,
in b[], it will be at 0

If right pointer is at index 5 in combined array,
in b[], it will be at 1

If right pointer is at index 6 in combined array,
in b[], it will be at 2

So Pattern => virutalArrIndex - a.length = bIndex
                      right-m = bIndex


*/

function mergeArrays(a, b) {
    let n = a.length;
    let m = b.length;
    let gap = Math.ceil((n + m) / 2);

    while (gap > 0) {
        let i = 0, j = gap;

        while (j < (n + m)) {

            // both pointers in a[]
            if (i < n && j < n && a[i] > a[j]) {
                [a[i], a[j]] = [a[j], a[i]];
            }

            // i in a[], j in b[]
            else if (i < n && j >= n && a[i] > b[j - n]) {
                [a[i], b[j - n]] = [b[j - n], a[i]];
            }

            // both in b[]
            else if (i >= n && b[i - n] > b[j - n]) {
                [b[i - n], b[j - n]] = [b[j - n], b[i - n]];
            }

            i++;
            j++;
        }

        // When gap == 1, after processing it we should break (otherwise ceil(1/2) becomes 1 forever).
        if (gap === 1) break;

        // Calculate the next gap
        gap = Math.ceil(gap / 2);
    }
}

/*
TC: O(log(m + n) * (m + n)) as inner while loop covers mostly full elements, not always though
SC: O(1)
*/

/* Type - 2: 88. Merge Sorted Array

You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, 
and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, 
but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, 
where the first m elements denote the elements that should be merged, and the last n elements 
are set to 0 and should be ignored. nums2 has a length of n.

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


We can use above gap based solution to merge two arrays in sorted order by just shuffling elements
In the last, we can just copy all elements for b[] to a[]

*/

function merge(a: number[], m: number, b: number[], n: number): void {
    let gap = Math.ceil((m + n) / 2);

    while (gap > 0) {
        let i = 0, j = gap;

        while (j < m + n) {

            // both pointers in a[]
            if (i < m && j < m && a[i] > a[j]) {
                [a[i], a[j]] = [a[j], a[i]];
            }

            // i in a[], j in b[]
            else if (i < m && j >= m && a[i] > b[j - m]) {
                [a[i], b[j - m]] = [b[j - m], a[i]];
            }

            // both in b[]
            else if (i >= m && b[i - m] > b[j - m]) {
                [b[i - m], b[j - m]] = [b[j - m], b[i - m]];
            }

            i++;
            j++;
        }

        if (gap === 1) break;
        gap = Math.ceil(gap / 2);
    }

    // copy b into remaining space of a
    for (let i = 0; i < n; i++) {
        a[m + i] = b[i];
    }
};