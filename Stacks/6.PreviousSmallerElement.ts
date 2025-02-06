/*
Input: a = [1, 6, 2]
Output: -1 1 1

Explaination: There is no number at the  left of 1. Smaller number than 6 and 2 is 1.

Input: a = [1, 5, 0, 3, 4, 5]
Output: -1 1 -1 0 3 4

Explaination: Upto 3 it is easy to see the smaller numbers. But for 4 the smaller 
numbers are 1, 0 and 3. But among them 3 is closest. Similary for 5 it is 4.

Naive approach:
- use two loops from (0---(n-1)) and inner loop from (0--i) and for every i, keep track of smaller
  element on left

TC: O(N ^ 2)
SC: O(1)

Using Stack (NGE like concept but by changing order)
- we need previous smaller element on left, so we need to store left elements, so iterate from left
- DRY RUN

         0  1  2  3  4  5
let a = [1, 5, 0, 3, 4, 5]   stack = [   and ans[] = []

i = 0:
    there is no previous smaller element for a[0], so push it in stack
    ans = [-1]   stack = [1

i = 1:
    s.top() < a[i], so, ans.push(s.top()) and push a[i] into stack
    ans = [-1, 1]   stack = [1, 5

i = 2:
    s.top() > a[i], so, keep popping while s.top() < a[i], push a[i] into stack and ans.push(s.top()) or push 
    -1 in ans[] if stack.length = 0
    ans = [-1, 1, -1]   stack = [0

i = 3:
     s.top() < a[i], so, ans.push(s.top()) and push a[i] into stack
    ans = [-1, 1, -1, 0]   stack = [0, 3

i = 4:
     s.top() < a[i], so, ans.push(s.top()) and push a[i] into stack
    ans = [-1, 1, -1, 0, 3]   stack = [0, 3, 4

i = 5:
     s.top() < a[i], so, ans.push(s.top()) and push a[i] into stack
    ans = [-1, 1, -1, 0, 3, 4]   stack = [0, 3, 4, 5

So, we basically maintain a monotonic stack same as NGE just that the order here is reverse of NGE

TC: O(2N)  same as NGE
SC: O(n) */

import { Stack } from "./Impementation/stack_using_class_number";

function previousSmallerElement(a: number[]): number[] {
    let n: number = a.length;

    if(n === 0) return [];
    if(n === 1) return [-1];

    let stack = new Stack(n);
    let ans: number[] = Array(n);

    for(let i = 0; i < n; i++) {
        while((!stack.isStackEmpty()) && (stack.top() >= a[i])) stack.pop();

        ans[i] = (!stack.isStackEmpty())? stack.top(): -1;

        stack.push(a[i]);
    }

    return ans;
}

/* GFG submission: 

Private Fields: private is not valid in traditional JavaScript classes. Instead, use # for private fields.

class Stack {
    #currentSize;
    #stack;

    constructor() {
        this.#currentSize = 0;
        this.#stack = [];
    }

    push(element) {
        this.#stack[this.#currentSize] = element;
        this.#currentSize++;
    }

    pop() {
        if (this.isStackEmpty()) {
            alert('STACK IS EMPTY');
            return null;
        } else {
            const poppedElement = this.#stack[this.#currentSize - 1];
            this.#currentSize--;
            this.#stack.pop();
            return poppedElement;
        }
    }

    display() {
        console.warn(this.#stack);
    }

    top() {
        if (this.#currentSize > 0) return this.#stack[this.#currentSize - 1];
        else return NaN;
    }

    isStackEmpty() {
        return this.#currentSize === 0;
    }
}

*/