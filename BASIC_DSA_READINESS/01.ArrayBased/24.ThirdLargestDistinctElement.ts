/* 
Input: arr[] = [2, 4, 1, 3, 5]
Output: 3

Input: arr[] = [10, 2]
Output: -1

Input: arr[] = [5, 5, 5]
Output: 5
Explanation: In the array [5, 5, 5], the third largest element can be considered 5, 
             as there are no other distinct elements.

The idea is to traverse the array from start to end and to keep track of 
the three largest elements up to that index (stored in variables). 

After traversing the whole array, the variables would have stored the indices (or value) 
of the three largest elements of the array.

*/

function thirdLargest(arr)
{
    let n = arr.length;
    let first = -Infinity, second = -Infinity, third = -Infinity;

    if (n < 3) return -1;

    for (let i = 0; i < n; i++) {

        // If arr[i] is greater than first, set third to second, second to first and first to arr[i].
        if (arr[i] > first) {
            third = second;
            second = first;
            first = arr[i];
        }

        // If arr[i] is greater than second, set third to second and second to arr[i].
        else if (arr[i] > second) {
            third = second;
            second = arr[i];
        }

        // If arr[i] is greater than third, set third to arr[i].
        else if (arr[i] > third) {
            third = arr[i];
        }
    }

    // Return the third largest element
    return third;
}