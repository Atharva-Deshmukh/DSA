/* 735. Asteroid Collision

We are given an array asteroids of integers representing asteroids in a row. 
The indices of the asteroid in the array represent their relative position in space.

For each asteroid, the absolute value represents its size, and the sign represents its direction 
(positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, 
the smaller one will explode. If both are the same size, both will explode. 
Two asteroids moving in the same direction will never meet.

Input: asteroids = [5,10,-5]        -->         Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

Input: asteroids = [8,-8]           -->         Output: []
Explanation: The 8 and -8 collide exploding each other.

Input: asteroids = [10,2,-5]        -->         Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

Input: asteroids = [3,5,-6,2,-1,4]​​​​​​​  -->         Output: [-6,2,4]
Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 makes the asteroid -1 explode and then continues going right, without reaching asteroid 4.
 
Constraints:
    2 <= asteroids.length <= 10^4
    -1000 <= asteroids[i] <= 1000
    asteroids[i] != 0

Approach:

                    0  1  2  3  4   5   6  7   8    9
- let asteroid[] = [4, 7, 1, 1, 2, -3, -7, 17, 15, -16]

- Traverse from left to right
- Keep track of previous positive elements and when u encounter a negative element, keep comparing 
  with previous positive elements
- We can notice that we need last occurred element and it will be removed first if less than negative element
  LIFO -> we can think of a stack solution here

  store the positive numbers in the stack until we encounter negative number

  i = 0:
    stack = [4

  i = 1:
    stack = [4, 7

  i = 2:
    stack = [4, 7, 1

  i = 3:
    stack = [4, 7, 1, 1

  i = 4:
    stack = [4, 7, 1, 1, 2

  i = 5:
    a[5] = -3 < 0
    while ((a[i] < 0) && (!stack.empty()) && (stack.top() <= Math.abs(a[i]))) stack.pop();
    Don't push a[i] in the last, just i++

    Don't push -3 because -3 is destroyed by 7

    stack = [4, 7, 1, 1, 2 -> stack = [4, 7,

  i = 6:
    a[6] = -7 < 0
    while ((a[i] < 0) && (!stack.empty()) && (stack.top() <= Math.abs(a[i]))) stack.pop();
    Don't push a[i] in the last, just i++

    stack = [4, 7 -> stack = [4,

  i = 7:
    stack = [4, 17

  i = 8:
    stack = [4, 15

  i = 9:
    a[9] = -16 < 0
    while ((a[i] < 0) && (!stack.empty()) && (stack.top() <= Math.abs(a[i]))) stack.pop();
    Don't push a[i] in the last, just i++

    stack = [4, 17, 15 -> stack = [4, 17

final answer -> 4, 17 only

Corner cases here
-----------------

If last and second last elements were -18, -19

stack = [4, 17 -> stack = [  --> Empty stack, so insert negative numbers also
                  stack = [-18

stack = [-18 -> stack = [-18, -19  (in negative numbers, -1 > -2, so push)


 */

export class myStack {
    public currentSize: number;
    public poppedElement: number;
    private stack: number[];

    constructor() {
        this.currentSize = 0;
        this.stack = [];
    }

    push(element: number) {
        this.stack[this.currentSize] = element;
        this.currentSize++;
    }

    /* Just free the memory of the last element stored in the array */
    pop() {
        if (!this.isEmpty()) {
            this.poppedElement = this.stack[this.currentSize - 1];
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if (this.currentSize > 0) return this.stack[this.currentSize - 1];
        else return NaN;
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function asteroidCollision(a: number[]): number[] {
    let ans: number[] = [];
    const n: number = a.length;

    if (n <= 1) return a;

    let stack = new myStack();

    for (let i = 0; i < n; i++) {

        /* If positive, push it anyways */
        if (a[i] > 0) stack.push(a[i]);
        else {

            /* until stack.top is positive, and a[i] is negative, pop if greater magnitude */
            while (!stack.isEmpty() && (stack.top() > 0) && (stack.top() < Math.abs(a[i]))) stack.pop();

            /* in case stack becomes empty, then push negative also */
            if (stack.isEmpty() || (stack.top() < 0)) stack.push(a[i]);

            /* for values like [8, -8], we should not push -8 if stack becomes empty, like in the while(),
               hence, in while we used strictly less than, equality is evaluated separately,
               when values are equal, both asteroids are destroyed, hence array can also become empty
            */
            if (!stack.isEmpty() && (stack.top() === Math.abs(a[i]))) stack.pop(); // [8, -8]
        }
    }

    while (!stack.isEmpty()) {
        ans.unshift(stack.top());
        stack.pop();
    }

    return ans;
};

/*
TC: O(n)
    0 --- (n-1) iteration and
    the stack can store at max n elements throughout the journey, hence while loop also 
    in total runs n times, not n times for every i
    Hence TC = O(n) + O(n)

SC: O(n) -> for stack
*/