/* Longest Increasing Subarray

Given an array arr[] of integers, find the longest contiguous subarray in which each element is strictly greater than the one before it. 
If multiple subarrays have the same maximum length, return the first one.

Input: arr[] = [5, 6, 3, 5, 7, 8, 9, 1, 2]
Output: [3, 5, 7, 8, 9]
Explanation: here the subarray arr[2:6] = [3, 5, 7, 8, 9] is the longest subarray to follow a strictly increasing order.

Input: arr[] = [12, 13, 1, 5, 4, 7, 8, 10, 10, 11]
Output: [4, 7, 8, 10]
Explanation: here the subarray arr[4:7] = [4, 7, 8, 10] is the longest subarray to follow a strictly increasing order.

Way-1: Brute force
- Try every subarray and store max one

TC: O(n^2)
SC: O(1)

Way-2: Single traversal Kadane-like approach
- Whenver the increasing order breaks, start new subarray from there
 
                    0  1  2  3  4  5  6  7  8
    Input: arr[] = [5, 6, 3, 5, 7, 8, 9, 1, 2]

    Start traversing and maintain a current increasing subarray:

    Start from index 0 -> current = [5]
    At index 1 (6 > 5) -> current = [5, 6]
    At index 2 (3 <= 6) -> break, start new subarray -> current = [3]
    At index 3 (5 > 3) -> current = [3, 5]
    At index 4 (7 > 5) -> current = [3, 5, 7]
    At index 5 (8 > 7) -> current = [3, 5, 7, 8]
    At index 6 (9 > 8) -> current = [3, 5, 7, 8, 9]
    At index 7 (1 <= 9) -> break, start new subarray -> current = [1]
    At index 8 (2 > 1) -> current = [1, 2]
    The longest subarray found is [3, 5, 7, 8, 9]

TC: O(n)
SC: O(1)

*/

function longIncSubArr(arr) {
    let n = arr.length;

    let start = 0, bestStart = 0, maxLen = 1;

    for (let i = 1; i < n; i++) {

        /* If current value is decreasing from previous one, start a new subarray from here*/
        if (arr[i] <= arr[i - 1]) start = i;

        /* Else keep calulating and updating length of current increasing subarray */
        let currLen = i - start + 1;

        /* Using strict > (not >=) means that on ties the first subarray is kept */
        if (currLen > maxLen) {
            maxLen = currLen;
            bestStart = start; // the current run's start becomes the best run's start
        
            /* The run [3,5,7,8,9] begins at start = 2, and its length reaches 5 at i = 6. 
               So maxLen = 5 and bestStart = 2.
               At i = 7, start resets to 7, and later runs never exceed length 5, so bestStart stays 2.
               The final result is arr.slice(2, 2 + 5) = [3, 5, 7, 8, 9].
            
            */
        
        }
    }

    return arr.slice(bestStart, bestStart + maxLen);
}