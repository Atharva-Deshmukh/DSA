/* 682. Baseball Game

You are keeping the scores for a baseball game with strange rules. At the beginning of the game, 
you start with an empty record.
You are given a list of strings operations, where operations[i] is the ith operation you must apply 
to the record and is one of the following:

An integer x.
Record a new score of x.

'+'.
Record a new score that is the sum of the previous two scores.

'D'.
Record a new score that is the double of the previous score.

'C'.
Invalidate the previous score, removing it from the record.

Return the sum of all the scores on the record after applying all the operations.

The test cases are generated such that the answer and all intermediate calculations fit in a 32-bit integer and that all operations are valid.


Input: ops = ["5","2","C","D","+"]
Output: 30
Explanation:
"5" - Add 5 to the record, record is now [5].
"2" - Add 2 to the record, record is now [5, 2].
"C" - Invalidate and remove the previous score, record is now [5].
"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
The total sum is 5 + 10 + 15 = 30.

Input: ops = ["5","-2","4","C","D","9","+","+"]
Output: 27
Explanation:
"5" - Add 5 to the record, record is now [5].
"-2" - Add -2 to the record, record is now [5, -2].
"4" - Add 4 to the record, record is now [5, -2, 4].
"C" - Invalidate and remove the previous score, record is now [5, -2].
"D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
"9" - Add 9 to the record, record is now [5, -2, -4, 9].
"+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
"+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.

Input: ops = ["1","C"]
Output: 0
Explanation:
"1" - Add 1 to the record, record is now [1].
"C" - Invalidate and remove the previous score, record is now [].
Since the record is empty, the total sum is 0.
 

Constraints:
    1 <= operations.length <= 1000
    operations[i] is "C", "D", "+", or a string representing an integer in the range [-3 * 10^4, 3 * 10^4].
    For operation "+", there will always be at least two previous scores on the record.
    For operations "C" and "D", there will always be at least one previous score on the record.

Approach:
- We can clearly see that we need to know previous scores and based on operations, we need to 
  retrieve past n scores, so we can think of using a stack here

let total = 0;
st = [

Input: ops = ["5","2","C","D","+"]
Output: 30
Explanation:
"5" - Add 5 to the record, record is now [5].
"2" - Add 2 to the record, record is now [5, 2].
"C" - Invalidate and remove the previous score, record is now [5].
"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
The total sum is 5 + 10 + 15 = 30.

i = 0: "5"
    number and stack is empty, push it in stack 
    st = [5

i = 1: "2"
    number -> push it in stack
    st = [5, 2

i = 2: "C"
    Invalidate previous score -> pop() from stack
    st = [5 

i = 3: "D"
    double the st.top() and push the doubled value
    st = [5 10

i = 4: "+"
    pop() last two elements and add them and push the sum
    Here -> Recursive implementation to remove two elements, store them in recursive stack and push them back
    st = [5 10 15

When array ends, sum the stack elements and return
*/

class myStack {
    public currentSize: number;
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

/* This pattern of writing functions is taken from find and delete middle element of stack question */
function sumOfLastTwoElementsOfStack(st: myStack): number {
    let sum: number = 0;

    function calcSum(k: number): number {

        if(k === 0) {
            return 0;
        }

        const ele: number = st.top();
        st.pop();
        sum += ele + calcSum(k - 1);
        st.push(ele);

        return sum;
    }

    return calcSum(2);

}

function calPoints(a: string[]): number {
    const n: number = a.length;
    let res: number = 0;

    let st = new myStack();

    for(let i = 0; i < n; i++) {
        if(isNaN(Number(a[i])) === false) st.push(Number(a[i]));
        if((!st.isEmpty()) && (a[i] === "C")) st.pop(); 
        if((!st.isEmpty()) && (a[i] === "D")) st.push(st.top() * 2);
        if((!st.isEmpty()) && (a[i] === "+")) {
            st.push(sumOfLastTwoElementsOfStack(st));
        }
    }

    while(!st.isEmpty()) {
        res += st.top();
        st.pop();
    }

    return res;
};