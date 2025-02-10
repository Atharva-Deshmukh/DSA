/*
I/p[] = [1, 2, 3] 
O/p[] = [3, 2, 1]          

USING RECURSION (just 2 pointer ko recursion me likh diya)
F([1,2,3,4], 0, 3)        --> [4,3,2,1]
        \
    F([4,1,2,3], 1, 2)     --> [4,3,2,1]
            \
        F([4,3,2,1], 2, 1)  --> [4,3,2,1]

TC: O(n)
SC: O(n)
*/
function reverseRecursive(arr: number[], left: number, right: number): number[] {

    // base case
    if(left >= right) return arr;

    [arr[left], arr[right]] = [arr[right], arr[left]];
    return reverseRecursive(arr, left+1, right-1);
}

let arr: number[] = [1,2,3,4,5];
console.warn('reversed array -> ', reverseRecursive(arr, 0, arr.length-1));


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

function reverseString(s: string): string {
    if(s.length === 0) return '';

    return reverseString(s.substring(1)) + s.charAt(0);
}

let str = "abcd";
console.warn('reversed string -> ', reverseString(str));