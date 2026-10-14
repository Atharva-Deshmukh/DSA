/* Expression contains redundant bracket or not

Given a string of balanced expression s, check if it contains a redundant parenthesis or not. 
A set of parenthesis are redundant if the same sub-expression is surrounded by unnecessary or multiple 
brackets.
Note: Expression may contain + , - , *, and / operators. 
Given expression is valid and there are no white spaces present.

Input: s = "((a+b))"
Output: true 
Explanation: ((a+b)) can reduced to (a+b).

Input: s = "(a+(b)/c)"
Output: true
Explanation: (a+(b)/c) can reduced to (a+b/c) because b is surrounded by () which is redundant.

Input: s = "(a+b+(c+d))"
Output: false
Explanation:(a+b+(c+d)) doesn't have any redundant or multiple brackets.

Constraints: 1 ≤ |s| ≤ 10^5

                                                    Approach:
                                                    ---------

INTUITION: If no operators are present between brackets, then those brackets are redundant

Logic:
- Push only open brackets and operators into the stack
- If stack is empty or we have one of the operators, then push it into the stack
- when we encounter the closing bracket, pop operators first, and then pop open bracket
- In the end stack should be emtpy
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

function checkRedundancy(s) {
    const n = s.length;

    /* Expression is not balanced */
    if(n === 1) return false;

    let st = new myStack();
    const operators = "+-*/";

    for(let i = 0; i < n; i++) {

        /* If stack is empty or current element is either operator or open bracket, push it */
        if((st.isEmpty()) || (operators.includes(s[i])) || (s[i] === '(')) st.push(s[i]);
        if(s[i] === ')') {

            /* Declare here as we are checking for every () expression */
             let isOperatorFoundBetweenBrackets = false;

            /* Pop operators */
            while((!st.isEmpty()) && (st.top() !== '(')) {

                // to handle cases when we have only ')))' as input
                if(operators.includes(st.top()!)) isOperatorFoundBetweenBrackets = true; 
                st.pop();
            }

            /* Pop open brackets */
            if((!st.isEmpty()) && (st.top() === '(')) st.pop();

            /* If no operators found inside the brackets, brackets are redundant so return true
               true means that we have redundant brackets
            */
            if(!isOperatorFoundBetweenBrackets) return true;
        }
    }

    return false;     
}