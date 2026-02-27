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

 class myStack {
  constructor() {
    this.currentSize = 0;
    this.stack = [];
    this.minElement = Number.MAX_SAFE_INTEGER;
  }

  // if stack is empty, simply push the current element and update minElement
  push(element) {
    if (this.isEmpty()) {
      this.stack[this.currentSize] = element;
      this.minElement = element;
    } else {
      if (element < this.minElement) {
        this.stack[this.currentSize] = 2 * element - this.minElement;
        this.minElement = element;
      } else {
        this.stack[this.currentSize] = element;
      }
    }
    this.currentSize++;
  }

  pop() {
    if (this.isEmpty()) return;

    const topElement = this.stack[this.currentSize - 1];

    if (topElement < this.minElement) {
      this.minElement = 2 * this.minElement - topElement;
    }

    this.currentSize--;
    this.stack.length = this.currentSize;

    // if after popping, stack becomes empty, reset minElement
    if (this.isEmpty()) {
      this.minElement = Number.MAX_SAFE_INTEGER;
    }
  }

  top() {
    if (this.isEmpty()) return -1;

    const topElement = this.stack[this.currentSize - 1];

    // If stored value is less than minElement, actual value is minElement
    return topElement < this.minElement ? this.minElement : topElement;
  }

  getMin() {
    return this.isEmpty() ? -1 : this.minElement;
  }

  isEmpty() {
    return this.currentSize === 0;
  }
};

class Solution {
    prevSmaller(a) {
    const n = a.length;
    let res = Array(n);
    
    let stack = new myStack();
    
    for(let i = 0; i < n; i++) {
        while((!stack.isEmpty()) && (stack.top() >= a[i])) stack.pop();
        
        res[i] = (stack.isEmpty())? -1: stack.top();
        
        stack.push(a[i]);
    }
    
    return res;
        
    }
}
*/