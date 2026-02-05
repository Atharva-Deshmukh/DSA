/*
Input: arr[] = [1, 3, 2, 4]
Output: [3, 4, 4, -1]

Explanation: The next larger element to 1 is 3, 3 is 4, 2 is 4 and for 4, 
since it doesn’t exist, it is -1.


Input: arr[] = [6, 8, 0, 1, 3]
Output: [8, -1, 1, 3, -1]

Explanation: The next larger element to 6 is 8, for 8 there is no larger elements hence it is -1, 
for 0 it is 1 , for 1 it is 3 and then for 3 there is no larger element on right and hence -1.

Naive approach:
- use two loops
- outer loop iterate each of arr[i]
- inner loop iterate the array again from i and gets the first element greater than arr[i], if not, -1.

TC: O(n^2)
SC: O(n) to store the answer itself, unavoidable

Efficient apporach: using stacks
- we need to know the next greater element for the current element on the right, for this we must know 
  the elements on the right, so better iterate from the right end
- we will use stack to store the elements and we obviously need extra space other than stack to return 
  the answer
- DRY RUN:
        
stack = [

     0   1  2  3  4  5
a = [3, 12, 4. 6, 2, 9]         ans = []


i = 5:
    since this is the last element, we will push -1 in the ans[] and store this element in the stack

    stack = [9                 ans = [-1]

i = 4:
    stack.top() > arr[i], push s.top() in ans[] and store arr[i] in stack
    visulalise this as poles of height

        stack = [9 2                ans = [9, -1]


i = 3:
    stack.top() < arr[i], keep popping untill we get s.top() > a[i], why?
    visulalise this as poles of height

                                    |
      |                             |                  
      |                  |          |
|     |        |         |          |
|     |        |         |          |
-----------------------------------------------
F   this       X         X        nge(this)

we will need to see the next greater pole than this, so, we don't need Xs, pop() them 
Don't worry that we will loose elements for F, for F, nge = this only, no use of Xs
So, basically, we are storing elements in a MONOTONIC stack, in decreasing order

        stack = [9 6               ans = [9, 9, -1]

i = 2:
    stack.top() > arr[i], push s.top() in ans[] and store arr[i] in stack

        stack = [9 6 4                ans = [6, 9, 9, -1]

i = 1:
    stack.top() < arr[i], keep popping untill we get s.top() > a[i]
    we here end up popping whole stack, so whenever stack = empty, it means we don't have NGE for arr[i]
    push(-1) in ans[] and store arr[i] in stack

        stack = [12                ans = [-1, 6, 9, 9, -1]

i = 0:
    stack.top() > arr[i], push s.top() in ans[] and store arr[i] in stack

        stack = [12 3                ans = [12, -1, 6, 9, 9, -1]

TC: O(n)


SC: O(n) + O(n) for stack and storing answer */

import { Stack } from "./Impementation/stack_using_class_number";

/* My logic that was inefficient due to unshift() */
class Solution {
    nextLargerElement(a) {
    const n = a.length;
    let res = [];
    let stack = new Stack(n);

    for (let i = n - 1; i >= 0; i--) {
        if (stack.isStackEmpty()) {
            stack.push(a[i]);
            res.unshift(-1);
        } 
        else if (stack.top() > a[i]) {
            res.unshift(stack.top());
            stack.push(a[i]);
        } 
        else {
            while (!stack.isStackEmpty() && stack.top() <= a[i]) {
                stack.pop();
            }

            if (stack.isStackEmpty()) {
                res.unshift(-1);
            } else {
                res.unshift(stack.top());
            }
            stack.push(a[i]);
        }
    }

    return res;
        
    }
}

/* Efficient solution */
function nextGreaterElement(a: number[]): number[] {
    let n: number = a.length;

    if(n === 0) return [];
    if(n === 1) return [-1];

    let ans: number[] = Array(n); 
    let stack = new Stack(n);

    for(let i = (n - 1); i >= 0; i--) {

        /*  pop() for <= also, since we need striclty greater elements on right */
        while((!stack.isStackEmpty()) && (stack.top() <= a[i])) stack.pop();

        // If stack is empty after popping, there's no greater element
        ans[i] = stack.isStackEmpty() ? -1 : stack.top();

        // Push current element for next iteration
        stack.push(a[i]);
    }

    return ans;
}