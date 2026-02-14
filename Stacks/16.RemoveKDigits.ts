/* 402. Remove K Digits
Given string num representing a non-negative integer num, and an integer k, 
return the smallest possible integer after removing k digits from num.

Input: num = "1432219", k = 3       Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.


Input: num = "10200", k = 1         Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.


Input: num = "10", k = 2            Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.
 

Constraints:
    1 <= k <= num.length <= 105
    num consists of only digits.
    num does not have any leading zeros except for the zero itself.


                                                    Intuition:
                                                    ----------

- In numbers, leftmost digits matter more than rightmost digits.
  If you can make the first few digits smaller, the whole number becomes smaller.

Why stack thinking?
- We need to compare the current digit with the previous digits that we kept.
  if we have k left, we will keep comparing and removing previous digits 
  (possible by keep popping from the stack)

- So, if we keep popping when a[i] > st.top() && k > 0

Since we are keeping a monotonic stack, the number it is tracking will be automatically become smallest
because the bottommost element of the stack = leftmost digit of the number
This leads to smallest possible number


Dry run

num = "1432219", k = 3

i = 0:
    st.empty() so push()
    st = [1

i = 1:
    4 > 1
    (st.top() < a[i]) -> push() as stack will still be monotonic
    st = [1, 4

i = 2:
    3 < 4
    remove 4 and put 3

    while(st.top() > a[i]) && (k > 0) -> st.pop()
    push a[i]

    st = [1, 3
    One removal, So, k-- => k = 2 now

i = 3:
    2 < 3, 
    remove 3 and put 2 in the stack to keep stack monotonic

    while(st.top() > a[i]) && (k > 0) -> st.pop()
    push a[i]

    st = [1, 2
    One removal, So, k-- => k = 1 now

i = 4:
    2 === 2, stack is already monotonic, and replacing 2 with 2 won't change the order, so push 2 in stack and i++
    st = [1, 2, 2

i = 5:
    1 < 2, 
    remove 2 and place 1 to keep stack monotonic

    while(st.top() > a[i]) && (k > 0) -> st.pop()
    push a[i]

    st = [1, 2, 1
    One removal, So, k-- => k = 0 now.
    We have exhausted all removals, so push remaining number in the stack

    st = [1, 2, 1, 9

    the value in stack is our answer


                                            EDGE CASES HERE:
                                            ----------------
    
    if k === n, we return "0"

    if stack = [0, 0, 1, 2 -> we need to trim initial 0s

    if number is already increasing and we didn't need to remove anything
    num = "1234567"
     st = [1 2 3 4 5..

     in this case, if k = 3, remove last k values of stack, since the stack is already monotonic, 
     last three elements will be greatest

*/

class myStack {
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


function removeKdigits(num: string, k: number): string {
    const n: number = num.length;

    /* Corner case */
    if(n === k) return "0";

    let res: string = "";
    let st = new myStack();

    for (let i = 0; i < n; i++) {
        if (st.isEmpty() && (k > 0)) st.push(Number(num[i]));
        else {
            while ((!st.isEmpty() && (st.top() > Number(num[i])) && (k > 0))) {
                st.pop();
                k--;
            }

            /* when num[i] === st.top() and when k === 0, we still push elements  */
            st.push(Number(num[i]));
        }
    }

    /* If k is unused, pop k elements from the stack */
    while(k > 0) {
        st.pop();
        k--;
    }

    /* get all elements from stack and store in string output in reverse order */
    while(!st.isEmpty()) {
        res = st.top() + res;
        st.pop();
    }

    /* Make sure to trim leading zeros */
    res = res.replace(/^0+/, "");

    /* If, after replacing zeros, string becomes "", return "0" */
    return (res.length)? res: "0";
};

/*
TC: O(n) + O(k) -> k for reverse and trim

SC: O(n) + O(n) -> stack + result
*/