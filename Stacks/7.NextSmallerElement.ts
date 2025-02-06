/* 
Input: [4, 8, 5, 2, 25]
Output: [2, 5, 2, -1, -1]

Input: [13, 7, 6, 12]
Output: [7, 6, -1, -1]

Approach: NGE approach only with a little tweak in the if condition

*/

import { Stack } from "./Impementation/stack_using_class_number";

function nextSmallerElement(a: number[]): number[] {
    let n: number = a.length;

    if(n === 0) return [];
    if(n === 1) return [-1];

    let stack = new Stack(n);
    let ans: number[] = Array(n);

    for(let i = (n - 1); i >= 0; i--) {
        while((!stack.isStackEmpty()) && (stack.top() >= a[i])) stack.pop();

        ans[i] = (!stack.isStackEmpty())? stack.top(): -1;

        stack.push(a[i]);
    }

    return ans;
}

/* INTERVIEW BIT submission:

module.exports = { 
 //param A : array of integers
 //return a array of integers
	prevSmaller : function(a){
        
                class Stack {
            constructor(size) {
                this.size = size;
                this.currentSize = 0;
                this.stack = [];
            }

            push(element) {
                if (this.isStackFull()) {
                    alert('STACK IS FULL');
                } else {
                    this.stack[this.currentSize] = element;
                    this.currentSize++;
                }
            }

            pop() {
                if (this.isStackEmpty()) {
                    alert('STACK IS EMPTY');
                } else {
                    this.currentSize--;
                    this.stack.length = this.currentSize;
                }
            }

            display() {
                console.warn(this.stack);
            }

            top() {
                return this.currentSize > 0 ? this.stack[this.currentSize - 1] : NaN;
            }

            isStackFull() {
                return this.currentSize === this.size;
            }

            isStackEmpty() {
                return this.currentSize === 0;
            }
        }

        let n = a.length;
        if (n === 0) return [];
        if (n === 1) return [-1];

        let stack = new Stack(n);
        let ans = Array(n);

        for (let i = 0; i < n; i++) {
            while (!stack.isStackEmpty() && stack.top() >= a[i]) {
                stack.pop();
            }

            ans[i] = !stack.isStackEmpty() ? stack.top() : -1;

            stack.push(a[i]);
        }

        return ans;

	}
};

*/