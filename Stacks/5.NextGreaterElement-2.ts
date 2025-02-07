/* Find next greater element in circular direction


Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number. 
The second 1's next greater number needs to search circularly, which is also 2.

Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]

              0  1  2  3  4  5  6  7  8  9
circular[] = [1, 2, 3, 4, 3, 1, 2, 3, 4, 3]   n = ((2*n) - 1) = ((2*5) - 1)

For non-circular, single array, we would go from i --- n - 1 to check for NGE.
But for a circular array, 
 if i = 0: 0 --- 5  (after rotation, till 1 only)
    i = 1: 1 --- 6  (after rotation, till 2 only)
    i = 2: 2 --- 7  (after rotation, till 3 only)
    .
    .
    i = 4: 4 --- 9  (after rotation, till 9 only)   so we go till (i + n)th index for every i

    But we don't actually need to double the array in this way to simulate circular array
    bcoz here we need extra space 

    We can double it using the concept of circular array indexes

                  0  1  2  3  4 
    circular[] = [1, 2, 3, 4, 3]  (n = 5)

    i = 0: (0 % 5) = 0
    i = 1: (1 % 5) = 1
    i = 2: (2 % 5) = 2
    i = 3: (3 % 5) = 3
    i = 4: (4 % 5) = 4
    i = 5: (5 % 5) = 0
    i = 6: (6 % 5) = 1
    i = 7: (7 % 5) = 2
    i = 8: (8 % 5) = 3
    i = 9: (9 % 5) = 4

Brute force:
- We can use (i % n) above and traverse the array twice for every i

        So, use two loops, outer loop --> [0---(n-1)]
                           inner loop --> [(i+1) -- i] the next i basically

TC: O(n ^ 2)
SC: O(1)

NGE approach using stack:
- we will simply imagine a doubled array but here is a twist
                0  1  2  3  4  5  6  7  8  9
  circular[] = [1, 2, 3, 4, 3, 1, 2, 3, 4, 3]   n = ((2*n) - 1) = ((2*5) - 1)

-  we will use stack and though we will iterate from [((2n) - 1) -- 0] just like we do for normal 
   array from [(n - 1) -- 0] but while storing elements, we will push a[(i % n)] since we are not 
   doubling the array actually, just simulating it
   wherever a[i] is there, do a[(i % n)]

- IMPORTANT LINE
  if(i < n) ans[i] = (!stack.isStackEmpty())? stack.top(): -1;

  fill ans[i] only when i < n, else we will end up stack with duplicates
  the iteration from (2n-1 -- 0) is just to know the elements greater than the current element
  and fill the stack accordingly

TC: O(2 * n)
SC: O(n) for stack */

import { Stack } from "./Impementation/stack_using_class_number";

function nextGreaterElements(a: number[]): number[] {
  let n: number = a.length;

if(n === 0) return [];
if(n === 1) return [-1];

let ans: number[] = Array(n);
let stack = new Stack(n);

for(let i = ((2 * n) - 1);  i >= 0; i--) {
while((!stack.isStackEmpty()) && (stack.top() <= a[(i % n)])) stack.pop();

if(i < n) ans[i] = (!stack.isStackEmpty())? stack.top(): -1;

stack.push(a[(i % n)]);
}

return ans;
}