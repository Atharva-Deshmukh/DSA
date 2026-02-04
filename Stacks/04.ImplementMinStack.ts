/* Design a stack that supports getMin() in O(1) time and O(1) extra space

Input: Consider the following SpecialStack

16  –> TOP
15
29
19
18

When getMin() is called it should return 15, which is the minimum element in the current stack. 
If we do pop two times on stack, the stack becomes

29  –> TOP
19
18

When getMin() is called, it should return 18 which is the minimum in the current stack.

                                Approach-1: NIAVE Using extra stack
- after pop(), we will update the minVal variable by emptying the full stack into another, calculatin
- minimum on the way and bringing back all elements again in the original stack

  TC: O(n) for finding min() since we iterate full stack every time
  SC: O(n)

                Approach-2: Modifing the stack by pushing <element, minElementTillNow>
                            same can be modified to implement maxStack: <element, maxElementTillNow>

--> pop() direction
    push(2) [(2, 2)]
    push(1) [(2, 2), (1, 1)]
    push(3) [(2, 2), (1, 1), (3, 1)]  minEle = 1
    pop()   [(2, 2), (1, 1)]          minEle = 1

  TC: O(1) for finding min() 
  SC: O(2 * n)

                                Approach-3: Using Mathematical result
- while push(x): 

    if currentEle(x) >= minEle, push(x)
    if currentEle(x) < minEle, push((2*x) - minEle)

    MATHEMATICAL PROOF:
    if x < minEle, then (x - minEle) < 0
    adding x to both sides
                        ((2 * x) - minEle) < 0

- while pop(y):

    if currentEle(y) >= minEle, minEle does not change,        so pop(y)
    if currentEle(y) < minEle, minEle = ((2*minEle) - y) and then pop(y)

    MATHEMATICAL PROOF:
    y = (2*x) - prevMin
    value of minEle was made equal to x
    minEle = x
    new minEle = 2 * minEle – y 
                   = 2*x – (2*x – prevMinEle)
                   = prevMinEle // This is what we wanted

  TC: O(1) for finding min()
  SC: O(1) */

  class MinStack {
    private currentSize: number;
    private stack: number[];
    private minElement: number;

    constructor() {
        this.currentSize = 0;
        this.stack = [];
        this.minElement = Number.MAX_SAFE_INTEGER;
    }

    /* if stack is empty, simply push the current element without modifing and update minimumEle*/
    push(element: number): void {
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

    pop(): void {
        if (this.isEmpty()) return;

        let topElement = this.stack[this.currentSize - 1];

        if (topElement < this.minElement) {
            this.minElement = 2 * this.minElement - topElement;
        }

        this.currentSize--;
        this.stack.length = this.currentSize;

        // if after poppint, stack becomes empty, reset the minimum element
        if (this.isEmpty()) {
            this.minElement = Number.MAX_SAFE_INTEGER;
        }
    }

    top(): number {
        if (this.isEmpty()) return -1;

        let topElement = this.stack[this.currentSize - 1];

        // If the stored value is less than minElement, the actual value is minElement.
        return topElement < this.minElement ? this.minElement : topElement;
    }

    getMin(): number {
        return this.isEmpty() ? -1 : this.minElement;
    }

    private isEmpty(): boolean {
        return this.currentSize === 0;
    }
}