/* Rotate array by k clockwise

Example 1:

Input: nums = [1,2,3,4,5,6,7,8], k = 4
Output: [5,6,7,8,1,2,3,4]

Explanation:
rotate 1 steps to the right: [8,1,2,3,4,5,6,7]
rotate 2 steps to the right: [7,8,1,2,3,4,5,6]
rotate 3 steps to the right: [6,7,8,1,2,3,4,5]
rotate 4 steps to the right: [5,6,7,8,1,2,3,4]

Just remeber the technique for O(1) space
*/

/* Reverse using 2 pointers */
function reverse(arr, start, end) {
    while (start < end) {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

function rotateRightByK(arr, k) {
    const n = arr.length;
    if (n === 0) return;

    k = k % n;  /* When k > n */

    // reverse last k numbers
    reverse(arr, n - k, n - 1);

    // reverse remaining elements
    reverse(arr, 0, n - k - 1);

    // reverse the entire array
    reverse(arr, 0, n - 1);
}

function rotateLeftByK(arr, k) {
    let n = arr.length;
    k = k % n;  /* When k > n */

    // Reverse the first k elements
    reverse(arr, 0, k - 1);

    // Reverse the remaining n-k elements
    reverse(arr, k, n - 1);

    // Reverse the entire array
    reverse(arr, 0, n - 1);
}