/*
I/p[] = [1, 2, 3] 
O/p[] = [3, 2, 1]            In place means modifying the original array without using any additional Data structure

                                            Possible ways: 
Array Reverse Using an Extra Array (Non In-place):

Array Reverse Using a Loop (In-place):  (using 2 pointers) TC: O(n) SC: O(1)

Array Reverse Inbuilt Array.reverse() (In-place):  --> Input: original_array[] = {1, 2, 3} Outputs SAME ARRAY: array_reversed[] = {3, 2, 1}

Array Reverse Inbuilt Array.toReversed() (Non-In-place):  --> Input: original_array[] = {1, 2, 3} Outputs NEW ARRAY: array_reversed[] = {3, 2, 1}

Array Reverse Recursion (In-place or Non In-place) TC: O(n) SC: O(log(n)) due to recursion stack

Array Reverse Stack (Non In-place) TC: O(n) SC: O(n) since stack is used */

/* USING RECURSION (just 2 pointer ko recursion me likh diya)
F([1,2,3,4], 0, 3)        --> [4,3,2,1]
        \
    F([4,1,2,3], 1, 2)     --> [4,3,2,1]
            \
        F([4,3,2,1], 2, 1)  --> [4,3,2,1]
*/
function reverseRecursive(a: number[], left: number, right: number): number[] {
    if(arr.length <= 1) return arr;
    if(arr.length === 2) return [arr[1], arr[0]];

    // base case
    if(left >= right) return arr;

    [arr[left], arr[right]] = [arr[right], arr[left]];
    return reverseRecursive(arr, left+1, right-1);
}

let arr: number[] = [1,2,3,4,5];
console.warn('reversed array -> ', reverseRecursive(arr, 0, arr.length-1));


/* USING RECURSION (just 2 pointer ko recursion me likh diya)
THIS RETURNS a 
string hai to concatenate karne ka

    f(abcd)        --> dcba
        \
       f(bcd)      --> dcb 
          \
         f(cd)      --> dc  
            \
            f(d)    --> d    
              \
              f("") --> ""
 
*/
function reverseRecursiveString(s: string): string {
    if(s === ""){
        return "";
      }
      return reverseRecursiveString(s.substring(1)) + s.charAt(0);
}

let str = "abcd";
console.warn('reversed string -> ', reverseRecursiveString(str));