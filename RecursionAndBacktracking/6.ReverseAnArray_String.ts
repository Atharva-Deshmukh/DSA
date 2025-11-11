/* Way-1: using a second array (NOT IN PLACE)

        Keep removing arr[0] and keep shrinking the array from starting
        Now, when arr = [] return [] to previous function
        concatenate arr[0] to the returned value from functionalRecursion

        F([1, 2, 3])       -> return [3, 2].concat(1) -> [3, 2, 1]
              \ 
            F([2, 3])      -> return [3].concat(2) -> [3, 2]
                \ 
                F([3])     -> return [].concat(3) -> [3]
                    \ 
                    F([])  -> return []

 */
function reverseArray(arr: number[]): number[] {
    if(arr.length === 0) return [];
    else return reverseArray(arr.slice(1)).concat(arr[0]);
}

console.log(reverseArray([1, 2, 3]));
console.log(reverseArray([1, 2, 3, 4, 5, 6]));


/* Way-2: In-place using recursion

    If we were to do this iteratively, we would use 2 pointers, swap the pointers till both pointers 
    are at same position.
    We will do the same recursively
*/
function reverseArray(arr: number[], low: number, high: number): void {
    if(low > high) {
        console.log(arr);
        return;
    }
    else {
        [arr[low], arr[high]] = [arr[high], arr[low]];
        reverseArray(arr, low + 1, high - 1);
    }
}

reverseArray([1, 2, 3], 0, 2);
reverseArray([1, 2, 3, 4, 5, 6], 0, 5);


/* We cannot use 2 pointers recursion since string is immutable in JS

We will recurse till last and start concatenate elments from last

                                         ^
    f(abcd)        --> dcba              |
        \
       f(bcd)      --> dcb               |
          \
         f(cd)      --> dc               |
            \
            f(d)    --> d                | 
              \                          
              f("") --> ""               |

                        Move up after hitting the base case


- Keep moving to the end of the string and simultaneously shrinking string from left
  and once we encountered end
- append substring[0] to string got from previous recursion  */

function reverseString(str: string): string {
   if(str.length === 0) return "";
   else return reverseString(str.slice(1)).concat(str.charAt(0));
}