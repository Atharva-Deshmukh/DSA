/* Given an unsorted array arr[] of size n, containing elements from the range 1 to n, 
   it is known that one number in this range is missing, and another number occurs twice 
   in the array, find the both numbers.

Input: arr[] = [2, 2]
Output: [2, 1]
Explanation: Repeating number is 2 and the missing number is 1.

Input: arr[] = [1, 3, 3] 
Output: [3, 2]
Explanation: Repeating number is 3 and the missing number is 2.

Input: arr[] = [4, 3, 6, 2, 1, 1]
Output: [1, 5]
Explanation: Repeating number is 1 and the missing number is 5.

Way-1: Map()

TC: O(n)
SC: O(1)

Way-2: Index Marking approach

- Use the input array itself to track whether each number has been visited by negating the value at its corresponding index.
- If a value is already negated when encountered again, that number is the repeating number.
- In a second pass, the index whose value remains positive corresponds to the missing number.

TC: O(n)
SC: O(1)
*/

function findTwoElement(arr) {
    let n = arr.length;

    let repeating = -1;
    for (let i = 0; i < n; i++) {
        let val = Math.abs(arr[i]);

        // If already negative, the number is repeating
        if (arr[val - 1] > 0) arr[val - 1] = -arr[val - 1];
        else repeating = val;
    }

    let missing = -1;
    for (let i = 0; i < n; i++) {
        if (arr[i] > 0) {
            missing = i + 1;
            break;
        }
    }

    return [repeating, missing];
}
