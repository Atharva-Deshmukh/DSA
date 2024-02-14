/*
I/p[] = [1, 2, 3] 
O/p[] = [3, 2, 1]            In place means modifying the original array without using any additional Data structure

                                            Possible ways: 
Array Reverse Using an Extra Array (Non In-place):

Array Reverse Using a Loop (In-place):  (using 2 pointers) TC: O(n) SC: O(1)

Array Reverse Inbuilt Methods (Non In-place):  --> Input: original_array[] = {1, 2, 3} Output: array_reversed[] = {3, 2, 1}

Array Reverse Recursion (In-place or Non In-place) TC: O(n) SC: O(log(n)) due to recursion stack

Array Reverse Stack (Non In-place) TC: O(n) SC: O(n) since stack is used
*/

function reverseIterative(arr: number[] = [1,2,3,4]): number[] {
    if(arr.length <= 1) return arr;
    if(arr.length === 2) return [arr[1], arr[0]];

    // use two pointers
    let left: number = 0;
    let right: number = arr.length - 1;

    while(left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        
        left++;right--;
    }

    return arr;
}


function reverseRecursive(arr: number[] = [1,2,3,4,5], left: number = 0, right: number = arr.length-1): number[] {
    if(arr.length <= 1) return arr;
    if(arr.length === 2) return [arr[1], arr[0]];

    // base case
    if(left >= right) return arr;

    [arr[left], arr[right]] = [arr[right], arr[left]];
    return reverseRecursive(arr, left+1, right-1);
}

/*
F([1,2,3,4], 0, 3)
    F([4,1,2,3], 1, 2)
        F([4,3,2,1], 2, 1)

*/



console.warn('reversed array -> ', reverseIterative());
console.warn('reversed array -> ', reverseRecursive());