/* Stable Rearrangement of Negative Numbers (GFG: Move all Negatives to End)

Given an unsorted array having both negative and positive integers, place all negative
elements at the END of the array WITHOUT changing the relative order of the positive elements
and the negative elements. Do it in-place (the function returns nothing).

Input : [1, -1, 3, 2, -7, -5, 11, 6]
Output: [1, 3, 2, 11, 6, -1, -7, -5]

Input : [-5, 7, -3, -4, 9, 10, -1, 11]
Output: [7, 9, 10, 11, -5, -3, -4, -1]

Why the simple swap solutions (Lomuto / Hoare) of "Move Negative Numbers to One Side" FAIL here?
- they swap elements that are far apart
- to be stable we can only move elements by SHIFTING/ROTATING, never by long distance swaps

Way-1: Extra array  <-- Interview expected   TC: O(n), SC: O(n)
       Bring positives to left side and store negative nos in another a[]
       Simply overwrite/append stored negatives at the end - idx is helping us to track the last positive no

Way-2 [Hold for now Study when asked in soome interviews really - move ahead]: Divide and conquer, in-place stable partition   TC: O(n log n), SC: O(log n) recursion
       This is the follow-up "can you do it without extra O(n) space"
       - recursively make the left half  [ nonNeg_L | neg_L ]
       - recursively make the right half [ nonNeg_R | neg_R ]
       - we need [ nonNeg_L | nonNeg_R | neg_L | neg_R ]
         => only the middle two blocks "neg_L" and "nonNeg_R" must swap places
         => swap two adjacent blocks with 3 reversals (rotation):
            reverse(neg_L), reverse(nonNeg_R), reverse(whole middle)
       Merge costs O(n) per level and there are log n levels.

Why 3 reversals swap two adjacent blocks "A B" => "B A":
       [a1 a2][b1 b2]  --reverse(A)-->  [a2 a1][b1 b2]
                       --reverse(B)-->  [a2 a1][b2 b1]
                       --reverse(A B)-> [b1 b2][a1 a2]   (order inside each block is preserved)

Dry run of Way-2 on [1, -1, 3, -7, 2, 6, -5]   ( | separates [nonNeg | neg] after a merge ):

       Split till single elements: [1] [-1] [3] [-7] [2] [6] [-5]

       Merge 1: [-1] + [3]   => neg_L = [-1], nonNeg_R = [3]  => swap blocks => [3 | -1]
       Merge 2: [1] + [3 | -1] => neg_L = [], nothing to swap  => [1, 3 | -1]
       Merge 3: [-7] + [2]   => neg_L = [-7], nonNeg_R = [2]  => swap blocks => [2 | -7]
       Merge 4: [6] + [-5]   => already [6 | -5], nothing to swap
       Merge 5: [2 | -7] + [6 | -5]
                neg_L = [-7], nonNeg_R = [6] => swap blocks => [2, 6 | -7, -5]

       Final merge: [1, 3 | -1] + [2, 6 | -7, -5]

            [1, 3, -1, 2, 6, -7, -5]
                    ^^^^^^^^ middle blocks = neg_L [-1], nonNeg_R [2, 6]

            reverse(neg_L)        => [-1]            (single element, no change)
            reverse(nonNeg_R)     => [6, 2]
            reverse(whole middle) => [-1, 6, 2] => [2, 6, -1]

       result = [1, 3, 2, 6, -1, -7, -5]  => both groups kept their original order

*/

// Way-1: Extra array, O(n) time and O(n) space
function stableNegativesToEnd_ExtraSpace(a: number[]): void {
    const neg: number[] = [];
    let idx = 0;

    for (const x of a) {

        /* Bring positives to left side and store negative nos in another a[] */
        if (x >= 0) {
            a[idx] = x;
            idx++;
        }
        else neg.push(x);
    }

    /* simply overwrite/append stored negatives at the end - idx is helping us to track the last positive no */
    for (const x of neg) {
        a[idx] = x;
        idx++;
    }
}

// Way-2: Divide and conquer, O(n log n) time and O(log n) space
function reverseRange(a: number[], l: number, r: number): void {
    while (l < r) {
        [a[l], a[r]] = [a[r], a[l]];
        l++;
        r--;
    }
}

// Makes a[lo...hi-1] = [non-negatives | negatives] (stable) and returns index of first negative
function stablePartition(a: number[], lo: number, hi: number): number {
    if (hi - lo === 1) return a[lo] < 0 ? lo : hi;

    const mid = lo + Math.floor((hi - lo) / 2);

    const leftSplit = stablePartition(a, lo, mid);   // [lo, leftSplit) non-neg, [leftSplit, mid) neg
    const rightSplit = stablePartition(a, mid, hi);  // [mid, rightSplit) non-neg, [rightSplit, hi) neg

    // rotate block [leftSplit, mid) (neg_L) with block [mid, rightSplit) (nonNeg_R)
    reverseRange(a, leftSplit, mid - 1);
    reverseRange(a, mid, rightSplit - 1);
    reverseRange(a, leftSplit, rightSplit - 1);

    return leftSplit + (rightSplit - mid);
}

function stableNegativesToEnd_DivideAndConquer(a: number[]): void {
    if (a.length > 0) stablePartition(a, 0, a.length);
}
