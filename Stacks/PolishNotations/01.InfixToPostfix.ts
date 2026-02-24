/* Infix to postfix

Input: s = "a*(b+c)/d"
Output: abc+*d/
Explanation: The expression is a*(b+c)/d. First, inside the brackets, b+c becomes bc+. 
Now the expression looks like a*(bc+)/d. Next, multiply a with (bc+), so it becomes abc+* . 
Finally, divide this result by d, so it becomes abc+*d/.

Input: s = "a+b*c+d"
Output: abc*+d+
Explanation: The expression a+b*c+d is converted by first doing b*c -> bc*, then adding a -> abc*+, 
and finally adding d -> abc*+d+.

Input: s = "(a+b)*(c+d)"
Output: ab+cd+*
Explanation: The expression (a+b)*(c+d) is converted by first doing (a+b) -> ab+, then doing (c+d) -> cd+, 
and finally the expression ab+*cd+ becomes ab+cd+*. 

Approach: Using stack

let s = "a + b * (c ^ d - e)"

i = 0: a
    if its an operand, just append to the answer -> a

i = 1: +
    operator, and stack is empty, push it into the stack
    st = [ + 

i = 2: b
    if its an operand, just append to the answer -> ab

i = 3: *
    higher precedence operator, push it into the stack
    st = [ +  *

i = 4: (
    open bracket, simply push into the stack
    st = [ +  * (

i = 5: c
    if its an operand, just append to the answer -> abc
    st = [ +  * (

i = 6: ^
    higher precedence operator, push it into the stack
    st = [ +  * ( ^

i = 7: d
    if its an operand, just append to the answer -> abcd
    st = [ +  * ( ^

i = 8: -
    operator with lesser priority than st.top(), pop() and append popped operator to the answer
    ans -> abcd^
    st = [ +  * (

    Now, next st.top() = (, it has lesser than -, so push - inside stack
    st = [ +  * ( -

i = 9: e
    if its an operand, just append to the answer -> abcd^e
    st = [ +  * ( -

i = 10: )
    take out everything till we get ( in stack and append to the answer
    answer -> abcd^e-
    pop() ( also
    st = [ +  *
    Don't push that closing bracket

Iteration done, whatever left in the stack, pop() and append to the answer
answer -> abcd^e-*
answer -> abcd^e-*+

Also, keep one thing in mind:
    When priorities are equal:
        If operator is left associative → POP from stack
        If operator is right associative → DO NOT POP


*/

class myStack {
    public currentSize: number;
    private stack: string[];

    constructor() {
        this.currentSize = 0;
        this.stack = [];
    }

    push(element: string) {
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
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function getPriority(operator) {
    if(operator === '^') return 3;
    else if((operator === '/') || (operator === '*')) return 2;
    else if((operator === '+') || (operator === '-')) return 1;
    else return -1;
}

function isOperand(char) {
    if(
        (char >= 'a') && (char <= 'z') ||
        (char >= 'A') && (char <= 'Z') ||
        (char >= '0') && (char <= '9')
    ) return true;
    else return false;
}

function isRightAssociative(op) {
    return op === '^';
}

function infixToPostfix(s) {
    const n = s.length;

    let st = new myStack();
    let ans = "";

    for (let i = 0; i < n; i++) {

        /* If operand, add to result */
        if (isOperand(s[i])) ans += s[i];

        /* If '(' push to stack */
        else if (s[i] === '(') st.push(s[i]);

        /* If ')', pop until '(' */
        else if (s[i] === ')') {
            while (!st.isEmpty() && st.top() !== '(') {
                ans += st.top();
                st.pop();
            }
            if (!st.isEmpty()) st.pop(); // remove '('
        }

        /* If operator, then work based on priority */
        else {
            while (
                !st.isEmpty() &&
                ( getPriority(s[i]) < getPriority(st.top()) ||
                    ( getPriority(s[i]) === getPriority(st.top()) && !isRightAssociative(s[i]))
                )
            ) {
                ans += st.top();
                st.pop();
            }
            st.push(s[i]);
        }
    }

    /* Pop remaining operators */
    while (!st.isEmpty()) {
        ans += st.top();
        st.pop();
    }

    return ans;
}

/*
TC: O(n) for loop + O(n) while loops can take out max n elements throughout their journey
SC: O(n) for stack + O(n) for ans */